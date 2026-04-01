
import React from 'react';
import { Modal } from '../ui/modal';
import { IJobPosition } from '../../types';
import { Pencil, Briefcase } from 'lucide-react';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IJobPosition | null;
  onEdit: (data: IJobPosition) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ isOpen, onClose, data, onEdit }) => {
  if (!data) return null;

  const DetailItem = ({ label, value, fullWidth = false }: { label: string, value: React.ReactNode, fullWidth?: boolean }) => (
    <div className={`flex gap-2 ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="text-sm text-gray-500 w-[100px] text-right shrink-0">{label}：</div>
      <div className="text-sm text-gray-800 flex-1 break-words">{value || '-'}</div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="职位详情"
      width="w-[800px]"
      footer={
        <>
           <button 
                onClick={onClose} 
                className="px-6 py-1.5 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                关闭
            </button>
            <button 
                onClick={() => onEdit(data)} 
                className="px-6 py-1.5 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors flex items-center"
            >
                <Pencil size={14} className="mr-1" /> 编辑
            </button>
        </>
      }
    >
      <div className="px-6 py-2 space-y-6">
          {/* Header Info */}
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm bg-orange-50 text-orange-600">
                  <Briefcase size={28}/>
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded border bg-orange-50 text-orange-600 border-orange-100">
                        职位
                      </span>
                      {data.code && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">编码: {data.code}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded border ${data.status === '启用' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                          {data.status}
                      </span>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              <DetailItem label="职位名称" value={data.name} />
              <DetailItem label="职位编码" value={data.code} />
              
              <DetailItem label="所属部门" value={data.department} />
              <DetailItem label="编制人数" value={data.headcount} />
              
              <DetailItem label="对应职务" value={data.dutyName} />
              <DetailItem label="生效日期" value={data.effectiveDate} />
              
              <DetailItem label="应用范围" value={data.serviceLine || '全公司'} />
              <DetailItem label="状态" value={data.status} />
          </div>
      </div>
    </Modal>
  );
};
