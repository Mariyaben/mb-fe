// SEO Configuration for Mariya's Portfolio
export const seoConfig = {
  // Site-wide defaults
  site: {
    name: "Mariya Benny Portfolio",
    title: "Mariya Benny - Full Stack Developer & Software Engineer",
    description: "Professional portfolio of Mariya, a skilled Full Stack Developer and Software Engineer specializing in React, Node.js, and modern web technologies.",
    url: "https://www.mariyabenny.com",
    image: "/MB.png",
    logo: "/MB.png",
    language: "en",
    locale: "en_US",
    type: "website",
    twitterHandle: "@yourusername",
    author: "Mariya",
    keywords: "full stack developer, software engineer, react developer, web developer, frontend developer, backend developer, portfolio, mariya"
  },

  // Page-specific SEO configurations
  pages: {
    home: {
      title: "Home",
      description: "Welcome to Mariya's portfolio - Full Stack Developer and Software Engineer. Explore my projects, skills, and professional experience in web development.",
      keywords: "portfolio, full stack developer, software engineer, web developer, mariya, home",
      section: "home"
    },
    hero: {
      title: "Hero",
      description: "Mariya - AI & Data Science Specialist, International Exchange Student, Charpak Excellence Scholar, and Full-Stack Developer. Discover my journey and expertise.",
      keywords: "AI specialist, data science, international student, charpak scholar, full stack developer, machine learning engineer",
      section: "hero"
    },
    skills: {
      title: "Skills & Technologies",
      description: "Explore my technical skills including programming languages, frameworks, tools, and technologies. From frontend development to AI and blockchain expertise.",
      keywords: "programming skills, technical skills, programming languages, frameworks, tools, frontend, backend, AI, blockchain, web development",
      section: "skills"
    },
    projects: {
      title: "Portfolio Projects",
      description: "Explore my diverse portfolio of projects including AI/ML applications, web development, mobile apps, and innovative solutions. Each project showcases my technical expertise and problem-solving abilities.",
      keywords: "portfolio projects, AI projects, machine learning, web development, mobile apps, deep learning, computer vision, NLP, blockchain",
      section: "projects"
    },
    experience: {
      title: "Professional Experience",
      description: "Discover my professional journey including internships, research positions, and leadership roles. From machine learning internships to project management and research experience.",
      keywords: "professional experience, work history, internships, research, project management, team leadership, machine learning, AI",
      section: "experience"
    },
    contact: {
      title: "Contact Me",
      description: "Get in touch with Mariya for collaboration opportunities, project discussions, or professional inquiries. Available for freelance work and full-time positions.",
      keywords: "contact, get in touch, collaboration, freelance, job opportunities, project discussion, professional inquiry",
      section: "contact"
    }
  },

  // Social media configurations
  social: {
    github: "https://github.com/Mariyaben",
    linkedin: "https://linkedin.com/in/mariyabenny123",
    twitter: "https://twitter.com/yourusername",
    email: "mariyaben02@gmail.com"
  },

  // Structured data templates
  structuredData: {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mariya Benny",
      "jobTitle": "Full Stack Developer",
      "description": "Professional Full Stack Developer and Software Engineer",
      "url": "https://www.mariyabenny.com/",
      "sameAs": [
        "https://github.com/Mariyaben",
        "https://linkedin.com/in/mariyabenny123"
      ],
      "knowsAbout": [
        "React", "Node.js", "JavaScript", "TypeScript", "Full Stack Development",
        "Web Development", "Software Engineering", "Frontend Development", "Backend Development",
        "AI", "Machine Learning", "Data Science", "Blockchain"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance/Company Name"
      }
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Mariya Benny Portfolio",
      "url": "https://www.mariyabenny.com/",
      "description": "Professional portfolio showcasing web development projects and skills",
      "author": {
        "@type": "Person",
        "name": "Mariya"
      }
    },
    breadcrumbs: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.mariyabenny.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.mariyabenny.com/#about" },
        { "@type": "ListItem", "position": 3, "name": "Skills", "item": "https://www.mariyabenny.com/#skills" },
        { "@type": "ListItem", "position": 4, "name": "Projects", "item": "https://www.mariyabenny.com/#projects" },
        { "@type": "ListItem", "position": 5, "name": "Experience", "item": "https://www.mariyabenny.com/#experience" },
        { "@type": "ListItem", "position": 6, "name": "Contact", "item": "https://www.mariyabenny.com/#contact" }
      ]
    }
  },

  // Meta tags for different sections
  metaTags: {
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#000000",
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    googlebot: "index, follow",
    bingbot: "index, follow",
    language: "English",
    geoRegion: "IN",
    geoPlacename: "India",
    formatDetection: "telephone=no",
    mobileWebAppCapable: "yes",
    appleMobileWebAppTitle: "Mariya Portfolio",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent"
  },

  // Performance and caching
  performance: {
    cacheControl: "public, max-age=31536000",
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com"
    ]
  }
};

// Helper function to get SEO config for a specific page
export const getPageSEO = (pageName) => {
  return seoConfig.pages[pageName] || seoConfig.pages.home;
};

// Helper function to get full SEO config
export const getFullSEO = (pageName) => {
  const pageConfig = getPageSEO(pageName);
  return {
    ...seoConfig.site,
    ...pageConfig
  };
};
