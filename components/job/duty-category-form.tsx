
import React, { useState, useEffect, useRef } from 'react';

interface DutyCategoryFormProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
  embedded?: boolean;
  onDataChange?: (data: any) => void;
  hiddenFields?: string[]; // Added to match interface consistency
}

export const DutyCategoryForm: React.FC<DutyCategoryFormProps> = ({ onCancel, onSubmit, initialData, embedded = false, onDataChange }) => {
  const emptyForm = {
    name: '',
    code: '',
    description: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const isInternalChange = useRef(false);

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

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  // Styles
  const labelClass = "text-sm text-[#262626] text-right w-[120px] shrink-0 leading-[32px]";
  const inputClass = "flex-1 border border-[#E4E6E9] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-[#B0B2B7] w-full hover:border-primary transition-colors h-[32px]";
  const fieldContainerClass = "flex gap-2 items-center"; // Compact
  const textareaClass = "w-full border border-[#E4E6E9] rounded px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none h-20 hover:border-primary transition-colors scrollbar-hide";

  return (
    <div className={`${embedded ? '' : 'h-full'} flex flex-col`}>
        <div className={`flex-1 ${embedded ? '' : 'overflow-y-auto px-8 py-6 scrollbar-hide'}`}>
            <div className="flex flex-col gap-3"> {/* Reduced gap */}
                
                {/* Row 1 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}><span className="text-[#FF4D4F] mr-1">*</span>职务分类名称：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="请输入"
                    />
                </div>

                {/* Row 2 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}>职务分类编码：</label>
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.code}
                        onChange={e => handleChange('code', e.target.value)}
                        placeholder="请输入"
                    />
                </div>

                {/* Row 3 - Description */}
                <div className={`${fieldContainerClass} items-start`}>
                    <label className={labelClass}>描述：</label>
                    <div className="flex-1 relative">
                        <textarea 
                            className={textareaClass}
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            maxLength={200}
                        ></textarea>
                        <div className="text-right text-[#8E929B] text-xs mt-1">
                            {formData.description.length} / 200
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
