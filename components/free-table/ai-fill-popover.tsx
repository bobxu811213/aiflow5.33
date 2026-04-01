
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Loader2, X } from 'lucide-react';

interface FieldOption {
  key: string;
  label: string;
}

interface AiFillPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  columnLabel: string;
  isGenerating: boolean;
  availableFields?: FieldOption[];
  selectedCount?: number; // Added prop
}

export const AiFillPopover: React.FC<AiFillPopoverProps> = ({ 
    anchorEl, 
    onClose, 
    onGenerate, 
    columnLabel, 
    isGenerating,
    availableFields = [],
    selectedCount = 0
}) => {
  const [prompt, setPrompt] = useState('');
  const [position, setPosition] = useState<{top: number, left: number} | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (anchorEl) {
      const updatePosition = () => {
        const rect = anchorEl.getBoundingClientRect();
        
        // Position below the cell
        let top = rect.bottom + window.scrollY + 12;
        let left = rect.left + window.scrollX - 8;

        // Simple boundary check (optional, but good for UX)
        // If too far right, shift left
        if (left + 320 > window.innerWidth) {
            left = window.innerWidth - 330;
        }

        setPosition({ top, left });
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      }
    }
  }, [anchorEl]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && anchorEl && !anchorEl.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [anchorEl, onClose]);

  // Reset prompt when anchor changes
  useEffect(() => {
      if (anchorEl) setPrompt('');
  }, [anchorEl]);

  const insertVariable = (label: string) => {
      const textToInsert = `[${label}]`;
      const textarea = textareaRef.current;
      if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = prompt;
          const newText = text.substring(0, start) + textToInsert + text.substring(end);
          setPrompt(newText);
          
          // Use setTimeout to ensure the render cycle completes before setting focus/selection
          setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
          }, 0);
      } else {
          setPrompt(prev => prev + textToInsert);
      }
  };

  if (!anchorEl || !position) return null;

  return createPortal(
    <div
      ref={popoverRef}
      style={{ top: position.top, left: position.left }}
      className="fixed z-[9999] w-[320px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 p-4 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
    >
       {/* Arrow pointing up */}
       <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

       <div className="relative z-10">
           <div className="flex justify-between items-start mb-3">
              <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#927FFF]">
                      <div className="relative flex items-center justify-center">
                        <Sparkles size={16} fill="currentColor" className="opacity-20" />
                        <Sparkles size={16} className="absolute" />
                      </div>
                      <span>AI 智能填充</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span className="font-medium text-gray-800">{columnLabel}</span>
                      {selectedCount > 0 && (
                          <span className="bg-[#F4F2FF] text-[#6265F0] px-1.5 py-0.5 rounded text-[10px]">已选 {selectedCount} 项</span>
                      )}
                  </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                  <X size={14} />
              </button>
           </div>

           <div className="space-y-2">
               {availableFields.length > 0 && (
                   <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] text-gray-400 py-1 flex items-center">插入变量:</span>
                       {availableFields.filter(f => f.label !== columnLabel).map(f => (
                           <button
                               key={f.key}
                               onClick={() => insertVariable(f.label)}
                               disabled={isGenerating}
                               className="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-200 rounded hover:border-[#927FFF] hover:text-[#927FFF] transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                               {f.label}
                           </button>
                       ))}
                   </div>
               )}
               
               <textarea
                   ref={textareaRef}
                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#927FFF] focus:ring-2 focus:ring-[#927FFF]/10 resize-none h-24 transition-all placeholder:text-gray-400 bg-gray-50/50 focus:bg-white leading-relaxed"
                   placeholder="您可以输入具体的生成要求（例如：“语气委婉一点”、“强调价格谈判”），或者直接点击生成..."
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   autoFocus
                   disabled={isGenerating}
               />
               <button
                   onClick={() => onGenerate(prompt)}
                   disabled={isGenerating}
                   className="w-full py-2 bg-[#927FFF] hover:bg-[#7466CC] text-white rounded-lg text-xs font-medium shadow-md shadow-[#927FFF]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98]"
               >
                   {isGenerating ? (
                       <>
                           <Loader2 size={14} className="animate-spin" />
                           正在思考生成中...
                       </>
                   ) : (
                       <>
                           <Sparkles size={14} />
                           开始生成
                       </>
                   )}
               </button>
           </div>
       </div>
    </div>,
    document.body
  );
};
