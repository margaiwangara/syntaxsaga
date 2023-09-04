from fastapi import APIRouter, HTTPException
from models.connect import DB_DEPENDENCY
from models.user import ForgotPasswordRequest, ResetPasswordRequest, User
from starlette import status
from utils.email import send_email

import smtplib

router = APIRouter(
    tags=["Authentication and Authorization"],
    prefix="/auth"
)


@router.post("/register")
def register_user():
    return {"message": "Register"}


@router.post("/login")
def login_user():
    return {"message": "Login"}


@router.post("/forgot-password")
# takes in an email address and send reset password email
def forgot_user_password(input: ForgotPasswordRequest, db: DB_DEPENDENCY):
    # check if email exists
    # email_exists = db.query(User).filter(User.email == input.email).first()

    # if email_exists is None:
    #     raise HTTPException(404, "Email address does not exist")

    # send email to user in the background
    send = send_email(input.email, "Reset Your Password",
                      "Click this link to reset your password")

    print(send)

    return {"message": "Forgot Password"}


@router.post("/reset-password")
def reset_user_password():  # takes in a password and confirm_password and resets user email
    return {"message": "Reset User Password"}

# s2.domainkey.u24068541.wl042.sendgrid.net.
# s1.domainkey.u24068541.wl042.sendgrid.net.
