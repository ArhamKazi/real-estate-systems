# backend/app/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL env var (Postgres on Render). Fallback to local sqlite for dev.
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./real_estate.db")

# For Postgres, SQLAlchemy needs a different param style
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
