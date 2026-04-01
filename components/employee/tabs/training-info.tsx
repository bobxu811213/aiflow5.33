
import React from 'react';
import { BookOpen } from 'lucide-react';

export const TrainingInfoTab = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} className="text-[#13A695]" />
                <h3 className="font-bold text-gray-800 text-base">培训信息</h3>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-4 py-3">培训课程</th>
                            <th className="px-4 py-3">培训时间</th>
                            <th className="px-4 py-3">培训形式</th>
                            <th className="px-4 py-3">考核结果</th>
                            <th className="px-4 py-3">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">新员工入职培训</td><td className="px-4 py-3">2025-12-02</td><td className="px-4 py-3">线下授课</td><td className="px-4 py-3 text-[#52C41A]">通过</td><td className="px-4 py-3">已完成</td></tr>
                        <tr><td className="px-4 py-3">企业文化与价值观</td><td className="px-4 py-3">2025-12-05</td><td className="px-4 py-3">线上视频</td><td className="px-4 py-3 text-[#52C41A]">95分</td><td className="px-4 py-3">已完成</td></tr>
                            <tr><td className="px-4 py-3">信息安全意识培训</td><td className="px-4 py-3">2025-12-10</td><td className="px-4 py-3">线上考试</td><td className="px-4 py-3">-</td><td className="px-4 py-3 text-orange-500">进行中</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
