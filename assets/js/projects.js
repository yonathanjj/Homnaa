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



// Sample project data (7 projects)
const projects = [
  {
    title: "Singapore Bright",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "assets/image/1.jpeg",
    gallery: ["assets/image/1.jpeg", "assets/image/2.jpeg", "assets/image/3.jpeg", "assets/image/4.jpeg"],
    solutions: ["water proofing", "air resistance 4/7", "selling seal 4kg"],
  },
  {
    title: "Project 2",
    description: "Description for Project 2.",
    image: "assets/image/2.jpeg",
    gallery: ["assets/image/2.jpeg", "assets/image/3.jpeg", "assets/image/4.jpeg", "assets/image/1.jpeg"],
    solutions: ["solution A", "solution B", "solution C"],
  },
  {
    title: "Project 3",
    description: "Description for Project 3.",
    image: "assets/image/3.jpeg",
    gallery: ["assets/image/3.jpeg", "assets/image/4.jpeg", "assets/image/1.jpeg", "assets/image/2.jpeg"],
    solutions: ["solution D", "solution E", "solution F"],
  },
  {
    title: "Project 4",
    description: "Description for Project 4.",
    image: "assets/image/4.jpeg",
    gallery: ["assets/image/4.jpeg", "assets/image/1.jpeg", "assets/image/2.jpeg", "assets/image/3.jpeg"],
    solutions: ["solution G", "solution H", "solution I"],
  },
  {
    title: "Project 5",
    description: "Description for Project 5.",
    image: "assets/image/5.jpeg",
    gallery: ["assets/image/5.jpeg", "assets/image/1.jpeg", "assets/image/2.jpeg", "assets/image/3.jpeg"],
    solutions: ["solution J", "solution K", "solution L"],
  },
  {
    title: "Project 6",
    description: "Description for Project 6.",
    image: "assets/image/6.jpeg",
    gallery: ["assets/image/6.jpeg", "assets/image/1.jpeg", "assets/image/2.jpeg", "assets/image/3.jpeg"],
    solutions: ["solution M", "solution N", "solution O"],
  },
  {
    title: "Project 7",
    description: "Description for Project 7.",
    image: "assets/image/7.jpeg",
    gallery: ["assets/image/7.jpeg", "assets/image/1.jpeg", "assets/image/2.jpeg", "assets/image/3.jpeg"],
    solutions: ["solution P", "solution Q", "solution R"],
  },
];

// Function to create project cards
function createProjectCard(project) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.title;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);

  // Add click event to open popup
  card.addEventListener("click", () => openPopup(project));

  return card;
}

// Function to render projects
function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;
  projects.forEach(project => {
    const card = createProjectCard(project);
    projectsGrid.appendChild(card);
  });
}

// Function to open popup
function openPopup(project) {
  const popup = document.getElementById("project-popup");
  const popupImage = popup.querySelector(".popup-image");
  const projectTitle = popup.querySelector(".project-title");
  const popupDescription = popup.querySelector(".popup-description");
  const solutionsList = popup.querySelector(".solutions-list");
  const galleryImages = popup.querySelector(".gallery-images");

  if (!popup || !popupImage || !projectTitle || !popupDescription || !solutionsList || !galleryImages) return;

  // Set full-width image
  popupImage.src = project.image;
  popupImage.alt = project.title;

  // Set title and description
  projectTitle.textContent = project.title;
  popupDescription.textContent = project.description;

  // Set solutions used
  solutionsList.innerHTML = ""; // Clear previous solutions
  project.solutions.forEach(solution => {
    const solutionItem = document.createElement("li");
    solutionItem.textContent = solution;
    solutionsList.appendChild(solutionItem);
  });

  // Set gallery images
  galleryImages.innerHTML = ""; // Clear previous images
  project.gallery.forEach(image => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = "Gallery Image";
    img.addEventListener("click", () => openLightbox(image));
    galleryImages.appendChild(img);
  });

  // Show popup
  popup.style.display = "block";

  // Disable background scrolling
  document.body.style.overflow = "hidden";
}

// Function to close popup
function closePopup() {
  const popup = document.getElementById("project-popup");
  popup.style.display = "none";

  // Re-enable background scrolling
  document.body.style.overflow = "auto";
}

// Function to open lightbox
function openLightbox(imageSrc) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const lightboxImage = document.createElement("img");
  lightboxImage.src = imageSrc;
  lightboxImage.alt = "Enlarged Image";

  const closeLightboxBtn = document.createElement("span");
  closeLightboxBtn.classList.add("close-lightbox");
  closeLightboxBtn.innerHTML = "&times;";
  closeLightboxBtn.addEventListener("click", () => closeLightbox(lightbox));

  lightbox.appendChild(lightboxImage);
  lightbox.appendChild(closeLightboxBtn);
  document.body.appendChild(lightbox);

  // Show lightbox
  lightbox.style.display = "flex";

  // Disable background scrolling
  document.body.style.overflow = "hidden";
}

// Function to close lightbox
function closeLightbox(lightbox) {
  lightbox.remove();

  // Re-enable background scrolling
  document.body.style.overflow = "auto";
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  renderProjects(); // Render projects
  const closeBtn = document.querySelector(".close-popup");
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }
});