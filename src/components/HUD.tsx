import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Coins, Award, Briefcase, Globe, Sparkles, UserCheck } from 'lucide-react';
import { Modal } from './Modal';
import type { StatName } from '../types/game';

export const HUD: React.FC = () => {
  const { character, activeExpansion, worldEvent, lineage } = useGame();
  const [showAttributes, setShowAttributes] = useState(false);

  if (!character) return null;

  // Slider position: Honor is on the left (100% reputation), Infamy is on the right (0% reputation)
  const sliderPosition = 100 - character.stats.reputation;

  // Determine active morality title
  let moralityDescription = 'Neutral';
  if (character.stats.reputation > 80) moralityDescription = 'Paragon of Virtues';
  else if (character.stats.reputation > 65) moralityDescription = 'Honorable';
  else if (character.stats.reputation > 55) moralityDescription = 'Trustworthy';
  else if (character.stats.reputation < 20) moralityDescription = 'Scourge of the Realm';
  else if (character.stats.reputation < 35) moralityDescription = 'Infamous Outlaw';
  else if (character.stats.reputation < 45) moralityDescription = 'Devious';

  const statColor = (name: StatName): string => {
    switch (name) {
      case 'health': return 'bg-emerald-600';
      case 'happiness': return 'bg-amber-500';
      case 'intelligence': return 'bg-blue-600';
      case 'charisma': return 'bg-pink-600';
      case 'strength': return 'bg-red-600';
      default: return 'bg-slate-400';
    }
  };

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
            onClick={() => setShowAttributes(true)}
            className="py-1.5 px-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all cursor-pointer interactive-btn flex items-center gap-1.5 uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <UserCheck size={14} />
            <span>Profile</span>
          </button>
        </div>

      </div>

      {/* Attributes Profile Modal */}
      <Modal
        title={`${character.name} ${character.dynastyName}`}
        isOpen={showAttributes}
        onClose={() => setShowAttributes(false)}
      >
        <div className="space-y-6 text-left font-sans">
          
          {/* Identity & Status */}
          <div className="flex items-center justify-between border-b border-card-border pb-3 text-sm">
            <div>
              <p className="text-xs text-text-sub font-bold uppercase tracking-wider">Title / Social Rank</p>
              <p className="text-base text-text-heading font-black flex items-center gap-1.5 mt-0.5">
                <Award size={16} className="text-primary" />
                <span>{character.title}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-sub font-bold uppercase tracking-wider">Age</p>
              <p className="text-base text-text-heading font-black mt-0.5">{character.age} years old</p>
            </div>
          </div>

          {/* Stats List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-text-heading uppercase tracking-wider">Character Attributes</h4>
            
            {(Object.keys(character.stats) as StatName[]).map(stat => {
              if (stat === 'reputation') return null; // Displayed separately on morality slider below
              const val = character.stats[stat];
              const label = activeExpansion.statLabels[stat] || stat;
              return (
                <div key={stat} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-bold text-text-main">
                    <span>{label}</span>
                    <span>{val}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/15 rounded-full overflow-hidden border border-card-border">
                    <div 
                      className={`h-full ${statColor(stat)} transition-all duration-500`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Morality Slider */}
          <div className="border-t border-card-border pt-4">
            <div className="flex items-center justify-between text-xs font-bold text-text-sub mb-2">
              <span className="text-primary flex items-center gap-1 font-serif">
                <Sparkles size={11} />
                {activeExpansion.moralityLabels.honor}
              </span>
              <span 
                className="text-text-heading font-black uppercase tracking-widest bg-card-bg px-2.5 py-0.5 border border-card-border"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                {moralityDescription}
              </span>
              <span className="text-accent flex items-center gap-1 font-serif">
                {activeExpansion.moralityLabels.infamy}
                <Sparkles size={11} />
              </span>
            </div>

            <div className="relative h-2.5 w-full bg-black/10 rounded-full border border-card-border overflow-visible">
              <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-emerald-500/15 to-transparent rounded-l-full" />
              <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-red-500/15 to-transparent rounded-r-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-card-border" />
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-4 h-4 bg-primary border-2 border-panel-border rounded-full shadow-md animate-pulse" />
              </div>
            </div>
          </div>

          {/* Active World Event modifiers details */}
          {worldEvent && (
            <div 
              className="bg-rose-500/5 border border-rose-500/20 p-4 space-y-1.5"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <h5 className="text-xs font-bold text-rose-600 uppercase tracking-wide flex items-center gap-1">
                <Globe size={12} />
                <span>Global Crisis: {worldEvent.name}</span>
              </h5>
              <p className="text-text-sub text-xs leading-relaxed font-light">{worldEvent.description}</p>
              <p className="text-rose-500 font-bold text-[10px] uppercase font-sans tracking-wide">Effects: {worldEvent.effectsText}</p>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setShowAttributes(false)}
            className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-all cursor-pointer interactive-btn uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            Close Profile
          </button>
        </div>
      </Modal>

    </div>
  );
};
export default HUD;
