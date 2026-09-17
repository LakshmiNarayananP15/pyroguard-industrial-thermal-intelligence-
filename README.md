# 🔥 PyroGuard Industrial Thermal & Fire Intelligence

[![React](https://img.shields.io/badge/React-19.0.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5%20%2F%203.8%20Flash-orange.svg)](https://ai.google.dev/)
[![NASA FIRMS](https://img.shields.io/badge/NASA-FIRMS_Satellite_Data-red.svg)](https://firms.modaps.eosdis.nasa.gov/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**PyroGuard** is an advanced, real-time industrial wildfire and thermal anomaly early-warning system. It correlates near-real-time satellite thermal detections from **NASA FIRMS** (VIIRS & MODIS) with high-hazard industrial infrastructure—such as oil refineries, LNG export terminals, chemical processing complexes, munitions depots, and nuclear power stations—to predict catastrophe risks, model explosive blast radii, project toxic downwind dispersion plumes, and provide tactical AI mitigation directives.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [AI Hazard & Incident Intelligence Co-Pilot](#-ai-hazard--incident-intelligence-co-pilot)
- [GIS & Thermal Modeling Engine](#-gis--thermal-modeling-engine)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Installation & Local Setup](#-installation--local-setup)
- [Available Scripts](#-available-scripts)
- [Operational User Guide](#-operational-user-guide)
- [Export Formats](#-export-formats)

---

## 🚀 Key Features

### 1. 🛰️ Live NASA FIRMS Satellite Ingestion
- Real-time polling of thermal hotspots via NASA's **VIIRS S-NPP (375m)**, **VIIRS NOAA-20 (375m)**, and **MODIS (1km)** satellite sensors.
- Real-time metrics: Fire Radiative Power (**FRP** in Megawatts), brightness temperature (Kelvin), scan/track geometry, and satellite acquisition timestamps.
- Global coverage with instant focus filters across major industrial hubs (US Gulf Coast, North Sea, Persian Gulf, East Asia, etc.).

### 2. 🏭 High-Risk Industrial Facility Threat Matrix
- Pre-loaded geospatial registry of mission-critical facilities categorized by hazard class (Refineries, Chemical Plants, LNG Terminals, Tank Farms, Munitions Storage, Nuclear Power Facilities).
- Automated calculation of TNT-equivalent blast radii, volatile hydrocarbon inventories, and safety evacuation perimeters.
- Real-time proximity calculation detecting when any active thermal anomaly infringes upon safety thresholds.

### 3. 💨 Dynamic Plume & Atmospheric Dispersion Modeling
- Mathematical wind vector simulation incorporating local wind speed (km/h) and wind direction (0–360°).
- Gaussian cone and downwind toxic dispersion projection overlaid directly onto tactical GIS map layers.
- Real-time calculation of downwind facility exposure risk and toxic vapor arrival estimates.

### 4. 🤖 Multi-Provider AI Incident Command Co-Pilot
- **Google Gemini API**: Server-side high-throughput reasoning with multi-model automatic failover (`gemini-2.5-flash`, `gemini-3.8-flash`, `gemini-3.1-flash-lite`).
- **OpenRouter Free Tier Integration**: Meta Llama 3.3 70B Instruct, DeepSeek R1, Mistral 7B, and Gemma 2.
- **Hugging Face Serverless Inference**: Qwen 2.5 72B Instruct, Llama 3.2, and Mistral models.
- **Deterministic DSS Engine**: Instant zero-latency safety fallback providing apparatus recommendations, NFPA foam calculations, and water deluge requirements offline.
- **Interactive Tactical AI Chat**: Ask context-aware questions during active incidents (e.g., *"What is the BLEVE timeline for Isobutane tank #4?"*, *"Draft emergency staff evacuation order"*).

### 5. 🗺️ Interactive Tactical GIS Map HUD
- High-performance Leaflet mapping engine featuring Dark Tactical, Satellite Imagery, and Topographic terrain layers.
- Dynamic visual overlays: Proximity alert circles, blast danger zones, toxic plume cones, distance measurement vectors, and satellite hotspot clusters.
- Sound siren synthesizer (Web Audio API) and browser push notifications for Tier-1 critical breaches.

### 6. 📊 Real-Time Telemetry & Analytics Dashboard
- Recharts-powered data visualizers:
  - **FRP vs Confidence Scatter Plot**: Cluster analysis of high-energy ignition sources.
  - **Thermal History Timeline**: Anomaly detection trends over time.
  - **Facility Proximity Risk Breakdown**: Instant breakdown of facilities within 5km, 10km, and 25km danger envelopes.
  - **Atmospheric Sensor Gauge**: Wind speed, barometric pressure, relative humidity, and ambient temperature telemetry.

### 7. 📤 Incident Export & Reporting Suite
- **GeoJSON**: Standard GIS vector format compatible with ArcGIS, QGIS, and Google Earth.
- **CSV / Excel**: Raw tabular incident logs with coordinates, FRP, facility names, and threat tiers.
- **KML**: 3D geospatial overlays for Google Earth Pro.
- **Executive PDF Dossier**: Multi-page tactical incident reports generated client-side via `jsPDF`, complete with incident summaries, apparatus checklists, blast radii, and command signatures.

### 8. 🐍 FastAPI Python Backend Bridge
- Embedded OpenAPI / FastAPI Python code generator allowing industrial engineers to export and run the PyroGuard intelligence pipeline in native Python / GDAL / GeoPandas workflows.

### 9. 🇮🇳 Dedicated India Industrial Safety & Disaster Management Hub (Bharat Hub)
- **Comprehensive Strategic Facility Registry**: Over 40 high-priority Indian industrial locations across 16 states:
  - **Nuclear Power Stations (NPCIL & AERB)**: Kudankulam, Tarapur, Kakrapar, Kalpakkam (MAPS), Rawatbhata (RAPS), Narora (NAPS), Kaiga.
  - **POL Fuel Depots & Strategic Petroleum Reserves (ISPRL / OISD)**: IOCL Bijwasan Aviation Depot, BPCL Sewree Marine POL Hub, HPCL Loni Terminal, Mourigram POL Depot, ISPRL Visakhapatnam & Padur Underground Caverns.
  - **Mega Mining Complexes & Coal Seams (CIL / DGMS)**: Jharia Coalfield (underground fire zones), Korba Mega Open Cast Mines, Singrauli Coal Basin, Bailadila Iron Ore, Sukinda Chromite Complex, Kolar Gold / Mineral Corridor.
  - **Mega Refineries & Petrochemical PCPIR Hubs**: Jamnagar RIL (world's largest refinery), Paradip Mega Refinery, IOCL Panipat, BPCL Kochi, Haldia, CPCL Manali, Numaligarh (NRL), Dahej PCPIR, Ankleshwar GIDC.
  - **ISRO Space & Defense Strategic Centers**: Satish Dhawan Space Centre (SDSC SHAR Sriharikota), DRDO Integrated Test Range (ITR Chandipur), Heavy Vehicles & Ordnance Factory (OFMK).
- **Statutory Regulatory Buffers**:
  - **AERB (Atomic Energy Regulatory Board)**: 1.6km Exclusion Zone (EZ), 5.0km Sterilized Zone (SZ), and 16.0km Emergency Planning Zone (EPZ).
  - **OISD-STD-117 & 116**: Petroleum depot & refinery 4-hour fire water reservoirs and rim seal foam deluge monitors.
  - **DGMS Circulars**: Spontaneous coal heating CO/CO2 ratio telemetry and blast evacuation cordons.
- **12 NDRF Battalions & SDRF Tactical Directory**: Real-time battalion contacts, callsigns, and coverage maps (Ghaziabad 8th Bn, Pune 5th Bn, Vadodara 6th Bn, Arakkonam 4th Bn, Vijayawada 10th Bn, Mundali 3rd Bn, Guwahati 1st Bn, etc.).
- **FSI & ISRO Bhuvan Seasonal Stubble Burning & Heatwave Risk Matrix**: Tracking North India post-harvest crop fires (Oct-Nov) and Central India coalfield heatwave regimes (March-June).
- **Bilingual Dual-Language Dispatch Engine (हिंदी Hindi & English)**: One-click generation of statutory Disaster Management Act 2005 evacuation and first-responder directives.

---

## 🏗️ System Architecture

```
                       ┌─────────────────────────────────────────┐
                       │        NASA FIRMS Satellite API         │
                       │   (VIIRS 375m / NOAA-20 / MODIS 1km)    │
                       └────────────────────┬────────────────────┘
                                            │ Real-time Hotspots
                                            ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                           PyroGuard Full-Stack Server                         │
│                                (Express.js / Node.js)                         │
│                                                                               │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌─────────────────┐  │
│  │   FIRMS Polling Proxy  │  │ GIS Vector Proximity   │  │ Industrial DB   │  │
│  │   & Caching Engine     │  │ & Blast Radius Calc    │  │ & Custom Assets │  │
│  └───────────┬────────────┘  └───────────┬────────────┘  └────────┬────────┘  │
│              │                           │                        │           │
│              └───────────────────────────┼────────────────────────┘           │
│                                          │ Context Synthesis                  │
│                                          ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                  Multi-Provider AI Intelligence Engine                  │  │
│  │  • Google Gemini API (2.5 Flash / 3.8 Flash) with Auto-Failover         │  │
│  │  • OpenRouter (Llama 3.3 70B, DeepSeek R1)                              │  │
│  │  • Hugging Face Serverless (Qwen 2.5 72B)                               │  │
│  │  • Deterministic Decision Support System (DSS Offline Engine)           │  │
│  └───────────────────────────────────────┬─────────────────────────────────┘  │
└──────────────────────────────────────────┼────────────────────────────────────┘
                                           │ JSON / SSE Streams
                                           ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                               React 19 Frontend                               │
│                                                                               │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌─────────────────┐  │
│  │ Interactive Leaflet    │  │ Threat Matrix HUD      │  │ AI Incident     │  │
│  │ Tactical Map HUD       │  │ & Incident Alert Feed  │  │ Co-Pilot Modal  │  │
│  └────────────────────────┘  └────────────────────────┘  └─────────────────┘  │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌─────────────────┐  │
│  │ Recharts Telemetry     │  │ Web Audio Siren        │  │ jsPDF Dossier   │  │
│  │ Analytics Grid         │  │ & Push Notifications   │  │ & GIS Exporter  │  │
│  └────────────────────────┘  └────────────────────────┘  └─────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | [React](https://react.dev/) | 19.0.1 | High-performance reactive UI framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.8.2 | Strict type safety and robust data contracts |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 4.1.14 | Modern utility-first responsive styling engine |
| **Mapping & GIS** | [Leaflet](https://leafletjs.com/) / `@types/leaflet` | 1.9.4 | Interactive tile layers, markers, polygons, and vector graphics |
| **Charts & Metrics**| [Recharts](https://recharts.org/) | 3.10.1 | Data visualization (Scatter, Line, Bar, Radar charts) |
| **Motion** | [Motion](https://motion.dev/) | 12.23.24 | Smooth UI transitions and entering animations |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.546.0 | Modern tactical icon set |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) | 4.2.1 | Client-side export of executive incident dossiers |
| **Celebrations** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | 1.9.4 | Visual feedback upon threat containment |
| **Server Backend** | [Express](https://expressjs.com/) | 4.21.2 | Proxy endpoints, calculations, and AI routing |
| **AI SDK** | [@google/genai](https://www.npmjs.com/package/@google/genai) | 2.4.0 | Official Google GenAI SDK for Gemini models |
| **Build & Dev** | [Vite](https://vitejs.dev/) + [esbuild](https://esbuild.github.io/) + [tsx](https://github.com/privatenumber/tsx) | 6.2.3 / 0.25 | Fast HMR dev server and single-file server bundling |

---

## 🧠 AI Hazard & Incident Intelligence Co-Pilot

PyroGuard features a state-of-the-art incident analysis co-pilot accessible by clicking **"AI Threat Intel"** or selecting any active threat in the incident feed:

```typescript
// Example Request Payload to /api/ai/threat-assessment
{
  "facilityName": "Baytown Olefins & Refining Complex",
  "facilityType": "Petrochemical Refinery",
  "chemicalList": "Ethylene, Propylene, Benzene, Liquefied Petroleum Gas",
  "distanceKm": 1.84,
  "frpMW": 142.5,
  "windSpeedKmh": 24,
  "windDirectionDeg": 180,
  "calculatedRadius": 4.2,
  "provider": "gemini",
  "model": "gemini-2.5-flash"
}
```

### Supported AI Providers & Models

1. **Google Gemini API** (Default & Recommended)
   - `gemini-2.5-flash`: Ultra-reliable, lightning-fast incident synthesis.
   - `gemini-3.8-flash`: High-throughput reasoning for multi-facility cascades.
   - `gemini-3.1-flash-lite`: Maximum throughput for low-latency command loops.
   - *Resilience*: Automatically falls back across models if high demand (503) occurs.

2. **OpenRouter Free Tier**
   - `meta-llama/llama-3.3-70b-instruct:free`
   - `deepseek/deepseek-r1:free`
   - `mistralai/mistral-7b-instruct:free`
   - `google/gemma-2-9b-it:free`

3. **Hugging Face Inference API**
   - `Qwen/Qwen2.5-72B-Instruct`
   - `meta-llama/Llama-3.2-3B-Instruct`
   - `mistralai/Mistral-7B-Instruct-v0.3`

4. **Deterministic Rule-Based DSS (Offline Mode)**
   - Automatically engaged when offline or without API keys.
   - Evaluates chemical hazard flashpoints, blast overpressures (NFPA 30 / OSHA 1910.119), and calculates foam monitor GPM requirements deterministically.

---

## 📐 GIS & Thermal Modeling Engine

### 1. Great-Circle Proximity Calculation (Haversine Formula)
$$\Delta\sigma = 2 \arcsin \left( \sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)} \right)$$
$$d = R \cdot \Delta\sigma$$
*Where $R = 6371\text{ km}$. The system computes exact geodesic distances between every satellite anomaly and every registered industrial asset in real-time.*

### 2. Blast Radius & Hazard Zone Estimation
$$R_{\text{blast}} = k \cdot \left( \frac{\text{Inventory}_{\text{vol}} \cdot \text{HazardFactor}}{1000} \right)^{\frac{1}{3}} + \left( \frac{\text{FRP}}{100} \cdot 0.8 \right)$$
*Calculates dynamic exclusion perimeters based on stored chemical energy, facility blast multipliers, and satellite Fire Radiative Power (MW).*

### 3. Downwind Toxic Plume Vectoring
- Constructs a downwind conical polygon offset by $\theta = \text{Wind Direction} \pm 22.5^\circ$.
- Extends the threat vector proportional to wind velocity ($L = d_{\text{base}} \cdot (1 + \frac{v_{\text{wind}}}{30})$).

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/firms/hotspots` | Returns active satellite hotspots (query params: `source`, `days`, `minFrp`) |
| `GET` | `/api/facilities` | Returns all registered industrial facilities and hazard metadata |
| `POST`| `/api/facilities/add` | Registers a new custom facility or storage tank into the runtime database |
| `POST`| `/api/ai/threat-assessment` | Generates full tactical mitigation dossier using the selected AI provider |
| `POST`| `/api/ai/chat` | Interactive incident command Q&A co-pilot for tactical decisions |
| `GET` | `/api/export/geojson` | Streams formatted GeoJSON of all active threats and facilities |
| `GET` | `/api/export/csv` | Streams tabular CSV data for incident logs and auditing |
| `GET` | `/api/fastapi-spec` | Returns ready-to-run Python FastAPI / GDAL source code |

---

## 🔐 Environment Variables

Create or update a `.env` file in the project root:

```env
# Google Gemini AI API Key (Injected automatically in Google AI Studio)
GEMINI_API_KEY="your_gemini_api_key_here"

# NASA FIRMS API MAP Key (Free from https://firms.modaps.eosdis.nasa.gov/api/map_key)
NASA_FIRMS_MAP_KEY="4ddefd0f9c4e2cf87148595c54a19642"

# Optional: OpenRouter API Key for free/open-source LLMs
OPENROUTER_API_KEY=""

# Optional: Hugging Face User Access Token for Serverless Inference
HF_TOKEN=""

# Platform hosting URL (Set automatically in production)
APP_URL="http://localhost:3000"
```

---

## 💻 Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Step 1: Clone or Open Project
```bash
cd /path/to/pyroguard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```
The application will launch and bind to `http://localhost:3000`.

### Step 4: Build for Production
```bash
npm run build
npm start
```

---

## 📜 Available Scripts

- `npm run dev`: Boots the development server with live TypeScript execution via `tsx server.ts`.
- `npm run build`: Compiles the Vite React client into `dist/` and bundles `server.ts` into `dist/server.cjs` via `esbuild`.
- `npm start`: Runs the compiled standalone production server (`node dist/server.cjs`).
- `npm run lint`: Performs type checking across the entire TypeScript codebase (`tsc --noEmit`).
- `npm run clean`: Cleans up previous build artifacts.

---

## 🧭 Operational User Guide

1. **Monitor Global Threat HUD**:
   - Inspect the top HUD for total active satellite hotspots, critical facility breaches within 5km, active sirens, and live atmospheric wind conditions.
2. **Filter & Query**:
   - Use the search bar to locate specific facilities (e.g., *"Baytown"*, *"Port Arthur"*, *"LNG"*).
   - Filter by hazard tier: **Critical (Tier 1 <5km)**, **High (Tier 2 <15km)**, or **Elevated (Tier 3 <30km)**.
3. **Inspect Threat on Map**:
   - Click any hotspot marker or facility card to pan and zoom the GIS map directly to the asset.
   - Click on the facility to view its blast radius boundary and downwind toxic dispersion plume.
4. **Trigger AI Incident Command**:
   - Click **"AI Threat Intel"** on any incident card to generate an immediate mitigation strategy.
   - Choose between **Google Gemini**, **OpenRouter**, **Hugging Face**, or the **Offline DSS Rule Engine**.
   - Use the interactive inquiry chips or input field to query the AI on foam flow rates, evacuation radius expansions, or hazardous material containment.
5. **Simulate Live Incidents**:
   - Click **"Simulate Ignition"** to place a high-energy test fire near an asset and observe the automated alarm triggering, audio siren, and push notification cascade.
6. **Export Dossier**:
   - Click **"Export Dossier"** to download an executive multi-page PDF report or export raw GIS layers (GeoJSON / CSV / KML).

---

## 📄 Export Formats

- **Tactical PDF Incident Report**: Includes incident header, executive threat summary, satellite hotspot parameters, chemical blast calculations, emergency responder apparatus sizing, and official sign-off blocks.
- **GeoJSON FeatureCollection**: Contains Point and Polygon features with rich properties (`frp`, `confidence`, `hazard_tier`, `blast_radius_km`, `chemicals`).
- **Standard CSV**: Comma-separated spreadsheet ready for ingestion into Microsoft Excel, Tableau, or PowerBI.
- **Python FastAPI Script**: Downloadable standalone script demonstrating how to integrate the PyroGuard intelligence pipeline with Python GIS stacks.

---

## 🛡️ License

This project is open-source under the [MIT License](LICENSE).
Built with passion for emergency responders, industrial safety engineers, and disaster mitigation teams worldwide.
#   P y r o g u a r d - i n t e l l i g e n c e - v 1  
 