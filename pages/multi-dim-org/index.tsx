
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit3, UserPlus, Search, Settings, Maximize2, List, Grid, MoreHorizontal, FileInput, FileOutput, ArrowUpDown, LayoutList, Calendar, X } from 'lucide-react';

interface IOrgNode {
  id: string;
  name: string;
  level: number;
  expanded: boolean;
  children?: IOrgNode[];
  type: '公司' | '部门';
  manager?: string;
  shortName?: string;
  code?: string;
  attribute?: string;
  establishDate?: string;
  effectiveDate?: string;
  description?: string;
  status: '启用' | '停用';
  isVirtual?: boolean;
}

  interface IPosition {
    id: string;
    name: string;
    shortName?: string;
    code?: string;
    department: string;
    jobTitle?: string;
    status: '启用' | '停用';
    effectiveDate?: string;
  }

  const MultiDimOrgPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dept'); // dept, project
  const [subTab, setSubTab] = useState('structure'); // structure, position
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Mock Data for Positions
  const [positions, setPositions] = useState<IPosition[]>([
    {
      id: '1',
      name: '人事行政部',
      department: '首席执行官',
      status: '启用',
    }
  ]);

  // Mock Data for Org Structure
  const [data, setData] = useState<IOrgNode[]>([
    {
      id: '1',
      name: '首席执行官',
      level: 0,
      expanded: true,
      type: '公司',
      status: '启用',
      establishDate: '2026-01-01',
      children: [
        {
          id: '1-1',
          name: '产品部',
          level: 1,
          expanded: true,
          type: '部门',
          manager: 'Ayumi有用...',
          status: '启用',
          establishDate: '2024-11-01',
          description: '1221122112211',
          isVirtual: true,
          children: [
            {
              id: '1-1-1',
              name: '产品部下级1',
              level: 2,
              expanded: false,
              type: '部门',
              code: 'BBBB000...',
              status: '启用',
              establishDate: '2024-10-01',
              isVirtual: true,
            },
            {
              id: '1-1-2',
              name: '产品部下级2',
              level: 2,
              expanded: false,
              type: '部门',
              code: 'BBBB000...',
              status: '启用',
              establishDate: '2024-10-01',
              isVirtual: true,
            },
            {
              id: '1-1-3',
              name: '产品部下级3',
              level: 2,
              expanded: false,
              type: '部门',
              code: 'BBBB000...',
              status: '启用',
              establishDate: '2024-10-01',
              isVirtual: true,
            }
          ]
        },
        {
            id: '1-2',
            name: '产品新部门',
            level: 1,
            expanded: false,
            type: '公司',
            code: 'PM00001',
            status: '启用',
            establishDate: '2025-03-01',
            isVirtual: true,
        },
        {
            id: '1-3',
            name: '产品新新子部门',
            level: 1,
            expanded: false,
            type: '部门',
            code: 'PM00002',
            status: '启用',
            establishDate: '2025-04-01',
            isVirtual: true,
        },
        {
            id: '1-4',
            name: '产品部下级',
            level: 1,
            expanded: false,
            type: '部门',
            code: 'PM00003',
            status: '启用',
            establishDate: '2025-04-01',
            isVirtual: true,
        },
        {
            id: '1-5',
            name: '产品部子部门',
            level: 1,
            expanded: false,
            type: '部门',
            code: 'PM00004',
            status: '启用',
            establishDate: '2025-05-01',
            isVirtual: true,
        },
        {
            id: '1-6',
            name: '双11',
            level: 1,
            expanded: false,
            type: '部门',
            code: 'PM00006',
            status: '启用',
            establishDate: '2025-11-01',
            isVirtual: true,
        },
        {
            id: '1-7',
            name: '新的架构',
            level: 1,
            expanded: false,
            type: '部门',
            status: '启用',
            establishDate: '2026-01-01',
        }
      ]
    }
  ]);

  const toggleExpand = (nodeId: string) => {
    const updateNodes = (nodes: IOrgNode[]): IOrgNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setData(prev => updateNodes(prev));
  };

  const NetworkIcon = () => (
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="9" y="3" width="6" height="6" rx="1"></rect><path d="M12 9v3"></path><path d="M8 17v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><circle cx="6" cy="19" r="2"></circle><circle cx="18" cy="19" r="2"></circle></svg>
  );

  const renderRows = (nodes: IOrgNode[]) => {
    let rows: React.ReactNode[] = [];
    nodes.forEach(node => {
      rows.push(
        <tr key={node.id} className="hover:bg-blue-50/30 border-b border-gray-100 text-sm h-11 group transition-colors">
          <td className="w-10 min-w-[2.5rem] max-w-[2.5rem] text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30">
             <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
          </td>
          <td className="px-2 border-r border-gray-100 min-w-[280px] whitespace-nowrap sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center" style={{ paddingLeft: `${node.level * 24}px` }}>
              {node.children && node.children.length > 0 ? (
                 <button 
                    className="mr-1 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center shrink-0 transition-colors"
                    onClick={() => toggleExpand(node.id)}
                 >
                    {node.expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                 </button>
              ) : <span className="w-5 mr-1 shrink-0 inline-block"></span>}
              
              <span className="mr-1.5 shrink-0 flex items-center justify-center w-5">
                  {node.type === '公司' ? (
                     <LayoutList size={16} className="text-gray-500" />
                  ) : (
                     <NetworkIcon />
                  )}
              </span>

              <span 
                className={`cursor-pointer hover:underline ${node.type === '公司' ? 'text-[#262626] font-medium' : 'text-primary'}`}
              >
                {node.name}
              </span>
              {node.isVirtual && (
                  <span className="ml-2 px-1 text-[10px] border border-[#13A695] text-[#13A695] rounded bg-[#E6F8F6]">关联</span>
              )}
            </div>
          </td>
          <td className="px-4 py-2 text-center text-primary border-r border-gray-100 whitespace-nowrap">
            <div className="flex justify-center">
                <NetworkIcon />
            </div>
          </td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
            {node.type}
          </td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap max-w-[120px] truncate" title={node.manager}>
              {node.manager}
          </td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.shortName}</td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.code}</td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.attribute}</td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.establishDate}</td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.effectiveDate}</td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.description}</td>
          <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">
             <div className="flex items-center">
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${node.status === '启用' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-[#262626]">{node.status}</span>
             </div>
          </td>
          <td className="px-4 py-2 text-center w-32 whitespace-nowrap border-b border-gray-100 sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center space-x-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
               <div 
                   className="w-[18px] h-[18px] rounded-full border border-primary flex items-center justify-center cursor-pointer bg-white hover:bg-primary transition-colors group/btn"
                   title="新增下级"
               >
                   <Plus 
                       size={12} 
                       className="text-primary group-hover/btn:text-white transition-colors" 
                       strokeWidth={2} 
                   />
               </div>
               <Edit3 
                   size={16} 
                   className="cursor-pointer hover:text-primary-hover text-primary" 
               />
               <UserPlus size={16} className="cursor-pointer hover:text-primary-hover text-primary" />
            </div>
          </td>
        </tr>
      );
      if (node.children && node.expanded) {
        rows = rows.concat(renderRows(node.children));
      }
    });
    return rows;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-3 bg-white shrink-0">
        <div 
            className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${activeTab === 'dept' ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setActiveTab('dept')}
        >
            部门维度
        </div>
        <div 
            className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${activeTab === 'project' ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
            onClick={() => setActiveTab('project')}
        >
            项目维度
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === 'dept' && (
            <>
                {/* Sub Tabs */}
                <div className="flex px-4 py-3 bg-white shrink-0">
                    <div className="flex bg-gray-100 p-1 rounded">
                        <button 
                            className={`px-3 py-1 text-xs rounded transition-colors ${subTab === 'structure' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            onClick={() => setSubTab('structure')}
                        >
                            组织架构
                        </button>
                        <button 
                            className={`px-3 py-1 text-xs rounded transition-colors ${subTab === 'position' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            onClick={() => setSubTab('position')}
                        >
                            职位
                        </button>
                    </div>
                </div>

                {/* Structure Content */}
                {subTab === 'structure' && (
                    <>
                        {/* Toolbar */}
                        <div className="px-4 pb-3 flex items-center justify-between bg-white gap-4 shrink-0 border-b border-gray-100">
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="font-bold text-[#262626] text-sm whitespace-nowrap">组织架构(21)</span>
                                
                                <div className="flex items-center text-xs text-[#262626] border border-gray-300 rounded px-2 py-1.5 cursor-pointer whitespace-nowrap bg-white hover:border-primary transition-colors">
                                    <span>展开1级</span>
                                    <ChevronDown size={14} className="ml-1 text-gray-400" />
                                </div>

                                <div className="relative">
                                    <input type="text" placeholder="请输入组织名称" className="border border-gray-300 rounded pl-3 pr-8 py-1.5 text-xs w-48 focus:outline-none focus:border-primary placeholder:text-gray-400" />
                                    <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors flex items-center">
                                    创建
                                    <ChevronDown size={12} className="ml-1" />
                                </button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">移动</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">合并</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">启用</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">停用</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">删除</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">排序</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">导入</button>
                                <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">导出</button>
                                
                                <div className="flex items-center border border-gray-300 rounded ml-2">
                                    <button className="p-1.5 hover:bg-gray-50 border-r border-gray-300" title="设置"><Settings size={14} className="text-primary" /></button>
                                    <button className="p-1.5 hover:bg-gray-50" title="全屏"><Maximize2 size={14} className="text-primary" /></button>
                                </div>

                                <div className="flex items-center border border-gray-300 rounded bg-primary text-white">
                                    <button className="p-1.5 border-r border-primary/20 bg-primary" title="列表"><List size={14} /></button>
                                    <button className="p-1.5 hover:bg-primary-hover bg-white text-gray-500" title="卡片"><Grid size={14} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Info Alert */}
                        <div className="mx-4 mt-2 bg-[#E6F8F6] border border-[#13A695]/20 px-3 py-2 rounded-sm flex items-center text-xs text-gray-600 shrink-0">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#13A695] text-white flex items-center justify-center mr-2 text-[10px] font-bold">i</div>
                            停用部门默认不显示，可点击【设置】按钮配置显示
                        </div>

                        {/* Tree Table */}
                        <div className="flex-1 overflow-auto px-4 py-2">
                            <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                                <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                                    <tr className="h-10">
                                        <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap min-w-[200px] sticky top-0 left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">部门层级</th>
                                        <th className="text-center px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">架构图</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织类别</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门负责人</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门编码</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织属性</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">设立日期</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">生效日期</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织描述</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">状态</th>
                                        <th className="w-32 px-4 whitespace-nowrap border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] text-center">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRows(data)}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* Position Content */}
                {subTab === 'position' && (
                    <>
                        {/* Toolbar */}
                        <div className="px-4 pb-3 flex items-center justify-between bg-white gap-4 shrink-0 border-b border-gray-100">
                            {/* Left side */}
                            <div className="font-bold text-[#262626] text-sm whitespace-nowrap">职位({positions.length})</div>
                            
                            {/* Right side */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button className="bg-[#13A695] hover:bg-[#13A695]/90 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap transition-colors">
                                    创建
                                </button>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    启用
                                </button>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    停用
                                </button>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    删除
                                </button>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    合并
                                </button>
                                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    导入
                                </button>
                                <button className="border border-gray-300 text-[#262626] hover:border-[#13A695] hover:text-[#13A695] px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">
                                    导出
                                </button>
                                <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-500" title="设置">
                                    <Settings size={14} className="text-[#13A695]" />
                                </button>
                            </div>
                        </div>

                        {/* Info Alert */}
                        <div className="mx-4 mt-2 bg-[#E6F8F6] border border-[#13A695]/20 px-3 py-2 rounded-sm flex items-center text-xs text-gray-600 shrink-0">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#13A695] text-white flex items-center justify-center mr-2 text-[10px] font-bold">i</div>
                            停用职位默认不显示，可点击【设置】按钮配置显示
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-auto px-4 py-2">
                            <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                                <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                                    <tr className="h-10">
                                        <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                        </th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职位名称</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职位编码</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">所属部门</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">对应职务</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">状态</th>
                                        <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">生效日期</th>
                                        <th className="w-16 px-4 whitespace-nowrap border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions.map(pos => (
                                        <tr key={pos.id} className="hover:bg-blue-50/30 border-b border-gray-100 text-sm h-11 transition-colors">
                                            <td className="w-10 min-w-[2.5rem] max-w-[2.5rem] text-center border-r border-gray-100 sticky left-0 z-20 bg-white">
                                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                                            </td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#13A695] cursor-pointer hover:underline">{pos.name}</td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#262626]">{pos.shortName}</td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#262626]">{pos.code}</td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#262626]">{pos.department}</td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#262626]">{pos.jobTitle}</td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${pos.status === '启用' ? 'bg-[#52C41A]' : 'bg-red-500'}`}></div>
                                                    <span className="text-[#262626]">{pos.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 border-r border-gray-100 whitespace-nowrap text-[#262626]">{pos.effectiveDate}</td>
                                            <td className="px-4 text-center border-b border-gray-100 sticky right-0 z-20 bg-white shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                                                <Edit3 size={16} className="text-[#13A695] cursor-pointer hover:text-[#13A695]/80 mx-auto" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </>
        )}
        
        {activeTab === 'project' && (
            <>
                {/* Toolbar */}
                <div className="px-4 py-3 flex items-center justify-between bg-white gap-4 shrink-0 border-b border-gray-100">
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-[#262626] text-sm whitespace-nowrap">组织架构</span>
                        
                        <div className="flex items-center text-xs text-[#262626] border border-gray-300 rounded px-2 py-1.5 cursor-pointer whitespace-nowrap bg-white hover:border-primary transition-colors">
                            <span>展开1级</span>
                            <ChevronDown size={14} className="ml-1 text-gray-400" />
                        </div>

                        <div className="relative">
                            <input type="text" placeholder="请输入组织名称" className="border border-gray-300 rounded pl-3 pr-8 py-1.5 text-xs w-64 focus:outline-none focus:border-primary placeholder:text-gray-400" />
                            <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors flex items-center">
                            创建
                            <ChevronDown size={12} className="ml-1" />
                        </button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">移动</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">合并</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">启用</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">停用</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">删除</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">排序</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">导入</button>
                        <button className="border border-primary text-primary hover:bg-primary-light/50 px-3 py-1.5 rounded text-xs bg-white whitespace-nowrap transition-colors">导出</button>
                        
                        <div className="flex items-center border border-gray-300 rounded ml-2">
                            <button className="p-1.5 hover:bg-gray-50 border-r border-gray-300" title="设置"><Settings size={14} className="text-primary" /></button>
                            <button className="p-1.5 hover:bg-gray-50" title="全屏"><Maximize2 size={14} className="text-primary" /></button>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded bg-primary text-white">
                            <button className="p-1.5 border-r border-primary/20 bg-primary" title="列表"><List size={14} /></button>
                            <button className="p-1.5 hover:bg-primary-hover bg-white text-gray-500" title="卡片"><Grid size={14} /></button>
                        </div>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="mx-4 mt-2 bg-[#E6F8F6] border border-[#13A695]/20 px-3 py-2 rounded-sm flex items-center text-xs text-gray-600 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#13A695] text-white flex items-center justify-center mr-2 text-[10px] font-bold">i</div>
                    停用部门默认不显示，可点击【设置】按钮配置显示
                </div>

                {/* Table with Empty State */}
                <div className="flex-1 overflow-auto px-4 py-2 flex flex-col">
                    <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                        <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                            <tr className="h-10">
                                <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap min-w-[150px] sticky top-0 left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">部门层级</th>
                                <th className="text-center px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">架构图</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织类别</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门负责人</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门编码</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织属性</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">设立日期</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">生效日期</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织描述</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">备注</th>
                                <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">状态</th>
                                <th className="w-full border-b border-gray-200 sticky top-0 right-0 z-30 bg-[#F5F6F7]"></th>
                            </tr>
                        </thead>
                    </table>
                    
                    {/* Empty State */}
                    <div className="flex-1 flex flex-col items-center justify-center bg-white border-l border-r border-b border-gray-200 min-h-[400px]">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-300">
                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-[#262626] mb-2">暂无组织架构数据</h3>
                        <p className="text-gray-500 text-sm mb-6">您需要先创建公司，才能开始组织架构搭建</p>
                        <button 
                            className="bg-[#13A695] hover:bg-[#13A695]/90 text-white px-6 py-2 rounded text-sm transition-colors"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            新建公司
                        </button>
                    </div>
                </div>
            </>
        )}
        
        {/* Create Company Modal */}
        {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg shadow-lg w-[800px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-[#262626]">新建公司</h3>
                    </div>
                    
                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {/* Row 1 */}
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    <span className="text-red-500 mr-1">*</span>组织名称：
                                </label>
                                <input type="text" placeholder="请输入（最多128个字）" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
                            </div>
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    部门编码：
                                </label>
                                <input type="text" placeholder="请输入部门编码" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
                            </div>

                            {/* Row 2 */}
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    <span className="text-red-500 mr-1">*</span>组织类别：
                                </label>
                                <div className="flex-1 relative">
                                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary appearance-none bg-white text-[#262626]">
                                        <option>公司</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    简称：
                                </label>
                                <input type="text" placeholder="请输入（最多128个字）" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
                            </div>

                            {/* Row 3 */}
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    设立日期：
                                </label>
                                <div className="flex-1 relative">
                                    <input type="text" placeholder="请输入设立日期" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
                                    <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    <span className="text-red-500 mr-1">*</span>生效日期：
                                </label>
                                <div className="flex-1 relative">
                                    <input type="text" placeholder="请输入生效日期" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
                                    <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    部门负责人：
                                </label>
                                <div className="flex-1 relative">
                                    <input type="text" placeholder="请选择部门负责人" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" readOnly />
                                    <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18"></path><path d="M15 9h-6"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3">
                                    工作地点：
                                </label>
                                <div className="flex-1 relative">
                                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary appearance-none bg-white text-gray-400">
                                        <option>请选择工作地点</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="flex items-start">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3 mt-2">
                                    组织属性：
                                </label>
                                <div className="flex-1 relative">
                                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary appearance-none bg-white text-gray-400">
                                        <option>组织属性</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex items-start">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3 mt-2">
                                    组织描述：
                                </label>
                                <div className="flex-1 relative">
                                    <textarea 
                                        placeholder="请输入描述内容（最多1000个字）" 
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400 resize-none h-24"
                                    ></textarea>
                                    <div className="absolute right-2 bottom-2 text-xs text-gray-400">0 / 1000</div>
                                </div>
                            </div>

                            {/* Row 6 */}
                            <div className="flex items-start">
                                <label className="text-right text-sm text-[#262626] w-24 shrink-0 mr-3 mt-2">
                                    备注：
                                </label>
                                <div className="flex-1 relative">
                                    <textarea 
                                        placeholder="请输入备注（最多1000个字）" 
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400 resize-none h-24"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-lg">
                        <button 
                            onClick={() => setIsCreateModalOpen(false)} 
                            className="px-4 py-2 border border-gray-300 rounded text-sm text-[#262626] hover:bg-gray-50 transition-colors"
                        >
                            取消
                        </button>
                        <button className="px-4 py-2 bg-[#13A695] hover:bg-[#13A695]/90 text-white rounded text-sm transition-colors">
                            确定
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MultiDimOrgPage;
