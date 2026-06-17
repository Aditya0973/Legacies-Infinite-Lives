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
      className="glass-panel px-5 py-3.5 shadow-md font-sans"
      style={{
        '--panel-border': activeExpansion.theme.panelBorder,
        '--panel-bg': activeExpansion.theme.panelBg,
        '--primary': activeExpansion.theme.primary,
        '--accent': activeExpansion.theme.accent,
        '--primary-glow': activeExpansion.theme.primaryGlow,
        color: 'var(--text-main)'
      } as React.CSSProperties}
    >
      <div className="flex flex-row items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        
        {/* Left Section: Name, Age, Generation */}
        <div className="text-left">
          <h1 
            className="text-lg md:text-xl font-extrabold text-text-heading leading-tight"
            style={{ fontFamily: activeExpansion.theme.fontTitle }}
          >
            {character.name} <span className="text-primary">{character.dynastyName}</span>
          </h1>
          <p className="text-[11px] text-text-sub font-semibold tracking-wider uppercase mt-0.5">
            Gen {lineage.length + 1} • Age {character.age}
          </p>
        </div>

        {/* Middle Section: Gold & Vocation Summary */}
        <div className="flex items-center gap-4 text-xs font-bold text-text-main flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 bg-black/5 border border-card-border px-3 py-1.5" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
            <Coins size={14} className="text-primary" />
            <span className="text-primary font-black">{character.gold} G</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 border border-card-border px-3 py-1.5" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
            <Briefcase size={14} className="text-text-sub" />
            <span className="truncate max-w-[120px]">{character.career?.title || 'Unemployed'}</span>
          </div>

          {/* Active World Event tag */}
          {worldEvent && (
            <div 
              className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 text-rose-500 text-[10px] uppercase font-black animate-pulse"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <Globe size={10} />
              <span>{worldEvent.name}</span>
            </div>
          )}
        </div>

        {/* Right Section: View Profile Button */}
        <div>
          <button
            onClick={onViewProfile}
            className="py-1.5 px-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all cursor-pointer interactive-btn flex items-center gap-1.5 uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <UserCheck size={14} />
            <span>Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};
export default HUD;
