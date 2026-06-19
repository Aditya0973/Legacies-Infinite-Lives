import React from 'react';
import { useGame } from '../context/GameContext';
import { Coins, Briefcase, Globe, UserCheck } from 'lucide-react';

interface HUDProps {
  onViewProfile: () => void;
}

export const HUD: React.FC<HUDProps> = ({ onViewProfile }) => {
  const { character, activeExpansion, worldEvent, lineage } = useGame();

  if (!character) return null;

  return (
    <div 
      className="glass-panel px-3.5 py-2.5 shadow-md font-sans"
      style={{
        '--panel-border': activeExpansion.theme.panelBorder,
        '--panel-bg': activeExpansion.theme.panelBg,
        '--primary': activeExpansion.theme.primary,
        '--accent': activeExpansion.theme.accent,
        '--primary-glow': activeExpansion.theme.primaryGlow,
        color: 'var(--text-main)'
      } as React.CSSProperties}
    >
      <div className="flex flex-row items-center justify-between gap-2.5">
        
        {/* Left Section: Name, Age, Generation */}
        <div className="text-left min-w-0 flex-1">
          <h1 
            className="text-sm md:text-base font-extrabold text-text-heading leading-tight truncate"
            style={{ fontFamily: activeExpansion.theme.fontTitle }}
          >
            {character.name} <span className="text-primary">{character.dynastyName}</span>
          </h1>
          <p className="text-[9px] text-text-sub font-semibold tracking-wider uppercase mt-0.5">
            Gen {lineage.length + 1} • Age {character.age}
          </p>
        </div>

        {/* Right Section: Gold, Job & Profile Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 bg-black/5 border border-card-border px-2 py-1 text-xs font-bold" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
            <Coins size={12} className="text-primary" />
            <span className="text-primary font-black">{character.gold} G</span>
          </div>

          <div className="hidden min-[480px]:flex items-center gap-1 bg-black/5 border border-card-border px-2 py-1 text-xs font-bold max-w-[100px]" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
            <Briefcase size={12} className="text-text-sub" />
            <span className="truncate max-w-[70px] text-text-sub font-black">{character.career?.title || 'Unemployed'}</span>
          </div>

          <button
            onClick={onViewProfile}
            className="py-1 px-2.5 bg-primary hover:bg-primary-hover text-white text-[10px] font-bold shadow-sm transition-all cursor-pointer interactive-btn flex items-center gap-1 uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <UserCheck size={11} />
            <span>Profile</span>
          </button>
        </div>

      </div>

      {/* Active World Event tag sub-bar */}
      {worldEvent && (
        <div 
          className="mt-2 flex items-center justify-center gap-1 bg-rose-500/10 border border-rose-500/20 py-0.5 text-rose-500 text-[9px] uppercase font-black animate-pulse"
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          <Globe size={10} />
          <span>Global Crisis: {worldEvent.name}</span>
        </div>
      )}
    </div>
  );
};
export default HUD;
