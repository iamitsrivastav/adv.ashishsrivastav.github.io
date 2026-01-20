// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  // Toggle menu on hamburger click
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    // Check if clicked element is inside menu or menu toggle
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      // If menu is open, close it
      if (navMenu.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Testimonial Slider with smooth transitions
const testimonialSlider = (() => {
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;
  let isTransitioning = false;
  let autoPlayInterval = null;
  const TRANSITION_DURATION = 600; // ms
  const AUTO_PLAY_INTERVAL = 5000; // ms (includes transition time)

  const showTestimonial = (index) => {
    if (isTransitioning) return;

    isTransitioning = true;

    // Hide current
    testimonials[currentIndex].classList.remove("active");
    testimonials[currentIndex].setAttribute("aria-hidden", "true");

    // Update index
    currentIndex = index % testimonials.length;

    // Show next
    testimonials[currentIndex].classList.add("active");
    testimonials[currentIndex].setAttribute("aria-hidden", "false");

    setTimeout(() => {
      isTransitioning = false;
    }, TRANSITION_DURATION);
  };

  const nextTestimonial = () => {
    showTestimonial((currentIndex + 1) % testimonials.length);
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextTestimonial, AUTO_PLAY_INTERVAL);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  const pauseAutoPlay = () => {
    stopAutoPlay();
    setTimeout(startAutoPlay, 2000); // Resume after 2 seconds of inactivity
  };

  // Initialize
  const init = () => {
    // Set initial aria attributes
    testimonials.forEach((testimonial, index) => {
      testimonial.setAttribute("aria-hidden", index !== 0 ? "true" : "false");
    });

    // Pause on hover
    const slider = document.querySelector(".testimonial-slider");
    if (slider) {
      slider.addEventListener("mouseenter", pauseAutoPlay);
      slider.addEventListener("mouseleave", startAutoPlay);
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") nextTestimonial();
      if (e.key === "ArrowRight") showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
    });

    startAutoPlay();
  };

  if (testimonials.length > 0) {
    init();
  }
})();

// Form Validation
const forms = document.querySelectorAll(".contact-form");

forms.forEach(form => {
  const inputs = form.querySelectorAll("input, textarea");

  // Validate on blur and input
  inputs.forEach(input => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", validateField);
  });

  // Validate on submit
  form.addEventListener("submit", handleSubmit);
});

function validateField(event) {
  const field = event.target;
  const errorSpan = document.getElementById(field.getAttribute("aria-describedby")?.split(" ")[0]);

  if (!errorSpan) return;

  let errorMessage = "";

  // Check validity
  if (!field.validity.valid) {
    if (field.validity.valueMissing) {
      errorMessage = "This field is required.";
    } else if (field.validity.typeMismatch) {
      errorMessage = field.type === "email" ? "Please enter a valid email address." : "Invalid input.";
    } else if (field.validity.tooShort) {
      errorMessage = `Minimum ${field.minLength} characters required.`;
    } else if (field.validity.tooLong) {
      errorMessage = `Maximum ${field.maxLength} characters allowed.`;
    } else if (field.validity.patternMismatch) {
      errorMessage = "Please check the format.";
    }
  }

  // Display error or clear
  errorSpan.textContent = errorMessage;
  field.setAttribute("aria-invalid", !field.validity.valid);
}

function handleSubmit(event) {
  const form = event.target;
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach(input => {
    if (!input.validity.valid) {
      isValid = false;
      validateField({ target: input });
    }
  });

  if (!isValid) {
    event.preventDefault();
  }
}
