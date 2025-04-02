// Register the Hero Section component
CMS.registerEditorComponent({
  id: "hero",
  label: "Hero Section",
  fields: [
    { name: "image", label: "Background Image", widget: "image" },
    { name: "header", label: "Header Text", widget: "string" },
    { name: "description", label: "Description", widget: "text" }
  ],
  pattern: /<section class="hero-section">(.*?)<\/section>/s,
  fromBlock: function(match) {
    const content = match[1];
    const imgMatch = content.match(/<img src="([^"]*)" alt="([^"]*)"/);
    const headerMatch = content.match(/<h1 class="hero-header">([^<]*)<\/h1>/);
    const descMatch = content.match(/<p class="hero-description">([^<]*)<\/p>/);

    return {
      image: imgMatch ? imgMatch[1] : '',
      header: headerMatch ? headerMatch[1] : '',
      description: descMatch ? descMatch[1] : ''
    };
  },
  toBlock: function(obj) {
    return `
<section class="hero-section">
  <img src="${obj.image}" alt="Hero Background" class="hero-image">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-header">${obj.header}</h1>
    <p class="hero-description">${obj.description}</p>
  </div>
</section>
    `;
  }
});

// Register Team Member component
CMS.registerEditorComponent({
  id: "team-member",
  label: "Team Member",
  fields: [
    { name: "name", label: "Name", widget: "string" },
    { name: "position", label: "Position", widget: "string" },
    { name: "description", label: "Description", widget: "text" },
    { name: "image", label: "Image", widget: "image" },
    { name: "linkedin", label: "LinkedIn URL", widget: "string", required: false }
  ],
  pattern: /<div class="team-member">(.*?)<\/div>/s,
  fromBlock: function(match) {
    const content = match[1];
    const imgMatch = content.match(/<img src="([^"]*)" alt="([^"]*)"/);
    const nameMatch = content.match(/<h3>([^<]*)<\/h3>/);
    const descMatch = content.match(/<p>([^<]*)<\/p>/);
    const linkedinMatch = content.match(/<a href="([^"]*)"[^>]*>🔗<\/a>/);

    return {
      name: nameMatch ? nameMatch[1] : '',
      position: '',
      description: descMatch ? descMatch[1] : '',
      image: imgMatch ? imgMatch[1] : '',
      linkedin: linkedinMatch ? linkedinMatch[1] : ''
    };
  },
  toBlock: function(obj) {
    return `
<div class="team-member">
  <img src="${obj.image}" alt="${obj.name}">
  <h3>${obj.name}</h3>
  <p>${obj.position} - ${obj.description}</p>
  ${obj.linkedin ? `<a href="${obj.linkedin}" target="_blank" class="linkedin-icon">🔗</a>` : ''}
</div>
    `;
  }
});