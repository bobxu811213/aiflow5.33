import React from 'react';
import { Layers } from 'lucide-react';

export const WelfareTab = () => {
  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      <div className="flex items-center gap-2 mb-6">
        <Layers size={18} className="text-[#13A695]" />
        <span className="text-gray-700 font-medium">福利</span>
      </div>
      
      <div className="border-t border-gray-100 pt-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-24 max-w-5xl px-8">
            {/* Left Column */}
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">社保方案名称:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            {/* Right Column */}
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">公积金方案名称:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">社保缴纳地区:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">公积金缴纳地区:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">社保缴纳组织:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">公积金缴纳组织:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">社保申报基数:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">公积金申报基数:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">当前社保生效年月:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">当前公积金生效年月:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">当前社保失效年月:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">当前公积金失效年月:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">社保账号:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">公积金账号:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-32 text-sm text-right mr-4">补充公积金账号:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            {/* Empty placeholder for alignment if needed */}
            <div></div>
        </div>
      </div>
    </div>
  );
};
