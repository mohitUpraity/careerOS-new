import os
import json
import httpx
from typing import Optional, Dict, Any, List
from backend.app.core.config import settings

class GeminiService:
    """
    Google Gemini Intelligence Gateway.
    Handles multimodal inference, prompt-engineered extraction, zero-fabrication tailoring,
    and Google text-embedding-004 embedding generation.
    """

    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model = "gemini-1.5-flash"
        self.embedding_model = "text-embedding-004"
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"

    async def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            return ""

        url = f"{self.base_url}/{self.model}:generateContent?key={self.api_key}"
        
        contents = []
        if system_instruction:
            contents.append({
                "role": "user",
                "parts": [{"text": f"System Context: {system_instruction}\n\nUser Request: {prompt}"}]
            })
        else:
            contents.append({
                "role": "user",
                "parts": [{"text": prompt}]
            })

        payload = {
            "contents": contents,
            "generationConfig": {
                "temperature": 0.1,
                "topP": 0.95,
                "maxOutputTokens": 4096,
                "responseMimeType": "application/json"
            }
        }

        async with httpx.AsyncClient(timeout=35.0) as client:
            try:
                response = await client.post(url, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "")
                return ""
            except Exception as e:
                print(f"[Gemini API Exception]: {e}")
                return ""

    async def extract_text_from_image_ocr(self, image_bytes: bytes, mime_type: str = "image/png") -> str:
        """
        Extracts text from scanned resume image or rasterized PDF using Gemini Vision OCR.
        """
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            return ""

        import base64
        b64_data = base64.b64encode(image_bytes).decode("utf-8")

        url = f"{self.base_url}/{self.model}:generateContent?key={self.api_key}"
        payload = {
            "contents": [{
                "parts": [
                    {
                        "inlineData": {
                            "mimeType": mime_type,
                            "data": b64_data
                        }
                    },
                    {
                        "text": "Extract all text, candidate contact information, skills taxonomy, work experiences, accomplishments, and quantifiable metrics from this document image into clean plain text."
                    }
                ]
            }],
            "generationConfig": {
                "temperature": 0.0,
                "maxOutputTokens": 4096
            }
        }
        async with httpx.AsyncClient(timeout=35.0) as client:
            try:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "")
            except Exception as e:
                print(f"[Gemini Vision OCR Error]: {e}")
        return ""

    async def generate_embedding(self, text: str) -> List[float]:
        """
        Generates 768-dimensional semantic embedding vector using Google text-embedding-004.
        """
        if not text or not self.api_key or self.api_key == "your_gemini_api_key_here":
            # Return normalized pseudo-vector fallback
            import hashlib
            h = hashlib.sha256(text.encode()).digest()
            pseudo = [((b / 255.0) * 2.0 - 1.0) for b in h]
            # Pad to 768 dimensions
            while len(pseudo) < 768:
                pseudo.extend(pseudo[:768 - len(pseudo)])
            return pseudo[:768]

        url = f"{self.base_url}/{self.embedding_model}:embedContent?key={self.api_key}"
        payload = {
            "model": f"models/{self.embedding_model}",
            "content": {
                "parts": [{"text": text[:2048]}]
            }
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            try:
                response = await client.post(url, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    values = data.get("embedding", {}).get("values", [])
                    if values:
                        return values
            except Exception as e:
                print(f"[Gemini Embedding Exception]: {e}")

        # Fallback hash embedding
        import hashlib
        h = hashlib.sha256(text.encode()).digest()
        pseudo = [((b / 255.0) * 2.0 - 1.0) for b in h]
        while len(pseudo) < 768:
            pseudo.extend(pseudo[:768 - len(pseudo)])
        return pseudo[:768]

    async def enrich_parsed_profile(self, parsed_data: Dict[str, Any], target_roles: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Uses Gemini to refine candidate persona summary, manifesto, and role fit.
        """
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            return parsed_data

        raw_text = parsed_data.get("raw_text", "")
        prompt = f"""
        Given the following extracted candidate profile:
        Name: {parsed_data.get('name')}
        Headline: {parsed_data.get('headline')}
        Skills: {[s['name'] for s in parsed_data.get('skills', [])]}
        Target Roles: {target_roles or parsed_data.get('target_roles', [])}
        
        Generate a concise, professional technical persona summary (2 sentences) and refine the engineering manifesto (2 sentences).
        
        Return strictly valid JSON:
        {{
            "persona_summary": "High-impact technical persona summary...",
            "manifesto": "Refined professional manifesto...",
            "suggested_target_roles": ["Role 1", "Role 2"]
        }}
        """
        
        resp = await self.generate_text(prompt, "You are the CareerOS Career Intelligence AI.")
        if resp:
            try:
                clean = resp.replace("```json", "").replace("```", "").strip()
                data = json.loads(clean)
                if data.get("persona_summary"):
                    parsed_data["persona_summary"] = data["persona_summary"]
                if data.get("manifesto"):
                    parsed_data["manifesto"] = data["manifesto"]
                if data.get("suggested_target_roles"):
                    parsed_data["target_roles"] = data["suggested_target_roles"]
            except Exception:
                pass

        return parsed_data

    async def enrich_document_extraction(self, raw_text: str, doc_type: str, parsed_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Uses Gemini to extract structured entities and enrich evidence proofs for certificates,
        internships, courses, or resumes.
        """
        if not self.api_key or self.api_key == "your_gemini_api_key_here" or not raw_text.strip():
            return parsed_data

        prompt = f"""
        Extract high-precision structured entities from this {doc_type} document for a candidate's Career Knowledge Graph.
        
        Document Type: {doc_type}
        Raw Text:
        {raw_text[:4000]}
        
        Return strictly valid JSON with:
        {{
            "title": "Clean concise title of certificate, course, internship, or resume",
            "issuer_or_company": "Organization, University, or Platform",
            "date_or_duration": "Completion date or duration",
            "credential_id": "Credential ID or URL if available",
            "skills": ["Skill1", "Skill2"],
            "metric_achievements": ["Measurable achievement or score"],
            "summary": "1 sentence executive summary"
        }}
        """

        resp = await self.generate_text(prompt, "You are a credential verification and knowledge extraction AI.")
        if resp:
            try:
                clean = resp.replace("```json", "").replace("```", "").strip()
                data = json.loads(clean)
                if data.get("title") and (not parsed_data.get("title") or len(parsed_data.get("title", "")) > 70):
                    parsed_data["title"] = data["title"]
                if data.get("issuer_or_company") and not parsed_data.get("issuer"):
                    parsed_data["issuer"] = data["issuer_or_company"]
                if data.get("credential_id") and not parsed_data.get("credential_id"):
                    parsed_data["credential_id"] = data["credential_id"]
                if data.get("skills"):
                    existing_skill_names = {s["name"].lower() for s in parsed_data.get("skills", [])}
                    for sk in data["skills"]:
                        if sk.lower() not in existing_skill_names:
                            parsed_data.setdefault("skills", []).append({
                                "name": sk,
                                "category": "Technical Competencies",
                                "proficiency": 85,
                                "ast_proof_hint": f"Extracted via Gemini AI from {doc_type}",
                                "proof_count": 1
                            })
                            existing_skill_names.add(sk.lower())
            except Exception as e:
                print(f"[Gemini Enrichment Parse Notice] {e}")

        return parsed_data

gemini_service = GeminiService()
