
import React from 'react';

// Helper to format file size
export const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Common Header Components
export const HeaderActionBtn = ({ onClick, icon: Icon, title, className = '', active = false, disabled = false }: any) => (
    <button 
        onClick={disabled ? undefined : onClick} 
        disabled={disabled}
        className={`p-1.5 rounded-md transition-colors ${active ? 'text-primary bg-primary-light' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}`}
        title={title}
    >
        <Icon size={18} />
    </button>
);

export const HeaderSeparator = () => <div className="w-px h-4 bg-gray-200 mx-2"></div>;
