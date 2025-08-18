// src/index.js

import createHomepage from './initial-load';
import createMenuPage from './menu';
import createContactPage from './contact';

function clearContent() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';
}

function loadPage(page) {
  clearContent();
  if (page === 'home') {
      createHomepage();
  } else if (page === 'menu') {
      createMenuPage();
  } else if (page === 'contact') {
      createContactPage();
  }
}

// Initial page load
createHomepage();

// Add event listeners to the navigation buttons
const homeButton = document.querySelector('nav button:nth-child(1)');
const menuButton = document.querySelector('nav button:nth-child(2)');
const aboutButton = document.querySelector('nav button:nth-child(3)'); // Assuming "About" is now "Contact"

homeButton.addEventListener('click', () => loadPage('home'));
menuButton.addEventListener('click', () => loadPage('menu'));
aboutButton.addEventListener('click', () => loadPage('contact'));
