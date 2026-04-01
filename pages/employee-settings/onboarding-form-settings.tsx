import React, { useState } from 'react';
import { Filter, Maximize2, Copy, Edit2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Template = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  creator: string;
  createTime: string;
};

const mockData: Template[] = [
  { id: '1', name: '实名认证入职', status: 'active', creator: '波波司机', createTime: '2024-09-27 16:17:56' },
  { id: '2', name: '市场部市场专员', status: 'active', creator: '波波司机', createTime: '2024-05-13 18:19:45' },
  { id: '3', name: '营运部运营经理', status: 'active', creator: '谢雨蓉', createTime: '2024-03-13 11:48:58' },
  { id: '4', name: '门店店长', status: 'active', creator: '谢雨蓉', createTime: '2024-03-04 13:58:33' },
  { id: '5', name: '前厅服务员', status: 'active', creator: '系统', createTime: '2023-08-29 12:00:43' },
];

export default function OnboardingFormSettingsPage() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === mockData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockData.map(item => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h1 className="text-base font-medium text-gray-800">入职登记表模板({mockData.length})</h1>
          <div className="flex items-center space-x-2">
            <button 
              className="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
              onClick={() => navigate('/employee-settings/onboarding-form-settings/create')}
            >
              创建
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">
              启用
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">
              停用
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">
              删除
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-primary text-sm rounded hover:bg-gray-50 transition-colors">
              OCR字段设置
            </button>
            <button className="p-1.5 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors">
              <Filter size={16} />
            </button>
            <button className="p-1.5 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 bg-gray-50/80 sticky top-0 z-10 border-b border-gray-100">
              <tr>
                <th className="py-3 px-6 w-12 font-medium">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedIds.length === mockData.length && mockData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="py-3 px-6 font-medium">模板名称</th>
                <th className="py-3 px-6 font-medium">状态</th>
                <th className="py-3 px-6 font-medium">创建人</th>
                <th className="py-3 px-6 font-medium flex justify-between items-center">
                  创建时间
                  <ChevronDown size={14} className="text-primary cursor-pointer" />
                </th>
                <th className="py-3 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-gray-50/50 transition-colors ${selectedIds.includes(item.id) ? 'bg-primary/5' : ''}`}
                >
                  <td className="py-3 px-6">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800">{item.name}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-gray-600">{item.status === 'active' ? '启用' : '停用'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-gray-600">{item.creator}</td>
                  <td className="py-3 px-6 text-gray-600">{item.createTime}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center space-x-3 text-primary">
                      <button className="hover:text-primary/80 transition-colors" title="复制">
                        <Copy size={16} />
                      </button>
                      <button 
                        className="hover:text-primary/80 transition-colors" 
                        title="编辑"
                        onClick={() => navigate('/employee-settings/onboarding-form-settings/create')}
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
