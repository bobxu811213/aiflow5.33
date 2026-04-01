
import React from 'react';
import { ISigner } from '../../types';
import { ChevronDown, GripVertical, User, Building2, HelpCircle } from 'lucide-react';

export const SignerSettings: React.FC = () => {
  const signers: ISigner[] = [
      { id: '1', name: '参与方1', type: 'individual', tag: '个人', assignType: '由发起人指定' },
      { id: '2', name: '参与方2', type: 'corporate', tag: '企业', signMethod: '手动签' }
  ];

  const inputClass = "w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary bg-white h-[32px]";
  const selectWrapperClass = "relative h-[32px] w-full";

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-gray-800">
                <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary rounded-sm rotate-45"></div>
                </div>
                签署对象
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-1.5 border border-primary text-primary hover:bg-primary-light rounded text-sm transition-colors">
                    + 添加个人
                </button>
                <button className="px-4 py-1.5 border border-primary text-primary hover:bg-primary-light rounded text-sm transition-colors">
                    + 添加企业
                </button>
            </div>
        </div>

        <div className="bg-[#F5F5F5] grid grid-cols-[100px_200px_1fr] px-4 py-2 text-sm font-medium text-gray-600 mb-2">
            <div>参与方</div>
            <div>参与方主体</div>
            <div>主体信息</div>
        </div>

        <div className="space-y-3">
            {/* Row 1: Individual */}
            <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-[100px] flex items-center gap-2 pt-1.5">
                    <GripVertical size={16} className="text-gray-300 cursor-move" />
                    <span className="text-sm text-gray-700">参与方1</span>
                </div>
                <div className="w-[200px] pt-1">
                    <div className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-500 border border-blue-100 text-xs">
                        <User size={12} className="mr-1" />
                        <span className="mr-2">个人</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center gap-4">
                     <div className="flex-1 relative max-w-[300px]">
                        <div className={selectWrapperClass}>
                            <select className={`${inputClass} appearance-none cursor-pointer text-gray-600`}>
                                <option>由发起人指定</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                     </div>
                     <div className="text-sm text-gray-400">发起时选择具体人员</div>
                     <div className="ml-auto flex gap-3">
                         <button className="text-primary border border-primary px-3 py-1 rounded text-xs hover:bg-primary-light">更多设置</button>
                         <button className="text-primary border border-primary px-3 py-1 rounded text-xs hover:bg-primary-light">删除</button>
                     </div>
                </div>
            </div>

            {/* Row 2: Corporate */}
             <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-[100px] flex items-center gap-2 pt-1.5">
                    <GripVertical size={16} className="text-gray-300 cursor-move" />
                    <span className="text-sm text-gray-700">参与方2</span>
                </div>
                <div className="w-[200px] pt-1">
                     <div className="inline-flex items-center px-2 py-1 rounded bg-purple-50 text-purple-600 border border-purple-100 text-xs">
                        <Building2 size={12} className="mr-1" />
                        <span className="mr-2">企业</span>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                     {/* Company */}
                     <div className={selectWrapperClass}>
                        <select className={`${inputClass} appearance-none cursor-pointer text-gray-400`}>
                            <option>请选择签署公司</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                     </div>
                     
                     {/* Seal */}
                     <div className={selectWrapperClass}>
                        <select className={`${inputClass} appearance-none cursor-pointer text-gray-400`}>
                            <option>请选择印章</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                     </div>

                     {/* Holder */}
                     <div className={selectWrapperClass}>
                        <select className={`${inputClass} appearance-none cursor-pointer text-gray-400`}>
                            <option>请选择持有人</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                     </div>

                     {/* Sign Type */}
                     <div className="flex gap-2">
                        <div className={selectWrapperClass}>
                            <select className={`${inputClass} appearance-none cursor-pointer text-gray-600`}>
                                <option>手动签</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                         <div className="ml-auto flex gap-3 shrink-0">
                             <button className="text-primary border border-primary px-3 py-1 rounded text-xs hover:bg-primary-light">更多设置</button>
                             <button className="text-primary border border-primary px-3 py-1 rounded text-xs hover:bg-primary-light">删除</button>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};
