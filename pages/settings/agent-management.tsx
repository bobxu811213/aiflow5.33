import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, List as ListIcon, LayoutGrid, MoreHorizontal, X, Upload, Check, ChevronDown, Zap, Cpu, Wrench, LayoutTemplate, GitMerge } from 'lucide-react';
import { Modal } from '../../components/ui/modal';

interface Agent {
  id: string;
  name: string;
  creator: string;
  createTime: string;
  updater: string;
  updateTime: string;
  status: 'enabled' | 'disabled';
  avatar?: string;
  model?: string;
  tools?: string[];
  process?: string;
  welcomeMessage?: string;
  usageScenario?: string;
}

const mockAgents: Agent[] = [
  { id: '1', name: '招聘助手', creator: '张三', createTime: '2023-10-01 10:00', updater: '李四', updateTime: '2023-10-05 14:30', status: 'enabled', model: 'gemini-1.5-pro', tools: ['ai-import', 'ocr'], process: 'onboarding', welcomeMessage: '你好！我是招聘助手，有什么可以帮您的？', usageScenario: '招聘-职位管理' },
  { id: '2', name: '绩效分析专家', creator: '王五', createTime: '2023-10-02 11:20', updater: '王五', updateTime: '2023-10-02 11:20', status: 'enabled', usageScenario: '绩效-绩效指标' },
  { id: '3', name: '入职引导', creator: '赵六', createTime: '2023-10-03 09:15', updater: '张三', updateTime: '2023-10-06 16:45', status: 'disabled', usageScenario: '员工-员工档案' },
  { id: '4', name: '薪酬顾问', creator: '李四', createTime: '2023-10-04 15:00', updater: '李四', updateTime: '2023-10-04 15:00', status: 'enabled', usageScenario: '薪酬-薪资核算' },
  { id: '5', name: '政策问答', creator: '张三', createTime: '2023-10-05 10:30', updater: '赵六', updateTime: '2023-10-07 09:20', status: 'enabled', usageScenario: '组织-组织设置' },
];

const MODELS = [
  { label: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro', desc: '深度推理核心，处理复杂逻辑的终极选择' },
  { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash', desc: '新一代速度冠军，适合毫秒级响应场景' },
  { label: 'GPT-4o', value: 'gpt-4o', desc: '强大的多模态大模型，支持复杂交互' },
  { label: 'Claude 3.5 Sonnet', value: 'claude-3.5-sonnet', desc: '速度与智力的完美平衡，代码能力出众' },
];

const TOOLS = [
  { label: 'AI 导入', value: 'ai-import', desc: '支持多种格式文档的一键导入与解析', boundCards: ['员工档案卡片', '简历解析卡片'] },
  { label: 'AI 黏贴', value: 'ai-paste', desc: '智能识别剪贴板内容并结构化提取', boundCards: ['快捷录入卡片'] },
  { label: 'OCR 识别', value: 'ocr', desc: '高精度图像文字识别与提取', boundCards: ['证件信息卡片', '票据报销卡片'] },
  { label: '联网搜索', value: 'web-search', desc: '实时获取互联网最新资讯与数据', boundCards: ['资讯摘要卡片'] },
];

const PROCESSES = [
  { label: '入职流程', value: 'onboarding', desc: '标准化新员工入职办理与引导指引' },
  { label: '离职流程', value: 'resignation', desc: '规范化员工离职交接与审批流转' },
  { label: '调岗流程', value: 'transfer', desc: '跨部门/岗位调动的审批与记录跟踪' },
  { label: '转正流程', value: 'regularization', desc: '试用期员工转正评估与审批处理' },
];

const TABS = [
  { id: 'identity', label: '1. 基础信息' },
  { id: 'model', label: '2. 大模型' },
  { id: 'tool', label: '3. 工具' },
  { id: 'process', label: '4. 流程' },
];

const SelectionCard = ({ 
  title, 
  description, 
  selected, 
  onClick, 
  icon,
  tags
}: { 
  title: string; 
  description: string; 
  selected: boolean; 
  onClick: () => void;
  icon?: React.ReactNode;
  tags?: string[];
  key?: string | number;
}) => {
  return (
    <div 
      className={`border rounded-xl p-4 cursor-pointer transition-all flex items-start space-x-4 ${
        selected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-500'}`}>
        {icon || <Zap size={20} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-gray-900 truncate">{title}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ml-2 ${
            selected ? 'border-primary text-primary bg-primary/10' : 'border-gray-200 text-gray-400'
          }`}>
            {selected ? '已启用' : '已禁用'}
          </span>
        </div>
        <p className={`text-xs text-gray-500 line-clamp-2 ${tags && tags.length > 0 ? 'mb-3' : ''}`}>{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200 flex items-center">
                <LayoutTemplate size={10} className="mr-1 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AgentManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  
  // Modal State
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState('identity');

  const toggleStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'enabled' ? 'disabled' : 'enabled' } 
        : agent
    ));
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent({ ...agent });
    setActiveTab('identity');
    setIsConfigModalOpen(true);
  };

  const handleSaveConfig = () => {
    if (editingAgent) {
      setAgents(agents.map(a => a.id === editingAgent.id ? editingAgent : a));
      setIsConfigModalOpen(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB] p-4 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <span>首页</span>
        <span className="mx-2">&gt;</span>
        <span>设置</span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">智能体管理</span>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg p-4 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索智能体名称" 
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded p-0.5">
              <button 
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('list')}
                title="列表视图"
              >
                <ListIcon size={16} />
              </button>
              <button 
                className={`p-1 rounded ${viewMode === 'card' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('card')}
                title="卡片视图"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
            <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">
              <Plus size={16} className="mr-1" />
              新建智能体
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'list' ? (
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl">智能体名称</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium">创建人</th>
                  <th className="px-4 py-3 font-medium">创建时间</th>
                  <th className="px-4 py-3 font-medium">更新人</th>
                  <th className="px-4 py-3 font-medium">更新时间</th>
                  <th className="px-4 py-3 font-medium rounded-tr w-24">操作</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{agent.name}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => toggleStatus(agent.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${agent.status === 'enabled' ? 'bg-primary' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${agent.status === 'enabled' ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{agent.creator}</td>
                    <td className="px-4 py-3 text-gray-600">{agent.createTime}</td>
                    <td className="px-4 py-3 text-gray-600">{agent.updater}</td>
                    <td className="px-4 py-3 text-gray-600">{agent.updateTime}</td>
                    <td className="px-4 py-3">
                      <button 
                        className="text-primary hover:text-primary-hover mr-3"
                        onClick={() => handleEdit(agent)}
                      >编辑</button>
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <div key={agent.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-primary-light text-primary flex items-center justify-center font-bold text-lg">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-base">{agent.name}</h3>
                        <div className="text-xs text-gray-500 mt-0.5">ID: {agent.id.padStart(4, '0')}</div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">创建人</span>
                      <span>{agent.creator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">创建时间</span>
                      <span>{agent.createTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">更新人</span>
                      <span>{agent.updater}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">更新时间</span>
                      <span>{agent.updateTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">状态</span>
                      <button 
                        onClick={() => toggleStatus(agent.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${agent.status === 'enabled' ? 'bg-primary' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${agent.status === 'enabled' ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <button 
                      className="text-primary hover:text-primary-hover text-sm font-medium"
                      onClick={() => handleEdit(agent)}
                    >编辑配置</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        title="智能体配置"
        width="w-[1000px]"
        noContentPadding
        aside={
          editingAgent && (
            <div className="w-72 flex flex-col h-full bg-gray-50">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                <h3 className="font-medium text-gray-800 text-sm">已选资源清单</h3>
                <Search size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Model */}
                <div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600 font-medium">模型</span>
                    <span className="text-gray-400 text-xs">{editingAgent.model ? '1' : '0'} / 1</span>
                  </div>
                  {editingAgent.model ? (
                    <div className="bg-white border border-gray-200 rounded p-2 flex justify-between items-center text-sm shadow-sm">
                      <span className="truncate pr-2">{MODELS.find(m => m.value === editingAgent.model)?.label}</span>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">已启用</span>
                        <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setEditingAgent({...editingAgent, model: undefined})} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 bg-gray-100/50 rounded p-3 text-center border border-dashed border-gray-200">尚未装载模型</div>
                  )}
                </div>

                {/* Tools */}
                <div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600 font-medium">工具</span>
                    <span className="text-gray-400 text-xs">{(editingAgent.tools || []).length} / {TOOLS.length}</span>
                  </div>
                  {(editingAgent.tools || []).length > 0 ? (
                    <div className="space-y-2">
                      {(editingAgent.tools || []).map(toolVal => {
                        const tool = TOOLS.find(t => t.value === toolVal);
                        if (!tool) return null;
                        return (
                          <div key={tool.value} className="bg-white border border-gray-200 rounded p-2 flex flex-col text-sm shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="truncate pr-2 font-medium text-gray-700">{tool.label}</span>
                              <div className="flex items-center space-x-2 shrink-0">
                                <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">已启用</span>
                                <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setEditingAgent({...editingAgent, tools: editingAgent.tools!.filter(t => t !== tool.value)})} />
                              </div>
                            </div>
                            {tool.boundCards && tool.boundCards.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-1">
                                {tool.boundCards.map(card => (
                                  <span key={card} className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100 flex items-center">
                                    <LayoutTemplate size={10} className="mr-1 opacity-50" />
                                    {card}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 bg-gray-100/50 rounded p-3 text-center border border-dashed border-gray-200">尚未装载工具</div>
                  )}
                </div>

                {/* Process */}
                <div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600 font-medium">流程</span>
                    <span className="text-gray-400 text-xs">{editingAgent.process ? '1' : '0'} / 1</span>
                  </div>
                  {editingAgent.process ? (
                    <div className="bg-white border border-gray-200 rounded p-2 flex justify-between items-center text-sm shadow-sm">
                      <span className="truncate pr-2">{PROCESSES.find(p => p.value === editingAgent.process)?.label}</span>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">已启用</span>
                        <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setEditingAgent({...editingAgent, process: undefined})} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 bg-gray-100/50 rounded p-3 text-center border border-dashed border-gray-200">尚未装载流程</div>
                  )}
                </div>
              </div>
            </div>
          )
        }
        footer={
          <>
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
              onClick={() => setIsConfigModalOpen(false)}
            >
              取消
            </button>
            <button 
              className="px-4 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors"
              onClick={handleSaveConfig}
            >
              保存
            </button>
          </>
        }
      >
        {editingAgent && (
          <div className="flex flex-col h-[60vh] min-h-[500px]">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6 pt-2 bg-white shrink-0">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {activeTab === 'identity' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-start space-x-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden relative group cursor-pointer">
                        {editingAgent.avatar ? (
                          <img src={editingAgent.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-primary">{editingAgent.name.charAt(0)}</span>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={16} className="text-white" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">更换头像</span>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">助手名称 <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          value={editingAgent.name}
                          onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                        <input 
                          type="text" 
                          value={editingAgent.id.padStart(4, '0')}
                          disabled
                          className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-1.5 text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">使用场景</label>
                        <input 
                          type="text" 
                          value={editingAgent.usageScenario || ''}
                          disabled
                          className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-1.5 text-sm text-gray-500 cursor-not-allowed"
                          placeholder="暂无使用场景"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Welcome Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">默认欢迎语</label>
                    <textarea 
                      value={editingAgent.welcomeMessage || ''}
                      onChange={(e) => setEditingAgent({...editingAgent, welcomeMessage: e.target.value})}
                      maxLength={200}
                      rows={4}
                      placeholder="请输入默认欢迎语，最多200字"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {(editingAgent.welcomeMessage || '').length}/200
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'model' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MODELS.map(model => (
                    <SelectionCard
                      key={model.value}
                      title={model.label}
                      description={model.desc}
                      selected={editingAgent.model === model.value}
                      onClick={() => setEditingAgent({...editingAgent, model: editingAgent.model === model.value ? undefined : model.value})}
                      icon={<Cpu size={20} />}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'tool' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TOOLS.map(tool => (
                    <SelectionCard
                      key={tool.value}
                      title={tool.label}
                      description={tool.desc}
                      tags={tool.boundCards}
                      selected={(editingAgent.tools || []).includes(tool.value)}
                      onClick={() => {
                        const tools = editingAgent.tools || [];
                        if (tools.includes(tool.value)) {
                          setEditingAgent({...editingAgent, tools: tools.filter(t => t !== tool.value)});
                        } else {
                          setEditingAgent({...editingAgent, tools: [...tools, tool.value]});
                        }
                      }}
                      icon={<Wrench size={20} />}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'process' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROCESSES.map(process => (
                    <SelectionCard
                      key={process.value}
                      title={process.label}
                      description={process.desc}
                      selected={editingAgent.process === process.value}
                      onClick={() => setEditingAgent({...editingAgent, process: editingAgent.process === process.value ? undefined : process.value})}
                      icon={<GitMerge size={20} />}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AgentManagementPage;

