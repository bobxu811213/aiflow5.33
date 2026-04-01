


import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface RetroRuleFormProps {
  initialData?: any;
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  title?: string;
  embedded?: boolean;
}

export const RetroRuleForm: React.FC<RetroRuleFormProps> = ({ initialData, onCancel, onSubmit, title, embedded = false }) => {
  // Default State
  const defaultState = {
    ruleName: '',
    scope: 'all',
    allowRetro: true,
    retroType: 'unlimited',
    allowedRetroTypes: [] as string[],
    retroReason: 'disabled',
    promptType: 'month',
    promptDays: '',
    promptMonthType: 'current',
    monthlyLimit: '',
    monthlyStart: '',
    dailyLimit: '',
    timeLimitPast: true,
    timeLimitPastDays: '',
    timeLimitPastType: 'calendar',
    timeLimitCurrentMonth: false,
    onlyWorkHours: true
  };

  const [formData, setFormData] = useState(defaultState);
  const isInternalChange = useRef(false);

  useEffect(() => {
      if (initialData) {
          if (isInternalChange.current) {
              isInternalChange.current = false;
              return;
          }
          setFormData(prev => {
              const newData = { ...defaultState, ...initialData };
              if (JSON.stringify(prev) === JSON.stringify(newData)) {
                  return prev;
              }
              return newData;
          });
      }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    isInternalChange.current = true;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleRetroType = (type: string) => {
    isInternalChange.current = true;
    setFormData(prev => {
      const types = prev.allowedRetroTypes || [];
      if (types.includes(type)) {
        return { ...prev, allowedRetroTypes: types.filter(t => t !== type) };
      } else {
        return { ...prev, allowedRetroTypes: [...types, type] };
      }
    });
  };

  const handleSubmit = () => {
      if (!formData.ruleName) {
          alert('请输入规则名称');
          return;
      }
      if (onSubmit) onSubmit(formData);
  };

  const labelClass = "text-sm text-gray-600 text-right w-[160px] shrink-0 leading-[32px] mr-4 flex justify-end items-center";
  const inputClass = "border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary hover:border-primary/50 transition-colors";
  
  const RadioButton = ({ checked }: { checked: boolean }) => (
      <div className={`relative w-4 h-4 rounded-full border transition-all shrink-0 box-border ${checked ? 'border-primary' : 'border-gray-300 bg-white'}`}>
          {checked && <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary" />}
      </div>
  );

  const retroTypeOptions = ['迟到', '早退', '缺卡', '缺勤', '休 (休班次和系统休)', '正常'];

  return (
    <div className={`flex flex-col ${embedded ? '' : 'h-full'} bg-white`}>
        {/* Header */}
        {!embedded && (
            <div className="flex items-center px-6 py-4 border-b border-gray-200 shrink-0">
                <button onClick={onCancel} className="mr-4 hover:bg-gray-100 p-1.5 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            </div>
        )}

        {/* Form Content */}
        <div className={`flex-1 ${embedded ? '' : 'overflow-y-auto px-8 py-6 scrollbar-hide'}`}>
            <div className={`max-w-[1000px] space-y-6 ${embedded ? 'p-6' : ''}`}>
                
                {/* Rule Name */}
                <div className="flex items-center">
                    <div className={labelClass}>
                        <span className="text-red-500 mr-1">*</span>规则名称
                        <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />
                        ：
                    </div>
                    <input 
                        type="text" 
                        className={`${inputClass} w-[400px]`}
                        value={formData.ruleName}
                        onChange={(e) => handleChange('ruleName', e.target.value)}
                        placeholder="请输入规则名称"
                    />
                </div>

                {/* Scope */}
                <div className="flex items-center">
                    <div className={labelClass}>
                        适用范围
                        <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />
                        ：
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center cursor-pointer">
                            <RadioButton checked={formData.scope === 'all'} />
                            <input 
                                type="radio" 
                                className="hidden"
                                checked={formData.scope === 'all'}
                                onChange={() => handleChange('scope', 'all')}
                            />
                            <span className="ml-2 text-sm text-gray-700">全体员工</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <RadioButton checked={formData.scope === 'partial'} />
                            <input 
                                type="radio" 
                                className="hidden"
                                checked={formData.scope === 'partial'}
                                onChange={() => handleChange('scope', 'partial')}
                            />
                            <span className="ml-2 text-sm text-gray-700">部分员工</span>
                        </label>
                    </div>
                </div>

                {/* Retro Rule Settings */}
                <div className="flex items-center">
                    <div className={labelClass}>
                        补卡规则设置：
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.allowRetro ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                            {formData.allowRetro && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={formData.allowRetro}
                            onChange={(e) => handleChange('allowRetro', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">允许补卡</span>
                        <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />
                    </label>
                </div>

                {/* Retro Type */}
                <div className="flex items-start">
                    <div className={labelClass}>
                        补卡类型：
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-6 min-h-[32px]">
                            <label className="flex items-center cursor-pointer">
                                <RadioButton checked={formData.retroType === 'unlimited'} />
                                <input 
                                    type="radio" 
                                    className="hidden"
                                    checked={formData.retroType === 'unlimited'}
                                    onChange={() => handleChange('retroType', 'unlimited')}
                                />
                                <span className="ml-2 text-sm text-gray-700">不限</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <RadioButton checked={formData.retroType === 'allowed'} />
                                <input 
                                    type="radio" 
                                    className="hidden"
                                    checked={formData.retroType === 'allowed'}
                                    onChange={() => handleChange('retroType', 'allowed')}
                                />
                                <span className="ml-2 text-sm text-gray-700">允许补卡类型</span>
                            </label>
                        </div>
                        
                        {formData.retroType === 'allowed' && (
                            <div className="flex flex-wrap gap-x-6 gap-y-2 pl-1 animate-in slide-in-from-top-1 duration-200">
                                {retroTypeOptions.map(type => (
                                    <label key={type} className="flex items-center cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.allowedRetroTypes?.includes(type) ? 'bg-primary border-primary' : 'border-gray-300 bg-white group-hover:border-primary'}`}>
                                            {formData.allowedRetroTypes?.includes(type) && (
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={formData.allowedRetroTypes?.includes(type) || false}
                                            onChange={() => toggleRetroType(type)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Retro Reason */}
                <div className="flex items-center">
                    <div className={labelClass}>
                        补卡原因：
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center cursor-pointer">
                            <RadioButton checked={formData.retroReason === 'enabled'} />
                            <input 
                                type="radio" 
                                className="hidden"
                                checked={formData.retroReason === 'enabled'}
                                onChange={() => handleChange('retroReason', 'enabled')}
                            />
                            <span className="ml-2 text-sm text-gray-700">开启</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <RadioButton checked={formData.retroReason === 'disabled'} />
                            <input 
                                type="radio" 
                                className="hidden"
                                checked={formData.retroReason === 'disabled'}
                                onChange={() => handleChange('retroReason', 'disabled')}
                            />
                            <span className="ml-2 text-sm text-gray-700">关闭</span>
                        </label>
                    </div>
                </div>

                {/* Application Prompt */}
                <div className="flex items-start">
                    <div className={labelClass}>
                        补卡申请提示：
                    </div>
                    <div className="flex flex-col gap-3 pt-1.5">
                        <label className="flex items-center cursor-pointer">
                            <RadioButton checked={formData.promptType === 'none'} />
                            <input 
                                type="radio" 
                                className="hidden"
                                checked={formData.promptType === 'none'}
                                onChange={() => handleChange('promptType', 'none')}
                            />
                            <span className="ml-2 text-sm text-gray-700">不展示</span>
                        </label>
                        
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer mr-2">
                                <RadioButton checked={formData.promptType === 'days'} />
                                <input 
                                    type="radio" 
                                    className="hidden"
                                    checked={formData.promptType === 'days'}
                                    onChange={() => handleChange('promptType', 'days')}
                                />
                                <span className="ml-2 text-sm text-gray-700">展示当天及以前</span>
                            </label>
                            <input 
                                type="text" 
                                className={`${inputClass} w-20 mx-2 h-8`}
                                value={formData.promptDays}
                                onChange={(e) => handleChange('promptDays', e.target.value)}
                                disabled={formData.promptType !== 'days'}
                            />
                            <span className="text-sm text-gray-700">天的缺卡、缺勤、迟到、早退时间</span>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer mr-2">
                                <RadioButton checked={formData.promptType === 'month'} />
                                <input 
                                    type="radio" 
                                    className="hidden"
                                    checked={formData.promptType === 'month'}
                                    onChange={() => handleChange('promptType', 'month')}
                                />
                            </label>
                            <div className="relative w-40 mr-2">
                                <select 
                                    className={`${inputClass} w-full h-8 appearance-none bg-white cursor-pointer pr-8`}
                                    value={formData.promptMonthType}
                                    onChange={(e) => handleChange('promptMonthType', e.target.value)}
                                    disabled={formData.promptType !== 'month'}
                                >
                                    <option value="current">当前</option>
                                    <option value="prev_current">上一个及当前</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-700">考勤月的缺卡、缺勤、迟到、早退时间</span>
                        </div>
                    </div>
                </div>

                {/* Application Count */}
                <div className="flex items-start">
                    <div className={labelClass}>
                        补卡规则申请次数：
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <span className="text-sm text-gray-700 mr-2">每月可补卡</span>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className={`${inputClass} w-20 pr-6 h-8`}
                                    value={formData.monthlyLimit}
                                    onChange={(e) => handleChange('monthlyLimit', e.target.value)}
                                />
                                <div className="absolute right-1 top-0 h-full flex flex-col justify-center gap-0.5">
                                    <ChevronUp size={10} className="text-gray-400 cursor-pointer hover:text-primary" />
                                    <ChevronDown size={10} className="text-gray-400 cursor-pointer hover:text-primary" />
                                </div>
                            </div>
                            <span className="text-sm text-gray-700 mx-2">次， 每月从</span>
                            <div className="relative w-32 mr-2">
                                <select 
                                    className={`${inputClass} w-full h-8 appearance-none bg-white cursor-pointer pr-8`}
                                    value={formData.monthlyStart}
                                    onChange={(e) => handleChange('monthlyStart', e.target.value)}
                                >
                                    <option value=""></option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}日</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-700">起算</span>
                            <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />
                        </div>

                        <div className="flex items-center">
                            <span className="text-sm text-gray-700 mr-2">每天可补卡</span>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className={`${inputClass} w-20 pr-6 h-8`}
                                    value={formData.dailyLimit}
                                    onChange={(e) => handleChange('dailyLimit', e.target.value)}
                                />
                                <div className="absolute right-1 top-0 h-full flex flex-col justify-center gap-0.5">
                                    <ChevronUp size={10} className="text-gray-400 cursor-pointer hover:text-primary" />
                                    <ChevronDown size={10} className="text-gray-400 cursor-pointer hover:text-primary" />
                                </div>
                            </div>
                            <span className="text-sm text-gray-700 ml-2">次</span>
                        </div>
                    </div>
                </div>

                {/* Time Limit */}
                <div className="flex items-start">
                    <div className={labelClass}>
                        补卡时限：
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer mr-2">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors mr-2 ${formData.timeLimitPast ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                    {formData.timeLimitPast && (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={formData.timeLimitPast}
                                    onChange={(e) => handleChange('timeLimitPast', e.target.checked)}
                                />
                                <span className="text-sm text-gray-700">可申请过去</span>
                            </label>
                            <input 
                                type="text" 
                                className={`${inputClass} w-24 mx-2 h-8 ${formData.timeLimitPast ? 'bg-white' : 'bg-[#F5F5F5]'}`}
                                value={formData.timeLimitPastDays}
                                onChange={(e) => handleChange('timeLimitPastDays', e.target.value)}
                                disabled={!formData.timeLimitPast}
                            />
                            <div className="relative w-40 mr-2">
                                <select 
                                    className={`${inputClass} w-full h-8 appearance-none cursor-pointer pr-8 ${formData.timeLimitPast ? 'bg-white text-gray-700' : 'bg-[#F5F5F5] text-gray-500'}`}
                                    value={formData.timeLimitPastType}
                                    onChange={(e) => handleChange('timeLimitPastType', e.target.value)}
                                    disabled={!formData.timeLimitPast}
                                >
                                    <option value="calendar">自然日</option>
                                    <option value="work_calendar_workday">工作日历工作日</option>
                                    <option value="perpetual_calendar_workday">万年历工作日</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-700">的补卡</span>
                        </div>

                        <label className="flex items-center cursor-pointer">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors mr-2 ${formData.timeLimitCurrentMonth ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                {formData.timeLimitCurrentMonth && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden"
                                checked={formData.timeLimitCurrentMonth}
                                onChange={(e) => handleChange('timeLimitCurrentMonth', e.target.checked)}
                            />
                            <span className="text-sm text-gray-700">仅允许申请当前考勤月的补卡</span>
                        </label>
                    </div>
                </div>

                {/* Only Work Hours */}
                <div className="flex items-center">
                    <div className={labelClass}>
                        仅允许工作时间补卡
                        <HelpCircle size={14} className="ml-1 text-gray-400 cursor-pointer" />
                        ：
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors mr-2 ${formData.onlyWorkHours ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                            {formData.onlyWorkHours && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={formData.onlyWorkHours}
                            onChange={(e) => handleChange('onlyWorkHours', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">允许</span>
                    </label>
                </div>

            </div>
        </div>

        {/* Footer Actions */}
        {!embedded && (
            <div className="px-8 py-4 border-t border-gray-200 bg-white flex justify-end gap-3 shrink-0">
                <button 
                    onClick={onCancel}
                    className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
                >
                    保存
                </button>
            </div>
        )}
    </div>
  );
};
