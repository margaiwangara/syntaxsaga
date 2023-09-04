from database import Base
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean
from utils import constants
from pydantic import BaseModel, EmailStr, Field


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True, index=True)
    password = Column(String(255), nullable=False)
    is_confirmed = Column(Boolean, default=True)
    role = Column(String(10), default=constants.USER_ROLE)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class ForgotPasswordRequest(BaseModel):
    email: EmailStr

    class Config:
        json_schema_extra = {
            "example": {
                "email": "johndoe@syntaxsaga.dev"
            }
        }


class ResetPasswordRequest(BaseModel):
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)

    class Config:
        json_schema_extra = {
            "example": {
                "password": "Password123",
                "confirm_password": "Password123"
            }
        }
