
// =========================================
// UDAAN ONBOARDING SYSTEM
// =========================================


// 1. GET HTML ELEMENTS

const form = document.getElementById("onboarding-form");

const steps = document.querySelectorAll(".form-step");

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const progressFill = document.getElementById("progress-fill");
const stepLabel = document.getElementById("step-label");
const progressPercentage = document.getElementById("progress-percentage");
const progressBar = document.getElementById("progress-bar");

const formMessage = document.getElementById("form-message");

const reviewContent = document.getElementById("review-content");

const successScreen = document.getElementById("success-screen");

const totalSteps = 4;

let currentStep = 1;


// 2. STORE USER ANSWERS IN MEMORY

const onboardingData = {
    displayName: "",
    ageGroup: "",
    educationLevel: "",
    interests: [],
    challenges: [],
    careerGoal: "",
    learningMode: ""
};


// 3. COPYRIGHT YEAR

document.getElementById("onboarding-year").textContent =
    new Date().getFullYear();


// 4. UPDATE PROGRESS INDICATOR

function updateProgress() {

    const percentage = (currentStep / totalSteps) * 100;

    progressFill.style.width = `${percentage}%`;

    stepLabel.textContent =
        currentStep <= totalSteps
            ? `Step ${currentStep} of ${totalSteps}`
            : "Review your answers";

    progressPercentage.textContent =
        `${Math.round(percentage)}% completed`;

    progressBar.setAttribute("aria-valuenow", currentStep);

    const indicators = document.querySelectorAll(".step-indicator");

    indicators.forEach((indicator) => {

        const stepNumber = Number(indicator.dataset.step);

        indicator.classList.remove("active", "completed");

        if (stepNumber === currentStep) {
            indicator.classList.add("active");
        }

        if (stepNumber < currentStep) {
            indicator.classList.add("completed");
        }

    });

}


// 5. SHOW THE CURRENT STEP

function showStep(stepNumber) {

    steps.forEach((step) => {

        const stepValue = Number(step.dataset.step);

        const isActive = stepValue === stepNumber;

        step.classList.toggle("active", isActive);
        step.hidden = !isActive;

    });

    currentStep = stepNumber;

    previousBtn.disabled = currentStep === 1;

    nextBtn.hidden = currentStep === 5;
    submitBtn.hidden = currentStep !== 5;

    formMessage.textContent = "";

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// 6. DISPLAY VALIDATION ERRORS

function showError(elementId, message) {

    const errorElement = document.getElementById(elementId);

    if (errorElement) {
        errorElement.textContent = message;
    }

}


// 7. CLEAR VALIDATION ERRORS

function clearErrors() {

    document.querySelectorAll(".field-error").forEach((error) => {
        error.textContent = "";
    });

    formMessage.textContent = "";

}


// 8. COLLECT CHECKBOX VALUES

function getCheckedValues(name) {

    return Array.from(
        document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map((input) => input.value);

}


// 9. VALIDATE EACH STEP

function validateStep(stepNumber) {

    clearErrors();

    // STEP 1: PROFILE

    if (stepNumber === 1) {

        const ageGroup = document.getElementById("age-group").value;

        if (!ageGroup) {

            showError(
                "age-error",
                "Please select your age group."
            );

            return false;
        }

    }


    // STEP 2: EDUCATION

    if (stepNumber === 2) {

        const educationLevel =
            document.getElementById("education-level").value;

        const interests = getCheckedValues("interests");

        let isValid = true;

        if (!educationLevel) {

            showError(
                "education-error",
                "Please select your education level."
            );

            isValid = false;
        }

        if (interests.length === 0) {

            showError(
                "interests-error",
                "Please select at least one learning interest."
            );

            isValid = false;
        }

        return isValid;

    }


    // STEP 3: CHALLENGES

    // This step is optional.
    // Users can continue without selecting anything.

    if (stepNumber === 3) {
        return true;
    }


    // STEP 4: GOALS

    if (stepNumber === 4) {

        const careerGoal =
            document.getElementById("career-goal").value;

        const learningMode =
            document.querySelector('input[name="learningMode"]:checked');

        let isValid = true;

        if (!careerGoal) {

            showError(
                "goal-error",
                "Please select your main goal."
            );

            isValid = false;
        }

        if (!learningMode) {

            showError(
                "learning-error",
                "Please select your preferred learning method."
            );

            isValid = false;
        }

        return isValid;

    }

    return true;

}


// 10. COLLECT DATA FROM THE CURRENT STEP

function collectStepData(stepNumber) {

    if (stepNumber === 1) {

        onboardingData.displayName =
            document.getElementById("display-name").value.trim();

        onboardingData.ageGroup =
            document.getElementById("age-group").value;

    }


    if (stepNumber === 2) {

        onboardingData.educationLevel =
            document.getElementById("education-level").value;

        onboardingData.interests =
            getCheckedValues("interests");

    }


    if (stepNumber === 3) {

        onboardingData.challenges =
            getCheckedValues("challenges");

    }


    if (stepNumber === 4) {

        onboardingData.careerGoal =
            document.getElementById("career-goal").value;

        const selectedMode =
            document.querySelector('input[name="learningMode"]:checked');

        onboardingData.learningMode =
            selectedMode ? selectedMode.value : "";

    }

}


// 11. NEXT BUTTON

nextBtn.addEventListener("click", () => {

    if (!validateStep(currentStep)) {
        return;
    }

    collectStepData(currentStep);

    if (currentStep < totalSteps) {

        showStep(currentStep + 1);

    } else {

        renderReview();

        showStep(5);

    }

});


// 12. PREVIOUS BUTTON

previousBtn.addEventListener("click", () => {

    if (currentStep > 1) {

        showStep(currentStep - 1);

    }

});


// 13. CREATE REVIEW CONTENT

function renderReview() {

    const displayName =
        onboardingData.displayName || "Not provided";

    const challenges =
        onboardingData.challenges.length > 0
            ? onboardingData.challenges.join(", ")
            : "Not shared";

    const interests =
        onboardingData.interests.join(", ");

    reviewContent.innerHTML = "";

    const reviewItems = [
        {
            heading: "Basic Profile",
            details: [
                `Name: ${displayName}`,
                `Age group: ${onboardingData.ageGroup}`
            ]
        },
        {
            heading: "Education & Interests",
            details: [
                `Education: ${onboardingData.educationLevel}`,
                `Interests: ${interests}`
            ]
        },
        {
            heading: "Challenges",
            details: [
                `Selected challenges: ${challenges}`
            ]
        },
        {
            heading: "Goals",
            details: [
                `Main goal: ${onboardingData.careerGoal}`,
                `Learning preference: ${onboardingData.learningMode}`
            ]
        }
    ];

    reviewItems.forEach((item) => {

        const card = document.createElement("div");

        card.className = "review-item";

        const heading = document.createElement("h3");

        heading.textContent = item.heading;

        card.appendChild(heading);

        item.details.forEach((detail) => {

            const paragraph = document.createElement("p");

            paragraph.textContent = detail;

            card.appendChild(paragraph);

        });

        reviewContent.appendChild(card);

    });

}


// 14. COMPLETE ONBOARDING

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (currentStep !== 5) {
        return;
    }

    form.hidden = true;

    successScreen.hidden = false;

    console.log("Onboarding demo completed.");

    // No server request is made in this frontend-only phase.
    // Connect the data to the backend in a later phase.

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 15. INITIALIZE ONBOARDING

showStep(1);
