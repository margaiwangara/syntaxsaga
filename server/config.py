from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MYSQL_HOST: str = "localhost"
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_DB: str

    class Config:
        env_file = ".env"


settings = Settings()
