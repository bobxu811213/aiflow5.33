import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Download, Trash2, Settings, RefreshCw, Printer, ChevronRight, ArrowUpDown } from 'lucide-react';
import { mockRegistrationForms, mockRegistrationFormsAudit } from './mock-data';

const RegistrationFormsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audit'); // Default to audit as per latest request
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const currentData = activeTab === 'audit' ? mockRegistrationFormsAudit : mockRegistrationForms;

  const toggleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map(emp => emp.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'passed':
        return (
          <span className="flex items-center text-green-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
            已通过
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
            已驳回
          </span>
        );
      case 'abandoned':
        return (
          <span className="flex items-center text-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
            已放弃
          </span>
        );
      case 'pending_confirm':
        return (
          <span className="flex items-center text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
            待确认
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex justify-between items-center">
        <div className="flex space-x-1">
          <button
            onClick={() => { setActiveTab('audit'); setSelectedRows([]); }}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'audit'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            入职登记表审核(6)
          </button>
          <button
            onClick={() => { setActiveTab('result'); setSelectedRows([]); }}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'result'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            审核结果(47)
          </button>
        </div>
        
        <div className="flex items-center space-x-2 py-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center">
            删除
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center">
            导出
          </button>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button className="bg-white text-gray-700 px-3 py-1.5 text-sm hover:bg-gray-50 border-r border-gray-300 flex items-center">
              <span className="mr-1">↓↑</span> (2)
            </button>
            <button className="bg-white text-gray-700 px-2 py-1.5 hover:bg-gray-50 border-r border-gray-300">
              <Filter size={16} />
            </button>
            <button className="bg-white text-gray-700 px-2 py-1.5 hover:bg-gray-50 border-r border-gray-300">
              <Settings size={16} />
            </button>
            <button className="bg-white text-gray-700 px-2 py-1.5 hover:bg-gray-50">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={selectedRows.length === currentData.length && currentData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                  姓名
                </th>
                {activeTab === 'audit' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                    流水号
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                  手机号码
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                  标签
                </th>
                {activeTab === 'audit' && (
                  <>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                      证件号码
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                      员工类型
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">
                        入职日期
                        <ArrowUpDown size={14} className="ml-1 text-teal-500" />
                      </div>
                    </th>
                  </>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    提交时间
                    <ArrowUpDown size={14} className="ml-1 text-teal-500" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                  审核状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">
                  来源
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.name}
                  </td>
                  {activeTab === 'audit' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.jobId}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Tags placeholder */}
                  </td>
                  {activeTab === 'audit' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.idNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.employeeType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.onboardingDate}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.submissionTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(row.approvalStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {activeTab === 'result' && (
                        <button className="text-teal-600 hover:text-teal-800" title="打印">
                          <Printer size={18} />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600" title="查看详情">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    &lt;
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-teal-600 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    &gt;
                  </button>
                </nav>
              </div>
              <div className="ml-4">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                  <option>10 条/页</option>
                  <option>20 条/页</option>
                  <option>50 条/页</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormsPage;
