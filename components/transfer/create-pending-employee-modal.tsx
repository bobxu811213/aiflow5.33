import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, ChevronDown, HelpCircle, ScanLine, CreditCard } from 'lucide-react';
import { DatePicker } from '../ui/date-picker';
import { CustomSelect } from '../ui/custom-select';
import { AIOnboardingAssistant } from './ai-onboarding-assistant';

// Dropdown Data Constants
const JOB_DUTIES = ['总经理', '副总经理', '总监', '经理', '主管', '专员', '助理', '实习生'];
const JOB_CATEGORIES = ['管理类', '技术类', '产品类', '设计类', '市场类', '销售类', '职能类', '操作类'];
const JOB_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'M1', 'M2', 'M3'];
const EDUCATION_LEVELS = ['博士', '硕士', '本科', '大专', '高中', '中专', '初中', '其他'];
const ID_TYPES = ['居民身份证', '护照', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', '外国人永久居留身份证'];
const WORK_LOCATIONS = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安'];
const DEPARTMENTS = ['总经办', '人力资源部', '财务部', '技术研发部', '产品部', '市场部', '销售部', '客户服务部', '行政部'];
const CONTRACT_COMPANIES = ['北京总公司', '上海分公司', '深圳分公司', '广州分公司', '成都研发中心'];
const EMPLOYEE_TYPES = ['全职', '兼职', '实习', '劳务派遣', '外包', '临时'];
const GENDERS = ['男', '女'];
const CONTRACT_TYPES = ['固定期限劳动合同', '无固定期限劳动合同', '以完成一定工作任务为期限的劳动合同'];
const POSITIONS = ['Java开发工程师', '前端开发工程师', '产品经理', 'UI设计师', '测试工程师', '运维工程师', '销售经理', 'HRBP', '财务会计', '行政专员'];

interface CreatePendingEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePendingEmployeeModal: React.FC<CreatePendingEmployeeModalProps> = ({ isOpen, onClose }) => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState<Record<string, 'error' | 'warning'>>({});
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    jobDuty: '',
    jobCategory: '',
    jobLevel: '',
    education: '',
    idType: '',
    workLocation: '',
    department: '',
    contractCompany: '',
    employeeType: '',
    gender: '',
    contractType: '',
    position: '',
    onboardingDate: '',
    probationEndDate: '',
    probationMonths: 6,
  });

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (highlightedFields[field]) {
      setHighlightedFields(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (highlightedFields[field]) {
      setHighlightedFields(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleResultClick = (fields: string[], type: 'error' | 'warning' | 'success') => {
    if (type === 'success') return;
    
    const newHighlights: Record<string, 'error' | 'warning'> = {};
    fields.forEach(f => {
      newHighlights[f] = type as 'error' | 'warning';
    });
    setHighlightedFields(newHighlights);
    
    // Find the first field element and scroll to it
    if (fields.length > 0) {
      const firstFieldId = `field-${fields[0]}`;
      const element = document.getElementById(firstFieldId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 transition-all ${showAIAssistant ? 'w-[1220px]' : 'w-[900px]'}`}>
        <div className="flex h-full overflow-hidden">
          {/* Main Form Area */}
          <div className="flex-1 flex flex-col min-w-[900px]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">创建待入职</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Smart Recognition Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center space-x-4 z-10">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600">
                <ScanLine size={24} />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">智能识别 一键读取身份信息</h3>
                <div className="flex items-center mt-2 space-x-3">
                  <button className="bg-[#15B8A6] text-white px-4 py-1.5 rounded text-sm hover:bg-teal-600 transition-colors">
                    一键读取
                  </button>
                  <button className="text-teal-600 text-sm flex items-center hover:underline">
                    操作说明 <HelpCircle size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-200/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Section 1: Default Group */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-4 bg-[#15B8A6] mr-2"></div>
              <h3 className="text-base font-medium text-gray-900">默认分组</h3>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Phone */}
              <div className="flex items-center" id="field-phone">
                <label className="w-24 text-right text-sm text-gray-600 mr-3"><span className="text-red-500">*</span> 手机号码：</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`flex-1 border rounded px-3 py-2 text-sm focus:outline-none transition-colors ${highlightedFields['phone'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['phone'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 focus:border-[#15B8A6]'}`} 
                />
              </div>

              {/* Name */}
              <div className="flex items-center" id="field-name">
                <label className="w-24 text-right text-sm text-gray-600 mr-3"><span className="text-red-500">*</span> 姓名：</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`flex-1 border rounded px-3 py-2 text-sm focus:outline-none transition-colors ${highlightedFields['name'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['name'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 focus:border-[#15B8A6]'}`} 
                />
              </div>

              {/* Employee ID */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">工号：</label>
                <div className="flex-1 flex">
                  <input type="text" className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]" />
                  <button className="bg-[#15B8A6] text-white px-3 py-2 rounded-r text-sm hover:bg-teal-600 whitespace-nowrap">生成</button>
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="flex items-start row-span-2">
                <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">头像：</label>
                <div className="flex-1">
                  <div className="w-24 h-24 border border-dashed border-gray-300 rounded bg-gray-50 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#15B8A6] hover:text-[#15B8A6] transition-colors">
                    <span className="text-sm">上传</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    最多可上传1张，单张大小不超过30M，可支持的图片格式有bmp, jpg, jpeg, png, gif, svg
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">出生日期：</label>
                <div className="flex-1 relative">
                  <DatePicker onChange={() => {}} className="w-full" inputClassName="w-full" />
                </div>
              </div>

              {/* ID Photo Front */}
              <div className="flex items-start row-span-2">
                <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">证件照正面：</label>
                <div className="flex-1">
                  <div className="w-24 h-24 border border-dashed border-gray-300 rounded bg-gray-50 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#15B8A6] hover:text-[#15B8A6] transition-colors">
                    <span className="text-sm">上传</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    最多可上传1张，单张大小不超过30M，可支持的图片格式有bmp, jpg, jpeg, png, gif, svg
                  </p>
                </div>
              </div>

              {/* Hukou Location */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">户口所在地：</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]" />
              </div>

              {/* Job Duty */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">职务：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={JOB_DUTIES} 
                    value={formData.jobDuty} 
                    onChange={(val) => handleSelectChange('jobDuty', val)} 
                    placeholder="请选择职务"
                  />
                </div>
              </div>

              {/* Job Duty Category */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">职务分类：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={JOB_CATEGORIES} 
                    value={formData.jobCategory} 
                    onChange={(val) => handleSelectChange('jobCategory', val)} 
                    placeholder="请选择职务分类"
                  />
                </div>
              </div>

              {/* Job Level */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">职级：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={JOB_LEVELS} 
                    value={formData.jobLevel} 
                    onChange={(val) => handleSelectChange('jobLevel', val)} 
                    placeholder="请选择职级"
                  />
                </div>
              </div>

              {/* Highest Education */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">最高学历：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={EDUCATION_LEVELS} 
                    value={formData.education} 
                    onChange={(val) => handleSelectChange('education', val)} 
                    placeholder="请选择最高学历"
                  />
                </div>
              </div>

              {/* ID Type */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">证件类型：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={ID_TYPES} 
                    value={formData.idType} 
                    onChange={(val) => handleSelectChange('idType', val)} 
                    placeholder="请选择证件类型"
                  />
                </div>
              </div>

              {/* ID Number */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">证件号：</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]" />
              </div>

              {/* Work Location */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3"><span className="text-red-500">*</span> 工作地点：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={WORK_LOCATIONS} 
                    value={formData.workLocation} 
                    onChange={(val) => handleSelectChange('workLocation', val)} 
                    placeholder="请选择工作地点"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contract Info */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-4 bg-[#15B8A6] mr-2"></div>
              <h3 className="text-base font-medium text-gray-900">合同信息</h3>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Onboarding Date */}
              <div className="flex items-center" id="field-onboardingDate">
                <label className="w-24 text-right text-sm text-gray-600 mr-3"><span className="text-red-500">*</span> 入职日期：</label>
                <div className={`flex-1 relative rounded border transition-colors ${highlightedFields['onboardingDate'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['onboardingDate'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-transparent'}`}>
                  <DatePicker value={formData.onboardingDate} onChange={(val) => handleInputChange('onboardingDate', val)} className="w-full" inputClassName="w-full" />
                </div>
              </div>

              {/* Department */}
              <div className="flex items-center" id="field-department">
                <label className="w-24 text-right text-sm text-gray-600 mr-3"><span className="text-red-500">*</span> 部门：</label>
                <div className={`flex-1 relative rounded border transition-colors ${highlightedFields['department'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['department'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-transparent'}`}>
                  <CustomSelect 
                    options={DEPARTMENTS} 
                    value={formData.department} 
                    onChange={(val) => handleSelectChange('department', val)} 
                    placeholder="请选择部门"
                  />
                </div>
              </div>

              {/* Probation End Date */}
              <div className="flex items-center" id="field-probationEndDate">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">试用期到期日：</label>
                <div className={`flex-1 relative rounded border transition-colors ${highlightedFields['probationEndDate'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['probationEndDate'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-transparent'}`}>
                  <DatePicker value={formData.probationEndDate} onChange={(val) => handleInputChange('probationEndDate', val)} className="w-full" inputClassName="w-full" />
                </div>
              </div>

              {/* Current Contract Start Date */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">当前合同开始日：</label>
                <div className="flex-1 relative">
                  <DatePicker onChange={() => {}} className="w-full" inputClassName="w-full" />
                </div>
              </div>

              {/* Contract Company */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">合同公司：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={CONTRACT_COMPANIES} 
                    value={formData.contractCompany} 
                    onChange={(val) => handleSelectChange('contractCompany', val)} 
                    placeholder="请选择合同公司"
                  />
                </div>
              </div>

              {/* Employee Type */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">员工类型：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={EMPLOYEE_TYPES} 
                    value={formData.employeeType} 
                    onChange={(val) => handleSelectChange('employeeType', val)} 
                    placeholder="请选择员工类型"
                  />
                </div>
              </div>

              {/* Current Contract End Date */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">当前合同结束日：</label>
                <div className="flex-1 relative">
                  <DatePicker onChange={() => {}} className="w-full" inputClassName="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Employee Info */}
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <div className="w-1 h-4 bg-[#15B8A6] mr-2"></div>
              <h3 className="text-base font-medium text-gray-900">员工信息</h3>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Probation Period */}
              <div className="flex items-center" id="field-probationMonths">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">试用期(月)：</label>
                <div className="flex-1 relative">
                  <input 
                    type="number" 
                    value={formData.probationMonths} 
                    onChange={(e) => handleInputChange('probationMonths', parseInt(e.target.value) || 0)}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none transition-colors ${highlightedFields['probationMonths'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['probationMonths'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 focus:border-[#15B8A6]'}`} 
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col border-l border-gray-300">
                    <button 
                      onClick={() => handleInputChange('probationMonths', formData.probationMonths + 1)}
                      className="flex-1 hover:bg-gray-100 flex items-center justify-center border-b border-gray-300 text-gray-500 text-[10px]"
                    >▲</button>
                    <button 
                      onClick={() => handleInputChange('probationMonths', Math.max(0, formData.probationMonths - 1))}
                      className="flex-1 hover:bg-gray-100 flex items-center justify-center text-gray-500 text-[10px]"
                    >▼</button>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">性别：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={GENDERS} 
                    value={formData.gender} 
                    onChange={(val) => handleSelectChange('gender', val)} 
                    placeholder="请选择性别"
                  />
                </div>
              </div>

              {/* Contract Type */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">合同类型：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={CONTRACT_TYPES} 
                    value={formData.contractType} 
                    onChange={(val) => handleSelectChange('contractType', val)} 
                    placeholder="请选择合同类型"
                  />
                </div>
              </div>

              {/* Position */}
              <div className="flex items-center">
                <label className="w-24 text-right text-sm text-gray-600 mr-3">职位：</label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={POSITIONS} 
                    value={formData.position} 
                    onChange={(val) => handleSelectChange('position', val)} 
                    placeholder="请选择职位"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-white rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button className="px-4 py-2 border border-[#15B8A6] text-[#15B8A6] rounded text-sm hover:bg-teal-50 transition-colors">
            保存并编辑
          </button>
          <button 
            onClick={() => setShowAIAssistant(true)}
            className="px-4 py-2 bg-[#15B8A6] text-white rounded text-sm hover:bg-teal-600 transition-colors"
          >
            保存
          </button>
        </div>
          </div>

          {/* AI Assistant Sidebar */}
          {showAIAssistant && (
            <AIOnboardingAssistant 
              isOpen={showAIAssistant} 
              onClose={() => setShowAIAssistant(false)} 
              onSave={onClose}
              onResultClick={handleResultClick}
              formData={formData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
