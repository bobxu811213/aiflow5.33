import React, { useState, useRef, useEffect } from 'react';
import { X, User, Upload, Calendar, ChevronDown, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { DatePicker } from '../ui/date-picker';

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthCertificate: null,
    test3: '',
    birthDate: '',
    memberName: '',
    relation: '',
    fileField: null,
    test2: '',
    test1: '',
    image: null,
    file: null,
  });

  const [isRelationDropdownOpen, setIsRelationDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const relationOptions = ['配偶', '子女', '父母', '兄弟姐妹', '其他'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRelationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.memberName) {
      alert('请填写必填项');
      return;
    }
    onSave(formData);
    onClose();
  };

  const FileUpload = ({ label, helpText, accept }: { label?: string, helpText?: string, accept?: string }) => (
    <div className="flex flex-col items-start">
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#15B8A6] text-[#15B8A6] rounded text-sm hover:bg-[#f0fdfa] transition-colors">
        <Upload size={16} />
        <span>上传</span>
      </button>
      {helpText && <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">{helpText}</p>}
    </div>
  );

  const ImageUpload = ({ helpText }: { helpText?: string }) => (
    <div className="flex flex-col items-start">
      <button className="w-24 h-24 bg-gray-50 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
        <span className="text-sm">上传</span>
      </button>
      {helpText && <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">{helpText}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[1000px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">添加家庭成员</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
            
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-4 bg-[#15B8A6]"></div>
            <h3 className="text-base font-medium text-gray-900">默认分组</h3>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Name */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">
                <span className="text-red-500 mr-1">*</span>姓名：
              </label>
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6] pr-8"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Copy className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            {/* Birth Certificate */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">出生证明：</label>
              <FileUpload 
                helpText="最多可上传1个文件，单个文件大小不超过30M，可支持的文件格式有bmp, jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, pdf, ppt" 
              />
            </div>

            {/* Test 3 */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">测试3：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.test3}
                onChange={(e) => setFormData({ ...formData, test3: e.target.value })}
              />
            </div>

            {/* Date of Birth */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">出生日期：</label>
              <div className="flex-1">
                <DatePicker
                  value={formData.birthDate}
                  onChange={(date) => setFormData({ ...formData, birthDate: date })}
                  className="w-full"
                  inputClassName="w-full"
                  placeholder=""
                />
              </div>
            </div>

            {/* Member Name */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">
                <span className="text-red-500 mr-1">*</span>成员姓名：
              </label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.memberName}
                onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
              />
            </div>

            {/* Relation */}
            <div className="flex items-start z-10">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">关系：</label>
              <div className="flex-1 relative" ref={dropdownRef}>
                <div 
                  className={`w-full border rounded px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-all ${isRelationDropdownOpen ? 'border-[#15B8A6] ring-1 ring-[#15B8A6]' : 'border-gray-300 hover:border-[#15B8A6]'}`}
                  onClick={() => setIsRelationDropdownOpen(!isRelationDropdownOpen)}
                >
                  <span className={formData.relation ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.relation || '请选择'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isRelationDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isRelationDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-auto">
                    {relationOptions.map((option) => (
                      <div 
                        key={option}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FDFA] hover:text-[#15B8A6] cursor-pointer flex items-center justify-between group"
                        onClick={() => {
                          setFormData({ ...formData, relation: option });
                          setIsRelationDropdownOpen(false);
                        }}
                      >
                        <span>{option}</span>
                        {formData.relation === option && <Check size={14} className="text-[#15B8A6]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Field */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">文件字段：</label>
              <FileUpload 
                helpText="最多可上传1个文件，单个文件大小不超过30M，可支持的文件格式有bmp, jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, pdf, ppt" 
              />
            </div>

            {/* Test 2 */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">测试2：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.test2}
                onChange={(e) => setFormData({ ...formData, test2: e.target.value })}
              />
            </div>

            {/* Test 1 */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">测试1：</label>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#15B8A6]"
                value={formData.test1}
                onChange={(e) => setFormData({ ...formData, test1: e.target.value })}
              />
            </div>

            {/* Image */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">图片：</label>
              <ImageUpload 
                helpText="最多可上传1张，单张大小不超过30M，可支持的图片格式有bmp, jpg, jpeg, png, gif, svg" 
              />
            </div>

            {/* File */}
            <div className="flex items-start">
              <label className="w-24 text-right text-sm text-gray-600 mr-3 mt-2">文件：</label>
              <FileUpload 
                helpText="最多可上传1个文件，单个文件大小不超过30M，可支持的文件格式有bmp, jpg, jpeg, png, gif, svg, doc, docx, xls, xlsx, pdf, ppt" 
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
