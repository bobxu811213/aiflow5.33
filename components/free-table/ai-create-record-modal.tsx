
import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Sparkles, Loader2 } from 'lucide-react';
import { ApiService } from '../../api/api-service';

interface AiCreateRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (data: any) => void;
}

export const AiCreateRecordModal: React.FC<AiCreateRecordModalProps> = ({ isOpen, onClose, onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
      if (!prompt.trim()) return;
      setIsGenerating(true);
      try {
          const data = await ApiService.parseVisitRecordFromText(prompt);
          onGenerated(data);
          onClose();
          setPrompt(''); // Reset
      } catch (e) {
          console.error(e);
      } finally {
          setIsGenerating(false);
      }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
          <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#927FFF]" />
              <span className="font-bold text-gray-800">AI 智能新增记录</span>
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
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
                className="px-4 py-1.5 rounded text-sm bg-[#927FFF] text-white hover:bg-[#7466CC] shadow-sm transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isGenerating ? <Loader2 size={14} className="animate-spin mr-1" /> : <Sparkles size={14} className="mr-1" />}
                {isGenerating ? '正在生成...' : '开始生成'}
            </button>
        </div>
      }
    >
        <div className="space-y-4 px-1">
            <div className="text-sm text-gray-600 leading-relaxed bg-[#F4F2FF] border border-[#E3DFFF] p-3 rounded-md">
                <span className="font-bold text-[#6265F0] mr-1">提示：</span>
                您可以直接输入会议内容、客户信息，AI 将自动提取并填入到新建的记录中。
            </div>
            
            <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#927FFF] focus:ring-1 focus:ring-[#927FFF]/20 resize-none h-40 transition-colors placeholder:text-gray-400 leading-relaxed"
                placeholder="例如：昨天下午去了腾讯大厦，和张总沟通了关于云服务续费的事情。他们对价格有些疑虑，希望我们给个9折优惠。下周一我需要发一份新的报价单过去。"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
                disabled={isGenerating}
            />
        </div>
    </Modal>
  );
};
