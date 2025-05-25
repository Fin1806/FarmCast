document.addEventListener('DOMContentLoaded', () => {
    const dailyButton = document.querySelector('.tabs button:nth-child(1)');
    const weeklyButton = document.querySelector('.tabs button:nth-child(2)');
    const monthlyButton = document.querySelector('.tabs button:nth-child(3)');
    const calendarDays = document.querySelector('.calendar-days');
    const timeSlots = document.querySelector('.time-slots');
    const dailyView = document.getElementById('daily-view');
    const weeklyView = document.getElementById('weekly-view');
    const monthlyView = document.getElementById('monthly-view');
    const calendarMonth = document.getElementById('calendar-month');
  
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    function generateDailyView() {
      const today = new Date();
      const dayOfMonth = today.getDate();
      const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ...
      const days = [];
  
      for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = `${i} ${daysOfWeek[(dayOfWeek + i - 1) % 7]}`;
        days.push(dayElement);
      }
  
      dailyView.innerHTML = '';  // Clear previous view
      days.forEach(day => dailyView.appendChild(day));
    }
  
    function generateWeeklyView() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ...
      const days = [];
  
      for (let i = 0; i < 7; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = `${daysOfWeek[(dayOfWeek + i) % 7]} ${today.getDate() + i}`;
        days.push(dayElement);
      }
  
      weeklyView.innerHTML = '';  // Clear previous view
      days.forEach(day => weeklyView.appendChild(day));
    }
  
    function generateMonthlyView() {
      const today = new Date();
      const month = today.getMonth();
      const daysInMonth = new Date(today.getFullYear(), month + 1, 0).getDate();
      const days = [];
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = `${i}`;
        days.push(dayElement);
      }
  
      monthlyView.innerHTML = '';  // Clear previous view
      days.forEach(day => monthlyView.appendChild(day));
    }
  
    // Tombol untuk mengubah tampilan
    dailyButton.addEventListener('click', () => {
      dailyView.style.display = 'grid';
      weeklyView.style.display = 'none';
      monthlyView.style.display = 'none';
      timeSlots.style.display = 'block';
      generateDailyView();
    });
  
    weeklyButton.addEventListener('click', () => {
      dailyView.style.display = 'none';
      weeklyView.style.display = 'grid';
      monthlyView.style.display = 'none';
      timeSlots.style.display = 'none';
      generateWeeklyView();
    });
  
    monthlyButton.addEventListener('click', () => {
      dailyView.style.display = 'none';
      weeklyView.style.display = 'none';
      monthlyView.style.display = 'grid';
      timeSlots.style.display = 'none';
      generateMonthlyView();
    });
  
    // Menampilkan tampilan bulanan secara default saat pertama kali dibuka
    generateMonthlyView();
  });
  