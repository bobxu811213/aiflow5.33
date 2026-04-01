import React, { useState } from 'react';
import { Edit3, Filter } from 'lucide-react';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { useAppStore } from '../store/use-app-store';
import { CreateWorkLocationModal } from '../components/org/create-work-location-modal';

interface WorkLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  type: string;
  description: string;
}

const mockData: WorkLocation[] = [
  { id: '1', name: '长沙', country: '', city: '', address: '', type: '', description: '' },
  { id: '2', name: '北京', country: '', city: '', address: '', type: '', description: '' },
  { id: '3', name: '上海', country: '中国', city: '', address: '', type: '', description: '' },
];

const WorkLocationPage: React.FC = () => {
  const [data] = useState<WorkLocation[]>(mockData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { aiSidebarOpen } = useAppStore();

  return (
    <div className="flex h-full w-full overflow-hidden bg-white relative">
      <div className={`flex flex-col flex-1 h-full min-w-0 overflow-hidden relative transition-all duration-300 ease-in-out`}>
        {/* Top Tabs */}
        <div className="flex border-b border-gray-200 px-4 pt-3 overflow-x-auto scrollbar-hide shrink-0 bg-white">
          {[
            { label: '法律实体', path: '/legal-entity' },
            { label: '组织架构', path: '/org-structure' },
            { label: '工作地点', path: '/work-location' },
            { label: '成本中心', path: '/cost-center' },
            { label: '组织架构图', path: '#' },
            { label: '汇报关系', path: '#' }
          ].map((tab, idx) => (
            <div 
              key={idx} 
              className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${tab.label === '工作地点' ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => {
                if (tab.path !== '#') {
                  window.location.hash = tab.path;
                }
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 flex items-center justify-between bg-white gap-4 shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-bold text-[#262626] text-base whitespace-nowrap">工作地点(3)</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button 
              className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm whitespace-nowrap shadow-sm transition-colors"
              onClick={() => setIsCreateModalOpen(true)}
            >
              创建
            </button>
            <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
              删除
            </button>
            <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
              导入
            </button>
            <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
              导出
            </button>
            
            <button className="border border-primary text-primary hover:bg-primary-light/50 p-1.5 rounded bg-white transition-colors ml-1">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-4 py-2">
          <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
            <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
              <tr className="h-10">
                <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">名称</th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">国家/地区</th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">城市</th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">详细地址</th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">类型</th>
                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">描述</th>
                <th className="w-16 px-4 whitespace-nowrap border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 border-b border-gray-100 text-sm h-11 group transition-colors">
                  <td className="w-10 min-w-[2.5rem] max-w-[2.5rem] text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                  </td>
                  <td className="px-4 border-r border-gray-100 whitespace-nowrap sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] text-[#262626]">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
                    {row.country}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
                    {row.city}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
                    {row.address}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
                    {row.type}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
                    {row.description}
                  </td>
                  <td className="px-4 py-2 text-center w-16 whitespace-nowrap border-b border-gray-100 sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-center transition-opacity">
                      <Edit3 size={16} className="cursor-pointer text-primary hover:text-primary-hover" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end px-4 py-3 border-t border-gray-200 bg-white shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              &lt;
            </button>
            <button className="px-3 py-1 border border-primary text-primary rounded bg-primary-light/30">
              1
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
              &gt;
            </button>
            <select className="border border-gray-300 rounded px-2 py-1 ml-2 outline-none focus:border-primary">
              <option>10 条/页</option>
              <option>20 条/页</option>
              <option>50 条/页</option>
            </select>
            <div className="flex items-center ml-2">
              <span>跳至</span>
              <input type="text" className="w-10 border border-gray-300 rounded mx-2 px-2 py-1 text-center outline-none focus:border-primary" />
              <span>页</span>
            </div>
          </div>
        </div>

        {!aiSidebarOpen && <FloatingToolbar onAiClick={() => {}} />}
      </div>

      <CreateWorkLocationModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => {
          console.log('Submit:', data);
          // In a real app, you would save the data here
        }}
      />
    </div>
  );
};

export default WorkLocationPage;
