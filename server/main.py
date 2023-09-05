from fastapi import FastAPI
from models import user
from database import engine
from routers import auth

app = FastAPI()

# base models
user.Base.metadata.create_all(bind=engine)

# include routers
app.include_router(auth.router, prefix="/api")


@app.get("/")
def hello_world():
    return {"message": "Hello World"}
