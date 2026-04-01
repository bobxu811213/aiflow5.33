import React, { useState, useRef } from 'react';
import { X, ChevronDown, Calendar, Clock, Upload, Check, Search } from 'lucide-react';

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AddCertificateModal: React.FC<AddCertificateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    employee: '',
    certName: '',
    certType: '',
    certNumber: '',
    issuingAgency: '',
    issueDate: '',
    filingDate: '',
    reminderDate: '',
    expiryDate: '',
    major: '',
    level: '',
    description: '',
    customField1: '',
    hourMinute: '',
    isField: null as boolean | null,
    certFile2: '',
    timeField: '',
    isField722: null as boolean | null,
  });

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeOptions = ['从业资格证', '职业技能等级证', '职称证书', '特种作业操作证', '执业资格证'];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">添加员工证书</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Section Title */}
          <div className="flex items-center mb-8">
            <div className="w-1 h-4 bg-[#15B8A6] rounded-full mr-2"></div>
            <h3 className="text-sm font-bold text-gray-900">默认分组</h3>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Employee */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                <span className="text-red-500 mr-1">*</span>员工：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="请输入员工姓名或点击图标选择" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.employee}
                  onChange={(e) => handleChange('employee', e.target.value)}
                />
                <Search className="absolute right-2.5 top-2.5 text-gray-400 cursor-pointer hover:text-[#15B8A6]" size={16} />
              </div>
            </div>

            {/* Certificate Name */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                <span className="text-red-500 mr-1">*</span>证照名称：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.certName}
                onChange={(e) => handleChange('certName', e.target.value)}
              />
            </div>

            {/* Certificate Type - Custom Dropdown */}
            <div className="flex items-center z-20">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                <span className="text-red-500 mr-1">*</span>证照类型：
              </label>
              <div className="relative flex-1" ref={dropdownRef}>
                <div 
                  className={`w-full h-9 px-3 flex items-center justify-between border rounded cursor-pointer transition-all ${isTypeDropdownOpen ? 'border-[#15B8A6] ring-1 ring-[#15B8A6]' : 'border-gray-200 hover:border-[#15B8A6]'}`}
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                >
                  <span className={`text-sm ${formData.certType ? 'text-gray-900' : 'text-gray-400'}`}>
                    {formData.certType || '请选择'}
                  </span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isTypeDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100 overflow-hidden z-30">
                    {typeOptions.map((option) => (
                      <div 
                        key={option}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FDFA] hover:text-[#15B8A6] cursor-pointer flex items-center justify-between group"
                        onClick={() => {
                          handleChange('certType', option);
                          setIsTypeDropdownOpen(false);
                        }}
                      >
                        <span>{option}</span>
                        {formData.certType === option && <Check size={14} className="text-[#15B8A6]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Certificate Number */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                <span className="text-red-500 mr-1">*</span>证照编号：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.certNumber}
                onChange={(e) => handleChange('certNumber', e.target.value)}
              />
            </div>

            {/* Issuing Agency */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                发证机构：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.issuingAgency}
                onChange={(e) => handleChange('issuingAgency', e.target.value)}
              />
            </div>

            {/* Issue Date */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                <span className="text-red-500 mr-1">*</span>发证日期：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.issueDate}
                  onChange={(e) => handleChange('issueDate', e.target.value)}
                />
                <Calendar className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Filing Date */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                备案日期：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.filingDate}
                  onChange={(e) => handleChange('filingDate', e.target.value)}
                />
                <Calendar className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Reminder Date */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                提醒日期：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.reminderDate}
                  onChange={(e) => handleChange('reminderDate', e.target.value)}
                />
                <Calendar className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                到期日期：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e.target.value)}
                />
                <Calendar className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Major */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                专业：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.major}
                onChange={(e) => handleChange('major', e.target.value)}
              />
            </div>

            {/* Level */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                级别：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="flex items-start col-span-1">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0 mt-2">
                描述：
              </label>
              <div className="flex-1 relative">
                <textarea 
                  className="w-full h-24 px-3 py-2 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  maxLength={1024}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {formData.description.length} / 1024
                </div>
              </div>
            </div>

            {/* Custom Field */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                ayumi测试证书字段：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.customField1}
                onChange={(e) => handleChange('customField1', e.target.value)}
              />
            </div>

            {/* Hour Minute */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                小时分钟：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.hourMinute}
                  onChange={(e) => handleChange('hourMinute', e.target.value)}
                />
                <Clock className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Is Field */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                是否字段：
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.isField === true ? 'border-[#15B8A6]' : 'border-gray-300 group-hover:border-[#15B8A6]'}`}>
                    {formData.isField === true && <div className="w-2 h-2 rounded-full bg-[#15B8A6]" />}
                  </div>
                  <input type="radio" className="hidden" checked={formData.isField === true} onChange={() => handleChange('isField', true)} />
                  <span className="text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.isField === false ? 'border-[#15B8A6]' : 'border-gray-300 group-hover:border-[#15B8A6]'}`}>
                    {formData.isField === false && <div className="w-2 h-2 rounded-full bg-[#15B8A6]" />}
                  </div>
                  <input type="radio" className="hidden" checked={formData.isField === false} onChange={() => handleChange('isField', false)} />
                  <span className="text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* Cert File 2 */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                证书文件2：
              </label>
              <input 
                type="text" 
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                value={formData.certFile2}
                onChange={(e) => handleChange('certFile2', e.target.value)}
              />
            </div>

            {/* File Field */}
            <div className="flex items-start">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0 mt-2">
                文件字段：
              </label>
              <div className="flex-1">
                <button className="flex items-center px-3 py-1.5 border border-[#15B8A6] text-[#15B8A6] text-sm rounded hover:bg-[#F0FDFA] transition-colors">
                  <Upload size={14} className="mr-1.5" />
                  上传
                </button>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  最多可上传1个文件，单个文件大小不超过20M，可支持的文件格式有bmp，jpg，jpeg，png，svg，doc，docx，xls，xlsx，pdf，ppt
                </p>
              </div>
            </div>

            {/* Time Field */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                时分：
              </label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded hover:border-[#15B8A6] focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none transition-all"
                  value={formData.timeField}
                  onChange={(e) => handleChange('timeField', e.target.value)}
                />
                <Clock className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Is Field 722 */}
            <div className="flex items-center">
              <label className="w-36 text-right text-sm text-gray-600 mr-4 shrink-0">
                是否类型字段722：
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.isField722 === true ? 'border-[#15B8A6]' : 'border-gray-300 group-hover:border-[#15B8A6]'}`}>
                    {formData.isField722 === true && <div className="w-2 h-2 rounded-full bg-[#15B8A6]" />}
                  </div>
                  <input type="radio" className="hidden" checked={formData.isField722 === true} onChange={() => handleChange('isField722', true)} />
                  <span className="text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.isField722 === false ? 'border-[#15B8A6]' : 'border-gray-300 group-hover:border-[#15B8A6]'}`}>
                    {formData.isField722 === false && <div className="w-2 h-2 rounded-full bg-[#15B8A6]" />}
                  </div>
                  <input type="radio" className="hidden" checked={formData.isField722 === false} onChange={() => handleChange('isField722', false)} />
                  <span className="text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 text-sm text-white bg-[#15B8A6] rounded hover:bg-[#0D9488] transition-colors shadow-sm"
          >
            确定
          </button>
        </div>

      </div>
    </div>
  );
};
