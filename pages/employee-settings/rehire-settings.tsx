import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { ChevronLeft, Search, HelpCircle, ChevronDown, ChevronRight, Layers } from 'lucide-react';

interface FieldItem {
  id: string;
  name: string;
  type: string;
  reuse: boolean;
}

interface FieldGroup {
  id: string;
  name: string;
  expanded: boolean;
  items: FieldItem[];
}

export default function RehireSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState('');

  const [groups, setGroups] = useState<FieldGroup[]>([
    {
      id: 'g1',
      name: '默认分组(基础信息)',
      expanded: true,
      items: [
        { id: 'f1', name: '手机号码', type: '文本', reuse: true },
        { id: 'f2', name: '证件号', type: '文本', reuse: true },
        { id: 'f3', name: '姓名', type: '文本', reuse: true },
        { id: 'f4', name: '工号', type: '文本', reuse: true },
        { id: 'f5', name: '头像', type: '图片', reuse: true },
        { id: 'f6', name: '出生日期', type: '日期', reuse: true },
        { id: 'f7', name: '民族', type: '选项', reuse: true },
        { id: 'f8', name: '证件照正面', type: '图片', reuse: true },
        { id: 'f9', name: '证件照反面', type: '图片', reuse: true },
        { id: 'f10', name: '户口所在地', type: '文本', reuse: true },
        { id: 'f11', name: '职务', type: '文本', reuse: true },
        { id: 'f12', name: '职务分类', type: '职务分类', reuse: true },
        { id: 'f13', name: '职级', type: '文本', reuse: true },
        { id: 'f14', name: '英文姓名', type: '文本', reuse: true },
        { id: 'f15', name: '证件类型', type: '选项', reuse: true },
        { id: 'f16', name: '工作地点', type: '文本', reuse: true },
        { id: 'f17', name: '联系地址', type: '文本', reuse: true },
        { id: 'f18', name: '首次参加工作日期', type: '日期', reuse: true },
      ]
    },
    {
      id: 'g2',
      name: '合同信息(基础信息)',
      expanded: false,
      items: [
        { id: 'f19', name: '合同类型', type: '选项', reuse: true },
        { id: 'f20', name: '合同期限', type: '文本', reuse: true },
      ]
    }
  ]);

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '复职设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const toggleGroup = (groupId: string) => {
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, expanded: !g.expanded } : g
    ));
  };

  const toggleReuse = (groupId: string, itemId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(item => 
            item.id === itemId ? { ...item, reuse: !item.reuse } : item
          )
        };
      }
      return g;
    }));
  };

  const toggleGroupReuse = (groupId: string, value: boolean) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(item => ({ ...item, reuse: value }))
        };
      }
      return g;
    }));
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
        {/* Header/Tabs */}
        <div className="px-6 pt-4 border-b border-gray-100 flex items-center">
          <button 
            onClick={() => navigate('/employee-settings')}
            className="p-1.5 border border-gray-200 rounded mr-4 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex space-x-6">
            <button className="pb-3 text-sm font-medium border-b-2 border-primary text-primary transition-colors">
              复职字段设置
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-gray-800 font-medium">
                <Layers size={18} className="text-primary mr-2" />
                复职字段设置
              </div>
              <button className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors">
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
                  className="w-full pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/3">字段</th>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/3">类型</th>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/3 flex items-center">
                      是否沿用
                      <HelpCircle size={14} className="text-gray-400 ml-1" />
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {groups.map((group) => {
                    const groupAllChecked = group.items.length > 0 && group.items.every(i => i.reuse);
                    const groupSomeChecked = group.items.some(i => i.reuse);
                    
                    return (
                      <React.Fragment key={group.id}>
                        {/* Group Header */}
                        <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <td className="px-4 py-2.5">
                            <div className="flex items-center cursor-pointer" onClick={() => toggleGroup(group.id)}>
                              {group.expanded ? (
                                <ChevronDown size={16} className="text-gray-500 mr-2" />
                              ) : (
                                <ChevronRight size={16} className="text-gray-500 mr-2" />
                              )}
                              <span className="font-medium text-gray-800">{group.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5"></td>
                          <td className="px-4 py-2.5">
                            <input 
                              type="checkbox" 
                              checked={groupAllChecked}
                              ref={input => {
                                if (input) {
                                  input.indeterminate = groupSomeChecked && !groupAllChecked;
                                }
                              }}
                              onChange={(e) => toggleGroupReuse(group.id, e.target.checked)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" 
                            />
                          </td>
                        </tr>
                        
                        {/* Group Items */}
                        {group.expanded && group.items
                          .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                            <td className="px-4 py-2.5 pl-10">{item.name}</td>
                            <td className="px-4 py-2.5 text-gray-500">{item.type}</td>
                            <td className="px-4 py-2.5">
                              <input 
                                type="checkbox" 
                                checked={item.reuse}
                                onChange={() => toggleReuse(group.id, item.id)}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" 
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-100 flex justify-end bg-white z-10 space-x-3">
          <button 
            onClick={() => navigate('/employee-settings')}
            className="px-6 py-2 border border-gray-200 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors"
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
