from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import engine, Base, SessionLocal
from models import Student
from schemas import StudentCreate, StudentUpdate


app = FastAPI(
    title="Student Registration API",
    description="Student API with SQLite Database",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)


# Database session dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# HOME
@app.get("/")
def home():
    return {
        "message": "Student Registration API with Database is running!"
    }


# CREATE: Register a student
@app.post("/students")
def register_student(student: StudentCreate, db: Session = Depends(get_db)):

    new_student = Student(
        name=student.name,
        email=student.email,
        course=student.course
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student registered successfully",
        "student": {
            "id": new_student.id,
            "name": new_student.name,
            "email": new_student.email,
            "course": new_student.course
        }
    }


# READ: Get all students
@app.get("/students")
def get_students(db: Session = Depends(get_db)):

    students = db.query(Student).all()

    return {
        "message": "Students retrieved successfully",
        "total_students": len(students),
        "students": students
    }


# UPDATE: Edit student details
@app.put("/students/{student_id}")
def update_student(
    student_id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db)
):

    existing_student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if existing_student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    existing_student.name = student.name
    existing_student.email = student.email
    existing_student.course = student.course

    db.commit()
    db.refresh(existing_student)

    return {
        "message": "Student updated successfully",
        "student": {
            "id": existing_student.id,
            "name": existing_student.name,
            "email": existing_student.email,
            "course": existing_student.course
        }
    }


# DELETE: Remove a student
@app.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    existing_student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if existing_student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(existing_student)
    db.commit()

    return {
        "message": "Student deleted successfully",
        "student_id": student_id
    }