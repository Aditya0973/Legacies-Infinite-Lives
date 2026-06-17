import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { MainMenu } from './components/MainMenu';
import { NewLife } from './components/NewLife';
import { CharacterScreen } from './components/CharacterScreen';

const AppContent: React.FC = () => {
  const { activeExpansion, isPlaying } = useGame();
  const [view, setView] = useState<'menu' | 'new_life' | 'game'>('menu');

  // Synchronize view with active playing state from context (for saves loading)
  useEffect(() => {
    if (isPlaying) {
      setView('game');
    } else {
      setView('menu');
    }
  }, [isPlaying]);

  // Dynamically set CSS variables on the root document based on active expansion theme
  useEffect(() => {
    const root = document.documentElement;
    const theme = activeExpansion.theme;

    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-hover', theme.primaryHover);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--theme-bg-start', theme.bgStart);
    root.style.setProperty('--theme-bg-end', theme.bgEnd);
    root.style.setProperty('--panel-bg', theme.panelBg);
    root.style.setProperty('--panel-border', theme.panelBorder);
    root.style.setProperty('--font-game-title', theme.fontTitle);
    root.style.setProperty('--font-game-body', theme.fontBody);
    root.style.setProperty('--primary-glow', theme.primaryGlow);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-sub', theme.textSub);
    root.style.setProperty('--text-heading', theme.textHeading);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--card-border', theme.cardBorder);
    root.style.setProperty('--border-radius', theme.borderRadius);

    // Update body background
    document.body.style.background = `radial-gradient(circle at top, ${theme.bgStart}, ${theme.bgEnd})`;
  }, [activeExpansion]);

  const renderView = () => {
    switch (view) {
      case 'new_life':
        return <NewLife onBackClick={() => setView('menu')} />;
      case 'game':
        return <CharacterScreen />;
      default:
        return <MainMenu onStartNewLifeClick={() => setView('new_life')} />;
    }
  };

  return (
    <div className={`flex-1 flex flex-col justify-between w-full ${view === 'game' ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-screen'}`}>
      {/* Top spacing / layout */}
      <main className={`flex-1 flex flex-col ${view === 'game' ? 'h-full justify-center items-center py-0 px-0 overflow-hidden' : 'justify-center items-center py-6'}`}>
        {renderView()}
      </main>

      {/* Footer Branding */}
      {view !== 'game' && (
        <footer className="w-full text-center py-4 border-t border-white/5 bg-black/20 text-slate-500 text-xs font-sans">
          © 2026 Legacies Simulators Inc. All rights reserved.
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
