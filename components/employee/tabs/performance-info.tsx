
import React from 'react';
import { Target } from 'lucide-react';
import { Field } from '../ui/detail-field';

export const PerformanceInfoTab = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center gap-2 mb-6">
                <Target size={20} className="text-[#13A695]" />
                <h3 className="font-bold text-gray-800 text-base">绩效信息</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                    <Field label="最近考核等级" value={<span className="font-bold text-[#13A695] text-lg">A</span>} />
                    <Field label="最近考核周期" value="2025 Q3" />
            </div>
            <h4 className="font-bold text-gray-700 text-sm mb-4 pl-2 border-l-4 border-[#13A695]">历史绩效记录</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr><th className="px-4 py-3">考核周期</th><th className="px-4 py-3">考核方案</th><th className="px-4 py-3">考核等级</th><th className="px-4 py-3">最终得分</th><th className="px-4 py-3">考核人</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">2025 Q3</td><td className="px-4 py-3">研发中心季度考核</td><td className="px-4 py-3 font-bold text-[#13A695]">A</td><td className="px-4 py-3">92.5</td><td className="px-4 py-3">张三</td></tr>
                        <tr><td className="px-4 py-3">2025 Q2</td><td className="px-4 py-3">研发中心季度考核</td><td className="px-4 py-3 font-bold text-blue-500">B+</td><td className="px-4 py-3">88.0</td><td className="px-4 py-3">张三</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
