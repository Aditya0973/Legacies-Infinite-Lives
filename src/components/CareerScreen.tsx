import React from 'react';
import { useGame } from '../context/GameContext';
import type { Career, StatName } from '../types/game';
import { ArrowLeft, Briefcase, Coins, TrendingUp, XCircle } from 'lucide-react';

interface CareerScreenProps {
  onBack: () => void;
}

export const CareerScreen: React.FC<CareerScreenProps> = ({ onBack }) => {
  const { character, activeExpansion, applyForJob, workHard, resignJob } = useGame();

  if (!character) return null;

  const meetsRequirements = (job: Career): boolean => {
    if (job.requirements.minAge && character.age < job.requirements.minAge) {
      return false;
    }
    if (job.requirements.minStats) {
      for (const [stat, val] of Object.entries(job.requirements.minStats)) {
        if (character.stats[stat as StatName] < (val || 0)) {
          return false;
        }
      }
    }
    if (job.requirements.requiredCareerId && character.career?.id !== job.requirements.requiredCareerId) {
      return false;
    }
    return true;
  };

  const getRequirementsText = (job: Career): string => {
    const items: string[] = [];
    if (job.requirements.minAge) {
      items.push(`Age ${job.requirements.minAge}+`);
    }
    if (job.requirements.minStats) {
      for (const [stat, val] of Object.entries(job.requirements.minStats)) {
        const label = activeExpansion.statLabels[stat as StatName] || stat;
        items.push(`${label} ${val}%+`);
      }
    }
    if (job.requirements.requiredCareerId) {
      const prevJobTitle = activeExpansion.careers.find(c => c.id === job.requirements.requiredCareerId)?.title || 'Previous Career';
      items.push(`Promotion: ${prevJobTitle}`);
    }
    return items.length > 0 ? `Requires: ${items.join(', ')}` : 'Entry Level';
  };

  const getPerfColor = (val: number): string => {
    if (val >= 80) return 'bg-emerald-600';
    if (val >= 50) return 'bg-sky-600';
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
          Vocation Board
        </h3>
      </div>

      {/* If Employed */}
      {character.career ? (
        <div className="space-y-6">
          <div 
            className="bg-card-bg rounded-xl p-5 border border-primary/20 space-y-4"
            style={{ borderRadius: activeExpansion.theme.borderRadius }}
          >
            <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20 block w-max">
              Active Trade
            </span>
            
            <div>
              <h4 className="text-2xl font-extrabold text-text-heading flex items-center gap-2">
                <Briefcase size={22} className="text-primary" />
                <span>{character.career.title}</span>
              </h4>
              <p className="text-text-sub text-sm mt-1.5 flex items-center gap-1.5">
                <Coins size={14} className="text-primary" />
                <span>Yearly Salary: <strong className="text-text-heading font-black">{character.career.salary} Gold</strong></span>
              </p>
            </div>

            {/* Performance Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-sub">Vocation Performance</span>
                <span className="text-text-main">{character.career.performance}%</span>
              </div>
              <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden border border-card-border">
                <div 
                  className={`h-full ${getPerfColor(character.career.performance)}`}
                  style={{ width: `${character.career.performance}%` }}
                />
              </div>
              <p className="text-[10px] text-text-sub opacity-70 leading-normal italic">
                Performance below 15% results in sudden termination.
              </p>
            </div>
          </div>

          {/* Vocation Controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={character.yearlyActions?.workedHard}
              onClick={workHard}
              className={`py-4 rounded-xl text-base font-bold shadow-md flex items-center justify-center gap-2 uppercase tracking-wider ${
                character.yearlyActions?.workedHard
                  ? 'bg-black/10 text-text-sub border border-card-border cursor-not-allowed opacity-60'
                  : 'bg-primary hover:bg-primary-hover text-white cursor-pointer interactive-btn'
              }`}
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <TrendingUp size={16} />
              <span>{character.yearlyActions?.workedHard ? 'Worked' : 'Work Hard'}</span>
            </button>

            <button
              onClick={resignJob}
              className="py-4 bg-card-bg hover:bg-rose-500/5 text-text-main hover:text-text-heading rounded-xl text-base font-bold border border-card-border hover:border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer interactive-btn uppercase tracking-wider"
              style={{ borderRadius: activeExpansion.theme.borderRadius }}
            >
              <XCircle size={16} className="text-rose-500" />
              <span>Resign</span>
            </button>
          </div>
        </div>
      ) : (
        /* If Unemployed: Job board */
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <span className="text-xs font-bold text-text-sub uppercase tracking-widest">Available Vocations</span>
          </div>

          <div className="space-y-3">
            {activeExpansion.careers.map(job => {
              const available = meetsRequirements(job);
              return (
                <div 
                  key={job.id}
                  className={`border rounded-xl p-4 flex flex-col justify-between gap-4 transition-all duration-200 ${
                    available 
                      ? 'bg-card-bg border-card-border hover:border-primary/50' 
                      : 'bg-black/5 border-card-border opacity-50'
                  }`}
                  style={{ borderRadius: activeExpansion.theme.borderRadius }}
                >
                  <div className="text-left">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-base text-text-heading">{job.title}</h5>
                      <span className="text-sm font-black text-primary flex items-center gap-1">
                        <Coins size={12} />
                        {job.salary} G/yr
                      </span>
                    </div>
                    <p className="text-xs text-text-sub mt-1.5 font-light leading-relaxed">{job.description}</p>
                    <p className="text-[10px] text-text-sub font-bold mt-2 font-sans">{getRequirementsText(job)}</p>
                  </div>

                  <button
                    disabled={!available}
                    onClick={() => applyForJob(job)}
                    className={`w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer interactive-btn ${
                      available 
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-sm' 
                        : 'bg-card-bg border border-card-border text-text-sub cursor-not-allowed'
                    }`}
                    style={{ borderRadius: activeExpansion.theme.borderRadius }}
                  >
                    Apply for Position
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
