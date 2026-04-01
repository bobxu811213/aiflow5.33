
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { IEmployee } from '../../types';
import { X, ChevronUp, User, Sparkles, Maximize2, Minimize2, BrainCircuit, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';
import { InterviewDetailDrawer } from './interview-detail-drawer';
import { InterviewFeedbackModal } from './interview-feedback-modal';
import { FloatingToolbar } from '../common/floating-toolbar';

// Import Tabs
import { BasicInfoTab } from './tabs/basic-info';
import { AttendanceInfoTab } from './tabs/attendance-info';
import { EducationInfoTab } from './tabs/education-info';
import { WorkExperienceTab } from './tabs/work-experience';
import { FamilyInfoTab } from './tabs/family-info';
import { CertificateInfoTab } from './tabs/certificate-info';
import { PerformanceInfoTab } from './tabs/performance-info';
import { TrainingInfoTab } from './tabs/training-info';
import { RecruitmentInfoTab } from './tabs/recruitment-info';
import { ConcurrentPostTab } from './tabs/concurrent-post-tab';
import { WelfareTab } from './tabs/welfare-tab';
import { SalaryTab } from './tabs/salary-tab';
import { GrowthRecordTab } from './tabs/growth-record-tab';
import { DirectManagerTab } from './tabs/direct-manager-tab';
import { TaxTab } from './tabs/tax-tab';
import { TalentPoolTab } from './tabs/talent-pool-tab';

interface EmployeeDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: IEmployee | null;
}

export const EmployeeDetailDrawer: React.FC<EmployeeDetailDrawerProps> = ({ isOpen, onClose, employee }) => {
  const [activeTab, setActiveTab] = useState('基础信息');
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [selectedFeedbackInterview, setSelectedFeedbackInterview] = useState<any>(null);
  const [isDrawerFullScreen, setIsDrawerFullScreen] = useState(false);

  const { 
    setAiSidebarOpen, 
    setAiMode, 
    setAiModeLocked, 
    setAiSidebarPinned, 
    addAiMessage, 
    setAiContext,
    aiSidebarPinned,
    aiSidebarOpen,
    aiMode,
    startNewSession
  } = useAppStore();

  if (!isOpen || !employee) return null;

  const isPinned = aiSidebarOpen && aiMode === 'sidebar' && aiSidebarPinned;

  const handleAiCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTab === '家庭成员') {
        setAiContext('EMPLOYEE');
        setAiMode('sidebar');
        setAiSidebarPinned(true);
        setAiModeLocked(true);
        setAiSidebarOpen(true);
        startNewSession();
        setTimeout(() => {
            addAiMessage({
                id: Date.now().toString(),
                role: 'user',
                content: `请帮我检查员工 ${employee.name} 的家庭成员信息，重点关注逻辑合理性。`
            });
        }, 100);
    } else {
        setAiContext('EMPLOYEE');
        setAiMode('sidebar');
        setAiSidebarPinned(true);
        setAiModeLocked(true);
        setAiSidebarOpen(true);
        startNewSession();
        setTimeout(() => {
            addAiMessage({
                id: Date.now().toString(),
                role: 'user',
                content: `请帮我检查员工 ${employee.name} 的工作经历，重点关注时间连续性和合规性。`
            });
        }, 100);
    }
  };

  const handleAiAnalysis = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAiContext('EMPLOYEE');
    setAiMode('sidebar');
    setAiSidebarPinned(true);
    setAiModeLocked(true);
    setAiSidebarOpen(true);
    startNewSession();
    
    setTimeout(() => {
         addAiMessage({
             id: Date.now().toString(),
             role: 'ai',
             content: `你好，我是员工档案助手。请选择您想要分析 ${employee.name} 的哪些信息维度：`,
             type: 'card',
             cardData: {
                 _type: 'ANALYSIS_SCOPE_SELECTOR',
                 employeeName: employee.name
             }
         });
    }, 100);
  };

  const handleFloatingAiClick = () => {
    setAiContext('EMPLOYEE');
    setAiMode('sidebar');
    setAiSidebarPinned(true);
    setAiModeLocked(true);
    setAiSidebarOpen(true);
    startNewSession();
    
    setTimeout(() => {
         addAiMessage({
             id: Date.now().toString(),
             role: 'ai',
             content: `你好，我是员工档案助手。当前正在查看 ${employee.name} 的档案。我可以帮您分析履历、核查信息或生成评价。`
         });
    }, 100);
  };

  const handleViewInterview = (interview: any) => {
      setSelectedInterview(interview);
  };

  const handleViewFeedback = (interview: any) => {
      setSelectedFeedbackInterview(interview);
  };

  return createPortal(
    <>
    <div 
        className="fixed inset-0 z-[60] flex justify-end bg-black/10 backdrop-blur-[1px] transition-all duration-300 ease-in-out" 
        onClick={onClose}
        style={{ paddingRight: isPinned ? '380px' : '0' }}
    >
        <div 
            className={`${isDrawerFullScreen ? 'w-full' : 'w-[60%] min-w-[800px]'} h-full bg-[#F5F7FA] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative transition-all ease-in-out`}
            onClick={e => e.stopPropagation()}
        >
            {/* Header Area */}
            <div className="bg-[#E8F8F6] p-6 relative pb-10">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button 
                        onClick={() => setIsDrawerFullScreen(!isDrawerFullScreen)} 
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-black/5"
                        title={isDrawerFullScreen ? "退出全屏" : "全屏"}
                    >
                        {isDrawerFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-black/5">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex gap-5">
                    <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <User size={32} />
                        </div>
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-gray-900">{employee.name}</h1>
                            <span className="px-1.5 py-0.5 bg-[#13A695] text-white text-xs rounded-sm">在职</span>
                            <span className="px-1.5 py-0.5 bg-white border border-[#13A695] text-[#13A695] text-xs rounded-sm">复职</span>
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-sm border border-blue-200">212142</span>
                            <span className="px-1.5 py-0.5 bg-[#E6F8F6] text-[#13A695] text-xs rounded-sm cursor-pointer hover:bg-[#d0f0ec]">+标签</span>
                            
                            <button 
                                onClick={handleAiCheck}
                                className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#F4F2FF] to-[#E3DFFF] text-[#927FFF] text-xs rounded-sm border border-[#927FFF]/30 hover:shadow-sm transition-all ml-2"
                                title="AI 档案检查"
                            >
                                <Sparkles size={12} fill="currentColor" className="opacity-70" />
                                AI检查
                            </button>
                            <button 
                                onClick={handleAiAnalysis}
                                className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#E6F8F6] to-[#D0F0EC] text-[#13A695] text-xs rounded-sm border border-[#13A695]/30 hover:shadow-sm transition-all ml-2"
                                title="AI 深度分析"
                            >
                                <BrainCircuit size={12} className="opacity-70" />
                                AI分析
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-y-1 gap-x-8 text-xs text-gray-600">
                            <div>工号: 21213213231213</div>
                            <div>员工类型: 兼职</div>
                            <div>证件类型: 中国护照</div>
                            <div>手机号码: 132121213</div>
                            <div>入职日期: 2025-12-02</div>
                            <div>性别: -</div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-0 right-8 w-8 h-5 bg-white/50 backdrop-blur-sm rounded-t-lg shadow-sm flex items-center justify-center cursor-pointer border-t border-x border-white/60 hover:bg-white transition-colors">
                     <ChevronUp size={16} className="text-gray-500" />
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-6 pt-2 flex items-center justify-between shrink-0">
                <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                    {['基础信息', '招聘信息', '考勤信息', '培训信息', '绩效信息', '教育经历', '工作经历', '家庭成员', '员工证书', '试用期管理', '公司内兼任', '福利', '薪资', '直属领导', '成长记录', '人才池', '个税申报', '自定义'].map((tab, i) => (
                        <div 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors border-b-2 ${activeTab === tab ? 'border-[#13A695] text-[#13A695]' : 'border-transparent text-gray-600 hover:text-[#13A695]'}`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === '基础信息' && <BasicInfoTab />}
                {activeTab === '招聘信息' && <RecruitmentInfoTab onViewInterview={handleViewInterview} onViewFeedback={handleViewFeedback} />}
                {activeTab === '考勤信息' && <AttendanceInfoTab />}
                {activeTab === '培训信息' && <TrainingInfoTab />}
                {activeTab === '绩效信息' && <PerformanceInfoTab />}
                {activeTab === '教育经历' && <EducationInfoTab />}
                {activeTab === '工作经历' && <WorkExperienceTab />}
                {activeTab === '家庭成员' && <FamilyInfoTab />}
                {activeTab === '员工证书' && <CertificateInfoTab />}
                {activeTab === '公司内兼任' && <ConcurrentPostTab />}
                {activeTab === '福利' && <WelfareTab />}
                {activeTab === '薪资' && <SalaryTab />}
                {activeTab === '成长记录' && <GrowthRecordTab />}
                {activeTab === '直属领导' && <DirectManagerTab />}
                {activeTab === '人才池' && <TalentPoolTab />}
                {activeTab === '个税申报' && <TaxTab />}
                {/* Fallback for other tabs not implemented in demo */}
                {['试用期管理', '自定义'].includes(activeTab) && (
                    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                        此模块暂未开放
                    </div>
                )}
            </div>
            
            {/* Footer Actions */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-center shrink-0">
                 <div className="flex items-center bg-white border border-gray-200 rounded-md shadow-sm divide-x divide-gray-200">
                     <button className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#13A695] text-sm transition-colors">
                         <ChevronLeft size={16} />
                         <span>徐波波...</span>
                     </button>
                     
                     <div className="px-6 py-2 text-[#13A695] text-sm font-medium bg-gray-50/50">
                         在职员工 (2/230)
                     </div>
                     
                     <button className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#13A695] text-sm transition-colors">
                         <span>李波波...</span>
                         <ChevronRight size={16} />
                     </button>
                 </div>
            </div>

            {!aiSidebarOpen && (
                <FloatingToolbar 
                    onAiClick={handleFloatingAiClick} 
                    className="!bottom-24 !right-8"
                />
            )}
        </div>
        
        <InterviewDetailDrawer 
            isOpen={!!selectedInterview}
            onClose={() => setSelectedInterview(null)}
            data={selectedInterview}
        />

        <InterviewFeedbackModal 
            isOpen={!!selectedFeedbackInterview}
            onClose={() => setSelectedFeedbackInterview(null)}
            data={selectedFeedbackInterview}
        />
    </div>
    </>,
    document.body
  );
};
