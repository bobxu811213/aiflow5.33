


import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import { DatePicker } from '../ui/date-picker';
import { ApiService } from '../../api/api-service';
import { AITableAssistant } from './ai-table-assistant';

interface CreateVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

export const CreateVisitModal: React.FC<CreateVisitModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState<Record<string, 'error' | 'warning'>>({});
  const [formData, setFormData] = useState({
    customerName: '',
    visitDate: '',
    minutes: '',
    todos: '',
    plan: ''
  });

  useEffect(() => {
      if (!isOpen) {
        setShowAIAssistant(false);
        setHighlightedFields({});
      }
      if (initialData) {
          setFormData(prev => ({
              ...prev,
              ...initialData,
              // Ensure fields exist
              customerName: initialData.customerName || '',
              visitDate: initialData.visitDate || '',
              minutes: initialData.minutes || '',
              todos: initialData.todos || '',
              plan: initialData.plan || ''
          }));
      } else {
          // Reset if no initial data (e.g. fresh open)
          setFormData({
            customerName: '',
            visitDate: '',
            minutes: '',
            todos: '',
            plan: ''
          });
      }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (highlightedFields[field]) {
      setHighlightedFields(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleResultClick = (fields: string[], type: 'error' | 'warning' | 'success') => {
    if (type === 'success') return;
    
    const newHighlights: Record<string, 'error' | 'warning'> = {};
    fields.forEach(f => {
      newHighlights[f] = type as 'error' | 'warning';
    });
    setHighlightedFields(newHighlights);
    
    // Find the first field element and scroll to it
    if (fields.length > 0) {
      const firstFieldId = `field-${fields[0]}`;
      const element = document.getElementById(firstFieldId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.customerName || !formData.visitDate) {
        // alert('请填写客户名称和拜访日期');
        // return;
    }
    await ApiService.createVisitRecord(formData);
    onSuccess();
    onClose();
    setShowAIAssistant(false);
    // Reset form
    setFormData({
        customerName: '',
        visitDate: '',
        minutes: '',
        todos: '',
        plan: ''
    });
  };

  const labelClass = "text-sm text-gray-600 text-right w-[100px] shrink-0 leading-[32px]";
  const inputClass = (field: string) => `flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none placeholder:text-gray-300 w-full transition-colors h-[32px] ${highlightedFields[field] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields[field] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 focus:border-primary hover:border-primary/50'}`;
  const textareaClass = (field: string) => `w-full border rounded px-3 py-2 text-sm focus:outline-none resize-none h-24 transition-colors scrollbar-hide ${highlightedFields[field] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields[field] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 focus:border-primary hover:border-primary/50'}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="新增拜访记录"
      width={showAIAssistant ? "w-[920px]" : "w-[600px]"}
      footer={
        <div className="flex justify-end gap-3">
            <button 
                onClick={onClose} 
                className="px-6 py-1.5 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                取消
            </button>
            <button 
                onClick={() => setShowAIAssistant(true)} 
                className="px-6 py-1.5 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
            >
                保存
            </button>
        </div>
      }
      aside={
        showAIAssistant ? (
          <AITableAssistant 
            isOpen={showAIAssistant} 
            onClose={() => setShowAIAssistant(false)} 
            onSave={handleSubmit}
            onResultClick={handleResultClick}
            formData={formData}
          />
        ) : undefined
      }
    >
        <div className="space-y-4 px-2">
            <div className="flex gap-2 items-center" id="field-customerName">
                <label className={labelClass}><span className="text-red-500 mr-1">*</span>客户名称：</label>
                <input 
                    type="text" 
                    className={inputClass('customerName')}
                    value={formData.customerName}
                    onChange={e => handleChange('customerName', e.target.value)}
                    placeholder="请输入客户名称"
                />
            </div>
            
            <div className="flex gap-2 items-center" id="field-visitDate">
                <label className={labelClass}><span className="text-red-500 mr-1">*</span>拜访日期：</label>
                <div className={`flex-1 h-[32px] rounded border transition-colors ${highlightedFields['visitDate'] === 'error' ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : highlightedFields['visitDate'] === 'warning' ? 'border-amber-500 ring-1 ring-amber-500 bg-amber-50' : 'border-gray-300 hover:border-primary/50'}`}>
                    <DatePicker 
                        value={formData.visitDate}
                        onChange={date => handleChange('visitDate', date)}
                        placeholder="请选择日期"
                        className="w-full h-full"
                        inputClassName="w-full h-full border-none bg-transparent focus:ring-0"
                    />
                </div>
            </div>

            <div className="flex gap-2 items-start" id="field-minutes">
                <label className={labelClass}>会议纪要：</label>
                <div className="flex-1">
                    <textarea 
                        className={textareaClass('minutes')}
                        value={formData.minutes}
                        onChange={e => handleChange('minutes', e.target.value)}
                        placeholder="请输入会议内容摘要..."
                    />
                </div>
            </div>

            <div className="flex gap-2 items-start" id="field-todos">
                <label className={labelClass}>待办事项：</label>
                <div className="flex-1">
                    <textarea 
                        className={textareaClass('todos')}
                        value={formData.todos}
                        onChange={e => handleChange('todos', e.target.value)}
                        placeholder="请输入后续待办任务..."
                    />
                </div>
            </div>

            <div className="flex gap-2 items-start" id="field-plan">
                <label className={labelClass}>后续计划：</label>
                <div className="flex-1">
                    <textarea 
                        className={textareaClass('plan')}
                        value={formData.plan}
                        onChange={e => handleChange('plan', e.target.value)}
                        placeholder="请输入下一步计划..."
                    />
                </div>
            </div>
        </div>
    </Modal>
  );
};