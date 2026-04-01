import React, { useState } from 'react';
import { X, Upload, User, Calendar } from 'lucide-react';
import { DatePicker } from '../ui/date-picker';
import { CustomSelect } from '../ui/custom-select';

interface AddEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EDUCATION_LEVELS = ['博士', '硕士', '本科', '大专', '高中', '中专', '初中', '其他'];

export const AddEducationModal: React.FC<AddEducationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    enrollmentDate: '',
    graduationDate: '',
    educationLevel: '',
    school: '',
    degreeObtained: false,
    is211985: false,
    position: '',
    text: '',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.enrollmentDate || !formData.school) {
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

            {/* Empty cell for alignment if needed, or just skip */}
            <div className="hidden md:block"></div>

            {/* Major */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">专业：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              />
            </div>

            {/* Enrollment Date */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>入校时间：
              </label>
              <div className="flex-1">
                <DatePicker
                  value={formData.enrollmentDate}
                  onChange={(date) => setFormData({ ...formData, enrollmentDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="____-__-__"
                />
              </div>
            </div>

            {/* Graduation Date */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">毕业日期：</label>
              <div className="flex-1">
                <DatePicker
                  value={formData.graduationDate}
                  onChange={(date) => setFormData({ ...formData, graduationDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="____-__-__"
                />
              </div>
            </div>

            {/* Education Level */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">学历：</label>
              <div className="flex-1 relative">
                <CustomSelect
                  options={EDUCATION_LEVELS}
                  value={formData.educationLevel}
                  onChange={(val) => setFormData({ ...formData, educationLevel: val })}
                  placeholder="请选择"
                />
              </div>
            </div>

            {/* School */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">
                <span className="text-red-500 mr-1">*</span>学校：
              </label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              />
            </div>

            {/* Degree Obtained */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">是否取得学位：</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="degreeObtained"
                    className="w-4 h-4 text-[#15B8A6] border-gray-300 focus:ring-[#15B8A6]"
                    checked={formData.degreeObtained === true}
                    onChange={() => setFormData({ ...formData, degreeObtained: true })}
                  />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="degreeObtained"
                    className="w-4 h-4 text-[#15B8A6] border-gray-300 focus:ring-[#15B8A6]"
                    checked={formData.degreeObtained === false}
                    onChange={() => setFormData({ ...formData, degreeObtained: false })}
                  />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* Education Certificate Photo 1 */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">教育证书照1：</label>
              <div className="w-40 h-40 border border-gray-200 bg-gray-50 flex flex-col items-center justify-center relative group cursor-pointer hover:border-[#15B8A6] transition-colors">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 overflow-hidden flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#13A695] text-white text-center py-1 text-sm">
                  上传
                </div>
              </div>
            </div>

            {/* Education Certificate Photo 2 */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">教育证书照2：</label>
              <div className="w-40 h-40 border border-gray-200 bg-gray-50 flex flex-col items-center justify-center relative group cursor-pointer hover:border-[#15B8A6] transition-colors">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 overflow-hidden flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#13A695] text-white text-center py-1 text-sm">
                  上传
                </div>
              </div>
            </div>

            {/* Is 211/985 */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">是否211985：</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="is211985"
                    className="w-4 h-4 text-[#15B8A6] border-gray-300 focus:ring-[#15B8A6]"
                    checked={formData.is211985 === true}
                    onChange={() => setFormData({ ...formData, is211985: true })}
                  />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="is211985"
                    className="w-4 h-4 text-[#15B8A6] border-gray-300 focus:ring-[#15B8A6]"
                    checked={formData.is211985 === false}
                    onChange={() => setFormData({ ...formData, is211985: false })}
                  />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* Position */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">职位：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            {/* Image */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">图片：</label>
              <div className="w-40 h-24 border border-gray-200 bg-gray-50 flex items-center justify-center relative group cursor-pointer hover:border-[#15B8A6] transition-colors overflow-hidden">
                 <div className="w-20 h-10 bg-gray-200 rounded-t-full"></div>
              </div>
            </div>

            {/* Text */}
            <div className="flex items-center">
              <label className="w-24 text-right text-sm text-gray-600 mr-3">文本：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
