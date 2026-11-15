# Student Registration System
## Project 3: Database Integration

### Project Overview
This project focuses on integrating a database with a FastAPI backend to store and manage student records permanently.

SQLite is used as the database, SQLAlchemy is used for database operations, and Pydantic is used for request validation.

The application supports Create, Read, Update, and Delete (CRUD) operations.

### Project Goal
The goal of this project is to understand database integration and learn how backend applications store, retrieve, update, and delete records. It aims to connect a FastAPI application with an SQLite database using SQLAlchemy.

### Key Features
- Create new student records.
- Retrieve all student records.
- Update existing student information.
- Delete student records.
- Store data permanently using SQLite.
- Validate input data.
- Handle database operations and errors.

### Technologies Used
- Python
- FastAPI
- SQLite
- SQLAlchemy
- Pydantic
- Uvicorn

### Database Structure

**Table: students**

| Column | Data Type | Description |
|---|---|---|
| id | Integer | Primary key |
| name | String | Student name |
| email | String | Student email |
| course | String | Student course |

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/students` | Create student |
| GET | `/students` | Read student records |
| PUT | `/students/{student_id}` | Update student |
| DELETE | `/students/{student_id}` | Delete student |

### How to Run

1. Open the Project 3 folder.
2. Activate the virtual environment:

```powershell
venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Start the FastAPI server:

```powershell
uvicorn main:app --reload
```

5. Open Swagger documentation:

`http://127.0.0.1:8000/docs`

### Learning Outcomes
- Understanding relational databases.
- Creating database tables.
- Connecting FastAPI with SQLite.
- Performing CRUD operations.
- Using SQLAlchemy ORM.
- Managing database sessions.
- Understanding persistent data storage.

### Conclusion
Project 3 builds on backend API development by introducing database integration and permanent data storage through SQLite and SQLAlchemy.
