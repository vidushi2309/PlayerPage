// Sample Data
let events = [
  { name: "Soccer Championship", date: "2024-11-25T10:00" },
  { name: "Basketball Tournament", date: "2024-12-01T14:00" }
];
let reminders = [
  { name: "Team Meeting", date: "2024-11-20T09:00" }
];

// Leaderboard data
const leaderboard = [
  { name: "Player 1", sport: "Soccer", performance: 85 },
  { name: "Player 2", sport: "Basketball", performance: 90 },
  { name: "Player 3", sport: "Tennis", performance: 88 },
  { name: "Player 4", sport: "Soccer", performance: 92 },
  { name: "Player 5", sport: "Basketball", performance: 84 },
];

// Render Events with Images in the Upcoming Events Section (without add reminder form)
function renderEvents() {
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = ''; // Clear previous events

  // Display sample events
  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.innerHTML = `
      <h3>${event.name}</h3>
      <p>${new Date(event.date).toLocaleString()}</p>
    `;
    eventList.appendChild(eventItem);
  });

  // Display reminders in Upcoming Events
  reminders.forEach(reminder => {
    const reminderItem = document.createElement('div');
    reminderItem.className = 'event-item';
    reminderItem.innerHTML = `
      <h3>${reminder.name}</h3>
      <p>Reminder at: ${new Date(reminder.date).toLocaleString()}</p>
    `;
    eventList.appendChild(reminderItem);
  });
}

// Render Event Reminders in the Reminders Section
function renderReminders() {
  const reminderList = document.getElementById('reminder-list');
  reminderList.innerHTML = ''; // Clear previous reminders
  reminders.forEach(reminder => {
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item';
    reminderItem.innerHTML = `<p>Reminder for ${reminder.name} at ${new Date(reminder.date).toLocaleString()}</p>`;
    reminderList.appendChild(reminderItem);
  });
}

// Filter and Render Leaderboard
function filterLeaderboard() {
  const sportFilter = document.getElementById('filter-sport').value;
  const filteredLeaderboard = leaderboard.filter(athlete => 
    sportFilter === 'all' || athlete.sport === sportFilter
  );
  renderLeaderboard(filteredLeaderboard);
}

// Render Leaderboard Items
function renderLeaderboard(filteredLeaderboard) {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = ''; // Clear previous leaderboard data
  filteredLeaderboard.forEach(athlete => {
    const listItem = document.createElement('li');
    listItem.textContent = `${athlete.name} (${athlete.sport}): ${athlete.performance} points`;
    leaderboardList.appendChild(listItem);
  });
}

// Handle Image Preview for Athlete Details
function previewImage(event) {
  const imagePreview = document.getElementById('image-preview');
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    imagePreview.style.display = 'block';  // Show the image preview
    imagePreview.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file); // Read the file as data URL
  } else {
    imagePreview.style.display = 'none'; // Hide if no file selected
  }
}

// Create the Athlete Performance Chart using Chart.js
const performanceGraph = document.getElementById('performanceGraph').getContext('2d');
const performanceChart = new Chart(performanceGraph, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Performance Score',
      data: [75, 80, 85, 90, 92],
      borderColor: '#3498db',
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  }
});
// Initial Rendering of Events, Reminders, Leaderboard, and Athlete Performance Chart
document.addEventListener('DOMContentLoaded', () => {
  renderEvents(); // Render events on page load
  renderReminders(); // Render reminders on page load
  renderLeaderboard(leaderboard); // Render leaderboard on page load
});
