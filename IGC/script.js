// Tree Plantation Calculator - Main JavaScript File

// Global variables
let citiesData = [];
let pollutionChart = null;
let cityChart = null;
let heatmapChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeTheme();
});

// Main initialization function
function initializeApp() {
    loadInitialData();
    setupEventListeners();
    initializeCharts();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupMobileMenu();
}

// Load CSV data using PapaParse
function loadCsvData() {
    const csvPath = 'data/cities.csv';
    fetch(csvPath, { cache: 'no-store' })
        .then(r => {
            if (!r.ok) throw new Error('CSV not found');
            return r.text();
        })
        .then(text => new Promise(resolve => {
            Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: results => resolve(results.data)
            });
        }))
        .then(rows => {
            citiesData = mapCsvRowsToCities(rows);
            populateCityDropdown();
            renderCityCards();
            renderDatasetTable();
        })
        .catch(() => {
            citiesData = [];
            populateCityDropdown();
            renderCityCards();
            renderDatasetTable();
        });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('citySearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterCities);
    }

    // Filter functionality
    const soilFilter = document.getElementById('soilFilter');
    if (soilFilter) {
        soilFilter.addEventListener('change', filterCities);
    }

    // City selection
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.addEventListener('change', updateCityData);
    }

    // Slider updates
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSliderValue);
    });

    // CSV controls removed; data loads automatically
}

// Populate city dropdown
function populateCityDropdown() {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect) return;

    citySelect.innerHTML = '<option value="">Choose a city...</option>';
    
    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// Update city data when selection changes
function updateCityData() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citiesData.find(city => city.name === citySelect.value);
    
    if (selectedCity) {
        // Update sliders with city data
        document.getElementById('coSlider').value = selectedCity.co;
        document.getElementById('co2Slider').value = selectedCity.co2;
        document.getElementById('ozoneSlider').value = selectedCity.ozone;
        document.getElementById('pmSlider').value = selectedCity.pm25;
        document.getElementById('humidity').value = selectedCity.humidity;
        
        // Update slider value displays
        updateSliderValue({ target: { id: 'coSlider' } });
        updateSliderValue({ target: { id: 'co2Slider' } });
        updateSliderValue({ target: { id: 'ozoneSlider' } });
        updateSliderValue({ target: { id: 'pmSlider' } });
        updateSliderValue({ target: { target: { id: 'humidity' } } });
        
        // Update soil type and fertility
        document.getElementById('soilType').value = selectedCity.soilType;
        document.getElementById('fertility').value = selectedCity.fertility;
    }
}

// Update slider value display
function updateSliderValue(event) {
    const slider = event.target;
    const valueDisplay = document.getElementById(slider.id.replace('Slider', 'Value'));
    if (valueDisplay) {
        valueDisplay.textContent = slider.value;
    }
}

// Map PapaParse rows into internal shape used by the app
function mapCsvRowsToCities(rows) {
    const out = [];
    rows.forEach(r => {
        const name = (r.city || r.City || r.name || r.Name || '').toString().trim();
        if (!name) return;
        const co = Number(r.co ?? r.CO ?? 0) || 0;
        const co2 = Number(r.co2 ?? r.CO2 ?? 0) || 0;
        const ozone = Number(r.ozone ?? r.Ozone ?? 0) || 0;
        const pm25 = Number(r['pm2.5'] ?? r.pm25 ?? r.PM25 ?? r['PM 2.5'] ?? 0) || 0;
        const soilType = (r.soilType || r.soil || r.Soil || '').toString().toLowerCase();
        const fertility = (r.fertility || r.Fertility || '').toString().toLowerCase();
        const humidity = Number(r.humidity ?? r.Humidity ?? 0) || 0;
        out.push({ name, co, co2, ozone, pm25, soilType, fertility, humidity });
    });
    return out;
}

// Filter cities based on search and filter criteria
function filterCities() {
    const searchTerm = document.getElementById('citySearch').value.toLowerCase();
    const soilFilter = document.getElementById('soilFilter').value;
    
    const filteredCities = citiesData.filter(city => {
        const matchesSearch = city.name.toLowerCase().includes(searchTerm);
        const matchesSoil = !soilFilter || city.soilType === soilFilter;
        return matchesSearch && matchesSoil;
    });
    
    renderCityCards(filteredCities);
    renderDatasetTable(filteredCities);
}

// Render city cards
function renderCityCards(cities = citiesData) {
    const citiesGrid = document.getElementById('citiesGrid');
    if (!citiesGrid) return;

    citiesGrid.innerHTML = '';
    
    cities.forEach(city => {
        const card = document.createElement('div');
        card.className = 'city-card';
        card.innerHTML = `
            <div class="city-name">${city.name}</div>
            <div class="city-stats">
                <div class="stat-item">
                    <div class="stat-label">CO</div>
                    <div class="stat-value">${city.co} ppm</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">CO₂</div>
                    <div class="stat-value">${city.co2} ppm</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Ozone</div>
                    <div class="stat-value">${city.ozone} ppb</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">PM 2.5</div>
                    <div class="stat-value">${city.pm25} μg/m³</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Soil</div>
                    <div class="stat-value">${city.soilType}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Fertility</div>
                    <div class="stat-value">${city.fertility}</div>
                </div>
            </div>
        `;
        citiesGrid.appendChild(card);
    });
}

// Render dataset table
function renderDatasetTable(cities = citiesData) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    cities.forEach(city => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.name}</td>
            <td>${city.co}</td>
            <td>${city.co2}</td>
            <td>${city.ozone}</td>
            <td>${city.pm25}</td>
            <td>${city.soilType}</td>
            <td>${city.fertility}</td>
            <td>${city.humidity}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// Calculate trees required
function calculateTrees() {
    const co = parseFloat(document.getElementById('coSlider').value);
    const co2 = parseFloat(document.getElementById('co2Slider').value);
    const ozone = parseFloat(document.getElementById('ozoneSlider').value);
    const pm25 = parseFloat(document.getElementById('pmSlider').value);
    const soilType = document.getElementById('soilType').value;
    const fertility = document.getElementById('fertility').value;
    const humidity = parseFloat(document.getElementById('humidity').value);

    // Tree calculation algorithm
    const treesRequired = calculateTreeRequirement(co, co2, ozone, pm25, soilType, fertility, humidity);
    
    // Update display
    const treeCountElement = document.getElementById('treeCount');
    if (treeCountElement) {
        treeCountElement.textContent = Math.round(treesRequired);
    }

    // Update pollution chart
    updatePollutionChart(co, co2, ozone, pm25);
}

// Tree calculation algorithm
function calculateTreeRequirement(co, co2, ozone, pm25, soilType, fertility, humidity) {
    // Base calculation factors
    const coFactor = co * 2.5;
    const co2Factor = (co2 - 300) * 0.8; // Normal CO2 is around 300-400 ppm
    const ozoneFactor = ozone * 1.2;
    const pmFactor = pm25 * 3.0;

    // Environmental factors
    const soilFactors = {
        'clay': 1.2,
        'sandy': 1.0,
        'loamy': 0.8,
        'black': 0.7
    };

    const fertilityFactors = {
        'high': 0.7,
        'medium': 1.0,
        'low': 1.3
    };

    const humidityFactor = humidity < 40 ? 1.3 : humidity > 80 ? 1.1 : 1.0;

    // Calculate total trees needed
    const baseTrees = coFactor + co2Factor + ozoneFactor + pmFactor;
    const soilMultiplier = soilFactors[soilType] || 1.0;
    const fertilityMultiplier = fertilityFactors[fertility] || 1.0;
    
    return baseTrees * soilMultiplier * fertilityMultiplier * humidityFactor;
}

// Initialize charts
function initializeCharts() {
    // Initialize pollution chart
    const pollutionCtx = document.getElementById('pollutionChart');
    if (pollutionCtx) {
        pollutionChart = new Chart(pollutionCtx, {
            type: 'doughnut',
            data: {
                labels: ['CO', 'CO₂', 'Ozone', 'PM 2.5'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        '#FF6B6B',
                        '#4ECDC4',
                        '#45B7D1',
                        '#96CEB4'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Initialize city comparison chart
    const cityCtx = document.getElementById('cityChart');
    if (cityCtx) {
        cityChart = new Chart(cityCtx, {
            type: 'bar',
            data: {
                labels: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
                datasets: [{
                    label: 'Trees Required',
                    data: [1200, 800, 950, 700, 850],
                    backgroundColor: '#2c5530',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Initialize heatmap chart
    const heatmapCtx = document.getElementById('heatmapChart');
    if (heatmapCtx) {
        heatmapChart = new Chart(heatmapCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Pollution Levels',
                    data: [
                        {x: 8.5, y: 85, label: 'Mumbai'},
                        {x: 6.2, y: 65, label: 'Pune'},
                        {x: 7.1, y: 75, label: 'Nagpur'},
                        {x: 5.8, y: 55, label: 'Nashik'},
                        {x: 6.9, y: 70, label: 'Aurangabad'}
                    ],
                    backgroundColor: '#2c5530',
                    pointRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'CO Levels (ppm)'
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'PM 2.5 (μg/m³)'
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    }
                }
            }
        });
    }
}

// Update pollution chart
function updatePollutionChart(co, co2, ozone, pm25) {
    if (pollutionChart) {
        pollutionChart.data.datasets[0].data = [co, co2, ozone, pm25];
        pollutionChart.update();
    }
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Utility function to format numbers
function formatNumber(num) {
    return num.toLocaleString();
}

// Theme Management Functions
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    setTheme(savedTheme);
    
    // Add event listener for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.querySelector('.theme-icon');
    
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Update chart colors if charts exist
    updateChartThemes(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function updateChartThemes(theme) {
    const isDark = theme === 'dark';
    
    // Update pollution chart colors
    if (pollutionChart) {
        pollutionChart.options.plugins.legend.labels.color = isDark ? '#ffffff' : '#333333';
        pollutionChart.update();
    }
    
    // Update city chart colors
    if (cityChart) {
        cityChart.options.scales.x.grid.color = isDark ? '#404040' : '#e9ecef';
        cityChart.options.scales.y.grid.color = isDark ? '#404040' : '#e9ecef';
        cityChart.options.scales.x.title.color = isDark ? '#ffffff' : '#333333';
        cityChart.options.scales.y.title.color = isDark ? '#ffffff' : '#333333';
        cityChart.update();
    }
    
    // Update heatmap chart colors
    if (heatmapChart) {
        heatmapChart.options.scales.x.grid.color = isDark ? '#404040' : '#e9ecef';
        heatmapChart.options.scales.y.grid.color = isDark ? '#404040' : '#e9ecef';
        heatmapChart.options.scales.x.title.color = isDark ? '#ffffff' : '#333333';
        heatmapChart.options.scales.y.title.color = isDark ? '#ffffff' : '#333333';
        heatmapChart.update();
    }
}

// Export functions for global access
window.calculateTrees = calculateTrees;
window.scrollToSection = scrollToSection;
window.toggleTheme = toggleTheme;
