
/* =========================================
   UDAAN - MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    // Open and close the mobile menu
    menuToggle.addEventListener("click", () => {

        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        menuToggle.setAttribute(
            "aria-label",
            isExpanded ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("show");

    });


    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    // Close menu using Escape key
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.focus();

        }

    });

}


/* =========================================
   2. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("current-year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   3. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    ".nav-link"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   4. MOBILE MENU RESPONSIVE CLEANUP
========================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768 && menuToggle && navLinks) {

        navLinks.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});


console.log("Udaan frontend loaded successfully!");
