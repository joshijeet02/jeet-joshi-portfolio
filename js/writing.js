/**
 * writing.js
 * Handles fetching and displaying Substack posts dynamically
 */

'use strict';

(function initSubstackFeed() {
  const container = document.getElementById('writing-container');
  if (!container) return;

  const SUBSTACK_RSS_URL = 'https://jeetjoshi.substack.com/feed';
  const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS_URL)}`;

  async function fetchPosts() {
    try {
      const response = await fetch(RSS2JSON_API);
      const data = await response.json();

      if (data.status === 'ok') {
        renderPosts(data.items);
      } else {
        throw new Error('Failed to fetch feed');
      }
    } catch (error) {
      console.error('Error loading Substack feed:', error);
      container.innerHTML = `
        <div class="writing-error">
          <p>Oops! I couldn't load the latest posts. You can find them directly on my 
             <a href="https://jeetjoshi.substack.com/" target="_blank">Substack</a>.</p>
        </div>
      `;
    }
  }

  function renderPosts(posts) {
    // Clear container
    container.innerHTML = '';

    posts.forEach((post) => {
      // Create post element matching existing markup
      const article = document.createElement('a');
      article.href = post.link;
      article.target = '_blank';
      article.rel = 'noopener noreferrer';
      article.className = 'writing-item reveal';
      
      // Format date
      const pubDate = new Date(post.pubDate);
      const formattedDate = pubDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });

      // Clean excerpt
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.description;
      let excerpt = tempDiv.textContent || tempDiv.innerText || "";
      excerpt = excerpt.split('\n')[0].substring(0, 160) + '...';

      article.innerHTML = `
        <div>
          <h2 class="writing-item__title">${post.title}</h2>
          <p class="writing-item__excerpt">${excerpt}</p>
        </div>
        <span class="writing-item__date">${formattedDate}</span>
      `;

      container.appendChild(article);
    });

    // Trigger reveal animation for new items
    if (window.revealElements) {
      window.revealElements();
    }
  }

  // Load posts
  fetchPosts();
})();
