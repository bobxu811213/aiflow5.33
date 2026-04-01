import React, { useState } from 'react';
import { X, User, Calendar } from 'lucide-react';
import { DatePicker } from '../ui/date-picker';

interface AddWorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddWorkExperienceModal: React.FC<AddWorkExperienceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    entryDate: '',
    resignationDate: '',
    companyName: '',
    jobDescription: '',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.entryDate || !formData.companyName) {
      alert('请填写必填项');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[800px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">新增</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">
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

            {/* Position */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">担任职位：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            {/* Entry Date */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>入职日期：
              </label>
              <div className="flex-1">
                <DatePicker
                  value={formData.entryDate}
                  onChange={(date) => setFormData({ ...formData, entryDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="____-__-__"
                />
              </div>
            </div>

            {/* Resignation Date */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">离职日期：</label>
              <div className="flex-1">
                <DatePicker
                  value={formData.resignationDate}
                  onChange={(date) => setFormData({ ...formData, resignationDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="____-__-__"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>公司名称：
              </label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            {/* Job Description */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">职位描述：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.jobDescription}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
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
            关闭
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
