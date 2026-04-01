
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from '../api/api-service';
import { IEmployee } from '../types';
import { ChevronDown, Calendar, MoreHorizontal, HelpCircle, Trash2, Filter, Settings, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { useAppStore } from '../store/use-app-store';
import { EmployeeDetailDrawer } from '../components/employee/employee-detail-drawer';

const EmployeeRosterPage: React.FC = () => {
  const [data, setData] = useState<IEmployee[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode
  } = useAppStore();

  const fetchData = () => {
    ApiService.getEmployees().then(setData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAiChatOpen = () => {
    setAiMode('bar');
    setAiSidebarOpen(true);
  };

  const extraButtons = ['导入', '导出', '添加标签', '工号...'];

  return (
    <div className={`flex flex-col h-full bg-white overflow-hidden relative transition-all duration-300 ease-in-out`}>
      {/* Top Action Bar */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200 shrink-0 min-w-0 gap-4">
         <div className="flex space-x-2 items-center shrink-0">
            <button className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors flex items-center whitespace-nowrap">
                <UserPlus size={14} className="mr-1"/>新增员工
            </button>
            
            <div className="hidden xl:flex items-center space-x-2">
                {extraButtons.map(btn => (
                    <button key={btn} className="border border-gray-300 text-gray-700 hover:text-primary hover:border-primary px-3 py-1.5 rounded text-sm bg-white transition-colors whitespace-nowrap">
                        {btn}
                    </button>
                ))}
            </div>

            <div className="relative" ref={menuRef}>
                <button 
                    className="border border-gray-300 text-gray-700 hover:text-primary hover:border-primary px-3 py-1.5 rounded text-sm bg-white flex items-center transition-colors whitespace-nowrap"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    更多 <ChevronDown size={14} className="ml-1"/>
                </button>
                
                {isMenuOpen && (
                    <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 flex flex-col">
                         {/* Mobile/Tablet Extra Buttons */}
                         <div className="xl:hidden border-b border-gray-100 pb-1 mb-1">
                             {extraButtons.map(btn => (
                                <button key={btn} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full transition-colors">
                                    {btn}
                                </button>
                             ))}
                         </div>
                        {['打印', '设置显示列', '生日名单', '员工提醒'].map(btn => (
                            <button key={btn} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full transition-colors">
                                {btn}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button className="text-primary text-sm flex items-center hover:underline ml-2 whitespace-nowrap hidden sm:flex">收起分类 <span className="text-xs transform rotate-180 ml-1">^</span></button>
         </div>
         <div>
             <button className="border border-gray-300 text-gray-600 px-3 py-1.5 rounded text-xs hover:bg-gray-50 transition-colors whitespace-nowrap">变更记录</button>
         </div>
      </div>

      {/* Stats Dashboard */}
      <div className="flex border-b border-gray-200 text-sm shrink-0 overflow-x-auto scrollbar-hide">
          {['在职 (230人)', '全职 (136人)', '实习 (27人)', '兼职 (48人)', '外派 (7人)', '临时工 (10人)', '已离职 (16人)'].map((stat, idx) => (
              <div key={idx} className={`flex-1 min-w-[100px] text-center py-3 border-r border-gray-100 cursor-pointer transition-colors whitespace-nowrap px-2 ${idx === 0 ? 'text-primary bg-[#E6F8F6] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {stat}
                  {idx === 0 && <Settings size={12} className="inline ml-2 text-primary/70"/>}
              </div>
          ))}
      </div>

      {/* Secondary Toolbar */}
      <div className="p-3 flex items-center border-b border-gray-200 shrink-0 gap-4">
         <div className="border border-gray-300 rounded px-2 py-1 w-64 flex justify-between items-center text-sm text-gray-600 cursor-pointer hover:border-primary transition-colors shrink-0">
             <span>请选择部门</span>
             <ChevronDown size={14} />
         </div>
         <div className="bg-[#FFF7E6] border border-[#FFD591] text-[#FA8C16] text-xs px-2 py-1 rounded flex items-center shrink-0">
             <span className="w-3.5 h-3.5 bg-[#FA8C16] rounded-full text-white flex items-center justify-center mr-1.5 text-[10px] font-bold">!</span>
             有<span className="font-bold mx-1">190</span>名员工未绑定<span className="underline cursor-pointer ml-1 hover:text-orange-600">去邀请</span>
         </div>
      </div>

      {/* Complex Table */}
      <div className="flex-1 overflow-auto px-4 py-2">
        <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
            <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                {/* Header Row 1: Titles */}
                <tr className="h-10">
                     <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /></th>
                     <th className="px-4 border-r border-gray-200 border-b text-left whitespace-nowrap sticky top-0 left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">姓名</th>
                     <th className="px-4 border-r border-gray-200 border-b text-left whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门</th>
                     <th className="px-4 border-r border-gray-200 border-b text-left whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">合同公司</th>
                     <th className="px-4 border-r border-gray-200 border-b text-left whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">标签</th>
                     <th className="px-4 border-r border-gray-200 border-b text-left cursor-pointer hover:text-primary whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">转正日期 <span className="text-[10px] transform scale-75 inline-block">▼</span></th>
                     <th className="px-4 border-r border-gray-200 border-b text-left cursor-pointer hover:text-primary whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">试用期状态 <span className="text-[10px] transform scale-75 inline-block">▼</span></th>
                     <th className="px-4 border-r border-gray-200 border-b text-left whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职位</th>
                     <th className="w-16 px-4 text-center text-gray-400 whitespace-nowrap border-b sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]"><Filter size={14} className="inline mr-1 cursor-pointer hover:text-gray-600"/><Settings size={14} className="inline cursor-pointer hover:text-gray-600"/></th>
                </tr>
                {/* Header Row 2: Filters */}
                <tr className="h-10 bg-[#FAFAFA]">
                    <th className="border-r border-gray-200 border-b sticky top-10 left-0 z-40 bg-[#FAFAFA]"></th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 left-10 z-40 bg-[#FAFAFA] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]"><input type="text" placeholder="请输入" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary" /></th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]"></th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]"><input type="text" placeholder="请输入" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary" /></th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]">
                        <div className="w-full border border-gray-300 rounded px-2 py-1 text-xs flex justify-between items-center text-gray-400 bg-white cursor-pointer hover:border-primary"><span>请选择</span><ChevronDown size={12}/></div>
                    </th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]">
                        <div className="w-full border border-gray-300 rounded px-2 py-1 text-xs flex justify-between items-center text-gray-400 bg-white cursor-pointer hover:border-primary"><span>开始... ~ 结束</span><Calendar size={12}/></div>
                    </th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]">
                        <div className="w-full border border-gray-300 rounded px-2 py-1 text-xs flex justify-between items-center text-gray-400 bg-white cursor-pointer hover:border-primary"><span>请选择</span><ChevronDown size={12}/></div>
                    </th>
                    <th className="px-2 border-r border-gray-200 border-b sticky top-10 z-30 bg-[#FAFAFA]"><input type="text" placeholder="请输入" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary" /></th>
                    <th className="text-center text-gray-500 cursor-pointer border-b hover:text-red-500 sticky top-10 right-0 z-40 bg-[#FAFAFA] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]"><Trash2 size={14} className="mx-auto" /></th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {data.map((emp, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 h-10 group transition-colors">
                        <td className="text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /></td>
                        <td 
                            className="px-4 py-2 border-r border-gray-100 text-primary cursor-pointer hover:underline whitespace-nowrap font-medium sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]"
                            onClick={() => setSelectedEmployee(emp)}
                        >
                            {emp.name}
                        </td>
                        <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{emp.dept}</td>
                        <td className="px-4 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">{emp.company}</td>
                        <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">
                             <div className="flex space-x-1">
                                 {emp.tags.map(tag => (
                                     <span key={tag} className={`text-xs px-1.5 py-0.5 rounded border ${tag === '0605' ? 'border-blue-300 bg-blue-50 text-blue-500' : 'border-primary/30 bg-primary-light text-primary'}`}>
                                         {tag}
                                     </span>
                                 ))}
                                 {emp.tags.length > 0 && <span className="border border-gray-300 px-1 rounded text-xs text-gray-400">...</span>}
                             </div>
                        </td>
                        <td className="px-4 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">{emp.probationDate}</td>
                        <td className="px-4 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">
                            {emp.status === '试用' ? '试用期' : (emp.status === '正式' && emp.idNumber ? '已转正' : '')}
                        </td>
                        <td className="px-4 py-2 border-r border-gray-100 text-right whitespace-nowrap text-[#262626]">{emp.idNumber}</td>
                        <td className="px-4 py-2 text-center text-gray-400 whitespace-nowrap sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                             <MoreHorizontal size={16} className="mx-auto opacity-50 group-hover:opacity-100 cursor-pointer hover:text-primary" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

       {/* Footer Actions */}
      <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-between px-4 text-xs shrink-0 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 shrink-0">
              <button className="bg-white border border-gray-300 text-gray-600 hover:text-primary hover:border-primary px-3 py-1.5 rounded transition-colors shadow-sm">删除</button>
              <button className="bg-[#13A695] text-white px-3 py-1.5 rounded hover:bg-[#13A695]/90 shadow-sm transition-colors">开具证明</button>
              <button className="bg-white border border-gray-300 text-gray-600 hover:text-primary hover:border-primary px-3 py-1.5 rounded transition-colors shadow-sm">打印</button>
          </div>
          
           <div className="flex items-center text-gray-600 shrink-0">
               <span className="mr-4">1-20项/共230项</span>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors"><ChevronLeft size={14}/></button>
               <button className="w-6 h-6 border border-primary text-primary rounded flex items-center justify-center mr-1 bg-primary-light">1</button>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors">2</button>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors">3</button>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors">4</button>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors">5</button>
               <span className="mr-1">...</span>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-1 hover:border-primary hover:text-primary transition-colors">12</button>
               <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors"><ChevronRight size={14}/></button>
               
               <span className="border border-gray-200 px-2 py-1 rounded mr-2 cursor-pointer hover:border-primary flex items-center transition-colors">20 条/页 <ChevronDown size={10} className="ml-1"/></span>
               <span>跳至</span>
               <input type="text" className="w-8 h-6 border border-gray-200 rounded mx-1 text-center focus:outline-none focus:border-primary" />
               <span>页</span>
           </div>
      </div>
      
       {/* Floating Buttons Bottom Right */}
      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

      <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}} // Fallback
          onSuccess={fetchData}
      />

      <EmployeeDetailDrawer 
          isOpen={!!selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
          employee={selectedEmployee} 
      />
    </div>
  );
};

export default EmployeeRosterPage;
