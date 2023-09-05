from datetime import timedelta, datetime
from config import settings
from fastapi import HTTPException

import jwt


def generate_access_token(user_id: int, email: str, role: str, is_confirmed: bool, expires_delta: timedelta):
    encode = {"sub": email, "id": user_id,
              "role": role, "is_confirmed": is_confirmed}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})

    return jwt.encode(encode, key=settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def get_current_user(token: str):
    try:
        payload = jwt.decode(token, key=settings.JWT_SECRET,
                             algorithms=[settings.JWT_ALGORITHM])

        user_data = {
            "email": payload.get("sub"),
            "id": payload.get("id"),
            "role": payload.get("role"),
            "is_confirmed": payload.get("is_confirmed")
        }

        if user_data["email"] is None or user_data["id"] is None:
            raise HTTPException(401, "Unauthorized access")

        return user_data
    except jwt.exceptions.PyJWTError as e:
        print(e)
        raise HTTPException(401, "Unauthorized access")
