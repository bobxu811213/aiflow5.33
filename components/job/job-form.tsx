
import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/date-picker';
import { OrgPicker } from '../ui/org-picker';
import { Select } from '../ui/select';
import { RefreshCw, Upload, FileText, X } from 'lucide-react';
import { ApiService } from '../../api/api-service';
import { IJobDuty } from '../../types';

interface JobFormProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
  embedded?: boolean;
  onDataChange?: (data: any) => void;
  hiddenFields?: string[];
}

export const JobForm: React.FC<JobFormProps> = ({ 
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
    code: 'ZW00010',
    department: '',
    scope: [] as string[],
    headcount: '',
    effectiveDate: '',
    dutyName: '',
    qualifications: '',
    responsibilities: ''
  };

  const [formData, setFormData] = useState(emptyForm);

  const [duties, setDuties] = useState<IJobDuty[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const isInternalChange = useRef(false);

  useEffect(() => {
    ApiService.getJobDuties().then(setDuties);
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
                  ...initialData,
                  // Fallback defaults
                  code: initialData.code || prev.code,
              };
               // Prevent infinite loop by checking if data actually changed
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

  const handleRefreshCode = () => {
    // Mock auto-generate
    const random = Math.floor(Math.random() * 10000);
    handleChange('code', `ZW${random.toString().padStart(5, '0')}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          const newFiles = Array.from(e.target.files);
          setFiles(prev => [...prev, ...newFiles].slice(0, 3));
      }
  };

  const removeFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  const isFieldHidden = (field: string) => hiddenFields.includes(field);

  // Styles
  const formRowClass = "grid grid-cols-2 gap-x-6 gap-y-3";
  const labelClass = "text-sm text-gray-600 text-right w-[100px] shrink-0 leading-[32px]";
  const inputClass = "flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-300 w-full hover:border-primary/50 transition-colors h-[32px]";
  const fieldContainerClass = "flex gap-2 items-center";
  const textareaClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none h-20 hover:border-primary/50 transition-colors scrollbar-hide";

  return (
    <div className={`${embedded ? '' : 'h-full'} flex flex-col`}>
        <div className={`flex-1 ${embedded ? '' : 'overflow-y-auto px-8 py-6 scrollbar-hide'}`}>
            <div className={formRowClass}>
                
                {/* Row 1 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>职位名称：</label>
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
                    <label className={labelClass}>职位编码：</label>
                    <div className="flex-1 relative flex items-center gap-2 h-[32px]">
                        <input 
                            type="text" 
                            className={`${inputClass} bg-gray-50 text-gray-500`}
                            value={formData.code}
                            readOnly
                        />
                         <button onClick={handleRefreshCode} className="text-primary hover:text-primary-hover p-1 rounded hover:bg-primary-light transition-colors" title="重新生成">
                             <RefreshCw size={14} />
                         </button>
                    </div>
                </div>
                 <div className={fieldContainerClass}>
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>所属部门：</label>
                    <div className="flex-1 h-[32px]">
                        <OrgPicker 
                            value={formData.department}
                            onChange={(val) => handleChange('department', val)}
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className={fieldContainerClass}>
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>应用范围：</label>
                    <div className="flex-1 h-[32px]">
                        <OrgPicker 
                            value={formData.scope}
                            onChange={(val) => handleChange('scope', val)}
                            multiple
                            placeholder=""
                        />
                    </div>
                </div>
                 <div className={fieldContainerClass}>
                    <label className={labelClass}>编制人数：</label>
                    <input 
                        type="number" 
                        className={inputClass}
                        value={formData.headcount}
                        onChange={e => handleChange('headcount', e.target.value)}
                    />
                </div>

                {/* Row 4 */}
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
                
                {!isFieldHidden('dutyName') && (
                    <div className={fieldContainerClass}>
                        <label className={labelClass}>对应职务：</label>
                        <div className="flex-1 h-[32px]">
                            <Select
                                value={formData.dutyName}
                                onChange={(val) => handleChange('dutyName', val)}
                                options={duties.map(duty => ({ label: duty.name, value: duty.name }))}
                                placeholder="请选择"
                            />
                        </div>
                    </div>
                )}

                {/* Row 5 - Textareas */}
                 <div className={`${fieldContainerClass} items-start`}>
                    <label className={labelClass}>任职资格：</label>
                    <div className="flex-1 relative">
                        <textarea 
                            className={textareaClass}
                            value={formData.qualifications}
                            onChange={e => handleChange('qualifications', e.target.value)}
                            maxLength={1000}
                        ></textarea>
                        <div className="text-right text-gray-400 text-xs mt-1">0 / 1000</div>
                    </div>
                </div>
                 <div className={`${fieldContainerClass} items-start`}>
                    <label className={labelClass}>责任描述：</label>
                     <div className="flex-1 relative">
                        <textarea 
                            className={textareaClass}
                            value={formData.responsibilities}
                            onChange={e => handleChange('responsibilities', e.target.value)}
                            maxLength={1000}
                        ></textarea>
                        <div className="text-right text-gray-400 text-xs mt-1">0 / 1000</div>
                    </div>
                </div>

                 {/* Row 6 - Upload */}
                 <div className={`col-span-2 flex gap-2 items-start mt-1`}>
                    <label className={labelClass}>职位说明书：</label>
                    <div className="flex-1">
                        <div className="flex items-start gap-4">
                             <label className="flex items-center px-4 py-1.5 bg-white border border-primary text-primary rounded cursor-pointer hover:bg-primary-light transition-colors text-sm h-[32px]">
                                <Upload size={14} className="mr-2" />
                                上传
                                <input type="file" className="hidden" onChange={handleFileChange} multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" />
                            </label>
                        </div>
                        {files.length === 0 && (
                            <div className="mt-1 text-xs text-gray-400 leading-relaxed">
                                支持pdf、doc、docx、xls、xlsx、ppt、pptx、txt类型文档上传，大小不超过8Mb，最多可上传3个文档
                            </div>
                        )}

                        {files.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {files.map((file, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 w-fit">
                                        <FileText size={14} className="mr-2 text-gray-400"/>
                                        <span className="mr-4">{file.name}</span>
                                        <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeFile(idx)} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        {!embedded && (
            <div className="px-8 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0 rounded-b-lg">
                <button 
                    onClick={onCancel} 
                    className="px-8 py-2 rounded text-sm text-primary hover:bg-primary-light transition-colors font-medium"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="px-8 py-2 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
                >
                    保存
                </button>
            </div>
        )}
    </div>
  );
};
