
import React from 'react';
import { X, Layers, CheckSquare, Square } from 'lucide-react';

interface InterviewDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const InterviewDetailDrawer: React.FC<InterviewDetailDrawerProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-[70] flex justify-end bg-black/10 backdrop-blur-[1px]" 
        onClick={onClose}
    >
        <div 
            className="w-[50%] min-w-[700px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold text-gray-900">查看面试安排详情</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="px-6 py-4">
                    {/* Candidate Info */}
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-800 text-sm mb-1">面试安排详情</h3>
                        <div className="text-xs text-gray-500">
                            金盟们 | 18525639692 | 230258641@qq.com
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 mb-6">
                        <button className="pb-2 text-sm font-medium text-[#13A695] border-b-2 border-[#13A695] px-1 mr-6">
                            基本信息
                        </button>
                        <button className="pb-2 text-sm font-medium text-gray-600 hover:text-[#13A695] px-1 transition-colors">
                            安排面试官
                        </button>
                    </div>

                    {/* Section: Basic Info */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 text-[#13A695]">
                            <Layers size={16} />
                            <span className="font-bold text-sm text-gray-800">基本信息</span>
                        </div>
                        
                        <div className="border border-gray-100 rounded-sm p-6">
                            <div className="grid grid-cols-2 gap-y-8">
                                <div className="flex text-sm">
                                    <span className="text-gray-500 w-32 text-right mr-4">面试日期：</span>
                                    <span className="text-gray-800">2025-09-30</span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="text-gray-500 w-32 text-right mr-4">面试形式：</span>
                                    <span className="text-gray-800">现场面试</span>
                                </div>
                                <div className="col-span-2 flex text-sm">
                                    <span className="text-gray-500 w-32 text-right mr-4">面试联系人及地址：</span>
                                    <span className="text-gray-800">云经理&nbsp;&nbsp;123456789111&nbsp;&nbsp;中山港口</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Interviewer */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-[#13A695]">
                            <Layers size={16} />
                            <span className="font-bold text-sm text-gray-800">安排面试官</span>
                        </div>

                        <div className="border border-gray-100 rounded-sm">
                            <div className="bg-[#F5F5F5] px-4 py-2 text-sm font-bold text-gray-800 border-b border-gray-100">
                                安排面试一
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-y-8 mb-6">
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">面试轮次：</span>
                                        <span className="text-gray-800">{data?.round || '复试'}</span>
                                    </div>
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">面试评价表：</span>
                                        <span className="text-gray-800">面试评价表</span>
                                    </div>
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">面试时间：</span>
                                        <span className="text-gray-800">10:00</span>
                                    </div>
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">面试时长：</span>
                                        <span className="text-gray-800">30分钟</span>
                                    </div>
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">面试官：</span>
                                        <span className="text-gray-800">{data?.interviewer || 'BD演示账号-请勿动'}</span>
                                    </div>
                                    <div className="flex text-sm">
                                        <span className="text-gray-500 w-32 text-right mr-4">备注：</span>
                                        <span className="text-gray-800">-</span>
                                    </div>
                                </div>

                                <div className="flex gap-8 pl-8">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <div className="w-4 h-4 bg-[#CCCCCC] rounded flex items-center justify-center mr-2 text-white">
                                            <CheckSquare size={12} />
                                        </div>
                                        允许查看信息采集表
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <div className="w-4 h-4 border border-gray-300 rounded mr-2 bg-white"></div>
                                        AI面试记录
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button 
                    onClick={onClose}
                    className="text-[#13A695] text-sm hover:underline"
                >
                    关闭
                </button>
            </div>
        </div>
    </div>
  );
};
