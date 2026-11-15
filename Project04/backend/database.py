import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database location (resolved relative to this file for maximum reliability)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "students.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

# Create database engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for database models
Base = declarative_base()