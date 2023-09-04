import requests
from config import settings


def send_email(to: str, subject: str, message: str):
    try:
        send = requests.post(
            settings.MG_HOST_URL,
            auth=("api", settings.MG_API_KEY),
            data={
                "from": settings.MG_SEND_EMAIL_FROM,
                "to": [to],
                "subject": subject,
                "text": message
            }
        )
        print(send.status_code)  # print message here
        return True
    except Exception as err:
        print(err)
        return False
