import React, { useState } from 'react';
import { 
  Settings, Maximize2, Inbox, Search, Filter, Download
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeSigningRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'employees' | 'performance'>('employees');

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header Section: Tabs and Main Actions */}
      <div className="bg-white px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-8">
           <div 
             className={`text-base font-medium cursor-pointer pb-1 border-b-2 transition-colors ${activeTab === 'employees' ? 'text-emerald-500 border-emerald-500' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
             onClick={() => setActiveTab('employees')}
           >
             员工
           </div>
           <div 
             className={`text-base font-medium cursor-pointer pb-1 border-b-2 transition-colors ${activeTab === 'performance' ? 'text-emerald-500 border-emerald-500' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
             onClick={() => setActiveTab('performance')}
           >
             绩效
           </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 text-sm text-emerald-500 bg-white border border-emerald-500 rounded hover:bg-emerald-50 transition-colors">
            选择模板发起
          </button>
          <button className="px-3 py-1.5 text-sm text-emerald-500 bg-white border border-emerald-500 rounded hover:bg-emerald-50 transition-colors">
            上传文件发起
          </button>
          <button className="px-3 py-1.5 text-sm text-emerald-500 bg-white border border-emerald-500 rounded hover:bg-emerald-50 transition-colors">
            操作记录
          </button>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-white shadow-sm grid grid-cols-5 divide-x divide-gray-100">
        <div className="flex flex-col items-center justify-center py-6 bg-emerald-50 border-b-2 border-emerald-500 cursor-pointer">
          <span className="text-2xl font-medium text-emerald-500">0</span>
          <span className="text-sm text-gray-600 mt-1">全部</span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="text-2xl font-medium text-gray-800">0</span>
          <span className="text-sm text-gray-500 mt-1">待我签</span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="text-2xl font-medium text-gray-800">0</span>
          <span className="text-sm text-gray-500 mt-1">待他人签</span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="text-2xl font-medium text-gray-800">0</span>
          <span className="text-sm text-gray-500 mt-1">签署完成</span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="text-2xl font-medium text-gray-800">0</span>
          <span className="text-sm text-gray-500 mt-1">我发起</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white flex-1 flex flex-col shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="font-medium text-gray-800">全部</div>
          <div className="flex items-center space-x-2">
             {activeTab === 'employees' ? (
               <>
                 <button className="px-3 py-1 text-sm text-emerald-500 border border-emerald-200 bg-white rounded hover:bg-emerald-50 transition-colors">
                   催办
                 </button>
                 <button className="px-3 py-1 text-sm text-emerald-500 border border-emerald-200 bg-white rounded hover:bg-emerald-50 transition-colors">
                   删除
                 </button>
                 <button className="px-3 py-1 text-sm text-emerald-500 border border-emerald-200 bg-white rounded hover:bg-emerald-50 transition-colors">
                   撤销
                 </button>
                 <button className="px-3 py-1 text-sm text-emerald-500 border border-emerald-200 bg-white rounded hover:bg-emerald-50 transition-colors">
                   导出
                 </button>
               </>
             ) : (
               <>
                 <div className="relative mr-2">
                   <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                   <input
                     placeholder="搜索绩效考核名称"
                     className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                   />
                 </div>
                 <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-200">
                   <Filter className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-200">
                   <Download className="w-4 h-4" />
                 </button>
               </>
             )}
             <div className="w-px h-4 bg-gray-300 mx-2"></div>
             <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded border border-emerald-200 transition-colors">
               <Settings className="w-4 h-4" />
             </button>
             <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded border border-emerald-200 transition-colors">
               <Maximize2 className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Table Content */}
        {activeTab === 'employees' ? (
          <>
            {/* Employee Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 grid grid-cols-12 gap-4 text-xs font-medium text-gray-600">
              <div className="col-span-1 flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
              </div>
              <div className="col-span-2">文件名称</div>
              <div className="col-span-1">文件类型</div>
              <div className="col-span-1">员工姓名</div>
              <div className="col-span-1">员工手机号</div>
              <div className="col-span-1">员工部门</div>
              <div className="col-span-1">合同/协议公司</div>
              <div className="col-span-1">发起人</div>
              <div className="col-span-1">发起时间</div>
              <div className="col-span-1">签署人</div>
              <div className="col-span-1">签署状态</div>
            </div>

            {/* Employee Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
              <Inbox className="w-16 h-16 mb-4 text-gray-200" strokeWidth={1} />
              <span className="text-sm">没有可用的内容</span>
            </div>
          </>
        ) : (
          <>
            {/* Performance Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 grid grid-cols-12 gap-4 text-xs font-medium text-gray-600">
              <div className="col-span-2">考核名称</div>
              <div className="col-span-2">考核周期</div>
              <div className="col-span-1">被考核人</div>
              <div className="col-span-1">签署状态</div>
              <div className="col-span-2">发起时间</div>
              <div className="col-span-2">完成时间</div>
              <div className="col-span-2 text-right">操作</div>
            </div>

            {/* Performance Table Body (Mock Data) */}
            <div className="flex-1 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-b border-gray-100 px-4 py-3 grid grid-cols-12 gap-4 text-sm hover:bg-gray-50 transition-colors items-center">
                  <div className="col-span-2 font-medium text-gray-900">2023年度绩效考核</div>
                  <div className="col-span-2 text-gray-500">2023-01-01 ~ 2023-12-31</div>
                  <div className="col-span-1 text-gray-900">李四</div>
                  <div className="col-span-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                      已完成
                    </span>
                  </div>
                  <div className="col-span-2 text-gray-500">2024-01-15 09:00</div>
                  <div className="col-span-2 text-gray-500">2024-01-20 16:45</div>
                  <div className="col-span-2 text-right">
                    <button className="text-emerald-500 hover:text-emerald-600 font-medium text-sm">
                      查看
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeSigningRecordsPage;
