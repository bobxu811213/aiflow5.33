import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Globe, HelpCircle } from 'lucide-react';
import { Employee } from './types';
import { mockPendingResignationEmployees, mockResignedEmployees, mockAbandonedResignationEmployees } from './mock-data';
import { ResignationDetail } from './resignation-detail';

interface ResignationProps {
  onDetailViewToggle?: (isDetail: boolean) => void;
}

const Resignation: React.FC<ResignationProps> = ({ onDetailViewToggle }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'resigned' | 'abandoned'>('pending');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailView, setIsDetailView] = useState(false);
  const itemsPerPage = 10;

  const getData = () => {
    switch (activeTab) {
      case 'pending':
        return mockPendingResignationEmployees;
      case 'resigned':
        return mockResignedEmployees;
      case 'abandoned':
        return mockAbandonedResignationEmployees;
      default:
        return [];
    }
  };

  const data = getData();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map(emp => emp.id));
    }
  };

  const handleInitiateResignation = () => {
    setIsDetailView(true);
    if (onDetailViewToggle) {
      onDetailViewToggle(true);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailView(false);
    if (onDetailViewToggle) {
      onDetailViewToggle(false);
    }
  };

  if (isDetailView) {
    return (
      <ResignationDetail 
        onCancel={handleCloseDetail} 
        onSave={(data) => {
          console.log('Saved resignation data:', data);
          handleCloseDetail();
        }} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
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
            待离职 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{mockPendingResignationEmployees.length}</span>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'resigned'
                ? 'border-[#15B8A6] text-[#15B8A6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('resigned'); setSelectedRows([]); setCurrentPage(1); }}
          >
            已离职
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'abandoned'
                ? 'border-[#15B8A6] text-[#15B8A6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('abandoned'); setSelectedRows([]); setCurrentPage(1); }}
          >
            放弃离职
          </button>
        </div>

        <div className="flex items-center space-x-2 py-2">
          {activeTab === 'pending' && (
            <button 
              className="px-3 py-1.5 text-sm text-white bg-[#15B8A6] rounded hover:bg-[#0d9488]"
              onClick={handleInitiateResignation}
            >
              办理员工离职
            </button>
          )}
          {activeTab === 'resigned' && (
            <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
              导出全部
            </button>
          )}
          {activeTab === 'abandoned' && (
             <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
              导出全部
            </button>
          )}

           {activeTab === 'pending' && (
            <>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                导入
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                导出全部
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center">
                更多 <ChevronRight className="w-4 h-4 ml-1 rotate-90" />
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                离职交接(5)
                </button>
            </>
          )}
          
          {activeTab === 'resigned' && (
             <>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                加入黑名单
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                批量开具证明
                </button>
             </>
          )}

          {activeTab === 'pending' && (
             <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
              离职审批(8)
            </button>
          )}
          
          {activeTab === 'abandoned' && (
             <button className="px-3 py-1.5 text-sm text-[#15B8A6] bg-white border border-[#15B8A6] rounded hover:bg-teal-50">
              变更记录
            </button>
          )}
           {activeTab === 'resigned' && (
             <button className="px-3 py-1.5 text-sm text-[#15B8A6] bg-white border border-[#15B8A6] rounded hover:bg-teal-50">
              变更记录
            </button>
          )}

        </div>
      </div>

      {activeTab === 'pending' && (
        <div className="bg-orange-50 border border-orange-100 text-orange-800 px-4 py-2 text-sm flex items-center">
          <span className="mr-2">!</span>
          1. 提醒：有 <span className="font-bold mx-1">{mockPendingResignationEmployees.length}</span> 名员工已到离职日期，请尽快处理（已确认离职的员工将在离职日期次日变更为已离职状态）
          <button className="ml-auto text-orange-400 hover:text-orange-600">×</button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex items-center space-x-4 px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto">
        {/* Common filters */}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#15B8A6] focus:ring-[#15B8A6]"
                    checked={selectedRows.length === currentData.length && currentData.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  姓名
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  工号
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  部门
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  职位
                </th>
                {activeTab === 'resigned' && (
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    员工类型
                    </th>
                )}
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  手机号
                </th>
                {activeTab === 'resigned' && (
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    证件号
                    </th>
                )}
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  入职日期
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  离职日期
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  最后工作日期
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  计薪截止日期
                </th>
                {activeTab !== 'resigned' && (
                    <>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    离职原因
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    离职首要原因
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    原因说明
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    离职类型
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    操作
                    </th>
                    </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#15B8A6] focus:ring-[#15B8A6]"
                      checked={selectedRows.includes(employee.id)}
                      onChange={() => toggleRow(employee.id)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#15B8A6]">{employee.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.jobId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                   {activeTab === 'resigned' && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.employeeType}
                    </td>
                   )}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.phone}
                  </td>
                  {activeTab === 'resigned' && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.idNumber}
                    </td>
                   )}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.onboardingDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.resignationDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.lastWorkingDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.planStopDate}
                  </td>
                  {activeTab !== 'resigned' && (
                    <>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.resignationReason}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.primaryResignationReason}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.resignationDescription}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.resignationType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activeTab === 'pending' ? (
                             <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        ) : (
                            <button className="text-[#15B8A6] hover:text-[#0d9488]">
                                查看
                            </button>
                        )}
                    </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
            {activeTab === 'pending' && (
                <button className="px-3 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                    批量删除
                </button>
            )}
             <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                导出选中
            </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">总共{data.length}条</span>
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 text-sm rounded border ${
                currentPage === i + 1
                  ? 'bg-[#15B8A6] text-white border-[#15B8A6]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <select className="text-sm border-gray-300 rounded ml-2">
            <option>10 条/页</option>
            <option>20 条/页</option>
            <option>50 条/页</option>
          </select>
          <span className="text-sm text-gray-500 ml-2">跳至</span>
          <input type="text" className="w-12 h-8 border-gray-300 rounded text-center text-sm" />
          <span className="text-sm text-gray-500">页</span>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
        <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <Globe className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-full shadow-lg relative">
            <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                 <img src="https://picsum.photos/seed/avatar/200/200" alt="Avatar" />
            </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
      </div>
    </div>
  );
};

export default Resignation;
