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
  Code2, 
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
  onOpenFastAPI: () => void;
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
  onOpenFastAPI,
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
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-2.5 sm:px-4 py-2 sm:py-2.5 sticky top-0 z-40">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Brand & System Status */}
        <div className="flex items-center gap-2 sm:gap-3 w-full xl:w-auto justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-950/50 border border-orange-400/30 flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wider text-slate-100 uppercase font-mono">
                  PYRO<span className="text-orange-500">GUARD</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 whitespace-nowrap">
                  FIRMS LIVE
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block">
                NASA Satellite Industrial Fire Early-Warning Engine
              </p>
            </div>
          </div>

          {/* NASA Satellite Live Feed Status Pill & Manual Sync Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <div 
              onClick={onOpenThresholds}
              title="Click to view NASA FIRMS Satellite Feed configuration"
              className="cursor-pointer flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-emerald-950/40 rounded-md border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono text-emerald-400 hover:bg-emerald-900/40 transition-colors"
            >
              <Satellite className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline">NASA FIRMS:</span>
              <span className="font-bold text-emerald-300">
                {firmsStatus?.isRealData ? 'LIVE' : 'SYNCED'}
              </span>
            </div>

            {onRefreshSatellites && (
              <button
                onClick={onRefreshSatellites}
                disabled={isRefreshingSatellites}
                title="Scan latest NASA FIRMS satellite passes"
                className="p-1 sm:p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all disabled:opacity-50 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingSatellites ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Tactical HUD Telemetry Metrics (Responsive Horizontal Scroll / Flex) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full xl:w-auto pb-1 xl:pb-0 scrollbar-thin scrollbar-thumb-slate-800 touch-pan-x">
          
          {/* Critical Red Zone Breaches */}
          <div 
            onClick={() => onSeverityChange(selectedSeverity === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
            className={`cursor-pointer px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border transition-all flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ${
              criticalThreats.length > 0
                ? 'bg-rose-950/40 border-rose-600/50 text-rose-300 hover:bg-rose-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 flex-shrink-0" />
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
            className="cursor-pointer px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 transition-all flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
          >
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">High Risk</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-amber-400 leading-tight whitespace-nowrap">
                {highThreats.length} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">sites</span>
              </div>
            </div>
          </div>

          {/* Total Cumulative FRP */}
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400 leading-tight whitespace-nowrap">Total Power</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-orange-400 leading-tight whitespace-nowrap">
                {totalFRP.toLocaleString()} <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">MW</span>
              </div>
            </div>
          </div>

          {/* Active Responders Dispatched */}
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
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
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search facility..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
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
              className={`p-1.5 sm:p-2 rounded-lg border transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* India Command Center Dedicated Button */}
            {onOpenIndiaCommand && (
              <button
                onClick={onOpenIndiaCommand}
                title="India Bharat Industrial Safety & NDRF Hub"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/20 via-slate-900 to-emerald-500/20 border border-orange-500/40 hover:border-orange-400 text-orange-300 hover:text-white text-xs font-mono font-bold shadow-md transition-all cursor-pointer min-h-[36px]"
              >
                <span>🇮🇳</span>
                <span className="hidden sm:inline">India Hub</span>
              </button>
            )}

            {/* Thresholds Settings */}
            <button
              onClick={onOpenThresholds}
              title="Configure Alert Thresholds"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-slate-700 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* GIS & Audit Export */}
            <button
              onClick={onOpenExport}
              title="Audit & GIS Export"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-950/40 transition-all cursor-pointer min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline">Audit & GIS</span>
              <span className="xs:hidden">Export</span>
            </button>

            {/* FastAPI Python Backend Viewer */}
            <button
              onClick={onOpenFastAPI}
              title="FastAPI Python Code"
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 text-xs font-mono transition-colors min-h-[36px]"
            >
              <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden md:inline">FastAPI</span>
            </button>

            {/* Widget Layout Toggle */}
            <button
              onClick={onOpenWidgets}
              title="Customize Widgets"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
