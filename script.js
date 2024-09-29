// OpenWeatherMap API key
const apiKey = 'f95495124d75cd269ee630ab7cbc9e3a';

// Elements to display weather info
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIconEl = document.getElementById('weather-icon');

// Get the user's location using the Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert("Geolocation is not supported by this browser.");
}

// Success callback for geolocation
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Call OpenWeatherMap API with the user's location
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => console.error('Error fetching weather data:', err));
}

// Error callback for geolocation
function error() {
  alert("Unable to retrieve your location.");
}

// Display the weather data on the page
function displayWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp.toFixed(1);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Display the data in the DOM
  locationEl.textContent = `${city}, ${country}`;
  temperatureEl.textContent = `${temperature}°C`;
  descriptionEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  weatherIconEl.src = iconUrl;
}

let previousWeather = null;

function checkWeatherChanges(currentWeather) {
  if (previousWeather && currentWeather !== previousWeather) {
    alert('Weather has changed! Stay updated.');
  }
  previousWeather = currentWeather;
}

function displayWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp.toFixed(1);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Display the data in the DOM
  locationEl.textContent = `${city}, ${country}`;
  temperatureEl.textContent = `${temperature}°C`;
  descriptionEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  weatherIconEl.src = iconUrl;

  // Check for weather changes (alert/notify)
  checkWeatherChanges(description);
}

// Check weather every 30 minutes (optional)
setInterval(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}, 30 * 60 * 1000);  // 30 minutes interval

// Example to load more discussions dynamically
const loadDiscussions = () => {
    const discussionContainer = document.querySelector('#discussion-container');
    
    // Dummy discussions (You can replace this with real data fetched from an API)
    const discussions = [
      { title: 'How to grow better tomatoes?', content: 'Farmers share their tips on improving tomato yield.' },
      { title: 'Water-saving techniques for dry seasons', content: 'Conserve water and grow healthy crops.' }
    ];
    
    discussions.forEach(discussion => {
      const discussionCard = document.createElement('div');
      discussionCard.classList.add('discussion-card', 'p-3', 'mb-3');
      discussionCard.innerHTML = `
        <h5>${discussion.title}</h5>
        <p>${discussion.content}</p>
        <a href="#" class="btn btn-outline-primary">Join the Discussion</a>
      `;
      discussionContainer.appendChild(discussionCard);
    });
  };
  
  // Call the function to load discussions
  loadDiscussions();
  