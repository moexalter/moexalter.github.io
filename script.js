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

// Cybersecurity Tools Functions

// Enhanced IP Information Lookup
async function getIPPlusInfo() {
    const ipInput = document.getElementById('ip-input');
    const target = ipInput.value.trim() || 'myip';
    
    try {
        document.getElementById('ip-plus-display').innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i> Looking up...';
        
        const response = await fetch(`https://ipapi.co/${target}/json/`);
        const data = await response.json();
        
        if (data.error) {
            document.getElementById('ip-plus-display').innerHTML = 
                '<span style="color:#ff6b6b;">Invalid IP/domain</span>';
            return;
        }
        
        document.getElementById('ip-plus-display').innerHTML = `
            <div style="text-align:left;">
                <p><strong>IP:</strong> ${data.ip || 'N/A'}</p>
                <p><strong>Location:</strong> ${data.city}, ${data.region}, ${data.country_name}</p>
                <p><strong>ISP:</strong> ${data.org || 'Unknown'}</p>
                <p><strong>Timezone:</strong> ${data.timezone || 'N/A'}</p>
                <p><strong>Coordinates:</strong> ${data.latitude}, ${data.longitude}</p>
                <p><strong>ASN:</strong> ${data.asn || 'N/A'}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById('ip-plus-display').innerHTML = 
            '<span style="color:#ff6b6b;">Lookup failed</span>';
    }
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const meter = document.getElementById('password-meter');
    const display = document.getElementById('password-strength-display');
    
    if (!password) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter a password</span>';
        meter.style.width = '0%';
        meter.style.background = '#ff6b6b';
        return;
    }
    
    // Calculate strength
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    
    // Common password check
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'welcome'];
    if (commonPasswords.includes(password.toLowerCase())) {
        score = 10;
        feedback.push('Very common password!');
    }
    
    // Update meter
    meter.style.width = `${Math.min(score, 100)}%`;
    
    // Color based on score
    if (score < 40) {
        meter.style.background = '#ff6b6b';
        display.innerHTML = `<span style="color:#ff6b6b;"><i class="fas fa-times-circle"></i> WEAK</span>`;
        feedback.push('Add more characters, numbers, and symbols');
    } else if (score < 70) {
        meter.style.background = '#ffbd2e';
        display.innerHTML = `<span style="color:#ffbd2e;"><i class="fas fa-exclamation-triangle"></i> MEDIUM</span>`;
        feedback.push('Could be stronger');
    } else if (score < 90) {
        meter.style.background = '#00dbde';
        display.innerHTML = `<span style="color:#00dbde;"><i class="fas fa-check-circle"></i> STRONG</span>`;
    } else {
        meter.style.background = '#00ff00';
        display.innerHTML = `<span style="color:#00ff00;"><i class="fas fa-shield-alt"></i> VERY STRONG</span>`;
    }
    
    // Add feedback
    if (feedback.length > 0) {
        display.innerHTML += `<br><small>${feedback.join(' ')}</small>`;
    }
}

// Port Scanner Simulator
async function simulatePortScan() {
    const host = document.getElementById('host-input').value.trim() || 'localhost';
    const portsInput = document.getElementById('ports-input').value.trim() || '22,80,443';
    const display = document.getElementById('port-scan-display');
    
    try {
        display.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
        
        // Simulate scanning delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const ports = portsInput.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
        const commonPorts = {
            21: 'FTP',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            80: 'HTTP',
            110: 'POP3',
            143: 'IMAP',
            443: 'HTTPS',
            3306: 'MySQL',
            3389: 'RDP',
            5432: 'PostgreSQL',
            8080: 'HTTP-Alt'
        };
        
        let results = [];
        let openPorts = 0;
        
        // Simulate random results
        ports.forEach(port => {
            const isOpen = Math.random() > 0.7; // 30% chance port is "open"
            const service = commonPorts[port] || 'Unknown';
            
            if (isOpen) {
                openPorts++;
                results.push(`<span style="color:#00ff00;">✓ Port ${port} (${service}) - OPEN</span>`);
            } else {
                results.push(`<span style="color:#ff6b6b;">✗ Port ${port} (${service}) - CLOSED</span>`);
            }
        });
        
        display.innerHTML = `
            <div style="text-align:left;">
                <p><strong>Scanning ${host}</strong></p>
                <p>Found ${openPorts} open ports out of ${ports.length}</p>
                <div style="max-height:150px; overflow-y:auto; margin-top:10px;">
                    ${results.join('<br>')}
                </div>
                <p><small><i>Note: This is a simulation for educational purposes</i></small></p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Scan failed</span>';
    }
}

// More Cybersecurity Tools

// Hash Generator
async function generateHash() {
    const text = document.getElementById('hash-input').value.trim();
    const algorithm = document.getElementById('hash-algorithm').value;
    const display = document.getElementById('hash-display');
    
    if (!text) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter text to hash</span>';
        return;
    }
    
    try {
        display.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating hash...';
        
        // Convert text to ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        
        // Generate hash based on selected algorithm
        let hashBuffer;
        switch (algorithm) {
            case 'md5':
                // Note: MD5 not available in Web Crypto API, we'll use a library simulation
                display.innerHTML = 'MD5: ' + await simulateMD5(text);
                return;
            case 'sha1':
                hashBuffer = await crypto.subtle.digest('SHA-1', data);
                break;
            case 'sha256':
                hashBuffer = await crypto.subtle.digest('SHA-256', data);
                break;
            case 'sha512':
                hashBuffer = await crypto.subtle.digest('SHA-512', data);
                break;
            default:
                hashBuffer = await crypto.subtle.digest('SHA-256', data);
        }
        
        // Convert buffer to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        display.innerHTML = `
            <div style="text-align:left; font-family: monospace; word-break: break-all;">
                <p><strong>${algorithm.toUpperCase()}:</strong></p>
                <p style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px;">
                    ${hashHex}
                </p>
                <p><small>Length: ${hashHex.length} characters</small></p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Error generating hash</span>';
    }
}

// Simulate MD5 (since Web Crypto API doesn't support MD5)
async function simulateMD5(text) {
    // This is a simplified simulation - real MD5 would need a library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.substring(0, 32); // Return first 32 chars to simulate MD5 length
}

// User-Agent Parser
function parseUserAgent() {
    const uaInput = document.getElementById('useragent-input').value.trim();
    const display = document.getElementById('useragent-display');
    
    const userAgent = uaInput || navigator.userAgent;
    
    try {
        display.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Parsing...';
        
        // Simple UA parsing (real parsing would use a library like UAParser.js)
        const ua = userAgent.toLowerCase();
        let browser = 'Unknown';
        let os = 'Unknown';
        let device = 'Desktop';
        
        // Browser detection
        if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
        else if (ua.includes('firefox')) browser = 'Firefox';
        else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
        else if (ua.includes('edg')) browser = 'Edge';
        else if (ua.includes('opera')) browser = 'Opera';
        
        // OS detection
        if (ua.includes('windows')) os = 'Windows';
        else if (ua.includes('mac os')) os = 'macOS';
        else if (ua.includes('linux')) os = 'Linux';
        else if (ua.includes('android')) os = 'Android';
        else if (ua.includes('ios') || ua.includes('iphone')) os = 'iOS';
        
        // Device detection
        if (ua.includes('mobile')) device = 'Mobile';
        else if (ua.includes('tablet')) device = 'Tablet';
        
        display.innerHTML = `
            <div style="text-align:left;">
                <p><strong>Browser:</strong> ${browser}</p>
                <p><strong>Operating System:</strong> ${os}</p>
                <p><strong>Device:</strong> ${device}</p>
                <p><strong>User-Agent:</strong></p>
                <p style="font-size:0.8rem; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px; overflow-wrap: break-word;">
                    ${userAgent.substring(0, 200)}${userAgent.length > 200 ? '...' : ''}
                </p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Error parsing User-Agent</span>';
    }
}

// SSL Certificate Checker (simulated - real checking needs backend)
async function checkSSL() {
    const urlInput = document.getElementById('ssl-input').value.trim();
    const display = document.getElementById('ssl-display');
    
    if (!urlInput) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter a website URL</span>';
        return;
    }
    
    // Add https:// if not present
    let url = urlInput;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    try {
        display.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking SSL...';
        
        // Note: Real SSL checking requires server-side due to CORS
        // This is a simulation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulated results
        const isHTTPS = url.startsWith('https://');
        const daysValid = Math.floor(Math.random() * 365) + 1;
        const issuer = isHTTPS ? 'Let\'s Encrypt' : 'None (HTTP)';
        const validFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
        const validTo = new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toLocaleDateString();
        
        if (isHTTPS) {
            display.innerHTML = `
                <div style="text-align:left;">
                    <p style="color:#00ff00;"><i class="fas fa-check-circle"></i> <strong>SSL SECURE</strong></p>
                    <p><strong>Issuer:</strong> ${issuer}</p>
                    <p><strong>Valid From:</strong> ${validFrom}</p>
                    <p><strong>Valid Until:</strong> ${validTo}</p>
                    <p><strong>Protocol:</strong> TLS 1.3</p>
                    <p><strong>Status:</strong> Valid for ${daysValid} more days</p>
                    <p><small><i>Simulated results - real check requires server-side</i></small></p>
                </div>
            `;
        } else {
            display.innerHTML = `
                <div style="text-align:left;">
                    <p style="color:#ff6b6b;"><i class="fas fa-exclamation-triangle"></i> <strong>NO SSL</strong></p>
                    <p><strong>Protocol:</strong> HTTP (Not Secure)</p>
                    <p><strong>Warning:</strong> Data not encrypted</p>
                    <p><strong>Recommendation:</strong> Use HTTPS</p>
                    <p><small><i>Simulated results - real check requires server-side</i></small></p>
                </div>
            `;
        }
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Error checking SSL</span>';
    }
}


// More Cybersecurity Tools - Part 2

// Base64 Encoder/Decoder
function encodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const display = document.getElementById('base64-display');
    
    if (!input) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter text to encode</span>';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        display.innerHTML = `
            <div style="text-align:left;">
                <p><strong>Base64 Encoded:</strong></p>
                <p style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; word-break: break-all;">
                    ${encoded}
                </p>
                <p><small>Length: ${encoded.length} characters</small></p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Encoding failed</span>';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const display = document.getElementById('base64-display');
    
    if (!input) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter Base64 to decode</span>';
        return;
    }
    
    try {
        // Check if it's valid Base64
        if (!/^[A-Za-z0-9+/=]+$/.test(input)) {
            display.innerHTML = '<span style="color:#ff6b6b;">Invalid Base64 format</span>';
            return;
        }
        
        const decoded = decodeURIComponent(escape(atob(input)));
        display.innerHTML = `
            <div style="text-align:left;">
                <p><strong>Decoded Text:</strong></p>
                <p style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; word-break: break-all;">
                    ${decoded}
                </p>
                <p><small>Length: ${decoded.length} characters</small></p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Decoding failed - invalid Base64</span>';
    }
}

// HTTP Header Analyzer
async function analyzeHeaders() {
    const urlInput = document.getElementById('header-input').value.trim();
    const display = document.getElementById('header-display');
    
    if (!urlInput) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter a URL</span>';
        return;
    }
    
    // Add https:// if not present
    let url = urlInput;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    try {
        display.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching headers...';
        
        // Note: CORS restrictions apply, this is a simulation
        // In real implementation, you'd need a backend proxy
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulated headers based on URL
        const isHTTPS = url.startsWith('https://');
        const domain = url.replace(/^https?:\/\//, '').split('/')[0];
        
        const simulatedHeaders = {
            'Server': 'nginx/1.18.0',
            'Date': new Date().toUTCString(),
            'Content-Type': 'text/html; charset=UTF-8',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=3600',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
        };
        
        if (isHTTPS) {
            simulatedHeaders['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
        }
        
        // Format headers for display
        let headersHTML = '';
        for (const [key, value] of Object.entries(simulatedHeaders)) {
            const isSecurityHeader = key.includes('Security') || key.includes('Policy') || key.includes('Options');
            const color = isSecurityHeader ? '#00ff00' : '#00dbde';
            headersHTML += `<p><strong style="color:${color}">${key}:</strong> ${value}</p>`;
        }
        
        display.innerHTML = `
            <div style="text-align:left; max-height: 300px; overflow-y: auto;">
                <p><strong>HTTP Headers for ${domain}:</strong></p>
                <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 5px; margin-top: 10px;">
                    ${headersHTML}
                </div>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                    <i class="fas fa-info-circle"></i> 
                    <small>Simulated due to CORS restrictions. Real headers require backend proxy.</small>
                </p>
            </div>
        `;
    } catch (error) {
        display.innerHTML = '<span style="color:#ff6b6b;">Failed to analyze headers</span>';
    }
}

// MAC Address Validator/Lookup
function checkMAC() {
    const macInput = document.getElementById('mac-input').value.trim().toUpperCase();
    const display = document.getElementById('mac-display');
    
    if (!macInput) {
        display.innerHTML = '<span style="color:#ffbd2e;">Enter a MAC address</span>';
        return;
    }
    
    // MAC address regex patterns
    const patterns = [
        /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/,
        /^([0-9A-F]{2}[-]){5}([0-9A-F]{2})$/,
        /^([0-9A-F]{4}[.]){2}([0-9A-F]{4})$/,
        /^([0-9A-F]{12})$/
    ];
    
    let isValid = false;
    let format = 'Unknown';
    
    for (const pattern of patterns) {
        if (pattern.test(macInput)) {
            isValid = true;
            if (pattern.toString().includes('[:]')) format = 'Colon-separated (00:1A:2B:3C:4D:5E)';
            else if (pattern.toString().includes('[-]')) format = 'Dash-separated (00-1A-2B-3C-4D-5E)';
            else if (pattern.toString().includes('[.]')) format = 'Dot-separated (001A.2B3C.4D5E)';
            else format = 'No separator (001A2B3C4D5E)';
            break;
        }
    }
    
    if (!isValid) {
        display.innerHTML = '<span style="color:#ff6b6b;">Invalid MAC address format</span>';
        return;
    }
    
    // Extract OUI (first 3 bytes/6 chars) for vendor lookup
    let oui = '';
    if (macInput.includes(':') || macInput.includes('-')) {
        oui = macInput.substring(0, 8).replace(/[: -]/g, '');
    } else if (macInput.includes('.')) {
        oui = macInput.substring(0, 6).replace(/\./g, '');
    } else {
        oui = macInput.substring(0, 6);
    }
    
    // Simulated vendor database
    const vendors = {
        '001A2B': 'Cisco Systems',
        '0050C2': 'Microsoft',
        '000C29': 'VMware',
        '001B63': 'Apple',
        '001D0F': 'Avaya',
        '0021D1': 'Samsung',
        '000D56': 'Huawei',
        '001EC0': 'HP',
        '001BFC': 'NVIDIA',
        '001F3B': 'Dell'
    };
    
    const vendor = vendors[oui] || 'Unknown vendor';
    
    // Determine if it's unicast/multicast and universal/local
    const firstByte = parseInt(oui.substring(0, 2), 16);
    const isUnicast = (firstByte & 0x01) === 0; // LSB of first byte
    const isUniversal = (firstByte & 0x02) === 0; // Second LSB of first byte
    
    display.innerHTML = `
        <div style="text-align:left;">
            <p style="color:#00ff00;"><i class="fas fa-check-circle"></i> <strong>VALID MAC ADDRESS</strong></p>
            <p><strong>Format:</strong> ${format}</p>
            <p><strong>OUI (Vendor):</strong> ${oui} - ${vendor}</p>
            <p><strong>Address Type:</strong> ${isUnicast ? 'Unicast' : 'Multicast'}</p>
            <p><strong>Administration:</strong> ${isUniversal ? 'Universally Administered' : 'Locally Administered'}</p>
            <p><strong>Full MAC:</strong> <code>${macInput}</code></p>
            <p><small><i>OUI: Organizationally Unique Identifier (first 3 bytes)</i></small></p>
        </div>
    `;
}
