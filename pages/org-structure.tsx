
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from '../api/api-service';
import { IOrgNode } from '../types';
import { Plus, MoreHorizontal, Calendar, ChevronDown, ChevronRight, Info, Edit3, UserPlus, HelpCircle, Sparkles, PenTool, Building2 } from 'lucide-react';
import { CreateOrgModal } from '../components/org/create-org-modal';
import { OrgDetailModal } from '../components/org/org-detail-modal';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { useAppStore } from '../store/use-app-store';

const OrgStructurePage: React.FC = () => {
  const [data, setData] = useState<IOrgNode[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false); // Dropdown for Create
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    aiContext,
    setAiContext,
    setAiModeLocked,
    startNewSession
  } = useAppStore();
  
  const [selectedNode, setSelectedNode] = useState<IOrgNode | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'create-sub'>('create');
  
  // Detail Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailNode, setDetailNode] = useState<IOrgNode | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const createBtnRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
      const result = await ApiService.getOrgStructure();
      setData(result);
  };

  useEffect(() => {
    fetchData();
    
    // Click outside to close create menu
    const handleClickOutside = (event: MouseEvent) => {
        if (createBtnRef.current && !createBtnRef.current.contains(event.target as Node)) {
            setIsCreateMenuOpen(false);
        }
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ensure AI context is correct when entering this page if sidebar is open
  useEffect(() => {
      if (aiSidebarOpen) {
          if (aiContext !== 'ORG') {
              setAiContext('ORG');
              startNewSession();
          }
          setAiModeLocked(false);
      }
  }, [aiSidebarOpen]);

  const handleOrgCreate = async (data: any) => {
      await ApiService.createOrgNode(data);
      await fetchData();
  };

  const handleEdit = (node: IOrgNode) => {
    setSelectedNode(node);
    setModalMode('edit');
    setIsCreateModalOpen(true);
  };

  const handleAddSub = (node: IOrgNode) => {
    setSelectedNode(node);
    setModalMode('create-sub');
    setIsCreateModalOpen(true);
  };

  const handleManualCreate = () => {
    setSelectedNode(null);
    setModalMode('create');
    setIsCreateModalOpen(true);
    setIsCreateMenuOpen(false);
  };

  const handleAiCreate = () => {
    setAiMode('full');
    setAiContext('ORG');
    setAiModeLocked(false);
    if (aiContext !== 'ORG') {
        startNewSession();
    }
    setAiSidebarOpen(true);
    setIsCreateMenuOpen(false);
  };

  const handleAiChatOpen = () => {
    if (aiContext !== 'ORG') {
        setAiContext('ORG');
        startNewSession();
    }
    setAiMode('bar');
    setAiModeLocked(false);
    setAiSidebarOpen(true);
  };

  const handleShowDetail = (node: IOrgNode) => {
    setDetailNode(node);
    setIsDetailModalOpen(true);
  };

  const handleDetailEdit = (node: IOrgNode) => {
    setIsDetailModalOpen(false);
    handleEdit(node);
  };

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

  // Helper to render rows
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
                     <Building2 size={16} className="text-[#1677FF]" />
                  ) : null}
              </span>

              <span 
                className={`cursor-pointer hover:underline ${node.type === '公司' ? 'text-[#1677FF] font-medium' : 'text-primary'}`}
                onClick={() => handleShowDetail(node)}
              >
                {node.name}
              </span>
              {node.isVirtual && (
                  <span className="ml-2 px-1 text-[10px] border border-gray-300 text-gray-500 rounded bg-gray-50">虚拟</span>
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
          <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">
            <span className={node.headcountCurrent > 0 ? "text-[#FF4D4F]" : "text-[#262626]"}>{node.headcountCurrent}</span>
            <span className="text-gray-400 mx-0.5">/</span>
            <span className="text-[#262626]">{node.headcountTotal}</span>
          </td>
           <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">
            <span className={node.establishmentCurrent > 0 ? "text-[#FF4D4F]" : "text-[#262626]"}>{node.establishmentCurrent}</span>
            <span className="text-gray-400 mx-0.5">/</span>
            <span className="text-[#262626]">{node.establishmentTotal}</span>
          </td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap max-w-[120px] truncate" title={node.manager}>
              {node.manager}
          </td>
          <td className={`px-4 py-2 border-r border-gray-100 whitespace-nowrap ${node.concurrentCount > 0 ? 'text-primary' : 'text-[#262626]'}`}>
              {node.concurrentCount > 0 ? node.concurrentCount : '0'}
          </td>
          <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.shortName}</td>
           <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.code}</td>
           <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.storeNumber}</td>
           <td className="px-4 py-2 border-r border-gray-100 text-[#262626] whitespace-nowrap">{node.attribute}</td>
           <td className="px-4 py-2 text-center w-32 whitespace-nowrap border-b border-gray-100 sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
             <div className="flex items-center justify-center space-x-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <div 
                    className="w-[18px] h-[18px] rounded-full border border-primary flex items-center justify-center cursor-pointer bg-white hover:bg-primary transition-colors group/btn"
                    onClick={() => handleAddSub(node)}
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
                    onClick={() => handleEdit(node)}
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

  const NetworkIcon = () => (
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="9" y="3" width="6" height="6" rx="1"></rect><path d="M12 9v3"></path><path d="M8 17v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><circle cx="6" cy="19" r="2"></circle><circle cx="18" cy="19" r="2"></circle></svg>
  )

  const actionButtons = ['移动', '合并', '启用', '停用', '删除'];
  // Usually hidden buttons under "..."
  const moreButtons = ['排序', '生成快照'];

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
                        className={`px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${tab.label === '组织架构' ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                        onClick={() => {
                            if (tab.path !== '#') {
                                window.location.hash = tab.path;
                            }
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
                <div className="ml-auto flex items-center pb-2 pl-2">
                    <button className="border border-gray-300 text-gray-600 px-3 py-1 rounded-sm text-xs hover:bg-gray-50 whitespace-nowrap transition-colors">变更记录</button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="p-4 flex items-center justify-between bg-white gap-4 shrink-0 border-b border-gray-100">
                <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-[#262626] text-base whitespace-nowrap">组织架构(212)</span>
                    
                    <div className="flex items-center text-xs text-[#262626] border border-gray-300 rounded px-2 py-1.5 cursor-pointer whitespace-nowrap bg-white hover:border-primary transition-colors">
                        <span>展开1级</span>
                        <ChevronDown size={14} className="ml-1 text-gray-400" />
                    </div>
                    
                    <HelpCircle size={15} className="text-gray-400 shrink-0 cursor-pointer hover:text-gray-600 hidden sm:block" />
                    
                    <div className="relative group hidden sm:block">
                        <input type="text" placeholder="请选择生效日期" className="border border-gray-300 rounded pl-3 pr-8 py-1.5 text-sm w-36 focus:outline-none focus:border-primary placeholder:text-gray-400" />
                        <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 group-hover:text-primary" />
                    </div>
                    
                    <div className="relative hidden md:block">
                        <input type="text" placeholder="请输入组织名称" className="border border-gray-300 rounded pl-3 pr-8 py-1.5 text-sm w-48 focus:outline-none focus:border-primary placeholder:text-gray-400" />
                        <div className="absolute right-2 top-1.5 text-gray-400 cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* Split Button for Create */}
                    <div className="relative" ref={createBtnRef}>
                        <button 
                            className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm whitespace-nowrap shadow-sm transition-colors flex items-center"
                            onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                        >
                            创建
                            <ChevronDown size={14} className="ml-1 opacity-80" />
                        </button>
                        {isCreateMenuOpen && (
                            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <button 
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center"
                                    onClick={handleManualCreate}
                                >
                                    <PenTool size={14} className="mr-2" />
                                    手动创建
                                </button>
                                <button 
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#927FFF] flex items-center"
                                    onClick={handleAiCreate}
                                >
                                    <Sparkles size={14} className="mr-2 text-[#927FFF]" />
                                    AI 助手创建
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="hidden xl:flex items-center gap-2">
                        {actionButtons.map(btn => (
                            <button key={btn} className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white whitespace-nowrap transition-colors">
                                {btn}
                            </button>
                        ))}
                    </div>

                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`border border-primary text-primary px-2 py-1.5 rounded bg-white hover:bg-primary-light/50 ${isMenuOpen ? 'bg-primary-light' : ''}`}
                        >
                            <MoreHorizontal size={16} />
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 flex flex-col">
                                <div className="xl:hidden border-b border-gray-100 pb-1 mb-1">
                                    {actionButtons.map(btn => (
                                        <button key={btn} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full transition-colors">
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                                {moreButtons.map(btn => (
                                    <button key={btn} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full transition-colors">
                                        {btn}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Alert */}
            <div className="mx-4 mt-2 bg-primary-light border border-primary/20 px-3 py-2 rounded-sm flex items-center text-xs text-gray-600 shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
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
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">在职 (直属/总共)</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">编制 (直属/总共)</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门负责人</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">兼任人数</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">部门编码</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">门店编号</th>
                            <th className="text-left px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">组织属性</th>
                            <th className="w-32 px-4 whitespace-nowrap border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(data)}
                    </tbody>
                </table>
            </div>

            {/* Floating Buttons Bottom Right - Absolute to content container */}
            {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}
        </div>
      
        <AiAssistantModal 
            isOpen={aiSidebarOpen}
            onClose={() => setAiSidebarOpen(false)}
            initialMode={aiMode}
            onModeChange={setAiMode}
            onSubmit={handleOrgCreate}
            onSuccess={fetchData}
        />

        <CreateOrgModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)}
            initialData={modalMode === 'edit' ? selectedNode : undefined}
            parentData={modalMode === 'create-sub' ? selectedNode : undefined}
            mode={modalMode}
            onSubmit={handleOrgCreate}
        />
        
        <OrgDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            data={detailNode}
            onEdit={handleDetailEdit}
        />
    </div>
  );
};

export default OrgStructurePage;
