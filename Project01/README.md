# Udaan — Learn. Earn. Grow.
## Project 1: Frontend Web Application

### Project Overview
This project focuses on developing the frontend interface for Udaan — an empowering platform designed to support girls and young women through education, scholarships, skills training, mentorship, and earning opportunities.

The frontend is built using standard web technologies (HTML5, CSS3, and modern vanilla JavaScript) featuring responsive designs, accessible navigation, and multi-page user flows.

### Project Goal
The goal of this project is to build a responsive, user-friendly, and modern frontend application from scratch, establishing the core user experience for onboarding, authentication, dashboard management, and mentor/agent browsing.

### Key Features
- **Landing Page**: Overview of programs, impact statistics, scholarships, and mentorship opportunities.
- **User Authentication**: Login and registration pages (`pages/login.html`, `pages/signup.html`).
- **Interactive Onboarding**: Step-by-step onboarding flow (`pages/onboarrding.html`).
- **Dashboard**: Student portal for tracking progress, tasks, and applications (`pages/dashboard.html`).
- **Agents / Mentors Directory**: Showcase mentors and support agents (`pages/agents.html`).
- **Responsive Design**: Mobile-friendly layouts with custom CSS and media queries (`css/responsive.css`).

### Technologies Used
- HTML5 (Semantic Markup)
- CSS3 (Flexbox, Grid, CSS Variables, Responsive Design)
- JavaScript (Vanilla JS, DOM Manipulation, Form Handling)

### Project Structure
```
Project01/
├── css/
│   ├── agents.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── onboarding.css
│   ├── responsive.css
│   └── style.css
├── js/
│   ├── agents.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── main.js
│   └── onboarding.js
├── pages/
│   ├── agents.html
│   ├── dashboard.html
│   ├── login.html
│   ├── onboarrding.html
│   └── signup.html
├── assets/
├── index.html
└── README.md
```

### How to Run
1. Open the `Project01` folder.
2. Open `index.html` directly in any web browser, or serve it using a local server:

```powershell
python -m http.server 3000
```
3. Open `http://localhost:3000` in your browser.

### Learning Outcomes
- Designing modern, responsive user interfaces with semantic HTML5 and CSS3.
- Implementing client-side interactions and validation using vanilla JavaScript.
- Structuring multi-page web applications and assets.
- Understanding UI/UX workflows for authentication, onboarding, and dashboard management.
