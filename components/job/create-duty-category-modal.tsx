import React from 'react';
import { Modal } from '../ui/modal';
import { DutyCategoryForm } from './duty-category-form';
import { ApiService } from '../../api/api-service';

interface CreateDutyCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: any;
}

export const CreateDutyCategoryModal: React.FC<CreateDutyCategoryModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const handleSubmit = async (data: any) => {
      if (initialData) {
        await ApiService.updateJobDutyCategory({ ...initialData, ...data });
      } else {
        await ApiService.createJobDutyCategory(data);
      }
      if (onSuccess) onSuccess();
      onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "编辑职务分类" : "创建职务分类"}
      width="w-[600px]"
      className="flex flex-col"
      noContentPadding
      footer={null} // Footer is inside Form
    >
      <DutyCategoryForm 
        initialData={initialData}
        onCancel={onClose} 
        onSubmit={handleSubmit} 
      />
    </Modal>
  );
};