import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

interface AIOnboardingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onResultClick?: (fields: string[], type: 'error' | 'warning' | 'success') => void;
  formData: {
    onboardingDate: string;
    probationEndDate: string;
    probationMonths: number;
    [key: string]: any;
  };
}

export const AIOnboardingAssistant: React.FC<AIOnboardingAssistantProps> = ({ isOpen, onClose, onSave, onResultClick, formData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [results, setResults] = useState<{ type: 'error' | 'success' | 'warning', message: string, fields?: string[] }[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      setResults([]);
      
      // Simulate AI analysis delay
      const timer = setTimeout(() => {
        const newResults: { type: 'error' | 'success' | 'warning', message: string, fields?: string[] }[] = [];
        
        // 1. Check required fields
        const missingFields: string[] = [];
        const missingFieldKeys: string[] = [];
        if (!formData.phone) { missingFields.push('手机号码'); missingFieldKeys.push('phone'); }
        if (!formData.name) { missingFields.push('姓名'); missingFieldKeys.push('name'); }
        if (!formData.onboardingDate) { missingFields.push('入职日期'); missingFieldKeys.push('onboardingDate'); }
        if (!formData.department) { missingFields.push('部门'); missingFieldKeys.push('department'); }

        if (missingFields.length > 0) {
          newResults.push({ type: 'error', message: `必填项未填写：${missingFields.join('、')}。`, fields: missingFieldKeys });
        } else {
          newResults.push({ type: 'success', message: '所有必填项已填写完整。' });
        }

        // 2. Check probation months
        if (formData.probationMonths > 6) {
          newResults.push({ type: 'error', message: '试用期不能超过6个月。', fields: ['probationMonths'] });
        } else {
          newResults.push({ type: 'success', message: '试用期时长符合规范。' });
        }

        // 3. Check dates
        if (formData.onboardingDate && formData.probationEndDate) {
          const start = new Date(formData.onboardingDate);
          const end = new Date(formData.probationEndDate);
          
          if (end <= start) {
            newResults.push({ type: 'error', message: '试用期到期日必须在入职日期之后。', fields: ['onboardingDate', 'probationEndDate'] });
          } else {
            // Check if end date matches probation months approximately
            const expectedEnd = new Date(start);
            expectedEnd.setMonth(expectedEnd.getMonth() + formData.probationMonths);
            
            // Allow a few days difference for month length variations
            const diffTime = Math.abs(end.getTime() - expectedEnd.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 5) {
              newResults.push({ type: 'warning', message: `试用期到期日与填写的试用期时长（${formData.probationMonths}个月）可能不匹配，请核对。`, fields: ['probationEndDate', 'probationMonths'] });
            } else {
              newResults.push({ type: 'success', message: '入职日期与试用期到期日逻辑合理。' });
            }
          }
        } else if (!formData.onboardingDate || !formData.probationEndDate) {
            const emptyDateFields = [];
            if (!formData.onboardingDate) emptyDateFields.push('onboardingDate');
            if (!formData.probationEndDate) emptyDateFields.push('probationEndDate');
            newResults.push({ type: 'warning', message: '入职日期或试用期到期日未填写完整，无法校验日期逻辑。', fields: emptyDateFields });
        }

        setResults(newResults);
        setIsAnalyzing(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, formData]);

  if (!isOpen) return null;

  return (
    <div className="w-[320px] bg-white border-l border-gray-200 h-full flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] animate-in slide-in-from-right duration-300 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
        <div className="flex items-center space-x-2 text-[#15B8A6]">
          <Sparkles size={18} />
          <h3 className="font-medium">AI 入职助手</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-40 space-y-3 text-gray-500">
            <Loader2 className="animate-spin text-[#15B8A6]" size={24} />
            <p className="text-sm">正在智能校验表单信息...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-3 bg-[#15B8A6] rounded-full mr-2"></span>
                校验结果
              </h4>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-2 ${result.fields && result.fields.length > 0 ? 'cursor-pointer hover:bg-gray-50 p-1 -mx-1 rounded transition-colors' : ''}`}
                    onClick={() => {
                      if (result.fields && result.fields.length > 0 && onResultClick) {
                        onResultClick(result.fields, result.type);
                      }
                    }}
                  >
                    {result.type === 'error' && <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />}
                    {result.type === 'warning' && <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />}
                    {result.type === 'success' && <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />}
                    
                    <p className={`text-sm ${
                      result.type === 'error' ? 'text-red-600' : 
                      result.type === 'warning' ? 'text-amber-600' : 
                      'text-gray-600'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {results.some(r => r.type === 'error') && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-start space-x-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>表单存在错误，请修改后再保存。</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {!isAnalyzing && !results.some(r => r.type === 'error') && (
        <div className="p-4 border-t border-gray-100 bg-white">
          <button 
            onClick={onSave}
            className="w-full py-2 bg-[#15B8A6] text-white rounded-md text-sm hover:bg-teal-600 transition-colors flex items-center justify-center space-x-1"
          >
            <span>确认无误并保存</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
