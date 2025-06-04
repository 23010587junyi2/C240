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
function formatTemperature(temp) {
    // Ensure temperature is in Celsius
    return `${Math.round(temp)}°C`;
}

async function initWeatherData() {
    try {
        const weatherContainer = document.querySelector('.weather-container');
        if (!weatherContainer) return;

        // Placeholder weather data structure (will be replaced with API data)
        const weatherData = {
            temperature: 28, // Already in Celsius
            humidity: 75,    // Percentage
            windSpeed: 15,   // km/h
            conditions: 'Partly Cloudy'
        };

        weatherContainer.innerHTML = `
            <div class="weather-card">
                <h3>Current Conditions</h3>
                <p class="temperature">${formatTemperature(weatherData.temperature)}</p>
                <p>Humidity: ${weatherData.humidity}%</p>
                <p>Wind Speed: ${weatherData.windSpeed} km/h</p>
                <p>${weatherData.conditions}</p>
            </div>
        `;
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

// Error handling utility
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // We'll add user-friendly error notifications later
}
