// ShoreSquad Main Application JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('ShoreSquad App Initialized');
    setupEventListeners();    // Initialize core features
    // initMap();
    initWeatherData();
    // initializeUserSystem();
}

// Weather utility functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTemperature(temp) {
    // Ensure temperature is in Celsius
    return `${Math.round(temp)}°C`;
}

async function fetchWeatherForecast() {
    const today = new Date().toISOString().split('T')[0];
    const url = `https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${today}`;
    
    try {
        const response = await fetchData(url);
        return response.items[0].forecasts;
    } catch (error) {
        throw new Error('Failed to fetch weather forecast: ' + error.message);
    }
}

async function initWeatherData() {
    try {
        const weatherContainer = document.querySelector('.weather-container');
        if (!weatherContainer) return;

        const forecasts = await fetchWeatherForecast();
        
        const forecastsHTML = forecasts.map(forecast => `
            <div class="weather-card">
                <h3>${formatDate(forecast.date)}</h3>
                <div class="weather-icon">
                    <span class="material-icons">${getWeatherIcon(forecast.forecast)}</span>
                </div>
                <p class="temperature">
                    ${formatTemperature(forecast.temperature.low)} - ${formatTemperature(forecast.temperature.high)}
                </p>
                <p class="forecast-text">${forecast.forecast}</p>
                <p class="humidity">Relative Humidity: ${forecast.relative_humidity.low}% - ${forecast.relative_humidity.high}%</p>
                <p class="wind">Wind: ${forecast.wind.speed.low} - ${forecast.wind.speed.high} km/h</p>
            </div>
        `).join('');

        weatherContainer.innerHTML = forecastsHTML;
    } catch (error) {
        handleError(error, 'Weather Data Initialization');
    }
}

// Set up event listeners
function setupEventListeners() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // This will be implemented when we add the cleanup registration system
            console.log('Join Cleanup clicked');
        });
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for making API calls
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Weather icon mapping
function getWeatherIcon(forecast) {
    const lowercaseForecast = forecast.toLowerCase();
    if (lowercaseForecast.includes('thundery')) return 'thunderstorm';
    if (lowercaseForecast.includes('rain')) return 'rainy';
    if (lowercaseForecast.includes('cloudy')) return 'cloud';
    if (lowercaseForecast.includes('sunny')) return 'wb_sunny';
    if (lowercaseForecast.includes('fair')) return 'wb_sunny';
    if (lowercaseForecast.includes('windy')) return 'air';
    return 'wb_sunny'; // default icon
}

// Error handling utility
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // We'll add user-friendly error notifications later
}
