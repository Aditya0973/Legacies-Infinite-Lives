import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { Relationship } from '../types/game';
import { ArrowLeft, MessageSquare, Gift, HeartCrack, HeartHandshake, DollarSign, X } from 'lucide-react';

interface RelationshipsScreenProps {
  onBack: () => void;
}

export const RelationshipsScreen: React.FC<RelationshipsScreenProps> = ({ onBack }) => {
  const { character, activeExpansion, interactWithRelation } = useGame();
  const [selectedRelation, setSelectedRelation] = useState<Relationship | null>(null);

  if (!character) return null;

  const aliveRelations = character.relationships.filter(r => r.status === 'alive');
  const deadRelations = character.relationships.filter(r => r.status === 'dead');

  const getRelationColor = (val: number): string => {
    if (val >= 75) return 'bg-emerald-600';
    if (val >= 45) return 'bg-sky-600';
    if (val >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };

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
          Family & Allies
        </h3>
      </div>

      {/* Main List view */}
      {!selectedRelation ? (
        <div className="space-y-6">
          
          {/* Active Allies */}
          <div>
            <span className="text-xs font-bold text-text-sub uppercase tracking-widest block mb-3">Living Relatives</span>
            {aliveRelations.length > 0 ? (
              <div className="space-y-3">
                {aliveRelations.map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => setSelectedRelation(rel)}
                    className="w-full bg-card-bg border border-card-border hover:border-primary/50 p-4 flex items-center justify-between transition-all duration-200 cursor-pointer interactive-btn text-left"
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    <div>
                      <p className="font-bold text-base text-text-heading">{rel.name}</p>
                      <p className="text-xs text-text-sub capitalize font-medium">{rel.type} • Age {rel.age}</p>
                    </div>
                    
                    {/* Affection bar */}
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="h-2 flex-1 bg-black/10 rounded-full overflow-hidden border border-card-border">
                        <div 
                          className={`h-full ${getRelationColor(rel.relationship)}`}
                          style={{ width: `${rel.relationship}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-text-main w-8 text-right">{rel.relationship}%</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-text-sub text-sm italic py-2">You are completely alone in this world.</p>
            )}
          </div>

          {/* Deceased Allies */}
          {deadRelations.length > 0 && (
            <div className="border-t border-card-border pt-5">
              <span className="text-xs font-bold text-text-sub opacity-70 uppercase tracking-widest block mb-3">Departed Souls</span>
              <div className="space-y-2.5 opacity-60">
                {deadRelations.map(rel => (
                  <div
                    key={rel.id}
                    className="bg-card-bg border border-card-border p-3.5 flex justify-between items-center text-xs"
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    <div>
                      <p className="font-bold text-text-sub line-through">{rel.name}</p>
                      <p className="text-text-sub opacity-80 capitalize">{rel.type} • Deceased at {rel.age}</p>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      R.I.P.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Action Interaction Panel */
        <div 
          className="bg-card-bg p-6 border border-primary/30 space-y-6 animate-in zoom-in-95 duration-200"
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          
          {/* Header detail */}
          <div className="flex justify-between items-start border-b border-card-border pb-4">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 border border-primary/20 block w-max mb-2">
                {selectedRelation.type}
              </span>
              <h4 className="text-xl font-bold text-text-heading">{selectedRelation.name}</h4>
              <p className="text-xs text-text-sub mt-1">Age: {selectedRelation.age} years old</p>
            </div>
            <button 
              onClick={() => setSelectedRelation(null)}
              className="text-text-sub hover:text-text-heading p-1 rounded hover:bg-black/5 transition-colors cursor-pointer interactive-btn"
            >
              <X size={18} />
            </button>
          </div>

          {/* Affection Status */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-text-sub">Affection Level</span>
              <span className="text-text-main">{selectedRelation.relationship}%</span>
            </div>
            <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden border border-card-border">
              <div 
                className={`h-full ${getRelationColor(selectedRelation.relationship)}`}
                style={{ width: `${selectedRelation.relationship}%` }}
              />
            </div>
          </div>

          {/* Actions Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Chat Action */}
            <button
              onClick={() => interactWithRelation(selectedRelation.id, 'chat')}
              className="py-3 px-4 bg-card-bg hover:bg-primary/5 text-text-main hover:text-text-heading border border-card-border hover:border-primary/50 flex items-center gap-3 text-sm font-semibold transition-all cursor-pointer interactive-btn text-left"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <MessageSquare size={16} className="text-primary" />
              <div>
                <p>Have a Chat</p>
                <p className="text-[10px] text-text-sub font-light">Free • Talk about life</p>
              </div>
            </button>

            {/* Gift Action */}
            <button
              disabled={character.gold < 25}
              onClick={() => interactWithRelation(selectedRelation.id, 'gift')}
              className={`py-3 px-4 border flex items-center gap-3 text-sm font-semibold transition-all cursor-pointer interactive-btn text-left ${
                character.gold >= 25 
                  ? 'bg-card-bg hover:bg-primary/5 text-text-main hover:text-text-heading border-card-border hover:border-primary/50' 
                  : 'opacity-40 border-card-border text-text-sub cursor-not-allowed'
              }`}
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <Gift size={16} className="text-primary" />
              <div>
                <p>Present Gift</p>
                <p className="text-[10px] text-text-sub font-light">Costs 25 G • Boost affinity</p>
              </div>
            </button>

            {/* Insult Action */}
            <button
              onClick={() => interactWithRelation(selectedRelation.id, 'insult')}
              className="py-3 px-4 bg-card-bg hover:bg-rose-500/5 text-text-main hover:text-text-heading border border-card-border hover:border-rose-500/30 flex items-center gap-3 text-sm font-semibold transition-all cursor-pointer interactive-btn text-left"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <HeartCrack size={16} className="text-rose-500" />
              <div>
                <p>Insult relative</p>
                <p className="text-[10px] text-text-sub font-light">Free • Insult them</p>
              </div>
            </button>

            {/* Propose marriage (Friends only) */}
            {selectedRelation.type === 'friend' && (
              <button
                onClick={() => interactWithRelation(selectedRelation.id, 'propose')}
                className="py-3 px-4 bg-card-bg hover:bg-primary/5 text-text-main hover:text-text-heading border border-card-border hover:border-primary flex items-center gap-3 text-sm font-semibold transition-all cursor-pointer interactive-btn text-left"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <HeartHandshake size={16} className="text-primary animate-pulse" />
                <div>
                  <p>Propose Marriage</p>
                  <p className="text-[10px] text-text-sub font-light">Reqs: 75% affinity</p>
                </div>
              </button>
            )}

            {/* Ask parent for gold */}
            {selectedRelation.type === 'parent' && (
              <button
                onClick={() => interactWithRelation(selectedRelation.id, 'ask_gold')}
                className="py-3 px-4 bg-card-bg hover:bg-primary/5 text-text-main hover:text-text-heading border border-card-border hover:border-primary flex items-center gap-3 text-sm font-semibold transition-all cursor-pointer interactive-btn text-left"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <DollarSign size={16} className="text-primary" />
                <div>
                  <p>Ask for Gold</p>
                  <p className="text-[10px] text-text-sub font-light">Yields gold if liked</p>
                </div>
              </button>
            )}
          </div>

          {/* Back button */}
          <button
            onClick={() => setSelectedRelation(null)}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-all cursor-pointer interactive-btn uppercase tracking-wider"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            Go Back
          </button>
        </div>
      )}

    </div>
  );
};
export default RelationshipsScreen;
