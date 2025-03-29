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



  // GSAP Animations
        gsap.to(".blog-card", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".container",
                start: "top center"
            }
        });

        // GSAP Animations
        // Hover animation
        gsap.utils.toArray(".post-image-container").forEach(container => {
            gsap.to(container.querySelector(".post-image"), {
                scale: 1,
                paused: true,
                ease: "power2.out"
            });

            container.addEventListener("mouseenter", () => {
                gsap.to(container.querySelector(".post-image"), {
                    scale: 1.05,
                    duration: 0.4
                });
            });

            container.addEventListener("mouseleave", () => {
                gsap.to(container.querySelector(".post-image"), {
                    scale: 1,
                    duration: 0.4
                });
            });
        });

        // Popup functionality
        gsap.utils.toArray("[data-popup]").forEach(trigger => {
            const popup = document.querySelector(trigger.dataset.popup);
            const closeBtn = popup.querySelector(".close-btn");

            // Open popup
            trigger.addEventListener("click", () => {
                gsap.to(popup, {
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            // Close popup
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                gsap.to(popup, {
                    autoAlpha: 0,
                    duration: 0.2
                });
            });
        });

        // Initial animation
        gsap.from(".post-card", {
            duration: 0.8,
            autoAlpha: 0,
            y: 30,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".posts-grid",
                start: "top 80%"
            }
        });


       function openPopup(title, image, content) {
         const popup = document.querySelector('.popup');
         const popupTitle = document.getElementById('popup-title');
         const popupImage = document.getElementById('popup-image');
         const popupText = document.getElementById('popup-text');

         popupTitle.textContent = title;
         popupImage.src = image;
         popupText.innerHTML = content; // Changed to innerHTML to preserve Markdown

         // GSAP animation for popup
         gsap.to(popup, {
           autoAlpha: 1,
           duration: 0.3,
           display: 'flex'
         });
       }

        function closePopup() {
            const popup = document.querySelector('.popup');
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }



// Select elements
const infoModalOverlay = document.querySelector('.info-modal-overlay');
const infoModalContent = document.querySelector('.info-modal-content');
const infoModalTitle = document.querySelector('.info-modal-title');
const infoModalText = document.querySelector('.info-modal-text');
const closeInfoModal = document.querySelector('.close-info-modal');
const footerLinks = document.querySelectorAll('.footer-bottom-links a');

// Info Modal content data
const infoModalData = {
  commitment: {
    title: "Our Commitment",
    text: "At HOMNA, we are committed to delivering innovative solutions that connect worlds and drive progress. We prioritize sustainability, quality, and customer satisfaction in everything we do."
  },
  "privacy-policy": {
    title: "Privacy Policy",
    text: "Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information. We adhere to strict data protection standards to ensure your information is safe."
  },
  "legal-info": {
    title: "Legal Information",
    text: "This section provides legal information about our company, including terms of use, disclaimers, and intellectual property rights. Please review this information carefully before using our services."
  },
  suppliers: {
    title: "Suppliers",
    text: "We work with trusted suppliers who share our commitment to quality and sustainability. Our supplier network is carefully vetted to ensure the highest standards of service and reliability."
  },
  "cookie-policy": {
    title: "Cookie Policy",
    text: "Our Cookie Policy explains how we use cookies and similar technologies to enhance your experience on our website. You can manage your cookie preferences at any time."
  }
};

// Show info modal
footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = link.getAttribute('data-modal');
    const data = infoModalData[modalId];

    infoModalTitle.textContent = data.title;
    infoModalText.textContent = data.text;
    infoModalOverlay.classList.add('active');
  });
});

// Close info modal
closeInfoModal.addEventListener('click', () => {
  infoModalOverlay.classList.remove('active');
});

// Close info modal when clicking outside
infoModalOverlay.addEventListener('click', (e) => {
  if (e.target === infoModalOverlay) {
    infoModalOverlay.classList.remove('active');
  }
});

footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Link clicked:", link.getAttribute('data-modal')); // Debugging
    const modalId = link.getAttribute('data-modal');
    const data = infoModalData[modalId];

    if (data) {
      console.log("Data found:", data); // Debugging
      infoModalTitle.textContent = data.title;
      infoModalText.textContent = data.text;
      infoModalOverlay.classList.add('active');
    } else {
      console.log("No data found for:", modalId); // Debugging
    }
  });
});