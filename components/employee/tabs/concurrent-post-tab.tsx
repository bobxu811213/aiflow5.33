import React from 'react';
import { Layers } from 'lucide-react';

export const ConcurrentPostTab = () => {
  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      <div className="flex items-center gap-2 mb-6">
        <Layers size={18} className="text-[#13A695]" />
        <span className="text-gray-700 font-medium">公司内兼任</span>
      </div>
      
      <div className="border-t border-gray-100 pt-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-24 max-w-5xl px-8">
            <div className="flex items-center">
                <span className="text-gray-500 w-24 text-sm text-right mr-4">兼任部门:</span>
                <span className="text-gray-700 text-sm">产品部</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-24 text-sm text-right mr-4">兼任职位:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
            
            <div className="flex items-center">
                <span className="text-gray-500 w-24 text-sm text-right mr-4">开始日期:</span>
                <span className="text-gray-700 text-sm">2025-10-01</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-24 text-sm text-right mr-4">结束日期:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
            
            <div className="flex items-center col-span-2">
                <span className="text-gray-500 w-24 text-sm text-right mr-4">备注:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
        </div>
      </div>
    </div>
  );
};
