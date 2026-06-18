import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { HUD } from './HUD';
import { EventModal } from './EventModal';
import { DynastySelectModal } from './DynastySelectModal';
import { Modal } from './Modal';
import { Users, Briefcase, BookOpen, Compass, Settings, ShieldAlert, Award, Globe, Sparkles } from 'lucide-react';
import type { StatName } from '../types/game';

// Import sub-screens
import { RelationshipsScreen } from './RelationshipsScreen';
import { CareerScreen } from './CareerScreen';
import { ActivitiesScreen } from './ActivitiesScreen';
import { InventoryScreen } from './InventoryScreen';
import { SettingsScreen } from './SettingsScreen';

export const CharacterScreen: React.FC = () => {
  const { character, activeExpansion, ageOneYear, worldEvent } = useGame();
  const [activeTab, setActiveTab] = useState<'status' | 'relationships' | 'career' | 'activities' | 'inventory' | 'settings'>('status');
  const [showProfile, setShowProfile] = useState(false);

  const journalContainerRef = useRef<HTMLDivElement>(null);

  // Force scroll the journal container to the top (newest entry) when the journal updates
  useEffect(() => {
    if (journalContainerRef.current) {
      journalContainerRef.current.scrollTop = 0;
    }
  }, [character?.journal]);

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
      className="flex-1 flex flex-col justify-between w-full max-w-md mx-auto px-3.5 pt-3 pb-3 h-full max-h-full select-none overflow-hidden"
      style={{
        '--primary': activeExpansion.theme.primary,
        '--primary-hover': activeExpansion.theme.primaryHover,
        '--accent': activeExpansion.theme.accent,
        '--primary-glow': activeExpansion.theme.primaryGlow,
        borderRadius: activeExpansion.theme.borderRadius,
        color: 'var(--text-main)'
      } as React.CSSProperties}
    >
      
      {/* 1. Top HUD Bar (Very Compact) */}
      <HUD onViewProfile={() => setShowProfile(true)} />

      {/* 2. Middle Area: Life Journal Card (Occupies the center of the screen) */}
      <div className="flex-grow flex-1 flex flex-col glass-panel p-4 shadow-xl my-3 min-h-0 overflow-hidden">
        <h3 
          className="text-base font-bold text-text-heading uppercase tracking-wider border-b border-card-border pb-1.5 mb-3.5 flex items-center gap-2"
          style={{ fontFamily: activeExpansion.theme.fontTitle }}
        >
          <BookOpen size={15} className="text-primary animate-pulse" />
          <span>Life Journal Logs</span>
        </h3>

        <div 
          ref={journalContainerRef}
          className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-smooth"
          style={{ fontFamily: activeExpansion.theme.fontBody }}
        >
          {/* Journal entries sorted from newest (top) to oldest */}
          {character.journal.slice().reverse().map((entry, idx) => {
            const isFirst = idx === 0;
            return (
              <div 
                key={idx} 
                className={`text-md leading-relaxed p-3.5 border transition-all duration-200 ${
                  isFirst 
                    ? 'bg-primary/5 border-primary/30 text-text-heading font-medium' 
                    : 'bg-card-bg border-card-border text-text-sub font-light'
                }`}
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                {isFirst && (
                  <span className="text-[9px] uppercase font-black tracking-wider text-primary block mb-1 font-sans">
                    Latest Event
                  </span>
                )}
                {entry}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Below Journal: Primary AGE UP Button (Always visible right under the journal) */}
      <div className="mb-3">
        <button
          onClick={ageOneYear}
          className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-base font-black flex items-center justify-center gap-3 cursor-pointer interactive-btn pulse-glow-btn border border-white/10 uppercase tracking-widest"
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          <span>Age 1 Year</span>
          <span className="text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full font-sans">
            {character.age} → {character.age + 1}
          </span>
        </button>
      </div>

      {/* 4. Bottom Actions Bar (Horizontal tabs) */}
      <div 
        className="glass-panel px-4 py-2 text-xs font-bold text-text-sub flex items-center justify-between font-sans border border-card-border shadow-md"
        style={{ borderRadius: activeExpansion.theme.borderRadius }}
      >
        <button
          onClick={() => setActiveTab('career')}
          className="py-2 px-1 flex flex-col items-center gap-1 hover:text-text-main cursor-pointer interactive-btn text-center"
        >
          <Briefcase size={16} className="text-primary" />
          <span>Vocation</span>
        </button>

        <button
          onClick={() => setActiveTab('relationships')}
          className="py-2 px-1 flex flex-col items-center gap-1 hover:text-text-main cursor-pointer interactive-btn text-center"
        >
          <Users size={16} className="text-primary" />
          <span>Relations</span>
        </button>

        <button
          onClick={() => setActiveTab('activities')}
          className="py-2 px-1 flex flex-col items-center gap-1 hover:text-text-main cursor-pointer interactive-btn text-center"
        >
          <Compass size={16} className="text-primary" />
          <span>Activities</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className="py-2 px-1 flex flex-col items-center gap-1 hover:text-text-main cursor-pointer interactive-btn text-center"
        >
          <ShieldAlert size={16} className="text-primary" />
          <span>Treasury</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className="py-2 px-1 flex flex-col items-center gap-1 hover:text-text-main cursor-pointer interactive-btn text-center"
        >
          <Settings size={16} className="text-primary" />
          <span>Settings</span>
        </button>
      </div>

      {/* 5. Sub-screens rendered in Popup Modals to prevent main viewport scrolling */}
      
      {/* View Profile Modal */}
      <Modal
        title={`${character.name} ${character.dynastyName}`}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
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

          {/* Character Traits */}
          <div className="border-t border-card-border pt-4">
            <h4 className="text-xs font-bold text-text-heading uppercase tracking-wider mb-2">Active Traits</h4>
            {character.traits.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {character.traits.map(trait => (
                  <span 
                    key={trait} 
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider"
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-sub italic">No active personality traits yet.</p>
            )}
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
            onClick={() => setShowProfile(false)}
            className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-all cursor-pointer interactive-btn uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            Close Profile
          </button>
        </div>
      </Modal>

      {/* Vocation Board Modal */}
      <Modal 
        title="Vocations Board" 
        isOpen={activeTab === 'career'} 
        onClose={() => setActiveTab('status')}
      >
        <CareerScreen onBack={() => setActiveTab('status')} />
      </Modal>

      {/* Relations & Allies Modal */}
      <Modal 
        title="Relations & Allies" 
        isOpen={activeTab === 'relationships'} 
        onClose={() => setActiveTab('status')}
      >
        <RelationshipsScreen onBack={() => setActiveTab('status')} />
      </Modal>

      {/* World Activities Modal */}
      <Modal 
        title="World Activities" 
        isOpen={activeTab === 'activities'} 
        onClose={() => setActiveTab('status')}
      >
        <ActivitiesScreen onBack={() => setActiveTab('status')} />
      </Modal>

      {/* Treasury holdings Modal */}
      <Modal 
        title="Estates & Treasury" 
        isOpen={activeTab === 'inventory'} 
        onClose={() => setActiveTab('status')}
      >
        <InventoryScreen onBack={() => setActiveTab('status')} />
      </Modal>

      {/* Settings Modal */}
      <Modal 
        title="Session Control" 
        isOpen={activeTab === 'settings'} 
        onClose={() => setActiveTab('status')}
      >
        <SettingsScreen onBack={() => setActiveTab('status')} />
      </Modal>

      {/* Core Simulation Overlay Modals */}
      <EventModal />
      <DynastySelectModal />
      
    </div>
  );
};
export default CharacterScreen;
