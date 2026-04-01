
import React from 'react';
import { Modal } from '../ui/modal';
import { DutyForm } from './duty-form';
import { ApiService } from '../../api/api-service';

interface CreateDutyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: any;
}

export const CreateDutyModal: React.FC<CreateDutyModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const handleSubmit = async (data: any) => {
      if (initialData) {
        await ApiService.updateJobDuty({ ...initialData, ...data });
      } else {
        await ApiService.createJobDuty(data);
      }
      if (onSuccess) onSuccess();
      onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "编辑职务" : "创建职务"}
      width="w-[800px]"
      className="flex flex-col"
      noContentPadding
      footer={null} // Footer is inside DutyForm
    >
      <DutyForm 
        initialData={initialData}
        onCancel={onClose} 
        onSubmit={handleSubmit} 
      />
    </Modal>
  );
};
