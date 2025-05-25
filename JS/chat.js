const input = document.querySelector('.chat-input input');
const button = document.querySelector('.chat-input button');
const chatBox = document.querySelector('.chat-box');
const chatList = document.querySelector('.chat-list');


const contacts = [
  { name: 'Finley Darma', lastMessage: 'yes, i want one carrot pls', time: '08:43', imgSrc: 'profile1.jpg' },
  { name: 'Christo', lastMessage: 'Will do, super, thank you', time: 'Tue', imgSrc: 'profile2.jpg' },
  { name: 'Hamas Azizan', lastMessage: 'Uploaded file.', time: 'Sun', imgSrc: 'profile3.jpg' },
  { name: 'Lebron James', lastMessage: 'Here is another tutorial...', time: '23 May', imgSrc: 'profile4.jpg' },
  { name: 'Jose Farmer', lastMessage: 'gacorr', time: '18 May', imgSrc: 'profile5.jpg' },
  { name: 'Mr. Asep', lastMessage: 'Thanks for the info', time: '01 May', imgSrc: 'profile6.jpg' },
  { name: 'Gracias Kumara', lastMessage: 'laperr wakk', time: '01 May', imgSrc: 'profile7.jpg' },
  { name: 'Marzena Klasza', lastMessage: 'potem sie zobaczyć', time: '29 Mar', imgSrc: 'profile8.jpg' },
  { name: 'Alexis', lastMessage: 'i want to buy two cabbage', time: '27 Mar', imgSrc: 'profile9.jpg' }
];


function updateSidebar() {
  chatList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    const initial = contact.name.split(' ')[0].charAt(0).toUpperCase(); 

    li.innerHTML = `
      <div class="contact-info">
        <div class="profile-img">${initial}</div> <!-- Display initial in the circle -->
        <div class="contact-text">
          <span class="contact-name">${contact.name}</span>
          <span>${contact.time}</span>
          <span class="last-message">${contact.lastMessage}</span>
        </div>
      </div>
    `;
    chatList.appendChild(li);
  });
}


updateSidebar();

button.addEventListener('click', () => {
  if (input.value.trim()) {
    
    const msg = document.createElement('div');
    msg.className = 'message sent';
    msg.textContent = input.value;
    chatBox.appendChild(msg);

    
    contacts[0].lastMessage = input.value; 
    contacts[0].time = new Date().toLocaleTimeString().slice(0, 5); 
    
    
    updateSidebar();

  
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});