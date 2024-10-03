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


  // Function to send email using EmailJS
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submit

    emailjs.init("5OGFCuQ5433Y1-S1o");  // Replace YOUR_PUBLIC_KEY with the correct key


    
    // Show loading message
    const formStatus = document.getElementById('form-status');
    formStatus.innerText = 'Sending...';

    emailjs.sendForm('service_fs7znfo', 'template_vvkos6a', this)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formStatus.innerText = 'Message sent successfully!';
        formStatus.style.color = 'green';
      }, function(error) {
        console.log('FAILED...', error);
        formStatus.innerText = 'Failed to send message. Please try again.';
        formStatus.style.color = 'red';
      });
  });

 


  