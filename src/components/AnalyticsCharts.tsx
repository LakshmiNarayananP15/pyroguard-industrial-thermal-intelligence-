import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  ScatterChart, 
  Scatter, 
  ZAxis 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Activity, Flame, MousePointerClick } from 'lucide-react';
import { ThermalAnomaly } from '../types';

interface AnalyticsChartsProps {
  anomalies: ThermalAnomaly[];
  onSelectSector?: (sector: string) => void;
  onSelectAnomaly?: (anomaly: ThermalAnomaly) => void;
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#38bdf8', '#a855f7', '#10b981'];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ 
  anomalies, 
  onSelectSector,
  onSelectAnomaly 
}) => {
  // 1. Sector Threat Breakdown
  const sectorCountMap: Record<string, { count: number; rawType: string }> = {};
  anomalies.forEach((a) => {
    const type = a.nearestFacility?.facility.type || 'remote_wildfire';
    let label = 'Other';
    if (type === 'nuclear_plant') label = 'Nuclear (NPCIL)';
    else if (type === 'oil_refinery') label = 'Refineries';
    else if (type === 'petrol_bunk_hub') label = 'Petrol Bunks / Depots';
    else if (type === 'mining_complex') label = 'Mines (DGMS)';
    else if (type === 'chemical_plant') label = 'Chemical / PCPIR';
    else if (type === 'fertilizer_plant') label = 'Fertilizers';
    else if (type === 'strategic_defense') label = 'Space & Defense';
    else if (type === 'lng_terminal') label = 'LNG Hubs';
    else if (type === 'power_plant') label = 'Power Grid';
    else if (type === 'timber_mill') label = 'Timber/Dust';

    if (!sectorCountMap[label]) {
      sectorCountMap[label] = { count: 0, rawType: type };
    }
    sectorCountMap[label].count += 1;
  });

  const sectorData = Object.entries(sectorCountMap).map(([name, item]) => ({
    name,
    value: item.count,
    rawType: item.rawType,
  }));

  // 2. FRP Ranges Histogram
  const frpRanges = [
    { range: '0-50 MW', count: 0 },
    { range: '50-100 MW', count: 0 },
    { range: '100-150 MW', count: 0 },
    { range: '150-200 MW', count: 0 },
    { range: '200+ MW', count: 0 },
  ];

  anomalies.forEach((a) => {
    if (a.frp < 50) frpRanges[0].count++;
    else if (a.frp < 100) frpRanges[1].count++;
    else if (a.frp < 150) frpRanges[2].count++;
    else if (a.frp < 200) frpRanges[3].count++;
    else frpRanges[4].count++;
  });

  // 3. Proximity Scatter Data (Distance vs FRP)
  const scatterData = anomalies
    .filter((a) => a.nearestFacility)
    .map((a) => ({
      distance: Number(a.nearestFacility!.distanceKm.toFixed(1)),
      frp: Math.round(a.frp),
      name: a.nearestFacility!.facility.name,
      severity: a.nearestFacility!.threatLevel,
      anomaly: a,
    }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      
      {/* 1. FRP Intensity Distribution */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-xl flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-slate-200">
              Fire Radiative Power (MW)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">FIRMS Heat Output</span>
        </div>

        <div className="h-40 sm:h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frpRanges} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Threatened Industry Sectors */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-xl flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <PieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-slate-200">
              Hazard Sector Exposure
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Click to filter</span>
        </div>

        <div className="h-40 sm:h-44 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={62}
                paddingAngle={4}
                dataKey="value"
                cursor="pointer"
                onClick={(entry: any) => {
                  if (onSelectSector && entry && entry.rawType) {
                    onSelectSector(entry.rawType);
                  }
                }}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Proximity Matrix (Distance vs FRP) */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-xl flex flex-col md:col-span-2 xl:col-span-1">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-slate-200">
              Proximity Danger Matrix
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Click to inspect</span>
        </div>

        <div className="h-40 sm:h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                type="number"
                dataKey="distance"
                name="Distance"
                unit="km"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <YAxis
                type="number"
                dataKey="frp"
                name="FRP"
                unit="MW"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                }}
              />
              <Scatter 
                name="Threat Hotspots" 
                data={scatterData} 
                fill="#ef4444" 
                cursor="pointer"
                onClick={(node) => {
                  if (onSelectAnomaly && node && node.anomaly) {
                    onSelectAnomaly(node.anomaly);
                  }
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
