import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { HelpCircle, Search, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

export default function TransferSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  const [activeTab, setActiveTab] = useState<'rules' | 'template'>('rules');
  const [isSalaryAdjEnabled, setIsSalaryAdjEnabled] = useState(true);
  
  // Expanded state for table rows
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'contract': true,
    'default': false,
    'report': false,
    'concurrent': false,
    'employee': false
  });

  const toggleRow = (key: string) => {
    setExpandedRows(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '调动设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const renderRulesTab = () => (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h2 className="text-base font-medium text-gray-900">规则设置</h2>
          </div>
          <button className="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-hover transition-colors">
            保存
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center space-y-6">
          <div className="flex items-center w-full max-w-2xl">
            <div className="w-1/2 text-right pr-4 text-sm text-gray-700">调动审批通过后，是否自动确认调动：</div>
            <div className="w-1/2 flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="autoConfirmTransfer" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">是</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="autoConfirmTransfer" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">否</span>
              </label>
            </div>
          </div>

          <div className="flex items-center w-full max-w-2xl">
            <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
              员工发起调动申请，可搜索调动部门范围
              <HelpCircle size={14} className="text-gray-400 ml-1" />：
            </div>
            <div className="w-1/2 flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="searchScope" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">所有</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="searchScope" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">所属公司</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplateTab = () => (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-20">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h2 className="text-base font-medium text-gray-900">调动模版</h2>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-hover transition-colors">
              保存
            </button>
            <button className="px-4 py-1.5 border border-primary text-primary text-sm rounded hover:bg-emerald-50 transition-colors">
              表单联动设置
            </button>
            <button className="px-4 py-1.5 border border-primary text-primary text-sm rounded hover:bg-emerald-50 transition-colors">
              重置系统默认
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
            <h3 className="text-sm font-medium text-gray-900">基础设置</h3>
          </div>

          <div className="flex flex-col items-center space-y-6 max-w-3xl mx-auto">
            <div className="w-full">
              <div className="flex items-center justify-center w-full">
                <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                  薪资调整
                  <HelpCircle size={14} className="text-gray-400 ml-1" />：
                </div>
                <div className="w-1/2 flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="salaryAdj" 
                      checked={isSalaryAdjEnabled} 
                      onChange={() => setIsSalaryAdjEnabled(true)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="salaryAdj" 
                      checked={!isSalaryAdjEnabled} 
                      onChange={() => setIsSalaryAdjEnabled(false)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
              
              {isSalaryAdjEnabled && (
                <div className="mt-4 ml-auto w-[60%] bg-gray-50 p-4 rounded flex items-center">
                  <div className="w-1/3 text-right pr-4 text-sm text-gray-700">快速调动是否调整：</div>
                  <div className="w-2/3 flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="quickSalaryAdj" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="quickSalaryAdj" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">否</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                个税扣缴义务人调整
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="taxAdj" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="taxAdj" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                查看员工自定义信息集
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewCustomInfo" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewCustomInfo" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                岗位交接
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="jobHandover" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="jobHandover" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                查看员工分组
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewEmpGroup" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewEmpGroup" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                查看权限分组
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewPermGroup" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewPermGroup" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                是否限制调动日期
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="limitDate" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="limitDate" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="w-1/2 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                调动原因设置
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-1/2 flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="reasonType" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">单选</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="reasonType" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">多选</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
                <h3 className="text-sm font-medium text-gray-900">表单设置</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="请输入关键字" 
                    className="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm w-48 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
                </div>
                <button className="px-3 py-1.5 border border-primary text-primary text-sm rounded hover:bg-emerald-50 transition-colors flex items-center">
                  同步调动字段
                  <HelpCircle size={14} className="ml-1" />
                </button>
                <div className="flex items-center space-x-1 ml-2">
                  <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <ChevronUp size={16} />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <ChevronDown size={16} />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-medium border-b border-gray-200">字段</th>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-32">显示</th>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-32">快速调动显示</th>
                    <th className="px-4 py-3 font-medium border-b border-gray-200 w-32">必填</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Contract Info */}
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleRow('contract')}>
                        {expandedRows.contract ? <ChevronDown size={16} className="text-gray-400 mr-2" /> : <ChevronRight size={16} className="text-gray-400 mr-2" />}
                        <span className="font-medium">合同信息</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5"></td>
                  </tr>
                  
                  {expandedRows.contract && (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 pl-12 text-gray-500">合同公司</td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 pl-12 text-gray-500">合同类型</td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 pl-12 text-gray-500">当前合同开始日</td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 pl-12 text-gray-500">当前合同结束日</td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        </td>
                      </tr>
                    </>
                  )}

                  {/* Default Group */}
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleRow('default')}>
                        {expandedRows.default ? <ChevronDown size={16} className="text-gray-400 mr-2" /> : <ChevronRight size={16} className="text-gray-400 mr-2" />}
                        <span className="font-medium mr-2">默认分组</span>
                        <span className="px-1.5 py-0.5 text-[10px] bg-blue-50 text-blue-500 border border-blue-200 rounded">联动</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5"></td>
                  </tr>

                  {/* Reporting Relationship */}
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleRow('report')}>
                        {expandedRows.report ? <ChevronDown size={16} className="text-gray-400 mr-2" /> : <ChevronRight size={16} className="text-gray-400 mr-2" />}
                        <span className="font-medium">汇报关系</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5"></td>
                  </tr>

                  {/* Concurrent Info */}
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleRow('concurrent')}>
                        {expandedRows.concurrent ? <ChevronDown size={16} className="text-gray-400 mr-2" /> : <ChevronRight size={16} className="text-gray-400 mr-2" />}
                        <span className="font-medium">兼任信息</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5"></td>
                  </tr>

                  {/* Employee Info */}
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleRow('employee')}>
                        {expandedRows.employee ? <ChevronDown size={16} className="text-gray-400 mr-2" /> : <ChevronRight size={16} className="text-gray-400 mr-2" />}
                        <span className="font-medium">员工信息</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    </td>
                    <td className="px-4 py-2.5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-gray-100">
          <div className="flex space-x-6">
            <button 
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'rules' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('rules')}
            >
              规则设置
            </button>
            <button 
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'template' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('template')}
            >
              调动模版
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-[#F9FAFB]">
          {activeTab === 'rules' ? renderRulesTab() : renderTemplateTab()}
        </div>
      </div>
    </div>
  );
}
