import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getAvailableExpansions } from '../data/expansions/registry';
import { Sparkles, Play, Trash2, Volume2, VolumeX, FolderOpen } from 'lucide-react';
import { Modal } from './Modal';

interface MainMenuProps {
  onStartNewLifeClick: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartNewLifeClick }) => {
  const { 
    activeExpansion, 
    selectExpansion, 
    saveSlots, 
    loadGame, 
    deleteSlot,
    soundEnabled,
    toggleSound 
  } = useGame();

  const [showLoadPanel, setShowLoadPanel] = useState(false);
  const expansions = getAvailableExpansions();
  const slotsList = Object.values(saveSlots).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div 
      className="flex-1 flex flex-col justify-center items-center py-12 px-4 max-w-4xl mx-auto w-full select-none"
      style={{
        '--primary': activeExpansion.theme.primary,
        '--primary-hover': activeExpansion.theme.primaryHover,
        '--accent': activeExpansion.theme.accent,
        '--primary-glow': activeExpansion.theme.primaryGlow,
        color: 'var(--text-main)'
      } as React.CSSProperties}
    >
      
      {/* Brand Logo Header - Bright colors for dark mahogany backing */}
      <div className="text-center mb-12 animate-fade-in">
        <span className="text-xs font-bold tracking-widest text-[#b58933] opacity-90 uppercase block mb-2 font-sans">
          A Multiverse Life Simulator
        </span>
        <h1 
          className="text-6xl md:text-7xl font-extrabold text-[#d4af37] text-glow mb-2"
          style={{ 
            fontFamily: activeExpansion.theme.fontTitle,
            textShadow: '0 0 12px rgba(212, 175, 55, 0.4)'
          }}
        >
          LEGACIES
        </h1>
        <h2 
          className="text-2xl md:text-3xl text-[#fcf6e8]/90 font-semibold tracking-wide uppercase"
          style={{ fontFamily: activeExpansion.theme.fontBody }}
        >
          Infinite Lives
        </h2>
      </div>

      {/* Main Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
        
        {/* Left Card: Actions Panel */}
        <div className="glass-panel p-6 shadow-lg flex flex-col justify-center gap-4">
          <button
            onClick={onStartNewLifeClick}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-lg font-black flex items-center justify-center gap-2 cursor-pointer interactive-btn pulse-glow-btn uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <Play size={20} className="fill-white" />
            <span>Begin New Dynasty</span>
          </button>

          <button
            onClick={() => setShowLoadPanel(true)}
            className="w-full py-4 bg-card-bg hover:bg-primary/10 text-text-main hover:text-text-heading text-lg font-bold border border-card-border flex items-center justify-center gap-2 cursor-pointer interactive-btn"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <FolderOpen size={20} />
            <span>Load Dynasty Save ({slotsList.length})</span>
          </button>

          {/* Sound Synthesizer Controller */}
          <button
            onClick={toggleSound}
            className="w-full py-3 bg-card-bg hover:bg-primary/10 text-text-sub hover:text-text-main text-sm font-semibold border border-card-border flex items-center justify-center gap-2 cursor-pointer interactive-btn"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundEnabled ? 'Synthesizer Sound Enabled' : 'Synthesizer Sound Muted'}</span>
          </button>
        </div>

        {/* Right Card: Expansion Cards */}
        <div className="glass-panel p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-text-heading uppercase tracking-wider mb-4 border-b border-card-border pb-2 flex items-center gap-1.5 font-sans">
              <Sparkles size={16} className="text-primary" />
              <span>Select Expansion World</span>
            </h3>
            <div className="space-y-3">
              {expansions.map(exp => {
                const isActive = exp.id === activeExpansion.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => selectExpansion(exp.id)}
                    className={`w-full p-4 text-left border transition-all duration-200 flex items-start justify-between cursor-pointer interactive-btn ${
                      isActive 
                        ? 'bg-primary/15 border-primary shadow-md' 
                        : 'bg-card-bg border-card-border text-text-sub hover:bg-primary/5 hover:border-primary/50'
                    }`}
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    <div>
                      <p className="font-bold text-base text-text-heading">{exp.name}</p>
                      <p className="text-xs text-text-sub mt-1 font-light leading-relaxed">{exp.description}</p>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-bold text-primary bg-primary/15 border border-primary px-2 py-0.5 rounded uppercase tracking-wider font-sans">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal for Saves & Lineages to avoid page scrolling */}
      <Modal
        title="Saved Dynasties"
        isOpen={showLoadPanel}
        onClose={() => setShowLoadPanel(false)}
      >
        {slotsList.length > 0 ? (
          <div className="space-y-3 font-sans max-h-[400px] overflow-y-auto pr-1">
            {slotsList.map(slot => (
              <div 
                key={slot.id}
                className="bg-card-bg border border-card-border p-4 flex items-center justify-between hover:border-primary/50 transition-colors"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <div 
                  onClick={() => {
                    loadGame(slot.id);
                    setShowLoadPanel(false);
                  }}
                  className="flex-1 text-left cursor-pointer pr-4"
                >
                  <p className="font-bold text-sm text-text-main hover:text-text-heading transition-colors">{slot.label}</p>
                  <p className="text-[10px] text-text-sub mt-0.5">
                    World: <span className="text-text-main capitalize font-medium">{slot.expansionId}</span> • 
                    Saved {new Date(slot.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="text-text-sub hover:text-red-600 p-2 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer interactive-btn animate-in"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-sub text-sm italic py-4 text-center font-sans">
            No dynasty saves found on this device. Begin a new dynasty to save!
          </p>
        )}
      </Modal>

      {/* PWA / Vercel Tag */}
      <div className="text-text-sub opacity-50 text-[10px] text-center mt-6 font-sans uppercase tracking-widest">
        Legacies Simulator Engine • Vercel Deploy Ready
      </div>

    </div>
  );
};
