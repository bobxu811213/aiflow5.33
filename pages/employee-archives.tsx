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
import { AddEducationModal } from '../components/employee/add-education-modal';
import { AddWorkExperienceModal } from '../components/employee/add-work-experience-modal';
import { AddFamilyMemberModal } from '../components/employee/add-family-member-modal';
import { AddCertificateModal } from '../components/employee/modals/add-certificate-modal';
import { AddPerformanceModal } from '../components/employee/modals/add-performance-modal';

// Mock data type definition
interface Employee {
  id: number;
  name: string;
  phone: string;
  dept: string;
  empId: string;
  position: string;
  heldPosition?: string; // For Work Experience
  major?: string;
  enrollDate: string;
  gradDate?: string;
  degree?: string;
  resignDate?: string; // For Work Experience
  idNumber?: string; // For Family/Cert
  status: 'active' | 'resigned';
  certName?: string; // For Certificates
  
  // Performance
  perfPlan?: string;
  perfType?: string;
  perfYear?: string;
  perfPeriod?: string;
  perfStartDate?: string;

  // Info Change
  serialNo?: string;
  applyTime?: string;
  formType?: string;
  infoType?: string;

  // Training
  courseName?: string;
  courseCategory?: string;
  learnStatus?: string;
  progress?: string;
  learnStart?: string;
  learnEnd?: string;
  learnDuration?: string;
  credits?: string;
  points?: string;

  // Exam
  examName?: string;
  examType?: string;
  examStatus?: string;
  totalScore?: string;
  passScore?: string;
  examScore?: string;
  retakeCount?: number;
  examDuration?: string;

  // Offline Training OMO
  omoTrainingName?: string;
  omoTrainingCategory?: string;
  omoTrainingStatus?: string;
  omoCheckInStatus?: string;
  omoCheckInTime?: string;
  omoCompletionTime?: string;

  // Tax
  taxEmpType?: string;
  taxOther?: string;
  taxDisabled?: string;
  taxCertType?: string;

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

const EmployeeArchivesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('education'); // Default to education
  const [statusFilter, setStatusFilter] = useState('active'); // 'all', 'active', 'resigned'
  const [infoChangeTab, setInfoChangeTab] = useState('pending'); // 'pending', 'result'
  const [trainingTab, setTrainingTab] = useState('online'); // 'online', 'exam', 'offline', 'map', 'course'
  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);
  const [isAddWorkExperienceModalOpen, setIsAddWorkExperienceModalOpen] = useState(false);
  const [isAddFamilyMemberModalOpen, setIsAddFamilyMemberModalOpen] = useState(false);
  const [isAddCertificateModalOpen, setIsAddCertificateModalOpen] = useState(false);
  const [isAddPerformanceModalOpen, setIsAddPerformanceModalOpen] = useState(false);

  const handleAddEducation = () => {
    setIsAddEducationModalOpen(true);
  };

  const handleSaveEducation = (data: any) => {
    console.log('New education data:', data);
    // Here you would typically update the employees list or make an API call
    setIsAddEducationModalOpen(false);
  };

  const handleAddWorkExperience = () => {
    setIsAddWorkExperienceModalOpen(true);
  };

  const handleSaveWorkExperience = (data: any) => {
    console.log('New work experience data:', data);
    // Here you would typically update the employees list or make an API call
    setIsAddWorkExperienceModalOpen(false);
  };

  const handleAddFamilyMember = () => {
    setIsAddFamilyMemberModalOpen(true);
  };

  const handleSaveFamilyMember = (data: any) => {
    console.log('New family member data:', data);
    // Here you would typically update the employees list or make an API call
    setIsAddFamilyMemberModalOpen(false);
  };

  const handleAddCertificate = () => {
    setIsAddCertificateModalOpen(true);
  };

  const handleSaveCertificate = (data: any) => {
    console.log('New certificate data:', data);
    // Here you would typically update the employees list or make an API call
    setIsAddCertificateModalOpen(false);
  };

  const handleAddPerformance = () => {
    setIsAddPerformanceModalOpen(true);
  };

  const handleSavePerformance = (data: any) => {
    console.log('New performance data:', data);
    setIsAddPerformanceModalOpen(false);
  };

  const tabs = [
    { id: 'education', label: '教育经历' },
    { id: 'work', label: '工作经历' },
    { id: 'family', label: '家庭成员' },
    { id: 'certificate', label: '员工证书' },
    { id: 'performance', label: '绩效档案' },
    { id: 'info-change', label: '信息变更' },
    { id: 'training', label: '培训记录' },
    { id: 'tax', label: '个税申报', hasDropdown: true },
  ];

  // Expanded Mock Data
  const employees: Employee[] = [
    { id: 1, name: '徐波波', phone: '132121213', dept: '许波波测试公司', empId: '21213213231213', position: '产品小助理', enrollDate: '2025-08-01', status: 'active', idNumber: '121323', certName: '' },
    { id: 2, name: '12341341', phone: '2314242', dept: '研发部', empId: '344', position: '主播', enrollDate: '2024-02-04', status: 'active', idNumber: '121323', certName: '' },
    { id: 3, name: '12341341', phone: '2314242', dept: '研发部', empId: '344', position: '主播', major: '专业1', enrollDate: '2024-02-01', status: 'active', idNumber: '11', certName: '' },
    { id: 4, name: 'ayumi有效小小号', phone: '178554793', dept: '研发部', empId: '3254', position: '测试关联项目...', enrollDate: '2024-04-03', status: 'active', idNumber: '0000000000', certName: '' },
    { id: 5, name: 'ayumi有效小小号', phone: '178554793', dept: '研发部', empId: '3254', position: '测试关联项目...', enrollDate: '2024-03-04', status: 'active', idNumber: '0000000000', certName: '' },
    { id: 6, name: 'ayumi有效小小号', phone: '178554793', dept: '研发部', empId: '3254', position: '测试关联项目...', major: '博士', enrollDate: '2023-01-01', status: 'active', idNumber: '', certName: '', degree: '博士' },
    { id: 7, name: 'AAA', phone: '12588', dept: '研发部', empId: 'GH99', position: '', enrollDate: '2018-03-21', status: 'active', idNumber: '340827199908', certName: '' },
    { id: 8, name: '22', phone: '122856', dept: '研发部', empId: '55554444', position: '', enrollDate: '2011-03-21', status: 'active', idNumber: '340827199908', certName: '' },
    { id: 9, name: '谢测试2', phone: '12344567676', dept: '市场部', empId: 'AYUMI00003', position: '主播', enrollDate: '2023-01-01', status: 'active', idNumber: '', certName: '', degree: '本科' },
    { id: 10, name: '813花名册复职员工', phone: '12558', dept: '工号方案测试部门11', empId: 'A******202405GH...', position: '', enrollDate: '2024-04-29', status: 'active', idNumber: '', certName: '' },
    { id: 11, name: '2355', phone: '52558884558', dept: '财务部', empId: 'AYUMI00006', position: '后勤', enrollDate: '2024-03-21', status: 'active', idNumber: '', certName: '' },
    { id: 12, name: '许鸣波', phone: '13817975847', dept: '人事部', empId: '7777', position: '', enrollDate: '2025-08-01', status: 'active', idNumber: '36', certName: '' },
    { id: 13, name: '蒋入职', phone: '18621759010', dept: '人事部', empId: '31231231', position: '', enrollDate: '2016-12-18', status: 'active', idNumber: '', certName: '' },
    { id: 14, name: 'ayumi测试合同签...', phone: '17364328922', dept: '一级部门名字1', empId: '44444', position: '', enrollDate: '2024-04-11', status: 'active', idNumber: '121323', certName: '1' },
    { id: 15, name: '11', phone: '11155874', dept: '一级部门名字1', empId: '', position: '', enrollDate: '2015-03-21', status: 'active', idNumber: '340827199908', certName: '' },
    { id: 16, name: '111', phone: '11', dept: '一级部门名字1', empId: '11121421', position: '15', enrollDate: '2024-04-23', status: 'active', idNumber: '310101199110103384', certName: '' },
    { id: 17, name: 'ayumi测试点位图...', phone: '11111112222', dept: '四级部门名字', empId: '', position: '', enrollDate: '2024-03-15', status: 'active', idNumber: '21334DD', certName: '3223', degree: '博士' },
    { id: 18, name: 'ayumi测试点位图...', phone: '11111112222', dept: '四级部门名字', empId: '', position: '', enrollDate: '2024-03-01', status: 'active', idNumber: '313123', certName: '44', degree: '初中' },
    { id: 19, name: '许学历', phone: '12345678909', dept: '公司', empId: '12312', position: '', enrollDate: '2024-03-15', status: 'active', idNumber: '310105198112', certName: '11', degree: '小学' },
    // Mock data for new tabs
    { id: 101, name: '1425888', phone: '137444433...', empId: '255907', dept: '许波波测试...', position: '1224', enrollDate: '2023-07-09', perfPlan: '11', perfType: '半年', perfYear: '2028年', perfPeriod: '上半年', perfStartDate: '2025-04-04', status: 'active' },
    { id: 102, name: '许鸣波', phone: '', empId: '7777', dept: '人事部', position: '', enrollDate: '', serialNo: 'XXXG00014', applyTime: '2025-11-25 16:58:08', formType: '信息变更单', infoType: '基础信息', status: 'active' },
    { id: 103, name: '徐波波', phone: '132121213', dept: '许波波测试公司', empId: '', position: '', enrollDate: '', courseName: '新员工入职培训', courseCategory: '必修', learnStatus: '已完成', progress: '100%', learnStart: '2025-01-01', learnEnd: '2025-01-02', learnDuration: '2小时', credits: '2', points: '10', status: 'active' },
    { id: 104, name: '徐波波', dept: '许波波测试公司', position: '产品小助理', phone: '132121213', empId: '21213213231...', enrollDate: '2025-12-02', taxEmpType: '雇员', taxOther: '', taxDisabled: '否', taxCertType: '', status: 'active' },
    { id: 105, name: '徐波波', phone: '132121213', dept: '许波波测试公司', empId: '', position: '', enrollDate: '', examName: '入职考试', examType: '线上考试', examStatus: '已通过', totalScore: '100', passScore: '60', examScore: '95', retakeCount: 0, examDuration: '45分钟', credits: '2', points: '5', status: 'active' },
    { id: 106, name: '徐波波', phone: '132121213', dept: '许波波测试公司', empId: '', position: '', enrollDate: '', omoTrainingName: '新员工入职培训', omoTrainingCategory: '必修', omoTrainingStatus: '已完成', omoCheckInStatus: '已签到', omoCheckInTime: '2025-01-01 09:00', omoCompletionTime: '2025-01-02 18:00', credits: '2', points: '10', status: 'active' },
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
    if (activeTab === 'education') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddEducation}
              className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors"
            >
              新增
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导入
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导出
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量上传附件
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量下载附件
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
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'work') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddWorkExperience}
              className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors"
            >
              新增
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导入
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导出
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量上传附件
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量下载附件
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded p-0.5">
              <button 
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${statusFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                全部
              </button>
              <button 
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${statusFilter === 'active' ? 'bg-white shadow-sm text-[#13A695]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                在职
              </button>
              <button 
                onClick={() => setStatusFilter('resigned')}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${statusFilter === 'resigned' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                离职
              </button>
            </div>
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'family' || activeTab === 'certificate') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex bg-white rounded p-0 border border-[#13A695] overflow-hidden">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'all' ? 'bg-[#13A695] text-white' : 'text-[#13A695] hover:bg-teal-50'}`}
            >
              全部(34)
            </button>
            <div className="w-px bg-[#13A695]" />
            <button 
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'active' ? 'bg-[#13A695] text-white' : 'text-[#13A695] hover:bg-teal-50'}`}
            >
              在职(29)
            </button>
            <div className="w-px bg-[#13A695]" />
            <button 
              onClick={() => setStatusFilter('resigned')}
              className={`px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === 'resigned' ? 'bg-[#13A695] text-white' : 'text-[#13A695] hover:bg-teal-50'}`}
            >
              离职(2)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={activeTab === 'family' ? handleAddFamilyMember : activeTab === 'certificate' ? handleAddCertificate : undefined}
              className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors"
            >
              {activeTab === 'family' ? '添加' : '添加'}
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              删除
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量上传附件
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              批量下载附件
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导入
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导出
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
    if (activeTab === 'performance') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddPerformance}
              className="px-4 py-1.5 bg-[#13A695] text-white text-sm font-medium rounded hover:bg-[#0f8a7c] transition-colors"
            >
              新增
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导入
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
              导出
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

    if (activeTab === 'info-change') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex gap-2">
            <button 
              onClick={() => setInfoChangeTab('pending')}
              className={`px-4 py-1.5 text-sm font-medium border rounded transition-colors ${infoChangeTab === 'pending' ? 'bg-white border-[#13A695] text-[#13A695]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              待审核 <span className="ml-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-600">1</span>
            </button>
            <button 
              onClick={() => setInfoChangeTab('result')}
              className={`px-4 py-1.5 text-sm font-medium border rounded transition-colors ${infoChangeTab === 'result' ? 'bg-white border-[#13A695] text-[#13A695]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              审核结果
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'training') {
      return (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex gap-0 border border-[#13A695] rounded overflow-hidden">
            {['online', 'exam', 'offline', 'map', 'course'].map((key, index, arr) => {
               const labels: Record<string, string> = {
                 online: '线上课程',
                 exam: '考试',
                 offline: '线下培训OMO',
                 map: '学习地图/培训项目',
                 course: '培训课程(基础培训)'
               };
               const isActive = trainingTab === key;
               return (
                 <button
                   key={key}
                   onClick={() => setTrainingTab(key)}
                   className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                     isActive 
                       ? 'bg-[#13A695] text-white' 
                       : 'bg-white text-[#13A695] hover:bg-teal-50'
                   } ${index !== arr.length - 1 ? 'border-r border-[#13A695]' : ''}`}
                 >
                   {labels[key]}
                 </button>
               )
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'tax') {
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
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-200">
              <RefreshCw className="w-4 h-4" />
            </button>
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

    if (activeTab === 'education') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>手机号码</Th>
              <Th>部门</Th>
              <Th sortable>工号</Th>
              <Th>职位</Th>
              <Th>专业</Th>
              <Th sortable>入校时间</Th>
              <Th sortable>毕业日期</Th>
              <Th>学历</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.major}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.gradDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.degree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'work') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>手机号码</Th>
              <Th>部门</Th>
              <Th>工号</Th>
              <Th>职位</Th>
              <Th>担任职位</Th>
              <Th>入职日期</Th>
              <Th>离职日期</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.heldPosition}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.resignDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'family') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>工号</Th>
              <Th>手机号码</Th>
              <Th>证件号</Th>
              <Th>入职日期</Th>
              <Th>员工状态</Th>
              <Th>职位</Th>
              <Th>部门</Th>
              <th className="px-4 py-3 border-b border-gray-200 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.idNumber}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3">{renderStatus(employee.status)}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-400">
                  <ChevronRight className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'certificate') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>工号</Th>
              <Th>手机号码</Th>
              <Th>证件号</Th>
              <Th>入职日期</Th>
              <Th>员工状态</Th>
              <Th>部门</Th>
              <Th>职位</Th>
              <Th>证照名称</Th>
              <th className="px-4 py-3 border-b border-gray-200 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.idNumber}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3">{renderStatus(employee.status)}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.certName}</td>
                <td className="px-4 py-3 text-gray-400">
                  <ChevronRight className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'performance') {
      return (
        <table className="w-full min-w-[1400px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>手机号码</Th>
              <Th>工号</Th>
              <Th>部门</Th>
              <Th>职位</Th>
              <Th>入职日期</Th>
              <Th>考核计划名称</Th>
              <Th>考核类型</Th>
              <Th>考核所属年份</Th>
              <Th>考核周期</Th>
              <Th>考核期部门</Th>
              <Th>考核期职位</Th>
              <Th>考核开始日期</Th>
              <th className="px-4 py-3 border-b border-gray-200 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.filter(e => e.perfPlan).map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.perfPlan}</td>
                <td className="px-4 py-3 text-gray-600">{employee.perfType}</td>
                <td className="px-4 py-3 text-gray-600">{employee.perfYear}</td>
                <td className="px-4 py-3 text-gray-600">{employee.perfPeriod}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.perfStartDate}</td>
                <td className="px-4 py-3 text-gray-400">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                     <button className="p-1 hover:bg-gray-200 rounded"><Settings className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'info-change') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <Th>流水号</Th>
              <Th>姓名</Th>
              <Th>工号</Th>
              <Th>部门</Th>
              <Th>申请时间</Th>
              <Th>表单类型</Th>
              <Th>信息类型</Th>
              <th className="px-4 py-3 border-b border-gray-200 w-20">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.filter(e => e.serialNo).map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3 text-gray-900">{employee.serialNo}</td>
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.applyTime}</td>
                <td className="px-4 py-3 text-gray-600">{employee.formType}</td>
                <td className="px-4 py-3 text-gray-600">{employee.infoType}</td>
                <td className="px-4 py-3">
                  <button className="text-[#13A695] hover:underline">处理</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'training') {
      if (trainingTab === 'exam') {
        return (
          <table className="w-full min-w-[1200px] text-sm text-left">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <Th>姓名</Th>
                <Th>手机号</Th>
                <Th>部门</Th>
                <Th>考试名称</Th>
                <Th>考试类型</Th>
                <Th>考试状态</Th>
                <Th>总分</Th>
                <Th>及格分</Th>
                <Th>考试得分</Th>
                <Th>补考次数</Th>
                <Th>考试用时</Th>
                <Th>获得学分</Th>
                <Th>获得积分</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.filter(e => e.examName).map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.examName}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.examType}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.examStatus}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.totalScore}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.passScore}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.examScore}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.retakeCount}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.examDuration}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.credits}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      if (trainingTab === 'offline') {
        return (
          <table className="w-full min-w-[1200px] text-sm text-left">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <Th>姓名</Th>
                <Th>手机号</Th>
                <Th>部门</Th>
                <Th>培训名称</Th>
                <Th>培训分类</Th>
                <Th>培训状态</Th>
                <Th>签到</Th>
                <Th>签到时间</Th>
                <Th>完成时间</Th>
                <Th>获得学分</Th>
                <Th>获得积分</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.filter(e => e.omoTrainingName).map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoTrainingName}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoTrainingCategory}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoTrainingStatus}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoCheckInStatus}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoCheckInTime}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.omoCompletionTime}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.credits}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <Th>姓名</Th>
              <Th>手机号</Th>
              <Th>部门</Th>
              <Th>课程名称</Th>
              <Th>课程分类</Th>
              <Th>学习状态</Th>
              <Th>学习进度</Th>
              <Th>学习开始时间</Th>
              <Th>学习完成时间</Th>
              <Th>学习用时</Th>
              <Th>获得学分</Th>
              <Th>获得积分</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.filter(e => e.courseName).map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.courseName}</td>
                <td className="px-4 py-3 text-gray-600">{employee.courseCategory}</td>
                <td className="px-4 py-3 text-gray-600">{employee.learnStatus}</td>
                <td className="px-4 py-3 text-gray-600">{employee.progress}</td>
                <td className="px-4 py-3 text-gray-600">{employee.learnStart}</td>
                <td className="px-4 py-3 text-gray-600">{employee.learnEnd}</td>
                <td className="px-4 py-3 text-gray-600">{employee.learnDuration}</td>
                <td className="px-4 py-3 text-gray-600">{employee.credits}</td>
                <td className="px-4 py-3 text-gray-600">{employee.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === 'tax') {
      return (
        <table className="w-full min-w-[1200px] text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-10 border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
              </th>
              <Th>姓名</Th>
              <Th>部门</Th>
              <Th>职位</Th>
              <Th>手机号</Th>
              <Th>工号</Th>
              <Th>入职日期</Th>
              <Th>任职受雇从业类型</Th>
              <Th>其他情况说明</Th>
              <Th>是否残疾</Th>
              <Th>残疾证件类型</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.filter(e => e.taxEmpType).map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-[#13A695] focus:ring-[#13A695]" />
                </td>
                <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.dept}</td>
                <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3 text-gray-600">{employee.empId}</td>
                <td className="px-4 py-3 text-gray-600">{employee.enrollDate}</td>
                <td className="px-4 py-3 text-gray-600">{employee.taxEmpType}</td>
                <td className="px-4 py-3 text-gray-600">{employee.taxOther}</td>
                <td className="px-4 py-3 text-gray-600">{employee.taxDisabled}</td>
                <td className="px-4 py-3 text-gray-600">{employee.taxCertType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div className="p-8 text-center text-gray-500">
        此模块功能正在开发中...
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 h-[54px] flex justify-between items-end">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#13A695]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.hasDropdown && <ChevronDown className="w-4 h-4" />}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13A695]" />
              )}
            </button>
          ))}
        </div>
        
        {(activeTab === 'family' || activeTab === 'certificate') && (
          <button className="mb-2 px-3 py-1 text-[#13A695] border border-[#13A695] rounded text-sm hover:bg-teal-50 transition-colors">
            变更记录
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full border border-gray-200">
          
          {/* Toolbar */}
          {renderToolbar()}

          {/* Warning for Certificates */}
          {activeTab === 'certificate' && (
            <div className="bg-[#FFFBE6] border border-[#FFE58F] px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-[#FAAD14]">
                <AlertCircle className="w-4 h-4 fill-current text-white" />
                <span className="text-gray-700">提醒：有4名员工证书即将到期或已超期，请尽快处理！</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto">
            {renderTable()}
          </div>
          
          {/* Pagination (Mock) */}
           <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
            <div>
              {activeTab === 'education' && (
                <button className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors text-sm">
                  批量删除
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>共 {employees.length} 条</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 border border-gray-200 rounded hover:border-[#13A695] hover:text-[#13A695] flex items-center justify-center disabled:opacity-50" disabled>&lt;</button>
                <button className="w-8 h-8 border border-[#13A695] text-[#13A695] rounded flex items-center justify-center">1</button>
                <button className="w-8 h-8 border border-gray-200 rounded hover:border-[#13A695] hover:text-[#13A695] flex items-center justify-center">&gt;</button>
              </div>
              <div className="flex items-center gap-2">
                <select className="border border-gray-200 rounded px-2 py-1">
                  <option>100 条/页</option>
                  <option>50 条/页</option>
                  <option>20 条/页</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#13A695] hover:bg-gray-50 transition-colors border border-gray-100">
          <Globe className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#13A695] hover:bg-gray-50 transition-colors border border-gray-100">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border border-gray-100">
           <img src="https://picsum.photos/seed/avatar/200/200" alt="User" className="w-full h-full object-cover" />
        </button>
      </div>

      <AddEducationModal
        isOpen={isAddEducationModalOpen}
        onClose={() => setIsAddEducationModalOpen(false)}
        onSave={handleSaveEducation}
      />

      <AddWorkExperienceModal
        isOpen={isAddWorkExperienceModalOpen}
        onClose={() => setIsAddWorkExperienceModalOpen(false)}
        onSave={handleSaveWorkExperience}
      />

      <AddFamilyMemberModal
        isOpen={isAddFamilyMemberModalOpen}
        onClose={() => setIsAddFamilyMemberModalOpen(false)}
        onSave={handleSaveFamilyMember}
      />

      <AddCertificateModal
        isOpen={isAddCertificateModalOpen}
        onClose={() => setIsAddCertificateModalOpen(false)}
        onSubmit={handleSaveCertificate}
      />

      <AddPerformanceModal
        isOpen={isAddPerformanceModalOpen}
        onClose={() => setIsAddPerformanceModalOpen(false)}
        onSave={handleSavePerformance}
      />
    </div>
  );
};

export default EmployeeArchivesPage;
