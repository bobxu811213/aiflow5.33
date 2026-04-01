import React, { useState, useRef, useEffect } from 'react';
import { Employee } from './types';
import { X, Upload, FileText, Image as ImageIcon, ChevronDown, Calendar, HelpCircle, Globe } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';
import { CustomSelect } from '../../components/ui/custom-select';

// Dropdown Constants
const TRANSFER_TYPES = ['晋升', '降职', '平调', '部门调整', '岗位调整'];
const TRANSFER_REASONS = ['业务发展需要', '个人职业规划', '组织架构调整', '工作轮岗', '其他'];
const DEPARTMENTS = ['总经办', '人力资源部', '财务部', '技术研发部', '产品部', '市场部', '销售部', '客户服务部', '行政部'];
const POSITIONS = ['Java开发工程师', '前端开发工程师', '产品经理', 'UI设计师', '测试工程师', '运维工程师', '销售经理', 'HRBP', '财务会计', '行政专员'];
const JOB_DUTIES = ['总经理', '副总经理', '总监', '经理', '主管', '专员', '助理', '实习生'];
const JOB_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'M1', 'M2', 'M3'];
const EMPLOYEE_TYPES = ['全职', '兼职', '实习', '劳务派遣', '外包', '临时'];

interface TransferDetailProps {
  employee: Employee;
  onCancel: () => void;
  onSave: (data: any) => void;
}

export const TransferDetail: React.FC<TransferDetailProps> = ({ employee, onCancel, onSave }) => {
  const { setHeaderBreadcrumbs } = useAppStore();
  const [activeTab, setActiveTab] = useState('contract');
  const [formData, setFormData] = useState({
    transferType: '',
    transferReason: '',
    transferDate: '',
    newDepartment: '',
    newPosition: '',
    newJobTitle: '',
    newRank: '',
    newEmployeeType: '',
    isSalaryAdjusted: false,
    remark: '',
  });

  const contractRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const salaryRef = useRef<HTMLDivElement>(null);
  const attachmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', onClick: onCancel },
      { label: '异动管理', onClick: onCancel },
      { label: '调动', onClick: onCancel },
      { label: '调动详情' }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs, onCancel]);

  const scrollToSection = (section: string, ref: React.RefObject<HTMLDivElement>) => {
    setActiveTab(section);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.transferType || !formData.transferDate) {
      alert('请填写必填项');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      {/* Header */}
      <div className="bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-xl font-bold text-gray-900">发起调动</h1>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">姓名：</span>
                <span className="text-gray-900 font-medium">{employee.name}</span>
              </div>
              <div>
                <span className="text-gray-500">职位：</span>
                <span className="text-gray-900 font-medium">{employee.position || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">部门：</span>
                <span className="text-gray-900 font-medium">{employee.department}</span>
              </div>
              <div>
                <span className="text-gray-500">手机号：</span>
                <span className="text-gray-900 font-medium">{employee.phone}</span>
              </div>
              <div>
                <span className="text-gray-500">入职日期：</span>
                <span className="text-gray-900 font-medium">{employee.onboardingDate}</span>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 mt-2">
            {[
              { id: 'contract', label: '合同信息', ref: contractRef },
              { id: 'group', label: '默认分组', ref: groupRef },
              { id: 'salary', label: '薪资', ref: salaryRef },
              { id: 'attachment', label: '附件资料', ref: attachmentRef },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id, tab.ref)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#15B8A6] text-[#15B8A6]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
          
          {/* Contract Info */}
          <div ref={contractRef} className="bg-white rounded-lg shadow-sm p-6 scroll-mt-36">
          <div className="flex items-center mb-6">
            <div className="w-1 h-4 bg-[#15B8A6] mr-2 rounded"></div>
            <h3 className="text-base font-medium text-gray-900">合同信息</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">
                <span className="text-red-500 mr-1">*</span>调动类型：
              </label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={TRANSFER_TYPES}
                  value={formData.transferType}
                  onChange={(val) => setFormData({...formData, transferType: val})}
                  placeholder="请选择"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">
                调动原因：
              </label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={TRANSFER_REASONS}
                  value={formData.transferReason}
                  onChange={(val) => setFormData({...formData, transferReason: val})}
                  placeholder="请选择"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">
                <span className="text-red-500 mr-1">*</span>调动日期：
              </label>
              <div className="flex-1 relative">
                <input 
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                  value={formData.transferDate}
                  onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Default Group */}
        <div ref={groupRef} className="bg-white rounded-lg shadow-sm p-6 scroll-mt-36">
          <div className="flex items-center mb-6">
            <div className="w-1 h-4 bg-[#15B8A6] mr-2 rounded"></div>
            <h3 className="text-base font-medium text-gray-900">默认分组</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Department */}
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">原部门：</label>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">
                {employee.department}
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">新部门：</label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={DEPARTMENTS}
                  value={formData.newDepartment}
                  onChange={(val) => setFormData({...formData, newDepartment: val})}
                  placeholder="请选择"
                />
              </div>
            </div>

            {/* Position */}
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">原职位：</label>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">
                {employee.position || '-'}
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">新职位：</label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={POSITIONS}
                  value={formData.newPosition}
                  onChange={(val) => setFormData({...formData, newPosition: val})}
                  placeholder="请选择"
                />
              </div>
            </div>

            {/* Job Title (Duty) */}
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">原职务：</label>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">
                -
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">新职务：</label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={JOB_DUTIES}
                  value={formData.newJobTitle}
                  onChange={(val) => setFormData({...formData, newJobTitle: val})}
                  placeholder="请选择"
                />
              </div>
            </div>

            {/* Rank */}
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">原职级：</label>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">
                -
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">新职级：</label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={JOB_LEVELS}
                  value={formData.newRank}
                  onChange={(val) => setFormData({...formData, newRank: val})}
                  placeholder="请选择"
                />
              </div>
            </div>

             {/* Employee Type */}
             <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">原员工类型：</label>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">
                {employee.employeeType || '全职'}
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-24 text-right mr-4 text-sm text-gray-600">新员工类型：</label>
              <div className="flex-1 relative">
                <CustomSelect 
                  options={EMPLOYEE_TYPES}
                  value={formData.newEmployeeType}
                  onChange={(val) => setFormData({...formData, newEmployeeType: val})}
                  placeholder="请选择"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Salary */}
        <div ref={salaryRef} className="bg-white rounded-lg shadow-sm p-6 scroll-mt-36">
          <div className="flex items-center mb-6">
            <div className="w-1 h-4 bg-[#15B8A6] mr-2 rounded"></div>
            <h3 className="text-base font-medium text-gray-900">薪资</h3>
          </div>
          <div className="flex items-center">
            <label className="w-24 text-right mr-4 text-sm text-gray-600">
              薪资调整
              <HelpCircle className="w-3 h-3 inline-block ml-1 text-gray-400" />：
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="salaryAdjust" 
                  className="w-4 h-4 text-[#15B8A6] focus:ring-[#15B8A6]"
                  checked={formData.isSalaryAdjusted === true}
                  onChange={() => setFormData({...formData, isSalaryAdjusted: true})}
                />
                <span className="ml-2 text-sm text-gray-700">是</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="salaryAdjust" 
                  className="w-4 h-4 text-[#15B8A6] focus:ring-[#15B8A6]"
                  checked={formData.isSalaryAdjusted === false}
                  onChange={() => setFormData({...formData, isSalaryAdjusted: false})}
                />
                <span className="ml-2 text-sm text-gray-700">否</span>
              </label>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div ref={attachmentRef} className="bg-white rounded-lg shadow-sm p-6 scroll-mt-36">
          <div className="flex items-center mb-6">
            <div className="w-1 h-4 bg-[#15B8A6] mr-2 rounded"></div>
            <h3 className="text-base font-medium text-gray-900">附件资料</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex items-start">
              <label className="w-24 text-right mr-4 text-sm text-gray-600 pt-2">备注：</label>
              <div className="flex-1 relative">
                <textarea 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6] h-24 resize-none"
                  value={formData.remark}
                  onChange={(e) => setFormData({...formData, remark: e.target.value})}
                  maxLength={200}
                ></textarea>
                <div className="text-right text-xs text-gray-400 mt-1">{formData.remark.length} / 200</div>
              </div>
            </div>
            <div className="flex items-start">
              <label className="w-24 text-right mr-4 text-sm text-gray-600 pt-2">附件：</label>
              <div className="flex-1">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors w-32 h-24 flex flex-col items-center justify-center">
                  <Upload className="w-5 h-5 text-[#15B8A6] mb-2" />
                  <span className="text-xs text-gray-500">上传</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  最多可上传3个文件，单个文件大小不超过30M，支持的文件格式有bmp, jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, pdf, ppt
                </p>
              </div>
            </div>
            <div className="flex items-start col-start-2">
              <label className="w-24 text-right mr-4 text-sm text-gray-600 pt-2">图片：</label>
              <div className="flex-1">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors w-32 h-24 flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-600">上传</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  最多可上传9张，单张大小不超过30M，支持的图片格式有bmp, jpg, jpeg, png, gif, svg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4 px-8 z-20 flex justify-end space-x-4">
        <button 
          onClick={onCancel}
          className="px-6 py-2 border border-transparent text-sm font-medium rounded text-[#15B8A6] hover:text-[#0d9488] focus:outline-none"
        >
          取消
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-2 border border-transparent text-sm font-medium rounded text-white bg-[#15B8A6] hover:bg-[#0d9488] focus:outline-none shadow-sm"
        >
          保存
        </button>
      </div>

      {/* Floating Action Buttons (Mock) */}
      <div className="absolute right-8 bottom-24 flex flex-col space-y-4">
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#15B8A6] hover:bg-gray-50">
          <Globe className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#15B8A6] hover:bg-gray-50">
           <HelpCircle className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-white">
           <img src="https://picsum.photos/seed/avatar/40/40" alt="Avatar" className="w-full h-full object-cover" />
           <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
      </div>
    </div>
  );
};
