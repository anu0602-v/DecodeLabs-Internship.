
/* =========================================
   UDAAN - AUTHENTICATION JAVASCRIPT
========================================= */


/* =========================================
   1. COMMON ELEMENTS
========================================= */

// Automatically update copyright year

const yearElement = document.getElementById("auth-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Email validation pattern

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Helper function to display errors

function showError(input, errorElement, message) {

    input.classList.add("invalid");
    errorElement.textContent = message;

}


// Helper function to clear errors

function clearError(input, errorElement) {

    input.classList.remove("invalid");
    errorElement.textContent = "";

}


// Helper function to show form messages

function showMessage(element, message, type) {

    element.textContent = message;
    element.className = `form-message ${type}`;

}


// Clear form-level messages

function clearMessage(element) {

    element.textContent = "";
    element.className = "form-message";

}


/* =========================================
   2. SHOW / HIDE PASSWORD
========================================= */

const passwordToggles = document.querySelectorAll(
    ".password-toggle"
);

passwordToggles.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) return;

        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";

        button.textContent = isHidden ? "Hide" : "Show";

        button.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );

        button.setAttribute(
            "aria-pressed",
            String(isHidden)
        );

    });

});


/* =========================================
   3. LOGIN FORM VALIDATION
========================================= */

const loginForm = document.getElementById("login-form");

if (loginForm) {

    const emailInput = document.getElementById("login-email");

    const passwordInput = document.getElementById("login-password");

    const emailError = document.getElementById("login-email-error");

    const passwordError = document.getElementById("login-password-error");

    const loginMessage = document.getElementById("login-message");


    // Clear errors when the user edits the fields

    emailInput.addEventListener("input", () => {

        clearError(emailInput, emailError);
        clearMessage(loginMessage);

    });

    passwordInput.addEventListener("input", () => {

        clearError(passwordInput, passwordError);
        clearMessage(loginMessage);

    });


    // Handle login submission

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        clearMessage(loginMessage);

        let isValid = true;

        const email = emailInput.value.trim();

        const password = passwordInput.value;


        // Validate email

        if (!email) {

            showError(
                emailInput,
                emailError,
                "Please enter your email address."
            );

            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearError(emailInput, emailError);

        }


        // Validate password

        if (!password.trim()) {

            showError(
                passwordInput,
                passwordError,
                "Please enter your password."
            );

            isValid = false;

        } else {

            clearError(passwordInput, passwordError);

        }


        // Stop if validation fails

        if (!isValid) {

            const firstInvalidField =
                loginForm.querySelector(".invalid");

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;

        }


        // Frontend demonstration only

        showMessage(
            loginMessage,
            "Form validation successful! Real account login will be available after backend integration.",
            "success"
        );

    });

}


/* =========================================
   4. SIGNUP FORM VALIDATION
========================================= */

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    const nameInput = document.getElementById("signup-name");

    const emailInput = document.getElementById("signup-email");

    const passwordInput = document.getElementById("signup-password");

    const confirmPasswordInput =
        document.getElementById("confirm-password");

    const termsInput = document.getElementById("terms");


    // Error elements

    const nameError = document.getElementById("signup-name-error");

    const emailError = document.getElementById("signup-email-error");

    const passwordError =
        document.getElementById("signup-password-error");

    const confirmPasswordError =
        document.getElementById("confirm-password-error");

    const termsError = document.getElementById("terms-error");

    const signupMessage = document.getElementById("signup-message");


    // Validate password strength

    function isStrongPassword(password) {

        const hasMinimumLength = password.length >= 8;

        const hasUppercase = /[A-Z]/.test(password);

        const hasLowercase = /[a-z]/.test(password);

        const hasNumber = /[0-9]/.test(password);

        return (
            hasMinimumLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber
        );

    }


    // Clear individual errors when editing

    nameInput.addEventListener("input", () => {

        clearError(nameInput, nameError);
        clearMessage(signupMessage);

    });

    emailInput.addEventListener("input", () => {

        clearError(emailInput, emailError);
        clearMessage(signupMessage);

    });

    passwordInput.addEventListener("input", () => {

        clearError(passwordInput, passwordError);
        clearMessage(signupMessage);

    });

    confirmPasswordInput.addEventListener("input", () => {

        clearError(confirmPasswordInput, confirmPasswordError);
        clearMessage(signupMessage);

    });

    termsInput.addEventListener("change", () => {

        termsError.textContent = "";
        clearMessage(signupMessage);

    });


    // Handle signup submission

    signupForm.addEventListener("submit", event => {

        event.preventDefault();

        clearMessage(signupMessage);

        let isValid = true;


        const name = nameInput.value.trim();

        const email = emailInput.value.trim();

        const password = passwordInput.value;

        const confirmPassword = confirmPasswordInput.value;


        // -------------------------
        // NAME VALIDATION
        // -------------------------

        if (name.length < 2) {

            showError(
                nameInput,
                nameError,
                "Name must contain at least 2 characters."
            );

            isValid = false;

        } else if (name.length > 60) {

            showError(
                nameInput,
                nameError,
                "Name cannot exceed 60 characters."
            );

            isValid = false;

        } else {

            clearError(nameInput, nameError);

        }


        // -------------------------
        // EMAIL VALIDATION
        // -------------------------

        if (!email) {

            showError(
                emailInput,
                emailError,
                "Please enter your email address."
            );

            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearError(emailInput, emailError);

        }


        // -------------------------
        // PASSWORD VALIDATION
        // -------------------------

        if (!password) {

            showError(
                passwordInput,
                passwordError,
                "Please create a password."
            );

            isValid = false;

        } else if (!isStrongPassword(password)) {

            showError(
                passwordInput,
                passwordError,
                "Use at least 8 characters with uppercase, lowercase and a number."
            );

            isValid = false;

        } else {

            clearError(passwordInput, passwordError);

        }


        // -------------------------
        // CONFIRM PASSWORD
        // -------------------------

        if (!confirmPassword) {

            showError(
                confirmPasswordInput,
                confirmPasswordError,
                "Please confirm your password."
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            showError(
                confirmPasswordInput,
                confirmPasswordError,
                "Passwords do not match."
            );

            isValid = false;

        } else {

            clearError(
                confirmPasswordInput,
                confirmPasswordError
            );

        }


        // -------------------------
        // TERMS VALIDATION
        // -------------------------

        if (!termsInput.checked) {

            termsError.textContent =
                "Please accept the Terms and Conditions.";

            isValid = false;

        } else {

            termsError.textContent = "";

        }


        // -------------------------
        // FINAL VALIDATION
        // -------------------------

        if (!isValid) {

            const firstInvalidField =
                signupForm.querySelector(".invalid");

            if (firstInvalidField) {

                firstInvalidField.focus();

            } else if (!termsInput.checked) {

                termsInput.focus();

            }

            return;

        }


        // Frontend demonstration only.
        // Never save passwords in localStorage.

        showMessage(
            signupMessage,
            "All validations passed! Your registration form is ready for backend integration.",
            "success"
        );

    });

}


/* =========================================
   5. FORGOT PASSWORD MESSAGE
========================================= */

const forgotPasswordLink =
    document.getElementById("forgot-password-link");

if (forgotPasswordLink) {

    forgotPasswordLink.addEventListener("click", event => {

        event.preventDefault();

        const loginMessage =
            document.getElementById("login-message");

        showMessage(
            loginMessage,
            "Password recovery will be available after backend integration.",
            "error"
        );

    });

}


console.log("Udaan authentication module loaded successfully!");
