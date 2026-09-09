import { IndustrialFacility } from '../types';

export const GLOBAL_INDUSTRIAL_FACILITIES: IndustrialFacility[] = [
  // North America
  {
    id: 'fac-na-01',
    name: 'Baytown Petrochemical Complex (ExxonMobil)',
    type: 'oil_refinery',
    country: 'United States',
    region: 'Texas, Houston Ship Channel',
    latitude: 29.7355,
    longitude: -95.0113,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Oil', 'Ethylene', 'Benzene', 'Liquefied Butane'],
    fuelStorageCapacityTons: 850000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Harris County Hazmat Response Unit 4',
      phone: '+1-281-555-0199',
      radioChannel: 'TAC-04-FIRE',
      hazmatLevel: 'Level A / Type 1'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-02',
    name: 'Baton Rouge Refinery & Chemical Plant',
    type: 'chemical_plant',
    country: 'United States',
    region: 'Louisiana, Mississippi River Corridor',
    latitude: 30.4908,
    longitude: -91.1963,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Refined Gasoline', 'Propylene', 'Sulfuric Acid', 'Hexane'],
    fuelStorageCapacityTons: 520000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 7.2,
    emergencyContact: {
      responderUnit: 'East Baton Rouge Fire & Emergency Hazmat',
      phone: '+1-225-555-0142',
      radioChannel: 'TAC-09-PETRO',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-03',
    name: 'Sabine Pass LNG Liquefaction Terminal',
    type: 'lng_terminal',
    country: 'United States',
    region: 'Louisiana, Cameron Parish',
    latitude: 29.7428,
    longitude: -93.8767,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Methane (Cryogenic LNG)', 'Ethane', 'Refrigerant Propane'],
    fuelStorageCapacityTons: 1200000,
    blastRadiusKm: 4.8,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Cameron Parish Emergency Marine & Fire Squad',
      phone: '+1-337-555-0188',
      radioChannel: 'LNG-EMERG-12',
      hazmatLevel: 'Type 1 Cryogenic'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-04',
    name: 'Cushing Crude Hub Tank Farm & Pipeline Terminal',
    type: 'petrol_bunk_hub',
    country: 'United States',
    region: 'Oklahoma, Payne County',
    latitude: 35.9818,
    longitude: -96.7674,
    hazardLevel: 'HIGH',
    primaryChemicals: ['WTI Crude Oil', 'Sweet Light Distillates'],
    fuelStorageCapacityTons: 3800000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 5.0,
    emergencyContact: {
      responderUnit: 'Cushing Industrial Fire Protection District',
      phone: '+1-918-555-0164',
      radioChannel: 'OK-OIL-TAC',
      hazmatLevel: 'Type 2 Industrial'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-05',
    name: 'Corpus Christi Refineries & Crude Export Terminal',
    type: 'oil_refinery',
    country: 'United States',
    region: 'Texas, Nueces Bay',
    latitude: 27.8188,
    longitude: -97.4339,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Aviation Jet A-1', 'Ultra-Low Sulfur Diesel', 'Toluene'],
    fuelStorageCapacityTons: 640000,
    blastRadiusKm: 2.8,
    toxicPlumeRadiusKm: 6.0,
    emergencyContact: {
      responderUnit: 'Port of Corpus Christi Emergency Services',
      phone: '+1-361-555-0133',
      radioChannel: 'TAC-TX-PORT',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-06',
    name: 'El Segundo Refinery & Marine Terminal (Chevron)',
    type: 'oil_refinery',
    country: 'United States',
    region: 'California, Los Angeles County',
    latitude: 33.9103,
    longitude: -118.4239,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Commercial Gasoline', 'Jet Fuel', 'Alkylate'],
    fuelStorageCapacityTons: 450000,
    blastRadiusKm: 2.5,
    toxicPlumeRadiusKm: 5.5,
    emergencyContact: {
      responderUnit: 'LA County Hazmat Station 116',
      phone: '+1-310-555-0177',
      radioChannel: 'LAC-TAC-02',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-07',
    name: 'Bruce Nuclear Power Station & Heavy Water Hub',
    type: 'power_plant',
    country: 'Canada',
    region: 'Ontario, Lake Huron Shore',
    latitude: 44.3255,
    longitude: -81.5985,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Transformer Dielectric Oils', 'Hydrogen Coolant', 'Heavy Water'],
    fuelStorageCapacityTons: 120000,
    blastRadiusKm: 5.0,
    toxicPlumeRadiusKm: 12.0,
    emergencyContact: {
      responderUnit: 'Bruce Power Nuclear Emergency Response Team (NERT)',
      phone: '+1-519-555-0120',
      radioChannel: 'CAN-NUC-01',
      hazmatLevel: 'Level A Radiological/Thermal'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-08',
    name: 'Fort McMurray Oil Sands Upgrader (Syncrude Mildred Lake)',
    type: 'oil_refinery',
    country: 'Canada',
    region: 'Alberta, Athabasca Basin',
    latitude: 57.0425,
    longitude: -111.6214,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Bitumen', 'Synthetic Crude', 'Hydrogen Sulfide (H2S)', 'Naphtha'],
    fuelStorageCapacityTons: 980000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 9.5,
    emergencyContact: {
      responderUnit: 'Wood Buffalo Regional Emergency Services',
      phone: '+1-780-555-0145',
      radioChannel: 'AB-NORTH-FIRE',
      hazmatLevel: 'Level A / H2S Specialized'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-na-09',
    name: 'Coatzacoalcos Pajaritos Petrochemical Complex',
    type: 'chemical_plant',
    country: 'Mexico',
    region: 'Veracruz, Gulf of Mexico',
    latitude: 18.1256,
    longitude: -94.4014,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Vinyl Chloride Monomer (VCM)', 'Chlorine Gas', 'Ethylene Oxide'],
    fuelStorageCapacityTons: 390000,
    blastRadiusKm: 3.2,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: 'Proteccion Civil Veracruz & Pemex Brigada Contra Incendio',
      phone: '+52-921-555-0155',
      radioChannel: 'PC-VER-05',
      hazmatLevel: 'Level A Toxic Hazmat'
    },
    status: 'NORMAL'
  },

  // Europe
  {
    id: 'fac-eu-01',
    name: 'Port of Rotterdam Europort Petrochemical Hub',
    type: 'petrol_bunk_hub',
    country: 'Netherlands',
    region: 'South Holland, Maasvlakte',
    latitude: 51.9542,
    longitude: 4.1438,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Marine Gasoil', 'Heavy Fuel Oil', 'Bio-Ethanol', 'Methanol'],
    fuelStorageCapacityTons: 4200000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Gezamenlijke Brandweer Rotterdam Port Fire Brigade',
      phone: '+31-10-555-0182',
      radioChannel: 'PORT-FIRE-NL',
      hazmatLevel: 'Type 1 Industrial Maritime'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-eu-02',
    name: 'BASF Ludwigshafen Verbund Chemical Site',
    type: 'chemical_plant',
    country: 'Germany',
    region: 'Rhineland-Palatinate, Rhine River',
    latitude: 49.4972,
    longitude: 8.4312,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Ammonia (Anhydrous)', 'Formaldehyde', 'Phosgene precursor', 'Acetylene'],
    fuelStorageCapacityTons: 310000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 7.5,
    emergencyContact: {
      responderUnit: 'Werkfeuerwehr BASF Werkfeuerwehr Station 1',
      phone: '+49-621-555-0112',
      radioChannel: 'BASF-TAC-112',
      hazmatLevel: 'Level A European Standard'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-eu-03',
    name: 'Antwerp Port Chemical & Fuel Cluster',
    type: 'oil_refinery',
    country: 'Belgium',
    region: 'Antwerp Province, Scheldt Basin',
    latitude: 51.2829,
    longitude: 4.3168,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Gasoline', 'Kerosene', 'Polyethylene', 'Benzene'],
    fuelStorageCapacityTons: 2100000,
    blastRadiusKm: 3.4,
    toxicPlumeRadiusKm: 6.8,
    emergencyContact: {
      responderUnit: 'Brandweer Zone Antwerpen Havenbrigade',
      phone: '+32-3-555-0199',
      radioChannel: 'BE-HAVEN-FIRE',
      hazmatLevel: 'Type 1 Seveso III'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-eu-04',
    name: 'Fawley Refinery & Chemical Terminal',
    type: 'oil_refinery',
    country: 'United Kingdom',
    region: 'Hampshire, Southampton Water',
    latitude: 50.8415,
    longitude: -1.3392,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Aviation Fuel', 'Motor Spirits', 'Synthetic Rubber Polymers'],
    fuelStorageCapacityTons: 710000,
    blastRadiusKm: 2.7,
    toxicPlumeRadiusKm: 6.2,
    emergencyContact: {
      responderUnit: 'Hampshire & Isle of Wight Fire Industrial Station',
      phone: '+44-238-555-0144',
      radioChannel: 'UK-HANTS-FIRE',
      hazmatLevel: 'COMAH Top Tier'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-eu-05',
    name: 'Tarragona Petrochemical Complex',
    type: 'chemical_plant',
    country: 'Spain',
    region: 'Catalonia, Mediterranean Coast',
    latitude: 41.1189,
    longitude: 1.2056,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Ethylene Oxide', 'Propylene Glycol', 'Polystyrene'],
    fuelStorageCapacityTons: 480000,
    blastRadiusKm: 2.6,
    toxicPlumeRadiusKm: 5.8,
    emergencyContact: {
      responderUnit: 'Bombers de la Generalitat - Parc Quimic Sud',
      phone: '+34-977-555-0130',
      radioChannel: 'CAT-PLASEQTA-01',
      hazmatLevel: 'Level A Plaseqta'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-eu-06',
    name: 'Zaporizhzhia Industrial & Heavy Energy Complex',
    type: 'power_plant',
    country: 'Ukraine',
    region: 'Zaporizhzhia Oblast, Dnieper',
    latitude: 47.5078,
    longitude: 34.5853,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['High-Voltage Coolants', 'Transformer Oils', 'Heavy Industrial Gases'],
    fuelStorageCapacityTons: 180000,
    blastRadiusKm: 6.0,
    toxicPlumeRadiusKm: 15.0,
    emergencyContact: {
      responderUnit: 'State Emergency Service of Ukraine (SESU) Special Unit',
      phone: '+380-61-555-0101',
      radioChannel: 'SESU-TACTICAL',
      hazmatLevel: 'Type 1 Strategic High-Risk'
    },
    status: 'NORMAL'
  },

  // Middle East
  {
    id: 'fac-me-01',
    name: 'Ras Tanura Refinery & Crude Mega-Terminal (Saudi Aramco)',
    type: 'oil_refinery',
    country: 'Saudi Arabia',
    region: 'Eastern Province, Arabian Gulf',
    latitude: 26.6433,
    longitude: 50.1583,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Arabian Heavy Crude', 'LPG', 'Refined Naphtha', 'Diesel'],
    fuelStorageCapacityTons: 4500000,
    blastRadiusKm: 5.0,
    toxicPlumeRadiusKm: 10.0,
    emergencyContact: {
      responderUnit: 'Saudi Aramco Industrial Security & Fire Protection Dept (FrPD)',
      phone: '+966-13-555-0191',
      radioChannel: 'ARAMCO-TAC-1',
      hazmatLevel: 'Level A / Type 1 Mega-Complex'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-me-02',
    name: 'Ras Laffan Industrial City LNG Liquefaction Hub',
    type: 'lng_terminal',
    country: 'Qatar',
    region: 'Al Shamal, Persian Gulf',
    latitude: 25.9231,
    longitude: 51.5312,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Liquefied Natural Gas (LNG)', 'Condensate', 'Helium Gas', 'Sulfur'],
    fuelStorageCapacityTons: 3200000,
    blastRadiusKm: 5.2,
    toxicPlumeRadiusKm: 9.0,
    emergencyContact: {
      responderUnit: 'Ras Laffan Emergency Management Station',
      phone: '+974-44-555-0177',
      radioChannel: 'RLIC-EMERG-TAC',
      hazmatLevel: 'Type 1 Cryogenic LNG Specialized'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-me-03',
    name: 'Fujairah Port Oil Storage & Bunkering Hub',
    type: 'petrol_bunk_hub',
    country: 'United Arab Emirates',
    region: 'Emirate of Fujairah, Gulf of Oman',
    latitude: 25.1764,
    longitude: 56.3578,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Bunker Fuel 380cSt', 'Marine Diesel', 'Crude Blend Stock'],
    fuelStorageCapacityTons: 2800000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 7.0,
    emergencyContact: {
      responderUnit: 'Fujairah Civil Defence Station Port Command',
      phone: '+971-9-555-0144',
      radioChannel: 'UAE-CD-PORT',
      hazmatLevel: 'Type 1 Maritime Bunkering'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-me-04',
    name: 'Jubail Industrial City Petrochemical Megaplex (SABIC)',
    type: 'chemical_plant',
    country: 'Saudi Arabia',
    region: 'Eastern Province, Jubail',
    latitude: 27.0112,
    longitude: 49.6231,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Methanol', 'Ethylene Glycol', 'MTBE', 'Polypropylene'],
    fuelStorageCapacityTons: 1900000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: 'Royal Commission Fire & Emergency Medical Services Jubail',
      phone: '+966-13-555-0122',
      radioChannel: 'RCJY-TAC-02',
      hazmatLevel: 'Level A Petrochemical'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-me-05',
    name: 'Ruwais Industrial Complex & Refinery (ADNOC)',
    type: 'oil_refinery',
    country: 'United Arab Emirates',
    region: 'Abu Dhabi, Al Dhafra',
    latitude: 24.1167,
    longitude: 52.7333,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Jet A-1', 'Gasoline', 'Propane', 'Butane', 'Base Oils'],
    fuelStorageCapacityTons: 1750000,
    blastRadiusKm: 3.6,
    toxicPlumeRadiusKm: 7.8,
    emergencyContact: {
      responderUnit: 'ADNOC Refining Fire & Rescue Directorate',
      phone: '+971-2-555-0189',
      radioChannel: 'ADNOC-RUWAIS-FIRE',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },

  // Asia-Pacific & South Asia
  {
    id: 'fac-ap-01',
    name: 'Jurong Island Petrochemical Cluster',
    type: 'chemical_plant',
    country: 'Singapore',
    region: 'Southwest Islands, Singapore Strait',
    latitude: 1.2721,
    longitude: 103.7011,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Naphtha', 'Aromatics', 'Acetone', 'Petroleum Solvents'],
    fuelStorageCapacityTons: 2900000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 7.0,
    emergencyContact: {
      responderUnit: 'Singapore Civil Defence Force (SCDF) Jurong Island Fire Station',
      phone: '+65-6555-0195',
      radioChannel: 'SCDF-JIFS-TAC1',
      hazmatLevel: 'SCDF Hazmat Specialist'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-02',
    name: 'Jamnagar Refinery & Petrochemical Complex (Reliance)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Gujarat, Gulf of Kutch',
    latitude: 22.3592,
    longitude: 69.8322,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Distillates', 'High-Octane Gasoline', 'Polymer Intermediates'],
    fuelStorageCapacityTons: 3500000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 9.0,
    emergencyContact: {
      responderUnit: 'Gujarat State Disaster Response Force (SDRF) Jamnagar Wing',
      phone: '+91-288-555-0111',
      radioChannel: 'SDRF-IND-GJ',
      hazmatLevel: 'Type 1 Industrial Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-03',
    name: 'Ulsan Industrial Petrochemical & Shipyard Complex (SK / Hyundai)',
    type: 'manufacturing_hub',
    country: 'South Korea',
    region: 'Yeongnam, Sea of Japan Shore',
    latitude: 35.5039,
    longitude: 129.3789,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Naphtha Crackers', 'LPG Storage', 'Industrial Solvents', 'Paints'],
    fuelStorageCapacityTons: 1600000,
    blastRadiusKm: 3.2,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Ulsan Nambu Fire Station Industrial Hazmat Unit',
      phone: '+82-52-555-0119',
      radioChannel: 'KR-ULSAN-FIRE',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-04',
    name: 'Tokyo Bay Chemical & LNG Ring (Yokohama / Kawasaki / Chiba)',
    type: 'lng_terminal',
    country: 'Japan',
    region: 'Kanto, Tokyo Bay',
    latitude: 35.5342,
    longitude: 139.7744,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['LNG', 'LPG', 'Refined Petroleum', 'Ethylene'],
    fuelStorageCapacityTons: 2200000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 7.2,
    emergencyContact: {
      responderUnit: 'Tokyo Fire Department Hyper Rescue 2nd Battalion',
      phone: '+81-3-5555-0119',
      radioChannel: 'TFD-HYPER-2',
      hazmatLevel: 'Type 1 Japanese Maritime/Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-05',
    name: 'Ningbo-Zhoushan Petrochemical & Crude Port Hub',
    type: 'petrol_bunk_hub',
    country: 'China',
    region: 'Zhejiang, East China Sea',
    latitude: 29.8911,
    longitude: 121.8492,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Oil', 'Chemical Feedstocks', 'Liquid Benzene'],
    fuelStorageCapacityTons: 4100000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Ningbo Fire and Rescue Brigade Industrial Hazmat Depot',
      phone: '+86-574-555-0119',
      radioChannel: 'CN-NB-FIRE-TAC',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-06',
    name: 'Dampier / Karratha Pluto & North West Shelf LNG Terminal',
    type: 'lng_terminal',
    country: 'Australia',
    region: 'Western Australia, Pilbara Coast',
    latitude: -20.6128,
    longitude: 116.7644,
    hazardLevel: 'HIGH',
    primaryChemicals: ['LNG (Cryogenic)', 'Condensate Fuel', 'Liquid Nitrogen'],
    fuelStorageCapacityTons: 950000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 6.0,
    emergencyContact: {
      responderUnit: 'DFES Karratha Fire & Rescue Service',
      phone: '+61-8-5555-0130',
      radioChannel: 'WA-DFES-PILBARA',
      hazmatLevel: 'Level A Bushfire & Industrial Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-07',
    name: 'Bina Refinery & Central India Fuel Hub (Bharat Petroleum)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Madhya Pradesh, Sagar District',
    latitude: 24.1822,
    longitude: 78.1833,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Motor Spirit', 'High-Speed Diesel', 'LPG Cylinders'],
    fuelStorageCapacityTons: 600000,
    blastRadiusKm: 2.8,
    toxicPlumeRadiusKm: 6.0,
    emergencyContact: {
      responderUnit: 'MP State Fire Brigade & BPCL On-Site Disaster Management',
      phone: '+91-7580-555-012',
      radioChannel: 'MP-DISASTER-04',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-08',
    name: 'Map Ta Phut Industrial Estate & Chemical Hub (PTT)',
    type: 'chemical_plant',
    country: 'Thailand',
    region: 'Rayong Province, Gulf of Thailand',
    latitude: 12.6953,
    longitude: 101.1444,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Polyvinyl Chloride (PVC)', 'Ethylene Dichloride', 'Benzene'],
    fuelStorageCapacityTons: 880000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 7.0,
    emergencyContact: {
      responderUnit: 'Map Ta Phut Emergency Response Team (MERT)',
      phone: '+66-38-555-0199',
      radioChannel: 'TH-MERT-TAC',
      hazmatLevel: 'Level A Toxic Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-ap-09',
    name: 'Tumut Strategic Timber Mill & Pine Pellet Complex',
    type: 'timber_mill',
    country: 'Australia',
    region: 'New South Wales, Snowy Valleys',
    latitude: -35.3047,
    longitude: 148.2236,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Combustible Sawdust Dust Cloud', 'Timber Resins', 'Industrial Lubricants'],
    fuelStorageCapacityTons: 150000,
    blastRadiusKm: 2.0,
    toxicPlumeRadiusKm: 4.5,
    emergencyContact: {
      responderUnit: 'NSW Rural Fire Service (RFS) Tumut Brigade',
      phone: '+61-2-5555-0177',
      radioChannel: 'NSW-RFS-TUMUT',
      hazmatLevel: 'Type 2 Bushfire/Combustible Dust'
    },
    status: 'NORMAL'
  },

  // South America & Africa
  {
    id: 'fac-sa-01',
    name: 'Santos Port Bulk Liquid Fuel & Chemical Terminal',
    type: 'petrol_bunk_hub',
    country: 'Brazil',
    region: 'Sao Paulo, Alemoa Port Zone',
    latitude: -23.9317,
    longitude: -46.3686,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Ethanol', 'Gasoline', 'Hydrocarbons', 'Caustic Soda'],
    fuelStorageCapacityTons: 1400000,
    blastRadiusKm: 3.2,
    toxicPlumeRadiusKm: 6.8,
    emergencyContact: {
      responderUnit: 'Corpo de Bombeiros de Sao Paulo - 6 Grupamento Santos',
      phone: '+55-13-5555-0193',
      radioChannel: 'BR-SP-BOMBEIROS-06',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-sa-02',
    name: 'Duque de Caxias Refinery - REDUC (Petrobras)',
    type: 'oil_refinery',
    country: 'Brazil',
    region: 'Rio de Janeiro, Guanabara Bay',
    latitude: -22.7214,
    longitude: -43.2689,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Liquefied Petroleum Gas', 'Aviation Fuel', 'Lubricating Bases'],
    fuelStorageCapacityTons: 950000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'CBMERJ 14 Grupamento de Bombeiro Militar (Duque de Caxias)',
      phone: '+55-21-5555-0193',
      radioChannel: 'CBMERJ-REDUC-TAC',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-af-01',
    name: 'Dangote Mega Petroleum Refinery & Petrochemical Complex',
    type: 'oil_refinery',
    country: 'Nigeria',
    region: 'Lagos State, Lekki Free Trade Zone',
    latitude: 6.4278,
    longitude: 4.1011,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Oil', 'Premium Motor Spirit (PMS)', 'Polypropylene', 'Aviation Fuel'],
    fuelStorageCapacityTons: 2400000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: 'Lagos State Fire and Rescue Service (LSFRS) Lekki Station',
      phone: '+234-1-555-0112',
      radioChannel: 'LSFRS-LEKKI-TAC',
      hazmatLevel: 'Level A / Type 1'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-af-02',
    name: 'Suez Oil Processing & Canal Bunkering Hub',
    type: 'petrol_bunk_hub',
    country: 'Egypt',
    region: 'Suez Governorate, Red Sea Entrance',
    latitude: 29.9668,
    longitude: 32.5498,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Heavy Marine Fuel', 'Diesel Oil', 'Asphalt Bases'],
    fuelStorageCapacityTons: 1100000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 6.0,
    emergencyContact: {
      responderUnit: 'Suez Civil Protection Authority Marine Fire Unit',
      phone: '+20-62-555-0180',
      radioChannel: 'EG-SUEZ-FIRE',
      hazmatLevel: 'Type 1 Marine Bunkering'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-af-03',
    name: 'Secunda Synfuels & Coal-to-Liquid Facility (Sasol)',
    type: 'chemical_plant',
    country: 'South Africa',
    region: 'Mpumalanga, Highveld',
    latitude: -26.5517,
    longitude: 29.1764,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Synthetic Gasoline', 'Phenols', 'Wax Emulsions', 'Hydrogen Gas'],
    fuelStorageCapacityTons: 1300000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Govan Mbeki Fire Services & Sasol Secunda Emergency Management',
      phone: '+27-17-555-0101',
      radioChannel: 'ZA-SASOL-EMERG',
      hazmatLevel: 'Level A Synfuels Hazmat'
    },
    status: 'NORMAL'
  },

  // ==========================================
  // INDIA STRATEGIC INDUSTRIAL INFRASTRUCTURE
  // Nuclear, Refineries, Petrol Bunks, Mines, Chemical & Strategic Defense
  // ==========================================

  // --- 1. Nuclear Power Plants (NPCIL / AERB) ---
  {
    id: 'fac-in-nuc-01',
    name: 'Kudankulam Nuclear Power Plant (KKNPP - NPCIL)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Tamil Nadu, Tirunelveli (Gulf of Mannar)',
    latitude: 8.1691,
    longitude: 77.7121,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Enriched Uranium (U-235/UO2)', 'Pressurized Heavy Water', 'Zirconium Alloy Cladding', 'Hydrogen Coolant'],
    fuelStorageCapacityTons: 2000000,
    blastRadiusKm: 5.0,
    toxicPlumeRadiusKm: 16.0,
    emergencyContact: {
      responderUnit: '4th Bn NDRF Arakkonam & CISF Fire Wing Kudankulam Command',
      phone: '+91-4637-255-000',
      radioChannel: 'AERB-KKNPP-TAC-01',
      hazmatLevel: 'Level A Nuclear & CBRN Specialist'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-02',
    name: 'Tarapur Atomic Power Station (TAPS & BARC - NPCIL)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Maharashtra, Palghar Coast',
    latitude: 19.8291,
    longitude: 72.6568,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Uranium Dioxide', 'Boiling Water Reactor Coolant', 'Spent Fuel Pool Storage'],
    fuelStorageCapacityTons: 1400000,
    blastRadiusKm: 4.8,
    toxicPlumeRadiusKm: 16.0,
    emergencyContact: {
      responderUnit: '5th Bn NDRF Pune & Maharashtra SDRF Coastal Battalion',
      phone: '+91-2525-282-100',
      radioChannel: 'TAPS-EMERG-CBRN',
      hazmatLevel: 'Level A Nuclear & Radiological'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-03',
    name: 'Kakrapar Atomic Power Station (KAPS - NPCIL)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Gujarat, Tapi / Surat District',
    latitude: 21.2384,
    longitude: 73.3496,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Heavy Water (D2O)', 'Natural Uranium Fuel Bundles', 'Boron Inhibitors'],
    fuelStorageCapacityTons: 1200000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 15.0,
    emergencyContact: {
      responderUnit: '6th Bn NDRF Vadodara & Gujarat Fire Command',
      phone: '+91-2626-234-244',
      radioChannel: 'KAPS-AERB-EMERG',
      hazmatLevel: 'Level A Nuclear Reactor Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-04',
    name: 'Madras Atomic Power Station & Fast Breeder (MAPS Kalpakkam)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Tamil Nadu, Chengalpattu Coast',
    latitude: 12.5574,
    longitude: 80.1772,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Liquid Sodium Coolant', 'Plutonium-Uranium Carbide', 'Heavy Water'],
    fuelStorageCapacityTons: 1100000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 16.0,
    emergencyContact: {
      responderUnit: '4th Bn NDRF Arakkonam & IGCAR Emergency Response Force',
      phone: '+91-44-2748-0200',
      radioChannel: 'IGCAR-MAPS-FIRE',
      hazmatLevel: 'Level A Liquid Sodium & CBRN'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-05',
    name: 'Rawatbhata Rajasthan Atomic Power Station (RAPS)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Rajasthan, Chittorgarh / Kota (Rana Pratap Sagar)',
    latitude: 24.8719,
    longitude: 75.5969,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Pressurized Heavy Water', 'Uranium Fuel Bundles', 'Nitrogen Blanket'],
    fuelStorageCapacityTons: 1180000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 15.0,
    emergencyContact: {
      responderUnit: 'Rajasthan SDRF Kota Battalion & CISF Fire Wing RAPS',
      phone: '+91-1475-233-211',
      radioChannel: 'RAPS-NPCIL-TAC',
      hazmatLevel: 'Level A Nuclear'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-06',
    name: 'Narora Atomic Power Station (NAPS - NPCIL)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Uttar Pradesh, Bulandshahr (Ganga River Basin)',
    latitude: 28.1561,
    longitude: 78.4069,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Heavy Water', 'Natural Uranium Bundles', 'Emergency Diesel Reservoirs'],
    fuelStorageCapacityTons: 850000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 14.0,
    emergencyContact: {
      responderUnit: '8th Bn NDRF Ghaziabad & UP Fire Services Bulandshahr',
      phone: '+91-5734-222-100',
      radioChannel: 'NAPS-AERB-TAC',
      hazmatLevel: 'Level A Nuclear & Riverine Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-nuc-07',
    name: 'Kaiga Nuclear Power Generating Station (NPCIL)',
    type: 'nuclear_plant',
    country: 'India',
    region: 'Karnataka, Uttara Kannada (Kali River Forest)',
    latitude: 14.8647,
    longitude: 74.4379,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Heavy Water', 'Uranium Core', 'Forest Fire Barrier Coolant Tanks'],
    fuelStorageCapacityTons: 920000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 15.0,
    emergencyContact: {
      responderUnit: 'Karnataka State Fire and Emergency Services & CISF Kaiga',
      phone: '+91-8382-264-001',
      radioChannel: 'KAIGA-FOREST-TAC',
      hazmatLevel: 'Level A Wildfire/Nuclear Defense'
    },
    status: 'NORMAL'
  },

  // --- 2. Mega Oil Refineries & Petrochemical Hubs ---
  {
    id: 'fac-in-ref-02',
    name: 'IOCL Paradip Mega Refinery & Petrochemicals',
    type: 'oil_refinery',
    country: 'India',
    region: 'Odisha, Jagatsinghpur (Bay of Bengal)',
    latitude: 20.2792,
    longitude: 86.6433,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Distillates', 'High-Speed Diesel', 'Polypropylene', 'Sulfur Slurry'],
    fuelStorageCapacityTons: 3200000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: '3rd Bn NDRF Mundali & Odisha Fire Disaster Response',
      phone: '+91-6722-229-100',
      radioChannel: 'IOCL-PR-FIRE-TAC',
      hazmatLevel: 'Level A Coastal Refinery Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-03',
    name: 'BPCL Kochi Mega Refinery & Petrochem (Ambalamugal)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Kerala, Ernakulam District',
    latitude: 9.9881,
    longitude: 76.3621,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['LPG Bulk Storage', 'Aviation Turbine Fuel', 'Propylene Oxide', 'Benzene'],
    fuelStorageCapacityTons: 2800000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Kerala Fire and Rescue Services & BPCL Mutual Aid Response Group',
      phone: '+91-484-282-1000',
      radioChannel: 'BPCL-KOCHI-TAC',
      hazmatLevel: 'Level A Petrochem Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-04',
    name: 'IOCL Panipat Mega Refinery & Naphtha Cracker',
    type: 'oil_refinery',
    country: 'India',
    region: 'Haryana, Panipat (Grand Trunk Road Corridor)',
    latitude: 29.4182,
    longitude: 76.8821,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Naphtha', 'Ethylene', 'Polyethylene', 'Motor Spirit (Gasoline)'],
    fuelStorageCapacityTons: 3100000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: '7th Bn NDRF Bathinda / 8th Bn NDRF & Haryana Fire Service',
      phone: '+91-180-257-2000',
      radioChannel: 'IOCL-PANIPAT-FIRE',
      hazmatLevel: 'Level A Major Petrochemical'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-05',
    name: 'HPCL Visakhapatnam Coastal Refinery & POL Hub',
    type: 'oil_refinery',
    country: 'India',
    region: 'Andhra Pradesh, Visakhapatnam Port',
    latitude: 17.6975,
    longitude: 83.2558,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['LPG Horton Spheres', 'Hexane', 'Bitumen', 'Ultra-Low Sulfur Diesel'],
    fuelStorageCapacityTons: 2100000,
    blastRadiusKm: 3.6,
    toxicPlumeRadiusKm: 7.8,
    emergencyContact: {
      responderUnit: '10th Bn NDRF Vijayawada & Eastern Naval Command Fire Brigade',
      phone: '+91-891-289-4000',
      radioChannel: 'HPCL-VIZAG-FIRE',
      hazmatLevel: 'Level A Maritime/Refinery'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-06',
    name: 'Numaligarh Strategic Refinery (NRL - Northeast)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Assam, Golaghat (Kaziranga Buffer)',
    latitude: 26.5925,
    longitude: 93.7661,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Assam High-Wax Crude', 'Motor Gasoline', 'Aviation Kerosene', 'Paraffin Wax'],
    fuelStorageCapacityTons: 950000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: '1st Bn NDRF Guwahati & Assam Fire and Emergency Service',
      phone: '+91-3776-265-493',
      radioChannel: 'NRL-ASSAM-DISASTER',
      hazmatLevel: 'Type 1 Industrial Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-07',
    name: 'Mangalore Refinery & Petrochemicals (MRPL)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Karnataka, Mangalore Port Coastal Belt',
    latitude: 12.9897,
    longitude: 74.8329,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Polypropylene', 'Furnace Oil', 'Aromatics', 'Diesel Fuel'],
    fuelStorageCapacityTons: 2500000,
    blastRadiusKm: 3.6,
    toxicPlumeRadiusKm: 7.5,
    emergencyContact: {
      responderUnit: 'Karnataka SDRF Mangalore & New Mangalore Port Fire Squad',
      phone: '+91-824-227-0400',
      radioChannel: 'MRPL-MNG-EMERG',
      hazmatLevel: 'Level A Petrochem'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-08',
    name: 'HPCL-Mittal Mega Energy Complex (GGSR Bathinda)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Punjab, Bathinda District',
    latitude: 30.0821,
    longitude: 74.9211,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['High-Octane MS', 'Petroleum Coke', 'Polypropylene', 'Hydrogen Sulfide'],
    fuelStorageCapacityTons: 2300000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: '7th Bn NDRF Bathinda & Punjab Fire Services',
      phone: '+91-164-288-1000',
      radioChannel: 'HMEL-GGSR-TAC',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-ref-09',
    name: 'IOCL Gujarat Mega Refinery (Koyali / Vadodara)',
    type: 'oil_refinery',
    country: 'India',
    region: 'Gujarat, Vadodara Petrochemical Hub',
    latitude: 22.3789,
    longitude: 73.1256,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Petroleum Solvents', 'Linear Alkyl Benzene', 'Naphtha', 'LPG'],
    fuelStorageCapacityTons: 2700000,
    blastRadiusKm: 3.9,
    toxicPlumeRadiusKm: 8.2,
    emergencyContact: {
      responderUnit: '6th Bn NDRF Vadodara & Gujarat SDRF Command',
      phone: '+91-265-223-8000',
      radioChannel: 'IOCL-KOYALI-FIRE',
      hazmatLevel: 'Level A'
    },
    status: 'NORMAL'
  },

  // --- 3. Petrol Bunk Hubs, POL Fuel Depots & Strategic Petroleum Reserves (OISD / ISPRL) ---
  {
    id: 'fac-in-pol-01',
    name: 'IOCL Bijwasan Strategic POL Terminal & Aviation Depot',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Delhi NCR, Bijwasan / IGI Airport Buffer',
    latitude: 28.5322,
    longitude: 77.0544,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Aviation Turbine Fuel (Jet A-1)', 'High-Speed Diesel', 'Motor Spirit (Petrol)', 'Bio-Ethanol Blends'],
    fuelStorageCapacityTons: 1800000,
    blastRadiusKm: 3.2,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: '8th Bn NDRF Ghaziabad & Delhi Fire Service (DFS) Airport Div',
      phone: '+91-11-2565-3000',
      radioChannel: 'DFS-NCR-POL-TAC',
      hazmatLevel: 'OISD-117 Major Aviation Fuel Depot'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-02',
    name: 'BPCL Sewree Marine POL Terminal & Tank Farm',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Maharashtra, Mumbai Harbour / Sewree',
    latitude: 18.9950,
    longitude: 72.8590,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Bulk Gasoline Tanks', 'High-Speed Diesel', 'Industrial Lubricants', 'Bunker C Fuel'],
    fuelStorageCapacityTons: 1950000,
    blastRadiusKm: 3.4,
    toxicPlumeRadiusKm: 6.8,
    emergencyContact: {
      responderUnit: 'Mumbai Fire Brigade Industrial Division & Mumbai Port Trust Fire Service',
      phone: '+91-22-2418-4000',
      radioChannel: 'MFB-SEWREE-POL',
      hazmatLevel: 'OISD-116 High-Density Urban Tank Farm'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-03',
    name: 'HPCL Loni Strategic POL Terminal & Mega LPG Bottling Plant',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Maharashtra, Pune District (Loni Kalbhor)',
    latitude: 18.4900,
    longitude: 74.0200,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['LPG Pressurized Spheres', 'Petrol (MS)', 'Diesel (HSD)', 'Kerosene (SKO)'],
    fuelStorageCapacityTons: 1400000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 7.0,
    emergencyContact: {
      responderUnit: '5th Bn NDRF Pune & Pune Fire Brigade Hazmat Team',
      phone: '+91-20-2691-3000',
      radioChannel: 'HPCL-LONI-LPG-TAC',
      hazmatLevel: 'Type 1 Pressurized LPG & POL Hazmat'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-04',
    name: 'IOCL Manali POL Terminal & Bunkering Station',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Tamil Nadu, North Chennai Industrial Belt',
    latitude: 13.1672,
    longitude: 80.2644,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Motor Spirit', 'High Speed Diesel', 'Furnace Oil', 'Low Sulfur Fuel Oil'],
    fuelStorageCapacityTons: 1250000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 6.2,
    emergencyContact: {
      responderUnit: 'Tamil Nadu Fire & Rescue Services (TNFRS) Manali Station',
      phone: '+91-44-2594-1100',
      radioChannel: 'TNFRS-MANALI-TAC',
      hazmatLevel: 'OISD-STD-117 Coastal Depot'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-05',
    name: 'IOCL Sitapura / Jaipur Strategic POL Terminal & Pipeline Junction',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Rajasthan, Jaipur Industrial Area',
    latitude: 26.7900,
    longitude: 75.8300,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Motor Spirit', 'Diesel', 'Kerosene', 'Automotive Lubricants'],
    fuelStorageCapacityTons: 1100000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Rajasthan SDRF Jaipur & Sitapura Industrial Fire Station',
      phone: '+91-141-277-0100',
      radioChannel: 'RAJ-SDRF-POL-01',
      hazmatLevel: 'OISD High-Safety Overfill Prevention'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-06',
    name: 'ISPRL Visakhapatnam Underground Strategic Crude Oil Storage',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Andhra Pradesh, Visakhapatnam (Unlined Rock Caverns)',
    latitude: 17.6780,
    longitude: 83.2450,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Strategic Petroleum Reserve Crude', 'Hydrocarbon Vapor Infiltration'],
    fuelStorageCapacityTons: 1330000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 7.2,
    emergencyContact: {
      responderUnit: '10th Bn NDRF & ISPRL Specialized Cavern Safety Command',
      phone: '+91-891-275-8000',
      radioChannel: 'ISPRL-SPR-EMERG',
      hazmatLevel: 'Type 1 Underground SPR'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-07',
    name: 'ISPRL Padur / Mangalore Strategic Crude Oil Reserve',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'Karnataka, Udupi / Padur',
    latitude: 13.2045,
    longitude: 74.7920,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Crude Petroleum (Murban/Oman Blend)', 'Cavern Gas Systems'],
    fuelStorageCapacityTons: 2500000,
    blastRadiusKm: 3.8,
    toxicPlumeRadiusKm: 7.5,
    emergencyContact: {
      responderUnit: 'Karnataka Fire and Emergency Services Udupi Wing & CISF ISPRL',
      phone: '+91-820-258-0000',
      radioChannel: 'ISPRL-PADUR-TAC',
      hazmatLevel: 'Type 1 Underground SPR'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-pol-08',
    name: 'IOCL Mourigram POL Terminal & Pipeline Hub',
    type: 'petrol_bunk_hub',
    country: 'India',
    region: 'West Bengal, Howrah / Kolkata Western Suburbs',
    latitude: 22.5800,
    longitude: 88.2600,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Gasoline / MS', 'High-Speed Diesel', 'Kerosene'],
    fuelStorageCapacityTons: 980000,
    blastRadiusKm: 2.8,
    toxicPlumeRadiusKm: 6.0,
    emergencyContact: {
      responderUnit: '2nd Bn NDRF Kolkata & West Bengal Fire and Emergency Services',
      phone: '+91-33-2675-0100',
      radioChannel: 'WB-FIRE-MOURIGRAM',
      hazmatLevel: 'OISD-117 Fuel Hub'
    },
    status: 'NORMAL'
  },

  // --- 4. Major Coal Mines, Mineral Basins & Open-Cast Complexes (CIL / DGMS) ---
  {
    id: 'fac-in-min-01',
    name: 'Jharia Coalfield Seam & Underground Fire Zone (BCCL / CIL)',
    type: 'mining_complex',
    country: 'India',
    region: 'Jharkhand, Dhanbad Coal Basin',
    latitude: 23.7500,
    longitude: 86.4167,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Bituminous Coal Seam Fires', 'Methane Gas (CH4)', 'Carbon Monoxide (CO)', 'Sulfur Dioxide (SO2)'],
    fuelStorageCapacityTons: 8500000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 10.0,
    emergencyContact: {
      responderUnit: '9th Bn NDRF Patna & DGMS Mine Rescue Station Dhanbad',
      phone: '+91-326-220-3000',
      radioChannel: 'DGMS-JHARIA-RESCUE',
      hazmatLevel: 'DGMS Type 1 Mine Fire & Subsurface Gas Hazard'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-02',
    name: 'Korba Mega Open-Cast Coal Complex (SECL / CIL)',
    type: 'mining_complex',
    country: 'India',
    region: 'Chhattisgarh, Korba Industrial Belt (Hasdeo River)',
    latitude: 22.3595,
    longitude: 82.6840,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Combustible Coal Dust Cloud', 'Heavy Explosives (ANFO)', 'Diesel Fuel Depots for Heavy Earth Movers'],
    fuelStorageCapacityTons: 6200000,
    blastRadiusKm: 4.0,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'Chhattisgarh SDRF Korba & SECL Mine Safety & Fire Directorate',
      phone: '+91-7759-245-000',
      radioChannel: 'SECL-KORBA-FIRE',
      hazmatLevel: 'DGMS Open-Cast Mining & ANFO Explosives Safety'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-03',
    name: 'Singrauli Open-Cast Coal Basin (NCL - Jayant / Dudhichua)',
    type: 'mining_complex',
    country: 'India',
    region: 'Madhya Pradesh & UP Border, Singrauli Energy Capital',
    latitude: 24.1989,
    longitude: 82.6739,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Coal Seams', 'ANFO Mining Explosives', 'Lignite Coal Stockpiles'],
    fuelStorageCapacityTons: 7100000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: '11th Bn NDRF Varanasi & NCL Central Rescue Station',
      phone: '+91-7805-266-000',
      radioChannel: 'NCL-SINGRAULI-RESCUE',
      hazmatLevel: 'DGMS Heavy Mining & Dust Hazard'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-04',
    name: 'Bailadila Iron Ore Megamine Complex (NMDC Deposit-14 & 5)',
    type: 'mining_complex',
    country: 'India',
    region: 'Chhattisgarh, Dantewada (Bailadila Hills)',
    latitude: 18.7300,
    longitude: 81.2500,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Slurry Pipeline Pumping Stocks', 'Bulk Emulsion Mining Explosives', 'Heavy Vehicle Fuel Storage'],
    fuelStorageCapacityTons: 1800000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Chhattisgarh SDRF Bastar Division & CISF NMDC Kirandul Unit',
      phone: '+91-7857-255-000',
      radioChannel: 'NMDC-BAILADILA-TAC',
      hazmatLevel: 'Level A Forest & Mining Safety'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-05',
    name: 'Sukinda Chromite Valley Mining Complex (Tata Steel & OMC)',
    type: 'mining_complex',
    country: 'India',
    region: 'Odisha, Jajpur District',
    latitude: 20.9700,
    longitude: 85.8300,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Hexavalent Chromium Particulates', 'Bulk Emulsion Explosives', 'Industrial Reagents'],
    fuelStorageCapacityTons: 1200000,
    blastRadiusKm: 3.2,
    toxicPlumeRadiusKm: 7.0,
    emergencyContact: {
      responderUnit: '3rd Bn NDRF Mundali & Odisha Fire Service Jajpur',
      phone: '+91-6726-268-000',
      radioChannel: 'ODISHA-SUKINDA-FIRE',
      hazmatLevel: 'Heavy Metals & Hazardous Mining Minerals'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-06',
    name: 'Hutti Gold Mines Complex (HGML - Deep Underground Shafts)',
    type: 'mining_complex',
    country: 'India',
    region: 'Karnataka, Raichur District',
    latitude: 16.2000,
    longitude: 76.6500,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Sodium Cyanide Leaching Stocks', 'Hydrochloric Acid', 'Mine Blast Gelatins'],
    fuelStorageCapacityTons: 650000,
    blastRadiusKm: 3.0,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Karnataka State Fire Services Raichur & HGML Deep Mine Rescue Team',
      phone: '+91-8537-275-000',
      radioChannel: 'HGML-GOLD-RESCUE',
      hazmatLevel: 'Toxic Cyanide & Deep Underground Mine Rescue'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-min-07',
    name: 'Neyveli Lignite Open-Cast Mine & Thermal Megaplex (NLC India)',
    type: 'mining_complex',
    country: 'India',
    region: 'Tamil Nadu, Cuddalore District',
    latitude: 11.5950,
    longitude: 79.4860,
    hazardLevel: 'HIGH',
    primaryChemicals: ['Combustible Lignite Brown Coal', 'Fly Ash Dust Cloud', 'Heavy Lubricants'],
    fuelStorageCapacityTons: 3800000,
    blastRadiusKm: 3.6,
    toxicPlumeRadiusKm: 7.2,
    emergencyContact: {
      responderUnit: '4th Bn NDRF Arakkonam & CISF Fire Wing NLC Neyveli',
      phone: '+91-4142-252-000',
      radioChannel: 'NLC-NEYVELI-FIRE',
      hazmatLevel: 'Type 1 Lignite Mine Safety'
    },
    status: 'NORMAL'
  },

  // --- 5. Chemical PCPIR Zones, Mega Fertilizers & Strategic Space/Defense Assets ---
  {
    id: 'fac-in-chm-01',
    name: 'Dahej PCPIR Mega Petrochemical Zone (OPaL / ONGC / Petronet LNG)',
    type: 'chemical_plant',
    country: 'India',
    region: 'Gujarat, Bharuch (Gulf of Khambhat PCPIR)',
    latitude: 21.7050,
    longitude: 72.5850,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Ethylene', 'Propylene', 'Cryogenic LNG', 'Butadiene', 'Vinyl Chloride Monomer'],
    fuelStorageCapacityTons: 3900000,
    blastRadiusKm: 4.6,
    toxicPlumeRadiusKm: 9.5,
    emergencyContact: {
      responderUnit: '6th Bn NDRF Vadodara & Dahej Disaster Management Association (DDMA)',
      phone: '+91-2641-256-000',
      radioChannel: 'DDMA-DAHEJ-PCPIR-TAC',
      hazmatLevel: 'Level A / Type 1 Mega Petrochemical PCPIR'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-chm-02',
    name: 'Ankleshwar Chemical & Industrial Estate (GIDC Special Zone)',
    type: 'chemical_plant',
    country: 'India',
    region: 'Gujarat, Bharuch District (Golden Corridor)',
    latitude: 21.6280,
    longitude: 73.0100,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Phosgene Gas Intermediates', 'Sulfuric Acid', 'Pesticide Active Ingredients', 'Toluene'],
    fuelStorageCapacityTons: 1600000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: 'DPMC Notified Area Fire Station & Gujarat Pollution Control Hazmat Force',
      phone: '+91-2646-221-000',
      radioChannel: 'GIDC-ANKLESHWAR-TAC',
      hazmatLevel: 'Level A Toxic Gas & Synthetic Chemical'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-chm-03',
    name: 'Rashtriya Chemicals and Fertilizers (RCF Trombay / Thal Megaplex)',
    type: 'fertilizer_plant',
    country: 'India',
    region: 'Maharashtra, Mumbai / Raigad Coastal Belt',
    latitude: 18.7300,
    longitude: 72.8800,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Anhydrous Ammonia (NH3)', 'Ammonium Nitrate (Bulk)', 'Nitric Acid', 'Urea'],
    fuelStorageCapacityTons: 1750000,
    blastRadiusKm: 4.2,
    toxicPlumeRadiusKm: 9.0,
    emergencyContact: {
      responderUnit: 'Mumbai Fire Brigade & RCF Industrial Safety and Fire Directorate',
      phone: '+91-22-2552-2000',
      radioChannel: 'RCF-THAL-AMMONIA-TAC',
      hazmatLevel: 'Level A Toxic Anhydrous Ammonia & Explosive Nitrate'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-chm-04',
    name: 'Gujarat Narmada Valley Fertilizers & Chemicals (GNFC Bharuch)',
    type: 'fertilizer_plant',
    country: 'India',
    region: 'Gujarat, Narmadanagar / Bharuch',
    latitude: 21.7200,
    longitude: 73.0300,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Methanol', 'Toluene Di-Isocyanate (TDI)', 'Liquid Ammonia', 'Formic Acid'],
    fuelStorageCapacityTons: 1350000,
    blastRadiusKm: 3.6,
    toxicPlumeRadiusKm: 8.0,
    emergencyContact: {
      responderUnit: '6th Bn NDRF Vadodara & Bharuch District Emergency Management',
      phone: '+91-2642-247-000',
      radioChannel: 'GNFC-HAZMAT-FIRE',
      hazmatLevel: 'Level A Toxic Isocyanate & Ammonia'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-str-01',
    name: 'ISRO Satish Dhawan Space Centre (SDSC SHAR Sriharikota)',
    type: 'strategic_defense',
    country: 'India',
    region: 'Andhra Pradesh, Sriharikota Island (Pulicat Lagoon)',
    latitude: 13.7200,
    longitude: 80.2300,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Solid Rocket Propellant (HTPB/AP)', 'Unsymmetrical Dimethylhydrazine (UDMH)', 'Nitrogen Tetroxide (N2O4)', 'Cryogenic Liquid Hydrogen (LH2) & Liquid Oxygen (LOX)'],
    fuelStorageCapacityTons: 2200000,
    blastRadiusKm: 5.0,
    toxicPlumeRadiusKm: 10.0,
    emergencyContact: {
      responderUnit: '10th Bn NDRF Vijayawada & CISF Space Fire Wing SDSC SHAR',
      phone: '+91-8623-225-000',
      radioChannel: 'ISRO-SHAR-SAFETY-01',
      hazmatLevel: 'Level A Hypergolic & Cryogenic Rocket Propellant'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-str-02',
    name: 'DRDO Integrated Test Range (ITR Chandipur / APJ Abdul Kalam Island)',
    type: 'strategic_defense',
    country: 'India',
    region: 'Odisha, Balasore Coastal Defense Zone',
    latitude: 21.4350,
    longitude: 87.0150,
    hazardLevel: 'EXTREME',
    primaryChemicals: ['Strategic Missile Solid Propellants', 'Liquid Fuel Boosters', 'Ordnance Pyrotechnics'],
    fuelStorageCapacityTons: 1100000,
    blastRadiusKm: 4.5,
    toxicPlumeRadiusKm: 8.5,
    emergencyContact: {
      responderUnit: '3rd Bn NDRF Mundali & Defense Fire and Security Directorate ITR',
      phone: '+91-6782-272-000',
      radioChannel: 'DRDO-ITR-EMERG-TAC',
      hazmatLevel: 'Level A Defense Propellant & Pyrotechnics'
    },
    status: 'NORMAL'
  },
  {
    id: 'fac-in-str-03',
    name: 'Ordnance Factory Medak (Armoured Vehicles Nigam Limited)',
    type: 'strategic_defense',
    country: 'India',
    region: 'Telangana, Yeddumailaram / Sangareddy',
    latitude: 17.5500,
    longitude: 78.1300,
    hazardLevel: 'HIGH',
    primaryChemicals: ['High Explosives Formulation', 'Armor Polymer Composites', 'Fuel Bladders'],
    fuelStorageCapacityTons: 850000,
    blastRadiusKm: 3.5,
    toxicPlumeRadiusKm: 6.5,
    emergencyContact: {
      responderUnit: 'Telangana State Disaster Response and Fire Services & CISF OFMK',
      phone: '+91-8455-238-000',
      radioChannel: 'AVNL-OFMK-FIRE-TAC',
      hazmatLevel: 'Type 1 Defense Ordnance & Explosives'
    },
    status: 'NORMAL'
  }
];

export const INDIAN_INDUSTRIAL_FACILITIES: IndustrialFacility[] = GLOBAL_INDUSTRIAL_FACILITIES.filter(
  (f) => f.country === 'India'
);
