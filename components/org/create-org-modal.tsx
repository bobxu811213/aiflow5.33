
import React from 'react';
import { Modal } from '../ui/modal';
import { IOrgNode } from '../../types';
import { OrgForm } from './org-form';

interface CreateOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IOrgNode | null;
  parentData?: IOrgNode | null;
  mode?: 'create' | 'edit' | 'create-sub';
  onSubmit: (data: any) => Promise<void>;
}

export const CreateOrgModal: React.FC<CreateOrgModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData, 
  parentData,
  mode = 'create',
  onSubmit
}) => {
  const getTitle = () => {
      if (mode === 'edit') return '编辑组织';
      if (mode === 'create-sub') return '新增下级组织';
      return '创建组织';
  }

  const handleCreate = async (data: any) => {
      await onSubmit(data);
      onClose();
  };

  return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        width="w-[900px]"
        footer={null} // Footer is handled inside OrgForm
        className="h-[80vh] flex flex-col"
      >
        <OrgForm 
            initialData={initialData}
            parentData={parentData}
            mode={mode}
            onCancel={onClose}
            onSubmit={handleCreate}
        />
      </Modal>
  );
};
