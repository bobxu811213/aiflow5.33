


import React, { useState, useEffect } from 'react';
import { OrgForm } from '../org/org-form';
import { JobForm } from '../job/job-form';
import { DutyForm } from '../job/duty-form';
import { DutyCategoryForm } from '../job/duty-category-form';
import { Building2, Briefcase, Layers, Network, CheckCircle2, ChevronRight, Eye, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusinessItem {
  id: string;
  type: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY';
  data: any;
  title: string;
  resultData?: any; // The created object returned from API
}

interface MultiBusinessFormProps {
  initialDataList: BusinessItem[];
  onSubmit: (dataList: BusinessItem[]) => Promise<BusinessItem[]>;
  onCancel: () => void;
  onClose?: () => void;
}

export const MultiBusinessForm: React.FC<MultiBusinessFormProps> = ({ initialDataList, onSubmit, onCancel, onClose }) => {
  // Helper to apply linking rules
  const applyAutoLinking = (list: BusinessItem[], sourceItem?: BusinessItem) => {
      let newList = [...list];
      
      // Initial Load: Link based on first available items
      if (!sourceItem) {
          const cat = newList.find(i => i.type === 'CATEGORY');
          if (cat?.data?.name) {
               newList = newList.map(i => i.type === 'DUTY' ? { ...i, data: { ...i.data, category: cat.data.name } } : i);
          }
          
          // Re-find duty as it might have been updated by the category step above
          const duty = newList.find(i => i.type === 'DUTY');
          if (duty?.data?.name) {
               newList = newList.map(i => i.type === 'POSITION' ? { ...i, data: { ...i.data, dutyName: duty.data.name } } : i);
          }
          
          const org = newList.find(i => i.type === 'ORG');
          if (org?.data?.name) {
               newList = newList.map(i => i.type === 'POSITION' ? { ...i, data: { ...i.data, department: org.data.name } } : i);
          }
          return newList;
      }

      // Update: Link downstream from source
      if (sourceItem.type === 'CATEGORY') {
          newList = newList.map(i => i.type === 'DUTY' ? { ...i, data: { ...i.data, category: sourceItem.data.name } } : i);
      }
      if (sourceItem.type === 'DUTY') {
          newList = newList.map(i => i.type === 'POSITION' ? { ...i, data: { ...i.data, dutyName: sourceItem.data.name } } : i);
      }
      if (sourceItem.type === 'ORG') {
          newList = newList.map(i => i.type === 'POSITION' ? { ...i, data: { ...i.data, department: sourceItem.data.name } } : i);
      }
      
      return newList;
  };

  const [items, setItems] = useState<BusinessItem[]>(() => applyAutoLinking(initialDataList));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [successItems, setSuccessItems] = useState<BusinessItem[]>([]);
  const navigate = useNavigate();

  // Sync state with props when switching history items
  useEffect(() => {
    setItems(applyAutoLinking(initialDataList));
    setStep('form');
  }, [initialDataList]);

  // Determine relationships for field hiding
  const hasDuty = items.some(i => i.type === 'DUTY');
  const hasCategory = items.some(i => i.type === 'CATEGORY');

  const handleDataChange = (id: string, newData: any) => {
    setItems(prev => {
      const updatedList = prev.map(item => item.id === id ? { ...item, data: newData } : item);
      const changedItem = updatedList.find(i => i.id === id);
      return changedItem ? applyAutoLinking(updatedList, changedItem) : updatedList;
    });
  };

  const handleSubmit = async () => {
      setIsSubmitting(true);
      try {
          // Parent returns the processed items with results
          const results = await onSubmit(items);
          setSuccessItems(results || items);
          setStep('success');
      } catch (e) {
          console.error(e);
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleViewDetail = (item: BusinessItem) => {
      if (onClose) onClose();
      
      switch (item.type) {
          case 'ORG':
              navigate('/org-structure');
              break;
          case 'POSITION':
              navigate('/job-positions');
              break;
          case 'DUTY':
              navigate('/job-positions'); // Assuming duties are on the same page
              break;
          case 'CATEGORY':
              navigate('/job-positions'); // Assuming categories are on the same page
              break;
      }
  };

  const handleBackToList = () => {
      if (onClose) onClose();
      // Logic to determine which list to go to? Defaulting to Org Structure for now or current context.
      // Since it's a modal over a page, closing it reveals the list.
  };

  const renderIcon = (type: string) => {
      switch (type) {
          case 'ORG': return <Building2 size={12} />;
          case 'POSITION': return <Briefcase size={12} />;
          case 'DUTY': return <Layers size={12} />;
          case 'CATEGORY': return <Network size={12} />;
          default: return <Building2 size={12} />;
      }
  };

  const renderLargeIcon = (type: string) => {
      switch (type) {
          case 'ORG': return <Building2 size={20} />;
          case 'POSITION': return <Briefcase size={20} />;
          case 'DUTY': return <Layers size={20} />;
          case 'CATEGORY': return <Network size={20} />;
          default: return <Building2 size={20} />;
      }
  };

  const renderTitle = (type: string) => {
    switch (type) {
        case 'ORG': return '组织信息';
        case 'POSITION': return '职位信息';
        case 'DUTY': return '职务信息';
        case 'CATEGORY': return '职务分类信息';
        default: return '业务信息';
    }
  };

  // Determine hidden fields for a specific item
  const getHiddenFields = (type: string) => {
      const hidden: string[] = [];
      if (type === 'DUTY' && hasCategory) hidden.push('category');
      if (type === 'POSITION' && hasDuty) hidden.push('dutyName');
      return hidden;
  };

  if (step === 'success') {
      return (
          <div className="flex flex-col h-full bg-white animate-in fade-in zoom-in-95 duration-300">
              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#F6FFEC] rounded-full flex items-center justify-center mb-4 border border-[#D9F7BE]">
                      <CheckCircle2 size={32} className="text-[#52C41A]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">创建成功</h2>
                  <p className="text-gray-500 mb-8 text-sm text-center">
                      已成功创建 {successItems.length} 个业务对象，您可以点击下方列表查看详情。
                  </p>
                  
                  <div className="w-full max-w-2xl bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      {successItems.map((item, index) => (
                          <div key={item.id} className="flex items-center p-4 border-b border-gray-200 last:border-0 hover:bg-white transition-colors group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mr-4 shrink-0 ${
                                    item.type === 'ORG' ? 'bg-[#927FFF]' : 
                                    item.type === 'POSITION' ? 'bg-[#E6AF2E]' : 
                                    item.type === 'DUTY' ? 'bg-[#26C2A4]' : 'bg-[#5483F1]'
                                }`}>
                                    {renderLargeIcon(item.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-gray-800 truncate">{item.data.name}</h4>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                             item.type === 'ORG' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                                             item.type === 'POSITION' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                             item.type === 'DUTY' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                            {item.type === 'ORG' ? '组织' : item.type === 'POSITION' ? '职位' : item.type === 'DUTY' ? '职务' : '职务分类'}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {item.type === 'ORG' ? `编码: ${item.data.code || '-'} | 上级: ${item.data.parentOrg}` : 
                                         item.type === 'POSITION' ? `所属部门: ${item.data.department}` :
                                         item.data.description || '无描述'}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleViewDetail(item)}
                                    className="px-3 py-1.5 rounded text-sm text-primary hover:bg-primary-light transition-colors flex items-center opacity-0 group-hover:opacity-100"
                                >
                                    <Eye size={14} className="mr-1" />
                                    查看详情
                                </button>
                          </div>
                      ))}
                  </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-center gap-4 shrink-0 z-10">
                   <button 
                        onClick={handleBackToList}
                        className="px-6 py-2 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors flex items-center"
                   >
                        <List size={16} className="mr-2" />
                        返回业务列表
                   </button>
                   <button 
                        onClick={() => { setStep('form'); if(onCancel) onCancel(); }} 
                        className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
                   >
                        继续创建
                   </button>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-white">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="relative pl-6">
                {/* Vertical connecting line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gray-200"></div>

                {items.map((item, index) => {
                    return (
                        <div key={item.id} className="relative mb-4 last:mb-0">
                            {/* Step Node */}
                            <div className="absolute -left-[24px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-white z-10">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                                    item.type === 'ORG' ? 'bg-[#927FFF]' : 
                                    item.type === 'POSITION' ? 'bg-[#E6AF2E]' : 
                                    item.type === 'DUTY' ? 'bg-[#26C2A4]' : 'bg-[#5483F1]'
                                }`}>
                                    {renderIcon(item.type)}
                                </div>
                            </div>

                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-sm text-gray-800">
                                    {renderTitle(item.type)}
                                </h3>
                                {index === 0 && (
                                    <span className="text-[10px] text-primary bg-primary-light px-1.5 py-0.5 rounded font-medium">起始</span>
                                )}
                            </div>

                            {/* Form Content - Clean style without cards */}
                            <div className="pl-1">
                                {item.type === 'ORG' && (
                                    <OrgForm 
                                        embedded 
                                        externalData={item.data} 
                                        onDataChange={(d) => handleDataChange(item.id, d)}
                                        hiddenFields={getHiddenFields('ORG')}
                                    />
                                )}
                                {item.type === 'POSITION' && (
                                    <JobForm 
                                        embedded 
                                        initialData={item.data} 
                                        onDataChange={(d) => handleDataChange(item.id, d)}
                                        hiddenFields={getHiddenFields('POSITION')}
                                    />
                                )}
                                {item.type === 'DUTY' && (
                                    <DutyForm 
                                        embedded 
                                        initialData={item.data} 
                                        onDataChange={(d) => handleDataChange(item.id, d)}
                                        hiddenFields={getHiddenFields('DUTY')}
                                    />
                                )}
                                {item.type === 'CATEGORY' && (
                                    <DutyCategoryForm 
                                        embedded 
                                        initialData={item.data} 
                                        onDataChange={(d) => handleDataChange(item.id, d)}
                                        hiddenFields={getHiddenFields('CATEGORY')}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center shrink-0 z-10">
             <div className="text-xs text-gray-500">
                共 <span className="font-bold text-primary text-sm mx-0.5">{items.length}</span> 个业务对象待创建
             </div>
             <div className="flex gap-3">
                <button 
                    onClick={onCancel} 
                    className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '提交中...' : '确认创建'}
                    {!isSubmitting && <CheckCircle2 size={16} />}
                </button>
            </div>
        </div>
    </div>
  );
};
