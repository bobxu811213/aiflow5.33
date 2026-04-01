import React from 'react';
import { Layers, Inbox, ChevronLeft, ChevronRight } from 'lucide-react';

export const TalentPoolTab: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-8">
      {/* Section 1: 当前所在人才池 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <Layers className="w-5 h-5 text-[#13A695]" />
          <h3 className="text-base font-medium text-gray-900">当前所在人才池</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 grid grid-cols-2 text-xs font-medium text-gray-500">
            <div>人才池名称</div>
            <div>入池日期</div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Inbox className="w-8 h-8 text-gray-300" />
            </div>
            <span className="text-sm">没有可用的内容</span>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-2 flex justify-end items-center gap-2">
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-600">1</button>
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: 出入池记录 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <Layers className="w-5 h-5 text-[#13A695]" />
          <h3 className="text-base font-medium text-gray-900">出入池记录</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 grid grid-cols-6 text-xs font-medium text-gray-500">
            <div>人才池名称</div>
            <div>类型</div>
            <div>来源</div>
            <div>入池/出池日期</div>
            <div>操作人</div>
            <div>操作时间</div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Inbox className="w-8 h-8 text-gray-300" />
            </div>
            <span className="text-sm">没有可用的内容</span>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-2 flex justify-end items-center gap-2">
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-600">1</button>
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
