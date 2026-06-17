import React from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Save, Volume2, VolumeX, LogOut } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { 
    activeExpansion, 
    saveGame, 
    quitToMenu, 
    soundEnabled, 
    toggleSound, 
    activeSlotId,
    saveSlots
  } = useGame();

  const handleManualSave = () => {
    saveGame();
    alert('Dynasty details saved successfully.');
  };

  const activeSlot = saveSlots[activeSlotId];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans" style={{ color: 'var(--text-main)' }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-card-border pb-3">
        <button 
          onClick={onBack}
          className="text-text-sub hover:text-text-heading p-1 rounded hover:bg-card-bg transition-all cursor-pointer interactive-btn"
        >
          <ArrowLeft size={18} />
        </button>
        <h3 
          className="text-base font-bold text-text-heading uppercase tracking-wider"
          style={{ fontFamily: activeExpansion.theme.fontTitle }}
        >
          Session Control
        </h3>
      </div>

      <div className="space-y-5">
        
        {/* Save Slots Info */}
        <div 
          className="bg-card-bg border border-card-border p-5 text-left space-y-3"
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest block font-sans">Active Save Slot</span>
          <div>
            <p className="font-bold text-base text-text-heading">{activeSlot?.label || `Empty Save ${activeSlotId}`}</p>
            <p className="text-xs text-text-sub mt-0.5">
              Slot ID: <span className="font-mono text-primary font-bold">{activeSlotId}</span>
            </p>
          </div>
          
          <button
            onClick={handleManualSave}
            className="w-full mt-2 py-3 bg-primary hover:bg-primary-hover text-white rounded text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer interactive-btn uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <Save size={16} />
            <span>Save Dynasty Details</span>
          </button>
        </div>

        {/* Audio Toggle */}
        <div 
          className="bg-card-bg border border-card-border p-5 flex items-center justify-between text-left"
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          <div>
            <h5 className="font-bold text-base text-text-heading">Synthesizer Audio</h5>
            <p className="text-xs text-text-sub mt-0.5 font-light">Generate retro sound sweeps on clicks/events</p>
          </div>
          <button
            onClick={toggleSound}
            className={`p-3.5 border transition-all cursor-pointer interactive-btn ${
              soundEnabled 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-card-bg border-card-border text-text-sub'
            }`}
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        {/* Exit Game */}
        <div className="pt-2 border-t border-card-border">
          <button
            onClick={quitToMenu}
            className="w-full py-4 bg-card-bg hover:bg-rose-500/5 text-text-sub hover:text-rose-500 rounded border border-card-border hover:border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer interactive-btn uppercase tracking-wider font-bold text-xs"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <LogOut size={16} />
            <span>Retreat to Main Menu</span>
          </button>
        </div>

      </div>

    </div>
  );
};
export default SettingsScreen;
