// src/contact.js

function createContactPage() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear existing content

  const contactHeadline = document.createElement('h2');
  contactHeadline.textContent = 'Contact Us';

  const address = document.createElement('p');
  address.textContent = '123 Delicious Street, Adamawa, Nigeria';

  const phone = document.createElement('p');
  phone.textContent = 'Phone: +234 803 685 9525';

  const email = document.createElement('p');
  email.textContent = 'Email: Lamido361@gmail.';

  contentDiv.appendChild(contactHeadline);
  contentDiv.appendChild(address);
  contentDiv.appendChild(phone);
  contentDiv.appendChild(email);
}

export default createContactPage;