import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = "请选择", className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const dropdown = document.getElementById(`dropdown-${placeholder}`);
        if (dropdown && dropdown.contains(event.target as Node)) {
            return;
        }
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
        if (isOpen) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen, placeholder]);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative w-full border rounded px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-all duration-200 bg-white ${
          isOpen ? 'border-[#15B8A6] ring-1 ring-[#15B8A6] shadow-sm' : 'border-gray-300 hover:border-[#15B8A6]'
        } ${className}`}
        onClick={handleToggle}
      >
        <span className={`truncate ${value ? "text-gray-900" : "text-gray-400"}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && createPortal(
        <div
          id={`dropdown-${placeholder}`}
          className="fixed z-[9999] bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 custom-scrollbar"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
          }}
        >
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option}
                className={`px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                  value === option 
                    ? 'bg-teal-50 text-[#15B8A6] font-medium' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#15B8A6]'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
            {options.length === 0 && (
                <div className="px-3 py-2.5 text-sm text-gray-400 text-center">暂无选项</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
