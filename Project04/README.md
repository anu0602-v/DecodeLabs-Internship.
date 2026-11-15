# Project 04 — Frontend and Backend API Integration

A complete, full-stack web application integrating the **Udaan** empowerment platform frontend with the **FastAPI + SQLite** Student Registration backend.

---

## 1. Project Overview

Project 04 demonstrates end-to-end full-stack data flow and API integration between an existing modern web frontend (HTML5, CSS3, Vanilla JavaScript) and an asynchronous RESTful API backend (FastAPI, SQLAlchemy, SQLite).

### Key Features
- **Live Backend Health Monitoring:** Automatic status checking via `GET /` with real-time visual pulse indicator (Online / Offline / Checking).
- **Student Registration (POST):** Form to register students with instant validation and dynamic SQLite database insertion via `POST /students`.
- **Dynamic Data Display (GET):** Real-time database query and rendering of enrolled students with ID, name, email, and course via `GET /students`.
- **Interactive Student Updates (PUT):** In-place editing via a sleek modal dialog that submits changes via `PUT /students/{student_id}` and refreshes the table.
- **Safe Student Deletion (DELETE):** Confirmation dialog before deleting a record with `DELETE /students/{student_id}` to prevent accidental data loss.
- **Resilient Error Handling:** Graceful handling for offline servers, network drops, 404 Not Found, 422 Validation Errors (invalid emails, short names), and duplicate submission prevention via button state management.
- **Original Udaan Design:** Preserves Udaan's visual identity, typography (Inter + Poppins), lavender/purple color scheme (`#7654d8`), cards, shadows, and responsive layout.

---

## 2. Folder Structure

```text
Project04/
│
├── frontend/
│   ├── index.html                  # Udaan Landing Page with direct link to Student Records
│   ├── css/
│   │   ├── style.css               # Global Udaan design system
│   │   ├── dashboard.css           # Dashboard layout & Student Records API section styles
│   │   ├── auth.css                # Authentication styles
│   │   ├── agents.css              # AI agent showcase styles
│   │   ├── onboarding.css          # Onboarding styles
│   │   └── responsive.css          # Responsive breakpoint utilities
│   ├── js/
│   │   ├── api.js                  # Centralized API service & DOM integration controller
│   │   ├── dashboard.js            # Existing dashboard logic (greeting, progress, agents)
│   │   ├── main.js                 # Landing page interactions & mobile navigation
│   │   ├── auth.js                 # Authentication logic
│   │   ├── agents.js               # AI agent interactions
│   │   └── onboarding.js           # Multi-step onboarding logic
│   └── pages/
│       ├── dashboard.html          # Main Dashboard containing Student Records API section
│       ├── agents.html             # Agents view
│       ├── login.html              # Login page
│       ├── signup.html             # Signup page
│       └── onboarrding.html        # Onboarding page
│
├── backend/
│   ├── main.py                     # FastAPI app with CORS middleware and CRUD endpoints
│   ├── database.py                 # SQLite database connection & session setup
│   ├── models.py                   # SQLAlchemy Student database model
│   ├── schemas.py                  # Pydantic validation schemas (StudentCreate, StudentUpdate)
│   ├── requirements.txt            # Python dependencies
│   └── students.db                 # SQLite database file
│
└── README.md                       # Comprehensive project documentation
```

---

## 3. Technologies Used

### Frontend
- **HTML5:** Semantic document markup, forms, accessible modal dialogs (`role="dialog"`).
- **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, keyframe animations, glassmorphism (`backdrop-filter`).
- **JavaScript (ES6+):** Modern Fetch API, `async/await`, dynamic DOM manipulation, Event delegation, and HTML entity escaping for XSS protection.

### Backend
- **Python 3.10+ / 3.14:** Core programming language.
- **FastAPI:** High-performance asynchronous web framework for REST APIs.
- **Uvicorn:** Lightning-fast ASGI server.
- **SQLAlchemy 2.0:** Object-Relational Mapper (ORM) for database interactions.
- **SQLite3:** Embedded relational database.
- **Pydantic & email-validator:** Request body validation, data schemas, and email syntax verification.
- **FastAPI CORSMiddleware:** Cross-Origin Resource Sharing enablement for cross-port communication.

---

## 4. Installation & Setup

### Prerequisites
- Python 3.10 or higher installed.
- Modern web browser (Chrome, Edge, Firefox, Safari).

### Step 1: Install Backend Dependencies
Open a terminal in the `Project04/backend` directory:
```bash
cd backend
pip install -r requirements.txt
```

---

## 5. Running the Application

### Step 2: Start the FastAPI Backend
From the `Project04/backend` folder, run:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
The backend server will start at:
- **API Base URL:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`
- **Alternative ReDoc:** `http://127.0.0.1:8000/redoc`

### Step 3: Launch the Frontend
You can run a local HTTP server or open the HTML files directly:

**Option A (Recommended - Local HTTP Server):**
Open a new terminal in the `Project04/frontend` directory:
```bash
cd frontend
python -m http.server 3000
```
Then visit:
- **Landing Page:** `http://localhost:3000/index.html`
- **Dashboard with Student Records:** `http://localhost:3000/pages/dashboard.html`

**Option B (Direct Browser File):**
Double-click `Project04/frontend/pages/dashboard.html` to open it in your browser. Thanks to the configured CORS wildcard, all API calls to `http://127.0.0.1:8000` work smoothly.

---

## 6. REST API Endpoints

| Method | Endpoint | Description | Request Body | Response Example |
|---|---|---|---|---|
| `GET` | `/` | API Status Health Check | None | `{"message": "Student Registration API with Database is running!"}` |
| `POST` | `/students` | Register a new student | `{"name": str, "email": str, "course": str}` | `{"message": "Student registered successfully", "student": {...}}` |
| `GET` | `/students` | Retrieve all registered students | None | `{"message": "Students retrieved successfully", "total_students": 1, "students": [...]}` |
| `PUT` | `/students/{student_id}` | Update student details | `{"name": str, "email": str, "course": str}` | `{"message": "Student updated successfully", "student": {...}}` |
| `DELETE` | `/students/{student_id}` | Remove student record | None | `{"message": "Student deleted successfully", "student_id": 1}` |

### Validation Rules
- **name:** String between 2 and 50 characters (required).
- **email:** Valid RFC-compliant email address (required).
- **course:** String between 2 and 100 characters (required).

---

## 7. Full-Stack Data Flow

```text
+-----------------------------------------------------------------------------------+
|                                  USER ACTION                                      |
|    (Enters student details in form / Clicks Edit / Clicks Delete / Refreshes)     |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 UDAAN FRONTEND                                    |
|          Client-side basic check -> Prevents duplicate click (button disabled)    |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                           JAVASCRIPT FETCH API (api.js)                           |
|       async/await HTTP request (GET / POST / PUT / DELETE) to 127.0.0.1:8000       |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                FASTAPI BACKEND                                    |
|     CORS Middleware -> Pydantic Schema Validation -> Route Handler Execution      |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                               SQLAlchemy ORM                                      |
|        db.query() / db.add() / db.commit() / db.refresh() / db.delete()           |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              SQLITE DATABASE                                      |
|                            students.db file storage                               |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                               JSON API RESPONSE                                   |
|      HTTP 200/201 (Success) / HTTP 422 (Validation) / HTTP 404 (Not Found)       |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             DYNAMIC DOM UPDATE                                    |
|    Table re-rendered, count updated, success/error banners shown, button restored |
+-----------------------------------------------------------------------------------+
```

---

## 8. Error Handling & Edge Cases

| Scenario | System Behavior | User Interface Presentation |
|---|---|---|
| **Backend Offline** | `fetch()` fails with connection error | Pulse indicator turns **red** ("Backend Offline"); notification banner warns user; friendly offline state shown with "↻ Retry Connection" button. |
| **Invalid Email** | FastAPI returns `422 Unprocessable Entity` | Form highlights the issue: *"Invalid Email: value is not a valid email address"*. |
| **Short Name / Course** | Pydantic validation error `422` | Form message: *"Name must be at least 2 characters"*. |
| **Student Not Found (404)** | Updating/Deleting non-existent ID | Red alert: *"Student record was not found or already deleted"*. |
| **Duplicate Submissions** | Button disabled with spinner during request | Submit/Save/Delete button state changes to *"Processing..."* with spinner; re-enabled on completion. |
| **Empty Database** | `GET /students` returns `[]` | Empty state displays a friendly folder icon and message: *"No Student Records Found. Use the form to register your first student."* |
| **XSS Prevention** | User enters HTML or `<script>` tags | Input is safely escaped using DOM `textContent` before rendering into the table. |

---

## 9. Testing & Verification Guide

Follow these steps to verify all requirements:

1. **Test 1 — Backend Health Check:**
   - Launch the FastAPI server: `uvicorn main:app --reload`.
   - Open `frontend/pages/dashboard.html`.
   - Notice the status badge shows **Backend Online (127.0.0.1:8000)** with a pulsing green dot.

2. **Test 2 — Register Student (POST):**
   - In "Register a Student", enter:
     - Name: `Priya Sharma`
     - Email: `priya.sharma@example.com`
     - Course: `Full-Stack Web Development`
   - Click **Register Student**.
   - Button shows "Registering..." and disables.
   - Success message appears: *"✓ Student registered successfully! (ID #1)"*.
   - Table immediately updates with Priya Sharma's record.

3. **Test 3 — Data Persistence Across Refresh:**
   - Press **F5** or reload the browser.
   - Notice the record for Priya Sharma remains in the table, verified from SQLite.

4. **Test 4 — Update Student (PUT):**
   - Click the **✏️ Edit** button on the student row.
   - The modal dialog opens pre-filled with the current details.
   - Change Course to `Cloud Computing & AI`.
   - Click **Save Changes**.
   - Notice the table refreshes showing the updated course.

5. **Test 5 — Input Validation (422):**
   - Try registering with Name: `A` (too short) or Email: `notanemail`.
   - Click **Register Student**.
   - Notice user-friendly validation error messages appear without breaking the page.

6. **Test 6 — Delete Student with Confirmation (DELETE):**
   - Click **🗑 Delete** on the student row.
   - Confirmation dialog prompts: *"Are you sure you want to delete Priya Sharma? Student ID #1 will be permanently removed from the SQLite database."*
   - Click **Yes, Delete**.
   - The student is deleted from SQLite, and the table updates to the empty state.

7. **Test 7 — Backend Offline Behavior:**
   - Terminate the FastAPI backend in the terminal (`Ctrl + C`).
   - Click **↻ Check Status** or **↻ Refresh** in the dashboard.
   - The status badge turns red (**Backend Offline**).
   - An alert banner informs the user that the backend server is unreachable.
   - Re-start the backend and click **Retry Connection** to recover.
