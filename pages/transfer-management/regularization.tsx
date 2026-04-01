import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  HelpCircle,
  Globe
} from 'lucide-react';
import { mockPendingRegularizationEmployees, mockRegularizedEmployees } from './mock-data';
import { Employee } from './types';

export default function Regularization() {
  const [activeTab, setActiveTab] = useState<'pending' | 'regularized'>('regularized');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const data = activeTab === 'pending' ? mockPendingRegularizationEmployees : mockRegularizedEmployees;
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

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 bg-white px-4 pt-2">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-[#15B8A6] text-[#15B8A6]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          待转正 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{mockPendingRegularizationEmployees.length}</span>
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'regularized'
              ? 'border-[#15B8A6] text-[#15B8A6]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('regularized')}
        >
          已转正
        </button>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
            导出全部
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto bg-white p-4">
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left whitespace-nowrap">
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
                    <Filter className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>工号</span>
                    <div className="flex space-x-0.5">
                      <ArrowUpDown className="w-3 h-3" />
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>部门</span>
                    <Search className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>职位</span>
                    <Search className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>员工类型</span>
                    <div className="flex space-x-0.5">
                      <ArrowUpDown className="w-3 h-3" />
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>手机号</span>
                    <div className="flex space-x-0.5">
                      <ArrowUpDown className="w-3 h-3" />
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>证件号</span>
                    <Search className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>入职日期</span>
                    <div className="flex space-x-0.5">
                      <ArrowUpDown className="w-3 h-3" />
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>{activeTab === 'pending' ? '计划转正日期' : '转正日期'}</span>
                    <div className="flex space-x-0.5">
                      <ArrowUpDown className="w-3 h-3" />
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  操作
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
                    <a href="#" className="text-[#15B8A6] hover:underline text-sm font-medium">
                      {employee.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.jobId || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.position || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.employeeType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.idNumber || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {employee.onboardingDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {activeTab === 'pending' ? employee.probationEndDate : employee.actualRegularizationDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-500 text-sm">
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
          <button 
            className={`px-3 py-1.5 text-sm border rounded ${
              selectedRows.length > 0 
                ? 'text-gray-600 border-gray-300 hover:bg-gray-50' 
                : 'text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            disabled={selectedRows.length === 0}
          >
            导出选中
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">总共 {totalItems} 条</span>
          
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

      {/* Floating Action Buttons (Optional, based on screenshot) */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
        {/* These are just visual placeholders based on the screenshot */}
        {/* <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <Globe className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <HelpCircle className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
}
