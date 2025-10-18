# 🌳 Tree Plantation for Pollution Reduction

> **Hackathon Project**: A web-based calculator to determine tree requirements for reducing pollutants across 26 Maharashtra cities.

## 🎯 Project Overview

**Mission**: Calculate optimal tree plantation requirements to combat pollution in Maharashtra's urban centers.

**Scope**: 26 cities across Maharashtra  
**Pollutants**: CO, CO₂, Ozone, PM  
**Environmental Factors**: Soil type, fertility, humidity  

---

## 🏗️ Technical Architecture

### File Structure
```
├── index.html          # Main application
├── style.css           # Styling & responsive design
├── script.js           # Calculator logic & charts
├── data/
│   ├── cities.json     # City data & pollution levels
│   └── calculations.js # Tree calculation algorithms
└── assets/
    ├── images/         # City images & icons
    └── charts/         # Generated visualizations
```

### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5 / Tailwind CSS
- **Visualization**: Chart.js / D3.js
- **Data**: JSON format for city information

---

## 🎨 User Interface Design

### 1. Navigation Header
- **Brand**: Tree Plantation Calculator
- **Menu**: Home | Dataset | Calculator | Insights | About
- **Responsive**: Mobile-first design

### 2. Hero Section
- **Headline**: "Reducing Pollution, One Tree at a Time"
- **Subtext**: "Calculate optimal tree requirements for Maharashtra cities"
- **CTA**: "Start Calculator" → Scroll to calculator

### 3. Dataset Overview
- **Format**: Interactive table with search & sort
- **Data Points**: City, CO, CO₂, Ozone, PM, Soil Type, Fertility, Humidity
- **Visualization**: City cards with pollution indicators

### 4. Calculator (Core Feature)
#### Input Controls
- **City Selector**: Dropdown with 26 Maharashtra cities
- **Pollution Sliders**: CO, CO₂, Ozone, PM (with current city baselines)
- **Environmental**: Auto-filled soil type, fertility, humidity (editable)

#### Output Display
- **Tree Count**: `XXX trees required`
- **Visualization**: Pie chart showing pollutant breakdown
- **Recommendations**: Tree species suggestions based on soil type

### 5. Insights Dashboard
- **City Comparison**: Bar chart - Cities vs Tree Requirements
- **Pollution Heatmap**: Maharashtra pollution distribution
- **Key Findings**:
  - High PM cities require 40% more trees
  - Fertile soil reduces tree count by 25%
  - Humidity affects tree survival rates

### 6. About Section
- **Team**: Hackathon participants
- **Mission**: Environmental sustainability through data-driven solutions
- **Impact**: Potential pollution reduction metrics

---

## 🧮 Calculation Algorithm

### Core Formula
```
Trees Required = Σ(Pollutant Impact × City Factor × Soil Factor × Humidity Factor)
```

### Factors
- **Pollutant Impact**: Weighted based on harm level
- **City Factor**: Population density & industrial activity
- **Soil Factor**: Fertility and type compatibility
- **Humidity Factor**: Climate suitability for tree growth

---

## 📊 Data Sources

### Maharashtra Cities (26)
- Mumbai, Pune, Nagpur, Nashik, Aurangabad, Solapur, Amravati, Kolhapur, Sangli, Malegaon, Jalgaon, Latur, Ahmednagar, Chandrapur, Parbhani, Ichalkaranji, Jalna, Bhusawal, Panvel, Satara, Beed, Yavatmal, Kamptee, Gondia, Barshi, Achalpur

### Pollution Data
- **CO**: Carbon Monoxide levels (ppm)
- **CO₂**: Carbon Dioxide levels (ppm)
- **Ozone**: Ground-level ozone (ppb)
- **PM**: Particulate Matter 2.5 & 10 (μg/m³)

### Environmental Data
- **Soil Types**: Clay, Sandy, Loamy, Black soil
- **Fertility**: High, Medium, Low (based on nutrient content)
- **Humidity**: Percentage levels by season

---

## 🚀 Implementation Plan

### Phase 1: Core Structure
- [ ] HTML layout with semantic structure
- [ ] CSS styling with responsive design
- [ ] Basic JavaScript functionality

### Phase 2: Calculator Logic
- [ ] Data integration (cities.json)
- [ ] Calculation algorithms
- [ ] Input validation & error handling

### Phase 3: Visualization
- [ ] Chart.js integration
- [ ] Interactive graphs
- [ ] Data export functionality

### Phase 4: Enhancement
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness testing

---

## 🎯 Success Metrics

- **Accuracy**: ±5% tree count accuracy
- **Performance**: <2s calculation time
- **Usability**: Intuitive interface for non-technical users
- **Impact**: Clear environmental benefit visualization

---

## 📝 Notes

- **Local Development**: No hosting required, runs on localhost
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Data Updates**: Easy to modify city data via JSON files
- **Extensibility**: Framework supports additional cities/pollutants

---

*Built with ❤️ for environmental sustainability*
