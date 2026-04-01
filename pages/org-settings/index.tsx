import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, Menu, Edit2, Trash2, X, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

const OrgSettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'org-rules';
  const [allowAutoAddDept, setAllowAutoAddDept] = useState(false);
  const [allowAutoAddPos, setAllowAutoAddPos] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  const [isAddDimensionModalOpen, setIsAddDimensionModalOpen] = useState(false);
  const [newDimensionName, setNewDimensionName] = useState('');
  const [newDimensionDesc, setNewDimensionDesc] = useState('');
  const [newDimensionIndependentPos, setNewDimensionIndependentPos] = useState(false);

  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleScopes, setNewRuleScopes] = useState([{ type: '组织类型', value: '' }]);
  const [newRuleSerialDigits, setNewRuleSerialDigits] = useState(5);
  const [newRuleSuffix, setNewRuleSuffix] = useState('');
  const [newRuleCurrentSerial, setNewRuleCurrentSerial] = useState(0);
  const [showRuleInfo, setShowRuleInfo] = useState(true);

  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const tabs = [
    { id: 'org-rules', label: '组织规则设定' },
    { id: 'dept-code', label: '部门编码设置' },
    { id: 'dept-fields', label: '部门字段设置' },
    { id: 'headcount-rules', label: '编制规则设置' },
    { id: 'multi-dim-org', label: '多维组织设置' },
  ];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const deptCodeRules = [
    { id: 1, name: '产品', company: '许波波测试公司', type: '公司', level: '', example: 'PM00001', status: 'enabled' },
    { id: 2, name: 'ayumi测试规则名称', company: '许波波测试公司', type: '部门', level: '', example: 'BBBB00001', status: 'enabled' },
    { id: 3, name: '部门编码规则', company: '', type: '门店', level: '', example: 'BOB00001', status: 'enabled' },
    { id: 4, name: '3253', company: '123ayumi', type: '', level: '', example: 'CCC00001', status: 'enabled' },
    { id: 5, name: '11', company: '', type: '公司', level: '', example: 'A00001', status: 'enabled' },
    { id: 6, name: '物流', company: '', type: '公司', level: '', example: 'A00001', status: 'enabled' },
  ];

  const [deptFields, setDeptFields] = useState([
    { id: 'virtual_org', label: '虚拟组织', englishName: 'Virtual Organization', required: true, readonly: false },
    { id: 'org_name', label: '组织名称', englishName: 'Organization Name', required: true, readonly: false },
    { id: 'dept_code', label: '部门编码', englishName: 'Department Code', required: false, readonly: false },
    { id: 'org_type', label: '组织类别', englishName: 'Organization Type', required: true, readonly: false },
    { id: 'short_name', label: '简称', englishName: 'Short Name', required: false, readonly: false },
    { id: 'parent_org', label: '上级组织', englishName: 'Parent Organization', required: true, readonly: false },
    { id: 'setup_date', label: '设立日期', englishName: 'Setup Date', required: false, readonly: false },
    { id: 'effective_date', label: '生效日期', englishName: 'Effective Date', required: true, readonly: false },
    { id: 'direct_headcount', label: '直属编制人数', englishName: 'Direct Headcount', required: false, readonly: false },
    { id: 'dept_head', label: '部门负责人', englishName: 'Department Head', required: false, readonly: false },
    { id: 'work_location', label: '工作地点', englishName: 'Work Location', required: false, readonly: false },
    { id: 'cost_center', label: '成本中心', englishName: 'Cost Center', required: false, readonly: false },
    { id: 'org_attr', label: '组织属性', englishName: 'Organization Attribute', required: false, readonly: false },
    { id: 'store_code', label: '门店编号', englishName: 'Store Code', required: false, readonly: false },
    { id: 'org_desc', label: '组织描述', englishName: 'Organization Description', required: false, readonly: false },
    { id: 'remark', label: '备注', englishName: 'Remark', required: false, readonly: false },
  ]);

  const [editingField, setEditingField] = useState<any>(null);

  const [occupationRules, setOccupationRules] = useState([
    {
      id: 'hire',
      business: '录用入职',
      nodes: [
        { id: 'hire_approval', label: '发起录用审批', hasDropdown: true, checked: false },
        { id: 'enter_onboarding', label: '进入入职/新增待入职', checked: false },
        { id: 'onboarding_approval', label: '发起入职审批', checked: false },
        { id: 'onboarding_passed', label: '入职审批通过', checked: false },
        { id: 'confirm_onboarding', label: '确认入职', checked: true, disabled: true },
      ]
    },
    {
      id: 'transfer_in',
      business: '调入',
      nodes: [
        { id: 'transfer_in_approval', label: '发起调动审批', checked: false },
        { id: 'transfer_in_passed', label: '审批通过', checked: false },
        { id: 'confirm_transfer_in', label: '确认调动', checked: true, disabled: true },
      ]
    }
  ]);

  const [releaseRules, setReleaseRules] = useState([
    {
      id: 'resign',
      business: '离职',
      nodes: [
        { id: 'resign_approval', label: '发起离职审批', checked: false },
        { id: 'resign_passed', label: '审批通过', checked: false },
        { id: 'confirm_resign', label: '确认离职', checked: true, disabled: true },
      ]
    },
    {
      id: 'transfer_out',
      business: '调出',
      nodes: [
        { id: 'transfer_out_approval', label: '发起调动审批', checked: false },
        { id: 'transfer_out_passed', label: '审批通过', checked: false },
        { id: 'confirm_transfer_out', label: '确认调动', checked: true, disabled: true },
      ]
    }
  ]);

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm min-h-full flex flex-col relative">
          {/* Tabs */}
          <div className="flex justify-between items-center border-b border-border-base px-6 shrink-0 pt-2">
            <div className="flex">
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  className={`px-4 py-3 text-sm cursor-pointer relative ${
                    activeTab === tab.id ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </div>
              ))}
            </div>
            {activeTab === 'multi-dim-org' && (
              <button className="px-4 py-1.5 text-sm text-primary border border-primary rounded hover:bg-primary/5">
                变更记录
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-6 flex-1 pb-20">
            {activeTab === 'org-rules' && (
              <div className="max-w-3xl mx-auto mt-12 space-y-10">
                <div className="flex items-center justify-center">
                  <span className="w-64 text-sm text-gray-700 text-right mr-6">导入花名册时,允许自动新增部门：</span>
                  <div className="flex items-center space-x-8 w-48">
                    <label className="flex items-center cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${allowAutoAddDept ? 'border-primary' : 'border-gray-300'}`}>
                        {allowAutoAddDept && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={allowAutoAddDept === true}
                        onChange={() => setAllowAutoAddDept(true)}
                      />
                      <span className="text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${!allowAutoAddDept ? 'border-primary' : 'border-gray-300'}`}>
                        {!allowAutoAddDept && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={allowAutoAddDept === false}
                        onChange={() => setAllowAutoAddDept(false)}
                      />
                      <span className="text-sm text-gray-700">否</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <span className="w-64 text-sm text-gray-700 text-right mr-6">导入花名册时,允许自动新增职位：</span>
                  <div className="flex items-center space-x-8 w-48">
                    <label className="flex items-center cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${allowAutoAddPos ? 'border-primary' : 'border-gray-300'}`}>
                        {allowAutoAddPos && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={allowAutoAddPos === true}
                        onChange={() => setAllowAutoAddPos(true)}
                      />
                      <span className="text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${!allowAutoAddPos ? 'border-primary' : 'border-gray-300'}`}>
                        {!allowAutoAddPos && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={allowAutoAddPos === false}
                        onChange={() => setAllowAutoAddPos(false)}
                      />
                      <span className="text-sm text-gray-700">否</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dept-code' && (
              <div className="flex flex-col h-full">
                <div className="flex justify-end mb-4">
                  <button 
                    className="px-4 py-1.5 text-sm text-white bg-primary rounded hover:bg-primary-hover"
                    onClick={() => setIsAddRuleModalOpen(true)}
                  >
                    新增规则
                  </button>
                </div>
                
                <div className="bg-[#E6F8F6] border border-[#B3E8E1] rounded px-4 py-2 flex items-center mb-4">
                  <Info size={14} className="text-primary mr-2" />
                  <span className="text-xs text-gray-700">当某个部门适用多种规则时，排列在最上方的规则将被优先使用！可拖动调整规则顺序</span>
                </div>

                <div className="border border-border-base rounded-sm overflow-visible">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#F5F7FA] text-gray-600 border-b border-border-base">
                      <tr>
                        <th className="px-4 py-3 font-medium w-12 rounded-tl-sm"></th>
                        <th className="px-4 py-3 font-medium">规则名称</th>
                        <th className="px-4 py-3 font-medium">适用所属公司</th>
                        <th className="px-4 py-3 font-medium">适用组织类型</th>
                        <th className="px-4 py-3 font-medium">适用组织层级</th>
                        <th className="px-4 py-3 font-medium">部门编码示例</th>
                        <th className="px-4 py-3 font-medium">状态</th>
                        <th className="px-4 py-3 font-medium w-24 rounded-tr-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptCodeRules.map((rule, index) => (
                        <tr key={rule.id} className="border-b border-border-base hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-400 cursor-move">
                            <Menu size={16} />
                          </td>
                          <td className="px-4 py-3 text-gray-800">{rule.name}</td>
                          <td className="px-4 py-3 text-gray-600">{rule.company}</td>
                          <td className="px-4 py-3 text-gray-600">{rule.type}</td>
                          <td className="px-4 py-3 text-gray-600">{rule.level}</td>
                          <td className="px-4 py-3 text-gray-600">{rule.example}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span className="flex items-center text-gray-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                启用
                              </span>
                              <span className="text-primary cursor-pointer hover:underline">禁用</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-primary flex space-x-3">
                            <Edit2 size={16} className="cursor-pointer hover:opacity-80" />
                            <Trash2 size={16} className="cursor-pointer hover:opacity-80" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'dept-fields' && (
              <div className="flex h-full">
                <div className="w-64 border border-border-base rounded-sm overflow-hidden flex flex-col">
                  <div className="bg-[#E5E7EB] px-4 py-2 text-sm font-medium text-gray-800 border-b border-border-base">
                    组织信息
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {deptFields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between px-3 py-2 border border-gray-300 bg-[#F9FAFB] rounded-sm group">
                        <span className="text-sm text-gray-700">{field.label}</span>
                        <div className="flex items-center space-x-2">
                          <Edit2 
                            size={14} 
                            className="text-gray-400 cursor-pointer hover:text-primary" 
                            onClick={() => setEditingField({ ...field })}
                          />
                          <span className="text-xs text-gray-500 w-6 text-right">
                            {field.required ? '必填' : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 ml-6 flex items-center justify-center text-gray-400">
                  {/* Empty state for the right side as shown in the screenshot */}
                </div>
              </div>
            )}

            {activeTab === 'headcount-rules' && (
              <div className="flex flex-col h-full">
                {showWarning && (
                  <div className="bg-[#FFFBE6] border border-[#FFE58F] px-4 py-2 rounded-sm flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 rounded-full bg-[#FAAD14] text-white flex items-center justify-center text-xs font-bold mr-2">!</div>
                      <span className="text-gray-700">温馨提示：花名册手动/导入/同步新增、删除员工，合同管理，也会占用/释放编制！</span>
                    </div>
                    <X size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setShowWarning(false)} />
                  </div>
                )}

                {/* 编制占用 */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-4 bg-primary mr-2 rounded-sm"></div>
                    <h3 className="text-base font-medium text-gray-800 mr-2">编制占用</h3>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                  </div>
                  
                  <div className="border border-border-base rounded-sm overflow-visible">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#F5F7FA] text-gray-600 border-b border-border-base">
                        <tr>
                          <th className="px-4 py-3 font-medium w-48 rounded-tl-sm">业务</th>
                          <th className="px-4 py-3 font-medium rounded-tr-sm">占编业务节点</th>
                        </tr>
                      </thead>
                      <tbody>
                        {occupationRules.map((rule, index) => (
                          <tr key={rule.id} className="border-b border-border-base hover:bg-gray-50">
                            <td className="px-4 py-4 text-gray-800">{rule.business}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center flex-wrap gap-y-2">
                                {rule.nodes.map((node, nIdx) => (
                                  <React.Fragment key={node.id}>
                                    <div className="flex items-center">
                                      {node.hasDropdown ? (
                                        <>
                                          <label className="flex items-center cursor-pointer">
                                            <input 
                                              type="checkbox" 
                                              className="w-3.5 h-3.5 rounded-sm border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                              checked={node.checked}
                                              disabled={node.disabled}
                                              onChange={(e) => {
                                                const newRules = [...occupationRules];
                                                newRules[index].nodes[nIdx].checked = e.target.checked;
                                                setOccupationRules(newRules);
                                              }}
                                            />
                                          </label>
                                          <div className="relative ml-2">
                                            <div 
                                              className={`flex items-center px-2 py-1 rounded-sm cursor-pointer border ${openDropdownId === node.id ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenDropdownId(openDropdownId === node.id ? null : node.id);
                                              }}
                                            >
                                              <span className="text-sm text-gray-700">{node.label}</span>
                                              <ChevronDown size={14} className="ml-1 text-gray-400" />
                                            </div>
                                            {openDropdownId === node.id && (
                                              <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-sm z-50 py-1">
                                                {['发起录用审批', '录用审批通过', '发送offer'].map(option => (
                                                  <div 
                                                    key={option}
                                                    className="px-3 py-2 text-sm text-gray-700 hover:bg-[#E6F8F6] hover:text-primary cursor-pointer"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      const newRules = [...occupationRules];
                                                      newRules[index].nodes[nIdx].label = option;
                                                      setOccupationRules(newRules);
                                                      setOpenDropdownId(null);
                                                    }}
                                                  >
                                                    {option}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <label className="flex items-center cursor-pointer">
                                          <input 
                                            type="checkbox" 
                                            className="w-3.5 h-3.5 rounded-sm border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            checked={node.checked}
                                            disabled={node.disabled}
                                            onChange={(e) => {
                                              const newRules = [...occupationRules];
                                              newRules[index].nodes[nIdx].checked = e.target.checked;
                                              setOccupationRules(newRules);
                                            }}
                                          />
                                          <span className={`ml-2 text-sm ${node.disabled ? 'text-gray-500' : 'text-gray-700'}`}>{node.label}</span>
                                        </label>
                                      )}
                                    </div>
                                    {nIdx < rule.nodes.length - 1 && (
                                      <ArrowRight size={14} className="mx-3 text-gray-400" />
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 编制释放 */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-4 bg-primary mr-2 rounded-sm"></div>
                    <h3 className="text-base font-medium text-gray-800 mr-2">编制释放</h3>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                  </div>
                  
                  <div className="border border-border-base rounded-sm overflow-visible">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#F5F7FA] text-gray-600 border-b border-border-base">
                        <tr>
                          <th className="px-4 py-3 font-medium w-48 rounded-tl-sm">业务</th>
                          <th className="px-4 py-3 font-medium rounded-tr-sm">脱编业务节点</th>
                        </tr>
                      </thead>
                      <tbody>
                        {releaseRules.map((rule, index) => (
                          <tr key={rule.id} className="border-b border-border-base hover:bg-gray-50">
                            <td className="px-4 py-4 text-gray-800">{rule.business}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center flex-wrap gap-y-2">
                                {rule.nodes.map((node, nIdx) => (
                                  <React.Fragment key={node.id}>
                                    <div className="flex items-center">
                                      <label className="flex items-center cursor-pointer">
                                        <input 
                                          type="checkbox" 
                                          className="w-3.5 h-3.5 rounded-sm border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                          checked={node.checked}
                                          disabled={node.disabled}
                                          onChange={(e) => {
                                            const newRules = [...releaseRules];
                                            newRules[index].nodes[nIdx].checked = e.target.checked;
                                            setReleaseRules(newRules);
                                          }}
                                        />
                                        <span className={`ml-2 text-sm ${node.disabled ? 'text-gray-500' : 'text-gray-700'}`}>{node.label}</span>
                                      </label>
                                    </div>
                                    {nIdx < rule.nodes.length - 1 && (
                                      <ArrowRight size={14} className="mx-3 text-gray-400" />
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'multi-dim-org' && (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium text-gray-900">多维组织设置(2)</h3>
                  <button 
                    className="px-4 py-1.5 text-sm text-white bg-primary rounded hover:bg-primary-hover"
                    onClick={() => setIsAddDimensionModalOpen(true)}
                  >
                    新增维度
                  </button>
                </div>
                
                <div className="bg-[#E6F8F6] border border-[#B3E8E1] rounded px-4 py-2 flex items-center mb-4">
                  <Info size={14} className="text-primary mr-2" />
                  <span className="text-xs text-gray-700">新增维度后，系统将在【多维组织】中自动生成对应的维度菜单，用于独立维护该维度下的组织架构和职位信息。若您无相关菜单权限，请联系超级管理员开通</span>
                </div>

                <div className="border border-border-base rounded-sm overflow-visible">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#F5F7FA] text-gray-600 border-b border-border-base">
                      <tr>
                        <th className="px-4 py-3 font-medium rounded-tl-sm">维度名称</th>
                        <th className="px-4 py-3 font-medium">说明</th>
                        <th className="px-4 py-3 font-medium">是否启用独立职位体系</th>
                        <th className="px-4 py-3 font-medium">停用后维度是否显示</th>
                        <th className="px-4 py-3 font-medium">状态</th>
                        <th className="px-4 py-3 font-medium">创建人</th>
                        <th className="px-4 py-3 font-medium text-right rounded-tr-sm">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base hover:bg-gray-50">
                        <td className="px-4 py-4 text-gray-800">部门维度</td>
                        <td className="px-4 py-4 text-gray-800"></td>
                        <td className="px-4 py-4 text-gray-800">是</td>
                        <td className="px-4 py-4 text-gray-800">否</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-gray-800">启用</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-800">假的ayumi</td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-primary hover:text-primary-hover mr-3">编辑</button>
                          <button className="text-primary hover:text-primary-hover mr-3">停用</button>
                          <button className="text-primary hover:text-primary-hover">删除</button>
                        </td>
                      </tr>
                      <tr className="border-b border-border-base hover:bg-gray-50">
                        <td className="px-4 py-4 text-gray-800">项目维度</td>
                        <td className="px-4 py-4 text-gray-800"></td>
                        <td className="px-4 py-4 text-gray-800">否</td>
                        <td className="px-4 py-4 text-gray-800">否</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-gray-800">启用</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-800">许鸣波</td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-primary hover:text-primary-hover mr-3">编辑</button>
                          <button className="text-primary hover:text-primary-hover mr-3">停用</button>
                          <button className="text-primary hover:text-primary-hover">删除</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="mt-4 flex justify-end items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      &lt;
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-primary text-primary rounded bg-white">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      &gt;
                    </button>
                    <div className="relative">
                      <select className="appearance-none border border-gray-300 rounded px-3 py-1.5 pr-8 hover:border-primary focus:outline-none focus:border-primary bg-white">
                        <option>10 条/页</option>
                        <option>20 条/页</option>
                        <option>50 条/页</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'org-rules' && activeTab !== 'dept-code' && activeTab !== 'dept-fields' && activeTab !== 'headcount-rules' && activeTab !== 'multi-dim-org' && (
              <div className="flex items-center justify-center h-64 text-gray-400">
                该功能正在开发中...
              </div>
            )}
          </div>
          
          {/* Footer Buttons - Only show on org-rules and headcount-rules tabs */}
          {(activeTab === 'org-rules' || activeTab === 'headcount-rules') && (
            <div className="absolute bottom-6 right-6 flex items-center space-x-3">
              {activeTab === 'org-rules' && (
                <button className="px-5 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                  取消
                </button>
              )}
              <button className="px-5 py-1.5 text-sm text-white bg-primary rounded hover:bg-primary-hover">
                保存
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Rule Modal */}
      {isAddRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded w-[800px] flex flex-col shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-900">新增编码规则</h3>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {showRuleInfo && (
                <div className="bg-[#E6F8F6] border border-[#B3E8E1] rounded px-4 py-2 flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Info size={16} className="text-primary mr-2" fill="currentColor" stroke="white" />
                    <span className="text-sm text-gray-700">若设置了多个适用范围，则多个适用范围取交集</span>
                  </div>
                  <X size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setShowRuleInfo(false)} />
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-32 text-right text-sm text-gray-700 mr-4">
                    <span className="text-red-500 mr-1">*</span> 规则名称：
                  </div>
                  <div className="flex-1 max-w-lg">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="请输入名称（最多30个字）"
                      maxLength={30}
                      value={newRuleName}
                      onChange={(e) => setNewRuleName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-32 text-right text-sm text-gray-700 mr-4 pt-2 flex items-center justify-end">
                    <span className="text-red-500 mr-1">*</span> 适用范围
                    <HelpCircle size={14} className="text-gray-400 ml-1 cursor-help" />
                    ：
                  </div>
                  <div className="flex-1">
                    {newRuleScopes.map((scope, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <div className="relative w-48">
                          <select 
                            className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-2 pr-8 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            value={scope.type}
                            onChange={(e) => {
                              const newScopes = [...newRuleScopes];
                              newScopes[index].type = e.target.value;
                              setNewRuleScopes(newScopes);
                            }}
                          >
                            <option value="组织类型">组织类型</option>
                            <option value="所属公司">所属公司</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1 max-w-[300px]">
                          <select 
                            className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-2 pr-8 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            value={scope.value}
                            onChange={(e) => {
                              const newScopes = [...newRuleScopes];
                              newScopes[index].value = e.target.value;
                              setNewRuleScopes(newScopes);
                            }}
                          >
                            <option value=""></option>
                          </select>
                          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    ))}
                    <div 
                      className="flex items-center text-primary text-sm cursor-pointer hover:text-primary-hover mt-2 w-fit"
                      onClick={() => setNewRuleScopes([...newRuleScopes, { type: '组织类型', value: '' }])}
                    >
                      <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center mr-1">
                        <span className="text-xs leading-none">+</span>
                      </div>
                      添加
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-sm p-6 bg-[#FAFAFA]">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-2">前缀</div>
                      <div className="relative">
                        <select className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-2 pr-8 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                          <option value=""></option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-2">前缀</div>
                      <div className="relative">
                        <select className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-2 pr-8 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                          <option value=""></option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-2"><span className="text-red-500 mr-1">*</span>流水号位数</div>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-8"
                          value={newRuleSerialDigits}
                          onChange={(e) => setNewRuleSerialDigits(Number(e.target.value))}
                        />
                        <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-gray-300 w-6">
                          <button className="flex-1 flex items-center justify-center border-b border-gray-300 hover:bg-gray-100" onClick={() => setNewRuleSerialDigits(prev => prev + 1)}>
                            <ChevronDown size={12} className="rotate-180 text-gray-500" />
                          </button>
                          <button className="flex-1 flex items-center justify-center hover:bg-gray-100" onClick={() => setNewRuleSerialDigits(prev => Math.max(1, prev - 1))}>
                            <ChevronDown size={12} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">示例：{String(1).padStart(newRuleSerialDigits, '0')}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-2">后缀</div>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={newRuleSuffix}
                        onChange={(e) => setNewRuleSuffix(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="w-32 text-right text-sm text-gray-700 mr-4 flex items-center justify-end">
                      流水号当前值
                      <HelpCircle size={14} className="text-gray-400 ml-1 cursor-help" />
                      ：
                    </div>
                    <div className="relative w-64">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-8"
                        value={newRuleCurrentSerial}
                        onChange={(e) => setNewRuleCurrentSerial(Number(e.target.value))}
                      />
                      <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-gray-300 w-6 bg-gray-50">
                        <button className="flex-1 flex items-center justify-center border-b border-gray-300 hover:bg-gray-200" onClick={() => setNewRuleCurrentSerial(prev => prev + 1)}>
                          <ChevronDown size={12} className="rotate-180 text-gray-500" />
                        </button>
                        <button className="flex-1 flex items-center justify-center hover:bg-gray-200" onClick={() => setNewRuleCurrentSerial(prev => Math.max(0, prev - 1))}>
                          <ChevronDown size={12} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center">
                    <div className="w-32 text-right text-sm text-gray-700 mr-4">
                      编码示例：
                    </div>
                    <div className="text-sm text-primary">
                      {String(newRuleCurrentSerial + 1).padStart(newRuleSerialDigits, '0')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-4">
              <button
                className="px-4 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-sm"
                onClick={() => setIsAddRuleModalOpen(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded-sm"
                onClick={() => setIsAddRuleModalOpen(false)}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Dimension Modal */}
      {isAddDimensionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded w-[600px] flex flex-col shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-900">新增维度</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start">
                <div className="w-40 text-right text-sm text-gray-700 mr-4 pt-2">
                  <span className="text-red-500 mr-1">*</span> 维度名称：
                </div>
                <div className="flex-1 pr-12">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="请输入维度名称"
                    value={newDimensionName}
                    onChange={(e) => setNewDimensionName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-40 text-right text-sm text-gray-700 mr-4 pt-2">
                  说明：
                </div>
                <div className="flex-1 pr-12">
                  <textarea
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm h-24 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="请输入说明"
                    maxLength={100}
                    value={newDimensionDesc}
                    onChange={(e) => setNewDimensionDesc(e.target.value)}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {newDimensionDesc.length} / 100
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-40 text-right text-sm text-gray-700 mr-4 flex items-center justify-end">
                  是否启用独立职位体系
                  <HelpCircle size={14} className="text-gray-500 ml-1 cursor-help" />
                  ：
                </div>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${newDimensionIndependentPos ? 'border-primary' : 'border-gray-300'}`}>
                      {newDimensionIndependentPos && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={newDimensionIndependentPos === true}
                      onChange={() => setNewDimensionIndependentPos(true)}
                    />
                    <span className="text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${!newDimensionIndependentPos ? 'border-primary' : 'border-gray-300'}`}>
                      {!newDimensionIndependentPos && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={newDimensionIndependentPos === false}
                      onChange={() => setNewDimensionIndependentPos(false)}
                    />
                    <span className="text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-4">
              <button
                className="px-4 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-sm"
                onClick={() => setIsAddDimensionModalOpen(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded-sm"
                onClick={() => setIsAddDimensionModalOpen(false)}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Field Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded w-[600px] flex flex-col shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-900">编辑字段</h3>
            </div>
            <div className="p-6 space-y-8">
              <div className="flex items-center space-x-8">
                <div className="flex items-center flex-1">
                  <div className="w-24 text-right text-sm text-gray-700 mr-4">
                    中文名称：
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed focus:outline-none"
                      value={editingField.label}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="w-24 text-right text-sm text-gray-700 mr-4">
                    英文名称：
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={editingField.englishName || ''}
                      onChange={(e) => setEditingField({ ...editingField, englishName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center flex-1">
                  <div className="w-24 text-right text-sm text-gray-700 mr-4">
                    <span className="text-red-500 mr-1">*</span> 是否必填：
                  </div>
                  <div className="flex-1">
                    <button
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${editingField.required ? 'bg-primary' : 'bg-gray-300'}`}
                      onClick={() => setEditingField({ ...editingField, required: !editingField.required })}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editingField.required ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="w-24 text-right text-sm text-gray-700 mr-4">
                    <span className="text-red-500 mr-1">*</span> 是否只读：
                  </div>
                  <div className="flex-1">
                    <button
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${editingField.readonly ? 'bg-primary' : 'bg-gray-300'}`}
                      onClick={() => setEditingField({ ...editingField, readonly: !editingField.readonly })}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editingField.readonly ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-4">
              <button
                className="px-4 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-sm"
                onClick={() => setEditingField(null)}
              >
                取消
              </button>
              <button
                className="px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded-sm"
                onClick={() => {
                  setDeptFields(deptFields.map(f => f.id === editingField.id ? editingField : f));
                  setEditingField(null);
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgSettingsPage;
