import React, { useState } from 'react';
import { 
  Flame, 
  Satellite, 
  Radio, 
  Clock, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { ThermalAnomaly, EmergencyAlert } from '../types';

interface LiveIncidentFeedProps {
  anomalies: ThermalAnomaly[];
  alerts: EmergencyAlert[];
  onSelectAnomaly: (anomaly: ThermalAnomaly) => void;
  onAcknowledgeAlert: (alertId: string) => void;
}

export const LiveIncidentFeed: React.FC<LiveIncidentFeedProps> = ({
  anomalies,
  alerts,
  onSelectAnomaly,
  onAcknowledgeAlert,
}) => {
  const [activeTab, setActiveTab] = useState<'firms' | 'dispatches'>('firms');

  return (
    <div className="glass-panel rounded-2xl p-3 sm:p-4 flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-orange-500/25 h-[400px] sm:h-[460px] md:h-[490px] xl:h-[calc(100vh-145px)] xl:min-h-[630px] xl:max-h-[800px]">
      
      {/* Feed Tabs */}
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 pb-3 border-b border-orange-500/20">
        <div className="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-orange-500/20 text-[11px] sm:text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('firms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'firms'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                : 'text-slate-400 hover:text-orange-300 hover:bg-orange-500/10'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 flex-shrink-0" />
            <span>FIRMS Satellite ({anomalies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dispatches')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dispatches'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <Radio className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Dispatches ({alerts.length})</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 self-end xs:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold tracking-wider">LIVE STREAM</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-3 overflow-y-auto flex-1 min-h-0 scrollbar-glass divide-y divide-white/5 pr-1">
        {activeTab === 'firms' ? (
          anomalies.map((a) => {
            const fac = a.nearestFacility?.facility;
            const threatLevel = a.nearestFacility?.threatLevel || 'WATCH';

            return (
              <div
                key={a.id}
                onClick={() => onSelectAnomaly(a)}
                className="py-2.5 px-2.5 rounded-xl hover:bg-orange-500/10 border border-transparent hover:border-orange-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs font-mono group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-black/70 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 group-hover:border-orange-400 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all">
                    <Flame className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{a.satellite}</span>
                      <span className="text-[10px] text-slate-400">
                        {a.acq_date} {a.acq_time}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-black/60 border border-white/10 rounded text-slate-300">
                        {a.daynight === 'D' ? '☀️ Day' : '🌙 Night'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      Lat: {a.latitude.toFixed(3)}, Lon: {a.longitude.toFixed(3)}
                      {fac && (
                        <span className="text-orange-400 ml-1.5 font-medium">
                          → {fac.name} ({a.nearestFacility?.distanceKm.toFixed(1)}km)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-bold text-orange-400 glow-orange">{a.frp.toFixed(0)} MW</div>
                    <div className="text-[10px] text-slate-500">{a.brightness} K</div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      threatLevel === 'CRITICAL'
                        ? 'bg-rose-950/40 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)]'
                        : threatLevel === 'HIGH'
                        ? 'bg-orange-950/40 text-orange-300 border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.25)]'
                        : 'bg-black/50 text-slate-400 border border-white/10'
                    }`}
                  >
                    {threatLevel}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          alerts.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs font-mono">
              No emergency response units currently dispatched.
            </div>
          ) : (
            alerts.map((alt) => (
              <div
                key={alt.id}
                className="py-3 px-3 rounded-xl bg-black/60 border border-rose-500/30 my-2 text-xs font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    🚨 {alt.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(alt.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {alt.message}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] text-slate-400">
                    Units: <strong className="text-orange-300">{alt.dispatchedTo.join(', ')}</strong>
                  </div>

                  {alt.status === 'DISPATCHED' ? (
                    <button
                      onClick={() => onAcknowledgeAlert(alt.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Acknowledge Dispatch</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-3 h-3" /> ACKNOWLEDGED / EN ROUTE
                    </span>
                  )}
                </div>
              </div>
            ))
          )
        )}
      </div>

    </div>
  );
};
