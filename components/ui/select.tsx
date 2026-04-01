import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = '请选择',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className={`
          flex items-center justify-between w-full border rounded px-3 py-1.5 text-sm h-[32px] transition-colors
          ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'bg-white cursor-pointer hover:border-primary'}
          ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-gray-300'}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center">
            {selectedOption && !disabled && (
                <X 
                    size={14} 
                    className="text-gray-400 hover:text-gray-600 mr-1 cursor-pointer" 
                    onClick={clearSelection}
                />
            )}
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto py-1">
          {/* Placeholder Option */}
          <div
            className={`
              px-3 py-2 text-sm cursor-pointer flex items-center gap-2
              ${!value ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}
            `}
            onClick={() => handleSelect('')}
          >
            {/* Checkmark only if selected */}
            {!value && <Check size={14} />}
            <span className={!value ? 'ml-0' : 'ml-6'}>{placeholder}</span>
          </div>

          {/* Options */}
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                px-3 py-2 text-sm cursor-pointer flex items-center gap-2
                ${option.value === value ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}
              `}
              onClick={() => handleSelect(option.value)}
            >
               {option.value === value && <Check size={14} />}
               <span className={option.value === value ? 'ml-0' : 'ml-6'}>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
