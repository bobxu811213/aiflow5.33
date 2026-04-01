import React, { useState } from 'react';
import { ChevronUp, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Field = {
  id: string;
  name: string;
  valid: boolean;
  required: boolean;
};

type Group = {
  id: string;
  name: string;
  fields: Field[];
};

type Section = {
  id: string;
  name: string;
  groups: Group[];
};

const initialData: Section[] = [
  {
    id: 'basic',
    name: '基础信息',
    groups: [
      {
        id: 'default',
        name: '默认分组',
        fields: [
          { id: 'phone', name: '手机号码', valid: true, required: true },
          { id: 'idCard', name: '证件号', valid: true, required: false },
          { id: 'name', name: '姓名', valid: true, required: true },
          { id: 'empNo', name: '工号', valid: true, required: false },
          { id: 'avatar', name: '头像', valid: true, required: false },
          { id: 'birthday', name: '出生日期', valid: false, required: false },
          { id: 'nation', name: '民族', valid: true, required: false },
          { id: 'idCardFront', name: '证件照正面', valid: true, required: false },
          { id: 'hukou', name: '户口所在地', valid: true, required: false },
          { id: 'position', name: '职务', valid: true, required: false },
          { id: 'jobCategory', name: '职务分类', valid: true, required: false },
          { id: 'jobLevel', name: '职级', valid: true, required: true },
          { id: 'education', name: '最高学历', valid: true, required: false },
          { id: 'idType', name: '证件类型', valid: true, required: false },
          { id: 'workLocation', name: '工作地点', valid: true, required: false },
        ]
      },
      {
        id: 'contract',
        name: '合同信息',
        fields: [
          { id: 'hireDate', name: '入职日期', valid: true, required: true },
          { id: 'department', name: '部门', valid: true, required: true },
          { id: 'probationEnd', name: '试用期到期日', valid: true, required: false },
          { id: 'contractStart', name: '当前合同开始日', valid: true, required: false },
          { id: 'contractCompany', name: '合同公司', valid: true, required: false },
          { id: 'empType', name: '员工类型', valid: true, required: true },
        ]
      }
    ]
  },
  { id: 'edu', name: '教育经历', groups: [] },
  { id: 'work', name: '工作经历', groups: [] },
  { id: 'family', name: '家庭成员', groups: [] },
  { id: 'cert', name: '员工证书', groups: [] },
  { id: 'custom', name: '自定义一个ay...', groups: [] },
  { id: 'test', name: '新增测试子集', groups: [] },
  { id: 'bank', name: '银行卡信息', groups: [] },
  { id: 'leader', name: '直属领导', groups: [] },
];

export default function OnboardingApprovalSettingsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Section[]>(initialData);
  const [activeSection, setActiveSection] = useState('basic');

  const handleFieldChange = (sectionId: string, groupId: string, fieldId: string, key: 'valid' | 'required', value: boolean) => {
    setData(prevData => prevData.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          groups: section.groups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                fields: group.fields.map(field => {
                  if (field.id === fieldId) {
                    const newField = { ...field, [key]: value };
                    if (key === 'required' && value) {
                      newField.valid = true;
                    }
                    if (key === 'valid' && !value) {
                      newField.required = false;
                    }
                    return newField;
                  }
                  return field;
                })
              };
            }
            return group;
          })
        };
      }
      return section;
    }));
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium text-gray-800">入职审批表单设置</h1>
        <button className="px-4 py-1.5 border border-gray-300 bg-white rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          重置系统默认
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 gap-4 pb-16">
        {/* Left Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {data.filter(s => s.groups.length > 0).map(section => (
            <div key={section.id} id={`section-${section.id}`} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
                  <h2 className="text-base font-medium text-gray-800">{section.name}</h2>
                </div>
                <ChevronUp size={16} className="text-gray-400" />
              </div>
              
              <div className="border border-gray-100 rounded-md overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="py-3 px-4 font-medium w-48">分组名称</th>
                      <th className="py-3 px-4 font-medium w-64">字段名称</th>
                      <th className="py-3 px-4 font-medium w-48">
                        入职审批有效 <HelpCircle size={14} className="inline text-gray-400 ml-1" />
                      </th>
                      <th className="py-3 px-4 font-medium">
                        入职审批必填 <HelpCircle size={14} className="inline text-gray-400 ml-1" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {section.groups.map((group) => (
                      <React.Fragment key={group.id}>
                        {group.fields.map((field, fieldIndex) => (
                          <tr key={field.id} className="hover:bg-gray-50/50">
                            {fieldIndex === 0 && (
                              <td 
                                className="py-3 px-4 text-gray-800 align-top bg-white border-r border-gray-50" 
                                rowSpan={group.fields.length}
                              >
                                {group.name}
                              </td>
                            )}
                            <td className="py-3 px-4 text-gray-600">{field.name}</td>
                            <td className="py-3 px-4">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 accent-primary cursor-pointer"
                                checked={field.valid}
                                onChange={(e) => handleFieldChange(section.id, group.id, field.id, 'valid', e.target.checked)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 accent-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                checked={field.required}
                                disabled={!field.valid}
                                onChange={(e) => handleFieldChange(section.id, group.id, field.id, 'required', e.target.checked)}
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Right Anchor Nav */}
        <div className="w-48 shrink-0">
          <div className="bg-white rounded-lg shadow-sm py-2 sticky top-4">
            <div className="flex flex-col">
              {data.map(section => (
                <div 
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 cursor-pointer text-sm border-l-2 transition-colors ${
                    activeSection === section.id 
                      ? 'text-primary border-primary bg-primary/5' 
                      : 'text-gray-600 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  {section.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end space-x-3 z-10" style={{ left: '220px' }}>
        <button 
          onClick={() => navigate('/employee-settings')}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button 
          onClick={() => navigate('/employee-settings')}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          保存
        </button>
      </div>
    </div>
  );
}
