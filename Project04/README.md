# Udaan — Learn. Earn. Grow.
## Project 4: Frontend and Backend API Integration

### Project Overview
Project 4 focuses on connecting the Udaan frontend developed in Project 1 with the Student Registration API and database developed in Project 3.

The frontend communicates with the FastAPI backend through REST API requests using JavaScript Fetch API. Student information is stored and managed in an SQLite database.

This project brings the frontend, backend, and database together into a full-stack application.

### Project Goal
The goal of this project is to integrate the existing frontend with the backend API and database to create a functional full-stack application.

It aims to establish communication between frontend and backend using REST APIs, implement CRUD operations, and understand how data flows between the user interface, backend services, and database.

### Key Features
- Integration of the existing Udaan frontend.
- Frontend-backend communication using Fetch API.
- Student registration through the interface.
- Display student records from the database.
- Update existing student information.
- Delete student records.
- API response and error handling.
- Loading, success, and empty states.
- Backend connectivity checking.

### Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- Fetch API

**Backend**
- Python
- FastAPI
- Uvicorn
- Pydantic

**Database**
- SQLite
- SQLAlchemy

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/students` | Register student |
| GET | `/students` | Retrieve students |
| PUT | `/students/{student_id}` | Update student |
| DELETE | `/students/{student_id}` | Delete student |

### How to Run

**Step 1: Start the Backend**

Open the backend folder:

```powershell
cd backend
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies if required:

```powershell
pip install -r requirements.txt
```

Run the backend:

```powershell
uvicorn main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

**Step 2: Start the Frontend**

Open another terminal:

```powershell
cd frontend
```

Start the frontend server:

```powershell
python -m http.server 3000
```

Open the application:

`http://127.0.0.1:3000`

### Frontend and Backend Communication Flow

1. The user performs an action on the frontend.
2. JavaScript sends an HTTP request using Fetch API.
3. FastAPI receives and processes the request.
4. SQLAlchemy communicates with the SQLite database.
5. The backend returns a JSON response.
6. JavaScript updates the frontend based on the response.

### Learning Outcomes
- Understanding full-stack development.
- Connecting frontend and backend applications.
- Working with REST APIs.
- Using Fetch API and async/await.
- Handling JSON data.
- Implementing CRUD operations through a user interface.
- Managing API errors and responses.
- Understanding the complete frontend-backend-database workflow.

### Conclusion
Project 4 combines the work completed in Projects 1, 2, and 3 to demonstrate practical full-stack development. It provides experience in connecting a frontend interface with backend APIs and a database to build a functional application.
