
import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/date-picker';
import { Select } from '../ui/select';
import { Sparkles } from 'lucide-react';
import { ApiService } from '../../api/api-service';
import { IJobDutyCategory } from '../../types';
import { useAppStore } from '../../store/use-app-store';

interface DutyFormProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
  embedded?: boolean;
  onDataChange?: (data: any) => void;
  hiddenFields?: string[];
}

export const DutyForm: React.FC<DutyFormProps> = ({ 
    onCancel, 
    onSubmit, 
    initialData, 
    embedded = false, 
    onDataChange,
    hiddenFields = []
}) => {
  const emptyForm = {
    name: '',
    shortName: '',
    code: '',
    category: '',
    jobGrade: '',
    effectiveDate: '',
    description: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const [categories, setCategories] = useState<IJobDutyCategory[]>([]);
  const isInternalChange = useRef(false);

  const { setAiSidebarOpen, setAiMode, setAiModeLocked, addAiMessage } = useAppStore();

  useEffect(() => {
    ApiService.getJobDutyCategories().then(setCategories);
  }, []);

  useEffect(() => {
      if (initialData) {
          if (isInternalChange.current) {
              isInternalChange.current = false;
              return;
          }
          setFormData(prev => {
              const newData = {
                  ...prev,
                  ...initialData
              };
              if (JSON.stringify(prev) === JSON.stringify(newData)) {
                  return prev;
              }
              return newData;
          });
      }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    isInternalChange.current = true;
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // 直接同步给父组件，不再依赖 useEffect
    if (embedded && onDataChange) {
        onDataChange(newData);
    }
  };

  const handleAiHelp = () => {
    setAiSidebarOpen(true);
    setAiMode('sidebar');
    setAiModeLocked(true);
    
    // Add initial prompt to chat
    addAiMessage({
        id: Date.now().toString(),
        role: 'user',
        content: formData.name ? `请帮我生成关于职务“${formData.name}”的描述建议` : `请帮我生成一份通用职务描述建议`
    });
  };

  const handleSubmit = () => {
      if (onSubmit) onSubmit(formData);
  };

  const isFieldHidden = (field: string) => hiddenFields.includes(field);

  // Styles
  const labelClass = "text-sm text-[#262626] text-right w-[80px] shrink-0 leading-[32px]";
  const inputClass = "flex-1 border border-[#E4E6E9] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-[#B0B2B7] w-full hover:border-primary transition-colors h-[32px]";
  const fieldContainerClass = "flex gap-2 items-center";
  
  return (
    <div className={`${embedded ? '' : 'h-full'} flex flex-col`}>
        <div className={`flex-1 ${embedded ? '' : 'overflow-y-auto px-8 py-6 scrollbar-hide'}`}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                
                {/* Row 1 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}><span className="text-[#FF4D4F] mr-1">*</span>职务名称：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                    />
                </div>
                <div className={fieldContainerClass}>
                    <label className={labelClass}>简称：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.shortName}
                        onChange={e => handleChange('shortName', e.target.value)}
                    />
                </div>

                {/* Row 2 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}>职务编码：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.code}
                        onChange={e => handleChange('code', e.target.value)}
                    />
                </div>
                
                {!isFieldHidden('category') && (
                    <div className={fieldContainerClass}>
                        <label className={labelClass}>职务分类：</label>
                        <div className="flex-1 h-[32px]">
                            <Select
                                value={formData.category}
                                onChange={(val) => handleChange('category', val)}
                                options={categories.map(cat => ({ label: cat.name, value: cat.name }))}
                                placeholder="请选择"
                            />
                        </div>
                    </div>
                )}

                {/* Row 3 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}>职务薪级：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.jobGrade}
                        onChange={e => handleChange('jobGrade', e.target.value)}
                    />
                </div>
                <div className={fieldContainerClass}>
                    <label className={labelClass}>生效日期：</label>
                    <div className="flex-1 h-[32px]">
                        <DatePicker 
                            value={formData.effectiveDate}
                            onChange={date => handleChange('effectiveDate', date)}
                            placeholder="请选择日期"
                        />
                    </div>
                </div>

                {/* Row 4 - Description */}
                <div className="col-span-2 flex gap-2 items-start">
                    <label className={labelClass}>描述：</label>
                    <div className="flex-1 relative">
                        <div className="w-full border border-[#E4E6E9] rounded hover:border-primary transition-colors bg-white flex flex-col overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
                            <textarea 
                                className="w-full border-none outline-none px-3 py-2 text-sm resize-none h-20 bg-transparent scrollbar-hide"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                                maxLength={200}
                                placeholder=""
                            ></textarea>
                            <div className="flex items-center justify-between px-2 pb-1 bg-gray-50 border-t border-gray-100 h-[28px]">
                                <button
                                    type="button"
                                    onClick={handleAiHelp}
                                    className="flex items-center text-xs text-[#927FFF] hover:bg-[#F4F2FF] px-2 py-0.5 rounded transition-colors group"
                                >
                                    <Sparkles size={12} className="mr-1 group-hover:animate-pulse" />
                                    AI 建议
                                </button>
                                <div className="text-[#8E929B] text-xs">
                                    {formData.description.length} / 200
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        {!embedded && (
            <div className="px-8 py-4 border-t border-[#E4E6E9] bg-white flex justify-end gap-3 shrink-0 rounded-b-lg">
                <button 
                    onClick={onCancel} 
                    className="px-4 py-1.5 rounded text-sm text-primary hover:bg-[#E8F8F6] transition-colors"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="px-6 py-1.5 rounded text-sm bg-primary text-white hover:bg-[#13A695] shadow-sm transition-colors"
                >
                    保存
                </button>
            </div>
        )}
    </div>
  );
};
