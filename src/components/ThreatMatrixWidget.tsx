import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  MapPin, 
  ArrowUpDown, 
  Radio, 
  BrainCircuit, 
  ExternalLink, 
  AlertOctagon,
  Clock,
  Wind,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ThermalAnomaly, IndustrialFacility, AnomalySeverity, IndustryType } from '../types';

interface ThreatMatrixWidgetProps {
  anomalies: ThermalAnomaly[];
  onSelectAnomaly: (anomaly: ThermalAnomaly) => void;
  onSelectFacility: (facility: IndustrialFacility) => void;
  onOpenEvacAdvisor: (anomaly: ThermalAnomaly, facility: IndustrialFacility) => void;
  onTriggerDispatch: (anomaly: ThermalAnomaly, facility: IndustrialFacility) => void;
  selectedSector: string;
  onSectorChange: (sector: string) => void;
  selectedSeverity: string;
  onSeverityChange: (severity: string) => void;
}

type SortField = 'threatScore' | 'distance' | 'frp' | 'timeToImpact';

export const ThreatMatrixWidget: React.FC<ThreatMatrixWidgetProps> = ({
  anomalies,
  onSelectAnomaly,
  onSelectFacility,
  onOpenEvacAdvisor,
  onTriggerDispatch,
  selectedSector,
  onSectorChange,
  selectedSeverity,
  onSeverityChange,
}) => {
  const [sortField, setSortField] = useState<SortField>('threatScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter anomalies that have a nearby facility
  let threatList = anomalies.filter((a) => a.nearestFacility);

  // Sector filter
  if (selectedSector !== 'ALL') {
    if (selectedSector === 'INDIA') {
      threatList = threatList.filter((a) => a.nearestFacility?.facility.country === 'India');
    } else {
      threatList = threatList.filter((a) => a.nearestFacility?.facility.type === selectedSector);
    }
  }

  // Severity filter
  if (selectedSeverity !== 'ALL') {
    threatList = threatList.filter((a) => a.nearestFacility?.threatLevel === selectedSeverity);
  }

  // Sorting
  threatList.sort((a, b) => {
    let valA = 0;
    let valB = 0;

    if (sortField === 'threatScore') {
      valA = a.nearestFacility?.threatScore || 0;
      valB = b.nearestFacility?.threatScore || 0;
    } else if (sortField === 'distance') {
      valA = a.nearestFacility?.distanceKm || 0;
      valB = b.nearestFacility?.distanceKm || 0;
    } else if (sortField === 'frp') {
      valA = a.frp;
      valB = b.frp;
    } else if (sortField === 'timeToImpact') {
      valA = a.nearestFacility?.timeToImpactHours || 999;
      valB = b.nearestFacility?.timeToImpactHours || 999;
    }

    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const SECTORS: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Sectors' },
    { id: 'INDIA', label: '🇮🇳 India Focus' },
    { id: 'nuclear_plant', label: '☢️ Nuclear (NPCIL)' },
    { id: 'oil_refinery', label: '🛢️ Refineries' },
    { id: 'petrol_bunk_hub', label: '⛽ Petrol & Fuel Bunks' },
    { id: 'mining_complex', label: '⛏️ Mines & Coal Basins' },
    { id: 'chemical_plant', label: '🧪 Chemical Plants' },
    { id: 'fertilizer_plant', label: '🌱 Fertilizer Plants' },
    { id: 'strategic_defense', label: '🚀 Strategic Defense' },
    { id: 'lng_terminal', label: '❄️ LNG Terminals' },
    { id: 'power_plant', label: '⚡ Power Stations' },
  ];

  const SEVERITIES: { id: string; label: string; color: string }[] = [
    { id: 'ALL', label: 'All Severities', color: 'text-slate-300' },
    { id: 'CRITICAL', label: 'CRITICAL', color: 'text-rose-400' },
    { id: 'HIGH', label: 'HIGH', color: 'text-amber-400' },
    { id: 'ELEVATED', label: 'ELEVATED', color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col shadow-xl">
      
      {/* Widget Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 animate-pulse flex-shrink-0" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wide text-slate-100 uppercase">
              Hazardous Facility Threat Matrix
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
              Real-time proximity evaluation against global industrial infrastructure
            </p>
          </div>
        </div>

        {/* Sector and Severity Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <select
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="flex-1 sm:flex-initial bg-slate-900 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono rounded-lg px-2 sm:px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
          >
            {SECTORS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="flex-1 sm:flex-initial bg-slate-900 border border-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono rounded-lg px-2 sm:px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
          >
            {SEVERITIES.map((sev) => (
              <option key={sev.id} value={sev.id}>
                {sev.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 text-[10px] sm:text-[11px] font-mono text-slate-400 border-b border-slate-800/40 px-1">
        <span className="text-slate-400 whitespace-nowrap">Showing {threatList.length} Active Spatial Hazard Pairs</span>
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 pb-0.5 sm:pb-0">
          <span className="text-slate-500 flex-shrink-0">Sort By:</span>
          <button
            onClick={() => handleSort('threatScore')}
            className={`cursor-pointer transition-colors flex items-center gap-1 flex-shrink-0 ${sortField === 'threatScore' ? 'text-orange-400 font-bold' : 'hover:text-slate-200'}`}
          >
            Risk <ArrowUpDown className="w-3 h-3 inline" />
          </button>
          <button
            onClick={() => handleSort('distance')}
            className={`cursor-pointer transition-colors flex items-center gap-1 flex-shrink-0 ${sortField === 'distance' ? 'text-orange-400 font-bold' : 'hover:text-slate-200'}`}
          >
            Dist <ArrowUpDown className="w-3 h-3 inline" />
          </button>
          <button
            onClick={() => handleSort('frp')}
            className={`cursor-pointer transition-colors flex items-center gap-1 flex-shrink-0 ${sortField === 'frp' ? 'text-orange-400 font-bold' : 'hover:text-slate-200'}`}
          >
            FRP <ArrowUpDown className="w-3 h-3 inline" />
          </button>
          <button
            onClick={() => handleSort('timeToImpact')}
            className={`cursor-pointer transition-colors flex items-center gap-1 flex-shrink-0 ${sortField === 'timeToImpact' ? 'text-orange-400 font-bold' : 'hover:text-slate-200'}`}
          >
            ETA <ArrowUpDown className="w-3 h-3 inline" />
          </button>
        </div>
      </div>

      {/* Threat Cards List */}
      <div className="divide-y divide-slate-800/60 overflow-y-auto max-h-[480px] scrollbar-thin scrollbar-thumb-slate-800 pr-1">
        {threatList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-3">
            <span>No thermal anomaly breaches detected for the selected filters.</span>
            {(selectedSector !== 'ALL' || selectedSeverity !== 'ALL') && (
              <button
                onClick={() => {
                  onSectorChange('ALL');
                  onSeverityChange('ALL');
                }}
                className="px-3 py-1.5 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/40 hover:bg-orange-600/30 text-xs font-mono cursor-pointer transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          threatList.map((item) => {
            const fac = item.nearestFacility!.facility;
            const threat = item.nearestFacility!;
            const level = threat.threatLevel;

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAnomaly(item);
                  onSelectFacility(fac);
                }}
                className="py-3 px-1.5 sm:px-2 rounded-lg hover:bg-slate-900/80 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3 group cursor-pointer border border-transparent hover:border-slate-800"
              >
                {/* Facility Info & Hazard Badges */}
                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                  {/* Risk Score Circle */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center font-mono font-extrabold flex-shrink-0 border shadow-inner ${
                      level === 'CRITICAL'
                        ? 'bg-rose-950/60 border-rose-600/70 text-rose-400'
                        : level === 'HIGH'
                        ? 'bg-amber-950/60 border-amber-600/70 text-amber-400'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-xs leading-none">{threat.threatScore}</span>
                    <span className="text-[8px] uppercase tracking-tighter text-slate-400">Risk</span>
                  </div>

                  {/* Name and Facility Meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-bold text-slate-100 text-xs sm:text-sm truncate font-mono">
                        {fac.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider ${
                          level === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : level === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {level}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                        {fac.country} ({fac.region})
                      </span>
                    </div>

                    {/* Stored Chemicals & Responder Unit */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      <span className="text-slate-300">
                        📦 {fac.primaryChemicals.slice(0, 3).join(', ')}
                      </span>
                      <span className="hidden xs:inline">•</span>
                      <span className="text-slate-400">
                        Blast Radius: <strong className="text-rose-400">{fac.blastRadiusKm} km</strong>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-slate-400 hidden sm:inline">
                        Fuel: <strong>{(fac.fuelStorageCapacityTons / 1000).toFixed(0)}k tons</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spatial Proximity & Telemetry Metrics + Actions Responsive Row */}
                <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono flex-1 sm:flex-shrink-0 bg-slate-900/80 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">Distance</div>
                      <div
                        className={`font-bold text-xs sm:text-sm ${
                          threat.distanceKm <= fac.blastRadiusKm
                            ? 'text-rose-400 font-extrabold animate-pulse'
                            : 'text-amber-300'
                        }`}
                      >
                        {threat.distanceKm.toFixed(1)} km
                      </div>
                    </div>

                    <div className="border-l border-slate-800 pl-2 sm:pl-3">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">FRP</div>
                      <div className="font-bold text-orange-400 text-xs sm:text-sm">{item.frp.toFixed(0)} MW</div>
                    </div>

                    <div className="border-l border-slate-800 pl-2 sm:pl-3">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">ETA</div>
                      <div className="font-bold text-slate-200 text-xs sm:text-sm">{threat.timeToImpactHours}h</div>
                    </div>

                    <div className="border-l border-slate-800 pl-2 sm:pl-3 hidden md:block">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">Wind</div>
                      <div
                        className={`font-semibold ${
                          threat.windSpreadRisk === 'DIRECT'
                            ? 'text-rose-400'
                            : threat.windSpreadRisk === 'CROSSWIND'
                            ? 'text-amber-400'
                            : 'text-sky-400'
                        }`}
                      >
                        {threat.windSpreadRisk} ({item.windSpeedKmh}km/h)
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        onSelectAnomaly(item);
                        onSelectFacility(fac);
                      }}
                      title="Focus on Map"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenEvacAdvisor(item, fac)}
                      title="AI Threat Intelligence & Incident Co-Pilot"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-orange-950/60 border border-slate-800 hover:border-orange-500/50 text-orange-400 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <BrainCircuit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onTriggerDispatch(item, fac)}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono shadow-md shadow-rose-950/40 transition-all cursor-pointer min-h-[36px]"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Dispatch</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
