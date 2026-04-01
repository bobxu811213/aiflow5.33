import React, { useState } from 'react';
import { Edit3, Info, Menu } from 'lucide-react';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { useAppStore } from '../store/use-app-store';
import { CreateCostCenterModal } from '../components/org/create-cost-center-modal';
import { CreateGroupModal } from '../components/org/create-group-modal';

interface CostCenter {
  id: string;
  name: string;
  code: string;
  group: string;
  status: '有效' | '无效';
  description: string;
}

const mockData: CostCenter[] = [
  { id: '1', name: '括号(1)', code: '1221422', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '2', name: '括号（1）', code: '123214', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '3', name: '23523', code: '32523', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '4', name: '335', code: '2352', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '5', name: '335', code: '2333', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '6', name: '22', code: '22', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '7', name: '11', code: '11111', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '8', name: '11', code: '11', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '9', name: '1432', code: '3142', group: '默认分组(MRFZ)', status: '有效', description: '' },
  { id: '10', name: '23135', code: '13531', group: '默认分组(MRFZ)', status: '无效', description: '' },
];

const CostCenterPage: React.FC = () => {
  const [data] = useState<CostCenter[]>(mockData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const { aiSidebarOpen } = useAppStore();
  const [activeGroup, setActiveGroup] = useState('全部');

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white relative">
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
            className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${tab.label === '成本中心' ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar for Groups */}
        <div className="w-[280px] border-r border-gray-200 flex flex-col bg-white shrink-0">
          <div className="p-4">
            <div className="bg-[#E6F7F5] border border-[#B5E8E2] rounded px-3 py-2 flex items-center text-sm text-[#262626] mb-4">
              <Info size={16} className="text-primary mr-2 shrink-0" />
              拖动调整分组排序
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#262626]">分组名称</span>
              <button 
                className="text-primary border border-primary px-3 py-1 rounded text-sm hover:bg-primary-light/30 transition-colors"
                onClick={() => setIsCreateGroupModalOpen(true)}
              >
                创建分组
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div 
              className={`px-4 py-3 text-sm cursor-pointer ${activeGroup === '全部' ? 'bg-[#E6F7F5] text-primary border-r-2 border-primary' : 'text-[#262626] hover:bg-gray-50'}`}
              onClick={() => setActiveGroup('全部')}
            >
              全部(13)
            </div>
            <div 
              className={`px-4 py-3 text-sm cursor-pointer flex items-center ${activeGroup === '默认分组' ? 'bg-[#E6F7F5] text-primary border-r-2 border-primary' : 'text-[#262626] hover:bg-gray-50'}`}
              onClick={() => setActiveGroup('默认分组')}
            >
              <Menu size={14} className="mr-2 text-gray-400" />
              默认分组(MRFZ)(13)
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative bg-[#F9FAFB]">
          {/* Toolbar */}
          <div className="p-4 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-bold text-[#262626] text-base whitespace-nowrap">成本中心(13)</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm whitespace-nowrap shadow-sm transition-colors"
                onClick={() => setIsCreateModalOpen(true)}
              >
                创建
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                启用
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                禁用
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                删除
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                移动到
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                变更记录
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                导入
              </button>
              <button className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                导出
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto px-4 pb-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse min-w-max">
                  <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                    <tr className="h-10">
                      <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-b border-gray-200 text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                      </th>
                      <th className="text-left px-4 border-b border-gray-200 whitespace-nowrap sticky top-0 left-10 z-40 bg-[#F5F6F7]">成本中心</th>
                      <th className="text-left px-4 border-b border-gray-200 whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">成本编码</th>
                      <th className="text-left px-4 border-b border-gray-200 whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">所属分组</th>
                      <th className="text-left px-4 border-b border-gray-200 whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">状态</th>
                      <th className="text-left px-4 border-b border-gray-200 whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">说明</th>
                      <th className="w-16 px-4 whitespace-nowrap border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id} className="hover:bg-blue-50/30 border-b border-gray-100 text-sm h-11 group transition-colors">
                        <td className="w-10 min-w-[2.5rem] max-w-[2.5rem] text-center sticky left-0 z-20 bg-white group-hover:bg-blue-50/30">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                        </td>
                        <td className="px-4 whitespace-nowrap sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 text-[#262626]">
                          {row.name}
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap">
                          {row.code}
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap">
                          {row.group}
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${row.status === '有效' ? 'bg-[#52C41A]' : 'bg-gray-300'}`}></div>
                            {row.status}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap">
                          {row.description}
                        </td>
                        <td className="px-4 py-2 text-center w-16 whitespace-nowrap sticky right-0 z-20 bg-white group-hover:bg-blue-50/30">
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
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    2
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
            </div>
          </div>

          {!aiSidebarOpen && <FloatingToolbar onAiClick={() => {}} />}
        </div>
      </div>

      <CreateCostCenterModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => {
          console.log('Submit:', data);
          // In a real app, you would save the data here
        }}
      />

      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSubmit={(data) => {
          console.log('Submit Group:', data);
          // In a real app, you would save the data here
        }}
      />
    </div>
  );
};

export default CostCenterPage;
