
import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingToolbarProps {
  onAiClick: () => void;
  className?: string;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ onAiClick, className = '' }) => {
  return (
    <div className={`absolute bottom-8 right-8 flex flex-col space-y-3 z-30 ${className}`}>
        <button 
            className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-white relative transition-transform hover:scale-105 bg-gradient-to-br from-[#E16AF3] to-[#6265F0] hover:shadow-xl"
            onClick={onAiClick}
            title="AI 助手"
        >
            <Sparkles size={20} className="text-white" />
        </button>
    </div>
  );
};
