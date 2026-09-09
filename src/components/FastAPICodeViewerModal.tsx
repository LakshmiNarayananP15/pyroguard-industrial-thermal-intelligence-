import React, { useState, useEffect } from 'react';
import { X, Code2, Download, Copy, Check, Terminal, Play, Cpu } from 'lucide-react';

interface FastAPICodeViewerModalProps {
  onClose: () => void;
}

export const FastAPICodeViewerModal: React.FC<FastAPICodeViewerModalProps> = ({ onClose }) => {
  const [code, setCode] = useState<string>('# Loading Python FastAPI Source Code...');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/export/python-code')
      .then((res) => res.text())
      .then((txt) => setCode(txt))
      .catch((err) => {
        setCode(`# Error loading backend source code: ${err.message}`);
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pyroguard_fastapi_backend.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md font-mono text-slate-100">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-100 flex items-center gap-2">
                <span>Python FastAPI Backend Architecture</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded border border-emerald-500/30">
                  Async / High-Performance
                </span>
              </h2>
              <div className="text-[11px] text-slate-400">
                NASA FIRMS stream processing, spatial indexing & RESTful responders API
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions Banner */}
        <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>To run locally: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800">pip install fastapi uvicorn pydantic httpx</code> then <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800">python main.py</code></span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>FastAPI v0.110+ Ready</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto flex-1 bg-[#050811] text-[11px] font-mono leading-relaxed text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
          <pre className="whitespace-pre-wrap selection:bg-emerald-900/50">{code}</pre>
        </div>

      </div>
    </div>
  );
};
