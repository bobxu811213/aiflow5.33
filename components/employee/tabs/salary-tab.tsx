import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';

export const SalaryTab = () => {
  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      <div className="flex items-center gap-2 mb-6">
        <Layers size={18} className="text-[#13A695]" />
        <span className="text-gray-700 font-medium">薪资</span>
      </div>
      
      <div className="border-t border-gray-100 pt-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-24 max-w-5xl px-8">
            {/* Left Column */}
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">纳税人身份:</span>
                <span className="text-gray-700 text-sm">居民</span>
            </div>
            {/* Right Column */}
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">纳税地区:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">当年已免税额:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <div className="flex items-center justify-end w-40 mr-4">
                    <span className="text-gray-500 text-sm">个税扣缴义务人</span>
                    <HelpCircle size={14} className="text-gray-400 ml-1" />
                    <span className="text-gray-500 text-sm">:</span>
                </div>
                <span className="text-gray-700 text-sm">这是公司</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">备注:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">薪级:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <div className="flex items-center justify-end w-40 mr-4">
                    <span className="text-gray-500 text-sm">合计金额</span>
                    <HelpCircle size={14} className="text-gray-400 ml-1" />
                    <span className="text-gray-500 text-sm">:</span>
                </div>
                <span className="text-gray-700 text-sm">0</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">餐费补贴:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">交通补贴:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">基本工资:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">出差津贴:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">测试:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">城市类别:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">ayumi添加自定义薪资项:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">ayumi添加自定义薪资:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">ayumi19号新增自定义项:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>

            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">测试计算加和:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
            <div className="flex items-center">
                <span className="text-gray-500 w-40 text-sm text-right mr-4">加和项一:</span>
                <span className="text-gray-700 text-sm">-</span>
            </div>
        </div>
      </div>
    </div>
  );
};
