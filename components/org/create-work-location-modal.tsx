import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { ChevronDown } from 'lucide-react';

interface CreateWorkLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const CreateWorkLocationModal: React.FC<CreateWorkLocationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    address: '',
    type: '',
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
      title="创建工作地点"
      width="w-[800px]"
      footer={footer}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* Row 1 */}
        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>名称：
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
            国家/地区：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
            >
              <option value=""></option>
              <option value="中国">中国</option>
              <option value="美国">美国</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            城市：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            >
              <option value=""></option>
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="长沙">长沙</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            详细地址：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        {/* Row 3 */}
        <div className="flex items-start">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0 pt-1.5">
            类型：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
            >
              <option value=""></option>
              <option value="总部">总部</option>
              <option value="分公司">分公司</option>
              <option value="办事处">办事处</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-start">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0 pt-1.5">
            描述：
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
