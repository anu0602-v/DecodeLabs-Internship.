from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(
    title="Student Registration API",
    description="A simple backend API for student registration",
    version="1.0.0"
)

# Temporary student data
students = [
    {
        "id": 1,
        "name": "Anjali",
        "email": "anjali@example.com",
        "course": "Computer Science"
    },
    {
        "id": 2,
        "name": "Rahul",
        "email": "rahul@example.com",
        "course": "Information Technology"
    }
]


# Data validation model
class StudentCreate(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: EmailStr
    course: str = Field(min_length=2, max_length=100)


# GET API: Home
@app.get("/")
def home():
    return {
        "message": "Welcome to Student Registration API"
    }


# GET API: Retrieve students
@app.get("/students")
def get_students():
    return {
        "message": "Students retrieved successfully",
        "total_students": len(students),
        "students": students
    }


# POST API: Register a student
@app.post("/students")
def register_student(student: StudentCreate):

    new_student = {
        "id": len(students) + 1,
        "name": student.name,
        "email": student.email,
        "course": student.course
    }

    students.append(new_student)

    return {
        "message": "Student registered successfully",
        "student": new_student
    }