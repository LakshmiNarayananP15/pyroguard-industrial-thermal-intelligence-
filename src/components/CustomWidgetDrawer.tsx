import React from 'react';
import { X, Layers, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { WidgetVisibilityState } from '../types';

interface CustomWidgetDrawerProps {
  widgets: WidgetVisibilityState;
  onToggleWidget: (key: keyof WidgetVisibilityState) => void;
  onResetWidgets: () => void;
  onClose: () => void;
}

export const CustomWidgetDrawer: React.FC<CustomWidgetDrawerProps> = ({
  widgets,
  onToggleWidget,
  onResetWidgets,
  onClose,
}) => {
  const WIDGET_LABELS: { key: keyof WidgetVisibilityState; label: string; desc: string }[] = [
    {
      key: 'threatMatrix',
      label: 'Hazardous Facility Threat Matrix',
      desc: 'High-density risk table with sorting by score, proximity, FRP, and time to impact',
    },
    {
      key: 'liveFeed',
      label: 'Live FIRMS & Dispatch Incident Feed',
      desc: 'Real-time telemetry stream from VIIRS/MODIS and responder action logs',
    },
    {
      key: 'frpChart',
      label: 'Analytics & Fire Radiative Power Charts',
      desc: 'Statistical histograms, sector exposure, and proximity hazard scatter plots',
    },
    {
      key: 'windSpreadPredictor',
      label: 'Wind Vector & Spread Predictor HUD',
      desc: 'Atmospheric transport vectors driving thermal dispersion toward critical assets',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex justify-end font-mono text-slate-100">
      <div 
        className="w-full max-w-sm h-full bg-slate-950 border-l border-slate-800 shadow-2xl p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Custom Dashboard Widgets
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Widget Checkboxes */}
        <div className="py-4 flex-1 overflow-y-auto space-y-3 text-xs">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Toggle analytical widgets to customize your command center monitoring layout.
          </p>

          <div className="space-y-2 mt-2">
            {WIDGET_LABELS.map((w) => {
              const isVisible = widgets[w.key];
              return (
                <div
                  key={w.key}
                  onClick={() => onToggleWidget(w.key)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    isVisible
                      ? 'bg-slate-900 border-orange-500/40 text-slate-100'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {isVisible ? (
                    <CheckSquare className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-xs">{w.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{w.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetWidgets}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Layout</span>
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
