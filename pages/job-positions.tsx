
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from '../api/api-service';
import { IJobPosition, IJobDuty, IJobDutyCategory } from '../types';
import { HelpCircle, Filter, Settings, ChevronLeft, ChevronRight, Edit3, ChevronDown, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import { CreateJobModal } from '../components/job/create-job-modal';
import { CreateDutyModal } from '../components/job/create-duty-modal';
import { CreateDutyCategoryModal } from '../components/job/create-duty-category-modal';
import { JobDetailModal } from '../components/job/job-detail-modal';
import { DutyDetailModal } from '../components/job/duty-detail-modal';
import { DutyCategoryDetailModal } from '../components/job/duty-category-detail-modal';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { useAppStore } from '../store/use-app-store';

const JobPositionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('职务');
  const [positions, setPositions] = useState<IJobPosition[]>([]);
  const [duties, setDuties] = useState<IJobDuty[]>([]);
  const [categories, setCategories] = useState<IJobDutyCategory[]>([]);
  
  // Modals for Create/Edit
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateDutyModalOpen, setIsCreateDutyModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  
  // Data for editing
  const [editingPosition, setEditingPosition] = useState<IJobPosition | null>(null);
  const [editingDuty, setEditingDuty] = useState<IJobDuty | null>(null);
  const [editingCategory, setEditingCategory] = useState<IJobDutyCategory | null>(null);

  // Modals for Details
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPosition | null>(null);

  const [isDutyDetailOpen, setIsDutyDetailOpen] = useState(false);
  const [selectedDuty, setSelectedDuty] = useState<IJobDuty | null>(null);

  const [isCategoryDetailOpen, setIsCategoryDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IJobDutyCategory | null>(null);

  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const fetchData = () => {
    if (activeTab === '职位') {
        ApiService.getJobPositions().then(setPositions);
    } else if (activeTab === '职务') {
        ApiService.getJobDuties().then(setDuties);
    } else if (activeTab === '职务分类') {
        ApiService.getJobDutyCategories().then(setCategories);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const handleAiChatOpen = () => {
    if (aiContext !== 'ORG') {
        setAiContext('ORG');
        startNewSession();
    }
    setAiMode('bar');
    setAiModeLocked(false);
    setAiSidebarOpen(true);
  };

  // Duty Handlers
  const handleCreateDuty = () => {
      setEditingDuty(null);
      setIsCreateDutyModalOpen(true);
  }

  const handleEditDuty = (duty: IJobDuty) => {
      setEditingDuty(duty);
      setIsCreateDutyModalOpen(true);
  }

  const handleDutyClick = (duty: IJobDuty) => {
      setSelectedDuty(duty);
      setIsDutyDetailOpen(true);
  }

  // Category Handlers
  const handleCreateCategory = () => {
      setEditingCategory(null);
      setIsCreateCategoryModalOpen(true);
  }

  const handleEditCategory = (category: IJobDutyCategory) => {
      setEditingCategory(category);
      setIsCreateCategoryModalOpen(true);
  }

  const handleCategoryClick = (category: IJobDutyCategory) => {
      setSelectedCategory(category);
      setIsCategoryDetailOpen(true);
  }

  // Position Handlers
  const handleCreatePosition = () => {
      setEditingPosition(null);
      setIsCreateModalOpen(true);
  }

  const handleEditPosition = (position: IJobPosition) => {
      setEditingPosition(position);
      setIsCreateModalOpen(true);
  }

  const handlePositionClick = (position: IJobPosition) => {
      setSelectedJob(position);
      setIsJobDetailOpen(true);
  }

  // Detail to Edit Transition
  const handleDetailEditDuty = (duty: IJobDuty) => {
      setIsDutyDetailOpen(false);
      handleEditDuty(duty);
  }

  const handleDetailEditCategory = (category: IJobDutyCategory) => {
      setIsCategoryDetailOpen(false);
      handleEditCategory(category);
  }

  const handleDetailEditJob = (job: IJobPosition) => {
      setIsJobDetailOpen(false);
      handleEditPosition(job);
  }

  const jobActionButtons = ['启用', '停用', '删除', '合并', '导入', '导出'];

  return (
    <div className={`flex flex-col h-full overflow-hidden relative transition-all duration-300 ease-in-out`}>
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-3 shrink-0 bg-white">
        {['职务分类', '职务', '职位'].map((tab, idx) => (
            <div 
                key={idx} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-600 hover:text-primary'}`}>
                {tab}
            </div>
        ))}
         <div className="ml-auto flex items-center space-x-2 pb-2">
            <button className="border border-gray-300 text-gray-600 px-3 py-1 rounded-sm text-xs hover:bg-gray-50 transition-colors">变更记录</button>
            <button className="border border-gray-300 text-gray-600 px-3 py-1 rounded-sm text-xs hover:bg-gray-50 transition-colors">设置</button>
        </div>
      </div>

      {activeTab === '职务' && (
        <>
            {/* Toolbar for Duties */}
            <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4">
                <div className="font-bold text-[#262626] text-base shrink-0">职务({duties.length})</div>
                
                <div className="flex items-center space-x-2 shrink-0">
                    <button 
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors"
                        onClick={handleCreateDuty}
                    >
                        创建
                    </button>
                    <button className="border border-gray-300 text-gray-600 hover:border-primary hover:text-primary px-4 py-1.5 rounded text-sm bg-white transition-colors">删除</button>
                    <button className="border border-gray-300 text-gray-600 hover:border-primary hover:text-primary px-4 py-1.5 rounded text-sm bg-white transition-colors">排序</button>
                    <button className="border border-gray-300 text-gray-600 px-2 py-1.5 rounded bg-white hover:border-primary hover:text-primary transition-colors">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Table for Duties */}
            <div className="flex-1 overflow-auto px-4 py-2">
                <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                    <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium sticky top-0 z-10 shadow-sm">
                        <tr className="h-10 text-left">
                            <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/></th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">职务名称</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职务编码</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职务分类</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">描述</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">生效日期</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职务薪级</th>
                            <th className="w-12 px-4 py-2 border-b border-gray-200 sticky right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {duties.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 h-11 transition-colors group">
                                <td className="text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                <td 
                                    className="px-4 py-2 text-[#262626] border-r border-gray-100 whitespace-nowrap font-medium sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] cursor-pointer hover:text-primary hover:underline"
                                    onClick={() => handleDutyClick(item)}
                                >
                                    {item.name}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.shortName}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.code}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.category}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.description}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.effectiveDate}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.jobGrade}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                                    <Pencil size={16} className="text-primary cursor-pointer mx-auto hover:text-primary-hover" onClick={() => handleEditDuty(item)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
      )}

      {activeTab === '职位' && (
        <>
            {/* Toolbar for Positions */}
            <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4">
                <div className="font-bold text-[#262626] text-base shrink-0">职位({positions.length})</div>
                
                <div className="flex items-center space-x-2 shrink-0">
                    <button 
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors"
                        onClick={handleCreatePosition}
                    >
                        创建
                    </button>
                    
                    <div className="hidden xl:flex items-center space-x-2">
                        {jobActionButtons.map(btn => (
                            <button key={btn} className="border border-primary text-primary hover:bg-primary-light/50 px-4 py-1.5 rounded text-sm bg-white transition-colors">{btn}</button>
                        ))}
                    </div>

                    <button className="border border-primary text-primary px-2 py-1.5 rounded bg-white hover:bg-primary-light/50 transition-colors"><Settings size={16} /></button>
                    <button className="border border-primary text-primary px-2 py-1.5 rounded bg-white hover:bg-primary-light/50 transition-colors"><Filter size={16} /></button>
                    
                    {/* More Menu for small screens */}
                    <div className="relative xl:hidden" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`border border-primary text-primary px-2 py-1.5 rounded bg-white hover:bg-primary-light/50 ${isMenuOpen ? 'bg-primary-light' : ''}`}
                        >
                            <MoreHorizontal size={16} />
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 flex flex-col">
                                {jobActionButtons.map(btn => (
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
                停用职位默认不显示，可点击【设置】按钮配置显示
            </div>

            {/* Table for Positions */}
            <div className="flex-1 overflow-auto px-4 py-2">
                <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                    <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium sticky top-0 z-10 shadow-sm">
                        <tr className="h-10 text-left">
                            <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/></th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">职位名称</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">简称</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">职位编码</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">所属部门</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">对应职务</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">编制人数</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">生效日期</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">状态</th>
                            <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">任职资格</th>
                            <th className="w-16 px-4 py-2 text-center whitespace-nowrap border-b border-gray-200 sticky right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {positions.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 h-10 transition-colors group">
                                <td className="text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                <td 
                                    className="px-4 py-2 text-primary border-r border-gray-100 whitespace-nowrap cursor-pointer hover:underline font-medium sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]"
                                    onClick={() => handlePositionClick(item)}
                                >
                                    {item.name}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap"></td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.code}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.department}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">{item.dutyName || ''}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">{item.headcount}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">{item.effectiveDate}</td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap">
                                    <span className="flex items-center text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#52C41A] mr-2"></span>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap"></td>
                                <td className="px-4 py-2 text-center whitespace-nowrap sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                                    <Edit3 size={14} className="text-primary cursor-pointer mx-auto hover:text-primary-hover" onClick={() => handleEditPosition(item)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-end px-4 text-xs text-gray-600 shrink-0">
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors"><ChevronLeft size={14}/></button>
                <button className="w-6 h-6 border border-primary text-primary rounded flex items-center justify-center mr-2 bg-primary-light">1</button>
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors">2</button>
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors">3</button>
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors">4</button>
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors">5</button>
                <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors"><ChevronRight size={14}/></button>
                
                <div className="flex items-center ml-2">
                    <span className="border border-gray-200 px-2 py-1 rounded mr-2 flex items-center cursor-pointer hover:border-primary transition-colors">10 条/页 <ChevronDown size={10} className="ml-1"/></span>
                    <span>跳至</span>
                    <input type="text" className="w-8 h-6 border border-gray-200 rounded mx-1 text-center focus:outline-none focus:border-primary" />
                    <span>页</span>
                </div>
            </div>
        </>
      )}

      {activeTab === '职务分类' && (
           <>
             {/* Toolbar for Job Duty Categories */}
             <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4">
                 <div className="font-bold text-[#262626] text-base shrink-0">职务分类({categories.length})</div>
                 
                 <div className="flex items-center space-x-2 shrink-0">
                     <button 
                         className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors"
                         onClick={handleCreateCategory}
                     >
                         创建
                     </button>
                     <button className="border border-gray-300 text-gray-600 hover:border-primary hover:text-primary px-4 py-1.5 rounded text-sm bg-white transition-colors">排序</button>
                 </div>
             </div>
 
             {/* Table for Job Duty Categories */}
             <div className="flex-1 overflow-auto px-4 py-2">
                 <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                     <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium sticky top-0 z-10 shadow-sm">
                         <tr className="h-10 text-left">
                             <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/></th>
                             <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap w-1/3 sticky left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">职务分类名称</th>
                             <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap w-1/3 sticky top-0 z-30 bg-[#F5F6F7]">职务分类编码</th>
                             <th className="w-24 px-4 py-2 border-b border-gray-200 text-center sticky right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]"></th>
                         </tr>
                     </thead>
                     <tbody className="text-sm">
                         {categories.map((item, index) => (
                             <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 h-11 transition-colors group">
                                 <td className="text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                 <td 
                                    className="px-4 py-2 text-[#262626] border-r border-gray-100 whitespace-nowrap font-medium sticky left-10 z-20 bg-white group-hover:bg-blue-50/30 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] cursor-pointer hover:text-primary hover:underline"
                                    onClick={() => handleCategoryClick(item)}
                                >
                                    {item.name}
                                </td>
                                 <td className="px-4 py-2 border-r border-gray-100 whitespace-nowrap text-[#262626]">{item.code}</td>
                                 <td className="px-4 py-2 text-center whitespace-nowrap sticky right-0 z-20 bg-white group-hover:bg-blue-50/30 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                                     <div className="flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <Pencil size={16} className="text-primary cursor-pointer hover:text-primary-hover" onClick={() => handleEditCategory(item)} />
                                         <Trash2 size={16} className="text-primary cursor-pointer hover:text-red-500" />
                                     </div>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
           </>
      )}

       {/* Floating Buttons Bottom Right */}
      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

      <CreateJobModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchData}
        initialData={editingPosition}
      />

      <CreateDutyModal 
        isOpen={isCreateDutyModalOpen}
        onClose={() => setIsCreateDutyModalOpen(false)}
        onSuccess={fetchData}
        initialData={editingDuty}
      />
      
      <CreateDutyCategoryModal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
        onSuccess={fetchData}
        initialData={editingCategory}
      />

      <JobDetailModal
        isOpen={isJobDetailOpen}
        onClose={() => setIsJobDetailOpen(false)}
        data={selectedJob}
        onEdit={handleDetailEditJob}
      />

      <DutyDetailModal
        isOpen={isDutyDetailOpen}
        onClose={() => setIsDutyDetailOpen(false)}
        data={selectedDuty}
        onEdit={handleDetailEditDuty}
      />

      <DutyCategoryDetailModal
        isOpen={isCategoryDetailOpen}
        onClose={() => setIsCategoryDetailOpen(false)}
        data={selectedCategory}
        onEdit={handleDetailEditCategory}
      />

      <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}} // Fallback, data refresh handled by onSuccess
          onSuccess={fetchData}
      />
    </div>
  );
};

export default JobPositionsPage;
