
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import { Sparkles, Loader2 } from 'lucide-react';

interface AiFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  columnLabel: string;
  isGenerating: boolean;
}

export const AiFillModal: React.FC<AiFillModalProps> = ({ isOpen, onClose, onGenerate, columnLabel, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  // Reset prompt when opening
  useEffect(() => {
      if (isOpen) setPrompt('');
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
          <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#927FFF]" />
              <span>AI 智能填充 - {columnLabel}</span>
          </div>
      }
      width="w-[500px]"
      footer={
        <div className="flex justify-end gap-3">
            <button 
                onClick={onClose} 
                disabled={isGenerating}
                className="px-4 py-1.5 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
                取消
            </button>
            <button 
                onClick={() => onGenerate(prompt)} 
                disabled={isGenerating}
                className="px-4 py-1.5 rounded text-sm bg-[#927FFF] text-white hover:bg-[#7466CC] shadow-sm transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isGenerating ? <Loader2 size={14} className="animate-spin mr-1" /> : <Sparkles size={14} className="mr-1" />}
                {isGenerating ? '生成中...' : '开始生成'}
            </button>
        </div>
      }
    >
        <div className="space-y-3 px-1">
            <div className="text-sm text-gray-600 leading-relaxed">
                您可以输入具体的生成要求（例如：“语气委婉一点”、“强调价格谈判”），或者直接点击生成。
            </div>
            <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#927FFF] resize-none h-32 transition-colors placeholder:text-gray-400"
                placeholder="请输入提示词（可选）..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
            />
        </div>
    </Modal>
  );
};
