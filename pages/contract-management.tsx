import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  RefreshCw, 
  ArrowUpDown, 
  ChevronDown,
  Globe,
  HelpCircle,
  Filter,
  Settings,
  Maximize2,
  ChevronRight,
  AlertCircle,
  Trash2
} from 'lucide-react';

// Mock data type definition
interface Employee {
  id: number;
  name: string;
  phone: string;
  dept: string;
  empId: string;
  position: string;
  enrollDate: string;
  idNumber?: string;
  status: 'active' | 'resigned';
  
  // Contract
  contractNo?: string;
  contractCompany?: string;
  contractType?: string; // Labor, Service, Internship
  termType?: string; // Fixed, Open-ended
  contractStart?: string;
  contractEnd?: string;
  signDate?: string;
  terminateDate?: string;
  signedTimes?: number;
  renewStatus?: string; // Not Started, In Progress
  esignStatus?: string; // Not Started, Completed
  contractStatus?: string; // Active, Expired
}

interface AgreementRecord {
  id: number;
  name: string;
  empId: string;
  enrollDate: string;
  dept: string;
  idNumber: string;
  agreementNo: string;
  agreementCompany: string;
  esignStatus: string;
  agreementType: string;
  startDate: string;
  endDate: string;
  terminateDate?: string;
  status?: string;
  remark?: string;
}

const ContractManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contract'); // 'contract', 'agreement'
  const [statusFilter, setStatusFilter] = useState('active'); // 'all', 'active', 'resigned'

  const tabs = [
    { id: 'contract', label: '合同记录' },
    { id: 'agreement', label: '协议记录' },
  ];

  // Mock Data
  const employees: Employee[] = [
    // Contract Data
    { id: 201, name: 'ayumi测试新', phone: '13800138000', empId: 'A******2024...', enrollDate: '2024-07-03', dept: '一级部门名字1', idNumber: '1234567', position: '全职', contractCompany: '徐波公司', contractType: '劳务合同', contractStart: '2024-07-03', contractEnd: '2024-08-24', signedTimes: 2, renewStatus: '未发起', esignStatus: '未发起', contractStatus: '已生效', status: 'active' },
    { id: 202, name: '李佳佳', phone: '13800138001', empId: '34665', enrollDate: '2023-08-01', dept: '四级部门名字', idNumber: '121212', position: '退休返聘', contractNo: '好好123333...', contractCompany: '111公司', contractType: '劳动合同', termType: '固定期限', contractStart: '2024-07-11', contractEnd: '2025-01-10', signedTimes: 3, renewStatus: '审批中(查看)', esignStatus: '未发起', contractStatus: '已生效', status: 'active' },
    { id: 203, name: 'ayumi测试合...', phone: '13800138002', empId: '44444', enrollDate: '2024-01-04', dept: '一级部门名字1', idNumber: '1111111', position: '临时工', contractNo: '111', contractCompany: '许波波测试公司', contractType: '劳务合同', contractStart: '2024-03-24', contractEnd: '2025-03-29', signedTimes: 4, renewStatus: '未发起', esignStatus: '未发起', contractStatus: '已生效', status: 'active' },
    { id: 204, name: '花名册新增员', phone: '13800138003', empId: 'AYU99', enrollDate: '2024-03-25', dept: '工号方案测试部门11', idNumber: '22424', position: '全职', contractCompany: '公司111', contractType: '劳动合同', termType: '固定期限', contractStart: '2024-05-06', contractEnd: '2025-05-05', signedTimes: 1, renewStatus: '未发起', esignStatus: '未发起', contractStatus: '已生效', status: 'active' },
    { id: 205, name: '徐波波', phone: '13800138004', empId: '212132132...', enrollDate: '2025-12-02', dept: '许波波测试公司', idNumber: '123123213213', position: '兼职', contractCompany: '这是公司', contractType: '劳动合同', contractStart: '2024-08-22', contractEnd: '2025-08-31', signedTimes: 3, renewStatus: '未发起', esignStatus: '未发起', contractStatus: '已生效', status: 'active' },
  ];

  const agreementRecords: AgreementRecord[] = [
    { id: 1, name: '0802-ayumi...', empId: '2141253223', enrollDate: '2022-09-10', dept: '许波波测试公司', idNumber: '2432500099', agreementNo: '', agreementCompany: '许波波测试公司', esignStatus: '未发起', agreementType: '我的协议', startDate: '2024-12-01', endDate: '2024-12-...', status: '已签订' },
    { id: 2, name: 'AAA', empId: 'GH99', enrollDate: '2024-03-21', dept: '许波波测试公司/研...', idNumber: '11', agreementNo: '', agreementCompany: '主播公司', esignStatus: '未发起', agreementType: '竞业协议', startDate: '2024-05-02', endDate: '2024-05-...', status: '已签订' },
    { id: 3, name: 'AAA', empId: 'GH99', enrollDate: '2024-03-21', dept: '许波波测试公司/研...', idNumber: '11', agreementNo: '', agreementCompany: '主播公司', esignStatus: '未发起', agreementType: '竞业协议', startDate: '2024-05-02', endDate: '2024-05-...', status: '已签订' },
    { id: 4, name: '姓名123', empId: 'AYUMI00004', enrollDate: '2024-04-03', dept: '许波波测试公司/研...', idNumber: '2', agreementNo: '', agreementCompany: '主播公司22', esignStatus: '未发起', agreementType: '竞业协议', startDate: '2024-05-07', endDate: '', status: '已签订' },
    { id: 5, name: '姓名123', empId: 'AYUMI00004', enrollDate: '2024-04-03', dept: '许波波测试公司/研...', idNumber: '2', agreementNo: '', agreementCompany: '主播公司22', esignStatus: '未发起', agreementType: '竞业协议', startDate: '2024-05-07', endDate: '', status: '已签订' },
    { id: 6, name: 'Ayumi', empId: '2342', enrollDate: '2024-05-15', dept: '许波波测试公司/研...', idNumber: '1111', agreementNo: '', agreementCompany: '公司111', esignStatus: '未发起', agreementType: '竞业协议', startDate: '2024-05-01', endDate: '2024-05-...', status: '已签订' },
    { id: 7, name: '蒋入职', empId: '31231231', enrollDate: '2023-12-28', dept: '许波波测试公司/人...', idNumber: '3101051981121', agreementNo: '123', agreementCompany: '李佳佳', esignStatus: '未发起', agreementType: '保密协议', startDate: '2024-01-11', endDate: '2024-05-...', terminateDate: '2024-05-15', status: '已终止' },
    { id: 8, name: '11', empId: '', enrollDate: '2022-11-25', dept: '回收站/一级部门名...', idNumber: '11112558', agreementNo: '', agreementCompany: '公司111', esignStatus: '未发起', agreementType: '保密协议', startDate: '2024-05-21', endDate: '2024-06-...', terminateDate: '2024-05-29', status: '已终止', remark: '12312' },
    { id: 9, name: '11', empId: '', enrollDate: '2022-11-25', dept: '回收站/一级部门名...', idNumber: '11112558', agreementNo: '', agreementCompany: '公司111', esignStatus: '未发起', agreementType: '保密协议', startDate: '2024-05-21', endDate: '2024-06-...', terminateDate: '2024-06-29', status: '已终止' },
  ];

  // Helper to render status badge
  const renderStatus = (status: string) => {
    const isResigned = status === 'resigned';
    return (
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${isResigned ? 'bg-gray-400' : 'bg-[#52C41A]'}`} />
        <span className={isResigned ? 'text-gray-500' : 'text-gray-900'}>
          {isResigned ? '离职' : '在职'}
        </span>
      </div>
    );
  };

  // Render specific toolbars based on tab
  const renderToolbar = () => {
    if (activeTab === 'contract') {
      return (
        <div className="flex flex-col border-b border-gray-200 bg-white">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors">
                更新当前合同
              </button>
              <div className="relative group">
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                  新增历史合同
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                导出
              </button>
              <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                合同审批(1)
              </button>
              <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                发起电子签约
              </button>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex bg-white rounded p-0 border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'all' ? 'bg-white text-[#13A695] border-r border-gray-200' : 'text-gray-600 hover:bg-gray-50 border-r border-gray-200'}`}
                >
                  全部
                </button>
                <button 
                  onClick={() => setStatusFilter('active')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'active' ? 'bg-white text-[#13A695] border-r border-gray-200' : 'text-gray-600 hover:bg-gray-50 border-r border-gray-200'}`}
                >
                  在职
                </button>
                <button 
                  onClick={() => setStatusFilter('resigned')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'resigned' ? 'bg-white text-[#13A695]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  离职
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FFFBE6] border-t border-[#FFE58F] px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-[#FAAD14]">
              <AlertCircle className="w-4 h-4 fill-current text-white" />
              <span className="text-gray-700">提醒：有5名员工合同即将到期或已到期，请尽快处理！</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'agreement') {
        return (
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors">
                  新增
                </button>
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                  导入
                </button>
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                  导出
                </button>
                <button className="px-2 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                  ...
                </button>
                 <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                  更多
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                  发起电子签约
                </button>
              </div>
              <div className="flex items-center gap-3">
               <div className="flex bg-white rounded p-0 border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'all' ? 'bg-white text-[#13A695] border-r border-gray-200' : 'text-gray-600 hover:bg-gray-50 border-r border-gray-200'}`}
                >
                  全部
                </button>
                <button 
                  onClick={() => setStatusFilter('active')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'active' ? 'bg-white text-[#13A695] border-r border-gray-200' : 'text-gray-600 hover:bg-gray-50 border-r border-gray-200'}`}
                >
                  在职
                </button>
                <button 
                  onClick={() => setStatusFilter('resigned')}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'resigned' ? 'bg-white text-[#13A695]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  离职
                </button>
              </div>
            </div>
            </div>
        );
    }

    return null;
  };

  // Render specific table headers and rows based on tab
  const renderTable = () => {
    // Common header cell
    const Th = ({ children, className = '', sortable = false }: { children: React.ReactNode; className?: string; sortable?: boolean }) => (
      <th className={`px-4 py-3 border-b border-gray-200 font-medium text-gray-700 whitespace-nowrap ${className}`}>
        <div className="flex items-center justify-between group cursor-pointer">
          <span>{children}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            {sortable && <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />}
          </div>
        </div>
      </th>
    );

    if (activeTab === 'contract') {
      return (
        <table className="w-full min-w-[2000px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200 whitespace-nowrap">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>工号</Th>
              <Th>入职日期</Th>
              <Th>部门</Th>
              <Th>证件号</Th>
              <Th>员工类型</Th>
              <Th>合同编号</Th>
              <Th>合同公司</Th>
              <Th>合同类型</Th>
              <Th>期限类型</Th>
              <Th>合同开始日期</Th>
              <Th>合同结束日期</Th>
              <Th>合同签订日期</Th>
              <Th>合同终止日期</Th>
              <Th>已签订次数</Th>
              <Th>续签审批状态</Th>
              <Th>电子签署状态</Th>
              <Th>合同状态</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900 flex items-center gap-2">
                   <ChevronDown className="w-4 h-4 text-gray-400" />
                   <span className="text-[#13A695]">{employee.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.idNumber}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.contractNo}</td>
                <td className="px-4 py-3 text-gray-600">{employee.contractCompany}</td>
                <td className="px-4 py-3 text-gray-600">{employee.contractType}</td>
                <td className="px-4 py-3 text-gray-600">{employee.termType}</td>
                <td className="px-4 py-3 text-gray-600">{employee.contractStart}</td>
                <td className="px-4 py-3 text-red-500">{employee.contractEnd}</td>
                <td className="px-4 py-3 text-gray-600">{employee.signDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.terminateDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.signedTimes}</td>
                <td className="px-4 py-3 text-gray-600">
                  {employee.renewStatus === '审批中(查看)' ? (
                    <span className="text-[#13A695] cursor-pointer">审批中(查看)</span>
                  ) : (
                    employee.renewStatus
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${employee.esignStatus === '已完成' ? 'bg-[#52C41A]' : 'bg-gray-300'}`}></div>
                  {employee.esignStatus}
                </td>
                <td className="px-4 py-3 text-gray-600">{employee.contractStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    
    if (activeTab === 'agreement') {
        return (
            <table className="w-full min-w-[1600px] text-sm text-left">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 w-10 border-b border-gray-200 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                  </th>
                  <Th>姓名</Th>
                  <Th>工号</Th>
                  <Th>入职日期</Th>
                  <Th>部门</Th>
                  <Th>证件号</Th>
                  <Th>协议编号</Th>
                  <Th>协议公司</Th>
                  <Th>电子签署状态</Th>
                  <Th>协议类型</Th>
                  <Th>协议开始日期</Th>
                  <Th>协议结束日期</Th>
                  <Th>协议终止日期</Th>
                  <Th>协议状态</Th>
                  <Th>备注</Th>
                  <th className="px-4 py-3 border-b border-gray-200 w-12 whitespace-nowrap">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </th>
                </tr>
                {/* Filter Row */}
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap"></th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <input type="text" placeholder="请输入" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#13A695] focus:border-[#13A695]" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <input type="text" placeholder="请输入" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#13A695] focus:border-[#13A695]" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">开始... ~ 结束...</span>
                      <Globe className="w-3 h-3 text-gray-400 ml-auto flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">请选择</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <input type="text" placeholder="请输入" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#13A695] focus:border-[#13A695]" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <input type="text" placeholder="请输入" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#13A695] focus:border-[#13A695]" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">请选择</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">请选择</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">请选择</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">开始... ~ 结束...</span>
                      <Globe className="w-3 h-3 text-gray-400 ml-auto flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">开始... ~ 结束...</span>
                      <Globe className="w-3 h-3 text-gray-400 ml-auto flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">开始... ~ 结束...</span>
                      <Globe className="w-3 h-3 text-gray-400 ml-auto flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-2 py-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">请选择</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                    <input type="text" placeholder="请输入" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#13A695] focus:border-[#13A695]" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center whitespace-nowrap">
                    <Trash2 className="w-4 h-4 text-gray-400 mx-auto cursor-pointer hover:text-red-500" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agreementRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                    </td>
                    <td className="px-4 py-3 text-[#13A695] cursor-pointer hover:underline">{record.name}</td>
                    <td className="px-4 py-3 text-gray-600">{record.empId}</td>
                    <td className="px-4 py-3 text-gray-600">{record.enrollDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.dept}</td>
                    <td className="px-4 py-3 text-gray-600">{record.idNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{record.agreementNo}</td>
                    <td className="px-4 py-3 text-gray-600">{record.agreementCompany}</td>
                    <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${record.esignStatus === '已完成' ? 'bg-[#52C41A]' : 'bg-gray-300'}`}></div>
                      {record.esignStatus}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{record.agreementType}</td>
                    <td className="px-4 py-3 text-gray-600">{record.startDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.endDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.terminateDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.status}</td>
                    <td className="px-4 py-3 text-gray-600">{record.remark}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-gray-600">
                          <span className="sr-only">More</span>
                          ...
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        )
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation Tabs */}
      <div className="flex items-center border-b border-gray-200 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#13A695] text-[#13A695]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar Area */}
      {renderToolbar()}

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {renderTable()}
      </div>

      {/* Pagination Footer */}
      <div className="border-t border-gray-200 p-3 flex items-center justify-end gap-3 bg-white">
        <span className="text-sm text-gray-500">共 {employees.length} 条</span>
        <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
          <span className="sr-only">Previous</span>
          &lt;
        </button>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center border border-[#13A695] text-[#13A695] rounded">1</button>
        </div>
        <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
          <span className="sr-only">Next</span>
          &gt;
        </button>
        <select className="text-sm border border-gray-200 rounded px-2 py-1">
          <option>100 条/页</option>
          <option>50 条/页</option>
          <option>20 条/页</option>
        </select>
      </div>
    </div>
  );
};

export default ContractManagementPage;
