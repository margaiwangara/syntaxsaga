from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.connect import DB_DEPENDENCY
from models.user import ForgotPasswordRequest, ResetPasswordRequest, User
from starlette import status
from utils.email import send_email
from config import settings
from uuid import uuid4
from utils import constants

import redis

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
    # check if email exists
    email_exists = db.query(User).filter(User.email == input.email).first()

    if email_exists is None:
        raise HTTPException(404, "Email address does not exist")

    # generate reset code and store in Redis
    reset_code = uuid4()
    r.set(constants.PASSWORD_RESET_CODE, str(reset_code), ex=60*60*24)

    reset_link = f"{settings.CLIENT_PATH}/reset-password?code={reset_code}"
    # send email to user in the background
    background_tasks.add_task(
        send_email,
        input.email,
        "Reset Your Password",
        f"Click this link to reset your password: <a href=\"{reset_link}\">{reset_link}</a>. The link will expire in 24hrs."
    )


@router.post("/reset-password")
def reset_user_password():  # takes in a password and confirm_password and resets user email
    return {"message": "Reset User Password"}

# s2.domainkey.u24068541.wl042.sendgrid.net.
# s1.domainkey.u24068541.wl042.sendgrid.net.
