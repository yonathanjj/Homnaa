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



 // assets/js/blog.js

 document.addEventListener('DOMContentLoaded', function() {
   fetchBlogPosts();
 });

 async function fetchBlogPosts() {
   try {
     const response = await fetch('/_data/blog/index.json');
     const posts = await response.json();

     // Sort posts by date (newest first)
     const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

     renderFeaturedPosts(sortedPosts);
     renderLatestPosts(sortedPosts);
   } catch (error) {
     console.error('Error loading blog posts:', error);
     // Fallback to hardcoded content if CMS fails
     renderFallbackContent();
   }
 }

 function renderFeaturedPosts(posts) {
   const blogGrid = document.querySelector('.blog-grid');
   if (!blogGrid) return;

   // Clear existing hardcoded content
   blogGrid.innerHTML = `
     <div class="left-column"></div>
     <div class="center-column"></div>
     <div class="right-column"></div>
   `;

   const leftColumn = blogGrid.querySelector('.left-column');
   const centerColumn = blogGrid.querySelector('.center-column');
   const rightColumn = blogGrid.querySelector('.right-column');

   // Get featured posts (first 3)
   const featuredPosts = posts.slice(0, 3);

   if (featuredPosts[0]) {
     leftColumn.innerHTML = createBlogCard(featuredPosts[0], 'left');
   }

   if (featuredPosts[1]) {
     centerColumn.innerHTML = createBlogCard(featuredPosts[1], 'center');
   }

   if (featuredPosts[2]) {
     rightColumn.innerHTML = createBlogCard(featuredPosts[2], 'right');
   }
 }

 function renderLatestPosts(posts) {
   const postsGrid = document.querySelector('.posts-grid');
   if (!postsGrid) return;

   // Clear existing hardcoded content
   postsGrid.innerHTML = '';

   // Get latest posts (skip first 3 featured ones)
   const latestPosts = posts.slice(3, 6);

   latestPosts.forEach(post => {
     postsGrid.innerHTML += createPostCard(post);
   });

   // Reinitialize GSAP animations for new elements
   initGSAPAnimations();
 }

 function createBlogCard(post, position) {
   const formattedDate = formatDate(new Date(post.date));

   if (position === 'left') {
     return `
       <div class="blog-card center-blog-text" onclick="openPopup('${escapeHtml(post.title)}', '${post.image}', '${escapeHtml(post.excerpt)}')">
         <h2 class="blog-title">${post.title}</h2>
         <p class="blog-excerpt">${post.excerpt}</p>
         <div class="date">${formattedDate}</div>
       </div>
     `;
   } else if (position === 'center') {
     return `
       <div class="blog-card center-blog" onclick="openPopup('${escapeHtml(post.title)}', '${post.image}', '${escapeHtml(post.body)}')">
         <div class="blog-image" style="background-image: url('${post.image}')"></div>
       </div>
     `;
   } else { // right
     return `
       <div class="blog-card right-blog" onclick="openPopup('${escapeHtml(post.title)}', '${post.image}', '${escapeHtml(post.excerpt)}')">
         <div class="blog-image" style="background-image: url('${post.image}')"></div>
         <h3 class="blog-title">${post.title}</h3>
         <div class="date">${formattedDate}</div>
       </div>
     `;
   }
 }

 function createPostCard(post) {
   const formattedDate = formatDate(new Date(post.date));

   return `
     <div class="post-card" onclick="openPopup('${escapeHtml(post.title)}', '${post.image}', '${escapeHtml(post.body)}')">
       <div class="post-image" style="background-image: url('${post.image}')"></div>
       <h3 class="post-title">${post.title}</h3>
       <span class="post-date">${formattedDate}</span>
     </div>
   `;
 }

 function formatDate(date) {
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   return date.toLocaleDateString('en-US', options);
 }

 function escapeHtml(unsafe) {
   if (!unsafe) return '';
   return unsafe
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#039;");
 }

 function renderFallbackContent() {
   // You can keep your original hardcoded content here as fallback
   console.log('Using fallback content');
 }

 function initGSAPAnimations() {
   // Reinitialize your GSAP animations for dynamically loaded content
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
 }con