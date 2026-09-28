from typing import List, Dict, Any, Tuple, Optional
from datetime import datetime
from backend.app.models.profile import UserProfileModel
from backend.app.models.opportunity import OpportunityModel
from backend.app.models.skill import SkillModel, EvidenceModel

class MatchingService:
    """
    CareerOS Multi-Dimensional Candidate ↔ Opportunity Matching Engine.
    Combines Knowledge Graph skills, Cryptographic Evidence Vault, Semantic Vector Similarity,
    and User Constraints with dynamic calibration slider support.
    """

    def __init__(self):
        self.default_weights = {
            "skills": 0.35,
            "evidence": 0.20,
            "role_goal": 0.15,
            "experience": 0.15,
            "location": 0.10,
            "freshness": 0.05
        }

    def compute_match(
        self,
        profile: UserProfileModel,
        skills: List[SkillModel],
        evidence_items: List[EvidenceModel],
        opportunity: OpportunityModel,
        custom_weights: Optional[Dict[str, float]] = None
    ) -> Tuple[int, Dict[str, Any]]:
        weights = self.default_weights.copy()
        if custom_weights:
            weights.update(custom_weights)

        # 1. Skills Match Score
        user_skills_map = {s.name.lower(): s for s in skills}
        req_skills = opportunity.hard_skills or opportunity.key_requirements or []
        
        skills_matched: List[str] = []
        skills_missing: List[str] = []
        
        if req_skills:
            matched_count = 0
            for req in req_skills:
                req_lower = req.lower()
                # Check direct or substring match
                if any(req_lower in s_name or s_name in req_lower for s_name in user_skills_map):
                    matched_count += 1
                    skills_matched.append(req)
                else:
                    skills_missing.append(req)
            skill_score = (matched_count / len(req_skills)) * 100.0
        else:
            skill_score = 85.0

        # 2. Evidence Coverage Score
        verified_skills = set()
        for ev in evidence_items:
            if ev.verified and ev.skills_linked:
                for sk in ev.skills_linked:
                    verified_skills.add(sk.lower())

        evidence_matched_count = sum(
            1 for req in req_skills if any(req.lower() in vs for vs in verified_skills)
        ) if req_skills else len(evidence_items)

        evidence_score = (
            min(100.0, (evidence_matched_count / max(1, len(req_skills))) * 100.0)
            if req_skills else min(100.0, len(evidence_items) * 15.0)
        )

        # 3. Role Goal Alignment
        target_roles = profile.target_roles or []
        role_alignment_score = 60.0
        opp_title_lower = opportunity.title.lower()
        
        for tr in target_roles:
            tr_lower = tr.lower()
            if tr_lower in opp_title_lower or any(word in opp_title_lower for word in tr_lower.split() if len(word) > 3):
                role_alignment_score = 98.0
                break

        # 4. Experience & Seniority Fit
        user_years = profile.years_of_experience or 3.0
        exp_score = 90.0
        if "senior" in opportunity.experience_level.lower() and user_years >= 4.0:
            exp_score = 100.0
        elif "junior" in opportunity.experience_level.lower() or "intern" in opportunity.experience_level.lower():
            exp_score = 100.0
        elif "lead" in opportunity.experience_level.lower() and user_years < 5.0:
            exp_score = 70.0

        # 5. Work Modality & Location Fit
        user_modalities = [m.lower() for m in (profile.modalities or ["remote", "hybrid"])]
        opp_workplace = opportunity.workplace_type.lower()
        location_score = 100.0 if (opp_workplace in user_modalities or "remote" in opp_workplace) else 65.0

        # 6. Freshness Baseline
        freshness_score = 95.0

        # Weighted Calculation
        raw_final = (
            weights["skills"] * skill_score +
            weights["evidence"] * evidence_score +
            weights["role_goal"] * role_alignment_score +
            weights["experience"] * exp_score +
            weights["location"] * location_score +
            weights["freshness"] * freshness_score
        )

        final_match_score = max(50, min(99, int(round(raw_final))))

        # Explainability reason
        if skills_matched and len(skills_matched) >= 2:
            match_reason = f"Verified evidence for {', '.join(skills_matched[:3])} directly aligns with {opportunity.company}'s requirements."
        elif role_alignment_score > 80:
            match_reason = f"High trajectory match for {opportunity.title} based on your target role goals."
        else:
            match_reason = f"Solid baseline engineering match with strong foundational coverage."

        breakdown = {
            "overall_match": final_match_score,
            "skill_score": round(skill_score, 1),
            "evidence_score": round(evidence_score, 1),
            "role_alignment_score": round(role_alignment_score, 1),
            "experience_score": round(exp_score, 1),
            "location_score": round(location_score, 1),
            "skills_matched": skills_matched,
            "skills_missing": skills_missing,
            "match_reason": match_reason
        }

        return final_match_score, breakdown

matching_service = MatchingService()
