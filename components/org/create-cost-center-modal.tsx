import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { ChevronDown } from 'lucide-react';

interface CreateCostCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const CreateCostCenterModal: React.FC<CreateCostCenterModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    group: '默认分组(MRFZ)',
    status: '有效',
    description: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const footer = (
    <>
      <button 
        onClick={onClose}
        className="px-4 py-1.5 text-sm text-primary hover:bg-primary-light/50 rounded transition-colors"
      >
        取消
      </button>
      <button 
        onClick={handleSave}
        className="px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded shadow-sm transition-colors"
      >
        保存
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="创建成本中心"
      width="w-[500px]"
      footer={footer}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>成本中心：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>成本编码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>所属分组：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.group}
              onChange={(e) => handleChange('group', e.target.value)}
            >
              <option value="默认分组(MRFZ)">默认分组(MRFZ)</option>
              <option value="其他分组">其他分组</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            状态：
          </label>
          <div className="flex items-center space-x-6 flex-1">
            <label className="flex items-center cursor-pointer">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${formData.status === '有效' ? 'border-primary' : 'border-gray-300'}`}>
                {formData.status === '有效' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <input 
                type="radio" 
                className="hidden" 
                checked={formData.status === '有效'}
                onChange={() => handleChange('status', '有效')}
              />
              <span className="text-sm text-[#262626]">有效</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${formData.status === '无效' ? 'border-primary' : 'border-gray-300'}`}>
                {formData.status === '无效' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <input 
                type="radio" 
                className="hidden" 
                checked={formData.status === '无效'}
                onChange={() => handleChange('status', '无效')}
              />
              <span className="text-sm text-[#262626]">无效</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0 pt-1.5">
            说明：
          </label>
          <div className="flex-1 relative">
            <textarea 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-y min-h-[80px]"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={200}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {formData.description.length} / 200
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
