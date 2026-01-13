// API Configuration
const APIs = {
    quote: 'https://api.quotable.io/random',
    joke: 'https://v2.jokeapi.dev/joke/Programming?safe-mode',
    weather: (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`,
    cat: 'https://api.thecatapi.com/v1/images/search',
    dog: 'https://dog.ceo/api/breeds/image/random'
};

// DOM Elements
const elements = {
    quote: document.getElementById('quote-display'),
    joke: document.getElementById('joke-display'),
    weather: document.getElementById('weather-display'),
    cat: document.getElementById('cat-display'),
    hostname: document.getElementById('hostname-display'),
    sysUser: document.getElementById('sys-user'),
    sysTime: document.getElementById('sys-time'),
    sysBrowser: document.getElementById('sys-browser'),
    sysConnection: document.getElementById('sys-connection')
};

// API Functions
async function getQuote() {
    try {
        elements.quote.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        const response = await fetch(APIs.quote);
        const data = await response.json();
        elements.quote.innerHTML = `
            <div class="quote-content">
                <i class="fas fa-quote-left" style="color:#00dbde;"></i>
                <p>${data.content}</p>
                <i class="fas fa-quote-right" style="color:#00dbde;"></i>
            </div>
            <div class="quote-author">
                <i class="fas fa-user"></i> ${data.author}
            </div>
        `;
    } catch (error) {
        elements.quote.innerHTML = '<span style="color:#ff6b6b;">Error loading quote</span>';
    }
}

async function getJoke() {
    try {
        elements.joke.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        const response = await fetch(APIs.joke);
        const data = await response.json();
        
        let jokeHTML = '';
        if (data.type === 'single') {
            jokeHTML = `<p class="joke-text">${data.joke}</p>`;
        } else if (data.type === 'twopart') {
            jokeHTML = `
                <p class="joke-setup">${data.setup}</p>
                <p class="joke-delivery">${data.delivery}</p>
            `;
        }
        
        elements.joke.innerHTML = jokeHTML + `
            <div class="joke-meta">
                <span><i class="fas fa-tag"></i> ${data.category}</span>
            </div>
        `;
    } catch (error) {
        elements.joke.innerHTML = '<span style="color:#ff6b6b;">Error loading joke</span>';
    }
}

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    
    if (!city) {
        elements.weather.innerHTML = '<span style="color:#ffbd2e;">Please enter a city</span>';
        return;
    }
    
    try {
        elements.weather.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading weather...';
        
        // Note: You need to sign up at openweathermap.org for a free API key
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = 'YOUR_API_KEY_HERE'; // Get from openweathermap.org
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod === 200) {
            elements.weather.innerHTML = `
                <div class="weather-info">
                    <h4>${data.name}, ${data.sys.country}</h4>
                    <div class="weather-main">
                        <p><i class="fas fa-thermometer-half"></i> ${Math.round(data.main.temp)}°C</p>
                        <p><i class="fas fa-cloud"></i> ${data.weather[0].description}</p>
                        <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
                        <p><i class="fas fa-wind"></i> Wind: ${data.wind.speed} m/s</p>
                    </div>
                </div>
            `;
        } else {
            elements.weather.innerHTML = '<span style="color:#ff6b6b;">City not found</span>';
        }
    } catch (error) {
        elements.weather.innerHTML = '<span style="color:#ff6b6b;">Error loading weather</span>';
    }
}

async function getCat() {
    try {
        elements.cat.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding a cute cat...';
        const response = await fetch(APIs.cat);
        const data = await response.json();
        elements.cat.innerHTML = `
            <div class="cat-image">
                <img src="${data[0].url}" alt="Random Cat" style="width:100%; border-radius:10px; max-height:200px; object-fit:cover;">
                <div class="cat-meta">
                    <i class="fas fa-paw"></i> Random cat delivered!
                </div>
            </div>
        `;
    } catch (error) {
        elements.cat.innerHTML = '<span style="color:#ff6b6b;">Error loading cat</span>';
    }
}

// System Information
function updateSystemInfo() {
    // User info
    elements.sysUser.textContent = navigator.platform || 'Unknown';
    
    // Time
    const now = new Date();
    elements.sysTime.textContent = now.toLocaleTimeString();
    
    // Browser
    elements.sysBrowser.textContent = navigator.userAgent.split(' ')[0] || 'Unknown';
    
    // Connection
    elements.sysConnection.textContent = navigator.onLine ? 'Online ✓' : 'Offline ✗';
    
    // Hostname
    elements.hostname.textContent = window.location.hostname || 'localhost';
}

// Utility Functions
function deployAlert() {
    alert('🚀 Deployment initiated!\nCheck console for details.');
    console.log('Deployment process started...');
    console.log('1. Compiling assets ✓');
    console.log('2. Optimizing images ✓');
    console.log('3. Deploying to GitHub Pages ✓');
    console.log('✅ Website deployed successfully!');
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Q for quote
    if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        getQuote();
    }
    // Ctrl + J for joke
    if (e.ctrlKey && e.key === 'j') {
        e.preventDefault();
        getJoke();
    }
    // Ctrl + C for cat
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        getCat();
    }
});

// Initialize
window.onload = function() {
    console.log('🌐 Website initialized');
    console.log('🖥️ Platform:', navigator.platform);
    console.log('🌍 User Agent:', navigator.userAgent);
    
    // Update system info
    updateSystemInfo();
    
    // Update time every second
    setInterval(updateSystemInfo, 1000);
    
    // Load initial quote
    getQuote();
    
    // Simulate terminal typing
    simulateTyping();
};

// Terminal typing effect
function simulateTyping() {
    const commands = [
        'whoami',
        'ls -la',
        'cd my-website',
        'git status',
        'npm start'
    ];
    
    let index = 0;
    const terminalBody = document.querySelector('.terminal-body');
    
    function typeCommand() {
        if (index < commands.length) {
            const command = commands[index];
            const line = document.createElement('p');
            line.innerHTML = `<span class="prompt">$</span> ${command}`;
            terminalBody.insertBefore(line, terminalBody.lastElementChild);
            index++;
            setTimeout(typeCommand, 1500);
        }
    }
    
    setTimeout(typeCommand, 1000);
}
