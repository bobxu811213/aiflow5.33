






import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api-service';
import { IEsignTemplate } from '../types';
import { Settings, Maximize2, ExternalLink, FileText, Edit3, ChevronDown, Filter } from 'lucide-react';
import { EditTemplate } from '../components/esign/edit-template';
import { useAppStore } from '../store/use-app-store';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { FloatingToolbar } from '../components/common/floating-toolbar';

const EsignTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<IEsignTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<'templates' | 'documents'>('templates');
  const [editingTemplate, setEditingTemplate] = useState<IEsignTemplate | null>(null);

  // AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    aiContext,
    setAiContext,
    setAiModeLocked,
    setAiSidebarPinned,
    startNewSession
  } = useAppStore();

  const fetchData = async () => {
    const data = await ApiService.getEsignTemplates();
    setTemplates(data);
  };

  useEffect(() => {
    fetchData();
    // Initialize context on mount to avoid race condition with sidebar opening later
    setAiContext('ESIGN');
  }, []);

  // Ensure AI context is correct when entering this page if sidebar is open
  useEffect(() => {
    if (aiSidebarOpen) {
        if (aiContext !== 'ESIGN') {
            setAiContext('ESIGN');
            startNewSession();
        }
        // Force sidebar mode if not already (UX choice)
        if (aiMode !== 'sidebar' && !useAppStore.getState().aiModeLocked) {
             setAiMode('sidebar');
             setAiSidebarPinned(true);
             setAiModeLocked(true);
        }
    }
  }, [aiSidebarOpen]); // Removed aiContext dep to avoid loop

  const handleAiChatOpen = () => {
    setAiContext('ESIGN');
    startNewSession();
    setAiMode('sidebar');
    setAiSidebarPinned(true);
    setAiModeLocked(true);
    setAiSidebarOpen(true);
  };

  const handleEdit = (template: IEsignTemplate) => {
      setEditingTemplate(template);
  };

  const handleBack = () => {
      setEditingTemplate(null);
  };

  const handleSave = () => {
      fetchData(); // Refresh list to get updated data
      // Optionally stay in edit mode or close it. 
      // If we stay, we might need to update editingTemplate with latest data.
      // But typically saving doesn't close the editor immediately if user wants to keep editing.
      // However, for this simplified flow, let's refresh the background list.
  };

  const content = editingTemplate ? (
      <EditTemplate template={editingTemplate} onBack={handleBack} onSave={handleSave} />
  ) : (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-3 shrink-0 bg-white">
        <div 
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-1 ${activeTab === 'templates' ? 'text-white bg-primary rounded-t-sm' : 'text-primary border border-primary rounded-t-sm border-b-0 bg-white hover:bg-primary-light'}`}
        >
            <span>模版({templates.length})</span>
            <span className="text-xs border border-current rounded-full w-3.5 h-3.5 flex items-center justify-center">?</span>
        </div>
        <div 
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-1 ml-2 ${activeTab === 'documents' ? 'text-white bg-primary rounded-t-sm' : 'text-primary border border-primary rounded-t-sm border-b-0 bg-white hover:bg-primary-light'}`}
        >
            <span>文档(5)</span>
            <span className="text-xs border border-current rounded-full w-3.5 h-3.5 flex items-center justify-center">?</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3 flex items-center justify-end bg-gray-50 shrink-0 border-b border-gray-100 min-w-0 gap-2">
         <button className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-sm text-sm shadow-sm transition-colors">
            创建
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-4 py-1.5 rounded-sm text-sm bg-white transition-colors">
            启用
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-4 py-1.5 rounded-sm text-sm bg-white transition-colors">
            禁用
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-4 py-1.5 rounded-sm text-sm bg-white transition-colors">
            批量分享权限
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-4 py-1.5 rounded-sm text-sm bg-white transition-colors">
            删除
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-2 py-1.5 rounded-sm bg-white transition-colors">
            <Settings size={16} />
         </button>
         <button className="border border-gray-300 text-primary hover:border-primary px-2 py-1.5 rounded-sm bg-white transition-colors">
            <Maximize2 size={16} />
         </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse min-w-max">
            <thead className="bg-[#F5F5F5] text-xs text-[#262626] font-medium z-10">
                <tr className="h-10 text-left">
                    <th className="w-10 border-b border-gray-200 text-center sticky top-0 bg-[#F5F5F5] z-20">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                    </th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">模版名称</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">模版说明</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">模版类型</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">个人签署方</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">企业签署方</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">签署时效（天）</th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-colors">
                        状态 <Filter size={12} className="text-primary" />
                    </th>
                    <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap sticky top-0 bg-[#F5F5F5] z-20 font-bold">创建人</th>
                    <th className="w-32 px-4 py-2 border-b border-gray-200 sticky top-0 bg-[#F5F5F5] z-20"></th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {templates.map((template, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 h-11 transition-colors group">
                        <td className="text-center sticky left-0 z-10 bg-white group-hover:bg-blue-50/30">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.name}</td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.description}</td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.type}</td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.individualSigners}</td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.corporateSigners}</td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.validityDays}</td>
                        <td className="px-4 py-2 whitespace-nowrap bg-white group-hover:bg-blue-50/30">
                            <div className="flex items-center text-[#262626]">
                                <span className={`w-2 h-2 rounded-full mr-2 ${template.status === '启用' ? 'bg-[#52C41A]' : 'bg-red-500'}`}></span>
                                {template.status}
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#262626] whitespace-nowrap bg-white group-hover:bg-blue-50/30">{template.creator}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap bg-white group-hover:bg-blue-50/30">
                            <div className="flex items-center justify-end space-x-3 text-primary">
                                <div title="分享" className="cursor-pointer hover:text-primary-hover">
                                    <ExternalLink size={16} />
                                </div>
                                <div title="日志" className="cursor-pointer hover:text-primary-hover">
                                    <FileText size={16} />
                                </div>
                                <div 
                                    title="编辑" 
                                    className="cursor-pointer hover:text-primary-hover"
                                    onClick={() => handleEdit(template)}
                                >
                                    <Edit3 size={16} />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}
    </div>
  );

  return (
    <>
        {content}
        <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}} // No specific submit action yet
          onSuccess={() => {}}
        />
    </>
  );
};

export default EsignTemplatesPage;