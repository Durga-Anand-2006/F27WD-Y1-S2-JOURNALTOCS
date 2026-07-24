document.addEventListener("DOMContentLoaded", function () {
    highlightActionNav();  // Highlights the active navbar link
    setupSearchFilters();  // Enables search filtering on list pages
    setupSmoothScrolling();  // Adds smooth scrolling for anchor links
    setupLoginModal();    // Handles the login modal display logic
    setupMobileMenu();    // Enables the mobile menu toggling 
    validateSignupForm(); // Adds validation for the signup form
});

/* ========================== */
/* 1. Highlight Active Navbar */
/* ========================== */
function highlightActionNav() {
    const currentPage = window.location.pathname;
    document.querySelectorAll("nav ul li a").forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add("active");   // Adds 'active' class to highlight the current page link 
        }
    });
}

/* ========================== */
/* 2. Search Filtering on List Pages */
/* ========================== */
function setupSearchFilters() {
    const searchInputs = document.querySelectorAll(".search-box input");

    if (!searchInputs) return; // Exit if no search inputs exist

    searchInputs.forEach(input => {
        input.addEventListener("keyup", function () {
            const searchTerm = this.value.toLowerCase();
            const pageType = document.body.dataset.page;
            let items;

            if (pageType === "publishers") {
                items = document.querySelectorAll(".publisher-list li");
            } else if (pageType === "subjects") {
                items = document.querySelectorAll(".subject-list li");
            } else if (pageType === "journals") {
                items = document.querySelectorAll(".journal-list li");
            }

            if (items) {
                items.forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? "block" : "none";
                });
            }
        });
    });
}

/* ========================== */
/* 3. Smooth Scrolling */
/* ========================== */
function setupSmoothScrolling() {
    document.querySelectorAll(".alphabet-nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });  // Scrolls smoothly to the target 
            }
        });
    });
}

/* ========================== */
/* 4. Login Modal Handling */
/* ========================== */
function setupLoginModal() {
    const loginModal = document.querySelector(".loginModal");
    const loginBtn = document.querySelector(".login-btn");
    const closeModal = document.querySelector(".close-modal");

    // Check if elements exist before adding event listeners
    if (!loginModal || !loginBtn || !closeModal) {
        console.error("Login modal elements missing!");
        return;
    }

    // Open modal when login button is clicked
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "block";
    });

    // Close modal when close button is clicked
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
}

// Run the function when the page loads
setupLoginModal();


/* ========================== */
/* 5. Mobile Navbar Toggle */
/* ========================== */
function setupMobileMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-links");

    if (!menuIcon || !navMenu) {
        console.error("Mobile menu elements missing!");
        return;
    }

    // Toggle menu when clicking the menu icon
    menuIcon.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            navMenu.classList.remove("active"); // Hide menu
        }
    });
}

// Run the function when the page loads
setupMobileMenu();


/* ========================== */
/* 6. Client Side Validation  */
/* ========================== */
function validateSignupForm(event) {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!email.includes("@") || password.length < 6) {
        event.preventDefault();
        alert("Please enter a valid email and password (min 6 characters)");   // Alerts user if inputs is invalid
    }
}

document.querySelector('.signup-btn').addEventListener('click', validateSignupForm);

