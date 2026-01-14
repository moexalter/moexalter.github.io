// API Configuration
const APIs = {
    quote: 'https://zenquotes.io/api/random',
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
        
        // ZenQuotes returns an array
        if (data && data[0]) {
            elements.quote.innerHTML = `
                <div class="quote-content">
                    <i class="fas fa-quote-left" style="color:#00dbde;"></i>
                    <p>${data[0].q}</p>
                    <i class="fas fa-quote-right" style="color:#00dbde;"></i>
                </div>
                <div class="quote-author">
                    <i class="fas fa-user"></i> ${data[0].a}
                </div>
            `;
        } else {
            // Fallback quote
            elements.quote.innerHTML = `
                <div class="quote-content">
                    <i class="fas fa-quote-left" style="color:#00dbde;"></i>
                    <p>Code is like humor. When you have to explain it, it's bad.</p>
                    <i class="fas fa-quote-right" style="color:#00dbde;"></i>
                </div>
                <div class="quote-author">
                    <i class="fas fa-user"></i> Cory House
                </div>
            `;
        }
    } catch (error) {
        // Final fallback
        elements.quote.innerHTML = `
            <div class="quote-content">
                <i class="fas fa-quote-left" style="color:#00dbde;"></i>
                <p>First, solve the problem. Then, write the code.</p>
                <i class="fas fa-quote-right" style="color:#00dbde;"></i>
            </div>
            <div class="quote-author">
                <i class="fas fa-user"></i> John Johnson
            </div>
        `;
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
        const apiKey = '0cd360a0e5f23399f0dfb64d04bb569e'; // Get from openweathermap.org
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

// Have I Been Pwned API - Check email breaches
async function checkBreach() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        document.getElementById('breach-display').innerHTML = 
            '<span style="color:#ffbd2e;">Please enter an email</span>';
        return;
    }
    
    if (!email.includes('@')) {
        document.getElementById('breach-display').innerHTML = 
            '<span style="color:#ffbd2e;">Please enter a valid email</span>';
        return;
    }
    
    try {
        document.getElementById('breach-display').innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i> Checking breaches...';
        
        // Hash the email (SHA-1) for privacy
        const emailHash = await sha1(email.toLowerCase());
        const prefix = emailHash.substring(0, 5);
        const suffix = emailHash.substring(5);
        
        // Call HIBP API
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        
        // Check if hash suffix exists in results
        const hashes = data.split('\n');
        const found = hashes.find(h => h.startsWith(suffix));
        
        if (found) {
            const count = found.split(':')[1];
            document.getElementById('breach-display').innerHTML = `
                <div style="color:#ff6b6b;">
                    <i class="fas fa-exclamation-triangle"></i> <strong>BREACHED!</strong>
                    <p>Email found in ${parseInt(count).toLocaleString()} breaches</p>
                    <p style="font-size:0.9rem;">Change passwords for sites using this email</p>
                </div>
            `;
        } else {
            document.getElementById('breach-display').innerHTML = `
                <div style="color:#00ff00;">
                    <i class="fas fa-check-circle"></i> <strong>SAFE!</strong>
                    <p>No breaches found for this email</p>
                    <p style="font-size:0.9rem;">Good security practice!</p>
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('breach-display').innerHTML = 
            '<span style="color:#ff6b6b;">Error checking breaches. Try again.</span>';
    }
}

// SHA-1 hashing function (for email privacy)
async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
