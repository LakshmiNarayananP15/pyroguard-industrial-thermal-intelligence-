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

const COLORS = ['#f43f5e', '#f97316', '#f59e0b', '#06b6d4', '#a855f7', '#10b981'];

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
      <div className="glass-panel rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-orange-500/25 flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-orange-500/20 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-orange-300 glow-orange">
              Fire Radiative Power (MW)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">FIRMS Heat Output</span>
        </div>

        <div className="h-40 sm:h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frpRanges} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="orangeBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(5, 7, 12, 0.95)',
                  borderColor: 'rgba(249, 115, 22, 0.4)',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                  color: '#f8fafc',
                }}
              />
              <Bar dataKey="count" fill="url(#orangeBarGradient)" stroke="#f97316" strokeWidth={1} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Threatened Industry Sectors */}
      <div className="glass-panel rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-orange-500/25 flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-orange-500/20 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <PieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-amber-300">
              Hazard Sector Exposure
            </h3>
          </div>
          <span className="text-[10px] font-mono text-orange-400/80">Click to filter</span>
        </div>

        <div className="h-40 sm:h-44 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={34}
                outerRadius={65}
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" strokeWidth={1.5} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(5, 7, 12, 0.95)',
                  borderColor: 'rgba(249, 115, 22, 0.4)',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                  color: '#f8fafc',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Proximity Matrix (Distance vs FRP) */}
      <div className="glass-panel rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-orange-500/25 flex flex-col md:col-span-2 xl:col-span-1">
        <div className="flex items-center justify-between pb-2 border-b border-orange-500/20 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
            <h3 className="text-xs font-bold font-mono uppercase text-rose-300">
              Proximity Danger Matrix
            </h3>
          </div>
          <span className="text-[10px] font-mono text-orange-400/80">Click to inspect</span>
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
                  backgroundColor: 'rgba(5, 7, 12, 0.95)',
                  borderColor: 'rgba(249, 115, 22, 0.4)',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                  color: '#f8fafc',
                }}
              />
              <Scatter 
                name="Threat Hotspots" 
                data={scatterData} 
                fill="#f43f5e" 
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
