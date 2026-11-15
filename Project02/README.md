# Student Registration API
## Project 2: Backend API Development

### Project Overview
This project focuses on developing a backend API for a Student Registration System using Python and FastAPI.

The API allows users to retrieve student information and register new students through HTTP requests. It also includes input validation and appropriate success and error responses.

### Project Goal
The goal of this project is to understand backend development and learn how to create REST APIs using FastAPI. It focuses on handling client requests, processing data, validating inputs, and returning structured responses.

### Key Features
- GET endpoint to retrieve student records.
- POST endpoint to register a new student.
- Request data validation.
- Structured JSON responses.
- Success and error handling.
- Interactive API documentation using Swagger UI.

### Technologies Used
- Python
- FastAPI
- Uvicorn
- Pydantic

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/students` | Retrieve students |
| POST | `/students` | Register a student |

### How to Run

1. Open the Project 2 folder.
2. Activate the virtual environment:

```powershell
venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Start the server:

```powershell
uvicorn main:app --reload
```

5. Open the API documentation:

`http://127.0.0.1:8000/docs`

### Learning Outcomes
- Understanding backend development.
- Creating REST API endpoints.
- Working with HTTP methods.
- Validating request data using Pydantic.
- Handling API responses and errors.
- Testing APIs through Swagger UI.

### Conclusion
Project 2 provides practical experience in developing backend services and understanding how REST APIs handle client requests and responses.
