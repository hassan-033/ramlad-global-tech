// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavbar();
  initTestimonialCarousel();
  initProjectCounter();
  initProjectFilters();
  initViewMoreProjects();
  initForms();
  initSmoothScrolling();
  initAnimations();
});

// Navbar Functionality
function initNavbar() {
  const navbar = document.getElementById("mainNav");

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Initial check
  updateNavbar();

  // Listen for scroll events
  window.addEventListener("scroll", updateNavbar);

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const testimonials = [
    {
      name: "James Wilson",
      company: "Wilson Manufacturing",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote:
        "Ramlad Global Technologies transformed our facility with their solar solutions. We've reduced our energy costs by 60% in just 6 months!",
    },
    {
      name: "Sarah Chen",
      company: "Chen Logistics",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      quote:
        "The CCTV and security systems they installed exceeded our expectations. Professional service from start to finish.",
    },
    {
      name: "Michael Rodriguez",
      company: "Rodriguez Enterprises",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote:
        "Outstanding solar street lighting installation. Our property is now well-lit and our electricity bills have dropped significantly.",
    },
  ];

  let currentTestimonial = 0;

  const testimonialImage = document.getElementById("testimonialImage");
  const testimonialQuote = document.getElementById("testimonialQuote");
  const testimonialName = document.getElementById("testimonialName");
  const testimonialCompany = document.getElementById("testimonialCompany");
  const indicators = document.querySelectorAll(".indicator");

  function updateTestimonial(index) {
    const testimonial = testimonials[index];

    // Update content with fade effect
    const card = document.getElementById("testimonialCard");
    card.style.opacity = "0.7";

    setTimeout(() => {
      testimonialImage.src = testimonial.image;
      testimonialImage.alt = testimonial.name;
      testimonialQuote.textContent = `"${testimonial.quote}"`;
      testimonialName.textContent = testimonial.name;
      testimonialCompany.textContent = testimonial.company;

      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });

      card.style.opacity = "1";
    }, 150);
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  }

  // Auto-advance testimonials
  setInterval(nextTestimonial, 5000);

  // Add click handlers to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentTestimonial = index;
      updateTestimonial(currentTestimonial);
    });
  });

  // Initialize first testimonial
  updateTestimonial(0);
}

// Project Filters Functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter projects with animation
      projectItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("filter-hidden");
          item.classList.add("filter-visible");
          setTimeout(() => {
            item.style.display = "block";
          }, 50);
        } else {
          item.classList.remove("filter-visible");
          item.classList.add("filter-hidden");
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Initialize with all projects visible
  projectItems.forEach((item) => {
    item.classList.add("filter-visible");
  });
}

// View More Projects Functionality
function initViewMoreProjects() {
  const viewMoreBtn = document.getElementById("viewMoreProjects");

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      // Show loading state
      const originalText = this.innerHTML;
      this.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Loading More Projects...';
      this.disabled = true;

      // Show additional projects that were hidden
      setTimeout(() => {
        const additionalProjects = document.querySelectorAll(
          ".additional-project"
        );

        additionalProjects.forEach((project, index) => {
          setTimeout(() => {
            project.style.display = "block";
            project.style.opacity = "0";
            project.style.transform = "translateY(20px)";

            // Animate in
            setTimeout(() => {
              project.style.transition = "all 0.5s ease";
              project.style.opacity = "1";
              project.style.transform = "translateY(0)";
            }, 50);
          }, index * 200);
        });

        // Hide the button after showing all projects
        setTimeout(() => {
          this.style.display = "none";
          showSuccessMessage("All projects loaded successfully!");
        }, additionalProjects.length * 200 + 500);
      }, 1000);
    });
  }
}

function addMoreProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  const additionalProjects = [
    {
      category: "solar-energy",
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Solar Farm Development",
      description: "2MW Ground-Mounted Solar Installation",
      categoryDisplay: "Solar Energy",
    },
    {
      category: "cctv-camera",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Smart City Surveillance",
      description: "AI-Powered CCTV Network",
      categoryDisplay: "CCTV Systems",
    },
    {
      category: "electric-fence",
      image:
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Airport Perimeter Security",
      description: "High-Security Electric Fence System",
      categoryDisplay: "Electric Fence",
    },
    {
      category: "solar-street-light",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Campus Solar Lighting",
      description: "University Campus LED Solar Lights",
      categoryDisplay: "Street Lighting",
    },
    {
      category: "automation-gate",
      image:
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Industrial Gate Automation",
      description: "Heavy-Duty Automated Gate System",
      categoryDisplay: "Gate Automation",
    },
    {
      category: "stainless-handrail",
      image:
        "https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Hotel Handrails",
      description: "Designer Stainless Steel Handrails",
      categoryDisplay: "Handrails",
    },
  ];

  additionalProjects.forEach((project, index) => {
    const projectElement = createProjectElement(project);
    projectElement.style.opacity = "0";
    projectElement.style.transform = "translateY(30px)";
    projectsGrid.appendChild(projectElement);

    // Animate in
    setTimeout(() => {
      projectElement.style.transition = "all 0.6s ease";
      projectElement.style.opacity = "1";
      projectElement.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Update animations observer for new projects
  initAnimations();
}

function createProjectElement(project) {
  const div = document.createElement("div");
  div.className = "col-lg-4 col-md-6 mb-4 project-item filter-visible";
  div.setAttribute("data-category", project.category);

  div.innerHTML = `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-info">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <span class="project-category">${project.categoryDisplay}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

  return div;
}

// Project Counter Animation
function initProjectCounter() {
  const counter = document.getElementById("projectCounter");
  let currentCount = 0;
  const targetCount = 50;
  const duration = 2000; // 2 seconds
  const increment = targetCount / (duration / 50); // Update every 50ms

  function updateCounter() {
    if (currentCount < targetCount) {
      currentCount += increment;
      counter.textContent = Math.floor(currentCount) + "+";
      setTimeout(updateCounter, 50);
    } else {
      counter.textContent = targetCount + "+";
    }
  }

  // Start counter when element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && currentCount === 0) {
        updateCounter();
      }
    });
  });

  observer.observe(counter);
}

// Form Handling
function initForms() {
  // Main quote form
  const mainForm = document.getElementById("mainQuoteForm");
  if (mainForm) {
    mainForm.addEventListener("submit", handleMainFormSubmit);
  }

  // Sidebar quote form
  const sidebarForm = document.getElementById("sidebarQuoteForm");
  if (sidebarForm) {
    sidebarForm.addEventListener("submit", handleSidebarFormSubmit);
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }
}

function handleMainFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  };

  // Simulate form submission
  console.log("Main form submitted:", formData);

  // Show success message
  showSuccessMessage("Thank you for your interest! We will contact you soon.");

  // Reset form
  document.getElementById("mainQuoteForm").reset();
}

function handleSidebarFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("sidebarName").value,
    email: document.getElementById("sidebarEmail").value,
    phone: document.getElementById("sidebarPhone").value,
    service: document.getElementById("sidebarService").value,
  };

  // Simulate form submission
  console.log("Sidebar form submitted:", formData);

  // Show success message
  showSuccessMessage("Thank you for your request! We will contact you soon.");

  // Reset form and close sidebar
  document.getElementById("sidebarQuoteForm").reset();
  const offcanvas = bootstrap.Offcanvas.getInstance(
    document.getElementById("sidebarForm")
  );
  if (offcanvas) {
    offcanvas.hide();
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("newsletterEmail").value;

  // Simulate newsletter subscription
  console.log("Newsletter subscription:", email);

  // Show success message
  showSuccessMessage("Thank you for subscribing to our newsletter!");

  // Reset form
  document.getElementById("newsletterForm").reset();
}

function showSuccessMessage(message) {
  // Create and show a temporary success alert
  const alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-success alert-dismissible fade show position-fixed";
  alertDiv.style.top = "100px";
  alertDiv.style.right = "20px";
  alertDiv.style.zIndex = "9999";
  alertDiv.style.minWidth = "300px";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(alertDiv);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Animation on Scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    observer.observe(card);
  });

  // Observe project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    observer.observe(card);
  });

  // Observe client logos
  const clientLogos = document.querySelectorAll(".client-logo");
  clientLogos.forEach((logo) => {
    observer.observe(logo);
  });

  // Observe form sections
  const formSections = document.querySelectorAll(
    ".quote-form-card, .testimonial-card"
  );
  formSections.forEach((section) => {
    observer.observe(section);
  });
}

// Service Card Interactions
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const button = card.querySelector(".btn");
    const serviceType = card.parentElement.getAttribute("data-service");

    if (button && serviceType) {
      button.addEventListener("click", function () {
        // Pre-fill the main form with the selected service
        const serviceSelect = document.getElementById("service");
        if (serviceSelect) {
          const serviceName = card.querySelector(".service-title").textContent;
          serviceSelect.value = serviceName;

          // Scroll to the contact form
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            const navbarHeight = document.querySelector(".navbar").offsetHeight;
            const targetPosition = contactSection.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    }
  });

  // Project card click interactions
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add a subtle click effect
      this.style.transform = "translateY(-15px) scale(1.02)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      // Could add modal or detailed view functionality here
      console.log("Project card clicked:", card);
    });
  });
});

// Form submission handling
document.addEventListener("DOMContentLoaded", function () {
  // Main contact form
  const mainForm = document.getElementById("contactForm");
  if (mainForm) {
    mainForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(this, "main_contact");
    });
  }

  // Sidebar quick quote form
  const sidebarForm = document.getElementById("sidebarQuoteForm");
  if (sidebarForm) {
    sidebarForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(this, "quick_quote");
    });
  }

  // Handle form submissions
  function submitForm(form, formType) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Create form data
    const formData = new FormData(form);
    formData.append("form_type", formType);

    // Send AJAX request
    fetch("process-form.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Create alert message
        const alertDiv = document.createElement("div");
        alertDiv.className =
          data.status === "success"
            ? "alert alert-success mt-3"
            : "alert alert-danger mt-3";
        alertDiv.textContent = data.message;

        // Show alert message
        form.querySelector(".form-response").innerHTML = "";
        form.querySelector(".form-response").appendChild(alertDiv);

        // Reset form on success
        if (data.status === "success") {
          form.reset();
        }

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Hide alert after 5 seconds
        setTimeout(() => {
          alertDiv.remove();
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);

        // Show error message
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger mt-3";
        alertDiv.textContent = "An error occurred. Please try again later.";

        form.querySelector(".form-response").innerHTML = "";
        form.querySelector(".form-response").appendChild(alertDiv);

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  }

  // View More Projects button functionality
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      const hiddenProjects = document.querySelectorAll(".additional-project");

      hiddenProjects.forEach((project) => {
        project.style.display = "block";
        setTimeout(() => {
          project.style.opacity = "1";
        }, 10);
      });

      // Hide the button after revealing all projects
      this.style.display = "none";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/process-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message);
        if (result.status === "success") form.reset();
      } catch (err) {
        alert("Network error. Please try again.");
      }
    });
  }
});

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
  // Any scroll-based animations or updates can go here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Error handling for image loading
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Fallback for broken images
      this.style.display = "none";
      console.warn("Failed to load image:", this.src);
    });
  });
});

// Keyboard accessibility
document.addEventListener("keydown", function (e) {
  // Close modals/offcanvas on Escape key
  if (e.key === "Escape") {
    const openOffcanvas = document.querySelector(".offcanvas.show");
    if (openOffcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(openOffcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }
});

// Initialize tooltips and popovers if needed
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});
