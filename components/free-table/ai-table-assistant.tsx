import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

interface AITableAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onResultClick?: (fields: string[], type: 'error' | 'warning' | 'success') => void;
  formData: {
    customerName: string;
    visitDate: string;
    minutes: string;
    todos: string;
    plan: string;
    [key: string]: any;
  };
}

export const AITableAssistant: React.FC<AITableAssistantProps> = ({ isOpen, onClose, onSave, onResultClick, formData }) => {
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
        if (!formData.customerName) { missingFields.push('客户名称'); missingFieldKeys.push('customerName'); }
        if (!formData.visitDate) { missingFields.push('拜访日期'); missingFieldKeys.push('visitDate'); }

        if (missingFields.length > 0) {
          newResults.push({ type: 'error', message: `必填项未填写：${missingFields.join('、')}。`, fields: missingFieldKeys });
        } else {
          newResults.push({ type: 'success', message: '所有必填项已填写完整。' });
        }

        // 2. Check content length
        if (formData.minutes && formData.minutes.length < 10) {
          newResults.push({ type: 'warning', message: '会议纪要内容较少，建议补充更多细节。', fields: ['minutes'] });
        }

        setResults(newResults);
        setIsAnalyzing(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, formData]);

  if (!isOpen) return null;

  return (
    <div className="w-[320px] bg-white h-full flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] animate-in slide-in-from-right duration-300 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
        <div className="flex items-center space-x-2 text-[#15B8A6]">
          <Sparkles size={18} />
          <h3 className="font-medium">AI 表格助手</h3>
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
