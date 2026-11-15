/**
 * =====================================================================
 * Project 04 — Frontend and Backend API Integration
 * Centralized API Communication Service & UI Controller
 * Udaan Student Records Management
 * =====================================================================
 */

// Centralized API Base URL
const API_BASE_URL = "http://127.0.0.1:8000";

// =====================================================================
// 1. API SERVICE LAYER (Fetch API + async/await)
// =====================================================================
const StudentAPI = {
    /**
     * GET /: Check API Health & Connectivity
     */
    async checkHealth() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(`${API_BASE_URL}/`, {
                method: "GET",
                signal: controller.signal,
                headers: { "Accept": "application/json" }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                return {
                    online: false,
                    status: response.status,
                    message: `Backend returned status ${response.status}`
                };
            }

            const data = await response.json();
            return {
                online: true,
                message: data.message || "Student Registration API is running!"
            };
        } catch (error) {
            return {
                online: false,
                isNetworkError: true,
                message: "Backend server is offline or unreachable at " + API_BASE_URL
            };
        }
    },

    /**
     * GET /students: Retrieve all student records
     */
    async getAllStudents() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(`${API_BASE_URL}/students`, {
                method: "GET",
                signal: controller.signal,
                headers: { "Accept": "application/json" }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                return {
                    success: false,
                    status: response.status,
                    message: errData?.detail || `Failed to fetch students (HTTP ${response.status})`
                };
            }

            const data = await response.json();
            return {
                success: true,
                students: data.students || [],
                total: data.total_students ?? (data.students?.length || 0),
                message: data.message || "Students retrieved successfully"
            };
        } catch (error) {
            return {
                success: false,
                isNetworkError: true,
                message: "Unable to connect to the backend server. Please verify FastAPI is running."
            };
        }
    },

    /**
     * POST /students: Register a new student
     */
    async registerStudent(studentData) {
        try {
            const response = await fetch(`${API_BASE_URL}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                return {
                    success: false,
                    status: response.status,
                    errorDetail: data?.detail,
                    message: StudentAPI.formatErrorMessage(response.status, data?.detail)
                };
            }

            return {
                success: true,
                student: data.student,
                message: data.message || "Student registered successfully!"
            };
        } catch (error) {
            return {
                success: false,
                isNetworkError: true,
                message: "Connection failed: Backend is offline. Start the server at " + API_BASE_URL
            };
        }
    },

    /**
     * PUT /students/{student_id}: Update an existing student
     */
    async updateStudent(studentId, studentData) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                return {
                    success: false,
                    status: response.status,
                    errorDetail: data?.detail,
                    message: StudentAPI.formatErrorMessage(response.status, data?.detail)
                };
            }

            return {
                success: true,
                student: data.student,
                message: data.message || "Student record updated successfully!"
            };
        } catch (error) {
            return {
                success: false,
                isNetworkError: true,
                message: "Connection failed: Backend is offline. Start the server at " + API_BASE_URL
            };
        }
    },

    /**
     * DELETE /students/{student_id}: Remove a student
     */
    async deleteStudent(studentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                return {
                    success: false,
                    status: response.status,
                    message: response.status === 404
                        ? "Student not found in database or already deleted."
                        : (data?.detail || `Failed to delete student (HTTP ${response.status})`)
                };
            }

            return {
                success: true,
                studentId: data.student_id,
                message: data.message || "Student record deleted successfully!"
            };
        } catch (error) {
            return {
                success: false,
                isNetworkError: true,
                message: "Connection failed: Backend is offline. Start the server at " + API_BASE_URL
            };
        }
    },

    /**
     * Helper: Convert HTTP / Pydantic validation errors into user-friendly strings
     */
    formatErrorMessage(status, detail) {
        if (status === 404) {
            return "Student record was not found.";
        }
        if (status === 500) {
            return "Internal server error occurred on the backend.";
        }
        if (status === 422 && Array.isArray(detail)) {
            const messages = detail.map((err) => {
                const field = err.loc ? err.loc[err.loc.length - 1] : "Field";
                const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);

                if (err.type === "value_error") {
                    return `Invalid ${capitalizedField}: ${err.msg}`;
                }
                if (err.type && err.type.includes("missing")) {
                    return `${capitalizedField} is required.`;
                }
                if (err.type && err.type.includes("string_too_short")) {
                    return `${capitalizedField} is too short (minimum length required).`;
                }
                if (err.type && err.type.includes("string_too_long")) {
                    return `${capitalizedField} exceeds maximum allowed length.`;
                }
                return `${capitalizedField}: ${err.msg}`;
            });
            return messages.join(" • ");
        }
        if (typeof detail === "string") {
            return detail;
        }
        return `Request failed with error status ${status}.`;
    }
};

// =====================================================================
// 2. UI CONTROLLER LAYER (DOM Management & Interactions)
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Check if the Student Records section exists on the current page
    const studentsSection = document.getElementById("students-section");
    if (!studentsSection) {
        return; // Exit gracefully if not on dashboard page
    }

    // DOM Elements - Status Widget
    const statusWidget = document.getElementById("api-status-widget");
    const statusIndicator = document.getElementById("status-indicator");
    const statusPulse = document.getElementById("status-pulse");
    const statusLabel = document.getElementById("status-label");
    const btnCheckApi = document.getElementById("btn-check-api");
    const apiBanner = document.getElementById("api-banner");
    const bannerIcon = document.getElementById("banner-icon");
    const bannerText = document.getElementById("banner-text");
    const bannerClose = document.getElementById("banner-close");

    // DOM Elements - Registration Form
    const formRegister = document.getElementById("form-register-student");
    const inputName = document.getElementById("student-name");
    const inputEmail = document.getElementById("student-email");
    const inputCourse = document.getElementById("student-course");
    const btnRegister = document.getElementById("btn-register");
    const registerFeedback = document.getElementById("register-feedback");

    // DOM Elements - Records Display
    const studentCountBadge = document.getElementById("student-count");
    const btnRefresh = document.getElementById("btn-refresh");
    const tableFeedback = document.getElementById("table-feedback");
    const studentsLoading = document.getElementById("students-loading");
    const studentsEmpty = document.getElementById("students-empty");
    const studentsOffline = document.getElementById("students-offline");
    const btnOfflineRetry = document.getElementById("btn-offline-retry");
    const tableWrapper = document.getElementById("students-table-wrapper");
    const tableBody = document.getElementById("students-table-body");

    // DOM Elements - Edit Modal
    const editModal = document.getElementById("edit-modal");
    const formEdit = document.getElementById("form-edit-student");
    const editIdInput = document.getElementById("edit-student-id");
    const editNameInput = document.getElementById("edit-student-name");
    const editEmailInput = document.getElementById("edit-student-email");
    const editCourseInput = document.getElementById("edit-student-course");
    const btnSaveEdit = document.getElementById("btn-save-edit");
    const btnCancelEdit = document.getElementById("btn-cancel-edit");
    const btnCloseEdit = document.getElementById("btn-close-edit");
    const editFeedback = document.getElementById("edit-feedback");

    // DOM Elements - Delete Modal
    const deleteModal = document.getElementById("delete-modal");
    const deleteNameSpan = document.getElementById("delete-student-name");
    const deleteIdSpan = document.getElementById("delete-student-id");
    const btnConfirmDelete = document.getElementById("btn-confirm-delete");
    const btnCancelDelete = document.getElementById("btn-cancel-delete");
    const btnCloseDelete = document.getElementById("btn-close-delete");
    const deleteFeedback = document.getElementById("delete-feedback");

    // Application State
    let pendingDeleteStudentId = null;
    let isBackendOnline = false;

    // =====================================================================
    // UI Helpers: Display Messages & Feedback
    // =====================================================================

    /**
     * Safely escapes HTML strings to prevent XSS injection
     */
    function escapeHtml(text) {
        if (!text) return "";
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show feedback box inside forms or containers
     */
    function showFeedback(element, type, message) {
        if (!element) return;
        element.hidden = false;
        element.className = `form-feedback feedback-${type}`;

        const icon = type === "success" ? "✓" : type === "error" ? "⚠️" : "ℹ️";
        element.innerHTML = `<span class="feedback-icon">${icon}</span><span class="feedback-text">${escapeHtml(message)}</span>`;
    }

    /**
     * Clear feedback box
     */
    function clearFeedback(element) {
        if (!element) return;
        element.hidden = true;
        element.className = "form-feedback";
        element.innerHTML = "";
    }

    /**
     * Show persistent banner alert at top of the section
     */
    function showBanner(type, message) {
        if (!apiBanner) return;
        apiBanner.hidden = false;
        apiBanner.className = `api-banner banner-${type}`;
        bannerIcon.textContent = type === "success" ? "✅" : type === "error" ? "⚠️" : "ℹ️";
        bannerText.innerHTML = message;
    }

    /**
     * Hide persistent banner
     */
    function hideBanner() {
        if (!apiBanner) return;
        apiBanner.hidden = true;
    }

    if (bannerClose) {
        bannerClose.addEventListener("click", hideBanner);
    }

    // =====================================================================
    // Status Indicator
    // =====================================================================
    async function updateApiStatus() {
        if (statusPulse) statusPulse.className = "status-pulse pulse-checking";
        if (statusLabel) statusLabel.textContent = "Checking API...";

        const result = await StudentAPI.checkHealth();
        isBackendOnline = result.online;

        if (result.online) {
            if (statusPulse) statusPulse.className = "status-pulse pulse-online";
            if (statusLabel) statusLabel.textContent = "Backend Online (127.0.0.1:8000)";
            if (statusWidget) statusWidget.title = result.message;
            hideBanner();
        } else {
            if (statusPulse) statusPulse.className = "status-pulse pulse-offline";
            if (statusLabel) statusLabel.textContent = "Backend Offline";
            if (statusWidget) statusWidget.title = result.message;
            showBanner(
                "error",
                `<strong>Backend Offline:</strong> Unable to connect to <code>${API_BASE_URL}</code>. Start your FastAPI server using <code>uvicorn main:app --reload</code>.`
            );
        }

        return result.online;
    }

    if (btnCheckApi) {
        btnCheckApi.addEventListener("click", async () => {
            btnCheckApi.disabled = true;
            btnCheckApi.textContent = "↻ Checking...";
            const online = await updateApiStatus();
            if (online) {
                await loadStudents();
            }
            btnCheckApi.disabled = false;
            btnCheckApi.textContent = "↻ Check Status";
        });
    }

    // =====================================================================
    // Load & Render Students (GET /students)
    // =====================================================================
    async function loadStudents() {
        // Show loading state
        if (studentsLoading) studentsLoading.hidden = false;
        if (studentsEmpty) studentsEmpty.hidden = true;
        if (studentsOffline) studentsOffline.hidden = true;
        if (tableWrapper) tableWrapper.hidden = true;
        clearFeedback(tableFeedback);

        const result = await StudentAPI.getAllStudents();

        if (studentsLoading) studentsLoading.hidden = true;

        if (!result.success) {
            if (result.isNetworkError) {
                if (studentsOffline) studentsOffline.hidden = false;
                if (statusPulse) statusPulse.className = "status-pulse pulse-offline";
                if (statusLabel) statusLabel.textContent = "Backend Offline";
            } else {
                showFeedback(tableFeedback, "error", result.message);
            }
            if (studentCountBadge) studentCountBadge.textContent = "Offline";
            return;
        }

        // Backend is responding successfully
        if (statusPulse) statusPulse.className = "status-pulse pulse-online";
        if (statusLabel) statusLabel.textContent = "Backend Online (127.0.0.1:8000)";

        const students = result.students || [];

        // Update count badge
        if (studentCountBadge) {
            studentCountBadge.textContent = `${students.length} ${students.length === 1 ? "student" : "students"}`;
        }

        // Handle empty state
        if (students.length === 0) {
            if (studentsEmpty) studentsEmpty.hidden = false;
            if (tableWrapper) tableWrapper.hidden = true;
            return;
        }

        // Render rows
        if (tableBody) {
            tableBody.innerHTML = "";
            students.forEach((student) => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-student-id", student.id);

                tr.innerHTML = `
                    <td>
                        <span class="student-id-pill">#${escapeHtml(String(student.id))}</span>
                    </td>
                    <td>
                        <div class="student-name-cell">
                            <span class="student-avatar">${escapeHtml(student.name.charAt(0).toUpperCase())}</span>
                            <span class="student-name-text">${escapeHtml(student.name)}</span>
                        </div>
                    </td>
                    <td>
                        <a href="mailto:${escapeHtml(student.email)}" class="student-email-link">
                            ${escapeHtml(student.email)}
                        </a>
                    </td>
                    <td>
                        <span class="student-course-badge">${escapeHtml(student.course)}</span>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button
                                type="button"
                                class="btn-action-edit"
                                data-id="${student.id}"
                                data-name="${escapeHtml(student.name)}"
                                data-email="${escapeHtml(student.email)}"
                                data-course="${escapeHtml(student.course)}"
                                title="Edit Student #${student.id}"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                type="button"
                                class="btn-action-delete"
                                data-id="${student.id}"
                                data-name="${escapeHtml(student.name)}"
                                title="Delete Student #${student.id}"
                            >
                                🗑 Delete
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(tr);
            });
        }

        if (tableWrapper) tableWrapper.hidden = false;
    }

    if (btnRefresh) {
        btnRefresh.addEventListener("click", async () => {
            btnRefresh.disabled = true;
            btnRefresh.innerHTML = "<span>↻</span> Refreshing...";
            await loadStudents();
            btnRefresh.disabled = false;
            btnRefresh.innerHTML = "<span>↻</span> Refresh";
        });
    }

    if (btnOfflineRetry) {
        btnOfflineRetry.addEventListener("click", async () => {
            await updateApiStatus();
            await loadStudents();
        });
    }

    // =====================================================================
    // Register Student (POST /students)
    // =====================================================================
    if (formRegister) {
        formRegister.addEventListener("submit", async (event) => {
            event.preventDefault();
            clearFeedback(registerFeedback);

            const name = inputName.value.trim();
            const email = inputEmail.value.trim();
            const course = inputCourse.value.trim();

            // Client-side quick checks
            if (!name || name.length < 2) {
                showFeedback(registerFeedback, "error", "Please enter a valid student name (at least 2 characters).");
                inputName.focus();
                return;
            }
            if (!email || !email.includes("@")) {
                showFeedback(registerFeedback, "error", "Please provide a valid email address (e.g. name@example.com).");
                inputEmail.focus();
                return;
            }
            if (!course || course.length < 2) {
                showFeedback(registerFeedback, "error", "Please enter a course name (at least 2 characters).");
                inputCourse.focus();
                return;
            }

            // Disable submit button during request to prevent duplicates
            btnRegister.disabled = true;
            const originalBtnHtml = btnRegister.innerHTML;
            btnRegister.innerHTML = `<span class="btn-spinner"></span> Registering...`;

            try {
                const response = await StudentAPI.registerStudent({ name, email, course });

                if (!response.success) {
                    showFeedback(registerFeedback, "error", response.message);
                } else {
                    showFeedback(
                        registerFeedback,
                        "success",
                        `✓ ${response.message} (ID #${response.student.id})`
                    );
                    // Reset form fields
                    formRegister.reset();

                    // Refresh student list
                    await loadStudents();

                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        clearFeedback(registerFeedback);
                    }, 5000);
                }
            } finally {
                btnRegister.disabled = false;
                btnRegister.innerHTML = originalBtnHtml;
            }
        });
    }

    // =====================================================================
    // Edit Student Modal & Handler (PUT /students/{id})
    // =====================================================================
    function openEditModal(id, name, email, course) {
        if (!editModal) return;
        editIdInput.value = id;
        editNameInput.value = name;
        editEmailInput.value = email;
        editCourseInput.value = course;
        clearFeedback(editFeedback);

        editModal.hidden = false;
        editModal.setAttribute("aria-hidden", "false");
        editNameInput.focus();
    }

    function closeEditModal() {
        if (!editModal) return;
        editModal.hidden = true;
        editModal.setAttribute("aria-hidden", "true");
        clearFeedback(editFeedback);
    }

    if (btnCancelEdit) btnCancelEdit.addEventListener("click", closeEditModal);
    if (btnCloseEdit) btnCloseEdit.addEventListener("click", closeEditModal);

    if (formEdit) {
        formEdit.addEventListener("submit", async (event) => {
            event.preventDefault();
            clearFeedback(editFeedback);

            const studentId = editIdInput.value;
            const name = editNameInput.value.trim();
            const email = editEmailInput.value.trim();
            const course = editCourseInput.value.trim();

            if (!name || name.length < 2) {
                showFeedback(editFeedback, "error", "Name must be at least 2 characters.");
                return;
            }
            if (!email || !email.includes("@")) {
                showFeedback(editFeedback, "error", "Please enter a valid email address.");
                return;
            }
            if (!course || course.length < 2) {
                showFeedback(editFeedback, "error", "Course must be at least 2 characters.");
                return;
            }

            btnSaveEdit.disabled = true;
            const originalSaveHtml = btnSaveEdit.innerHTML;
            btnSaveEdit.innerHTML = `<span class="btn-spinner"></span> Saving...`;

            try {
                const response = await StudentAPI.updateStudent(studentId, { name, email, course });

                if (!response.success) {
                    showFeedback(editFeedback, "error", response.message);
                } else {
                    closeEditModal();
                    showFeedback(tableFeedback, "success", `✓ Updated record for ${response.student.name} (ID #${response.student.id})`);
                    await loadStudents();

                    setTimeout(() => clearFeedback(tableFeedback), 4000);
                }
            } finally {
                btnSaveEdit.disabled = false;
                btnSaveEdit.innerHTML = originalSaveHtml;
            }
        });
    }

    // =====================================================================
    // Delete Student Modal & Handler (DELETE /students/{id})
    // =====================================================================
    function openDeleteModal(id, name) {
        if (!deleteModal) return;
        pendingDeleteStudentId = id;
        deleteIdSpan.textContent = id;
        deleteNameSpan.textContent = name;
        clearFeedback(deleteFeedback);

        deleteModal.hidden = false;
        deleteModal.setAttribute("aria-hidden", "false");
        btnConfirmDelete.focus();
    }

    function closeDeleteModal() {
        if (!deleteModal) return;
        deleteModal.hidden = true;
        deleteModal.setAttribute("aria-hidden", "true");
        pendingDeleteStudentId = null;
        clearFeedback(deleteFeedback);
    }

    if (btnCancelDelete) btnCancelDelete.addEventListener("click", closeDeleteModal);
    if (btnCloseDelete) btnCloseDelete.addEventListener("click", closeDeleteModal);

    if (btnConfirmDelete) {
        btnConfirmDelete.addEventListener("click", async () => {
            if (!pendingDeleteStudentId) return;

            btnConfirmDelete.disabled = true;
            const originalDeleteHtml = btnConfirmDelete.innerHTML;
            btnConfirmDelete.innerHTML = `<span class="btn-spinner"></span> Deleting...`;

            try {
                const response = await StudentAPI.deleteStudent(pendingDeleteStudentId);

                if (!response.success) {
                    showFeedback(deleteFeedback, "error", response.message);
                } else {
                    closeDeleteModal();
                    showFeedback(tableFeedback, "success", `✓ Student #${pendingDeleteStudentId} was deleted from database.`);
                    await loadStudents();

                    setTimeout(() => clearFeedback(tableFeedback), 4000);
                }
            } finally {
                btnConfirmDelete.disabled = false;
                btnConfirmDelete.innerHTML = originalDeleteHtml;
            }
        });
    }

    // =====================================================================
    // Table Action Delegation (Edit & Delete clicks)
    // =====================================================================
    if (tableBody) {
        tableBody.addEventListener("click", (event) => {
            const editBtn = event.target.closest(".btn-action-edit");
            if (editBtn) {
                const { id, name, email, course } = editBtn.dataset;
                openEditModal(id, name, email, course);
                return;
            }

            const deleteBtn = event.target.closest(".btn-action-delete");
            if (deleteBtn) {
                const { id, name } = deleteBtn.dataset;
                openDeleteModal(id, name);
                return;
            }
        });
    }

    // Modal Close via Backdrop and Escape Key
    [editModal, deleteModal].forEach((modal) => {
        if (!modal) return;
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                if (modal === editModal) closeEditModal();
                if (modal === deleteModal) closeDeleteModal();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (editModal && !editModal.hidden) closeEditModal();
            if (deleteModal && !deleteModal.hidden) closeDeleteModal();
        }
    });

    // =====================================================================
    // Initial Boot: Check API Status & Load Students
    // =====================================================================
    (async () => {
        await updateApiStatus();
        await loadStudents();
    })();
});
