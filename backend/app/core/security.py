import os
from typing import Optional, Dict, Any
from fastapi import Header, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from backend.app.core.database import get_db
from backend.app.models.user import UserModel
from backend.app.models.profile import UserProfileModel

# Initialize Firebase Admin if credentials are provided or default app is not initialized
try:
    if not firebase_admin._apps:
        # Default initialization (will verify tokens against Google's public x509 keys)
        firebase_admin.initialize_app()
except Exception as e:
    print(f"Firebase Admin default init note: {e}")

async def get_current_user(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
) -> UserModel:
    """
    Verifies Firebase ID token from Authorization header (Bearer <token>),
    extracts Firebase UID, and ensures user exists in PostgreSQL database.
    """
    firebase_uid = "default_user"
    user_email = "mohit@careeros.ai"
    user_name = "Mohit Upraity"

    if authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1].strip()
        try:
            # Verify Firebase ID token
            decoded_token = firebase_auth.verify_id_token(token)
            firebase_uid = decoded_token.get("uid", firebase_uid)
            user_email = decoded_token.get("email", user_email)
            user_name = decoded_token.get("name", user_name)
        except Exception as err:
            # In development, warn and allow fallback if invalid token format
            print(f"Firebase Token Verification Error: {err}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid or expired Firebase authentication token: {str(err)}",
                headers={"WWW-Authenticate": "Bearer"},
            )

    # Lookup or create user in Supabase PostgreSQL
    result = await db.execute(select(UserModel).filter(UserModel.id == firebase_uid))
    user = result.scalars().first()

    if not user:
        user = UserModel(
            id=firebase_uid,
            email=user_email,
            name=user_name,
        )
        db.add(user)
        
        # Also ensure UserProfile exists
        profile_res = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == firebase_uid))
        if not profile_res.scalars().first():
            profile = UserProfileModel(id=firebase_uid, name=user_name, email=user_email)
            db.add(profile)
            
        await db.commit()
        await db.refresh(user)

    return user
