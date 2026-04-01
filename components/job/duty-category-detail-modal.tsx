
import React from 'react';
import { Modal } from '../ui/modal';
import { IJobDutyCategory } from '../../types';
import { Pencil, Network } from 'lucide-react';

interface DutyCategoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IJobDutyCategory | null;
  onEdit: (data: IJobDutyCategory) => void;
}

export const DutyCategoryDetailModal: React.FC<DutyCategoryDetailModalProps> = ({ isOpen, onClose, data, onEdit }) => {
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
      title="职务分类详情"
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
              <div className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm bg-blue-50 text-blue-600">
                  <Network size={28}/>
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded border bg-blue-50 text-blue-600 border-blue-100">
                        职务分类
                      </span>
                      {data.code && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">编码: {data.code}</span>}
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              <DetailItem label="分类名称" value={data.name} />
              <DetailItem label="分类编码" value={data.code} />
          </div>
          
          <div className="space-y-4 border-t border-gray-100 pt-4">
               <DetailItem label="描述" fullWidth value={
                   <div className="bg-gray-50 p-3 rounded leading-relaxed border border-gray-100 min-h-[60px] text-gray-700">
                       {data.description || '暂无描述'}
                   </div>
               } />
          </div>
      </div>
    </Modal>
  );
};
