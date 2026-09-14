import React from 'react';
import {
  Flame,
  AlertTriangle,
  ShieldAlert,
  Radio,
  Volume2,
  VolumeX,
  Settings,
  Download,
  Layers,
  Activity,
  Zap,
  Search,
  Satellite,
  RefreshCw,
  X
} from 'lucide-react';
import { ThermalAnomaly, EmergencyAlert, FIRMSFeedStatus } from '../types';

interface HeaderHUDProps {
  anomalies: ThermalAnomaly[];
  alerts: EmergencyAlert[];
  firmsStatus?: FIRMSFeedStatus | null;
  isRefreshingSatellites?: boolean;
  onRefreshSatellites?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenThresholds: () => void;
  onOpenExport: () => void;
  onOpenFastAPI?: () => void;
  onOpenWidgets: () => void;
  onOpenIndiaCommand?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSeverity: string;
  onSeverityChange: (severity: string) => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  anomalies,
  alerts,
  firmsStatus,
  isRefreshingSatellites,
  onRefreshSatellites,
  soundEnabled,
  onToggleSound,
  onOpenThresholds,
  onOpenExport,
  onOpenWidgets,
  onOpenIndiaCommand,
  searchTerm,
  onSearchChange,
  selectedSeverity,
  onSeverityChange,
}) => {
  const criticalThreats = anomalies.filter(
    (a) => a.nearestFacility?.threatLevel === 'CRITICAL'
  );
  const highThreats = anomalies.filter(
    (a) => a.nearestFacility?.threatLevel === 'HIGH'
  );
  const totalFRP = Math.round(anomalies.reduce((sum, a) => sum + a.frp, 0));
  const activeDispatches = alerts.filter(a => a.status === 'DISPATCHED').length;

  return (
    <header className="bg-black/75 backdrop-blur-2xl border-b border-orange-500/20 px-2.5 sm:px-4 py-2 sm:py-2.5 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-2.5 sm:gap-3">

        {/* Brand & System Status */}
        <div className="flex items-center gap-2 sm:gap-3 w-full xl:w-auto justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.45)] border border-orange-400/40 flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-black drop-shadow animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wider text-white uppercase font-mono">
                  PYRO<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 glow-orange">GUARD</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block font-mono">
                Industrial Fire Early-Warning Engine
              </p>
            </div>
          </div>

          {/* NASA Satellite Live Feed Status Pill & Manual Sync Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <div
              onClick={onOpenThresholds}
              title="Click to view NASA FIRMS Satellite Feed configuration"
              className="cursor-pointer flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all"
            >
              <Satellite className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline text-slate-400">NASA FIRMS:</span>
              <span className="font-bold text-emerald-300">
                {firmsStatus?.isRealData ? 'LIVE' : 'SYNCED'}
              </span>
            </div>

            {onRefreshSatellites && (
              <button
                onClick={onRefreshSatellites}
                disabled={isRefreshingSatellites}
                title="Scan latest NASA FIRMS satellite passes"
                className="p-1 sm:p-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-400 hover:text-orange-400 hover:border-orange-500/40 transition-all disabled:opacity-50 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center hover:shadow-[0_0_12px_rgba(249,115,22,0.25)]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingSatellites ? 'animate-spin text-orange-400' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Tactical HUD Telemetry Metrics */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap shrink-0 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          {/* Critical Red Zone Breaches */}
          <div
            onClick={() => onSeverityChange(selectedSeverity === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
            className={`cursor-pointer px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border backdrop-blur-md transition-all flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ${criticalThreats.length > 0
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-300 hover:bg-rose-900/40 hover:border-rose-400 hover:shadow-[0_0_18px_rgba(244,63,94,0.3)]'
                : 'bg-black/50 border-white/10 text-slate-400'
              }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">Red Zone</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-rose-400 leading-tight whitespace-nowrap">
                {criticalThreats.length} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">sites</span>
              </div>
            </div>
          </div>

          {/* High Warning Sites */}
          <div
            onClick={() => onSeverityChange(selectedSeverity === 'HIGH' ? 'ALL' : 'HIGH')}
            className="cursor-pointer px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-amber-500/30 text-slate-300 hover:border-amber-400/70 hover:bg-amber-950/20 hover:shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
          >
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">High Risk</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-amber-400 leading-tight whitespace-nowrap">
                {highThreats.length} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">sites</span>
              </div>
            </div>
          </div>

          {/* Total Cumulative FRP */}
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-orange-500/30 text-slate-300 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.12)]">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">Total Power</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-orange-400 leading-tight whitespace-nowrap">
                {totalFRP.toLocaleString()} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">MW</span>
              </div>
            </div>
          </div>

          {/* Active Responders Dispatched */}
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-blue-500/30 text-slate-300 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">Dispatches</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-blue-400 leading-tight whitespace-nowrap">
                {activeDispatches} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">units</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Severity Filter & Power Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full xl:w-auto justify-between sm:justify-end flex-wrap sm:flex-nowrap">

          {/* Quick Search */}
          <div className="relative flex-1 sm:w-44 lg:w-48 min-w-[140px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-400/70 pointer-events-none" />
            <input
              type="text"
              placeholder="Search facility..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-black/60 backdrop-blur-md border border-orange-500/25 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-400 focus:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-400 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Audio Siren Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Acoustic Siren Enabled' : 'Acoustic Siren Muted'}
              className={`p-1.5 sm:p-2 rounded-lg border backdrop-blur-md transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer ${soundEnabled
                  ? 'bg-orange-500/15 border-orange-500/40 text-orange-400 hover:bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.25)]'
                  : 'bg-black/50 border-white/10 text-slate-500 hover:text-slate-300'
                }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* India Command Center Dedicated Button */}
            {onOpenIndiaCommand && (
              <button
                onClick={onOpenIndiaCommand}
                title="India Bharat Industrial Safety & NDRF Hub"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/20 via-black/70 to-emerald-500/20 border border-orange-500/40 hover:border-orange-400 text-orange-300 hover:text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all cursor-pointer min-h-[36px]"
              >
                <span>🇮🇳</span>
                <span className="hidden sm:inline">India Hub</span>
              </button>
            )}

            {/* Thresholds Settings */}
            <button
              onClick={onOpenThresholds}
              title="Configure Alert Thresholds"
              className="p-1.5 sm:p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/40 hover:shadow-[0_0_12px_rgba(249,115,22,0.2)] transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* GIS & Audit Export */}
            <button
              onClick={onOpenExport}
              title="Audit & GIS Export"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-bold text-xs shadow-[0_0_18px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:brightness-110 transition-all cursor-pointer min-h-[36px] border border-orange-400/50"
            >
              <Download className="w-3.5 h-3.5 flex-shrink-0 text-black" />
              <span className="hidden xs:inline">Audit & GIS</span>
              <span className="xs:hidden">Export</span>
            </button>

            {/* Widget Layout Toggle */}
            <button
              onClick={onOpenWidgets}
              title="Customize Widgets"
              className="p-1.5 sm:p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/40 hover:shadow-[0_0_12px_rgba(249,115,22,0.2)] transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
