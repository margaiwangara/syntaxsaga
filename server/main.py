from fastapi import FastAPI
from models import user
from database import engine

app = FastAPI()

# base models
user.Base.metadata.create_all(bind=engine)


@app.get("/")
def hello_world():
    return {"message": "Hello World"}
