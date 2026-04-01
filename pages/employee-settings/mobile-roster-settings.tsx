import React, { useState } from 'react';
import { Info, X, ChevronRight, ChevronDown, Layers, Search, HelpCircle, ChevronLeft } from 'lucide-react';

interface PermissionRow {
  id: string;
  name: string;
  isGroup?: boolean;
  expanded?: boolean;
  children?: PermissionRow[];
  permission: 'hidden' | 'view_only' | 'editable';
  approvalControl?: 'need_hr' | 'no_hr';
}

interface FieldItem {
  id: string;
  name: string;
  selected: boolean;
}

const MobileRosterSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [showBanner, setShowBanner] = useState(true);
  const [allowDeptHeadView, setAllowDeptHeadView] = useState(true);
  const [deptHeadViewScope, setDeptHeadViewScope] = useState('all');
  const [enableCert, setEnableCert] = useState(true);

  const [data, setData] = useState<PermissionRow[]>([
    {
      id: 'basic',
      name: '基础信息',
      isGroup: true,
      expanded: true,
      permission: 'hidden',
      children: [
        { id: 'edu', name: '教育经历', permission: 'editable', approvalControl: 'no_hr' },
        { id: 'work', name: '工作经历', permission: 'view_only' },
        { id: 'family', name: '家庭成员', permission: 'view_only' },
        { id: 'cert', name: '员工证书', permission: 'editable', approvalControl: 'need_hr' },
        { id: 'perf', name: '绩效档案', permission: 'hidden' },
        { id: 'custom_ayumi', name: '自定义一个ayumi', permission: 'hidden' },
        { id: 'interview_attach', name: '面试记录（附件）', permission: 'hidden' },
        { id: 'interview_field', name: '面试记录（字段对接）', permission: 'hidden' },
        { id: 'test_subset', name: '新增测试子集', permission: 'hidden' },
      ]
    }
  ]);

  const [availableFields, setAvailableFields] = useState<FieldItem[]>([
    { id: 'basic', name: '基础信息', selected: true },
    { id: 'edu', name: '教育经历', selected: false },
    { id: 'work', name: '工作经历', selected: false },
    { id: 'family', name: '家庭成员', selected: false },
    { id: 'cert', name: '员工证书', selected: false },
    { id: 'perf', name: '绩效档案', selected: false },
    { id: 'custom_ayumi', name: '自定义一个ayumi', selected: false },
    { id: 'interview_attach', name: '面试记录（附件）', selected: false },
    { id: 'interview_field', name: '面试记录（字段对接）', selected: false },
    { id: 'test_subset', name: '新增测试子集', selected: false },
    { id: 'bank', name: '银行卡信息', selected: false },
    { id: 'company', name: '公司内兼任', selected: false },
    { id: 'leader', name: '直属领导', selected: false },
  ]);

  const [selectedFields, setSelectedFields] = useState<FieldItem[]>([
    { id: 'basic', name: '基础信息', selected: true },
    { id: 'attach', name: '附件', selected: true },
  ]);

  const toggleGroup = (groupId: string) => {
    setData(data.map(group => {
      if (group.id === groupId) {
        return { ...group, expanded: !group.expanded };
      }
      return group;
    }));
  };

  const updatePermission = (groupId: string, childId: string, permission: 'hidden' | 'view_only' | 'editable') => {
    setData(data.map(group => {
      if (group.id === groupId && group.children) {
        return {
          ...group,
          children: group.children.map(child => {
            if (child.id === childId) {
              return { ...child, permission };
            }
            return child;
          })
        };
      }
      return group;
    }));
  };

  const updateApproval = (groupId: string, childId: string, approvalControl: 'need_hr' | 'no_hr') => {
    setData(data.map(group => {
      if (group.id === groupId && group.children) {
        return {
          ...group,
          children: group.children.map(child => {
            if (child.id === childId) {
              return { ...child, approvalControl };
            }
            return child;
          })
        };
      }
      return group;
    }));
  };

  const renderPersonalInfo = () => (
    <>
      {/* Content Header */}
      <div className="p-4 border-b border-gray-100 flex items-center shrink-0">
        <Layers className="text-primary mr-2" size={18} />
        <h2 className="text-base font-medium text-gray-900">个人信息授权</h2>
      </div>

      <div className="p-4 flex-1">
        {/* Banner */}
        {showBanner && (
          <div className="bg-[#E6F8F6] border border-[#B3E8E1] rounded px-4 py-2.5 mb-4 flex items-start justify-between">
            <div className="flex items-center text-sm text-[#00A896]">
              <Info size={16} className="mr-2 shrink-0" />
              <span>员工可在App端，【我的】→【我的档案】中查看和编辑所有授权的花名册信息</span>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-[#00A896] hover:text-[#008A7B] ml-4">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_2fr_2fr] bg-gray-50 border-b border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">信息子集</div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">权限</div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700">审批控制</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {data.map(group => (
              <React.Fragment key={group.id}>
                {/* Group Row */}
                <div className="grid grid-cols-[1fr_2fr_2fr] bg-gray-50/50">
                  <div 
                    className="px-4 py-3 flex items-center cursor-pointer hover:bg-gray-100 border-r border-gray-200"
                    onClick={() => toggleGroup(group.id)}
                  >
                    {group.expanded ? <ChevronDown size={16} className="text-gray-500 mr-2" /> : <ChevronRight size={16} className="text-gray-500 mr-2" />}
                    <span className="text-sm text-gray-800">{group.name}</span>
                  </div>
                  <div className="px-4 py-3 border-r border-gray-200"></div>
                  <div className="px-4 py-3"></div>
                </div>

                {/* Children Rows */}
                {group.expanded && group.children?.map(child => (
                  <div key={child.id} className="grid grid-cols-[1fr_2fr_2fr] hover:bg-gray-50 transition-colors">
                    <div className="px-4 py-3 pl-10 text-sm text-gray-600 border-r border-gray-200">
                      {child.name}
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-6 border-r border-gray-200">
                      <label className="flex items-center cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${child.permission === 'hidden' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                          {child.permission === 'hidden' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <span className="text-sm text-gray-700">隐藏</span>
                        <input 
                          type="radio" 
                          className="hidden" 
                          checked={child.permission === 'hidden'}
                          onChange={() => updatePermission(group.id, child.id, 'hidden')}
                        />
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${child.permission === 'view_only' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                          {child.permission === 'view_only' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <span className="text-sm text-gray-700">仅显示</span>
                        <input 
                          type="radio" 
                          className="hidden" 
                          checked={child.permission === 'view_only'}
                          onChange={() => updatePermission(group.id, child.id, 'view_only')}
                        />
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${child.permission === 'editable' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                          {child.permission === 'editable' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <span className="text-sm text-gray-700">可编辑</span>
                        <input 
                          type="radio" 
                          className="hidden" 
                          checked={child.permission === 'editable'}
                          onChange={() => updatePermission(group.id, child.id, 'editable')}
                        />
                      </label>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-6">
                      {child.permission === 'editable' && (
                        <>
                          <label className="flex items-center cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${child.approvalControl === 'need_hr' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                              {child.approvalControl === 'need_hr' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                            </div>
                            <span className="text-sm text-gray-700">需要HR审批</span>
                            <input 
                              type="radio" 
                              className="hidden" 
                              checked={child.approvalControl === 'need_hr'}
                              onChange={() => updateApproval(group.id, child.id, 'need_hr')}
                            />
                          </label>
                          <label className="flex items-center cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${child.approvalControl === 'no_hr' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                              {child.approvalControl === 'no_hr' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                            </div>
                            <span className="text-sm text-gray-700">无需HR审批</span>
                            <input 
                              type="radio" 
                              className="hidden" 
                              checked={child.approvalControl === 'no_hr'}
                              onChange={() => updateApproval(group.id, child.id, 'no_hr')}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderTeamInfo = () => (
    <>
      {/* Content Header */}
      <div className="p-4 border-b border-gray-100 flex items-center shrink-0">
        <Layers className="text-primary mr-2" size={18} />
        <h2 className="text-base font-medium text-gray-900">团队信息授权</h2>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Banner */}
        {showBanner && (
          <div className="bg-[#E6F8F6] border border-[#B3E8E1] rounded px-4 py-2.5 mb-6 flex items-start justify-between shrink-0">
            <div className="flex items-center text-sm text-[#00A896]">
              <Info size={16} className="mr-2 shrink-0" />
              <span>部门负责人或HR可在App端，【应用】→【员工花名册】列表页面中点击【设置】进行个性化显示设置</span>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-[#00A896] hover:text-[#008A7B] ml-4">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Settings Form */}
        <div className="mb-8 shrink-0">
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-800 w-72 shrink-0 text-right pr-4">
              是否允许部门负责人查看手机花名册<HelpCircle size={14} className="inline ml-1 text-gray-400" /> :
            </span>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${allowDeptHeadView ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                  {allowDeptHeadView && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                </div>
                <span className="text-sm text-gray-700">是</span>
                <input 
                  type="radio" 
                  className="hidden" 
                  checked={allowDeptHeadView}
                  onChange={() => setAllowDeptHeadView(true)}
                />
              </label>
              <label className="flex items-center cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${!allowDeptHeadView ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                  {!allowDeptHeadView && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                </div>
                <span className="text-sm text-gray-700">否</span>
                <input 
                  type="radio" 
                  className="hidden" 
                  checked={!allowDeptHeadView}
                  onChange={() => setAllowDeptHeadView(false)}
                />
              </label>
            </div>
          </div>

          {allowDeptHeadView && (
            <div className="flex">
              <div className="w-72 shrink-0"></div>
              <div className="bg-gray-50 p-4 rounded border border-gray-100 flex-1">
                <div className="flex flex-col space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${deptHeadViewScope === 'all' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                      {deptHeadViewScope === 'all' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                    <span className="text-sm text-gray-700">显示组织架构和员工 <span className="text-gray-400">（勾选后，部门负责人可查看所在部门及下级部门的所有部门和员工）</span></span>
                    <input 
                      type="radio" 
                      className="hidden" 
                      checked={deptHeadViewScope === 'all'}
                      onChange={() => setDeptHeadViewScope('all')}
                    />
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${deptHeadViewScope === 'employee_only' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                      {deptHeadViewScope === 'employee_only' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                    <span className="text-sm text-gray-700">仅显示员工 <span className="text-gray-400">（勾选后，部门负责人仅可查看所在部门及下级部门的所有员工）</span></span>
                    <input 
                      type="radio" 
                      className="hidden" 
                      checked={deptHeadViewScope === 'employee_only'}
                      onChange={() => setDeptHeadViewScope('employee_only')}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Field Selection */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center mb-4 shrink-0">
            <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
            <h3 className="text-base font-medium text-gray-900">选择可查看字段</h3>
          </div>

          <div className="flex space-x-8 flex-1 min-h-0">
            {/* Available Fields */}
            <div className="flex-1 border border-gray-200 rounded flex flex-col">
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="请输入搜索内容" 
                    className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary"
                  />
                  <Search size={16} className="absolute right-2.5 top-2 text-gray-400" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {availableFields.map(field => (
                  <div key={field.id} className="flex items-center py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                    <ChevronRight size={14} className="text-gray-400 mr-2" />
                    <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${field.selected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                      {field.selected && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                    </div>
                    <span className="text-sm text-gray-700">{field.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Controls */}
            <div className="flex flex-col justify-center space-y-2 shrink-0">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-400 hover:text-primary transition-colors">
                <ChevronRight size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-400 hover:text-primary transition-colors">
                <ChevronLeft size={16} />
              </button>
            </div>

            {/* Selected Fields */}
            <div className="flex-1 border border-gray-200 rounded flex flex-col">
              <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">已选字段</span>
                <span className="text-xs text-gray-500">可上下<span className="text-primary">拖动</span>字段进行排序</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {selectedFields.map(field => (
                  <div key={field.id} className="flex items-center py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                    <ChevronRight size={14} className="text-gray-400 mr-2" />
                    <div className="w-4 h-4 rounded border border-gray-300 mr-3 flex items-center justify-center bg-gray-100">
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                    <span className="text-sm text-gray-700">{field.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAuthSettings = () => (
    <>
      {/* Content Header */}
      <div className="p-4 border-b border-gray-100 flex items-center shrink-0">
        <Layers className="text-primary mr-2" size={18} />
        <h2 className="text-base font-medium text-gray-900">认证设置</h2>
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-center mb-4 mt-8">
          <span className="text-sm font-medium text-gray-800 w-72 shrink-0 text-right pr-4">
            开启身份信息、人脸核身和银行卡认证<HelpCircle size={14} className="inline ml-1 text-gray-400" /> :
          </span>
          <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${enableCert ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                {enableCert && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <span className="text-sm text-gray-700">是</span>
              <input 
                type="radio" 
                className="hidden" 
                checked={enableCert}
                onChange={() => setEnableCert(true)}
              />
            </label>
            <label className="flex items-center cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${!enableCert ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                {!enableCert && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <span className="text-sm text-gray-700">否</span>
              <input 
                type="radio" 
                className="hidden" 
                checked={!enableCert}
                onChange={() => setEnableCert(false)}
              />
            </label>
            <span className="text-sm text-gray-500 ml-4">
              余额：984次 <a href="#" className="text-primary hover:underline ml-1">去充值</a>
            </span>
          </div>
        </div>

        {enableCert && (
          <div className="flex">
            <div className="w-72 shrink-0"></div>
            <div className="bg-gray-50 p-4 rounded border border-gray-100 flex-1">
              <div className="text-sm text-gray-700 mb-3">认证方式：</div>
              <div className="flex items-center space-x-8">
                <label className="flex items-center cursor-pointer">
                  <div className="w-4 h-4 rounded border border-primary bg-primary mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">身份信息二要素认证<HelpCircle size={14} className="inline ml-1 text-gray-400" /></span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <div className="w-4 h-4 rounded border border-gray-300 mr-2 flex items-center justify-center bg-white">
                  </div>
                  <span className="text-sm text-gray-700">人脸核身认证<HelpCircle size={14} className="inline ml-1 text-gray-400" /></span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <div className="w-4 h-4 rounded border border-gray-300 mr-2 flex items-center justify-center bg-white">
                  </div>
                  <span className="text-sm text-gray-700">银行卡号三要素认证<HelpCircle size={14} className="inline ml-1 text-gray-400" /></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 shrink-0">
        <h1 className="text-lg font-medium text-gray-900 mb-4">手机花名册设置</h1>
        
        {/* Tabs */}
        <div className="flex space-x-8">
          <button 
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'personal' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            个人信息授权
          </button>
          <button 
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'team' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('team')}
          >
            团队信息授权
          </button>
          <button 
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'auth' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('auth')}
          >
            认证设置
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] min-h-full flex flex-col">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'team' && renderTeamInfo()}
          {activeTab === 'auth' && renderAuthSettings()}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 shrink-0 flex justify-end space-x-3">
        <button className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          取消
        </button>
        <button className="px-6 py-2 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors">
          保存
        </button>
      </div>
    </div>
  );
};

export default MobileRosterSettingsPage;
