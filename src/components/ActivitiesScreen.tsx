import React from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, BookOpen, Heart, Swords, Skull, Coins, ShieldCheck } from 'lucide-react';

interface ActivitiesScreenProps {
  onBack: () => void;
}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({ onBack }) => {
  const { character, activeExpansion, performActivity } = useGame();

  if (!character) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <BookOpen size={16} className="text-primary" />;
      case 'health': return <Swords size={16} className="text-primary" />;
      case 'crime': return <Skull size={16} className="text-rose-500" />;
      case 'gamble': return <Coins size={16} className="text-primary" />;
      case 'social': return <Heart size={16} className="text-primary" />;
      default: return <ShieldCheck size={16} className="text-slate-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'study': return 'Lore & Education';
      case 'health': return 'Might & Training';
      case 'crime': return 'Underworld Crimes';
      case 'gamble': return 'Wagers & Dice';
      case 'social': return 'Courtship & Socials';
      default: return 'Actions';
    }
  };

  // Group activities by category
  const categories = Array.from(new Set(activeExpansion.activities.map(a => a.category)));

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
          World Activities
        </h3>
      </div>

      <div className="space-y-6">
        {categories.map(cat => {
          const acts = activeExpansion.activities.filter(a => a.category === cat);
          return (
            <div key={cat} className="space-y-3">
              <span className="text-xs font-bold text-text-sub uppercase tracking-widest flex items-center gap-2 border-b border-card-border pb-1 font-serif">
                {getCategoryIcon(cat)}
                <span>{getCategoryLabel(cat)}</span>
              </span>

              <div className="grid grid-cols-1 gap-3">
                {acts.map(act => {
                  const performedThisYear = character.yearlyActions?.activitiesPerformed?.includes(act.id) || false;
                  const affordable = character.gold >= act.cost;
                  const canDo = affordable && !performedThisYear;
                  return (
                    <button
                      key={act.id}
                      disabled={!canDo}
                      onClick={() => performActivity(act.id)}
                      className={`text-left border rounded-xl p-4 flex justify-between items-center transition-all duration-200 interactive-btn cursor-pointer ${
                        performedThisYear
                          ? 'bg-black/5 border-card-border opacity-50 cursor-not-allowed'
                          : affordable 
                            ? 'bg-card-bg border-card-border hover:border-primary/50' 
                            : 'bg-black/5 border-card-border opacity-50 cursor-not-allowed'
                      }`}
                      style={{ borderRadius: activeExpansion.theme.borderRadius }}
                    >
                      <div className="pr-4">
                        <p className="font-bold text-base text-text-heading">{act.name}</p>
                        <p className="text-xs text-text-sub mt-1 font-light leading-relaxed">{act.description}</p>
                      </div>
                      
                      <div className="text-right flex-shrink-0 font-sans">
                        {performedThisYear ? (
                          <span className="text-xs font-bold text-slate-500 bg-slate-500/10 border border-slate-500/20 px-2.5 py-1 rounded" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                            DONE
                          </span>
                        ) : act.cost > 0 ? (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                            affordable 
                              ? 'text-primary bg-primary/10 border-primary/20' 
                              : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
                          }`} style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                            Cost: {act.cost} G
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                            FREE
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
export default ActivitiesScreen;
