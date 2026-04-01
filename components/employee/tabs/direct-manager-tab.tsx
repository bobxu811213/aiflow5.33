import React from 'react';
import { Layers, AlertCircle } from 'lucide-react';

export const DirectManagerTab = () => {
  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[#13A695]" />
          <span className="text-gray-700 font-medium">直属领导</span>
        </div>
        <button className="px-4 py-1.5 border border-[#13A695] text-[#13A695] text-sm rounded hover:bg-[#E6F8F6] transition-colors">
          编辑
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded px-4 py-3 mb-8 flex items-start gap-3">
        <AlertCircle size={16} className="text-[#FAAD14] mt-0.5 shrink-0" />
        <span className="text-[#595959] text-sm">
          当员工处于调动流程中时，调动项不可编辑，否则无法生成异动记录和成长记录。
        </span>
      </div>

      {/* Content */}
      <div className="space-y-8 px-8 max-w-4xl">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报类型:</span>
                <span className="text-gray-700 text-sm">业务</span>
            </div>
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报对象:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报类型:</span>
                <span className="text-gray-700 text-sm">行政</span>
            </div>
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报对象:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报类型:</span>
                <span className="text-gray-700 text-sm">财务</span>
            </div>
            <div className="flex items-center gap-4 w-1/2">
                <span className="text-gray-500 w-20 text-sm text-right">汇报对象:</span>
                <span className="text-gray-400 text-sm">暂无</span>
            </div>
        </div>
      </div>
    </div>
  );
};
