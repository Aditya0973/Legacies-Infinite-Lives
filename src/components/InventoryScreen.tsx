import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Coins, Home, Landmark, ShieldAlert } from 'lucide-react';

interface InventoryScreenProps {
  onBack: () => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({ onBack }) => {
  const { character, activeExpansion, buyItem } = useGame();
  const [subTab, setSubTab] = useState<'shop' | 'owned'>('owned');

  if (!character) return null;

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'property': return <Home size={16} className="text-primary" />;
      case 'business': return <Landmark size={16} className="text-primary" />;
      default: return <Coins size={16} className="text-primary" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans" style={{ color: 'var(--text-main)' }}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border pb-3">
        <div className="flex items-center gap-3">
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
            Estates & Treasury
          </h3>
        </div>
      </div>

      {/* Sub Tabs Selector */}
      <div className="grid grid-cols-2 gap-2 border border-card-border bg-black/10 p-1 font-sans" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
        <button
          onClick={() => setSubTab('owned')}
          className={`py-2 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            subTab === 'owned' 
              ? 'bg-primary text-white shadow-sm font-extrabold' 
              : 'text-text-sub hover:text-text-main'
          }`}
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          Vault Holdings ({character.inventory.length})
        </button>
        <button
          onClick={() => setSubTab('shop')}
          className={`py-2 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            subTab === 'shop' 
              ? 'bg-primary text-white shadow-sm font-extrabold' 
              : 'text-text-sub hover:text-text-main'
          }`}
          style={{ borderRadius: activeExpansion.theme.borderRadius }}
        >
          Treasury Shop
        </button>
      </div>

      {/* Vault Holdings (Owned Items) */}
      {subTab === 'owned' && (
        <div className="space-y-3">
          {character.inventory.length > 0 ? (
            character.inventory.map(item => (
              <div 
                key={item.id}
                className="bg-card-bg border border-card-border p-4 flex justify-between items-center"
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    {getItemIcon(item.type)}
                    <h5 className="font-bold text-base text-text-heading">{item.name}</h5>
                  </div>
                  <p className="text-xs text-text-sub mt-1 font-light leading-relaxed">{item.description}</p>
                </div>
                
                <div className="text-right flex-shrink-0 font-sans">
                  {item.income > 0 ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                      +{item.income} G/yr
                    </span>
                  ) : item.income < 0 ? (
                    <span className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                      {item.income} G/yr
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-text-sub bg-black/5 border border-card-border px-2.5 py-1 rounded" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                      Passive Asset
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-card-bg border border-dashed border-card-border rounded-xl" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
              <ShieldAlert size={32} className="text-text-sub opacity-60 mx-auto mb-2" />
              <p className="text-text-sub text-sm italic font-serif">Your vault is currently empty.</p>
              <p className="text-[10px] text-text-sub opacity-80 mt-1">Accumulate wealth to acquire castles, forges, or warhorses.</p>
            </div>
          )}
        </div>
      )}

      {/* Treasury Shop (Buy Items) */}
      {subTab === 'shop' && (
        <div className="space-y-3">
          {activeExpansion.itemPool.map((item, idx) => {
            const propertyCount = character.inventory.filter(i => i.type === 'property').length;
            const businessCount = character.inventory.filter(i => i.type === 'business').length;
            const isPropertyLimit = item.type === 'property' && propertyCount >= 3;
            const isBusinessLimit = item.type === 'business' && businessCount >= 2;
            const limitReached = isPropertyLimit || isBusinessLimit;
            const affordable = character.gold >= item.cost;
            const canAcquire = affordable && !limitReached;

            return (
              <div 
                key={idx}
                className={`border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                  canAcquire 
                    ? 'bg-card-bg border-card-border hover:border-primary/50' 
                    : 'bg-black/5 border-card-border opacity-50'
                }`}
                style={{ borderRadius: activeExpansion.theme.borderRadius }}
              >
                <div className="text-left flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    {getItemIcon(item.type)}
                    <h5 className="font-bold text-base text-text-heading">{item.name}</h5>
                    <span className="text-[9px] font-bold text-primary uppercase tracking-wide bg-primary/10 px-1.5 py-0.5 border border-primary/20 capitalize font-sans" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
                      {item.type} {item.type === 'property' ? `(${propertyCount}/3)` : item.type === 'business' ? `(${businessCount}/2)` : ''}
                    </span>
                  </div>
                  <p className="text-xs text-text-sub mt-1.5 font-light leading-relaxed">{item.description}</p>
                  
                  {/* Yield indicator */}
                  <div className="mt-2 text-xs font-sans font-bold">
                    {item.income > 0 ? (
                      <span className="text-emerald-600">Yield: +{item.income} Gold/yr</span>
                    ) : item.income < 0 ? (
                      <span className="text-rose-500">Upkeep: {item.income} Gold/yr</span>
                    ) : (
                      <span className="text-text-sub">No yearly upkeep</span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 justify-between">
                  <span className="text-base font-black text-primary font-sans flex items-center gap-1">
                    <Coins size={14} />
                    {item.cost} G
                  </span>
                  
                  <button
                    disabled={!canAcquire}
                    onClick={() => buyItem(item)}
                    className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider cursor-pointer interactive-btn ${
                      canAcquire 
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-sm' 
                        : 'bg-card-bg border border-card-border text-text-sub cursor-not-allowed opacity-50'
                    }`}
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    {limitReached ? 'Limit Reached' : 'Acquire'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
export default InventoryScreen;
