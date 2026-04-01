import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Settings, Maximize2, HelpCircle, CheckSquare, Search, Filter, AlertCircle, Layers, ChevronLeft, Inbox } from 'lucide-react';

const HeadcountManagementPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || '概览';
  
  const [tableTab, setTableTab] = useState('全部');
  const [expandedRows, setExpandedRows] = useState<string[]>(['1', '1-1']);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const tableData = [
    {
      id: '1',
      name: '波波波测试公司',
      type: 'company',
      children: [
        {
          id: '1-1',
          name: '产品部',
          type: 'department',
          children: [
            { id: '1-1-1', name: '产品部下级1', type: 'department' },
            { id: '1-1-2', name: '产品部下级2', type: 'department' },
            { id: '1-1-3', name: '产品部下级3', type: 'department' },
            { id: '1-1-4', name: '产品新部门', type: 'company' },
            { id: '1-1-5', name: '产品新新子部门', type: 'department' },
            { id: '1-1-6', name: '产品部下级', type: 'department' },
            { id: '1-1-7', name: '产品部子部门', type: 'department' },
            { id: '1-1-8', name: '双11', type: 'department' },
          ]
        },
        { id: '1-2', name: '研发部', type: 'department' },
        { id: '1-3', name: '财务部', type: 'department' },
        { id: '1-4', name: '人事部', type: 'department' },
        { id: '1-5', name: '回收站', type: 'company' },
        { id: '1-6', name: '停用的组织', type: 'department' },
      ]
    }
  ];

  const planningTableData = Array(10).fill(0).map((_, i) => ({
    id: `plan-${i}`,
    department: `许波波测试公司/产品部${i > 0 ? `/产品部下级${i}` : ''}`,
    planCount: 1,
    cycle: '年度(2024/08~2025/07)',
    headcount: '待设置',
    budget: '待设置',
    directHeadcount: '待设置',
    directBudget: '待设置',
    independentAccounting: '否'
  }));

  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedRows.includes(node.id);
      const hasChildren = node.children && node.children.length > 0;
      
      return (
        <React.Fragment key={node.id}>
          <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
            <td className="py-3 px-4">
              <div 
                className="flex items-center" 
                style={{ paddingLeft: `${level * 24}px` }}
              >
                {hasChildren ? (
                  <button 
                    onClick={() => toggleRow(node.id)}
                    className="mr-1 text-neutral-500 hover:text-neutral-700"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <span className="w-5 inline-block"></span>
                )}
                <span className="mr-2 text-neutral-400">
                  {node.type === 'company' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  )}
                </span>
                <span className="text-sm text-neutral-800">{node.name}</span>
              </div>
            </td>
            <td className="py-3 px-4 border-l border-neutral-200">
              {/* Subdivision dimensions empty for now */}
            </td>
          </tr>
          {isExpanded && hasChildren && renderTree(node.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  const renderOverviewView = () => (
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Year Selector */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-between border border-neutral-200 rounded px-3 py-1.5 w-32 cursor-pointer hover:border-primary transition-colors">
          <span className="text-sm text-neutral-800">2026</span>
          <ChevronDown size={16} className="text-neutral-400" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center text-sm text-neutral-800 font-medium mb-2">
            占编/编制
            <HelpCircle size={14} className="ml-1 text-neutral-400" />
          </div>
          <div className="text-xl font-bold">
            <span className="text-[#FF4D4F]">-</span><span className="text-neutral-800">/-</span><span className="text-sm font-normal text-neutral-600 ml-1">人</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center text-sm text-neutral-800 font-medium mb-2">
            预增/预减
            <HelpCircle size={14} className="ml-1 text-neutral-400" />
          </div>
          <div className="text-xl font-bold">
            <span className="text-primary">-</span><span className="text-neutral-800">/-</span><span className="text-sm font-normal text-neutral-600 ml-1">人</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-5.94 5.94"></path></svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center text-sm text-neutral-800 font-medium mb-2">
            超编/缺编
            <HelpCircle size={14} className="ml-1 text-neutral-400" />
          </div>
          <div className="text-xl font-bold">
            <span className="text-[#FF4D4F]">-</span><span className="text-neutral-800">/-</span><span className="text-sm font-normal text-neutral-600 ml-1">人</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center text-sm text-neutral-800 font-medium mb-2">
            占编率
            <HelpCircle size={14} className="ml-1 text-neutral-400" />
          </div>
          <div className="text-xl font-bold text-neutral-800">
            -
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-6">
          {['全部(223)', '已定编', '未定编(223)'].map(tab => (
            <div 
              key={tab}
              className={`text-sm cursor-pointer ${
                tableTab === tab.split('(')[0] 
                  ? 'text-primary font-medium bg-primary-light px-3 py-1 rounded' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
              onClick={() => setTableTab(tab.split('(')[0])}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-neutral-300 focus:ring-primary" defaultChecked />
            <span className="ml-2 text-sm text-neutral-700">显示细分维度</span>
          </label>

          <div className="flex items-center border border-neutral-200 rounded px-3 py-1.5 w-40 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm text-neutral-400 flex-1">组织部门</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </div>

          <div className="flex items-center border border-neutral-200 rounded px-3 py-1.5 w-32 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm text-neutral-400 flex-1">编制状态</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </div>

          <button className="p-1.5 text-neutral-500 hover:text-primary border border-neutral-200 rounded hover:border-primary transition-colors">
            <Settings size={16} />
          </button>
          <button className="p-1.5 text-neutral-500 hover:text-primary border border-neutral-200 rounded hover:border-primary transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="py-3 px-4 text-sm font-medium text-neutral-600 w-1/2">
                组织部门 <span className="text-primary ml-1 cursor-pointer font-normal">展开1级 <ChevronDown size={14} className="inline" /></span>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600 w-1/2 border-l border-neutral-200 flex items-center">
                细分维度 <HelpCircle size={14} className="ml-1 text-neutral-400" />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderTree(tableData)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlanningView = () => (
    <div className="p-6 flex-1 flex flex-col overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center justify-between border border-neutral-200 rounded px-3 py-1.5 w-32 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm text-neutral-800">2024</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </div>
          <button className="flex items-center px-3 py-1.5 text-sm text-primary border border-primary/20 bg-primary-light rounded hover:bg-primary-light transition-colors">
            <HelpCircle size={14} className="mr-1" />
            帮助
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1.5 text-sm text-white bg-[#85D4C5] rounded cursor-not-allowed">
            发布
          </button>
          <button className="flex items-center px-4 py-1.5 text-sm text-primary border border-primary rounded hover:bg-primary-light transition-colors">
            导入 <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="flex items-center px-4 py-1.5 text-sm text-neutral-600 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            导出 <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            <Filter size={16} />
          </button>
          <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            <Settings size={16} />
          </button>
          <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Alert */}
      <div className="flex items-center px-4 py-2 mb-4 text-sm text-[#D48806] bg-[#FFFBE6] border border-[#FFE58F] rounded shrink-0">
        <AlertCircle size={16} className="mr-2" />
        温馨提示：设置/更新了部门编制（包括删除编制方案带来的变动），需点击发布才能生效！
      </div>

      {/* Table */}
      <div className="flex-1 border border-neutral-200 rounded-lg overflow-auto relative">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="sticky top-0 bg-neutral-50 z-10 shadow-sm">
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">组织部门</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制方案</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制周期</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制数</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">预算金额</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">直属编制数</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">直属预算金额</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600 flex items-center">
                是否独立核算 <HelpCircle size={14} className="ml-1 text-neutral-400" />
              </th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600 sticky right-0 bg-neutral-50 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]"></th>
            </tr>
          </thead>
          <tbody>
            {planningTableData.map((row, index) => (
              <tr key={row.id} className="border-b border-neutral-200 hover:bg-neutral-50 group">
                <td className="py-3 px-4 text-sm text-neutral-800">{row.department}</td>
                <td className="py-3 px-4 text-sm text-neutral-800 flex items-center">
                  <Layers size={14} className="mr-2 text-neutral-400" /> {row.planCount}
                </td>
                <td className="py-3 px-4 text-sm text-neutral-800">{row.cycle}</td>
                <td className="py-3 px-4 text-sm text-neutral-400">{row.headcount}</td>
                <td className="py-3 px-4 text-sm text-neutral-400">{row.budget}</td>
                <td className="py-3 px-4 text-sm text-neutral-400">{row.directHeadcount}</td>
                <td className="py-3 px-4 text-sm text-neutral-400">{row.directBudget}</td>
                <td className="py-3 px-4 text-sm text-neutral-800">{row.independentAccounting}</td>
                <td className="py-3 px-4 text-sm sticky right-0 bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.05)] group-hover:bg-neutral-50 transition-colors text-right">
                  <button className="text-primary hover:text-primary-hover">设置编制/预算</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4 space-x-2 text-sm text-neutral-600 shrink-0">
        <button className="p-1 border border-neutral-200 rounded text-neutral-400 cursor-not-allowed"><ChevronLeft size={16} /></button>
        <button className="px-2.5 py-1 border border-primary text-primary rounded">1</button>
        <button className="px-2.5 py-1 border border-neutral-200 rounded hover:border-primary hover:text-primary">2</button>
        <button className="px-2.5 py-1 border border-neutral-200 rounded hover:border-primary hover:text-primary">3</button>
        <button className="px-2.5 py-1 border border-neutral-200 rounded hover:border-primary hover:text-primary">4</button>
        <button className="px-2.5 py-1 border border-neutral-200 rounded hover:border-primary hover:text-primary">5</button>
        <span>...</span>
        <button className="px-2.5 py-1 border border-neutral-200 rounded hover:border-primary hover:text-primary">21</button>
        <button className="p-1 border border-neutral-200 rounded hover:border-primary hover:text-primary"><ChevronRight size={16} /></button>
        
        <div className="flex items-center ml-4">
          <div className="border border-neutral-200 rounded px-2 py-1 flex items-center cursor-pointer">
            10 条/页 <ChevronDown size={14} className="ml-1" />
          </div>
        </div>
        <div className="flex items-center ml-4">
          跳至 <input type="text" className="w-10 border border-neutral-200 rounded mx-1 px-1 text-center outline-none focus:border-primary" /> 页
        </div>
      </div>
    </div>
  );

  const renderApprovalView = () => (
    <div className="p-6 flex-1 flex flex-col overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-between border border-neutral-200 rounded px-3 py-1.5 w-32 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm text-neutral-400"></span>
            <ChevronDown size={16} className="text-neutral-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            <Filter size={16} />
          </button>
          <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:border-primary hover:text-primary transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 border border-neutral-200 rounded-lg overflow-auto relative flex flex-col">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="sticky top-0 bg-neutral-50 z-10 shadow-sm">
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">审批编号</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">审批状态</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">发起人</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">发起时间</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制申请部门</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">申请类型</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">生效开始时间</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">生效结束时间</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">申请编制数</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">申请直属编制数</th>
              <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制申请明细</th>
            </tr>
          </thead>
        </table>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
          <div className="w-24 h-24 mb-4 text-neutral-300 relative">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 35H80V75C80 77.7614 77.7614 80 75 80H25C22.2386 80 20 77.7614 20 75V35Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M20 35L35 20H65L80 35" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M40 35H60V45C60 47.7614 57.7614 50 55 50H45C42.2386 50 40 47.7614 40 45V35Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
            </svg>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-neutral-100 rounded-[100%] blur-sm -z-10"></div>
          </div>
          <p className="text-sm text-neutral-400">没有可用的内容</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg">
      {/* Top Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 h-12 shrink-0">
        <div className="flex h-full">
          {['编制概览', '编制制定', '编制审批'].map(tab => (
            <div 
              key={tab}
              className={`flex items-center px-4 text-sm font-medium cursor-pointer relative ${
                activeTab === tab.replace('编制', '') 
                  ? 'text-primary' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
              onClick={() => handleTabChange(tab.replace('编制', ''))}
            >
              {tab}
              {activeTab === tab.replace('编制', '') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </div>
          ))}
        </div>
        
        {activeTab === '制定' && (
          <div className="flex items-center space-x-2">
            <button 
              className="px-4 py-1.5 text-sm text-white bg-primary rounded hover:bg-primary-hover transition-colors"
              onClick={() => navigate('/headcount-plan')}
            >
              编制方案
            </button>
            <button className="px-4 py-1.5 text-sm text-primary border border-primary rounded hover:bg-primary-light transition-colors">
              编制规则设置
            </button>
          </div>
        )}

      </div>

      {activeTab === '概览' && renderOverviewView()}
      {activeTab === '制定' && renderPlanningView()}
      {activeTab === '审批' && renderApprovalView()}
    </div>
  );
};

export default HeadcountManagementPage;
