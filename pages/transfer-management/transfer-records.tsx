import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Download, 
  ArrowUpDown, 
  Filter, 
  Settings, 
  Maximize2, 
  HelpCircle, 
  Inbox,
  ChevronDown
} from 'lucide-react';
import { DatePicker } from '../../components/ui/date-picker';
import { mockTransferRecords } from './mock-data';
import { Employee } from './types';

const TransferRecordsTab: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-03-31');

  // Filter records based on date range
  const filteredRecords = useMemo(() => {
    return mockTransferRecords.filter(record => {
      if (!record.transferDate) return false;
      return record.transferDate >= startDate && record.transferDate <= endDate;
    });
  }, [startDate, endDate]);

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col h-full bg-secondary">
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col border border-gray-200">
        {/* Header & Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-800">异动记录</h2>
          
          <div className="flex items-center space-x-3">
            {/* Date Range Picker */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 bg-white hover:border-primary transition-colors w-[280px]">
              <div className="flex-1">
                 <DatePicker 
                   value={startDate} 
                   onChange={setStartDate} 
                   inputClassName="border-none p-0 h-auto text-center w-full focus:border-none focus:ring-0 shadow-none text-gray-600"
                   showIcon={false}
                   className="w-full"
                 />
              </div>
              <span className="text-gray-400 mx-2">→</span>
              <div className="flex-1">
                <DatePicker 
                  value={endDate} 
                  onChange={setEndDate} 
                  inputClassName="border-none p-0 h-auto text-center w-full focus:border-none focus:ring-0 shadow-none text-gray-600"
                  showIcon={false}
                  className="w-full"
                />
              </div>
              <Calendar size={16} className="text-gray-400 ml-2" />
            </div>

            {/* Export Button */}
            <button className="flex items-center px-3 py-1.5 border border-primary text-primary rounded hover:bg-primary-light transition-colors text-sm">
              <span>导出</span>
            </button>

            {/* Sort Button */}
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-300 flex items-center space-x-1">
              <ArrowUpDown size={16} />
              <span className="text-xs">(2)</span>
            </button>

            {/* Filter Button */}
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-300">
              <Filter size={16} />
            </button>

            {/* Settings Button */}
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-300">
              <Settings size={16} />
            </button>

            {/* Fullscreen Button */}
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-gray-300">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto relative">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">姓名</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">工号</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">手机号码</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">部门</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">职位</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">异动类型</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-100 group">
                  <div className="flex items-center space-x-1">
                    <span>异动日期</span>
                    <ChevronDown size={14} className="text-primary" />
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span>归档时间</span>
                    <HelpCircle size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">异动详情</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span>操作人</span>
                    <HelpCircle size={14} className="text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-800">{record.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.jobId || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.transferType}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.transferDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.archiveTime || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.source || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">管理员</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="h-[400px] text-center border-none">
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox size={48} strokeWidth={1} className="text-gray-300" />
                      </div>
                      <p className="text-sm">没有可用的内容</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Scrollbar placeholder */}
        <div className="h-2 bg-gray-100 w-full rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default TransferRecordsTab;
