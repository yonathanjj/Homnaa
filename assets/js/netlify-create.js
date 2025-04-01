// Initialize Netlify Create
if (window.netlifyCreate) {
  window.netlifyCreate.init({
    // Enable visual editing
    visualEditing: {
      enabled: true,
      // Preview URL - important for visual editing
      previewUrl: window.location.href.includes('localhost')
        ? 'http://localhost:3000'
        : 'https://your-site-url.netlify.app'
    },
    // Content sources
    contentSources: [
      {
        type: 'git',
        repo: 'your-github-username/your-repo-name',
        branch: 'main'
      }
    ]
  });
}

// Listen for content updates
document.addEventListener('netlifyCreate:contentUpdated', (event) => {
  console.log('Content updated:', event.detail);
  // Refresh your content display
  initBlogPage();
});