const europeCountries = [
    'AT', 'BE', 'BG', 'CY', 'CZ', 'DK', 'EE',
    'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
    'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH'
];

export const isEuropeCountry = (requestCountry) => requestCountry && europeCountries.indexOf(requestCountry) !== -1;

/*
    
  29 European Countries
  
  Austria, Belgium, Bulgaria, Cyprus, Czech Republic,
  Denmark, Estonia, Finland, France, Germany, Greece,
  Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg,
  Malta, Netherlands, Norway, Poland, Portugal, Romania,
  Slovakia, Slovenia, Spain, Sweden, Switzerland

*/