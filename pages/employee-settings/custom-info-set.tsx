import React, { useState } from 'react';
import { Edit, ArrowUp, ArrowDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  active?: boolean;
  canEdit?: boolean;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

interface FieldItem {
  id: string;
  label: string;
  required?: boolean;
  enabled?: boolean;
  disabled?: boolean;
}

interface ColumnGroup {
  id: string;
  title: string;
  fields: FieldItem[];
}

const CustomInfoSetPage: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('basic');

  const sidebarItems: SidebarItem[] = [
    { id: 'basic', label: '基础信息', active: true },
    { id: 'edu', label: '教育经历' },
    { id: 'work', label: '工作经历' },
    { id: 'family', label: '家庭成员', canEdit: true },
    { id: 'tax', label: '个税申报', canEdit: true, canMoveDown: true },
    { id: 'cert', label: '员工证书' },
    { id: 'perf', label: '绩效档案', canEdit: true },
    { id: 'train1', label: '训练记录（自定义）', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'train2', label: '内部培训（自定义）', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'train3', label: '集训记录（自定义）', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'train4', label: '外部培训（自定义）', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'custom1', label: '自定义一个ayumi', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'other', label: '其他', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'subset1', label: '新增子集1', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'interview1', label: '面试记录（附件）', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'interview2', label: '面试记录（字段对...', canEdit: true, canMoveUp: true, canMoveDown: true },
    { id: 'test1', label: '新增测试子集', canEdit: true, canMoveUp: true },
  ];

  const columns: ColumnGroup[] = [
    {
      id: 'default',
      title: '默认分组',
      fields: [
        { id: 'f1', label: '手机号码', required: true },
        { id: 'f2', label: '证件号', required: true },
        { id: 'f3', label: '姓名', required: true },
        { id: 'f4', label: '工号', enabled: true },
        { id: 'f5', label: '头像' },
        { id: 'f6', label: '出生日期', enabled: true },
        { id: 'f7', label: '民族', enabled: true },
        { id: 'f8', label: '证件照正面', enabled: true },
        { id: 'f9', label: '证件照反面', enabled: true },
        { id: 'f10', label: '年龄' },
        { id: 'f11', label: '户口所在地', enabled: true },
        { id: 'f12', label: '职务', enabled: true },
        { id: 'f13', label: '职务分类', enabled: true },
        { id: 'f14', label: '职级', enabled: true },
        { id: 'f15', label: '最高学历', enabled: true },
        { id: 'f16', label: '英文姓名', enabled: true },
        { id: 'f17', label: '证件类型', required: true },
        { id: 'f18', label: '员工状态', required: true },
        { id: 'f19', label: '历史工龄(年)', enabled: true },
        { id: 'f20', label: '生日类型', enabled: false, disabled: true },
        { id: 'f21', label: '工作地点', enabled: true },
      ]
    },
    {
      id: 'contract',
      title: '合同信息',
      fields: [
        { id: 'c1', label: '试用期状态' },
        { id: 'c2', label: '入职日期', required: true },
        { id: 'c3', label: '部门', required: true },
        { id: 'c4', label: '试用期到期日', enabled: true },
        { id: 'c5', label: '当前合同开始日', enabled: true },
        { id: 'c6', label: '合同公司', enabled: true },
        { id: 'c7', label: '员工类型', required: true },
        { id: 'c8', label: 'oa自定义', enabled: false },
        { id: 'c9', label: '当前合同结束日', enabled: true },
      ]
    },
    {
      id: 'employee',
      title: '员工信息',
      fields: [
        { id: 'e1', label: '试用期(月)', enabled: true },
        { id: 'e2', label: '性别' },
        { id: 'e3', label: '合同类型' },
        { id: 'e4', label: '职位' },
        { id: 'e5', label: '是否19', enabled: false, disabled: true },
        { id: 'e6', label: '是否30', enabled: false, disabled: true },
        { id: 'e7', label: '是否24', enabled: false, disabled: true },
        { id: 'e8', label: 'ayumi文7', enabled: false, disabled: true },
        { id: 'e9', label: '是否25', enabled: false, disabled: true },
        { id: 'e10', label: '是否23', enabled: false, disabled: true },
        { id: 'e11', label: '是否12', enabled: false, disabled: true },
        { id: 'e12', label: '是否11', enabled: false, disabled: true },
        { id: 'e13', label: '是否10', enabled: false, disabled: true },
        { id: 'e14', label: 'ayumi文本4', enabled: false, disabled: true },
        { id: 'e15', label: 'ayumi文件测...', enabled: false, disabled: true },
        { id: 'e16', label: 'ayumi文本3', enabled: false, disabled: true },
        { id: 'e17', label: '是否22', enabled: false, disabled: true },
        { id: 'e18', label: 'ayumi文本二', enabled: false, disabled: true },
        { id: 'e19', label: '是否13', enabled: false, disabled: true },
        { id: 'e20', label: '是否14', enabled: false, disabled: true },
        { id: 'e21', label: 'ayumi文本8', enabled: false, disabled: true },
      ]
    },
    {
      id: 'extra',
      title: '多余字段分组',
      fields: [
        { id: 'x1', label: '转正日期' },
        { id: 'x2', label: '是否21', enabled: false, disabled: true },
        { id: 'x3', label: '文本15', enabled: false, disabled: true },
        { id: 'x4', label: '文本20', enabled: false, disabled: true },
        { id: 'x5', label: 'ayumi文本13', enabled: false, disabled: true },
        { id: 'x6', label: '是否15', enabled: false, disabled: true },
        { id: 'x7', label: 'ayumi文本2', enabled: false, disabled: true },
        { id: 'x8', label: 'ayumi文本23', enabled: false, disabled: true },
        { id: 'x9', label: '是否3', enabled: false, disabled: true },
        { id: 'x10', label: '职务分类1', enabled: false, disabled: true },
        { id: 'x11', label: 'AYUMI528新...', enabled: false, disabled: true },
        { id: 'x12', label: 'ayumi文本5', enabled: false, disabled: true },
        { id: 'x13', label: '文本21', enabled: false, disabled: true },
        { id: 'x14', label: '文本18', enabled: false, disabled: true },
        { id: 'x15', label: 'ayumi文本6', enabled: false, disabled: true },
        { id: 'x16', label: '文本16', enabled: false, disabled: true },
        { id: 'x17', label: '文本22', enabled: false, disabled: true },
        { id: 'x18', label: '文本19', enabled: false, disabled: true },
        { id: 'x19', label: 'ayumi文本30', enabled: false, disabled: true },
        { id: 'x20', label: '文本30', enabled: false, disabled: true },
        { id: 'x21', label: '文本29', enabled: false, disabled: true },
      ]
    }
  ];

  return (
    <div className="flex h-full bg-[#F9FAFB] p-4 space-x-4 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex flex-col overflow-hidden shrink-0">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveSidebarItem(item.id)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-100 last:border-0 ${
                activeSidebarItem === item.id ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium truncate flex-1">{item.label}</span>
              <div className="flex items-center space-x-2 ml-2 shrink-0">
                {item.canEdit && <Edit size={14} className={activeSidebarItem === item.id ? 'text-white/80' : 'text-gray-400 hover:text-gray-600'} />}
                {item.canMoveUp && <ArrowUp size={14} className={activeSidebarItem === item.id ? 'text-white/80' : 'text-gray-400 hover:text-gray-600'} />}
                {item.canMoveDown && <ArrowDown size={14} className={activeSidebarItem === item.id ? 'text-white/80' : 'text-gray-400 hover:text-gray-600'} />}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
            新增信息子集
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-lg shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] p-4">
        <div className="mb-4">
          <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
            增加分组
          </button>
        </div>
        
        <div className="flex-1 overflow-x-auto overflow-y-hidden flex space-x-4 pb-2">
          {columns.map((col) => (
            <div key={col.id} className="w-72 shrink-0 flex flex-col bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Column Header */}
              <div className="bg-gray-200 px-4 py-3 flex items-center justify-between border-b border-gray-300">
                <span className="font-medium text-gray-800 text-sm">{col.title}</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Plus size={14} className="cursor-pointer hover:text-gray-700" />
                  <Edit size={14} className="cursor-pointer hover:text-gray-700" />
                  <ChevronLeft size={14} className="cursor-pointer hover:text-gray-700" />
                  <ChevronRight size={14} className="cursor-pointer hover:text-gray-700" />
                </div>
              </div>
              
              {/* Column Fields */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide">
                {col.fields.map((field) => (
                  <div 
                    key={field.id} 
                    className={`flex items-center justify-between p-3 rounded border bg-white ${
                      field.disabled ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <span className={`text-sm ${field.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                      {field.label}
                    </span>
                    <div className="flex items-center space-x-3">
                      <Edit size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                      {field.required && (
                        <span className="text-xs text-gray-400">必填</span>
                      )}
                      {field.enabled !== undefined && (
                        <div className={`w-8 h-4 rounded-full flex items-center px-0.5 cursor-pointer ${
                          field.enabled ? 'bg-primary' : 'bg-gray-200'
                        }`}>
                          <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${
                            field.enabled ? 'translate-x-4' : 'translate-x-0'
                          }`} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomInfoSetPage;
