import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Flame, 
  ShieldAlert, 
  Compass, 
  Wind, 
  Maximize2, 
  Eye, 
  Radio, 
  Zap, 
  Crosshair,
  Filter,
  MapPin,
  BrainCircuit,
  Copy,
  Check,
  X,
  Navigation,
  AlertTriangle,
  RotateCcw,
  Moon,
  Satellite
} from 'lucide-react';
import { ThermalAnomaly, IndustrialFacility, GISLayerConfig } from '../types';

interface InteractiveThermalMapProps {
  anomalies: ThermalAnomaly[];
  facilities: IndustrialFacility[];
  selectedAnomaly: ThermalAnomaly | null;
  selectedFacility: IndustrialFacility | null;
  onSelectAnomaly: (anomaly: ThermalAnomaly | null) => void;
  onSelectFacility: (facility: IndustrialFacility | null) => void;
  onOpenEvacAdvisor: (anomaly: ThermalAnomaly, facility: IndustrialFacility) => void;
  onTriggerDispatch: (anomaly: ThermalAnomaly, facility: IndustrialFacility) => void;
  gisConfig: GISLayerConfig;
  onUpdateGISConfig: (newConfig: Partial<GISLayerConfig>) => void;
  onOpenIndiaCommand?: () => void;
}

const CONTINENTS = [
  { name: 'Global', center: [20, 0] as [number, number], zoom: 2.5, isIndia: false },
  { name: 'India', center: [21.8, 78.9] as [number, number], zoom: 5.2, isIndia: true, flag: '🇮🇳' },
  { name: 'North America', center: [33, -96] as [number, number], zoom: 4.5, isIndia: false },
  { name: 'Europe', center: [48, 10] as [number, number], zoom: 4.5, isIndia: false },
  { name: 'Middle East', center: [25, 48] as [number, number], zoom: 5, isIndia: false },
  { name: 'Asia-Pacific', center: [18, 105] as [number, number], zoom: 4.5, isIndia: false },
  { name: 'Latin America', center: [-15, -60] as [number, number], zoom: 4, isIndia: false },
  { name: 'Africa', center: [5, 20] as [number, number], zoom: 4, isIndia: false },
];

export const InteractiveThermalMap: React.FC<InteractiveThermalMapProps> = ({
  anomalies,
  facilities,
  selectedAnomaly,
  selectedFacility,
  onSelectAnomaly,
  onSelectFacility,
  onOpenEvacAdvisor,
  onTriggerDispatch,
  gisConfig,
  onUpdateGISConfig,
  onOpenIndiaCommand,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const blastZonesLayerRef = useRef<L.LayerGroup | null>(null);
  const windVectorsLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeContinent, setActiveContinent] = useState('Global');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Initialize Map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25, 10],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    // Custom tactical zoom control on bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);
    blastZonesLayerRef.current = L.layerGroup().addTo(map);
    windVectorsLayerRef.current = L.layerGroup().addTo(map);

    // ResizeObserver to prevent map gray clipping
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer based on gisConfig.mapStyle
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = '';
    let maxZoom = 19;
    let maxNativeZoom = 19;
    let subdomains: string | string[] = 'abc';

    if (gisConfig.mapStyle === 'dark') {
      // ESRI Dark Gray Canvas (High reliability, dark tactical aesthetic, 100% free & keyless)
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      maxNativeZoom = 16;
      maxZoom = 19;
    } else if (gisConfig.mapStyle === 'satellite') {
      // ESRI World Imagery (High resolution satellite)
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxNativeZoom = 18;
      maxZoom = 19;
    } else if (gisConfig.mapStyle === 'terrain') {
      // ESRI World Topo Map
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      maxNativeZoom = 18;
      maxZoom = 19;
    } else {
      // Standard OpenStreetMap
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      maxZoom = 19;
      maxNativeZoom = 19;
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom,
      maxNativeZoom,
      subdomains,
    }).addTo(map);
  }, [gisConfig.mapStyle]);

  // Render Hotspots, Industrial Markers, Blast Buffers, and Wind Vectors
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !blastZonesLayerRef.current || !windVectorsLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    blastZonesLayerRef.current.clearLayers();
    windVectorsLayerRef.current.clearLayers();

    // 1. Render Industrial Facilities
    if (gisConfig.showFacilityMarkers) {
      facilities.forEach((fac) => {
        if (gisConfig.selectedFacilityType === 'INDIA') {
          if (fac.country !== 'India') return;
        } else if (gisConfig.selectedFacilityType !== 'ALL' && fac.type !== gisConfig.selectedFacilityType) {
          return;
        }

        // Sector Icon, Badge Color & Pulse Effect
        let iconSymbol = '🏭';
        let badgeColor = 'bg-cyan-500';
        let borderHighlight = '';
        if (fac.type === 'nuclear_plant') { 
          iconSymbol = '☢️'; 
          badgeColor = 'bg-amber-400'; 
          borderHighlight = 'ring-2 ring-amber-400 animate-pulse';
        } else if (fac.type === 'petrol_bunk_hub') { 
          iconSymbol = '⛽'; 
          badgeColor = 'bg-blue-500'; 
        } else if (fac.type === 'mining_complex') { 
          iconSymbol = '⛏️'; 
          badgeColor = 'bg-orange-600'; 
        } else if (fac.type === 'oil_refinery') { 
          iconSymbol = '🛢️'; 
          badgeColor = 'bg-amber-500'; 
        } else if (fac.type === 'chemical_plant') { 
          iconSymbol = '🧪'; 
          badgeColor = 'bg-purple-500'; 
        } else if (fac.type === 'lng_terminal') { 
          iconSymbol = '❄️'; 
          badgeColor = 'bg-teal-500'; 
        } else if (fac.type === 'power_plant') { 
          iconSymbol = '⚡'; 
          badgeColor = 'bg-yellow-500'; 
        } else if (fac.type === 'fertilizer_plant') { 
          iconSymbol = '🌱'; 
          badgeColor = 'bg-emerald-500'; 
        } else if (fac.type === 'strategic_defense') { 
          iconSymbol = '🚀'; 
          badgeColor = 'bg-rose-500'; 
        } else if (fac.type === 'timber_mill') { 
          iconSymbol = '🌲'; 
          badgeColor = 'bg-emerald-500'; 
        }

        const isSelected = selectedFacility?.id === fac.id;
        const isIndia = fac.country === 'India';

        const customIcon = L.divIcon({
          className: 'custom-facility-pin',
          html: `
            <div class="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125">
              <div class="w-8 h-8 rounded-lg bg-slate-900/90 border ${isSelected ? 'border-cyan-400 ring-2 ring-cyan-400' : borderHighlight ? 'border-amber-400 ' + borderHighlight : 'border-slate-700'} flex items-center justify-center shadow-lg text-sm">
                ${iconSymbol}
              </div>
              <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${badgeColor} border-2 border-slate-950 flex items-center justify-center">
                ${isIndia ? '<span class="text-[7px]">🇮🇳</span>' : ''}
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([fac.latitude, fac.longitude], { icon: customIcon });

        marker.on('click', () => {
          onSelectFacility(fac);
        });

        // Interactive Facility Tooltip
        marker.bindTooltip(
          `<div class="font-mono text-xs font-bold text-slate-100">${isIndia ? '🇮🇳 ' : ''}${fac.name}</div>
           <div class="text-[10px] text-slate-400">${fac.region}, ${fac.country} | Hazard: ${fac.hazardLevel} | Blast: ${fac.blastRadiusKm}km</div>`,
          { className: 'leaflet-dark-tooltip', direction: 'top', offset: [0, -18] }
        );

        markersLayerRef.current?.addLayer(marker);

        // Render Blast & Toxic Plume Buffers
        if (gisConfig.showBlastZones) {
          // Blast / Exclusion Perimeter
          const blastCircle = L.circle([fac.latitude, fac.longitude], {
            radius: fac.blastRadiusKm * 1000,
            color: fac.type === 'nuclear_plant' ? '#f59e0b' : '#ef4444',
            weight: 1.5,
            fillColor: fac.type === 'nuclear_plant' ? '#f59e0b' : '#ef4444',
            fillOpacity: fac.type === 'nuclear_plant' ? 0.18 : 0.12,
            dashArray: '4, 4',
          });
          blastZonesLayerRef.current?.addLayer(blastCircle);

          // Toxic Plume / AERB Emergency Planning Zone (EPZ) Perimeter
          const toxicCircle = L.circle([fac.latitude, fac.longitude], {
            radius: fac.toxicPlumeRadiusKm * 1000,
            color: fac.type === 'nuclear_plant' ? '#8b5cf6' : '#a855f7',
            weight: 1,
            fillColor: fac.type === 'nuclear_plant' ? '#8b5cf6' : '#a855f7',
            fillOpacity: 0.05,
          });
          blastZonesLayerRef.current?.addLayer(toxicCircle);
        }
      });
    }

    // 2. Render NASA FIRMS Thermal Anomalies
    if (gisConfig.showThermalOverlay) {
      anomalies.forEach((a) => {
        if (a.frp < gisConfig.minFRPFilter) return;
        if (gisConfig.selectedSeverity !== 'ALL' && a.nearestFacility?.threatLevel !== gisConfig.selectedSeverity) {
          return;
        }

        const threat = a.nearestFacility?.threatLevel || 'WATCH';
        const isSelected = selectedAnomaly?.id === a.id;

        // Visual radius & color based on Fire Radiative Power (MW) and threat
        let pulseColor = 'from-amber-500 to-orange-600';
        let glowBorder = 'border-amber-400';
        let ringAnim = 'animate-ping';

        if (threat === 'CRITICAL') {
          pulseColor = 'from-rose-600 to-red-700';
          glowBorder = 'border-rose-400';
        } else if (threat === 'HIGH') {
          pulseColor = 'from-orange-500 to-amber-600';
          glowBorder = 'border-orange-400';
        } else if (threat === 'ELEVATED') {
          pulseColor = 'from-amber-400 to-yellow-500';
          glowBorder = 'border-amber-300';
          ringAnim = '';
        }

        const markerSize = Math.max(24, Math.min(48, Math.round(20 + Math.sqrt(a.frp) * 2)));

        const customFireIcon = L.divIcon({
          className: 'custom-thermal-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-135" style="width: ${markerSize}px; height: ${markerSize}px;">
              ${threat === 'CRITICAL' ? `<span class="${ringAnim} absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>` : ''}
              <div class="relative w-full h-full rounded-full bg-gradient-to-br ${pulseColor} flex items-center justify-center border-2 ${glowBorder} shadow-lg shadow-orange-950/70 ${isSelected ? 'ring-4 ring-white' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-1.5 2.5-3 5-3 8 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3-1.5-5.5-3-8-1 2-2 3-3 3s-2-1-3-3z"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize / 2],
        });

        const fireMarker = L.marker([a.latitude, a.longitude], { icon: customFireIcon });

        fireMarker.on('click', () => {
          onSelectAnomaly(a);
          if (a.nearestFacility) {
            onSelectFacility(a.nearestFacility.facility);
          }
        });

        // Interactive Popup
        const fac = a.nearestFacility?.facility;
        const targetFac = fac || {
          id: `regional-forestry-${a.id}`,
          name: `Regional Wildland/Industrial Buffer Zone (Lat: ${a.latitude.toFixed(2)}, Lon: ${a.longitude.toFixed(2)})`,
          type: 'remote_wildfire' as any,
          country: 'Regional',
          region: 'Wildfire Sector',
          latitude: a.latitude,
          longitude: a.longitude,
          hazardLevel: 'ELEVATED' as any,
          primaryChemicals: ['Vegetation Biomass', 'Hydrocarbon Particulates'],
          fuelStorageCapacityTons: 50000,
          blastRadiusKm: 2.0,
          toxicPlumeRadiusKm: 4.5,
          emergencyContact: {
            responderUnit: 'Regional Forestry & Hazardous Materials Rapid Response',
            radioChannel: 'TAC-FIRE-01',
            contactPhone: '+1-800-555-FIRE'
          },
          status: 'NORMAL' as any
        };

        const popupContent = document.createElement('div');
        popupContent.className = 'tactical-popup font-mono text-xs text-slate-100 p-2 min-w-[260px]';
        popupContent.innerHTML = `
          <div class="flex items-center justify-between pb-1.5 border-b border-slate-700">
            <span class="font-bold text-orange-400 flex items-center gap-1">
              🔥 ${a.id}
            </span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${
              threat === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              threat === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
              'bg-slate-800 text-slate-300'
            }">${threat}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 my-2 text-[11px]">
            <div>
              <span class="text-slate-400">Fire Power:</span>
              <div class="font-bold text-orange-300">${a.frp.toFixed(0)} MW</div>
            </div>
            <div>
              <span class="text-slate-400">Brightness:</span>
              <div class="font-bold text-slate-200">${a.brightness} K</div>
            </div>
            <div>
              <span class="text-slate-400">Satellite:</span>
              <div class="text-slate-300">${a.satellite}</div>
            </div>
            <div>
              <span class="text-slate-400">Confidence:</span>
              <div class="text-emerald-400 uppercase">${a.confidence}</div>
            </div>
          </div>

          <div class="bg-slate-900/90 p-2 rounded border border-slate-800 my-2">
            <div class="text-[10px] text-slate-400 uppercase">Target Industrial Asset</div>
            <div class="font-bold text-slate-100 text-xs truncate">${targetFac.name}</div>
            <div class="flex items-center justify-between mt-1 text-[11px]">
              <span class="text-rose-400 font-bold">${a.nearestFacility ? `${a.nearestFacility.distanceKm.toFixed(1)} km away` : 'Active Fire Front'}</span>
              <span class="text-amber-400">${a.nearestFacility ? `ETA: ${a.nearestFacility.timeToImpactHours}h` : 'Real-time Telemetry'}</span>
            </div>
          </div>

          <div class="flex gap-2 mt-2">
            <button id="btn-dispatch-${a.id}" class="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer">
              🚨 Dispatch
            </button>
            <button id="btn-advisor-${a.id}" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1 border border-slate-700 transition-colors cursor-pointer">
              🧠 AI Evac
            </button>
          </div>
        `;

        // Wire popup click actions
        fireMarker.bindPopup(popupContent, { className: 'custom-leaflet-popup', offset: [0, -markerSize / 2] });

        fireMarker.on('popupopen', () => {
          const dispatchBtn = document.getElementById(`btn-dispatch-${a.id}`);
          const advisorBtn = document.getElementById(`btn-advisor-${a.id}`);
          if (dispatchBtn) {
            dispatchBtn.onclick = () => onTriggerDispatch(a, targetFac);
          }
          if (advisorBtn) {
            advisorBtn.onclick = () => onOpenEvacAdvisor(a, targetFac);
          }
        });

        markersLayerRef.current?.addLayer(fireMarker);

        // 3. Render Wind Vectors & Spread Projections
        if (gisConfig.showWindVectors && a.nearestFacility) {
          // Calculate wind arrow vector point
          const windRad = ((a.windDirectionDeg - 90) * Math.PI) / 180;
          const vectorDistKm = 6.0;
          const latDelta = (vectorDistKm / 111) * Math.sin(windRad);
          const lonDelta = (vectorDistKm / (111 * Math.cos((a.latitude * Math.PI) / 180))) * Math.cos(windRad);

          const endLat = a.latitude + latDelta;
          const endLon = a.longitude + lonDelta;

          const windLine = L.polyline(
            [[a.latitude, a.longitude], [endLat, endLon]],
            {
              color: a.nearestFacility.windSpreadRisk === 'DIRECT' ? '#f43f5e' : '#38bdf8',
              weight: 2.5,
              dashArray: '3, 6',
              opacity: 0.8,
            }
          );
          windVectorsLayerRef.current?.addLayer(windLine);
        }
      });
    }
  }, [anomalies, facilities, gisConfig, selectedAnomaly, selectedFacility]);

  // Fly to selected anomaly/facility when selected externally
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (selectedAnomaly) {
      mapInstanceRef.current.flyTo([selectedAnomaly.latitude, selectedAnomaly.longitude], 10, {
        duration: 1.2,
      });
    } else if (selectedFacility) {
      mapInstanceRef.current.flyTo([selectedFacility.latitude, selectedFacility.longitude], 9, {
        duration: 1.2,
      });
    }
  }, [selectedAnomaly, selectedFacility]);

  // Jump to continent
  const handleContinentClick = (cont: typeof CONTINENTS[0]) => {
    setActiveContinent(cont.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(cont.center, cont.zoom, { duration: 1.0 });
    }
  };

  const handleResetView = () => {
    setActiveContinent('Global');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([20, 0], 2.5, { duration: 1.0 });
    }
  };

  const handleCopyCoords = (lat: number, lon: number) => {
    navigator.clipboard.writeText(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Compute active inspected pair
  const inspectedAnomaly = selectedAnomaly;
  const inspectedFacility = selectedFacility || selectedAnomaly?.nearestFacility?.facility || null;

  return (
    <div className="isolate relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[660px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col z-0">
      
      {/* Top Map Control Overlay */}
      <div 
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-30 flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.5rem)] sm:max-w-[90%]"
      >
        
        {/* Continent Quick Jumps */}
        <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 max-w-full">
          <Compass className="w-3.5 h-3.5 text-orange-400 ml-1 mr-0.5 flex-shrink-0" />
          {CONTINENTS.map((cont) => {
            const isSelected = activeContinent === cont.name;
            const isIndia = cont.name === 'India';

            return (
              <button
                type="button"
                key={cont.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinentClick(cont);
                }}
                className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? isIndia
                      ? 'bg-gradient-to-r from-orange-500/30 via-slate-800 to-emerald-500/30 text-orange-300 font-bold border border-orange-500/50 shadow-md'
                      : 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30'
                    : isIndia
                    ? 'text-orange-400/90 hover:text-orange-300 hover:bg-orange-500/10 border border-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {isIndia && <span>🇮🇳</span>}
                <span>{cont.name}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleResetView();
            }}
            title="Reset Global View"
            className="p-1 rounded text-slate-400 hover:text-orange-400 hover:bg-slate-800 transition-colors cursor-pointer flex-shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Direct Dark / Satellite Base Layer Toggle */}
        <div className="flex items-center bg-slate-950/90 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-xl text-xs font-mono flex-shrink-0">
          <button
            onClick={() => onUpdateGISConfig({ mapStyle: 'dark' })}
            title="Dark Tactical Mode"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] transition-all cursor-pointer ${
              gisConfig.mapStyle === 'dark'
                ? 'bg-slate-800 text-orange-400 font-bold shadow-inner border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Dark</span>
          </button>

          <button
            onClick={() => onUpdateGISConfig({ mapStyle: 'satellite' })}
            title="High-Resolution Satellite Imagery"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] transition-all cursor-pointer ${
              gisConfig.mapStyle === 'satellite'
                ? 'bg-emerald-950/70 text-emerald-400 font-bold shadow-inner border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline sm:inline">Satellite</span>
          </button>
        </div>

        {/* GIS Layer Switcher Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-950/90 backdrop-blur-md hover:bg-slate-900 border border-slate-800 rounded-lg text-[11px] sm:text-xs font-mono text-slate-300 shadow-xl transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>GIS Overlays</span>
          </button>

          {showLayerMenu && (
            <div className="absolute left-0 mt-2 w-64 max-w-[90vw] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-2xl z-40 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                Base Map Layer
              </div>
              <div className="grid grid-cols-2 gap-1 mb-3">
                {(['dark', 'satellite', 'terrain', 'osm'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => onUpdateGISConfig({ mapStyle: style })}
                    className={`px-2 py-1 rounded text-center capitalize transition-colors cursor-pointer ${
                      gisConfig.mapStyle === style
                        ? 'bg-orange-500 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 border-t border-slate-800 pt-2">
                Spatial Overlays
              </div>

              <label className="flex items-center justify-between py-1 text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> FIRMS Thermal Anomaly
                </span>
                <input
                  type="checkbox"
                  checked={gisConfig.showThermalOverlay}
                  onChange={(e) => onUpdateGISConfig({ showThermalOverlay: e.target.checked })}
                  className="rounded accent-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between py-1 text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Industrial Facilities
                </span>
                <input
                  type="checkbox"
                  checked={gisConfig.showFacilityMarkers}
                  onChange={(e) => onUpdateGISConfig({ showFacilityMarkers: e.target.checked })}
                  className="rounded accent-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between py-1 text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Blast & Hazard Buffers
                </span>
                <input
                  type="checkbox"
                  checked={gisConfig.showBlastZones}
                  onChange={(e) => onUpdateGISConfig({ showBlastZones: e.target.checked })}
                  className="rounded accent-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between py-1 text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-sky-400" /> Wind Spread Vectors
                </span>
                <input
                  type="checkbox"
                  checked={gisConfig.showWindVectors}
                  onChange={(e) => onUpdateGISConfig({ showWindVectors: e.target.checked })}
                  className="rounded accent-orange-500 cursor-pointer"
                />
              </label>

              {/* Min FRP Filter Slider */}
              <div className="mt-2.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Min Fire Radiative Power:</span>
                  <span className="text-orange-400 font-bold">{gisConfig.minFRPFilter} MW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  value={gisConfig.minFRPFilter}
                  onChange={(e) => onUpdateGISConfig({ minFRPFilter: Number(e.target.value) })}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* India Tactical Sub-Bar (Visible when India is active or on-demand) */}
        {activeContinent === 'India' && (
          <div 
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-between gap-2 p-1.5 px-2.5 rounded-lg bg-slate-950/95 backdrop-blur-md border border-orange-500/40 shadow-xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-xs">🇮🇳</span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-orange-400 whitespace-nowrap">
                BHARAT SECTORS:
              </span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {[
                { id: 'ALL', label: 'All India' },
                { id: 'nuclear_plant', label: '☢️ Nuclear (NPCIL)' },
                { id: 'oil_refinery', label: '🛢️ Refineries' },
                { id: 'petrol_bunk_hub', label: '⛽ Petrol / POL Depots' },
                { id: 'mining_complex', label: '⛏️ Mines (DGMS)' },
                { id: 'chemical_plant', label: '🧪 PCPIR / Chem' },
                { id: 'fertilizer_plant', label: '🌱 Fertilizers' },
                { id: 'strategic_defense', label: '🚀 ISRO / Strategic' },
              ].map((sec) => {
                const isActive = gisConfig.selectedFacilityType === sec.id;

                return (
                  <button
                    type="button"
                    key={sec.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onUpdateGISConfig({ selectedFacilityType: sec.id });
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer select-none ${
                      isActive
                        ? 'bg-orange-600 text-white font-bold ring-1 ring-orange-400 shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>

            {onOpenIndiaCommand && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onOpenIndiaCommand();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md hover:shadow-orange-950 transition-all cursor-pointer flex-shrink-0"
              >
                <span>🚨 NDRF / Command Hub</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating Tactical Inspector Card (When Anomaly or Facility Selected) */}
      {(inspectedAnomaly || inspectedFacility) && (
        <div className="absolute top-14 right-2.5 sm:right-3 left-2.5 sm:left-auto z-30 w-auto sm:w-96 max-w-full bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-4 font-mono text-slate-100 flex flex-col max-h-[75%] sm:max-h-[80%] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Tactical Target Inspector
              </span>
            </div>
            <button
              onClick={() => {
                onSelectAnomaly(null);
                onSelectFacility(null);
              }}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Facility Details */}
          {inspectedFacility && (
            <div className="mt-2.5 bg-slate-900/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 uppercase">Industrial Asset</div>
                  <div className="font-bold text-xs text-slate-100 leading-tight truncate">
                    {inspectedFacility.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {inspectedFacility.region}, {inspectedFacility.country}
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase flex-shrink-0">
                  {inspectedFacility.hazardLevel} HAZARD
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1.5 border-t border-slate-800 text-slate-300">
                <div>
                  <span className="text-slate-400">Blast Radius:</span> <strong className="text-rose-400">{inspectedFacility.blastRadiusKm} km</strong>
                </div>
                <div>
                  <span className="text-slate-400">Toxic Plume:</span> <strong className="text-purple-400">{inspectedFacility.toxicPlumeRadiusKm} km</strong>
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-slate-400">Primary Hazmat:</span> <span className="text-slate-200">{inspectedFacility.primaryChemicals.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Anomaly Telemetry Details */}
          {inspectedAnomaly && (
            <div className="mt-2 bg-orange-950/20 p-2.5 sm:p-3 rounded-xl border border-orange-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs">
                  <Flame className="w-4 h-4" />
                  <span>{inspectedAnomaly.id}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">
                  {inspectedAnomaly.satellite} ({inspectedAnomaly.confidence})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs">
                <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">FRP</div>
                  <div className="font-bold text-orange-400 text-xs">{inspectedAnomaly.frp.toFixed(0)} MW</div>
                </div>
                <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Brightness</div>
                  <div className="font-bold text-slate-200 text-xs">{inspectedAnomaly.brightness} K</div>
                </div>
                <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Wind Vector</div>
                  <div className="font-bold text-sky-400 text-xs">{inspectedAnomaly.windSpeedKmh} km/h</div>
                </div>
              </div>

              {inspectedAnomaly.nearestFacility && (
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-orange-500/20">
                  <span className="text-slate-300 font-bold">
                    Perimeter: <strong className="text-rose-400">{inspectedAnomaly.nearestFacility.distanceKm.toFixed(1)} km</strong>
                  </span>
                  <span className="text-amber-300 font-bold">
                    ETA: {inspectedAnomaly.nearestFacility.timeToImpactHours}h
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Button Bar */}
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              {inspectedAnomaly && inspectedFacility && (
                <>
                  <button
                    onClick={() => onTriggerDispatch(inspectedAnomaly, inspectedFacility)}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/50 transition-all cursor-pointer min-h-[36px]"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Dispatch</span>
                  </button>

                  <button
                    onClick={() => onOpenEvacAdvisor(inspectedAnomaly, inspectedFacility)}
                    className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-950/50 transition-all cursor-pointer min-h-[36px]"
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>AI Intel</span>
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const targetLat = inspectedAnomaly ? inspectedAnomaly.latitude : inspectedFacility!.latitude;
                  const targetLon = inspectedAnomaly ? inspectedAnomaly.longitude : inspectedFacility!.longitude;
                  handleCopyCoords(targetLat, targetLon);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 py-2 px-2 rounded-lg text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[36px]"
              >
                {copiedCoords ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCoords ? 'GPS Copied' : 'Copy GPS'}</span>
              </button>

              <button
                onClick={() => {
                  const targetLat = inspectedAnomaly ? inspectedAnomaly.latitude : inspectedFacility!.latitude;
                  const targetLon = inspectedAnomaly ? inspectedAnomaly.longitude : inspectedFacility!.longitude;
                  mapInstanceRef.current?.flyTo([targetLat, targetLon], 12, { duration: 1.0 });
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 p-2 rounded-lg text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[36px] min-w-[36px]"
                title="Zoom into blast boundary"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 hidden md:flex items-center gap-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Critical Blast Zone</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span>High Threat (1-5km)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>Toxic Vapor Buffer</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-sky-400 border-dashed"></span>
          <span>Wind Propagation</span>
        </div>
      </div>

      {/* Leaflet Map DOM Target */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 z-0" />
    </div>
  );
};
