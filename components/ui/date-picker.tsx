
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showIcon?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  inputClassName = '', 
  showIcon = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Controls the position of the portal
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Parsing initial value or defaulting to today for view
  const initialDate = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(initialDate); // Controls which month is shown
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setViewDate(new Date(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const today = new Date();

  // Close when clicking outside of both the input and the dropdown portal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current && 
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update position when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
        const updatePosition = () => {
             const rect = containerRef.current?.getBoundingClientRect();
             if (rect) {
                 setPosition({
                     top: rect.bottom + window.scrollY,
                     left: rect.left + window.scrollX
                 });
             }
        };
        updatePosition();
        
        // Close dropdown on scroll to prevent it from detaching from input (simple solution)
        const handleScroll = (e: Event) => {
             // If scrolling inside the dropdown itself, don't close
             if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
                 return;
             }
             setIsOpen(false);
        };
        
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', updatePosition);
        
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', updatePosition);
        }
    }
  }, [isOpen]);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon

  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Adjust for Monday start (0=Sun -> 6, 1=Mon -> 0)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // Previous month filler
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false, date: new Date(year, month - 1, prevMonthDays - i) });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true, date: new Date(year, month, i) });
    }

    // Next month filler
    const remaining = 42 - days.length; // 6 rows * 7 cols
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, currentMonth: false, date: new Date(year, month + 1, i) });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const changeMonth = (delta: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  const changeYear = (delta: number) => {
    setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1));
  };

  const isSelected = (date: Date) => {
    return selectedDate && 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Portal Content
  const dropdownContent = (
    <div 
        ref={dropdownRef}
        style={{ top: position.top, left: position.left }}
        className="fixed z-[60] mt-1 bg-white rounded-lg shadow-xl border border-gray-100 p-4 w-[320px] animate-in fade-in zoom-in-95 duration-100"
    >
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex space-x-1 text-gray-400 hover:text-gray-600">
                <button onClick={() => changeYear(-1)} className="hover:text-primary p-1"><ChevronsLeft size={18} /></button>
                <button onClick={() => changeMonth(-1)} className="hover:text-primary p-1"><ChevronLeft size={18} /></button>
            </div>
            <div className="font-medium text-lg text-gray-800">
              {viewDate.getFullYear()}年 {viewDate.getMonth() + 1}月
            </div>
             <div className="flex space-x-1 text-gray-400 hover:text-gray-600">
                <button onClick={() => changeMonth(1)} className="hover:text-primary p-1"><ChevronRight size={18} /></button>
                <button onClick={() => changeYear(1)} className="hover:text-primary p-1"><ChevronsRight size={18} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2 text-center">
            {['一', '二', '三', '四', '五', '六', '日'].map(d => (
              <div key={d} className="text-sm text-gray-800 font-medium py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {generateCalendarDays().map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleDateClick(item.date)}
                className={`
                  h-10 w-10 flex items-center justify-center text-sm rounded mx-auto transition-colors
                  ${!item.currentMonth ? 'text-gray-300' : 'text-gray-800 hover:bg-gray-100'}
                  ${isSelected(item.date) ? 'border border-primary text-gray-800 font-medium shadow-sm' : ''}
                `}
              >
                {item.day}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-3 pt-3 text-center">
            <button 
                onClick={() => {
                    const now = new Date();
                    handleDateClick(now);
                    setViewDate(now);
                }}
                className="text-primary hover:text-primary-hover text-sm font-medium"
            >
                今天
            </button>
          </div>
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          readOnly
          value={value || ''}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary cursor-pointer bg-white ${inputClassName}`}
        />
        {showIcon && <CalendarIcon size={16} className="absolute right-3 top-2 text-gray-400 group-hover:text-primary" />}
      </div>

      {isOpen && createPortal(dropdownContent, document.body)}
    </div>
  );
};
