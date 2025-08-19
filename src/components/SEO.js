import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  section = null 
}) => {
  const siteTitle = 'Mariya - Full Stack Developer & Software Engineer';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Professional portfolio of Mariya, a skilled Full Stack Developer and Software Engineer specializing in React, Node.js, and modern web technologies.';
  const defaultImage = '/MB.png';
  const defaultUrl = 'https://www.mariyabenny.com/';

  // Generate structured data based on section
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": fullTitle,
      "description": description || defaultDescription,
      "url": url || defaultUrl,
      "author": {
        "@type": "Person",
        "name": "Mariya",
        "jobTitle": "Full Stack Developer"
      }
    };

    if (section === 'projects') {
      return {
        ...baseData,
        "@type": "ItemList",
        "name": "Portfolio Projects",
        "description": "Showcase of web development projects and applications",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Project 1",
            "description": "Web application built with React and Node.js"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Project 2",
            "description": "Full-stack application with modern technologies"
          }
        ]
      };
    }

    if (section === 'skills') {
      return {
        ...baseData,
        "@type": "ItemList",
        "name": "Technical Skills",
        "description": "Programming languages, frameworks, and technologies",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Frontend Development",
            "description": "React, JavaScript, HTML, CSS, Tailwind CSS"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Backend Development",
            "description": "Node.js, Express, MongoDB, SQL"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Tools & Technologies",
            "description": "Git, Docker, AWS, CI/CD"
          }
        ]
      };
    }

    if (section === 'experience') {
      return {
        ...baseData,
        "@type": "ItemList",
        "name": "Professional Experience",
        "description": "Work history and professional achievements",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Current Position",
            "description": "Full Stack Developer at Company Name"
          }
        ]
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || 'full stack developer, software engineer, react developer, web developer, portfolio, mariya'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Mariya Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || defaultUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || defaultUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Mobile Optimization */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Performance and Caching */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
    </Helmet>
  );
};

export default SEO;
