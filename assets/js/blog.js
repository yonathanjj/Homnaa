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



// Function to fetch blog posts
async function fetchBlogPosts() {
  try {
    const response = await fetch('/content/blog/index.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to render featured posts
function renderFeaturedPosts(posts) {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get featured posts (first 3)
  const featuredPosts = sortedPosts.slice(0, 3);

  // Render left column (text content)
  if (featuredPosts[0]) {
    const leftColumn = document.getElementById('featured-text-post');
    leftColumn.innerHTML = `
      <div class="blog-card center-blog-text" onclick="openPopup('${featuredPosts[0].title}', '${featuredPosts[0].featured_image}', '${featuredPosts[0].content}')">
        <h2 class="blog-title">${featuredPosts[0].title}</h2>
        <p class="blog-excerpt">${featuredPosts[0].excerpt}</p>
        <div class="date">${formatDate(featuredPosts[0].date)}</div>
      </div>
    `;
  }

  // Render center column (main image)
  if (featuredPosts[1]) {
    const centerColumn = document.getElementById('featured-image-post');
    centerColumn.innerHTML = `
      <div class="blog-card center-blog" onclick="openPopup('${featuredPosts[1].title}', '${featuredPosts[1].featured_image}', '${featuredPosts[1].content}')">
        <div class="blog-image" style="background-image: url('${featuredPosts[1].featured_image}')"></div>
      </div>
    `;
  }

  // Render right column (side blog)
  if (featuredPosts[2]) {
    const rightColumn = document.getElementById('secondary-featured-post');
    rightColumn.innerHTML = `
      <div class="blog-card right-blog" onclick="openPopup('${featuredPosts[2].title}', '${featuredPosts[2].featured_image}', '${featuredPosts[2].content}')">
        <div class="blog-image" style="background-image: url('${featuredPosts[2].featured_image}')"></div>
        <h3 class="blog-title">${featuredPosts[2].title}</h3>
        <div class="date">${formatDate(featuredPosts[2].date)}</div>
      </div>
    `;
  }
}

// Function to render latest posts
function renderLatestPosts(posts) {
  const latestPostsContainer = document.getElementById('latest-posts');
  // Sort posts by date (newest first) and skip the first 3 featured posts
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestPosts = sortedPosts.slice(3);

  latestPostsContainer.innerHTML = latestPosts.map(post => `
    <div class="post-card" onclick="openPopup('${post.title}', '${post.featured_image}', '${post.content}')">
      <div class="post-image" style="background-image: url('${post.featured_image}')"></div>
      <h3 class="post-title">${post.title}</h3>
      <span class="post-date">${formatDate(post.date)}</span>
    </div>
  `).join('');
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Initialize the page
async function initBlogPage() {
  const posts = await fetchBlogPosts();
  renderFeaturedPosts(posts);
  renderLatestPosts(posts);

  // Initialize GSAP animations
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
}

// Keep your existing popup functions
function openPopup(title, image, content) {
  const popup = document.querySelector('.popup');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');

  popupTitle.textContent = title;
  popupImage.src = image;
  popupText.innerHTML = marked.parse(content); // Using marked.js to parse markdown

  popup.style.display = 'flex';
  setTimeout(() => {
    popup.classList.add('show');
  }, 50);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });
}

function closePopup() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('show');
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBlogPage);