import React from 'react';
import { useGame } from '../context/GameContext';
import { Skull, Award, Coins, Heart, User } from 'lucide-react';

export const DynastySelectModal: React.FC = () => {
  const { character, activeExpansion, lineage, selectHeirAndContinue, quitToMenu } = useGame();

  if (!character || !character.isDead) return null;

  // Filter children who are alive to inherit
  const heirs = character.relationships.filter(
    r => r.type === 'child' && r.status === 'alive'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-lg animate-fade-in" />

      {/* Somber Obituary Card */}
      <div 
        className="relative w-full max-w-xl glass-panel overflow-hidden shadow-2xl z-10 border flex flex-col transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
        style={{
          '--panel-border': 'rgba(239, 68, 68, 0.4)', // Red tint for death
          '--panel-bg': activeExpansion.theme.panelBg,
          '--primary': activeExpansion.theme.primary,
          '--accent': activeExpansion.theme.accent,
          '--font-title': activeExpansion.theme.fontTitle,
          '--font-body': activeExpansion.theme.fontBody,
          borderRadius: activeExpansion.theme.borderRadius,
          color: 'var(--text-main)'
        } as React.CSSProperties}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-red-800 via-red-500 to-red-800 animate-pulse" />

        <div className="p-8 flex-1 flex flex-col justify-between" style={{ fontFamily: activeExpansion.theme.fontBody }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-red-500/10 border border-red-500/35 rounded-full mb-4 text-red-600 animate-bounce">
              <Skull size={40} />
            </div>
            
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-text-heading tracking-wide mb-2" style={{ fontFamily: activeExpansion.theme.fontTitle }}>
              OBITUARY
            </h2>
            
            <p className="text-lg text-primary font-sans tracking-widest uppercase font-black">
              {character.name} {character.dynastyName}
            </p>
            
            <p className="text-text-sub font-sans mt-1">
              Generation {lineage.length + 1} • Age {character.age}
            </p>
          </div>

          {/* Stats Summary */}
          <div 
            className="bg-card-bg rounded-xl p-6 border border-card-border space-y-4 font-sans mb-8"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <p className="text-lg text-text-main text-center italic mb-4 leading-relaxed font-light">
              "{character.deathReason || 'Passed away into history.'}"
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 bg-black/5 p-3 border border-card-border" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                <Coins className="text-primary" size={18} />
                <div>
                  <p className="text-text-sub text-xs font-bold">Total Wealth</p>
                  <p className="text-text-heading font-black text-base">{character.gold} G</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/5 p-3 border border-card-border" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                <Award className="text-primary" size={18} />
                <div>
                  <p className="text-text-sub text-xs font-bold">Highest Title</p>
                  <p className="text-text-heading font-black text-base truncate max-w-[100px]">{character.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/5 p-3 border border-card-border" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                <Heart className="text-primary" size={18} />
                <div>
                  <p className="text-text-sub text-xs font-bold">Family Status</p>
                  <p className="text-text-heading font-black text-base">
                    {character.relationships.filter(r => r.status === 'alive').length} Allies
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/5 p-3 border border-card-border" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                <User className="text-primary" size={18} />
                <div>
                  <p className="text-text-sub text-xs font-bold">Career Rank</p>
                  <p className="text-text-heading font-black text-base truncate max-w-[100px]">
                    {character.career?.title || 'None'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Heir Selection Area */}
          <div className="font-sans">
            {heirs.length > 0 ? (
              <div>
                <h3 className="text-base font-black text-text-heading mb-4 border-b border-card-border pb-1.5 text-center uppercase tracking-wide">
                  Select an Heir to Continue the Dynasty
                </h3>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {heirs.map(child => (
                    <button
                      key={child.id}
                      onClick={() => selectHeirAndContinue(child.id)}
                      className="w-full bg-card-bg border border-card-border hover:border-primary hover:bg-primary/5 text-text-main p-4 flex items-center justify-between transition-all duration-200 cursor-pointer interactive-btn text-left"
                      style={{ borderRadius: activeExpansion.theme.borderRadius }}
                    >
                      <div>
                        <p className="font-bold text-base text-text-heading">{child.name}</p>
                        <p className="text-xs text-text-sub mt-0.5">Age: {child.age} years old</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-sub font-semibold bg-black/5 px-3 py-1.5 rounded-full border border-card-border">
                        <Heart size={12} className="text-primary fill-primary/30" />
                        <span>Affection: {child.relationship}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-rose-500/5 border border-rose-500/10 rounded-xl" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                <h3 className="text-md font-bold text-rose-500 uppercase mb-2">Dynasty Terminated</h3>
                <p className="text-text-sub text-sm leading-relaxed">
                  You did not leave any surviving heirs to inherit your wealth and estates. 
                  Your lineage is lost to the sands of time.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 font-sans">
            <button
              onClick={quitToMenu}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold border border-white/10 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer interactive-btn uppercase tracking-wider text-sm"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <span>Return to Main Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DynastySelectModal;
