
import React from 'react';
import { File, FileText } from 'lucide-react';
import { IAttachment } from '../../../types';

export const FilePreview = ({ file }: { file: IAttachment }) => {
    const isWord = file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx');
    
    if (!isWord) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50 select-none">
                <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                    <File size={48} className="text-gray-400" />
                </div>
                <div className="text-lg text-gray-800 font-medium mb-2">{file.name}</div>
                <div className="text-sm text-gray-500">暂不支持此文件预览</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#F3F2F1]">
            <div className="bg-[#2B579A] text-white px-4 py-2 flex items-center gap-4 shrink-0 shadow-sm z-10">
                <div className="font-bold flex items-center gap-2">
                    <div className="bg-white text-[#2B579A] w-6 h-6 rounded flex items-center justify-center font-bold text-xs">W</div>
                    Word
                </div>
                <div className="text-sm opacity-90 truncate max-w-[400px]">{file.name}</div>
                <div className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded">只读模式</div>
            </div>
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-6 text-sm text-gray-700 shrink-0 shadow-sm z-10">
                <span className="font-medium text-[#2B579A] border-b-2 border-[#2B579A] pb-1.5 -mb-2 cursor-pointer">开始</span>
                {['插入', '布局', '引用', '审阅', '视图'].map(menu => <span key={menu} className="cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded">{menu}</span>)}
            </div>
            <div className="flex-1 overflow-auto p-8 flex justify-center scrollbar-hide">
                <div className="w-[794px] min-h-[1123px] bg-white shadow-lg p-[96px] text-base text-gray-800 leading-relaxed origin-top">
                    <h1 className="text-2xl font-bold mb-8 text-center text-black">文档预览示例</h1>
                    <p className="mb-6 indent-8">这里展示的是文件 <strong>{file.name}</strong> 的模拟预览效果。</p>
                    <div className="space-y-3 mt-4 text-gray-300 select-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-3 bg-gray-100 rounded-sm w-full" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
