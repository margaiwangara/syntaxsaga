from database import Base
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, DateTime


class User(Base):
    __tablename__ = "users"
