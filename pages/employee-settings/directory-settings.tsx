import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { ChevronLeft, Search, ChevronDown, Download, Settings } from 'lucide-react';
import { DirectoryPermissionModal } from '../../components/employee/modals/directory-permission-modal';

export default function DirectorySettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  const [activeTab, setActiveTab] = useState<'active' | 'resigned'>('active');
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  React.useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '通讯录设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  // Mock data based on the screenshot
  const mockData = [
    { id: 1, department: '许波波测试公司/人事部', position: '', name: '许鸣波', mobile: '13817975847', hireDate: '2023-08-29', display: '***全部隐藏', allow: '允许' },
    { id: 2, department: '许波波测试公司/研发部...', position: '', name: '小李子小李子...', mobile: '13500009999', hireDate: '2024-05-14', display: '***全部隐藏', allow: '允许' },
    { id: 3, department: '许波波测试公司/研发部...', position: '主播', name: '12341341', mobile: '2314242', hireDate: '2024-09-06', display: '***显示默认', allow: '公司内允许' },
    { id: 4, department: '许波波测试公司/研发部...', position: '', name: '726复职导入', mobile: '12421124', hireDate: '2024-07-31', display: '***全部隐藏', allow: '允许' },
    { id: 5, department: '回收站/一级部门名字1', position: '15', name: '12312这位', mobile: '13877665511', hireDate: '2019-12-01', display: '***全部隐藏', allow: '允许' },
    { id: 6, department: '许波波测试公司/研发部...', position: '', name: '测试复职转正...', mobile: '132', hireDate: '2024-06-12', display: '***全部隐藏', allow: '允许' },
    { id: 7, department: '三级部门名字（公司）/...', position: '主播', name: '李佳佳', mobile: '13800000000', hireDate: '2023-08-01', display: '***全部隐藏', allow: '允许' },
    { id: 8, department: '许波波测试公司/研发部...', position: '', name: '复职ayumi521', mobile: '12435', hireDate: '2023-09-01', display: '***全部隐藏', allow: '允许' },
    { id: 9, department: '许波波测试公司/人事部', position: '', name: '蒋入职', mobile: '18621759010', hireDate: '2023-12-28', display: '***全部隐藏', allow: '允许' },
    { id: 10, department: '许波波测试公司/停用的...', position: '', name: '示例-王大大', mobile: '1873926696', hireDate: '2024-07-10', display: '***全部隐藏', allow: '允许' },
    { id: 11, department: '三级部门名字（公司）/...', position: '', name: '入职登记表', mobile: '13877665521', hireDate: '2024-03-01', display: '***全部隐藏', allow: '允许' },
    { id: 12, department: '许波波测试公司/财务部', position: '', name: '许转正薪资', mobile: '178554', hireDate: '2024-01-01', display: '***全部隐藏', allow: '允许' },
    { id: 13, department: '许波波测试公司/财务部', position: '', name: '许试用薪资', mobile: '13200110011', hireDate: '2024-01-01', display: '***全部隐藏', allow: '允许' },
    { id: 14, department: '许波波测试公司/人事部', position: '', name: '许全薪资', mobile: '14599900098', hireDate: '2024-03-01', display: '***全部隐藏', allow: '允许' },
    { id: 15, department: '许波波测试公司/研发部...', position: '测试关联项目一职位', name: '复制测试', mobile: '13877665543', hireDate: '2024-04-18', display: '***全部隐藏', allow: '允许' },
    { id: 16, department: '许波波测试公司/研发部...', position: '', name: '离职店长', mobile: '13899990000', hireDate: '2024-08-01', display: '***全部隐藏', allow: '允许' },
    { id: 17, department: '许波波测试公司/研发部...', position: '', name: '2142', mobile: '214212142', hireDate: '2024-05-16', display: '***全部隐藏', allow: '允许' },
    { id: 18, department: '许波波测试公司/研发部...', position: '', name: '2114', mobile: '124312', hireDate: '2023-09-01', display: '***全部隐藏', allow: '允许' },
    { id: 19, department: '许波波测试公司/研发部...', position: '后勤', name: '新入职', mobile: '13787773658', hireDate: '2024-07-02', display: '***全部隐藏', allow: '允许' },
    { id: 20, department: '三级部门名字（公司）/...', position: '', name: '新新店长', mobile: '13877665746', hireDate: '2024-08-06', display: '***全部隐藏', allow: '允许' },
  ];

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg p-4 shadow-sm flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/employee-settings')}
            className="flex items-center text-primary hover:text-primary-hover mr-4"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">返回</span>
          </button>
          <h1 className="text-base font-medium text-gray-900">通讯录设置</h1>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-hover transition-colors">
              导出
            </button>
            <button 
              onClick={() => setIsPermissionModalOpen(true)}
              className="px-4 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
            >
              通讯录权限设置
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded p-0.5">
              <button 
                className={`px-4 py-1 text-sm rounded-sm transition-colors ${activeTab === 'active' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('active')}
              >
                在职
              </button>
              <button 
                className={`px-4 py-1 text-sm rounded-sm transition-colors ${activeTab === 'resigned' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('resigned')}
              >
                离职
              </button>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="输入姓名" 
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm w-48 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-12">#</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    部门 <Search size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    职位 <Search size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    姓名 <Search size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    手机号 <Search size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    入职时间 <Search size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    ···显示默认 <span className="ml-1 w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">?</span>
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <div className="flex items-center cursor-pointer">
                    ···允许 <span className="ml-1 w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">?</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{row.id}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.position}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.mobile}</td>
                  <td className="px-4 py-3">{row.hireDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 cursor-pointer hover:border-primary">
                      <span>{row.display}</span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 cursor-pointer hover:border-primary">
                      <span>{row.allow}</span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1 mr-4">
            <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed bg-gray-50">&lt;&lt;</button>
            <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed bg-gray-50">&lt;</button>
            <button className="px-3 py-1 border border-primary text-primary rounded bg-primary/5">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">4</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">5</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">&gt;</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary">&gt;&gt;</button>
          </div>
          <div className="flex items-center space-x-2">
            <span>1</span>
            <span>/12 页</span>
            <span>跳转</span>
            <span>共 230 条,每页</span>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer hover:border-primary">
              <span className="mr-1">20</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <DirectoryPermissionModal 
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
      />
    </div>
  );
}
