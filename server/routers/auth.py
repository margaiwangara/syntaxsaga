from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.connect import DB_DEPENDENCY
from models.user import ForgotPasswordRequest, ResetPasswordRequest, User
from starlette import status
from utils.email import send_email
from config import settings
from uuid import uuid4
from lib.auth import check_email_exists

import redis
import json

router = APIRouter(
    tags=["Authentication and Authorization"],
    prefix="/auth"
)

r = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT
)


@router.post("/register")
def register_user():
    return {"message": "Register"}


@router.post("/login")
def login_user():
    return {"message": "Login"}


@router.post("/forgot-password", status_code=status.HTTP_204_NO_CONTENT)
# takes in an email address and send reset password email
def forgot_user_password(input: ForgotPasswordRequest, db: DB_DEPENDENCY, background_tasks: BackgroundTasks):
    email_exists = check_email_exists(input.email, db)

    # generate reset code and store in Redis
    reset_code = uuid4()
    r.set(email_exists.email, str(reset_code), ex=60*60*24)

    reset_link = f"{settings.CLIENT_PATH}/reset-password?code={reset_code}"
    # send email to user in the background
    background_tasks.add_task(
        send_email,
        email_exists.email,
        "Reset Your Password",
        f"Click this link to reset your password: <a href=\"{reset_link}\">{reset_link}</a>. The link will expire in 24hrs."
    )


@router.post("/reset-password", status_code=status.HTTP_204_NO_CONTENT)
# takes in a password and confirm_password and resets user email
def reset_user_password(input: ResetPasswordRequest, db: DB_DEPENDENCY, background_tasks: BackgroundTasks):
    # check if email exists
    email_exists = check_email_exists(input.email, db)

    # check if code exists or is invalid
    reset_code = r.get(email_exists.email)

    if reset_code is None or reset_code.decode() != str(input.code):
        raise HTTPException(400, "Invalid password reset code")

    # delete entry from redis
    r.delete(email_exists.email)

    # check if passwords match
    if input.password != input.confirm_password:
        raise HTTPException(400, "Passwords must match")

    # reset password
    email_exists.password = input.password
    db.add(email_exists)
    db.commit()

    # send confirmation email
    background_tasks.add_task(
        send_email,
        email_exists.email,
        "Password Reset Successful",
        "Your password has been reset successfully"
    )
