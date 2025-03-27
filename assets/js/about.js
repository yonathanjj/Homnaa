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





gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero-header", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero-header",
        start: "top 75%",
        toggleActions: "play none none none"
    }
});

gsap.to(".hero-description", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero-description",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});






gsap.registerPlugin(ScrollTrigger);

// Animate the left-side text (fade in, move up, and scale slightly)
gsap.from(".sticky-heading", {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".sticky-heading",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate each content block with a staggered effect
gsap.utils.toArray(".content-block").forEach((block, index) => {
    gsap.from(block, {
        opacity: 0,
        y: 50,
        rotateX: 10,  // Subtle rotation for depth effect
        duration: 1.2,
        ease: "power3.out",
        delay: index * 0.2, // Stagger effect
        scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});


      // GSAP animation
        gsap.from(".header", {
            opacity: 0,
            y: -50,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".description", {
            opacity: 0,
            y: 30,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out"
        });



