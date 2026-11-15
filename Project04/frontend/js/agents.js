
// =========================================
// UDAAN AI AGENT INTERFACE
// FRONTEND DEMO VERSION
// =========================================


// 1. AGENT CONFIGURATION

const agents = {

    barrier: {
        name: "Barrier Assessment Agent",
        icon: "🧭",

        description:
            "Understand the challenges affecting your journey.",

        welcomeTitle:
            "Let's understand your journey.",

        welcomeMessage:
            "I'm here to help you identify challenges and explore ways to move forward.",

        suggestions: [
            "What challenges might affect my education?",
            "How can I overcome financial barriers?",
            "Help me plan my next steps."
        ],

        demoResponse:
            "A good first step is to identify what is making your learning journey difficult. Common challenges can include financial limitations, limited access to learning resources, family responsibilities, transportation and lack of guidance.\n\nYou can start by choosing the challenge that matters most to you. Then we can explore practical support options and possible next steps.\n\nRemember, you only need to share information you feel comfortable sharing."
    },


    education: {
        name: "Education Pathway Agent",
        icon: "🎓",

        description:
            "Explore education options and suitable learning paths.",

        welcomeTitle:
            "Let's explore your education journey.",

        welcomeMessage:
            "I can help you think about courses, education pathways and learning opportunities that match your interests.",

        suggestions: [
            "How can I continue my education?",
            "Which skills should I learn?",
            "Help me choose a learning pathway."
        ],

        demoResponse:
            "Choosing an education pathway starts with understanding your current education level, interests and long-term goals.\n\nYou can consider these steps:\n\n1. Identify the subject or field that interests you.\n2. Explore courses and recognised institutions.\n3. Compare eligibility, fees, duration and learning format.\n4. Check whether scholarships or financial support are available.\n\nBefore enrolling, always verify course details and recognition directly with the institution."
    },


    scholarship: {
        name: "Scholarship & Financial Aid Agent",
        icon: "💰",

        description:
            "Discover scholarships and possible financial support.",

        welcomeTitle:
            "Let's explore financial support.",

        welcomeMessage:
            "I can help you understand scholarship options and prepare to check your eligibility.",

        suggestions: [
            "How can I find scholarships?",
            "What documents are usually required?",
            "How do I check scholarship eligibility?"
        ],

        demoResponse:
            "You can begin your scholarship search by identifying your education level, course, location and the type of financial assistance you need.\n\nA useful preparation checklist is:\n\n1. Keep your latest academic records available.\n2. Check the official eligibility conditions.\n3. Review income and category requirements, if applicable.\n4. Check the application deadline.\n5. Apply only through verified official portals.\n\nScholarship eligibility and deadlines vary. Always confirm the current information on the official programme website before applying."
    },


    earning: {
        name: "Earn & Learn Agent",
        icon: "💼",

        description:
            "Explore flexible earning and experience opportunities.",

        welcomeTitle:
            "Let's find ways to learn and earn.",

        welcomeMessage:
            "I can help you explore internships, beginner-friendly work and skill-based earning opportunities.",

        suggestions: [
            "How can a student start earning?",
            "What are beginner-friendly internships?",
            "How can I earn while studying?"
        ],

        demoResponse:
            "A good way to begin is by building one useful skill and creating a small portfolio that demonstrates what you can do.\n\nPossible starting points include:\n\n1. Explore internships related to your interests.\n2. Build practical projects.\n3. Improve communication and digital skills.\n4. Look for verified part-time opportunities.\n5. Check the time commitment before accepting work.\n\nBe cautious of opportunities that ask you to pay registration fees, share sensitive information unnecessarily or promise guaranteed income."
    },


    career: {
        name: "Career & Skill Roadmap Agent",
        icon: "🚀",

        description:
            "Build a practical roadmap towards your career goals.",

        welcomeTitle:
            "Your future starts with a plan.",

        welcomeMessage:
            "Let's break your career goal into skills, projects and manageable steps.",

        suggestions: [
            "Help me build a career roadmap.",
            "Which skills are useful for technology careers?",
            "How do I prepare for my first job?"
        ],

        demoResponse:
            "A career roadmap becomes easier when you divide it into smaller milestones.\n\nTry this structure:\n\n1. Choose a career direction that interests you.\n2. Identify the essential skills for that field.\n3. Select beginner-friendly learning resources.\n4. Build projects to demonstrate your skills.\n5. Prepare a resume and portfolio.\n6. Start exploring internships and entry-level roles.\n\nYou do not need to learn everything at once. Consistent progress matters more than rushing."
    },


    mentorship: {
        name: "Women Mentorship & Support Agent",
        icon: "🤝",

        description:
            "Explore guidance, mentorship and support resources.",

        welcomeTitle:
            "You don't have to do everything alone.",

        welcomeMessage:
            "I'm here to help you think about mentorship, guidance and support resources.",

        suggestions: [
            "How can I find a mentor?",
            "Where can I find career guidance?",
            "How can I build a support network?"
        ],

        demoResponse:
            "Mentorship can help you understand career choices, build confidence and learn from another person's experience.\n\nYou can begin by:\n\n1. Identifying the kind of guidance you need.\n2. Exploring verified mentorship programmes.\n3. Connecting with college career cells or professional communities.\n4. Preparing specific questions before a mentorship session.\n5. Setting realistic goals for your discussions.\n\nChoose trusted communities and avoid sharing private information with people or platforms you have not verified."
    },


    planner: {
        name: "AI Guidance & Study Planner Agent",
        icon: "📅",

        description:
            "Organise your learning with a structured study plan.",

        welcomeTitle:
            "Let's make your learning journey organised.",

        welcomeMessage:
            "I can help you break your learning goals into smaller tasks and build a manageable study routine.",

        suggestions: [
            "Create a simple study routine.",
            "How can I manage my study time?",
            "Help me stay consistent with learning."
        ],

        demoResponse:
            "A useful study plan should be realistic and flexible.\n\nYou can start with this simple routine:\n\n1. Choose one learning goal for the week.\n2. Divide it into small daily tasks.\n3. Set aside a consistent study period.\n4. Include short breaks.\n5. Review your progress at the end of the week.\n\nIf you miss a day, adjust your schedule rather than giving up. Your plan should support your routine, not create unnecessary pressure."
    }

};


// 2. GET HTML ELEMENTS

const agentButtons = document.querySelectorAll(".agent-option");

const selectedAgentIcon =
    document.getElementById("selected-agent-icon");

const selectedAgentName =
    document.getElementById("selected-agent-name");

const selectedAgentDescription =
    document.getElementById("selected-agent-description");

const welcomeAgentIcon =
    document.getElementById("welcome-agent-icon");

const welcomeTitle =
    document.getElementById("welcome-title");

const welcomeDescription =
    document.getElementById("welcome-description");

const suggestionList =
    document.getElementById("suggestion-list");

const chatWelcome =
    document.getElementById("chat-welcome");

const messageList =
    document.getElementById("message-list");

const chatForm =
    document.getElementById("chat-form");

const messageInput =
    document.getElementById("message-input");

const sendButton =
    document.getElementById("send-button");

const typingIndicator =
    document.getElementById("typing-indicator");

const typingAvatar =
    document.getElementById("typing-avatar");

const typingLabel =
    document.getElementById("typing-label");

const characterCount =
    document.getElementById("character-count");

const sidebar =
    document.getElementById("agent-sidebar");

const menuButton =
    document.getElementById("agent-menu-button");

const overlay =
    document.getElementById("agent-overlay");


// 3. CURRENT AGENT

let currentAgent = "barrier";


// 4. STORE SEPARATE CONVERSATIONS

const conversations = {

    barrier: [],
    education: [],
    scholarship: [],
    earning: [],
    career: [],
    mentorship: [],
    planner: []

};


// Track agents that currently have a simulated response pending.

const pendingAgents = new Set();


// 5. FORMAT CURRENT TIME

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}


// 6. UPDATE AGENT HEADER

function updateAgentHeader(agentId) {

    const agent = agents[agentId];

    selectedAgentIcon.textContent = agent.icon;

    selectedAgentName.textContent = agent.name;

    selectedAgentDescription.textContent =
        agent.description;

    welcomeAgentIcon.textContent = agent.icon;

    welcomeTitle.textContent = agent.welcomeTitle;

    welcomeDescription.textContent =
        agent.welcomeMessage;

    typingAvatar.textContent = agent.icon;

    typingLabel.textContent =
        `${agent.name} is thinking...`;

}


// 7. DISPLAY SUGGESTED QUESTIONS

function displaySuggestions(agentId) {

    const agent = agents[agentId];

    suggestionList.replaceChildren();

    agent.suggestions.forEach((suggestion) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "suggestion-chip";

        button.textContent = suggestion;

        button.addEventListener("click", () => {

            sendMessage(suggestion);

        });

        suggestionList.appendChild(button);

    });

}


// 8. CREATE A MESSAGE ELEMENT

function createMessageElement(message) {

    const row = document.createElement("div");

    row.className = `message-row ${message.sender}`;


    const avatar = document.createElement("div");

    avatar.className = "message-avatar";

    avatar.textContent =
        message.sender === "user"
            ? "You"
            : agents[message.agentId].icon;


    const content = document.createElement("div");

    content.className = "message-content";


    const name = document.createElement("span");

    name.className = "message-name";

    name.textContent =
        message.sender === "user"
            ? "You"
            : agents[message.agentId].name;


    const bubble = document.createElement("div");

    bubble.className = "message-bubble";

    // textContent prevents user messages from being interpreted as HTML.
    // Convert line breaks into visible lines without injecting HTML.
    bubble.style.whiteSpace = "pre-wrap";

    bubble.textContent = message.text;


    const time = document.createElement("span");

    time.className = "message-time";

    time.textContent = message.time;


    content.appendChild(name);

    content.appendChild(bubble);

    content.appendChild(time);


    row.appendChild(avatar);

    row.appendChild(content);

    return row;

}


// 9. RENDER CURRENT CONVERSATION

function renderConversation() {

    const messages = conversations[currentAgent];

    messageList.replaceChildren();

    messages.forEach((message) => {

        const messageElement =
            createMessageElement(message);

        messageList.appendChild(messageElement);

    });


    // Show welcome screen only when there are no messages.

    chatWelcome.hidden = messages.length > 0;


    // Show typing indicator for the currently selected agent.

    typingIndicator.hidden =
        !pendingAgents.has(currentAgent);


    messageList.scrollTop = messageList.scrollHeight;

    const chatContent =
        document.getElementById("chat-content");

    chatContent.scrollTop = chatContent.scrollHeight;

}


// 10. SWITCH BETWEEN AGENTS

function selectAgent(agentId) {

    if (!agents[agentId]) {
        return;
    }

    currentAgent = agentId;


    // Update selected button.

    agentButtons.forEach((button) => {

        const isActive =
            button.dataset.agent === agentId;

        button.classList.toggle("active", isActive);

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );

    });


    // Update the selected agent information.

    updateAgentHeader(agentId);

    displaySuggestions(agentId);

    renderConversation();


    // Clear the message input.

    messageInput.value = "";

    updateCharacterCount();

    autoResizeTextarea();

    closeAgentSidebar();

}


// 11. ADD A MESSAGE TO CONVERSATION HISTORY

function addMessage(sender, text, agentId = currentAgent) {

    const message = {

        sender: sender,

        text: text,

        agentId: agentId,

        time: getCurrentTime()

    };

    conversations[agentId].push(message);

    return message;

}


// 12. GENERATE SIMULATED AI RESPONSE

function generateDemoResponse(agentId, userMessage) {

    const agent = agents[agentId];

    const question = userMessage.toLowerCase();

    // These responses are examples for interface testing.
    // They are not generated by an AI model.

    if (
        question.includes("hello") ||
        question.includes("hi") ||
        question.includes("hey")
    ) {

        return `Hello! 👋 I'm your ${agent.name}.\n\n${agent.welcomeMessage}\n\nWhat would you like help with today?`;

    }


    if (
        question.includes("thank")
    ) {

        return "You're welcome! 💜 Remember that every small step counts. Feel free to ask another question whenever you're ready.";

    }


    if (
        question.includes("help")
    ) {

        return `${agent.demoResponse}\n\nYou can tell me which part you'd like to explore further.`;

    }


    return agent.demoResponse;

}


// 13. SEND MESSAGE

function sendMessage(text) {

    const cleanMessage = text.trim();

    if (!cleanMessage || cleanMessage.length > 1000) {
        return;
    }


    const agentId = currentAgent;


    // Store the user's message.

    addMessage("user", cleanMessage, agentId);


    // Render the new message if its agent is still selected.

    if (currentAgent === agentId) {

        renderConversation();

        chatWelcome.hidden = true;

    }


    // Mark the agent as waiting for a demo response.

    pendingAgents.add(agentId);


    if (currentAgent === agentId) {

        typingAvatar.textContent = agents[agentId].icon;

        typingLabel.textContent =
            `${agents[agentId].name} is thinking...`;

        typingIndicator.hidden = false;

    }


    // Clear the input after sending.

    messageInput.value = "";

    updateCharacterCount();

    autoResizeTextarea();


    // Simulate a short response delay.

    window.setTimeout(() => {

        const response = generateDemoResponse(
            agentId,
            cleanMessage
        );


        // Save the response to the correct agent conversation.

        addMessage("assistant", response, agentId);


        pendingAgents.delete(agentId);


        // Only update the visible conversation if the user
        // is still viewing this agent.

        if (currentAgent === agentId) {

            renderConversation();

        }

    }, 1200);

}


// 14. HANDLE FORM SUBMISSION

chatForm.addEventListener("submit", (event) => {

    event.preventDefault();

    sendMessage(messageInput.value);

});


// 15. ENTER KEY TO SEND

messageInput.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        chatForm.requestSubmit();

    }

});


// 16. CHARACTER COUNTER

function updateCharacterCount() {

    const length = messageInput.value.length;

    characterCount.textContent = `${length} / 1000`;

}


// 17. AUTO-RESIZE TEXTAREA

function autoResizeTextarea() {

    messageInput.style.height = "auto";

    messageInput.style.height =
        `${Math.min(messageInput.scrollHeight, 130)}px`;

}


messageInput.addEventListener("input", () => {

    updateCharacterCount();

    autoResizeTextarea();

});


// 18. MOBILE SIDEBAR

function openAgentSidebar() {

    sidebar.classList.add("open");

    overlay.classList.add("show");

    menuButton.setAttribute("aria-expanded", "true");

    menuButton.setAttribute(
        "aria-label",
        "Close agent menu"
    );

}


function closeAgentSidebar() {

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute(
        "aria-label",
        "Open agent menu"
    );

}


menuButton.addEventListener("click", () => {

    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        closeAgentSidebar();
    } else {
        openAgentSidebar();
    }

});


overlay.addEventListener("click", closeAgentSidebar);


// Close the sidebar with Escape.

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeAgentSidebar();

    }

});


// 19. AGENT SELECTION EVENTS

agentButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const agentId = button.dataset.agent;

        selectAgent(agentId);

    });

});


// 20. INITIALIZE THE INTERFACE

selectAgent("barrier");
