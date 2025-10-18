// DATA TO BE ENTERED HERE - Tree calculation algorithms and environmental factors

// Tree calculation constants and formulas
const TREE_CALCULATION_FACTORS = {
    // Pollutant impact weights
    CO_WEIGHT: 2.5,
    CO2_WEIGHT: 0.8,
    OZONE_WEIGHT: 1.2,
    PM25_WEIGHT: 3.0,
    
    // Soil type multipliers
    SOIL_FACTORS: {
        'clay': 1.2,
        'sandy': 1.0,
        'loamy': 0.8,
        'black': 0.7
    },
    
    // Fertility level multipliers
    FERTILITY_FACTORS: {
        'high': 0.7,
        'medium': 1.0,
        'low': 1.3
    },
    
    // Humidity impact factors
    HUMIDITY_FACTORS: {
        'low': 1.3,    // < 40%
        'optimal': 1.0, // 40-80%
        'high': 1.1    // > 80%
    }
};

// Tree species recommendations based on soil type
const TREE_SPECIES_RECOMMENDATIONS = {
    'clay': ['Neem', 'Peepal', 'Banyan', 'Mango'],
    'sandy': ['Coconut', 'Casuarina', 'Eucalyptus', 'Acacia'],
    'loamy': ['Teak', 'Mahogany', 'Jamun', 'Gulmohar'],
    'black': ['Cotton', 'Sugarcane', 'Wheat', 'Soybean']
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TREE_CALCULATION_FACTORS,
        TREE_SPECIES_RECOMMENDATIONS
    };
}
