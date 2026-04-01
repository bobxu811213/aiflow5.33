import React from 'react';
import { Layers } from 'lucide-react';

export const TaxTab: React.FC = () => {
  const fields = [
    { label: '任职受雇从业类型', value: '雇员' },
    { label: '是否残疾', value: '-' },
    { label: '残疾证件类型', value: '-' },
    { label: '是否烈属', value: '-' },
    { label: '是否孤老', value: '-' },
    { label: '残疾证号', value: '-' },
    { label: '烈属证号', value: '-' },
    { label: '个人投资额', value: '-' },
    { label: '个人投资比例', value: '-' },
    { label: '备注', value: '-' },
    { label: '是否境外人员', value: '否' },
    { label: '涉税事由', value: '-' },
    { label: '中文名', value: '-' },
    { label: '出生国家（地区）', value: '-' },
    { label: '首次入境时间', value: '-' },
    { label: '预计离境时间', value: '-' },
    { label: '其他证照类型', value: '-' },
    { label: '其他证照号码', value: '-' },
    { label: '户籍所在地（省）', value: '-' },
    { label: '户籍所在地（市）', value: '-' },
    { label: '户籍所在地（区县）', value: '-' },
    { label: '户籍所在地（详细地址）', value: '-' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#13A695]" />
          <h3 className="text-base font-medium text-gray-900">个税申报</h3>
        </div>
        <button className="px-3 py-1 text-sm text-[#13A695] border border-[#13A695] rounded hover:bg-teal-50 transition-colors">
          编辑
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 py-6 px-4">
        {fields.map((field, index) => (
          <div key={index} className="flex items-start">
            <span className="w-44 text-sm text-gray-500 text-right mr-4 shrink-0 leading-relaxed">
              {field.label}：
            </span>
            <span className="text-sm text-gray-900 leading-relaxed break-all">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
