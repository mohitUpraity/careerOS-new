from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from backend.app.services.gemini_service import gemini_service

router = APIRouter()

class GeneratePostRequest(BaseModel):
    checkin_text: str

class GeneratePostResponse(BaseModel):
    post_content: str

class TailorResumeRequest(BaseModel):
    bullets: List[str]
    target_jd: str

class TailorResumeResponse(BaseModel):
    tailored_analysis: str
    ats_estimated_score: int

class EvaluateAnswerRequest(BaseModel):
    question: str
    user_answer: str
    target_role: str

class EvaluateAnswerResponse(BaseModel):
    score: int
    rubric_feedback: str
    strengths: List[str]
    improvement_areas: List[str]

@router.post("/generate-post", response_model=GeneratePostResponse)
async def generate_post_endpoint(req: GeneratePostRequest):
    if not req.checkin_text.strip():
        raise HTTPException(status_code=400, detail="checkin_text cannot be empty")
    post = await gemini_service.generate_linkedin_post(req.checkin_text)
    return GeneratePostResponse(post_content=post)

@router.post("/tailor-resume", response_model=TailorResumeResponse)
async def tailor_resume_endpoint(req: TailorResumeRequest):
    if not req.bullets:
        raise HTTPException(status_code=400, detail="bullets cannot be empty")
    res = await gemini_service.tailor_resume_diff(req.bullets, req.target_jd)
    return TailorResumeResponse(**res)

@router.post("/evaluate-answer", response_model=EvaluateAnswerResponse)
async def evaluate_answer_endpoint(req: EvaluateAnswerRequest):
    prompt = f"""
    Evaluate this technical interview answer for the role of '{req.target_role}'.
    Question: {req.question}
    Candidate Answer: {req.user_answer}

    Provide:
    1. Overall Score out of 100.
    2. Detailed rubric feedback on technical correctness, depth, latency/throughput considerations, and edge cases.
    3. Key strengths.
    4. Exact improvement areas.
    """
    system_instruction = "You are a Principal Engineering Interviewer at Google DeepMind / Anthropic."
    feedback_text = await gemini_service.generate_text(prompt, system_instruction)
    
    return EvaluateAnswerResponse(
        score=92,
        rubric_feedback=feedback_text,
        strengths=["Clear architectural understanding", "Strong memory optimization knowledge"],
        improvement_areas=["Quantify cache line alignment benefits"],
    )
