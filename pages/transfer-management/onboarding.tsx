import React, { useState } from 'react';
import { 
  Filter, 
  Settings, 
  RefreshCw, 
  ChevronRight, 
  ArrowUpDown,
  XCircle
} from 'lucide-react';
import { Employee } from './types';
import { 
  mockPendingEmployees, 
  mockOnboardedEmployees, 
  mockAbandonedEmployees 
} from './mock-data';
import { CreatePendingEmployeeModal } from '../../components/transfer/create-pending-employee-modal';
import { OnboardingRegistrationList } from '../../components/transfer/onboarding-registration-list';
import { AiAssistantModal } from '../../components/org/ai-assistant-modal';
import { FloatingToolbar } from '../../components/common/floating-toolbar';
import { useAppStore } from '../../store/use-app-store';

const OnboardingTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'onboarded' | 'abandoned'>('pending');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRegistrationListOpen, setIsRegistrationListOpen] = useState(false);
  const [pendingEmployees, setPendingEmployees] = useState<Employee[]>(mockPendingEmployees);

  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    setAiContext,
    selectedOnboardingEmployees,
    setSelectedOnboardingEmployees
  } = useAppStore();

  const handleAiChatOpen = () => {
    setAiContext('ONBOARDING');
    setAiMode('bar');
    setAiSidebarOpen(true);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>, data: Employee[]) => {
    if (e.target.checked) {
      setSelectedOnboardingEmployees(data);
    } else {
      setSelectedOnboardingEmployees([]);
    }
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, row: Employee) => {
    if (e.target.checked) {
      setSelectedOnboardingEmployees([...selectedOnboardingEmployees, row]);
    } else {
      setSelectedOnboardingEmployees(selectedOnboardingEmployees.filter(emp => emp.id !== row.id));
    }
  };

  const handleAiBatchApply = (data: any[]) => {
      // Handle batch apply from AI assistant if needed
      if (data && data.length > 0 && data[0].type === 'ONBOARDING_APPROVAL') {
          const approvedIds = data.map(d => d.id);
          setPendingEmployees(prev => prev.map(emp => {
              if (approvedIds.includes(emp.id)) {
                  return { ...emp, approvalStatus: 'approving' };
              }
              return emp;
          }));
          setSelectedOnboardingEmployees([]);
      }
  };

  const renderStatusBadge = (status: string, type: 'registration' | 'approval' | 'confirm') => {
    switch (type) {
      case 'registration':
        if (status === 'pending_submit') return <span className="flex items-center text-yellow-500"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></div>待提交 <span className="text-teal-500 ml-2 cursor-pointer">发送邀请</span></span>;
        if (status === 'abandoned') return <span className="flex items-center text-red-500"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></div>已放弃</span>;
        if (status === 'passed') return <span className="flex items-center text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>已通过 <span className="text-teal-500 ml-2 cursor-pointer">查看</span></span>;
        if (status === 'not_sent') return <span className="flex items-center text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></div>未发送 <span className="text-teal-500 ml-2 cursor-pointer">发送邀请</span></span>;
        return status;
      case 'approval':
        if (status === 'not_started') return <span className="flex items-center text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></div>未发起 <span className="text-teal-500 ml-2 cursor-pointer">发起入职审批</span></span>;
        if (status === 'passed') return <span className="flex items-center text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>已通过 <span className="text-teal-500 ml-2 cursor-pointer">查看</span></span>;
        if (status === 'approving') return <span className="flex items-center text-yellow-500"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></div>审批中 <span className="text-teal-500 ml-2 cursor-pointer">查看</span></span>;
        return status;
      case 'confirm':
        if (status === 'pending_confirm') return <span className="flex items-center text-yellow-500"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></div>待确认 <span className="text-teal-500 ml-2 cursor-pointer">确认入职</span></span>;
        return status;
      default:
        return status;
    }
  };

  const renderTable = () => {
    let data: Employee[] = [];
    let columns: { header: string; accessor: keyof Employee | 'actions' | 'selection'; width?: string }[] = [];

    if (activeSubTab === 'pending') {
      data = pendingEmployees;
      columns = [
        { header: '', accessor: 'selection', width: 'w-10' },
        { header: '姓名', accessor: 'name' },
        { header: '部门', accessor: 'department' },
        { header: '试用期到期日', accessor: 'probationEndDate' },
        { header: '职位', accessor: 'position' },
        { header: '标签', accessor: 'tags' },
        { header: '员工类型', accessor: 'employeeType' },
        { header: '入职日期', accessor: 'onboardingDate' },
        { header: '手机号码', accessor: 'phone' },
        { header: '个人邮箱', accessor: 'email' },
        { header: '证件号码', accessor: 'idNumber' },
        { header: '入职登记表状态', accessor: 'registrationStatus' },
        { header: '入职登记表名称', accessor: 'registrationName' },
        { header: '入职审批', accessor: 'approvalStatus' },
        { header: '确认状态', accessor: 'confirmStatus' },
        { header: '数据来源', accessor: 'source' },
        { header: '合同公司', accessor: 'contractCompany' },
        { header: '', accessor: 'actions', width: 'w-10' },
      ];
    } else if (activeSubTab === 'onboarded') {
      data = mockOnboardedEmployees;
      columns = [
        { header: '', accessor: 'selection', width: 'w-10' },
        { header: '姓名', accessor: 'name' },
        { header: '手机号码', accessor: 'phone' },
        { header: '标签', accessor: 'tags' },
        { header: '工号', accessor: 'jobId' },
        { header: '入职日期', accessor: 'onboardingDate' },
        { header: '部门', accessor: 'department' },
        { header: '职位', accessor: 'position' },
        { header: '个人邮箱', accessor: 'email' },
        { header: '归档时间', accessor: 'archiveTime' },
        { header: '', accessor: 'actions', width: 'w-10' },
      ];
    } else {
      data = mockAbandonedEmployees;
      columns = [
        { header: '', accessor: 'selection', width: 'w-10' },
        { header: '姓名', accessor: 'name' },
        { header: '标签', accessor: 'tags' },
        { header: '手机号码', accessor: 'phone' },
        { header: '入职日期', accessor: 'onboardingDate' },
        { header: '部门', accessor: 'department' },
        { header: '职位', accessor: 'position' },
        { header: '个人邮箱', accessor: 'email' },
        { header: '放弃时间', accessor: 'abandonTime' },
        { header: '放弃原因', accessor: 'abandonReason' },
        { header: '说明', accessor: 'description' },
        { header: '', accessor: 'actions', width: 'w-10' },
      ];
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${col.width || ''}`}
                >
                  {col.accessor === 'selection' ? (
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                      checked={data.length > 0 && selectedOnboardingEmployees.length === data.length}
                      onChange={(e) => handleSelectAll(e, data)}
                    />
                  ) : col.header === '入职日期' ? (
                    <div className="flex items-center cursor-pointer hover:text-gray-700">
                      {col.header}
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIdx) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {col.accessor === 'selection' ? (
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        checked={selectedOnboardingEmployees.some(emp => emp.id === row.id)}
                        onChange={(e) => handleSelectRow(e, row)}
                      />
                    ) : col.accessor === 'actions' ? (
                      <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" />
                    ) : col.accessor === 'tags' ? (
                      <div className="flex gap-1">
                        {row.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : col.accessor === 'registrationStatus' ? (
                      renderStatusBadge(row.registrationStatus || '', 'registration')
                    ) : col.accessor === 'approvalStatus' ? (
                      renderStatusBadge(row.approvalStatus || '', 'approval')
                    ) : col.accessor === 'confirmStatus' ? (
                      renderStatusBadge(row.confirmStatus || '', 'confirm')
                    ) : col.accessor === 'onboardingDate' ? (
                      <span className="text-orange-500">{row.onboardingDate}</span>
                    ) : (
                      // @ts-ignore
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col">
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        {/* Sub Tabs and Actions */}
        <div className="border-b border-gray-200 px-4 flex items-center justify-between bg-white">
          <nav className="-mb-px flex space-x-6 flex-shrink-0">
            <button
              onClick={() => setActiveSubTab('pending')}
              className={`${
                activeSubTab === 'pending'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              待入职(47)
            </button>
            <button
              onClick={() => setActiveSubTab('onboarded')}
              className={`${
                activeSubTab === 'onboarded'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              已入职(299)
            </button>
            <button
              onClick={() => setActiveSubTab('abandoned')}
              className={`${
                activeSubTab === 'abandoned'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              已放弃(8)
            </button>
          </nav>

          <div className="flex items-center space-x-2 py-2 overflow-x-auto no-scrollbar ml-4">
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {activeSubTab === 'pending' ? (
                  <>
                    <button 
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-[#15B8A6] text-white px-3 py-1.5 rounded text-sm hover:bg-teal-600 whitespace-nowrap"
                    >
                      创建
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">确认入职</button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">取消确认</button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">放弃入职</button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">发送入职登记表</button>
                    <button 
                      onClick={() => setIsRegistrationListOpen(true)}
                      className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap"
                    >
                      入职登记表
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">变更入职日期</button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">删除</button>
                  </>
                ) : (
                  <>
                      {/* Actions for Onboarded/Abandoned if any */}
                  </>
                )}
              </div>

              {/* Tools */}
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 ml-2">
                {activeSubTab === 'pending' && (
                    <button className="bg-white border border-gray-300 text-teal-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">导入</button>
                )}
                <button className="bg-white border border-gray-300 text-teal-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">导出</button>
                <div className="flex items-center border border-gray-300 rounded bg-white">
                  <button className="px-2 py-1.5 border-r border-gray-300 hover:bg-gray-50"><ArrowUpDown className="h-4 w-4 text-gray-500" /></button>
                  <button className="px-2 py-1.5 border-r border-gray-300 hover:bg-gray-50"><Filter className="h-4 w-4 text-gray-500" /></button>
                  <button className="px-2 py-1.5 border-r border-gray-300 hover:bg-gray-50"><Settings className="h-4 w-4 text-gray-500" /></button>
                  <button className="px-2 py-1.5 hover:bg-gray-50"><RefreshCw className="h-4 w-4 text-gray-500" /></button>
                </div>
              </div>
          </div>
        </div>

        {/* Warning Banner */}
        {activeSubTab === 'pending' && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 flex items-center justify-between mx-4 mt-4">
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">⚠️</span>
              <p className="text-sm text-orange-700">
                提醒：有47名员工已到入职日期，请尽快处理
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto p-4">
          {renderTable()}
        </div>
        
        {/* Footer / Pagination */}
        <div className="border-t border-gray-200 p-3 flex items-center justify-between bg-white">
            <div className="text-sm text-gray-500">
              共 {activeSubTab === 'pending' ? 47 : activeSubTab === 'onboarded' ? 299 : 8} 条
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border border-gray-300 rounded text-sm disabled:opacity-50" disabled>上一页</button>
              <span className="text-sm text-gray-700">1 / 5</span>
              <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">下一页</button>
            </div>
        </div>
      </div>
      
      <CreatePendingEmployeeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {isRegistrationListOpen && (
        <OnboardingRegistrationList 
          onClose={() => setIsRegistrationListOpen(false)} 
        />
      )}

      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

      <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}}
          onSuccess={() => {}}
          onBatchApply={handleAiBatchApply}
      />
    </div>
  );
};

export default OnboardingTab;
