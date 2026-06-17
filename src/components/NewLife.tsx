import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import type { Gender } from '../types/game';
import { Dices, Play, ArrowLeft } from 'lucide-react';

interface NewLifeProps {
  onBackClick: () => void;
}

export const NewLife: React.FC<NewLifeProps> = ({ onBackClick }) => {
  const { activeExpansion, startNewLife } = useGame();

  const [firstName, setFirstName] = useState('');
  const [dynastyName, setDynastyName] = useState('');
  const [gender, setGender] = useState<Gender>('male');

  // Roll starting names on mount or gender change
  useEffect(() => {
    rollFirstName();
    rollSurname();
  }, [activeExpansion, gender]);

  const rollFirstName = () => {
    const firstList = gender === 'male' 
      ? activeExpansion.names.male 
      : gender === 'female' 
        ? activeExpansion.names.female 
        : [...activeExpansion.names.male, ...activeExpansion.names.female];
    const first = firstList[Math.floor(Math.random() * firstList.length)];
    setFirstName(first);
  };

  const rollSurname = () => {
    const lastList = activeExpansion.names.last;
    const last = lastList[Math.floor(Math.random() * lastList.length)];
    setDynastyName(last);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startNewLife(firstName, dynastyName, gender);
  };

  return (
    <div 
      className="flex-1 flex flex-col justify-center items-center py-8 px-4 max-w-2xl mx-auto w-full select-none"
      style={{
        '--primary': activeExpansion.theme.primary,
        '--primary-hover': activeExpansion.theme.primaryHover,
        '--accent': activeExpansion.theme.accent,
        '--primary-glow': activeExpansion.theme.primaryGlow,
        borderRadius: activeExpansion.theme.borderRadius
      } as React.CSSProperties}
    >
      <div className="w-full glass-panel p-8 shadow-2xl" style={{ color: 'var(--text-main)' }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBackClick}
            className="text-text-sub hover:text-text-heading p-2 rounded hover:bg-card-bg border border-transparent hover:border-card-border transition-all cursor-pointer interactive-btn"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 
            className="text-3xl font-extrabold text-text-heading text-glow"
            style={{ fontFamily: activeExpansion.theme.fontTitle }}
          >
            Spawn New Life
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          {/* Identity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-text-sub text-xs uppercase tracking-wider font-semibold">First Name</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 bg-black/10 text-text-main border border-card-border focus:border-primary rounded px-4 py-3 text-base focus:outline-none transition-colors font-medium"
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                />
                <button
                  type="button"
                  onClick={rollFirstName}
                  className="px-3.5 bg-card-bg border border-card-border hover:bg-primary/10 hover:border-primary text-text-sub hover:text-text-heading flex items-center justify-center transition-all cursor-pointer interactive-btn"
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                >
                  <Dices size={18} />
                </button>
              </div>
            </div>

            {/* Dynasty Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-text-sub text-xs uppercase tracking-wider font-semibold">Family Surname</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter dynasty"
                  value={dynastyName}
                  onChange={(e) => setDynastyName(e.target.value)}
                  className="flex-1 bg-black/10 text-text-main border border-card-border focus:border-primary rounded px-4 py-3 text-base focus:outline-none transition-colors font-medium"
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                />
                <button
                  type="button"
                  onClick={rollSurname}
                  className="px-3.5 bg-card-bg border border-card-border hover:bg-primary/10 hover:border-primary text-text-sub hover:text-text-heading flex items-center justify-center transition-all cursor-pointer interactive-btn"
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                >
                  <Dices size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Gender Buttons */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-sub text-xs uppercase tracking-wider font-semibold">Gender Identity</label>
            <div className="grid grid-cols-3 gap-3">
              {(['male', 'female', 'non-binary'] as Gender[]).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-3 border text-sm font-bold uppercase tracking-wider transition-all cursor-pointer interactive-btn ${
                    gender === g 
                      ? 'bg-primary/20 border-primary text-text-heading shadow-md font-extrabold' 
                      : 'bg-card-bg border-card-border text-text-sub hover:bg-card-bg hover:text-text-main'
                  }`}
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Summary birth explanation */}
          <div className="bg-card-bg border border-card-border p-4 text-center font-serif text-sm italic text-text-sub" style={{ borderRadius: activeExpansion.theme.borderRadius }}>
            * Your starting attributes, funds, and title will be decided by the random social background you are born into (e.g. Farmer, Merchant, Noble, or Royal family).
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer interactive-btn pulse-glow-btn mt-6"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <Play size={18} className="fill-white" />
            <span>Breathe Life</span>
          </button>

        </form>
      </div>
    </div>
  );
};
