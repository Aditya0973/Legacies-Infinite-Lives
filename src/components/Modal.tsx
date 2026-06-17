import React from 'react';
import { X } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true
}) => {
  const { activeExpansion } = useGame();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal box */}
      <div 
        className="relative w-full max-w-lg glass-panel overflow-hidden shadow-2xl z-10 border flex flex-col transform transition-all duration-300 animate-in fade-in zoom-in-95"
        style={{
          '--panel-border': activeExpansion.theme.panelBorder,
          '--panel-bg': activeExpansion.theme.panelBg,
          borderRadius: activeExpansion.theme.borderRadius,
          color: 'var(--text-main)'
        } as React.CSSProperties}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border bg-black/5">
          <h3 
            className="text-xl font-bold text-glow text-text-heading"
            style={{ 
              fontFamily: activeExpansion.theme.fontTitle,
              '--primary': activeExpansion.theme.primary,
              '--primary-glow': activeExpansion.theme.primaryGlow
            } as React.CSSProperties}
          >
            {title}
          </h3>
          {showCloseButton && onClose && (
            <button 
              onClick={onClose}
              className="text-text-sub hover:text-text-heading transition-colors duration-150 p-1 rounded hover:bg-card-bg cursor-pointer interactive-btn"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Body content */}
        <div 
          className="p-6 overflow-y-auto max-h-[75vh]"
          style={{ fontFamily: activeExpansion.theme.fontBody }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
