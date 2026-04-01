
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { AiInteractiveText } from '../ui/ai-interactive-text';

export const EducationInfoTab = () => {
    const educationHistory = [
        { id: 1, school: '东京大学', major: '信息工程', degree: '硕士', start: '2016-09', end: '2018-06', type: '全日制' },
        { id: 2, school: '复旦大学', major: '计算机科学与技术', degree: '学士', start: '2012-09', end: '2016-06', type: '全日制' },
        { id: 3, school: '上海中学', major: '理科', degree: '高中', start: '2009-09', end: '2012-06', type: '-' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <GraduationCap size={20} className="text-[#13A695]" />
                    <h3 className="font-bold text-gray-800 text-base">教育经历</h3>
                </div>
            </div>
            <div className="space-y-10 relative ml-4 mt-4">
                <div className="absolute top-2 bottom-2 left-[5px] w-[1px] bg-gray-200"></div>
                {educationHistory.map((edu, idx) => (
                    <div key={edu.id} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#13A695] ring-4 ring-white z-10"></div>
                        <div className="flex flex-col gap-3">
                            <div className="text-base font-bold text-gray-800">
                                <AiInteractiveText text={edu.school} type="school" />
                            </div>
                            <div className="flex items-center text-sm text-gray-500 gap-12">
                                <div className="flex items-center"><span className="mr-3">专业:</span><span className="text-gray-800">{edu.major}</span></div>
                                <div className="flex items-center"><span className="mr-3">学历:</span><span className="text-[#1677FF] font-medium">{edu.degree}</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
