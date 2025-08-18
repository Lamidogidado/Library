// src/initial-load.js

function createHomepage() {
  const contentDiv = document.getElementById('content');

  const headline = document.createElement('h1');
  headline.textContent = 'Welcome to The Delicious Diner!';

  const image = document.createElement('img');
  image.src = 'https://via.placeholder.com/300';
  image.alt = 'Delicious Food';

  const paragraph1 = document.createElement('p');
  paragraph1.textContent = 'Come and experience the culinary delights at The Delicious Diner! We pride ourselves on using the freshest ingredients and crafting mouthwatering dishes that will leave you wanting more. Our cozy atmosphere and friendly staff will make you feel right at home.';

  const paragraph2 = document.createElement('p');
  paragraph2.textContent = "We've been serving the Lagos community for over 10 years and are passionate about bringing you the best food in town. From our signature Jollof Rice to our delectable Pepper Soup, there's something for everyone to enjoy.";

  contentDiv.appendChild(headline);
  contentDiv.appendChild(image);
  contentDiv.appendChild(paragraph1);
  contentDiv.appendChild(paragraph2);
}

export default createHomepage;