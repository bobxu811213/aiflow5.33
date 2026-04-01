import React, { useState, useRef, useEffect } from 'react';
import { X, User, Calendar, ChevronDown, Check } from 'lucide-react';
import { DatePicker } from '../../ui/date-picker';

interface AddPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddPerformanceModal: React.FC<AddPerformanceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    planName: '',
    type: '',
    year: '',
    period: '',
    department: '',
    position: '',
    startDate: '',
    endDate: '',
    finalScore: '',
    level: '',
    result: '',
    companyRank: '',
    deptRank: '',
    remarks: '',
    coefficient: '1.0',
    deptHead: '',
    deptHeadFinalScore: '',
    deptHeadLevel: '',
    deptScore: '',
    deptLevel: '',
    newField: '',
    entryField: '',
    entryConfigValid: '',
  });

  // Dropdown states
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  
  const typeRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const typeOptions = ['月度考核', '季度考核', '半年度考核', '年度考核', '试用期考核'];
  const periodOptions = ['2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4', '2023上半年', '2023下半年', '2023年度'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.planName || !formData.type || !formData.year || !formData.period || !formData.startDate || !formData.endDate) {
      alert('请填写必填项');
      return;
    }
    onSave(formData);
    onClose();
  };

  const CustomDropdown = ({ 
    value, 
    onChange, 
    options, 
    isOpen, 
    setIsOpen, 
    placeholder, 
    dropdownRef 
  }: { 
    value: string, 
    onChange: (val: string) => void, 
    options: string[], 
    isOpen: boolean, 
    setIsOpen: (val: boolean) => void, 
    placeholder: string,
    dropdownRef: React.RefObject<HTMLDivElement>
  }) => (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`w-full border rounded px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'border-[#15B8A6] ring-1 ring-[#15B8A6]' : 'border-gray-300 hover:border-[#15B8A6]'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-auto z-50">
          {options.map((option) => (
            <div 
              key={option}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FDFA] hover:text-[#15B8A6] cursor-pointer flex items-center justify-between group"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
              {value === option && <Check size={14} className="text-[#15B8A6]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[1000px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">新增员工绩效档案</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Name */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>姓名：
              </label>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="请输入员工姓名查询"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6] pr-8"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <User className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Plan Name */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核计划名称：
              </label>
              <input
                type="text"
                placeholder="请输入考核计划名称"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              />
            </div>

            {/* Type */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核类型：
              </label>
              <div className="flex-1">
                <CustomDropdown
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                  options={typeOptions}
                  isOpen={isTypeOpen}
                  setIsOpen={setIsTypeOpen}
                  placeholder="请选择考核类型"
                  dropdownRef={typeRef}
                />
              </div>
            </div>

            {/* Year */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核所属年份：
              </label>
              <div className="flex-1">
                <DatePicker
                  value={formData.year}
                  onChange={(date) => setFormData({ ...formData, year: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="请输入考核所属年份"
                />
              </div>
            </div>

            {/* Period */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核周期：
              </label>
              <div className="flex-1">
                <CustomDropdown
                  value={formData.period}
                  onChange={(val) => setFormData({ ...formData, period: val })}
                  options={periodOptions}
                  isOpen={isPeriodOpen}
                  setIsOpen={setIsPeriodOpen}
                  placeholder="请选择考核周期"
                  dropdownRef={periodRef}
                />
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">考核期部门：</label>
              <input
                type="text"
                placeholder="请输入考核期部门"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            {/* Position */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">考核期职位：</label>
              <input
                type="text"
                placeholder="请输入考核期职位"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            {/* Start Date */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核开始日期：
              </label>
              <div className="flex-1">
                <DatePicker
                  value={formData.startDate}
                  onChange={(date) => setFormData({ ...formData, startDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="请输入考核开始日期"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>考核结束日期：
              </label>
              <div className="flex-1">
                <DatePicker
                  value={formData.endDate}
                  onChange={(date) => setFormData({ ...formData, endDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="请输入考核结束日期"
                />
              </div>
            </div>

            {/* Final Score */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">最终得分：</label>
              <input
                type="text"
                placeholder="请输入最终得分"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.finalScore}
                onChange={(e) => setFormData({ ...formData, finalScore: e.target.value })}
              />
            </div>

            {/* Level */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">绩效等级：</label>
              <input
                type="text"
                placeholder="请输入绩效等级"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              />
            </div>

            {/* Result */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">考核结果：</label>
              <input
                type="text"
                placeholder="请输入考核结果"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              />
            </div>

            {/* Company Rank */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">公司排名：</label>
              <input
                type="text"
                placeholder="请输入公司排名"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.companyRank}
                onChange={(e) => setFormData({ ...formData, companyRank: e.target.value })}
              />
            </div>

            {/* Dept Rank */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门内排名：</label>
              <input
                type="text"
                placeholder="请输入部门内排名"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptRank}
                onChange={(e) => setFormData({ ...formData, deptRank: e.target.value })}
              />
            </div>

            {/* Remarks - Spans 1 row but in the left column */}
            <div className="flex items-start">
              <label className="w-32 text-right text-sm text-gray-600 mr-3 mt-2">备注：</label>
              <textarea
                placeholder="请输入备注"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6] h-[88px] resize-none"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
            </div>

            {/* Coefficient - Right column */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">系数：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.coefficient}
                onChange={(e) => setFormData({ ...formData, coefficient: e.target.value })}
              />
            </div>

            {/* Dept Head */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门负责人：</label>
              <input
                type="text"
                placeholder="请输入部门负责人"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptHead}
                onChange={(e) => setFormData({ ...formData, deptHead: e.target.value })}
              />
            </div>

            {/* Dept Head Final Score */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门负责人最终得分：</label>
              <input
                type="text"
                placeholder="请输入部门负责人最终得分"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptHeadFinalScore}
                onChange={(e) => setFormData({ ...formData, deptHeadFinalScore: e.target.value })}
              />
            </div>

            {/* Dept Head Level */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门负责人绩效等级：</label>
              <input
                type="text"
                placeholder="请输入部门负责人绩效等级"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptHeadLevel}
                onChange={(e) => setFormData({ ...formData, deptHeadLevel: e.target.value })}
              />
            </div>

            {/* Dept Score */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门绩效得分：</label>
              <input
                type="text"
                placeholder="请输入部门绩效得分"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptScore}
                onChange={(e) => setFormData({ ...formData, deptScore: e.target.value })}
              />
            </div>

            {/* Dept Level */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">部门绩效等级：</label>
              <input
                type="text"
                placeholder="请输入部门绩效等级"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.deptLevel}
                onChange={(e) => setFormData({ ...formData, deptLevel: e.target.value })}
              />
            </div>

            {/* New Field */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">新增绩效字段：</label>
              <input
                type="text"
                placeholder="请输入新增绩效字段"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.newField}
                onChange={(e) => setFormData({ ...formData, newField: e.target.value })}
              />
            </div>

            {/* Entry Field */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">绩效入职字段：</label>
              <input
                type="text"
                placeholder="请输入绩效入职字段"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.entryField}
                onChange={(e) => setFormData({ ...formData, entryField: e.target.value })}
              />
            </div>

            {/* Entry Config Valid */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm text-gray-600 mr-3">绩效入职配置是否有效：</label>
              <input
                type="text"
                placeholder="请输入绩效入职配置是否..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.entryConfigValid}
                onChange={(e) => setFormData({ ...formData, entryConfigValid: e.target.value })}
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-white rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#13A695] text-white rounded text-sm hover:bg-[#0f8a7c] transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};
