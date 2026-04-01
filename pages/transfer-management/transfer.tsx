import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  AlertCircle,
  X
} from 'lucide-react';
import { mockPendingTransferEmployees, mockTransferRecords, mockAbandonedTransfers, mockEmployeeSelectionList } from './mock-data';
import { Employee } from './types';

import { TransferDetail } from './transfer-detail';

export default function Transfer({ onDetailViewToggle }: { onDetailViewToggle?: (isOpen: boolean) => void }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'records' | 'abandoned'>('pending');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [showBanner, setShowBanner] = useState(true);
  
  // Data states
  const [pendingTransferEmployees, setPendingTransferEmployees] = useState<Employee[]>(mockPendingTransferEmployees);
  const [transferRecords, setTransferRecords] = useState<Employee[]>(mockTransferRecords);

  // Modal states
  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);
  const [isSelectPersonnelModalOpen, setIsSelectPersonnelModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [personnelSearchTerm, setPersonnelSearchTerm] = useState('');
  const [tempSelectedPersonnelId, setTempSelectedPersonnelId] = useState<string | null>(null);

  // Transfer Detail states
  const [isTransferDetailOpen, setIsTransferDetailOpen] = useState(false);
  const [currentTransferEmployee, setCurrentTransferEmployee] = useState<Employee | null>(null);

  const getData = () => {
    switch (activeTab) {
      case 'pending': return pendingTransferEmployees;
      case 'records': return transferRecords;
      case 'abandoned': return mockAbandonedTransfers;
      default: return [];
    }
  };

  const data = getData();
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data.map(emp => emp.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pending_confirm': return 'text-orange-500';
      case 'confirmed': return 'text-green-500';
      case 'passed': return 'text-green-500';
      case 'abandoned': return 'text-gray-400';
      case 'not_started': return 'text-gray-400';
      case 'approving': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case 'pending_confirm': return '待确认';
      case 'confirmed': return '已确认';
      case 'passed': return '已通过'; // Or '已生效' depending on context
      case 'abandoned': return '已放弃'; // Or '已作废'
      case 'not_started': return '未发起';
      case 'approving': return '审批中';
      default: return status || '-';
    }
  };

  const getDotColor = (status: string | undefined) => {
    switch (status) {
      case 'pending_confirm': return 'bg-orange-400';
      case 'confirmed': return 'bg-green-400';
      case 'passed': return 'bg-green-400';
      case 'abandoned': return 'bg-gray-300';
      case 'not_started': return 'bg-gray-300';
      case 'approving': return 'bg-blue-400';
      default: return 'bg-gray-300';
    }
  };

  const handleInitiateTransfer = () => {
    if (selectedEmployee) {
      setCurrentTransferEmployee(selectedEmployee);
      setIsInitiateModalOpen(false);
      setIsTransferDetailOpen(true);
      onDetailViewToggle?.(true);
    } else {
      alert('请选择员工');
    }
  };

  const handleSaveTransferDetail = (formData: any) => {
    if (!currentTransferEmployee) return;

    const newRecord: Employee = {
      ...currentTransferEmployee,
      id: (Math.random() * 10000).toFixed(0),
      transferType: formData.transferType,
      transferStatus: 'pending_confirm',
      transferDate: formData.transferDate,
      newDepartment: formData.newDepartment,
      newPosition: formData.newPosition,
      archiveTime: '',
      source: 'HR发起',
    };

    setTransferRecords([newRecord, ...transferRecords]);
    setPendingTransferEmployees([newRecord, ...pendingTransferEmployees]); // Also add to pending tab?
    setIsTransferDetailOpen(false);
    setCurrentTransferEmployee(null);
    setSelectedEmployee(null);
    setActiveTab('pending'); // Switch to pending tab
    onDetailViewToggle?.(false);
  };

  if (isTransferDetailOpen && currentTransferEmployee) {
    return (
      <TransferDetail 
        employee={currentTransferEmployee}
        onCancel={() => {
          setIsTransferDetailOpen(false);
          onDetailViewToggle?.(false);
        }}
        onSave={handleSaveTransferDetail}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs and Actions */}
      <div className="flex justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex space-x-1 pt-2">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-[#15B8A6] text-[#15B8A6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('pending'); setSelectedRows([]); setCurrentPage(1); }}
          >
            待调动 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{mockPendingTransferEmployees.length}</span>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'records'
                ? 'border-[#15B8A6] text-[#15B8A6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('records'); setSelectedRows([]); setCurrentPage(1); }}
          >
            调动记录 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{mockTransferRecords.length}</span>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'abandoned'
                ? 'border-[#15B8A6] text-[#15B8A6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('abandoned'); setSelectedRows([]); setCurrentPage(1); }}
          >
            放弃调动 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{mockAbandonedTransfers.length}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 py-2">
          {activeTab === 'pending' && (
            <>
              <button 
                className="px-3 py-1.5 text-sm text-white bg-[#15B8A6] rounded hover:bg-[#0d9488]"
                onClick={() => setIsInitiateModalOpen(true)}
              >
                发起调动
              </button>
              <button className="px-3 py-1.5 text-sm text-[#15B8A6] bg-white border border-[#15B8A6] rounded hover:bg-teal-50">
                确认调动
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                取消确认调动
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                放弃调动
              </button>
            </>
          )}
          <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
            删除
          </button>
          {activeTab !== 'abandoned' && (
             <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
              导入
            </button>
          )}
          <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
            导出
          </button>
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Warning Banner for Pending Tab */}
      {activeTab === 'pending' && showBanner && (
        <div className="flex items-center justify-between px-4 py-2 bg-orange-50 border-b border-orange-100 text-orange-700 text-sm">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>提醒：已有{mockPendingTransferEmployees.length}名员工已到调动提醒日期，请尽快处理。</span>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-orange-400 hover:text-orange-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Table Area */}
      <div className="flex-1 overflow-auto bg-white p-4">
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left w-10 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#15B8A6] focus:ring-[#15B8A6]"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>姓名</span>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>工号</span>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>原部门</span>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>新部门</span>
                  </div>
                </th>
                {activeTab === 'records' && (
                  <>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <span>原职位</span>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <span>新职位</span>
                    </th>
                  </>
                )}
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>调动日期</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <span>调动类型</span>
                </th>
                {activeTab === 'pending' && (
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>调动审批</span>
                  </th>
                )}
                {activeTab === 'abandoned' && (
                   <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>调动审批</span>
                  </th>
                )}
                {activeTab === 'pending' && (
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>状态</span>
                  </th>
                )}
                {activeTab === 'records' && (
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>调动状态</span>
                  </th>
                )}
                 {activeTab === 'records' && (
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>数据来源</span>
                  </th>
                )}
                {activeTab === 'abandoned' && (
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <span>放弃原因</span>
                  </th>
                )}
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#15B8A6] focus:ring-[#15B8A6]"
                      checked={selectedRows.includes(employee.id)}
                      onChange={() => handleSelectRow(employee.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-gray-900 font-medium">{employee.name}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.jobId || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.originalDepartment || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.newDepartment || '-'}
                  </td>
                  {activeTab === 'records' && (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {employee.originalPosition || '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {employee.newPosition || '-'}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-orange-400">
                    {employee.transferDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.transferType}
                  </td>
                  {(activeTab === 'pending' || activeTab === 'abandoned') && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(employee.approvalStatus)}`}></span>
                        <span className="text-gray-600">{getStatusText(employee.approvalStatus)}</span>
                        {activeTab === 'pending' && (
                           <button className="text-[#15B8A6] hover:underline ml-2">
                             {employee.approvalStatus === 'not_started' ? '发起审批' : '查看'}
                           </button>
                        )}
                      </div>
                    </td>
                  )}
                  {(activeTab === 'pending' || activeTab === 'records') && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                       <div className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(employee.transferStatus || employee.confirmStatus)}`}></span>
                        <span className={getStatusColor(employee.transferStatus || employee.confirmStatus)}>
                          {getStatusText(employee.transferStatus || employee.confirmStatus)}
                        </span>
                        {activeTab === 'pending' && (
                          <button className="text-[#15B8A6] hover:underline ml-2">
                            确认调动
                          </button>
                        )}
                         {activeTab === 'records' && employee.transferStatus === 'passed' && (
                          <button className="text-[#15B8A6] hover:underline ml-2">
                            查看
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                  {activeTab === 'records' && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {employee.source || '导入'}
                    </td>
                  )}
                  {activeTab === 'abandoned' && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {employee.abandonReason || '-'}
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={activeTab === 'records' ? 12 : 10} className="px-4 py-8 text-center text-gray-500 text-sm">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        <div>
          {/* Empty left side */}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button 
              className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`w-8 h-8 text-sm rounded border ${
                  currentPage === page
                    ? 'bg-[#15B8A6] text-white border-[#15B8A6]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select 
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#15B8A6]"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 条/页</option>
              <option value={20}>20 条/页</option>
              <option value={50}>50 条/页</option>
            </select>
            
            <span className="text-sm text-gray-600">跳至</span>
            <input 
              type="text" 
              className="w-12 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#15B8A6]"
            />
            <span className="text-sm text-gray-600">页</span>
          </div>
        </div>
      </div>
      {/* Initiate Transfer Modal */}
      {isInitiateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">发起调动</h3>
              <button onClick={() => setIsInitiateModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-visible">
              <div className="flex items-center mb-4 relative">
                <label className="w-20 text-right mr-4 text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>员工：
                </label>
                <div className="relative flex-1">
                  <div 
                    className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white hover:border-teal-500"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className={selectedEmployee ? 'text-gray-900' : 'text-gray-400'}>
                      {selectedEmployee ? selectedEmployee.name : '请输入员工姓名或点击图标选择'}
                    </span>
                    <div 
                      className="flex items-center text-gray-400 hover:text-gray-600 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(false);
                        setIsSelectPersonnelModalOpen(true);
                        setTempSelectedPersonnelId(selectedEmployee?.id || null);
                      }}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </div>
                  </div>
                  
                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {mockEmployeeSelectionList.slice(0, 5).map(emp => (
                        <div 
                          key={emp.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between text-sm"
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setDropdownOpen(false);
                          }}
                        >
                          <span>{emp.name}</span>
                          <span className="text-gray-500">{emp.department}</span>
                        </div>
                      ))}
                      <div 
                        className="px-4 py-2 text-center text-[#15B8A6] hover:bg-gray-50 cursor-pointer border-t border-gray-100 text-sm"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsSelectPersonnelModalOpen(true);
                          setTempSelectedPersonnelId(selectedEmployee?.id || null);
                        }}
                      >
                        查看全部
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 space-x-3">
              <button 
                onClick={() => setIsInitiateModalOpen(false)}
                className="px-4 py-2 text-sm text-[#15B8A6] hover:text-[#0d9488]"
              >
                取消
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-[#15B8A6] rounded hover:bg-[#0d9488]"
                onClick={handleInitiateTransfer}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select Personnel Modal */}
      {isSelectPersonnelModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-[900px] h-[600px] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">选择人员</h3>
              <button onClick={() => setIsSelectPersonnelModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="输入关键字查询"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#15B8A6]"
                  value={personnelSearchTerm}
                  onChange={(e) => setPersonnelSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-[#15B8A6] text-white rounded hover:bg-[#0d9488]">
                  查询
                </button>
                <button className="text-[#15B8A6] text-sm hover:underline">
                  显示高级搜索
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      姓名
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      部门
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手机号码
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      工号
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手机号码
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockEmployeeSelectionList.map((emp) => (
                    <tr 
                      key={emp.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${tempSelectedPersonnelId === emp.id ? 'bg-teal-50' : ''}`}
                      onClick={() => setTempSelectedPersonnelId(emp.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.jobId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 space-x-3 bg-gray-50">
              <button 
                onClick={() => setIsSelectPersonnelModalOpen(false)}
                className="px-4 py-2 text-sm text-[#15B8A6] hover:text-[#0d9488]"
              >
                取消
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-[#15B8A6] rounded hover:bg-[#0d9488]"
                onClick={() => {
                  const selected = mockEmployeeSelectionList.find(e => e.id === tempSelectedPersonnelId);
                  if (selected) {
                    setSelectedEmployee(selected);
                  }
                  setIsSelectPersonnelModalOpen(false);
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
}
