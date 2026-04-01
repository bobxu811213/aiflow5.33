
import React from 'react';

export const ResumeSection = ({ title, children, className = '' }: { title: string, children?: React.ReactNode, className?: string }) => (
    <div className={`mb-4 ${className}`}>
        <div className="bg-[#F5F5F5] px-4 py-3 flex justify-between items-center rounded-sm mb-4">
            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
        </div>
        <div className="px-8 pb-4">
            {children}
        </div>
    </div>
);

export const ResumeField = ({ label, value, fullWidth = false }: { label: string, value: string, fullWidth?: boolean }) => (
    <div className={`flex text-sm mb-4 ${fullWidth ? 'w-full' : ''}`}>
        <div className="text-gray-500 w-32 text-right mr-4 shrink-0 leading-6">{label}：</div>
        <div className="text-gray-800 flex-1 leading-6">{value || '-'}</div>
    </div>
);

export const OfferField = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex text-sm">
        <div className="w-[140px] text-right text-gray-500 mr-4 shrink-0 leading-6">{label}：</div>
        <div className="text-gray-800 flex-1 leading-6">{value}</div>
    </div>
);

export const OfferSectionHeader = ({ title, type = 'bar' }: { title: string, type?: 'bar' | 'block' }) => {
    if (type === 'block') {
        return <div className="bg-gray-50 px-4 py-3 font-bold text-gray-800 text-sm mb-6 rounded-sm">{title}</div>
    }
    return (
        <div className="flex items-center gap-2 mb-6 border-l-4 border-[#13A695] pl-3">
            <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        </div>
    )
};

export const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center mb-6 mt-2">
        <div className="w-1 h-4 bg-[#13A695] mr-2"></div>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
    </div>
);
