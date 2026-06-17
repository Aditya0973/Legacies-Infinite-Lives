import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { HUD } from './HUD';
import { EventModal } from './EventModal';
import { DynastySelectModal } from './DynastySelectModal';
import { Modal } from './Modal';
import { Users, Briefcase, BookOpen, Compass, Settings, ShieldAlert } from 'lucide-react';

// Import sub-screens
import { RelationshipsScreen } from './RelationshipsScreen';
import { CareerScreen } from './CareerScreen';
import { ActivitiesScreen } from './ActivitiesScreen';
import { InventoryScreen } from './InventoryScreen';
import { SettingsScreen } from './SettingsScreen';

export const CharacterScreen: React.FC = () => {
  const { character, activeExpansion, ageOneYear } = useGame();
  const [activeTab, setActiveTab] = useState<'status' | 'relationships' | 'career' | 'activities' | 'inventory' | 'settings'>('status');

  const journalContainerRef = useRef<HTMLDivElement>(null);

  // Force scroll the journal container to the top (newest entry) when the journal updates
  useEffect(() => {
    if (journalContainerRef.current) {
      journalContainerRef.current.scrollTop = 0;
    }
  }, [character?.journal]);

  if (!character) return null;

  return (
    <div 
      className="flex-1 flex flex-col justify-between w-full max-w-xl mx-auto px-4 py-4 min-h-[90vh] select-none"
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
      <HUD />

      {/* 2. Middle Area: Life Journal Card (Occupies the center of the screen) */}
      <div className="flex-1 flex flex-col glass-panel p-6 shadow-xl my-4 min-h-[280px] md:min-h-[360px]">
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
      <div className="mb-4">
        <button
          onClick={ageOneYear}
          className="w-full py-4.5 bg-primary hover:bg-primary-hover text-white text-base font-black flex items-center justify-center gap-3 cursor-pointer interactive-btn pulse-glow-btn border border-white/10 uppercase tracking-widest"
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
