// Select all necessary elements
const hamburger = document.querySelector('.hamburger-menu');
const navOverlay = document.querySelector('.nav-overlay');
const menuContainer = document.querySelector('.menu-container');
const navLinks = document.querySelectorAll('.nav-links li');
const serviceLink = document.querySelector('.service-link');
const solutionsGrid = document.querySelector('.solutions-grid');
const goBackButton = document.querySelector('.go-back-button');
const returnPathButton = document.querySelector('.return-path-button');

// GSAP Timeline for overlay menu animations
const tl = gsap.timeline({ paused: true });

// Main menu animation timeline
tl.to(navOverlay, {
  left: 0,
  duration: 0.5,
  ease: "power2.out"
})
.from(menuContainer, {
  opacity: 0,
  scale: 0.95,
  duration: 0.3,
  ease: "power2.out"
})
.from(navLinks, {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out"
}, "-=0.3");

// Return Path Button - Navigate back in history
returnPathButton.addEventListener('click', (e) => {
  e.preventDefault();
  history.back();
});

// Hamburger menu toggle functionality
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();

  if (!navOverlay.classList.contains('active')) {
    tl.play();
    navOverlay.classList.add('active');
    hamburger.classList.add('active');

    // Ensure solutions grid is hidden when opening menu
    solutionsGrid.classList.remove('active');
  } else {
    tl.reverse().then(() => {
      navOverlay.classList.remove('active');
      hamburger.classList.remove('active');
    });
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-overlay') &&
      navOverlay.classList.contains('active') &&
      !solutionsGrid.classList.contains('active')) {
    tl.reverse().then(() => {
      navOverlay.classList.remove('active');
      hamburger.classList.remove('active');
    });
  }
});



// Show solutions grid when clicking "Solution" link
serviceLink.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  // First animate out the main menu content
  gsap.to(menuContainer, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      menuContainer.style.display = 'none';

      // Show solutions grid
      solutionsGrid.classList.add('active');

      // Hide other nav links
      navLinks.forEach(link => {
        if (!link.contains(serviceLink)) {
          link.style.display = 'none';
        }
      });

      // Animate in solutions grid items
      gsap.from(solutionsGrid.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
});

// Go back to main menu from solutions grid
goBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Animate out solutions grid
  gsap.to(solutionsGrid, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      solutionsGrid.classList.remove('active');

      // Show all nav links again
      navLinks.forEach(link => {
        link.style.display = 'block';
      });

      // Show main menu container
      menuContainer.style.display = 'flex';

      // Animate main menu back in
      gsap.fromTo(menuContainer,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  });
});

// Close solutions grid when clicking outside (if open)
document.addEventListener('click', (e) => {
  if (solutionsGrid.classList.contains('active') &&
      !e.target.closest('.solutions-grid') &&
      !e.target.closest('.service-link')) {
    goBackButton.click();
  }
});




window.onload = function() {
  const heroImage = document.querySelector('.hero-image');
  const heroText = document.querySelector('.hero-text');

  // Add class to trigger image animation after 2 seconds
  setTimeout(() => {
    heroImage.classList.add('loaded');
  }, 1000);

  // Fade in hero text after image expands
  setTimeout(() => {
    heroText.classList.add('visible');
  }, 1000); // Fade-in text after the image expansion is complete
}





document.addEventListener('DOMContentLoaded', function () {
  const additionalCards = document.querySelectorAll('.additional-card');
  const moreButton = document.getElementById('more-button');

  // Function to toggle additional cards
  function toggleAdditionalCards() {
    additionalCards.forEach(card => {
      card.classList.toggle('show');
    });

    // Update button text
    if (moreButton.textContent === 'Show More') {
      moreButton.textContent = 'Show Less';
    } else {
      moreButton.textContent = 'Show More';
    }
  }

  // Add event listener to the "More" button
  moreButton.addEventListener('click', toggleAdditionalCards);

  // Trigger animations when the section is in view
  const expertiseSection = document.querySelector('.expertise-section');
  const expertiseCards = document.querySelectorAll('.expertise-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          expertiseCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate');
            }, index * 200); // Stagger delay (200ms per card)
          });
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
  );

  observer.observe(expertiseSection);
});



document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project-card");
  const popup = document.getElementById("projects-popup");
  const popupTitle = document.querySelector(".popup-title");
  const popupGallery = document.querySelector(".popup-gallery");

  // Function to open popup
  function openProjectsPopup(title, galleryImages) {
    popupTitle.textContent = title;

    // Clear existing gallery images
    popupGallery.innerHTML = "";

    // Dynamically generate images for the gallery
    galleryImages.forEach((image) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("popup-image");
      imgDiv.style.backgroundImage = `url('${image}')`;
      imgDiv.addEventListener("click", () => openLightbox(image));
      popupGallery.appendChild(imgDiv);
    });

    popup.style.display = "flex";
  }

  // Function to open lightbox
  function openLightbox(imageSrc) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const lightboxImage = document.createElement("img");
    lightboxImage.src = imageSrc;
    lightboxImage.classList.add("lightbox-image");

    const closeLightboxBtn = document.createElement("span");
    closeLightboxBtn.classList.add("close-lightbox-btn");
    closeLightboxBtn.innerHTML = "&times;";
    closeLightboxBtn.addEventListener("click", () => closeLightbox(lightbox));

    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeLightboxBtn);
    document.body.appendChild(lightbox);
  }

  // Function to close lightbox
  function closeLightbox(lightbox) {
    lightbox.remove();
  }

  // Assign click event to each project card
  projects.forEach((project) => {
    project.addEventListener("click", function () {
      const projectTitle = project.getAttribute("data-title");
      const galleryImages = JSON.parse(project.getAttribute("data-gallery"));
      openProjectsPopup(projectTitle, galleryImages);
    });
  });

  // Close popup function
  function closeProjectsPopup() {
    popup.style.display = "none";
  }

  // Close popup when clicking outside
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closeProjectsPopup();
    }
  });

  // Attach close function globally
  window.closeProjectsPopup = closeProjectsPopup;
});


 gsap.from(".partner-logo", {
        duration: 1,
        opacity: 0,
        y: -50,
        stagger: 0.3, // Adds stagger effect to the logos and names
        ease: "power3.out"
    });

    gsap.from(".partner-name", {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.5 // Slight delay to make the text appear after the logo animation
    });



    // GSAP Animation for Blog Section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".blog-card", {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: ".blog-section",
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none",
      }
    });


function openPopup(title, image, content) {
    const popup = document.querySelector('.popup');
    const popupContent = popup.querySelector('.popup-content');
    const popupTitle = popupContent.querySelector('h2');
    const popupImage = popupContent.querySelector('img');
    const popupText = popupContent.querySelector('p');

    // Set content dynamically
    popupTitle.textContent = title;
    popupImage.src = image;
    popupText.textContent = content;

    // Display the popup
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.classList.add('show');
    }, 50); // Small delay to ensure the transition works

    // Close the popup when clicking outside the content area
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
}

// Close popup function
function closePopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300); // Match the transition time
}

// Close button click event
document.querySelector('.close').addEventListener('click', closePopup);

document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.querySelector('.image-container');
  const containerWidth = imageContainer.scrollWidth / 2; // Adjusted to ensure it's based on the total content width
  const speed = 100; // Adjust this value to control speed (higher = slower)

  // Set animation duration based on the content width and desired speed
  const duration = containerWidth / speed; // Make sure the duration is based on the content width
  imageContainer.style.animationDuration = `${duration}s`;
});


document.addEventListener("DOMContentLoaded", function () {
    const footerPopup = document.getElementById("footer-popup");
    const footerPopupTitle = document.getElementById("footer-popup-title");
    const footerPopupText = document.getElementById("footer-popup-text");
    const footerCloseButton = document.querySelector(".footer-close-btn");

    // Information for each link
    const footerPopupContent = {
        "Commitment": "We are committed to excellence in our services and ensuring customer satisfaction.",
        "Privacy Policy": "Your privacy is important to us. We do not share your data with third parties.",
        "Legal Information": "All content on this site is legally protected and follows regulations.",
        "Suppliers": "We work with trusted suppliers to provide high-quality products and services.",
        "Cookie Policy": "We use cookies to enhance your experience. You can manage your preferences anytime."
    };

    // Using event delegation to handle clicks on all footer links
    document.querySelector(".footer-bottom-links").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const linkText = event.target.textContent.trim();
            if (footerPopupContent[linkText]) {
                footerPopupTitle.textContent = linkText;
                footerPopupText.textContent = footerPopupContent[linkText];
                footerPopup.style.display = "block";
            }
        }
    });

    // Close popup when clicking close button
    footerCloseButton.addEventListener("click", () => {
        footerPopup.style.display = "none";
    });

    // Close popup when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === footerPopup) {
            footerPopup.style.display = "none";
        }
    });
});
