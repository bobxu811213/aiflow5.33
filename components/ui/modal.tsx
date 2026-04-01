
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  className?: string;
  footer?: React.ReactNode;
  padding?: string;
  noContentPadding?: boolean;
  zIndex?: string;
  aside?: React.ReactNode;
  scrollable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'w-[600px]',
  className = '',
  footer,
  padding = 'p-4',
  noContentPadding = false,
  zIndex = 'z-50',
  aside,
  scrollable = true
}) => {
  const { aiSidebarOpen, aiMode } = useAppStore();
  const isSidebarOpen = aiSidebarOpen && aiMode === 'sidebar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out`} style={{ paddingRight: isSidebarOpen ? '380px' : '0' }}>
      {/* Backdrop click handler to close if needed, but for complex forms we often disable backdrop close to prevent data loss, keeping it simple here as per req */}
      <div 
        className={`bg-white rounded-lg shadow-xl flex max-h-[90vh] max-w-[95vw] ${width} ${className} animate-in fade-in zoom-in-95 duration-200 overflow-hidden`}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-800 flex-1">{title}</h3>
              {/* Optional Close X */}
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} />
              </button> 
              </div>
          )}
          
          <div className={`flex-1 ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'} ${noContentPadding ? 'p-0' : 'p-6'} scrollbar-hide flex flex-col min-h-0`}>
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg flex justify-end gap-3 shrink-0">
              {footer}
            </div>
          )}
        </div>
        
        {aside && (
          <div className="shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col">
            {aside}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
