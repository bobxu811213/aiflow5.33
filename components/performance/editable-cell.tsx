import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface EditableCellProps {
  value: string | number;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: 'text' | 'number' | 'textarea';
  className?: string;
  suffix?: string;
  placeholder?: string;
  isAiModified?: boolean;
  aiIssue?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({ 
    value, onChange, onBlur, type = 'text', className = '', suffix, placeholder, isAiModified, aiIssue 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
        if (type === 'textarea' && textareaRef.current) {
            textareaRef.current.focus();
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
    }
  }, [isEditing, type]);

  const handleBlur = () => {
    setIsEditing(false);
    onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      setIsEditing(false);
      onBlur();
    }
  };

  const isTextarea = type === 'textarea';

  return (
    <div 
        className={`w-full h-full flex ${isTextarea ? 'items-start py-2' : 'items-center'} min-h-[32px] cursor-text group relative ${className}`}
        onClick={(e) => {
            setIsEditing(true);
        }}
    >
        {isEditing ? (
             <div className={`relative w-full ${isTextarea ? 'h-full' : ''}`}>
                 {isTextarea ? (
                     <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full h-full border border-primary rounded px-2 py-1 text-sm outline-none bg-white shadow-sm z-10 resize-none block leading-relaxed"
                        placeholder={placeholder}
                     />
                 ) : (
                    <div className="flex items-center w-full relative">
                        <input
                            ref={inputRef}
                            type={type}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-full border border-primary rounded px-2 py-1 text-sm outline-none bg-white shadow-sm z-10"
                            placeholder={placeholder}
                        />
                        {suffix && <span className="absolute right-2 text-gray-400 text-xs pointer-events-none z-20">{suffix}</span>}
                    </div>
                 )}
             </div>
        ) : (
             <div className={`flex-1 px-2 py-1 text-sm text-gray-800 border rounded transition-all duration-500 relative flex w-full ${isTextarea ? 'items-start h-full' : 'items-center truncate'}
                 ${isAiModified 
                    ? 'border-[#927FFF] bg-[#F4F2FF] shadow-[0_0_8px_rgba(146,127,255,0.2)]' 
                    : aiIssue 
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-transparent hover:border-gray-300'}
             `}>
                 {isAiModified && (
                    <div className="absolute right-1 top-1 z-10 animate-pulse">
                        <Sparkles size={12} className="text-[#927FFF] fill-[#927FFF]/20" />
                    </div>
                 )}
                 {aiIssue && !isAiModified && (
                    <div className="absolute right-1 top-1 z-10 group/issue">
                        <AlertCircle size={12} className="text-orange-500 fill-orange-100" />
                        <div className="absolute right-0 top-5 w-48 bg-white border border-orange-200 shadow-xl rounded-md p-3 text-xs text-gray-600 hidden group-hover/issue:block z-50 animate-in fade-in zoom-in-95 duration-200">
                             <div className="font-bold text-orange-500 mb-1 flex items-center gap-1">
                                 <Sparkles size={10} /> AI 建议优化
                             </div>
                             <div className="leading-relaxed">{aiIssue}</div>
                             <div className="absolute -top-1.5 right-1 w-3 h-3 bg-white border-t border-l border-orange-200 transform rotate-45"></div>
                        </div>
                    </div>
                 )}
                 {isTextarea ? (
                     <div className="w-full h-full overflow-y-auto whitespace-pre-wrap leading-relaxed pr-1 scrollbar-hide text-justify">
                         <span className={!value ? 'text-gray-400' : ''}>
                             {value || placeholder || '-'}
                         </span>
                     </div>
                 ) : (
                     <div className="flex items-center w-full overflow-hidden">
                        <span className={`${!value ? 'text-gray-400' : ''} truncate block`}>
                            {value || placeholder || '-'}
                        </span>
                        {suffix && value && <span className="ml-0.5 text-gray-500 shrink-0">{suffix}</span>}
                     </div>
                 )}
             </div>
        )}
    </div>
  );
};