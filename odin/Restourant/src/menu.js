// src/menu.js

function createMenuPage() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear existing content

  const menuHeadline = document.createElement('h2');
  menuHeadline.textContent = 'Our Delicious Menu';

  const menuItem1 = document.createElement('p');
  menuItem1.textContent = 'Jollof Rice - A classic West African rice dish.';

  const menuItem2 = document.createElement('p');
  menuItem2.textContent = 'Pepper Soup - Spicy and flavorful broth with meat or fish.';

  const menuItem3 = document.createElement('p');
  menuItem3.textContent = 'Pounded Yam with Egusi Soup - A hearty and traditional meal.';

  contentDiv.appendChild(menuHeadline);
  contentDiv.appendChild(menuItem1);
  contentDiv.appendChild(menuItem2);
  contentDiv.appendChild(menuItem3);
}

export default createMenuPage;