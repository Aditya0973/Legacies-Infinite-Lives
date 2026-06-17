import React from 'react';
import { useGame } from '../context/GameContext';
import type { Choice, StatName } from '../types/game';
import { Sparkles, Coins, Skull, ArrowRight } from 'lucide-react';

export const EventModal: React.FC = () => {
  const { 
    character, 
    activeExpansion, 
    currentEvent, 
    currentEventOutcome, 
    chooseChoice, 
    clearOutcome 
  } = useGame();

  if (!currentEvent || !character) return null;

  const meetsRequirements = (choice: Choice): boolean => {
    if (!choice.requirements) return true;
    const reqs = choice.requirements;
    if (reqs.minGold && character.gold < reqs.minGold) return false;
    if (reqs.careerId && character.career?.id !== reqs.careerId) return false;
    if (reqs.minStats) {
      for (const [stat, val] of Object.entries(reqs.minStats)) {
        if (character.stats[stat as StatName] < (val || 0)) return false;
      }
    }
    return true;
  };

  const getRequirementsText = (choice: Choice): string => {
    if (!choice.requirements) return '';
    const reqs = choice.requirements;
    const items: string[] = [];
    if (reqs.minGold) items.push(`${reqs.minGold} Gold`);
    if (reqs.careerId) {
      const careerName = activeExpansion.careers.find(c => c.id === reqs.careerId)?.title || 'Career';
      items.push(`Job: ${careerName}`);
    }
    if (reqs.minStats) {
      for (const [stat, val] of Object.entries(reqs.minStats)) {
        const label = activeExpansion.statLabels[stat as StatName] || stat;
        items.push(`${label} ${val}+`);
      }
    }
    return `Requires: ${items.join(', ')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      {/* Main card */}
      <div 
        className="relative w-full max-w-xl glass-panel overflow-hidden shadow-2xl z-10 border border-panel-border flex flex-col transform transition-all duration-300 animate-in fade-in zoom-in-95"
        style={{
          '--panel-border': activeExpansion.theme.panelBorder,
          '--panel-bg': activeExpansion.theme.panelBg,
          '--primary': activeExpansion.theme.primary,
          '--primary-hover': activeExpansion.theme.primaryHover,
          '--accent': activeExpansion.theme.accent,
          '--primary-glow': activeExpansion.theme.primaryGlow,
          borderRadius: activeExpansion.theme.borderRadius,
          color: 'var(--text-main)'
        } as React.CSSProperties}
      >
        {/* Banner decorative line */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Modal content wrapper */}
        <div className="p-8 flex-1 flex flex-col justify-between" style={{ fontFamily: activeExpansion.theme.fontBody }}>
          <div>
            {/* Tag label */}
            <span className="text-[10px] tracking-widest text-primary font-bold uppercase mb-2 block font-sans">
              Random Event • Age {character.age}
            </span>

            {/* Title */}
            <h2 
              className="text-3xl font-extrabold text-glow text-text-heading mb-6"
              style={{ fontFamily: activeExpansion.theme.fontTitle }}
            >
              {currentEvent.title}
            </h2>

            {/* Main Narrative text */}
            {!currentEventOutcome ? (
              <p className="text-xl text-text-main leading-relaxed font-light mb-8 italic">
                "{currentEvent.text}"
              </p>
            ) : (
              <div className="mb-8">
                <p className="text-xl text-text-main leading-relaxed font-light mb-6">
                  {currentEventOutcome.text}
                </p>

                {/* Outcome Stats Box */}
                <div 
                  className="bg-card-bg rounded-xl p-5 border border-card-border space-y-3 font-sans"
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-sub">Outcome Details</h4>
                  
                  {/* Gold Change */}
                  {currentEventOutcome.goldChange !== undefined && (
                    <div className="flex items-center gap-2 text-md">
                      <Coins size={16} className={currentEventOutcome.goldChange >= 0 ? 'text-primary' : 'text-rose-500'} />
                      <span className={currentEventOutcome.goldChange >= 0 ? 'text-primary font-bold' : 'text-rose-500 font-bold'}>
                        {currentEventOutcome.goldChange >= 0 ? '+' : ''}{currentEventOutcome.goldChange} Gold
                      </span>
                    </div>
                  )}

                  {/* Stat changes */}
                  {currentEventOutcome.statChanges && Object.entries(currentEventOutcome.statChanges).map(([stat, val]) => {
                    if (!val) return null;
                    const isPositive = val > 0;
                    return (
                      <div key={stat} className="flex items-center gap-2 text-md text-text-main">
                        <Sparkles size={16} className={isPositive ? 'text-primary' : 'text-rose-400'} />
                        <span>
                          {activeExpansion.statLabels[stat as StatName] || stat}:{' '}
                          <strong className={isPositive ? 'text-primary' : 'text-rose-500'}>
                            {isPositive ? '+' : ''}{val}%
                          </strong>
                        </span>
                      </div>
                    );
                  })}

                  {/* Item reward */}
                  {currentEventOutcome.itemReward && (
                    <div className="flex items-center gap-2 text-md text-primary font-bold">
                      <Sparkles size={16} />
                      <span>Obtained relic: <strong>{currentEventOutcome.itemReward.name}</strong></span>
                    </div>
                  )}

                  {/* Job/Career change */}
                  {currentEventOutcome.careerChange && (
                    <div className="flex items-center gap-2 text-md text-primary font-bold">
                      <ArrowRight size={16} />
                      <span>
                        Career update: <strong>
                          {currentEventOutcome.careerChange.type === 'hire' && `Hired as ${currentEventOutcome.careerChange.careerTitle}`}
                          {currentEventOutcome.careerChange.type === 'fire' && `Dismissed / Fired`}
                          {currentEventOutcome.careerChange.type === 'promote' && `Promoted!`}
                        </strong>
                      </span>
                    </div>
                  )}

                  {/* Title change */}
                  {currentEventOutcome.titleChange && (
                    <div className="flex items-center gap-2 text-md text-primary font-bold">
                      <ArrowRight size={16} />
                      <span>Social Status raised to: <strong>{currentEventOutcome.titleChange}</strong></span>
                    </div>
                  )}

                  {/* Death */}
                  {currentEventOutcome.death && (
                    <div className="flex items-center gap-2 text-md text-rose-500 font-bold">
                      <Skull size={18} />
                      <span>Fatal: {currentEventOutcome.deathReason || 'Passed away.'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Choice Selection Grid */}
          <div className="space-y-3 font-sans w-full">
            {!currentEventOutcome ? (
              currentEvent.choices.map((choice, idx) => {
                const available = meetsRequirements(choice);
                return (
                  <button
                    key={idx}
                    disabled={!available}
                    onClick={() => chooseChoice(choice)}
                    className={`w-full py-4 px-6 border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 interactive-btn text-base font-semibold ${
                      available 
                        ? 'bg-card-bg border-card-border text-text-main hover:bg-primary/20 hover:border-primary cursor-pointer shadow-sm' 
                        : 'bg-black/5 border-card-border text-text-sub cursor-not-allowed opacity-50'
                    }`}
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    <span>{choice.text}</span>
                    {!available && (
                      <span className="text-xs text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 uppercase tracking-wider font-sans font-bold">
                        {getRequirementsText(choice)}
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <button
                onClick={clearOutcome}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-base font-black shadow-md flex items-center justify-center gap-2 cursor-pointer interactive-btn uppercase tracking-widest"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventModal;
