
import React, { useState, useRef } from 'react';
import { Modal } from '../ui/modal';
import { Sparkles, Loader2, CheckSquare, Square } from 'lucide-react';

interface BatchAiFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (fields: string[], prompt: string) => void;
  selectedCount: number;
  isGenerating: boolean;
  availableFields: { key: string; label: string }[];
  allFields?: { key: string; label: string }[];
}

export const BatchAiFillModal: React.FC<BatchAiFillModalProps> = ({ 
    isOpen, 
    onClose, 
    onGenerate, 
    selectedCount, 
    isGenerating,
    availableFields,
    allFields = []
}) => {
  const [prompt, setPrompt] = useState('');
  // Default checked fields if needed, or empty
  const [selectedFields, setSelectedFields] = useState<string[]>([]); 
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleField = (key: string) => {
      setSelectedFields(prev => 
          prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      );
  };

  const handleGenerate = () => {
      if (selectedFields.length > 0) {
          onGenerate(selectedFields, prompt);
      }
  };

  const insertVariable = (label: string) => {
      const textToInsert = `[${label}]`;
      const textarea = textareaRef.current;
      if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = prompt;
          const newText = text.substring(0, start) + textToInsert + text.substring(end);
          setPrompt(newText);
          
          setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
          }, 0);
      } else {
          setPrompt(prev => prev + textToInsert);
      }
  };

  // Filter out selected fields from available variables to prevent self-reference if needed, 
  // but generally all fields can be variables for context. 
  // Screenshot shows 'Meeting Minutes' as a variable even if it might be selected? 
  // Usually you use other fields to generate target fields.
  // For simplicity, we show all AVAILABLE fields as variables.
  const availableVariables = allFields;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
          <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#927FFF]" />
              <span className="font-bold text-gray-800">AI 批量智能填充</span>
          </div>
      }
      width="w-[600px]"
      footer={
        <div className="flex justify-end gap-3">
            <button 
                onClick={onClose} 
                disabled={isGenerating}
                className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
                取消
            </button>
            <button 
                onClick={handleGenerate} 
                disabled={isGenerating || selectedFields.length === 0}
                className="px-6 py-2 rounded text-sm bg-[#927FFF] text-white hover:bg-[#7466CC] shadow-sm transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed font-medium"
            >
                {isGenerating ? <Loader2 size={16} className="animate-spin mr-2" /> : <Sparkles size={16} className="mr-2" />}
                {isGenerating ? '批量生成中...' : '开始生成'}
            </button>
        </div>
      }
    >
        <div className="space-y-6 px-2 py-2">
            {/* Scope Box */}
            <div className="bg-[#F0F5FF] border border-[#ADC6FF] rounded px-3 py-2.5 text-sm text-[#2F54EB] flex items-center">
                <span className="font-bold mr-1">生效范围：</span>
                已选择 {selectedCount} 条记录
            </div>

            {/* Field Selection */}
            <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">请选择需要填充的字段：</label>
                <div className="flex flex-wrap gap-4">
                    {availableFields.map(field => {
                        const isChecked = selectedFields.includes(field.key);
                        return (
                            <div 
                                key={field.key}
                                onClick={() => toggleField(field.key)}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer transition-all select-none min-w-[120px] justify-center ${isChecked ? 'border-[#927FFF] bg-[#F4F2FF] text-[#6265F0]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                            >
                                <div className={`flex items-center justify-center w-4 h-4 rounded border transition-colors ${isChecked ? 'bg-[#927FFF] border-[#927FFF]' : 'border-gray-300 bg-white'}`}>
                                    {isChecked && <CheckSquare size={12} className="text-white" />}
                                </div>
                                <span className="text-sm">{field.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Requirements */}
            <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">生成要求（可选）：</label>
                
                {availableVariables.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 items-center">
                        <span className="text-xs text-gray-500 select-none">插入变量:</span>
                        {availableVariables.map(v => (
                            <button
                                key={v.key}
                                onClick={() => insertVariable(v.label)}
                                className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:border-[#927FFF] hover:text-[#927FFF] transition-colors text-gray-600 active:scale-95"
                                type="button"
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="relative">
                    <textarea 
                        ref={textareaRef}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#927FFF] focus:ring-1 focus:ring-[#927FFF]/30 resize-none h-32 transition-colors placeholder:text-gray-400 leading-relaxed text-gray-700"
                        placeholder="[客户名称][拜访日期]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </Modal>
  );
};
