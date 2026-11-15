
// =========================================
// UDAAN DASHBOARD JAVASCRIPT
// =========================================


// 1. DYNAMIC GREETING

const greetingElement = document.getElementById("greeting");

const currentHour = new Date().getHours();

if (currentHour < 12) {
    greetingElement.textContent = "Good morning";
} else if (currentHour < 17) {
    greetingElement.textContent = "Good afternoon";
} else {
    greetingElement.textContent = "Good evening";
}


// 2. COPYRIGHT YEAR

document.getElementById("dashboard-year").textContent =
    new Date().getFullYear();


// 3. MOBILE SIDEBAR

const sidebar = document.getElementById("sidebar");

const menuToggle = document.getElementById("menu-toggle");

const sidebarOverlay = document.getElementById("sidebar-overlay");


function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Close navigation menu");

}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

}


menuToggle.addEventListener("click", () => {

    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }

});


sidebarOverlay.addEventListener("click", closeSidebar);


// Close sidebar after selecting a navigation link.

document.querySelectorAll(".nav-link").forEach((link) => {

    link.addEventListener("click", closeSidebar);

});


// Close sidebar using Escape key.

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeSidebar();
    }

});


// 4. ACTIVE NAVIGATION

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigationLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// 5. AI AGENT INFORMATION

const agentInformation = {

    barrier: {
        title: "Barrier Assessment Agent",
        description:
            "This agent helps identify challenges that may affect your education and career journey. It can guide the system towards more suitable support options."
    },

    education: {
        title: "Education Pathway Agent",
        description:
            "This agent explores suitable education pathways, courses and learning opportunities based on your current education level and interests."
    },

    scholarship: {
        title: "Scholarship & Financial Aid Agent",
        description:
            "This agent helps identify relevant scholarships, grants and financial assistance programmes. Eligibility must be checked against official programme requirements."
    },

    earning: {
        title: "Earn & Learn Agent",
        description:
            "This agent explores internships, skill-based earning options, flexible work and opportunities that can help you gain experience."
    },

    career: {
        title: "Career & Skill Roadmap Agent",
        description:
            "This agent helps create a structured roadmap of skills, projects and career steps based on your interests and goals."
    },

    mentorship: {
        title: "Women Mentorship & Support Agent",
        description:
            "This agent helps users discover mentorship resources, guidance communities and relevant support services."
    },

    planner: {
        title: "AI Guidance & Study Planner Agent",
        description:
            "This agent helps organise learning goals into manageable tasks and study schedules based on your preferred learning style."
    }

};


// 6. SHOW AI AGENT DETAILS

const agentButtons = document.querySelectorAll(".agent-button");

const agentDetailPanel =
    document.getElementById("agent-detail-panel");

const agentDetailTitle =
    document.getElementById("agent-detail-title");

const agentDetailDescription =
    document.getElementById("agent-detail-description");

const closeAgentDetail =
    document.getElementById("close-agent-detail");


agentButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const agentId = button.dataset.agent;

        const selectedAgent = agentInformation[agentId];

        if (!selectedAgent) {
            return;
        }

        agentDetailTitle.textContent = selectedAgent.title;

        agentDetailDescription.textContent =
            selectedAgent.description;

        agentDetailPanel.hidden = false;

        agentDetailPanel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

});


// 7. CLOSE AI AGENT DETAIL PANEL

closeAgentDetail.addEventListener("click", () => {

    agentDetailPanel.hidden = true;

});


// 8. LEARNING TASK PROGRESS

const taskCheckboxes =
    document.querySelectorAll(".task-checkbox");

const progressNumber =
    document.getElementById("progress-number");

const progressFill =
    document.getElementById("dashboard-progress-fill");

const progressCaption =
    document.getElementById("progress-caption");

const progressBar =
    document.getElementById("dashboard-progress");


// Calculate completed tasks.

function updateLearningProgress() {

    const totalTasks = taskCheckboxes.length;

    let completedTasks = 0;

    taskCheckboxes.forEach((checkbox) => {

        if (checkbox.checked) {
            completedTasks++;
        }

    });


    // Calculate percentage.

    const percentage = Math.round(
        (completedTasks / totalTasks) * 100
    );


    // Update progress UI.

    progressNumber.textContent = `${percentage}%`;

    progressFill.style.width = `${percentage}%`;

    progressBar.setAttribute(
        "aria-valuenow",
        percentage
    );

    progressCaption.textContent =
        `${completedTasks} of ${totalTasks} suggested tasks completed`;

}


// Update progress whenever a task changes.

taskCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", updateLearningProgress);

});


// 9. INITIALIZE DASHBOARD

updateLearningProgress();
