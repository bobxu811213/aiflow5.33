import React from 'react';
import { Modal } from '../ui/modal';
import { JobForm } from './job-form';
import { ApiService } from '../../api/api-service';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: any;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const handleSubmit = async (data: any) => {
      if (initialData) {
        await ApiService.updateJobPosition({ ...initialData, ...data });
      } else {
        await ApiService.createJobPosition(data);
      }
      if (onSuccess) onSuccess();
      onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "编辑职位" : "创建职位"}
      width="w-[1000px]"
      className="h-[680px] flex flex-col"
      noContentPadding
      footer={null} // Footer is inside JobForm
    >
      <JobForm 
        initialData={initialData}
        onCancel={onClose} 
        onSubmit={handleSubmit} 
      />
    </Modal>
  );
};