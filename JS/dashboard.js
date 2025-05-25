// FarmCast Dashboard JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize all dashboard functionality
function initializeDashboard() {
    setupMobileMenu();
    setupSidebar();
    setupWeatherUpdates();
    setupJobsTracking();
    setupStatCounters();
    setupSoilMonitoring();
    setupMapInteraction();
    setupSearchFunctionality();
    setupNotifications();
    startRealTimeUpdates();
}

// Mobile Menu Setup
function setupMobileMenu() {
    const sidebar = document.querySelector('aside');
    const mainContent = document.querySelector('main');
    
    // Create hamburger menu button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg';
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    document.body.appendChild(hamburgerBtn);
    
    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);
    
    function toggleMobileMenu() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
    
    function closeMobileMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
}

// Sidebar Navigation Setup
function setupSidebar() {
    const sidebarLinks = document.querySelectorAll('aside nav a');
    const currentPage = 'Overview'; // This would be dynamic in a real app
    
    sidebarLinks.forEach(link => {
        link.classList.add('sidebar-item');
        
        if (link.textContent.trim() === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Simulate page navigation
            showPageContent(this.textContent.trim());
        });
    });
    
    // Setup dropdown functionality
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(details => {
        details.addEventListener('toggle', function() {
            const summary = this.querySelector('summary');
            const arrow = summary.querySelector('span');
            
            if (this.open) {
                arrow.textContent = '▲';
            } else {
                arrow.textContent = '▼';
            }
        });
    });
}

// Weather Updates
function setupWeatherUpdates() {
    const weatherIcon = document.querySelector('.weather-icon');
    if (weatherIcon) {
        weatherIcon.classList.add('weather-icon');
    }
    
    // Simulate weather data updates
    updateWeatherData();
    setInterval(updateWeatherData, 300000); // Update every 5 minutes
}

function updateWeatherData() {
    // This would fetch real weather data from an API
    const temperature = document.querySelector('.temperature-display');
    const humidity = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('Humidity'));
    
    // Add loading animation
    if (temperature) {
        temperature.classList.add('loading');
        setTimeout(() => {
            temperature.classList.remove('loading');
        }, 1000);
    }
    
    // Simulate data update with random variations
    setTimeout(() => {
        updateTemperatureDisplay();
        updateHumidityLevel();
    }, 1000);
}

function updateTemperatureDisplay() {
    const tempElement = document.querySelector('[class*="text-4xl font-bold"]');
    if (tempElement) {
        const currentTemp = parseInt(tempElement.textContent);
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newTemp = currentTemp + variation;
        tempElement.textContent = `${newTemp}°C`;
        
        // Add shimmer effect
        tempElement.classList.add('temperature-display');
    }
}

function updateHumidityLevel() {
    // Update humidity with realistic variations
    const humidityElements = document.querySelectorAll('strong');
    humidityElements.forEach(element => {
        if (element.textContent.includes('%') && element.textContent.includes('86')) {
            const currentHumidity = parseInt(element.textContent);
            const variation = Math.floor(Math.random() * 5) - 2;
            const newHumidity = Math.max(0, Math.min(100, currentHumidity + variation));
            element.textContent = `${newHumidity}%`;
        }
    });
}

// Jobs Tracking System
function setupJobsTracking() {
    const jobElements = document.querySelectorAll('.job-indicator');
    jobElements.forEach(job => {
        job.classList.add('job-indicator');
    });
    
    // Add click handlers to job items
    const jobItems = document.querySelectorAll('[class*="flex items-start"]');
    jobItems.forEach(item => {
        if (item.querySelector('p[class*="font-semibold"]')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                showJobDetails(this);
            });
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
                this.style.backgroundColor = '#f9fafb';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.backgroundColor = 'transparent';
            });
        }
    });
}

function showJobDetails(jobElement) {
    const jobTitle = jobElement.querySelector('p[class*="font-semibold"]').textContent;
    const jobDate = jobElement.querySelector('p[class*="text-xs"]').textContent;
    
    // Create modal or expand details
    showNotification(`Job Details: ${jobTitle} - ${jobDate}`, 'info');
}

// Statistics Counter Animation
function setupStatCounters() {
    const statNumbers = document.querySelectorAll('[class*="text-2xl font-bold"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        if (stat.textContent.match(/^\d+$/)) {
            observer.observe(stat);
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Soil Monitoring
function setupSoilMonitoring() {
    const soilParams = document.querySelectorAll('tbody tr');
    
    soilParams.forEach(row => {
        row.classList.add('table-row');
        
        // Add status indicators
        const valueCell = row.querySelector('td:nth-child(2)');
        const recommendationCell = row.querySelector('td:nth-child(3)');
        
        if (recommendationCell) {
            const statusIndicator = document.createElement('span');
            statusIndicator.className = 'status-indicator';
            
            if (recommendationCell.textContent.includes('dry') || recommendationCell.textContent.includes('recommended')) {
                statusIndicator.classList.add('status-warning');
            } else if (recommendationCell.textContent.includes('Ideal') || recommendationCell.textContent.includes('Good')) {
                statusIndicator.classList.add('status-active');
            }
            
            recommendationCell.insertBefore(statusIndicator, recommendationCell.firstChild);
        }
    });
    
    // Update soil data periodically
    setInterval(updateSoilData, 600000); // Update every 10 minutes
}

function updateSoilData() {
    // Simulate soil sensor data updates
    const moistureValue = document.querySelector('tbody tr:first-child td:nth-child(2)');
    if (moistureValue) {
        const currentMoisture = parseInt(moistureValue.textContent);
        const variation = Math.floor(Math.random() * 3) - 1;
        const newMoisture = Math.max(0, Math.min(100, currentMoisture + variation));
        moistureValue.textContent = `${newMoisture}%`;
        
        // Update recommendation based on new value
        const recommendation = moistureValue.parentElement.querySelector('td:nth-child(3)');
        if (newMoisture < 30) {
            recommendation.className = 'py-3 text-sm text-red-600';
            recommendation.innerHTML = '<span class="status-indicator status-danger"></span>Critical: Immediate irrigation required!';
        } else if (newMoisture < 40) {
            recommendation.className = 'py-3 text-sm text-yellow-600';
            recommendation.innerHTML = '<span class="status-indicator status-warning"></span>Soil is dry. Irrigation recommended within 24h.';
        } else {
            recommendation.className = 'py-3 text-sm text-green-600';
            recommendation.innerHTML = '<span class="status-indicator status-active"></span>Moisture level optimal.';
        }
    }
}

// Map Interaction
function setupMapInteraction() {
    const mapContainer = document.querySelector('[class*="bg-green-100"]');
    const mapMarkers = document.querySelectorAll('[class*="absolute"][class*="rounded-full"]');
    
    mapMarkers.forEach(marker => {
        marker.classList.add('map-marker');
        marker.addEventListener('click', function() {
            showMarkerInfo(this);
        });
    });
    
    // Add map zoom functionality
    if (mapContainer) {
        let zoomLevel = 1;
        mapContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomLevel = Math.min(zoomLevel + 0.1, 2);
            } else {
                zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
            }
            this.style.transform = `scale(${zoomLevel})`;
        });
    }
}

function showMarkerInfo(marker) {
    const colors = {
        'bg-red-500': 'Alert Zone - Pest detected',
        'bg-blue-500': 'Irrigation System - Active',
        'bg-yellow-500': 'Harvest Area - Ready'
    };
    
    const markerColor = Array.from(marker.classList).find(cls => cls.startsWith('bg-'));
    const info = colors[markerColor] || 'Field Marker';
    
    showNotification(info, 'info');
}

// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    
    if (searchInput) {
        searchInput.classList.add('form-input');
        
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (query.length < 2) return;
    
    // Simulate search functionality
    console.log(`Searching for: ${query}`);
    showNotification(`Searching for "${query}"...`, 'info');
    
    // In a real application, this would filter content or make an API call
    setTimeout(() => {
        showNotification(`Found results for "${query}"`, 'success');
    }, 1000);
}

// Notification System
function setupNotifications() {
    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification bg-white border-l-4 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full opacity-0 transition-all duration-300`;
    
    const colors = {
        info: 'border-blue-500',
        success: 'border-green-500',
        warning: 'border-yellow-500',
        error: 'border-red-500'
    };
    
    notification.classList.add(colors[type] || colors.info);
    
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    notification.innerHTML = `
        <div class="flex items-start">
            <span class="text-lg mr-2">${icons[type] || icons.info}</span>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">${message}</p>
            </div>
            <button class="ml-2 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// Real-time Updates
function startRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        // Randomly update various dashboard elements
        const updateFunctions = [
            updateWeatherData,
            updateSoilData,
            updateJobCounts
        ];
        
        const randomUpdate = updateFunctions[Math.floor(Math.random() * updateFunctions.length)];
        if (Math.random() > 0.7) { // 30% chance of update
            randomUpdate();
        }
    }, 30000); // Check every 30 seconds
}

function updateJobCounts() {
    const jobCounters = document.querySelectorAll('[class*="text-2xl font-bold text-gray-800"]');
    jobCounters.forEach(counter => {
        if (counter.textContent.match(/^\d+$/)) {
            const currentCount = parseInt(counter.textContent);
            const variation = Math.floor(Math.random() * 3) - 1;
            const newCount = Math.max(0, currentCount + variation);
            
            if (newCount !== currentCount) {
                counter.textContent = newCount;
                counter.style.color = '#16a34a';
                setTimeout(() => {
                    counter.style.color = '#1f2937';
                }, 1000);
            }
        }
    });
}

// Page Content Management
function showPageContent(pageName) {
    console.log(`Navigating to: ${pageName}`);
    
    // In a real SPA, this would load different content
    switch(pageName) {
        case 'Calendar':
            showNotification('Calendar view would load here', 'info');
            break;
        case 'Field Stats':
            showNotification('Field statistics would load here', 'info');
            break;
        case 'Harvest Data':
            showNotification('Harvest data would load here', 'info');
            break;
        case 'Agricultural':
            showNotification('Agricultural tools would load here', 'info');
            break;
        case 'Sales':
            showNotification('Sales dashboard would load here', 'info');
            break;
        default:
            console.log('Overview page active');
    }
}

// New Job Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const newJobBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'New Job');
    if (newJobBtn) {
        newJobBtn.classList.add('btn-primary');
        newJobBtn.addEventListener('click', function() {
            showNewJobModal();
        });
    }
});

function showNewJobModal() {
    showNotification('New Job creation form would open here', 'info');
    // In a real app, this would open a modal or navigate to a form
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for external use if needed
window.FarmCastDashboard = {
    showNotification,
    updateWeatherData,
    updateSoilData,
    showPageContent
};