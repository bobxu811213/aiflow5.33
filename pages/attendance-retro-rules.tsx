




import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Settings } from 'lucide-react';
import { RetroRuleForm } from '../components/attendance/retro-rule-form';
import { ApiService } from '../api/api-service';
import { IRetroRule } from '../types';
import { useAppStore } from '../store/use-app-store';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';

const AttendanceRetroRulesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [rules, setRules] = useState<IRetroRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    aiContext,
    setAiContext,
    startNewSession
  } = useAppStore();

  const fetchData = async () => {
      setLoading(true);
      try {
          const data = await ApiService.getRetroRules();
          setRules(data);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  // Ensure AI context is correct when entering this page if sidebar is open
  useEffect(() => {
      if (aiSidebarOpen) {
          if (aiContext !== 'ATTENDANCE') {
              setAiContext('ATTENDANCE');
              startNewSession();
          }
      }
  }, [aiSidebarOpen]);

  const handleAiChatOpen = () => {
    if (aiContext !== 'ATTENDANCE') {
        setAiContext('ATTENDANCE');
        startNewSession();
    }
    setAiMode('bar');
    setAiSidebarOpen(true);
  };

  const handleCreate = () => {
      setEditingId(null);
      setViewMode('form');
  };

  const handleEdit = (rule: IRetroRule) => {
      setEditingId(rule.id);
      setViewMode('form');
  };

  const handleDelete = async (id: string) => {
      if (confirm('确定要删除该规则吗？')) {
          await ApiService.deleteRetroRule(id);
          fetchData();
      }
  };

  const handleSubmitForm = async (formData: any) => {
      if (editingId) {
          // Update
          await ApiService.updateRetroRule({ ...formData, id: editingId });
      } else {
          // Create
          await ApiService.createRetroRule(formData);
      }
      fetchData();
      setViewMode('list');
  };

  if (viewMode === 'form') {
      const initialData = editingId ? rules.find(r => r.id === editingId) : undefined;
      return (
          <RetroRuleForm 
              initialData={initialData}
              title={editingId ? '编辑补卡规则' : '新建补卡规则'}
              onCancel={() => setViewMode('list')}
              onSubmit={handleSubmitForm}
          />
      );
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden relative">
        {/* Toolbar */}
        <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4">
            <div className="font-bold text-[#262626] text-base shrink-0">补卡规则({rules.length})</div>
            
            <div className="flex items-center space-x-2 shrink-0">
                <button 
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors flex items-center"
                    onClick={handleCreate}
                >
                    <Plus size={16} className="mr-1" />
                    新建规则
                </button>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="搜索规则名称" 
                        className="border border-gray-300 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400 w-48"
                    />
                    <Search size={16} className="absolute left-3 top-2 text-gray-400" />
                </div>
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto px-4 py-2">
            <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
                <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                    <tr className="h-10 text-left">
                        <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/></th>
                        <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">规则名称</th>
                        <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">适用范围</th>
                        <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">创建时间</th>
                        <th className="px-4 py-2 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">创建人</th>
                        <th className="w-32 px-4 py-2 border-b border-gray-200 text-center sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">操作</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {rules.map(rule => (
                        <tr key={rule.id} className="border-b border-gray-100 hover:bg-blue-50/30 h-11 transition-colors group">
                            <td className="text-center border-r border-gray-100 sticky left-0 z-20 bg-white group-hover:bg-blue-50/30">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </td>
                            <td className="px-4 py-2 border-r border-gray-100 text-primary font-medium cursor-pointer hover:underline bg-white group-hover:bg-blue-50/30" onClick={() => handleEdit(rule)}>
                                {rule.ruleName}
                            </td>
                            <td className="px-4 py-2 border-r border-gray-100 text-[#262626] bg-white group-hover:bg-blue-50/30">
                                {rule.scope === 'all' ? '全体员工' : '部分员工'}
                            </td>
                            <td className="px-4 py-2 border-r border-gray-100 text-gray-600 bg-white group-hover:bg-blue-50/30">
                                {rule.createTime}
                            </td>
                            <td className="px-4 py-2 border-r border-gray-100 text-gray-600 bg-white group-hover:bg-blue-50/30">
                                {rule.creator}
                            </td>
                            <td className="px-4 py-2 text-center bg-white group-hover:bg-blue-50/30 sticky right-0 z-20 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">
                                <div className="flex items-center justify-center space-x-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div 
                                        title="编辑" 
                                        className="cursor-pointer hover:text-primary-hover"
                                        onClick={() => handleEdit(rule)}
                                    >
                                        <Edit3 size={16} />
                                    </div>
                                    <div 
                                        title="删除" 
                                        className="cursor-pointer hover:text-red-500"
                                        onClick={() => handleDelete(rule.id)}
                                    >
                                        <Trash2 size={16} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {rules.length === 0 && !loading && (
                        <tr>
                            <td colSpan={6} className="text-center py-12 text-gray-400">暂无补卡规则</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

        <AiAssistantModal 
            isOpen={aiSidebarOpen}
            onClose={() => setAiSidebarOpen(false)}
            initialMode={aiMode}
            onModeChange={setAiMode}
            onSubmit={async () => {}} // API calls handled internally by modal based on type
            onSuccess={fetchData}
        />
    </div>
  );
};

export default AttendanceRetroRulesPage;