
import React from 'react';
import { Modal } from '../ui/modal';
import { IOrgNode } from '../../types';
import { Pencil, Building2, Users } from 'lucide-react';

interface OrgDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IOrgNode | null;
  onEdit: (node: IOrgNode) => void;
}

export const OrgDetailModal: React.FC<OrgDetailModalProps> = ({ isOpen, onClose, data, onEdit }) => {
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
      title="组织详情"
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
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm ${data.type === '公司' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                  {data.type === '公司' ? <Building2 size={28}/> : '∴'}
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded border ${data.type === '公司' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-teal-50 text-teal-600 border-teal-100'}`}>
                        {data.type}
                      </span>
                      {data.code && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">编码: {data.code}</span>}
                      {data.isVirtual && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">虚拟组织</span>}
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              <DetailItem label="组织名称" value={data.name} />
              <DetailItem label="部门编码" value={data.code} />
              
              <DetailItem label="组织类别" value={data.type} />
              <DetailItem label="简称" value={data.shortName} />
              
              <DetailItem label="上级组织" value="许波波测试公司" /> {/* Mocked context */}
              <DetailItem label="设立日期" value="2023-01-01" /> {/* Mocked */}
              
              <DetailItem label="生效日期" value="2023-01-01" /> {/* Mocked */}
              <DetailItem label="虚拟组织" value={data.isVirtual ? '是' : '否'} />
              
              <DetailItem label="直属编制" value={
                  <div className="flex items-center">
                     <span className="font-medium">{data.establishmentCurrent || 0}</span>
                     <span className="text-gray-400 mx-1">/</span>
                     <span>{data.establishmentTotal || 0}</span>
                  </div>
              } />
              <DetailItem label="部门负责人" value={
                  data.manager ? (
                      <div className="flex items-center text-primary">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] mr-1">
                              <Users size={12}/>
                          </div>
                          {data.manager}
                      </div>
                  ) : '-'
              } />
              
              <DetailItem label="工作地点" value="上海" /> {/* Mocked */}
              <DetailItem label="成本中心" value="CC001" /> {/* Mocked */}
              
              <DetailItem label="组织属性" value={data.attribute} />
              <DetailItem label="门店编号" value={data.storeNumber} />
          </div>
          
          <div className="space-y-4 border-t border-gray-100 pt-4">
               <DetailItem label="组织描述" fullWidth value={
                   <div className="bg-gray-50 p-3 rounded leading-relaxed border border-gray-100 min-h-[60px] text-gray-700">
                       {data.description || '暂无描述'}
                   </div>
               } />
               
               <DetailItem label="备注" fullWidth value={
                   <div className="bg-gray-50 p-3 rounded leading-relaxed border border-gray-100 min-h-[60px] text-gray-700">
                       {data.remark || '暂无备注'}
                   </div>
               } />
          </div>
      </div>
    </Modal>
  );
};
