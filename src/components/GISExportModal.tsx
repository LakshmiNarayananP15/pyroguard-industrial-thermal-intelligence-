import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Map, 
  Table, 
  Code2, 
  Check, 
  Copy, 
  ShieldCheck, 
  Layers, 
  Globe2 
} from 'lucide-react';
import { ThermalAnomaly, IndustrialFacility, EmergencyAlert } from '../types';
import { exportToGeoJSON, exportToCSV, generatePDFIncidentReport } from '../utils/gisCalculations';

interface GISExportModalProps {
  anomalies: ThermalAnomaly[];
  facilities: IndustrialFacility[];
  alerts: EmergencyAlert[];
  onClose: () => void;
  onOpenFastAPI: () => void;
}

export const GISExportModal: React.FC<GISExportModalProps> = ({
  anomalies,
  facilities,
  alerts,
  onClose,
  onOpenFastAPI,
}) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const handleDownloadGeoJSON = () => {
    const data = exportToGeoJSON(anomalies, facilities);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PyroGuard_Thermal_Hazards_${new Date().toISOString().slice(0, 10)}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csvContent = exportToCSV(anomalies);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PyroGuard_Compliance_Audit_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGeneratePDF = () => {
    generatePDFIncidentReport(alerts, anomalies, facilities);
  };

  const copyUrl = (endpoint: string) => {
    const fullUrl = `${window.location.origin}${endpoint}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 bg-black/85 backdrop-blur-xl font-mono text-slate-100">
      <div className="bg-black/95 border border-orange-500/30 rounded-2xl w-full max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-orange-500/20 bg-black/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-black/80 border border-orange-500/40 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide uppercase text-white glow-orange">
                GIS Integration & Compliance Audit Export Center
              </h2>
              <div className="text-[11px] text-slate-400">
                Export spatial hazard layers, OSHA audits & connect external GIS software
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 text-xs overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Export Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* GeoJSON Export */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-orange-500/40 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1">
                  <Map className="w-4 h-4" />
                  <span>OGC GeoJSON</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  ArcGIS & QGIS ready format with all hotspot coordinates, blast zones, and facility metadata.
                </p>
              </div>

              <button
                onClick={handleDownloadGeoJSON}
                className="mt-3 w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download GeoJSON
              </button>
            </div>

            {/* PDF Audit Report */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <FileText className="w-4 h-4" />
                  <span>PDF Audit Report</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Comprehensive compliance audit report with executive threat summary & responder directives.
                </p>
              </div>

              <button
                onClick={handleGeneratePDF}
                className="mt-3 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Generate PDF
              </button>
            </div>

            {/* CSV Log */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                  <Table className="w-4 h-4" />
                  <span>CSV Incident Table</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  NIST/NFPA tabular dataset with telemetry, proximity metrics, and satellite confidence.
                </p>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="mt-3 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download CSV
              </button>
            </div>

          </div>

          {/* Live GIS API Connectivity Endpoints */}
          <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 uppercase">
                <Globe2 className="w-4 h-4 text-emerald-400" /> Live GIS Cross-Platform Endpoints
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                REST & GeoJSON
              </span>
            </div>

            <div className="space-y-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="text-[10px] text-slate-400 uppercase">Live Hotspots & Buffers GeoJSON Feed:</div>
                  <div className="text-slate-300 text-[11px] truncate font-mono">
                    /api/export/geojson
                  </div>
                </div>
                <button
                  onClick={() => copyUrl('/api/export/geojson')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer flex-shrink-0"
                >
                  {copiedEndpoint === '/api/export/geojson' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEndpoint === '/api/export/geojson' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="text-[10px] text-slate-400 uppercase">Live FIRMS Telemetry REST API:</div>
                  <div className="text-slate-300 text-[11px] truncate font-mono">
                    /api/thermal/live
                  </div>
                </div>
                <button
                  onClick={() => copyUrl('/api/thermal/live')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer flex-shrink-0"
                >
                  {copiedEndpoint === '/api/thermal/live' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEndpoint === '/api/thermal/live' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Python FastAPI Backend Sync */}
          <div className="bg-slate-900/50 rounded-xl p-3 sm:p-3.5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex-shrink-0">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-200 text-xs truncate">
                  Python FastAPI Backend Architecture
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">
                  Ready-to-deploy FastAPI server code with high-performance spatial KD-Tree queries
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenFastAPI();
              }}
              className="w-full sm:w-auto px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 min-h-[36px]"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View / Download .py</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-slate-800 bg-slate-900/60">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
