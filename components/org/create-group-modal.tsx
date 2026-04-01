import React, { useState } from 'react';
import { Modal } from '../ui/modal';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: ''
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
      title="创建分组"
      width="w-[500px]"
      footer={footer}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>分组名称：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
            placeholder="分组名称长度不能超过50"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="flex items-center">
          <label className="w-24 text-right pr-4 text-sm text-[#262626] shrink-0">
            分组编码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
            placeholder="分组编码长度不能超过40"
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            maxLength={40}
          />
        </div>
      </div>
    </Modal>
  );
};
