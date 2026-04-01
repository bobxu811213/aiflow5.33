
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const Field = ({ label, value, tooltip = false }: { label: string, value: string | React.ReactNode, tooltip?: boolean }) => (
    <div className="flex items-start">
        <div className="w-[140px] text-right text-gray-500 text-sm shrink-0 flex justify-end items-center mr-4 leading-6">
            {label}
            {tooltip && <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />}
            ：
        </div>
        <div className="text-sm text-gray-800 leading-6 break-all flex-1">
            {value}
        </div>
    </div>
);
