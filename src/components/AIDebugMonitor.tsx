import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Terminal, X, ChevronDown, ChevronUp, Cpu } from 'lucide-react';

export const AIDebugMonitor: React.FC = () => {
  const { lastEventDebug } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  if (!lastEventDebug) return null;

  const usage = lastEventDebug.usage || { total_tokens: 0, prompt_tokens: 0, completion_tokens: 0 };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 px-3.5 py-2 rounded-full shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer interactive-btn text-xs font-bold font-mono tracking-wider backdrop-blur-sm"
        >
          <Terminal size={14} className="animate-pulse" />
          <span>AI MONITOR</span>
        </button>
      )}

      {/* Expanded Console Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl p-5 backdrop-blur-md text-slate-300 animate-in slide-in-from-bottom-5 fade-in duration-300 flex flex-col max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-cyan-400" />
              <span className="font-mono text-xs font-black tracking-widest text-white">AI DEV MONITOR</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Model & Tokens */}
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-slate-400 font-mono">Active Model:</span>
              <span className="font-mono font-bold text-cyan-400">{lastEventDebug.model}</span>
            </div>

            {/* Token Stats Grid */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/30">
                <p className="text-[10px] text-slate-500 uppercase">Prompt</p>
                <p className="text-sm font-bold text-slate-300">{usage.prompt_tokens}</p>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/30">
                <p className="text-[10px] text-slate-500 uppercase">Completion</p>
                <p className="text-sm font-bold text-slate-300">{usage.completion_tokens}</p>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-cyan-950/40 bg-cyan-950/10">
                <p className="text-[10px] text-cyan-500 uppercase font-black">Total</p>
                <p className="text-sm font-black text-cyan-400">{usage.total_tokens}</p>
              </div>
            </div>

            {/* Collapsible Prompt */}
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="w-full flex items-center justify-between p-2.5 bg-slate-900/20 hover:bg-slate-900/40 transition-colors text-left font-mono font-bold text-slate-400 cursor-pointer"
              >
                <span>1. Sent Prompt Context</span>
                {showPrompt ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showPrompt && (
                <div className="p-3 bg-black/60 border-t border-slate-900 overflow-x-auto max-h-48">
                  <pre className="text-[10px] font-mono leading-relaxed text-emerald-400 whitespace-pre-wrap">
                    {lastEventDebug.prompt}
                  </pre>
                </div>
              )}
            </div>

            {/* Collapsible Response */}
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowResponse(!showResponse)}
                className="w-full flex items-center justify-between p-2.5 bg-slate-900/20 hover:bg-slate-900/40 transition-colors text-left font-mono font-bold text-slate-400 cursor-pointer"
              >
                <span>2. AI Response JSON</span>
                {showResponse ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showResponse && (
                <div className="p-3 bg-black/60 border-t border-slate-900 overflow-x-auto max-h-48">
                  <pre className="text-[10px] font-mono leading-relaxed text-amber-400 whitespace-pre-wrap">
                    {(() => {
                      try {
                        return JSON.stringify(JSON.parse(lastEventDebug.response), null, 2);
                      } catch (e) {
                        return lastEventDebug.response;
                      }
                    })()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
