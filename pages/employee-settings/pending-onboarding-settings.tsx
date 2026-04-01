import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { ChevronLeft, ChevronDown, ChevronRight, Search, Layers } from 'lucide-react';

type FieldItem = {
  id: string;
  name: string;
  type: string;
  createShow: boolean;
  createRequired: boolean;
  importShow: boolean;
  importRequired: boolean;
};

type FieldGroup = {
  id: string;
  name: string;
  items: FieldItem[];
};

const initialData: FieldGroup[] = [
  {
    id: 'g1',
    name: '默认分组(基础信息)',
    items: [
      { id: 'f1', name: '手机号码', type: '文本', createShow: true, createRequired: true, importShow: true, importRequired: true },
      { id: 'f2', name: '证件号', type: '文本', createShow: true, createRequired: false, importShow: true, importRequired: false },
      { id: 'f3', name: '姓名', type: '文本', createShow: true, createRequired: true, importShow: true, importRequired: true },
      { id: 'f4', name: '工号', type: '文本', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f5', name: '头像', type: '图片', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f6', name: '出生日期', type: '日期', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f7', name: '民族', type: '选项', createShow: false, createRequired: false, importShow: false, importRequired: false },
      { id: 'f8', name: '证件照正面', type: '图片', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f9', name: '户口所在地', type: '文本', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f10', name: '职务', type: '文本', createShow: true, createRequired: false, importShow: true, importRequired: true },
      { id: 'f11', name: '职务分类', type: '职务分类', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f12', name: '职级', type: '文本', createShow: true, createRequired: false, importShow: true, importRequired: true },
      { id: 'f13', name: '最高学历', type: '选项', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f14', name: '证件类型', type: '选项', createShow: true, createRequired: false, importShow: true, importRequired: false },
      { id: 'f15', name: '工作地点', type: '文本', createShow: true, createRequired: true, importShow: true, importRequired: false },
    ]
  },
  {
    id: 'g2',
    name: '合同信息(基础信息)',
    items: [
      { id: 'f16', name: '入职日期', type: '日期', createShow: true, createRequired: true, importShow: true, importRequired: true },
      { id: 'f17', name: '部门', type: '文本', createShow: true, createRequired: true, importShow: true, importRequired: true },
      { id: 'f18', name: '试用期到期日', type: '日期', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f19', name: '当前合同开始日', type: '日期', createShow: true, createRequired: false, importShow: false, importRequired: false },
      { id: 'f20', name: '合同公司', type: '文本', createShow: true, createRequired: false, importShow: true, importRequired: false },
      { id: 'f21', name: '员工类型', type: '选项', createShow: true, createRequired: false, importShow: true, importRequired: false },
      { id: 'f22', name: '当前合同结束日', type: '日期', createShow: true, createRequired: false, importShow: false, importRequired: false },
    ]
  }
];

export default function PendingOnboardingSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  
  const [data, setData] = useState<FieldGroup[]>(initialData);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'g1': true,
    'g2': true
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '待入职设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleItemChange = (groupId: string, itemId: string, field: keyof FieldItem, value: boolean) => {
    setData(prevData => prevData.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.map(item => {
            if (item.id === itemId) {
              const newItem = { ...item, [field]: value };
              // If required is checked, show must be checked
              if (field.includes('Required') && value) {
                if (field === 'createRequired') newItem.createShow = true;
                if (field === 'importRequired') newItem.importShow = true;
              }
              // If show is unchecked, required must be unchecked
              if (field.includes('Show') && !value) {
                if (field === 'createShow') newItem.createRequired = false;
                if (field === 'importShow') newItem.importRequired = false;
              }
              return newItem;
            }
            return item;
          })
        };
      }
      return group;
    }));
  };

  const handleGroupChange = (groupId: string, field: 'createShow' | 'importShow', value: boolean) => {
    setData(prevData => prevData.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.map(item => {
            const newItem = { ...item, [field]: value };
            if (!value) {
              if (field === 'createShow') newItem.createRequired = false;
              if (field === 'importShow') newItem.importRequired = false;
            }
            return newItem;
          })
        };
      }
      return group;
    }));
  };

  const getGroupStatus = (group: FieldGroup, field: 'createShow' | 'importShow') => {
    const total = group.items.length;
    const checked = group.items.filter(item => item[field]).length;
    
    if (checked === 0) return 'none';
    if (checked === total) return 'all';
    return 'partial';
  };

  const filteredData = data.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const getSelectedCount = (field: 'createShow' | 'importShow') => {
    let count = 0;
    let total = 0;
    data.forEach(group => {
      total += group.items.length;
      count += group.items.filter(item => item[field]).length;
    });
    return { count, total };
  };

  const createShowStats = getSelectedCount('createShow');
  const importShowStats = getSelectedCount('importShow');

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-800 font-medium">
              <Layers size={18} className="mr-2 text-primary" />
              待入职模板
            </div>
            <button className="px-4 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              重置系统默认
            </button>
          </div>

          <div className="flex justify-end mb-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="请输入关键字"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 bg-gray-50 p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-3">字段</div>
              <div className="col-span-2">类型</div>
              <div className="col-span-2">创建待入职显示(<span className="text-primary">{createShowStats.count}</span>/{createShowStats.total})</div>
              <div className="col-span-2">创建待入职必填</div>
              <div className="col-span-2">待入职导入显示(<span className="text-primary">{importShowStats.count}</span>/{importShowStats.total})</div>
              <div className="col-span-1">待入职导入必填</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredData.map(group => {
                const createShowStatus = getGroupStatus(group, 'createShow');
                const importShowStatus = getGroupStatus(group, 'importShow');
                
                return (
                  <div key={group.id}>
                    {/* Group Header */}
                    <div className="grid grid-cols-12 gap-4 bg-gray-50/50 p-3 items-center text-sm border-b border-gray-100">
                      <div className="col-span-3 flex items-center cursor-pointer" onClick={() => toggleGroup(group.id)}>
                        {expandedGroups[group.id] ? (
                          <ChevronDown size={16} className="text-gray-400 mr-2" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400 mr-2" />
                        )}
                        <span className="font-medium text-gray-800">{group.name}</span>
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-2">
                        <input 
                          type="checkbox" 
                          className={`w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${createShowStatus === 'partial' ? 'indeterminate:bg-primary indeterminate:border-primary' : ''}`}
                          checked={createShowStatus === 'all'}
                          ref={input => {
                            if (input) input.indeterminate = createShowStatus === 'partial';
                          }}
                          onChange={(e) => handleGroupChange(group.id, 'createShow', e.target.checked)}
                        />
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-2">
                        <input 
                          type="checkbox" 
                          className={`w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary ${importShowStatus === 'partial' ? 'indeterminate:bg-primary indeterminate:border-primary' : ''}`}
                          checked={importShowStatus === 'all'}
                          ref={input => {
                            if (input) input.indeterminate = importShowStatus === 'partial';
                          }}
                          onChange={(e) => handleGroupChange(group.id, 'importShow', e.target.checked)}
                        />
                      </div>
                      <div className="col-span-1"></div>
                    </div>

                    {/* Group Items */}
                    {expandedGroups[group.id] && (
                      <div className="divide-y divide-gray-50">
                        {group.items.map(item => (
                          <div key={item.id} className="grid grid-cols-12 gap-4 p-3 items-center text-sm hover:bg-gray-50/30 transition-colors">
                            <div className="col-span-3 pl-8 text-gray-700">{item.name}</div>
                            <div className="col-span-2 text-gray-500">{item.type}</div>
                            <div className="col-span-2">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={item.createShow}
                                onChange={(e) => handleItemChange(group.id, item.id, 'createShow', e.target.checked)}
                              />
                            </div>
                            <div className="col-span-2">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                checked={item.createRequired}
                                disabled={!item.createShow}
                                onChange={(e) => handleItemChange(group.id, item.id, 'createRequired', e.target.checked)}
                              />
                            </div>
                            <div className="col-span-2">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={item.importShow}
                                onChange={(e) => handleItemChange(group.id, item.id, 'importShow', e.target.checked)}
                              />
                            </div>
                            <div className="col-span-1">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                checked={item.importRequired}
                                disabled={!item.importShow}
                                onChange={(e) => handleItemChange(group.id, item.id, 'importRequired', e.target.checked)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-100 flex justify-end bg-white z-10 space-x-3">
          <button 
            onClick={() => navigate('/employee-settings')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
