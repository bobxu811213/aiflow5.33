import React, { useState } from 'react';
import { ChevronRight, Settings, Maximize2, Filter, PaintBucket, Plus, ChevronDown, X, Info, Trash2, HelpCircle, Pencil } from 'lucide-react';
import { RankGroupModal } from '../../components/job/rank-group-modal';

interface IJobGrade {
  id: string;
  name: string;
  code?: string;
  remarks?: string;
}

interface IJobSequence {
  id: string;
  name: string;
  code?: string;
  scope?: string;
  status: 'enabled' | 'disabled';
  children?: IJobSequence[];
}

interface IJobLevel {
  id: string;
  name: string;
}

interface IJobRankItem {
  id: string;
  name: string;
  children?: IJobRankItem[];
}

interface IJobRankGroup {
  id: string;
  name: string;
  ranks: IJobRankItem[];
  sequence: string;
  status: 'enabled' | 'disabled';
}

interface ISystemTableItem {
  id: string;
  gradeName: string;
  sequence: string;
  subSequence: string;
  jobLevel: string;
  rankName: string;
  applicablePosition: string;
  status: 'enabled' | 'disabled';
}

const JobLevelPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('grade');
  const [showInfo, setShowInfo] = useState(true);
  const [expandedSequences, setExpandedSequences] = useState<string[]>(['1', '2', '3', '4']);
  const [isEditingSequence, setIsEditingSequence] = useState(false);
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [isEditingSystem, setIsEditingSystem] = useState(false);
  const [isEditingRank, setIsEditingRank] = useState(false);
  const [isRankGroupModalOpen, setIsRankGroupModalOpen] = useState(false);
  // State for expanded rank items in the table
  const [expandedRanks, setExpandedRanks] = useState<string[]>(['3-1', '3-2']);

  const tabs = [
    { id: 'grade', label: '职等' },
    { id: 'sequence', label: '序列' },
    { id: 'level', label: '职层' },
    { id: 'rank', label: '职级' },
    { id: 'system', label: '体系表' },
  ];

  const [data, setData] = useState<IJobGrade[]>([
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
  ]);

  const [jobLevels, setJobLevels] = useState<IJobLevel[]>([
    { id: '1', name: '高级' },
    { id: '2', name: '中级' },
    { id: '3', name: '初级' },
    { id: '4', name: '助理' },
  ]);

  const [jobRankGroups, setJobRankGroups] = useState<IJobRankGroup[]>([
    {
      id: '1',
      name: '哈哈',
      ranks: [{ id: '1-1', name: '1' }],
      sequence: '主',
      status: 'enabled'
    },
    {
      id: '2',
      name: '管理类',
      ranks: [
        { id: '2-1', name: '/M2/' },
        { id: '2-2', name: 'M3' },
        { id: '2-3', name: 'M4' },
        { id: '2-4', name: 'M5' },
        { id: '2-5', name: 'M6' },
      ],
      sequence: 'bob测试、技术序列、营销序列',
      status: 'enabled'
    },
    {
      id: '3',
      name: '技术类',
      ranks: [
        {
          id: '3-1', name: 'S1', children: [
            { id: '3-1-1', name: 'S1-1' },
            { id: '3-1-2', name: 'S1-2' },
            { id: '3-1-3', name: 'S1-3' },
          ]
        },
        {
          id: '3-2', name: 'S2', children: [
            { id: '3-2-1', name: 'S2-1' },
            { id: '3-2-2', name: 'S2-2' },
            { id: '3-2-3', name: 'S2-3' },
          ]
        },
      ],
      sequence: '技术序列',
      status: 'enabled'
    },
    {
      id: '4',
      name: '营销类',
      ranks: [
        { id: '4-1', name: 'B1' },
        { id: '4-2', name: 'B2' },
        { id: '4-3', name: 'B3' },
        { id: '4-4', name: 'B4' },
        { id: '4-5', name: 'B5' },
        { id: '4-6', name: 'B6' },
      ],
      sequence: '营销序列',
      status: 'enabled'
    },
  ]);

  const [systemTableData, setSystemTableData] = useState<ISystemTableItem[]>([
    { id: '1', gradeName: '', sequence: '主', subSequence: '子', jobLevel: '', rankName: '1', applicablePosition: '', status: 'enabled' },
    { id: '2', gradeName: '', sequence: 'bob测试', subSequence: '1', jobLevel: '', rankName: '/M2/', applicablePosition: '', status: 'enabled' },
    { id: '3', gradeName: '', sequence: 'bob测试', subSequence: '1', jobLevel: '', rankName: 'M3', applicablePosition: '', status: 'enabled' },
    { id: '4', gradeName: '', sequence: 'bob测试', subSequence: '1', jobLevel: '', rankName: 'M4', applicablePosition: '', status: 'enabled' },
    { id: '5', gradeName: '', sequence: 'bob测试', subSequence: '1', jobLevel: '', rankName: 'M5', applicablePosition: '', status: 'enabled' },
    { id: '6', gradeName: '', sequence: 'bob测试', subSequence: '1', jobLevel: '', rankName: 'M6', applicablePosition: '', status: 'enabled' },
    { id: '7', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: '/M2/', applicablePosition: '', status: 'enabled' },
    { id: '8', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'M3', applicablePosition: '', status: 'enabled' },
    { id: '9', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'M4', applicablePosition: '', status: 'enabled' },
    { id: '10', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'M5', applicablePosition: '', status: 'enabled' },
    { id: '11', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'M6', applicablePosition: '', status: 'enabled' },
    { id: '12', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'S1-1', applicablePosition: '', status: 'enabled' },
    { id: '13', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'S1-2', applicablePosition: '', status: 'enabled' },
    { id: '14', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'S1-3', applicablePosition: '', status: 'enabled' },
    { id: '15', gradeName: '', sequence: '技术序列', subSequence: '2', jobLevel: '', rankName: 'S2-1', applicablePosition: '', status: 'enabled' },
  ]);

  const [sequences, setSequences] = useState<IJobSequence[]>([
    {
      id: '1', name: '主', scope: '产品部', status: 'enabled', children: [
        { id: '1-1', name: '子', status: 'enabled' }
      ]
    },
    {
      id: '2', name: 'bob测试', scope: '市场部、产品部、研发部下级部门（高级配置）', status: 'enabled', children: [
        { id: '2-1', name: '1', status: 'enabled' }
      ]
    },
    {
      id: '3', name: '技术序列', scope: '财务部、市场部、产品部', status: 'enabled', children: [
        { id: '3-1', name: '2', status: 'enabled' }
      ]
    },
    {
      id: '4', name: '营销序列', scope: '人事部', status: 'enabled', children: [
        { id: '4-1', name: '3', status: 'enabled' }
      ]
    },
  ]);

  const toggleExpand = (id: string) => {
    setExpandedSequences(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleRankExpand = (id: string) => {
    setExpandedRanks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSequenceChange = (id: string, field: keyof IJobSequence, value: any) => {
    setSequences(prev => {
      const updateNode = (nodes: IJobSequence[]): IJobSequence[] => {
        return nodes.map(node => {
          if (node.id === id) {
            return { ...node, [field]: value };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prev);
    });
  };

  const handleAddSequence = () => {
    const newId = Date.now().toString();
    setSequences(prev => [
      ...prev,
      { id: newId, name: '', status: 'enabled', scope: '', code: '' }
    ]);
  };

  const handleAddChildSequence = (parentId: string) => {
    const newId = Date.now().toString();
    setSequences(prev => {
      const updateNode = (nodes: IJobSequence[]): IJobSequence[] => {
        return nodes.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), { id: newId, name: '', status: 'enabled', scope: '', code: '' }]
            };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prev);
    });
    // Also expand the parent
    if (!expandedSequences.includes(parentId)) {
        setExpandedSequences(prev => [...prev, parentId]);
    }
  };

  const handleDeleteSequence = (id: string) => {
    setSequences(prev => {
       const deleteNode = (nodes: IJobSequence[]): IJobSequence[] => {
         return nodes.filter(node => node.id !== id).map(node => ({
           ...node,
           children: node.children ? deleteNode(node.children) : undefined
         }));
       };
       return deleteNode(prev);
    });
  };

  const handleLevelChange = (id: string, value: string) => {
    setJobLevels(prev => prev.map(level => level.id === id ? { ...level, name: value } : level));
  };

  const handleAddLevel = () => {
    const newId = Date.now().toString();
    setJobLevels(prev => [...prev, { id: newId, name: '' }]);
  };

  const handleDeleteLevel = (id: string) => {
    setJobLevels(prev => prev.filter(level => level.id !== id));
  };

  const handleSystemTableChange = (id: string, field: keyof ISystemTableItem, value: any) => {
    setSystemTableData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRankGroupChange = (id: string, field: keyof IJobRankGroup, value: any) => {
    setJobRankGroups(prev => prev.map(group => group.id === id ? { ...group, [field]: value } : group));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">


      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 pt-2">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pb-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#13A695]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13A695]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {activeTab === 'grade' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
            {/* Info Alert */}
            {showInfo && (
              <div className="mx-4 mt-4 bg-[#E6F7FF] border border-[#91D5FF] px-4 py-2 rounded flex items-center justify-between text-sm text-gray-600 shrink-0">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#1890FF] text-white flex items-center justify-center mr-2 text-xs font-bold">i</div>
                  职等在列表位置越靠上，级别越高。
                </div>
                <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Toolbar */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">导入</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">导出</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">删除</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">变更记录</button>
              </div>
              
              <div className="flex items-center gap-3 text-gray-500">
                <button className="flex items-center gap-1 hover:text-primary text-sm">
                  <Filter size={16} />
                  <span>筛选</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary text-sm">
                  <PaintBucket size={16} />
                  <span>填色 1</span>
                </button>
                <button className="hover:text-primary p-1">
                  <Settings size={18} />
                </button>
                <button className="hover:text-primary p-1">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F7FA] text-sm text-gray-900 font-medium">
                  <tr>
                    <th className="w-12 py-3 px-4 border-b border-r border-gray-200 text-center">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/3">职等名称</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/3">职等编码</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/3">备注</th>
                    <th className="w-24 py-3 px-4 border-b border-gray-200 text-center whitespace-nowrap">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="py-3 px-4 border-r border-gray-100 text-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100 bg-[#FFF1F0]">{item.name}</td>
                      <td className="py-3 px-4 border-r border-gray-100">{item.code}</td>
                      <td className="py-3 px-4 border-r border-gray-100">{item.remarks}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-[#13A695] hover:text-[#13A695]/80">删除</button>
                      </td>
                    </tr>
                  ))}
                  {/* Add Row Button */}
                  <tr className="hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                    <td className="py-3 px-4 border-r border-gray-100 text-center"></td>
                    <td colSpan={4} className="py-3 px-4 text-gray-400 flex items-center">
                      <Plus size={16} className="mr-1" />
                      <ChevronDown size={16} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'sequence' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
            {/* Toolbar */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
              {isEditingSequence ? (
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-900">序列({sequences.length})</span>
                  <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-primary">
                    <span>2级序列(含子序列)</span>
                    <ChevronDown size={14} />
                  </div>
                </div>
              ) : (
                <div className="text-base font-medium text-gray-900">
                  序列({sequences.length})
                </div>
              )}
              
              <div className="flex items-center gap-3">
                {isEditingSequence ? (
                  <>
                    <button 
                      className="px-3 py-1.5 border border-[#13A695] text-[#13A695] rounded text-sm hover:bg-[#13A695]/10 transition-colors"
                      onClick={handleAddSequence}
                    >
                      新增序列
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                      onClick={() => setIsEditingSequence(false)}
                    >
                      保存
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                      onClick={() => setIsEditingSequence(true)}
                    >
                      编辑
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">排序</button>
                    <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                      <Filter size={16} />
                    </button>
                    <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                      <Maximize2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F7FA] text-sm text-gray-900 font-medium">
                  <tr>
                    {isEditingSequence && (
                      <th className="w-12 py-3 px-4 border-b border-r border-gray-200 text-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                    )}
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/4">
                      {isEditingSequence && <span className="text-red-500 mr-1">*</span>}
                      序列名称
                    </th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/4">序列编码</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/4">
                      <div className="flex items-center gap-1">
                        适用范围
                        <HelpCircle size={14} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/4">状态</th>
                    <th className="w-24 py-3 px-4 border-b border-gray-200 text-center"></th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {sequences.map((seq) => (
                    <React.Fragment key={seq.id}>
                      {/* Parent Row */}
                      <tr className="hover:bg-gray-50 border-b border-gray-100">
                        {isEditingSequence && (
                          <td className="py-3 px-4 border-r border-gray-100 text-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                        )}
                        <td className="py-3 px-4 border-r border-gray-100">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleExpand(seq.id)}
                              className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                              {expandedSequences.includes(seq.id) ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>
                            {isEditingSequence ? (
                              <input 
                                type="text" 
                                value={seq.name} 
                                onChange={(e) => handleSequenceChange(seq.id, 'name', e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#13A695]"
                              />
                            ) : (
                              <span>{seq.name}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 border-r border-gray-100">
                          {isEditingSequence ? (
                            <input 
                              type="text" 
                              value={seq.code || ''} 
                              onChange={(e) => handleSequenceChange(seq.id, 'code', e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#13A695]"
                            />
                          ) : (
                            seq.code
                          )}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-100">
                          {isEditingSequence ? (
                             <div className="border border-gray-300 rounded px-2 py-1 text-sm w-full min-h-[30px] flex items-center flex-wrap gap-1 bg-white">
                                {seq.scope?.split('、').map((s, i) => (
                                  <span key={i} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                                    {s}
                                    <X size={10} className="cursor-pointer hover:text-red-500" />
                                  </span>
                                ))}
                                <ChevronDown size={14} className="ml-auto text-gray-400" />
                             </div>
                          ) : (
                            seq.scope
                          )}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-100">
                          {isEditingSequence ? (
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name={`status-${seq.id}`} 
                                  checked={seq.status === 'enabled'} 
                                  onChange={() => handleSequenceChange(seq.id, 'status', 'enabled')}
                                  className="text-[#13A695] focus:ring-[#13A695]" 
                                />
                                <span className="text-gray-600">启用</span>
                                <HelpCircle size={12} className="text-gray-400" />
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name={`status-${seq.id}`} 
                                  checked={seq.status === 'disabled'} 
                                  onChange={() => handleSequenceChange(seq.id, 'status', 'disabled')}
                                  className="text-[#13A695] focus:ring-[#13A695]" 
                                />
                                <span className="text-gray-600">禁用</span>
                              </label>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${seq.status === 'enabled' ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span>{seq.status === 'enabled' ? '已启用' : '已禁用'}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isEditingSequence ? (
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                className="text-[#13A695] hover:text-[#13A695]/80"
                                onClick={() => handleAddChildSequence(seq.id)}
                              >
                                <Plus size={16} />
                              </button>
                              <button 
                                className="text-[#13A695] hover:text-[#13A695]/80"
                                onClick={() => handleDeleteSequence(seq.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ) : (
                            <button className="text-[#13A695] hover:text-[#13A695]/80">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                      
                      {/* Child Rows */}
                      {expandedSequences.includes(seq.id) && seq.children?.map((child) => (
                        <tr key={child.id} className="hover:bg-gray-50 border-b border-gray-100 bg-gray-50/30">
                          {isEditingSequence && (
                            <td className="py-3 px-4 border-r border-gray-100 text-center">
                              <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                          )}
                          <td className="py-3 px-4 border-r border-gray-100 pl-12">
                            {isEditingSequence ? (
                              <input 
                                type="text" 
                                value={child.name} 
                                onChange={(e) => handleSequenceChange(child.id, 'name', e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#13A695]"
                              />
                            ) : (
                              child.name
                            )}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-100">
                             {isEditingSequence ? (
                              <input 
                                type="text" 
                                value={child.code || ''} 
                                onChange={(e) => handleSequenceChange(child.id, 'code', e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#13A695]"
                              />
                            ) : (
                              child.code
                            )}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-100">
                             {isEditingSequence ? (
                               <div className="border border-gray-300 rounded px-2 py-1 text-sm w-full min-h-[30px] flex items-center flex-wrap gap-1 bg-white">
                                  {child.scope?.split('、').map((s, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                                      {s}
                                      <X size={10} className="cursor-pointer hover:text-red-500" />
                                    </span>
                                  ))}
                                  <ChevronDown size={14} className="ml-auto text-gray-400" />
                               </div>
                            ) : (
                              child.scope
                            )}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-100">
                            {isEditingSequence && (
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name={`status-${child.id}`} 
                                    checked={child.status === 'enabled'} 
                                    onChange={() => handleSequenceChange(child.id, 'status', 'enabled')}
                                    className="text-[#13A695] focus:ring-[#13A695]" 
                                  />
                                  <span className="text-gray-600">启用</span>
                                  <HelpCircle size={12} className="text-gray-400" />
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name={`status-${child.id}`} 
                                    checked={child.status === 'disabled'} 
                                    onChange={() => handleSequenceChange(child.id, 'status', 'disabled')}
                                    className="text-[#13A695] focus:ring-[#13A695]" 
                                  />
                                  <span className="text-gray-600">禁用</span>
                                </label>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                             {isEditingSequence ? (
                                <div className="flex items-center justify-center gap-2">
                                  <button 
                                    className="text-[#13A695] hover:text-[#13A695]/80"
                                    onClick={() => handleAddChildSequence(child.id)}
                                  >
                                    <Plus size={16} />
                                  </button>
                                  <button 
                                    className="text-[#13A695] hover:text-[#13A695]/80"
                                    onClick={() => handleDeleteSequence(child.id)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ) : (
                                <button className="text-[#13A695] hover:text-[#13A695]/80">
                                  <Trash2 size={16} />
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'level' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
            {/* Toolbar */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="text-base font-medium text-gray-900">
                职层({jobLevels.length})
              </div>
              
              <div className="flex items-center gap-3">
                {isEditingLevel ? (
                  <>
                    <button 
                      className="px-3 py-1.5 border border-[#13A695] text-[#13A695] rounded text-sm hover:bg-[#13A695]/10 transition-colors"
                      onClick={handleAddLevel}
                    >
                      新增职层
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                      onClick={() => setIsEditingLevel(false)}
                    >
                      保存
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                      onClick={() => setIsEditingLevel(true)}
                    >
                      编辑
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">排序</button>
                    <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                      <Filter size={16} />
                    </button>
                    <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                      <Maximize2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F7FA] text-sm text-gray-900 font-medium">
                  <tr>
                    {isEditingLevel && (
                      <th className="w-12 py-3 px-4 border-b border-r border-gray-200 text-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                    )}
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left">
                      {isEditingLevel && <span className="text-red-500 mr-1">*</span>}
                      职层名称
                    </th>
                    {isEditingLevel && <th className="w-12 py-3 px-4 border-b border-gray-200 text-center"></th>}
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {jobLevels.map((level) => (
                    <tr key={level.id} className="hover:bg-gray-50 border-b border-gray-100">
                      {isEditingLevel && (
                        <td className="py-3 px-4 border-r border-gray-100 text-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                      )}
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingLevel ? (
                          <input 
                            type="text" 
                            value={level.name} 
                            onChange={(e) => handleLevelChange(level.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#13A695]"
                          />
                        ) : (
                          level.name
                        )}
                      </td>
                      {isEditingLevel && (
                        <td className="py-3 px-4 text-center">
                          <button 
                            className="text-[#13A695] hover:text-[#13A695]/80"
                            onClick={() => handleDeleteLevel(level.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'rank' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full relative">
            {/* Toolbar */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="text-base font-medium text-gray-900">
                职级({jobRankGroups.length})
              </div>
              
              <div className="flex items-center gap-3">
                {!isEditingRank && (
                  <button 
                    className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                    onClick={() => setIsEditingRank(true)}
                  >
                    编辑
                  </button>
                )}
                <button 
                  className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                  onClick={() => setIsRankGroupModalOpen(true)}
                >
                  创建分组
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">排序</button>
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                  <Filter size={16} />
                </button>
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto pb-16">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F7FA] text-sm text-gray-900 font-medium">
                  <tr>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">分组名称</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/3">职级</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/3">适用序列</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-left w-1/6">状态</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {jobRankGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50 border-b border-gray-100 align-top">
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingRank ? (
                          <input 
                            type="text" 
                            value={group.name} 
                            onChange={(e) => handleRankGroupChange(group.id, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13A695]"
                          />
                        ) : (
                          group.name
                        )}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100">
                        <div className="flex flex-col gap-2">
                          {group.ranks.map((rank) => (
                            <div key={rank.id}>
                              {rank.children ? (
                                <div>
                                  <div 
                                    className="flex items-center gap-1 cursor-pointer hover:text-primary"
                                    onClick={() => toggleRankExpand(rank.id)}
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      {expandedRanks.includes(rank.id) ? (
                                        <ChevronDown size={14} />
                                      ) : (
                                        <ChevronRight size={14} />
                                      )}
                                    </div>
                                    <span>{rank.name}</span>
                                  </div>
                                  {expandedRanks.includes(rank.id) && (
                                    <div className="pl-6 flex flex-col gap-1 mt-1 text-gray-500">
                                      {rank.children.map(child => (
                                        <div key={child.id}>{child.name}</div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="pl-1 py-0.5">{rank.name}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingRank ? (
                          <input 
                            type="text" 
                            value={group.sequence} 
                            onChange={(e) => handleRankGroupChange(group.id, 'sequence', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13A695]"
                          />
                        ) : (
                          group.sequence
                        )}
                      </td>
                      <td className="py-3 px-4 border-gray-100">
                        {isEditingRank ? (
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name={`status-rank-${group.id}`} 
                                checked={group.status === 'enabled'} 
                                onChange={() => handleRankGroupChange(group.id, 'status', 'enabled')}
                                className="text-[#13A695] focus:ring-[#13A695]" 
                              />
                              <span className="text-gray-600">启用</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name={`status-rank-${group.id}`} 
                                checked={group.status === 'disabled'} 
                                onChange={() => handleRankGroupChange(group.id, 'status', 'disabled')}
                                className="text-[#13A695] focus:ring-[#13A695]" 
                              />
                              <span className="text-gray-600">禁用</span>
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${group.status === 'enabled' ? 'bg-green-500' : 'bg-gray-300'}`} />
                             <span>{group.status === 'enabled' ? '已启用' : '已禁用'}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            {isEditingRank && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 shadow-lg z-10">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsEditingRank(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                  onClick={() => setIsEditingRank(false)}
                >
                  保存
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'system' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full relative">
            {/* Toolbar */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="text-base font-medium text-gray-900">
                职级体系(28)
              </div>
              
              <div className="flex items-center gap-3">
                {!isEditingSystem && (
                  <button 
                    className="px-3 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                    onClick={() => setIsEditingSystem(true)}
                  >
                    编辑
                  </button>
                )}
                <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">导出</button>
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                  <Filter size={16} />
                </button>
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:text-primary hover:border-primary">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto pb-16">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F7FA] text-sm text-gray-900 font-medium">
                  <tr>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">职等名称</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">序列</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">子序列</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">
                      <div className="flex items-center gap-1">
                        职层
                        <HelpCircle size={14} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">职级名称</th>
                    <th className="py-3 px-4 border-b border-r border-gray-200 text-left w-1/6">
                      <div className="flex items-center gap-1">
                        适用岗位
                        <HelpCircle size={14} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 border-b border-gray-200 text-left w-1/6">状态</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {systemTableData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingSystem ? (
                          <div className="relative">
                            <select
                              value={item.gradeName}
                              onChange={(e) => handleSystemTableChange(item.id, 'gradeName', e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13A695] appearance-none bg-white pr-6"
                            >
                              <option value=""></option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                          </div>
                        ) : (
                          item.gradeName
                        )}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100">{item.sequence}</td>
                      <td className="py-3 px-4 border-r border-gray-100">{item.subSequence}</td>
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingSystem ? (
                          <div className="relative">
                            <select
                              value={item.jobLevel}
                              onChange={(e) => handleSystemTableChange(item.id, 'jobLevel', e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13A695] appearance-none bg-white pr-6"
                            >
                              <option value=""></option>
                              <option value="高级">高级</option>
                              <option value="中级">中级</option>
                              <option value="初级">初级</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                          </div>
                        ) : (
                          item.jobLevel
                        )}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100">{item.rankName}</td>
                      <td className="py-3 px-4 border-r border-gray-100">
                        {isEditingSystem ? (
                          <div className="relative">
                            <select
                              value={item.applicablePosition}
                              onChange={(e) => handleSystemTableChange(item.id, 'applicablePosition', e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13A695] appearance-none bg-white pr-6"
                            >
                              <option value=""></option>
                              <option value="岗位A">岗位A</option>
                              <option value="岗位B">岗位B</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                          </div>
                        ) : (
                          item.applicablePosition
                        )}
                      </td>
                      <td className="py-3 px-4 border-gray-100">
                        {isEditingSystem ? (
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name={`status-system-${item.id}`} 
                                checked={item.status === 'enabled'} 
                                onChange={() => handleSystemTableChange(item.id, 'status', 'enabled')}
                                className="text-[#13A695] focus:ring-[#13A695]" 
                              />
                              <span className="text-gray-600">启用</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name={`status-system-${item.id}`} 
                                checked={item.status === 'disabled'} 
                                onChange={() => handleSystemTableChange(item.id, 'status', 'disabled')}
                                className="text-[#13A695] focus:ring-[#13A695]" 
                              />
                              <span className="text-gray-600">禁用</span>
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${item.status === 'enabled' ? 'bg-green-500' : 'bg-gray-300'}`} />
                             <span>{item.status === 'enabled' ? '已启用' : '已禁用'}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            {isEditingSystem && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 shadow-lg z-10">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsEditingSystem(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
                  onClick={() => setIsEditingSystem(false)}
                >
                  保存
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab !== 'grade' && activeTab !== 'sequence' && activeTab !== 'level' && activeTab !== 'rank' && activeTab !== 'system' && (
             <div className="flex items-center justify-center h-full text-gray-400 bg-white rounded-lg border border-gray-200">
                {tabs.find(t => t.id === activeTab)?.label}内容
             </div>
        )}
      </div>

      <RankGroupModal 
        isOpen={isRankGroupModalOpen} 
        onClose={() => setIsRankGroupModalOpen(false)} 
      />
    </div>
  );
};

export default JobLevelPage;
