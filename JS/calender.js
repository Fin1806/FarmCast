window.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById('calendarGrid');
  const tabButtons = document.querySelectorAll('.tab-btn');

  renderCalendar('Daily');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCalendar(btn.textContent.trim());
    });
  });

  function renderCalendar(view) {
    calendarGrid.innerHTML = '';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerRow = document.createElement('div');
    headerRow.className = 'calendar-row calendar-grid-header';
    headerRow.innerHTML = `<div class="time-label">EST<br>GMT+8</div>` +
      days.map((d, i) => `<div class="day">${d}<br><strong>${21 + i}</strong></div>`).join('');
    calendarGrid.appendChild(headerRow);

    let hours = [];
    if (view === 'Daily') hours = [7, 8, 9, 10, 11];
    if (view === 'Weekly') hours = [7, 8, 9, 10, 11];
    if (view === 'Monthly') hours = [6, 7, 8, 9, 10, 11];

    hours.forEach(hour => {
      const row = document.createElement('div');
      row.className = 'calendar-row';
      row.innerHTML = `<div class="time-label">${hour} AM</div>` +
        Array(7).fill(`<div class="cell"></div>`).join('');
      calendarGrid.appendChild(row);
    });

    const notes = document.querySelectorAll('.note-card');
    notes.forEach(note => {
      note.style.display = (view === "Monthly") ? "none" : "block";
    });
  }
});