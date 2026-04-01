import React, { useState } from 'react';
import { 
  Filter, 
  Settings, 
  ArrowUpDown,
  Maximize2,
  Printer,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface RegistrationRecord {
  id: string;
  name: string;
  serialNumber: string;
  phone: string;
  tags: string[];
  idNumber?: string;
  employeeType?: string;
  onboardingDate?: string;
  submitTime: string;
  status: 'pending' | 'passed' | 'rejected' | 'abandoned';
  source: string;
}

const mockPendingRecords: RegistrationRecord[] = [
  { id: '2255', name: '2255', serialNumber: 'RZDJ10', phone: '2154445', tags: [], idNumber: '5524788', employeeType: '全职', onboardingDate: '2026-01-05', submitTime: '2026-01-05 16:06:40', status: 'pending', source: 'HR提交' },
  { id: 'email', name: '许入职邮件', serialNumber: 'RZDJ09', phone: '13566664444', tags: [], idNumber: '664433799', employeeType: '全职', onboardingDate: '2025-03-31', submitTime: '2025-03-31 15:28:09', status: 'pending', source: 'HR提交' },
  { id: '2225', name: '2225', serialNumber: 'RZDJ07', phone: '1255', tags: [], idNumber: '1228877', employeeType: '全职', onboardingDate: '2023-09-20', submitTime: '2024-09-20 18:29:08', status: 'pending', source: 'HR提交' },
  { id: '11', name: '11', serialNumber: 'RZDJ06', phone: '25588', tags: [], idNumber: '2558', employeeType: '全职', onboardingDate: '2023-09-02', submitTime: '2024-09-02 14:23:31', status: 'pending', source: 'HR提交' },
  { id: '22', name: '22', serialNumber: 'RZDJ02', phone: '1225888', tags: [], idNumber: '2258998', employeeType: '全职', onboardingDate: '2023-08-13', submitTime: '2024-08-13 15:35:27', status: 'pending', source: 'HR提交' },
  { id: '225', name: '225', serialNumber: '', phone: '1225758', tags: [], idNumber: '254', employeeType: '全职', onboardingDate: '2022-07-22', submitTime: '2024-07-22 18:30:22', status: 'pending', source: 'HR提交' },
];

const mockResultRecords: RegistrationRecord[] = [
  { id: '22', name: '22', serialNumber: '', phone: '125808', tags: [], submitTime: '2024-10-22 15:41:40', status: 'passed', source: 'HR提交' },
  { id: '22', name: '22', serialNumber: '', phone: '46988', tags: [], submitTime: '2024-08-26 13:55:47', status: 'passed', source: 'HR提交' },
  { id: '11', name: '11', serialNumber: '', phone: '144', tags: [], submitTime: '2024-08-23 10:32:04', status: 'passed', source: 'HR提交' },
  { id: '2255', name: '2255', serialNumber: '', phone: '15588855', tags: [], submitTime: '2024-08-23 10:29:32', status: 'rejected', source: 'HR提交' },
  { id: 'Ayumi', name: 'Ayumi测试入职登记表', serialNumber: '', phone: '22885', tags: [], submitTime: '2024-08-02 17:24:51', status: 'passed', source: 'HR提交' },
  { id: 'ayumi', name: 'ayumi测试', serialNumber: '', phone: '17855479360', tags: [], submitTime: '', status: 'abandoned', source: 'HR邀请' },
  { id: 'test', name: '测试复职', serialNumber: '', phone: '123588666', tags: [], submitTime: '2024-07-08 14:36:35', status: 'rejected', source: 'HR提交' },
  { id: '222', name: '222', serialNumber: '', phone: '222', tags: [], submitTime: '2024-06-19 15:10:35', status: 'passed', source: 'HR提交' },
  { id: 'AYUMI', name: 'AYUMI', serialNumber: '', phone: '17364328940', tags: [], submitTime: '2024-06-09 22:04:18', status: 'passed', source: '员工扫码(谢雨蓉A)' },
  { id: '146999', name: '146999', serialNumber: '', phone: '25555', tags: [], submitTime: '2024-07-15 10:23:47', status: 'passed', source: 'HR提交' },
];

interface OnboardingRegistrationListProps {
  onClose: () => void;
}

export const OnboardingRegistrationList: React.FC<OnboardingRegistrationListProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'result'>('pending');

  const renderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center text-orange-400"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></div>待确认</span>;
      case 'passed':
        return <span className="flex items-center text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>已通过</span>;
      case 'rejected':
        return <span className="flex items-center text-orange-400"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></div>已驳回</span>;
      case 'abandoned':
        return <span className="flex items-center text-red-500"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>已放弃</span>;
      default:
        return status;
    }
  };

  const renderTable = () => {
    if (activeTab === 'pending') {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left w-10"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">流水号</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号码</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">证件号码</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">员工类型</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 flex items-center">
                入职日期 <ChevronDown size={14} className="ml-1" />
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 flex items-center">
                提交时间 <ChevronDown size={14} className="ml-1" />
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">审核状态</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">来源</th>
              <th scope="col" className="px-4 py-3 text-left w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPendingRecords.map((record, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.serialNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-500"></td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.idNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.employeeType}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.onboardingDate}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.submitTime}</td>
                <td className="px-4 py-3 text-sm">{renderStatus(record.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.source}</td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left w-10"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号码</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 flex items-center">
                提交时间 <ChevronDown size={14} className="ml-1" />
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">审核状态</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">来源</th>
              <th scope="col" className="px-4 py-3 text-left w-20"></th>
              <th scope="col" className="px-4 py-3 text-left w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockResultRecords.map((record, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-500"></td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.submitTime}</td>
                <td className="px-4 py-3 text-sm">{renderStatus(record.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{record.source}</td>
                <td className="px-4 py-3 text-right">
                  <Printer className="h-4 w-4 text-teal-500 cursor-pointer hover:text-teal-600" />
                </td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-[#15B8A6] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            入职登记表审核(6)
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'result'
                ? 'bg-[#15B8A6] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            审核结果(47)
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {activeTab === 'pending' ? (
            <>
              <button className="px-3 py-1.5 border border-gray-300 text-teal-600 rounded text-sm hover:bg-gray-50">删除</button>
              <button className="px-3 py-1.5 border border-gray-300 text-teal-600 rounded text-sm hover:bg-gray-50">导出</button>
              <button className="px-3 py-1.5 border border-gray-300 text-teal-600 rounded text-sm hover:bg-gray-50 flex items-center">
                <ArrowUpDown size={14} className="mr-1" /> (2)
              </button>
              <button className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Settings size={16} />
              </button>
              <button onClick={onClose} className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Maximize2 size={16} className="rotate-45" />
              </button>
            </>
          ) : (
            <>
              <button className="px-3 py-1.5 border border-gray-300 text-teal-600 rounded text-sm hover:bg-gray-50">导出</button>
              <button className="px-3 py-1.5 border border-gray-300 text-teal-600 rounded text-sm hover:bg-gray-50 flex items-center">
                <ArrowUpDown size={14} className="mr-1" /> (2)
              </button>
              <button className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Settings size={16} />
              </button>
              <button onClick={onClose} className="p-1.5 border border-gray-300 text-teal-600 rounded hover:bg-gray-50">
                <Maximize2 size={16} className="rotate-45" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow">
          {renderTable()}
        </div>
      </div>
    </div>
  );
};
