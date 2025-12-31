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
  const testimonialImage = document.getElementById("testimonialImage");
  if (!testimonialImage) return;

  const testimonials = [
    {
      name: "Yusmor Islamic Centre",
      company: "Community Leader",
      image: "Images/assets/android-chrome-192x192.png",
      quote:
        "Ramlad Global Technologies provided an excellent solar solution for our centre. We now have reliable power for all our activities.",
    },
    {
      name: "Mr Luqman",
      company: "Homeowner",
      image: "Images/assets/android-chrome-192x192.png",
      quote:
        "I am very impressed with the CCTV installation. The team was professional and the system works perfectly.",
    },
    {
      name: "Mrs Olaleru",
      company: "Community Member",
      image: "Images/assets/android-chrome-192x192.png",
      quote:
        "The solar street lights have made our community much safer at night. Great service!",
    },
    {
      name: "Dr Abdul Ganiyy Shokoya",
      company: "Medical Professional",
      image: "Images/assets/android-chrome-192x192.png",
      quote:
        "Their expertise in renewable energy is top-notch. Highly recommended for any solar projects.",
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
          showAlert("All projects loaded successfully!", "success");
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
  const template = document.getElementById("project-card-template");
  if (!template) {
    console.error("Project card template not found!");
    return document.createElement("div"); // Fallback
  }

  const clone = template.content.cloneNode(true);
  const div = clone.querySelector(".project-item");

  // Set attributes and content
  div.setAttribute("data-category", project.category);

  const img = div.querySelector(".card-img-top");
  img.src = project.image;
  img.alt = project.title;

  const title = div.querySelector(".card-title");
  title.textContent = project.title;

  const text = div.querySelector(".card-text");
  text.textContent = project.description;

  return div;
}

// Project Counter Animation
function initProjectCounter() {
  const counter = document.getElementById("projectCounter");
  if (!counter) return;

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
  const mainForm = document.getElementById("mainQuoteForm");
  if (mainForm) {
    mainForm.addEventListener("submit", handleFormSubmit);
  }

  const sidebarForm = document.getElementById("sidebarQuoteForm");
  if (sidebarForm) {
    sidebarForm.addEventListener("submit", handleFormSubmit);
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleFormSubmit);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const jsonData = Object.fromEntries(data.entries());

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showAlert("Thank you! Your submission has been received!", "success");
      form.reset();
      if (form.id === 'sidebarQuoteForm') {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("sidebarForm"));
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.errors ? responseData.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
      showAlert(errorMessage, "danger");
    }
  } catch (error) {
    showAlert("Network error. Please try again later.", "danger");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.top = "100px";
  alertDiv.style.right = "20px";
  alertDiv.style.zIndex = "9999";
  alertDiv.style.minWidth = "300px";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => {
    const bootstrapAlert = new bootstrap.Alert(alertDiv);
    if (bootstrapAlert) {
      bootstrapAlert.close();
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
