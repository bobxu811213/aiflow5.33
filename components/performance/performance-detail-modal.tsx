
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import { IPerformanceIndicator } from '../../types';
import { Target, Sparkles, Check, ArrowLeft, Quote, Loader2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ApiService } from '../../api/api-service';

interface PerformanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IPerformanceIndicator | null;
  aiSuggestion?: any; // New prop for AI suggestion content
  onUpdate?: (data: IPerformanceIndicator) => void;
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export const PerformanceDetailModal: React.FC<PerformanceDetailModalProps> = ({ 
    isOpen, 
    onClose, 
    data, 
    aiSuggestion,
    onUpdate, 
    onPrev, 
    onNext, 
    disablePrev, 
    disableNext 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<any>(null);
  const [localData, setLocalData] = useState<IPerformanceIndicator | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [hasRegenerated, setHasRegenerated] = useState(false);

  // Initialize data when modal opens
  useEffect(() => {
    if (isOpen && data) {
         setLocalData({
             ...data,
             targetValue: data.targetValue,
             description: data.description,
             remarks: data.remarks
         });
         
         // Dynamically load suggestion from prop, or fallback to null/empty if none provided
         if (aiSuggestion) {
             setCurrentSuggestion(aiSuggestion);
         } else {
             setCurrentSuggestion(null);
         }
         
         setPrompt('');
         setIsLoading(false);
         setIsAdjusting(false);
         setHasRegenerated(false);
    }
  }, [isOpen, data, aiSuggestion]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;

        // Don't trigger navigation if user is typing in an input or textarea
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return;
        }

        if (e.key === 'ArrowLeft' && onPrev && !disablePrev) {
            onPrev();
        } else if (e.key === 'ArrowRight' && onNext && !disableNext) {
            onNext();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrev, onNext, disablePrev, disableNext]);

  if (!localData || !data) return null;

  const handleRegenerate = async () => {
      if (!prompt.trim()) return;
      setIsLoading(true);
      try {
           const tempItem = {
               id: localData.id,
               title: localData.name,
               desc: localData.description,
               meta: { target: localData.targetValue }
           };
           const result = await ApiService.adjustPerformanceIndicator(tempItem, prompt);
           setCurrentSuggestion({
               targetValue: result.meta.target,
               targetReason: "符合SMART原则",
               description: result.desc,
               descReason: "表述更精简",
               remarks: result.remarks || "建议定期回顾指标执行情况，并根据业务变化进行动态调整。",
               remarksReason: "补充执行建议"
           });
           setPrompt('');
           setIsAdjusting(false); 
           setHasRegenerated(true);
      } catch (e) {
          console.error(e);
      } finally {
          setIsLoading(false);
      }
  };

  const handleApplyAndSave = () => {
      if (!currentSuggestion || !localData) return;
      const updatedData = {
          ...localData,
          targetValue: currentSuggestion.targetValue,
          description: currentSuggestion.description,
          remarks: currentSuggestion.remarks
      };
      setLocalData(updatedData);
      if (onUpdate) {
          onUpdate(updatedData);
      }
      
      // Navigate to next if available, otherwise close
      if (onNext && !disableNext) {
          onNext();
      } else {
          onClose();
      }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900">{data.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono border border-gray-200">{data.code}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-medium border border-blue-100">权重 {data.weight}%</span>
            </div>
            {(onPrev || onNext) && (
                <div className="flex items-center gap-3 ml-auto">
                     <span className="text-[10px] text-gray-400 font-normal">支持键盘 ← → 切换</span>
                     <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 items-center h-8">
                         <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); onPrev?.(); }} 
                            disabled={disablePrev} 
                            className="h-full px-2 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none text-gray-600 flex items-center justify-center"
                            title="上一个 (←)"
                         >
                            <ChevronLeft size={16} />
                         </button>
                         <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                         <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); onNext?.(); }} 
                            disabled={disableNext} 
                            className="h-full px-2 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none text-gray-600 flex items-center justify-center"
                            title="下一个 (→)"
                         >
                            <ChevronRight size={16} />
                         </button>
                     </div>
                </div>
            )}
        </div>
      }
      width="w-[1000px]"
      zIndex="z-[60]"
      noContentPadding
      footer={
        <div className="w-full flex flex-col gap-4">
            {currentSuggestion && (
                <div className="flex justify-between items-center w-full pt-1">
                    <div className="text-xs text-gray-400 flex items-center">
                        <Sparkles size={14} className="mr-1 text-[#927FFF]" />
                        AI 内容仅供参考，请结合实际业务情况使用
                    </div>
                    
                    {!isAdjusting ? (
                       <div className="flex gap-4">
                            <button
                               onClick={() => setIsAdjusting(true)}
                               className="px-6 py-2.5 bg-white border border-[#927FFF] text-[#927FFF] rounded-md shadow-sm text-sm font-medium hover:bg-[#F4F2FF] transition-colors flex items-center gap-2"
                            >
                               <Sparkles size={16} />
                               自定义调整
                            </button>
                            <button
                               onClick={handleApplyAndSave}
                               className="px-6 py-2.5 bg-[#7B61FF] hover:bg-[#6A50E8] text-white rounded-md shadow-md text-sm font-medium flex items-center gap-2 transition-all active:scale-[0.98]"
                            >
                               {hasRegenerated ? <Check size={16} /> : <ArrowRight size={16} />}
                               {hasRegenerated 
                                    ? '采纳建议' 
                                    : (!disableNext ? '按照 AI 建议直接调整并跳转下一条' : '按照 AI 建议直接调整')
                               }
                            </button>
                       </div>
                   ) : (
                       <div className="bg-white p-2 rounded-lg border border-[#7B61FF]/20 shadow-sm animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2 w-full max-w-xl ml-auto">
                           <textarea
                               value={prompt}
                               onChange={e => setPrompt(e.target.value)}
                               placeholder="输入调整要求（例如：目标调高20%，描述更精简）..."
                               className="flex-1 text-sm border-none outline-none resize-none h-10 py-2 bg-transparent placeholder:text-gray-400 text-gray-700"
                               autoFocus
                           />
                           <div className="flex gap-2 shrink-0 border-l border-gray-100 pl-2">
                               <button onClick={() => setIsAdjusting(false)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors whitespace-nowrap">取消</button>
                               <button onClick={handleRegenerate} disabled={isLoading || !prompt.trim()} className="text-xs bg-[#7B61FF] text-white px-4 py-1.5 rounded hover:bg-[#6A50E8] flex items-center gap-1.5 disabled:opacity-50 shadow-sm whitespace-nowrap">
                                   {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                   生成调整
                               </button>
                           </div>
                       </div>
                   )}
                </div>
            )}
            
            <div className="flex justify-end pt-3 border-t border-gray-100">
                <button onClick={onClose} className="px-6 py-1.5 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
                    关闭
                </button>
            </div>
        </div>
      }
    >
      <div className="flex flex-col h-full bg-white relative">
          
          {/* Sticky Header */}
          <div className="sticky top-0 bg-white z-20 px-6 pt-6 pb-4 border-b border-gray-100 grid grid-cols-2 gap-6 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
               <div className="flex items-center gap-2 text-gray-800 font-bold pl-1 border-l-4 border-gray-800">
                   指标信息
               </div>
               <div className="flex items-center gap-2 text-[#7B61FF] font-bold border-l-4 border-[#7B61FF] pl-2">
                   AI 优化建议
               </div>
          </div>

          {/* Scrollable Aligned Grid */}
          <div className="p-6 grid grid-cols-2 gap-6 bg-white">
                
                {/* Target Value Row */}
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-500 font-bold">目标值</div>
                    <div className="text-sm font-bold text-gray-800 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm leading-relaxed h-full">
                        {localData.targetValue}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {currentSuggestion ? (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-[#7B61FF] font-bold">目标值</div>
                                <div className="text-[10px] text-[#7B61FF] bg-[#fff] border border-[#7B61FF]/20 px-2 py-0.5 rounded shadow-sm">
                                    {currentSuggestion.targetReason}
                                </div>
                            </div>
                            <div className="text-sm font-bold text-gray-800 p-4 bg-[#F5F3FF] border border-[#7B61FF]/30 rounded-lg shadow-sm leading-relaxed h-full">
                                {currentSuggestion.targetValue}
                            </div>
                        </>
                    ) : <div className="h-full bg-gray-50/50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">暂无优化建议</div>}
                </div>

                {/* Description Row */}
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-500 font-bold">指标说明</div>
                    <div className="text-xs text-gray-600 leading-relaxed p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap text-justify shadow-sm h-full">
                        {localData.description}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {currentSuggestion ? (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-[#7B61FF] font-bold">指标说明</div>
                                <div className="text-[10px] text-[#7B61FF] bg-[#fff] border border-[#7B61FF]/20 px-2 py-0.5 rounded shadow-sm">
                                    {currentSuggestion.descReason}
                                </div>
                            </div>
                            <div className="text-xs text-gray-700 leading-relaxed p-4 bg-[#F5F3FF] border border-[#7B61FF]/30 rounded-lg whitespace-pre-wrap text-justify shadow-sm h-full">
                                {currentSuggestion.description}
                            </div>
                        </>
                    ) : <div className="h-full bg-gray-50/50 border border-dashed border-gray-200 rounded-lg"></div>}
                </div>

                {/* Remarks Row */}
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-500 font-bold">备注</div>
                    <div className="text-xs text-gray-600 leading-relaxed p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap text-justify shadow-sm h-full">
                        {localData.remarks || '暂无备注'}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {currentSuggestion ? (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-[#7B61FF] font-bold">备注</div>
                                <div className="text-[10px] text-[#7B61FF] bg-[#fff] border border-[#7B61FF]/20 px-2 py-0.5 rounded shadow-sm">
                                    {currentSuggestion.remarksReason}
                                </div>
                            </div>
                            <div className="text-xs text-gray-700 leading-relaxed p-4 bg-[#F5F3FF] border border-[#7B61FF]/30 rounded-lg whitespace-pre-wrap text-justify shadow-sm h-full">
                                {currentSuggestion.remarks}
                            </div>
                        </>
                    ) : <div className="h-full bg-gray-50/50 border border-dashed border-gray-200 rounded-lg"></div>}
                </div>
          </div>
      </div>
    </Modal>
  );
};
