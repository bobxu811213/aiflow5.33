
import React from 'react';
import { Sparkles, FileText, CheckSquare, Square, Loader2, CheckCircle2, X, Lightbulb } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { IAiMessage, IAiCandidate, IAttachment } from '../../types';
import { formatSize } from './utils';
import { MultiCandidateSelector } from './cards/multi-candidate-selector';
import { MessageCardRenderer } from './message-card-renderer';
import { ThinkingAnimation } from './thinking-animation';

interface ChatMessageListProps {
    messages: IAiMessage[];
    isTyping: boolean;
    setIsTyping?: (isTyping: boolean) => void;
    onImagePreview: (img: string) => void;
    onAttachmentClick: (att: IAttachment) => void;
    onCandidatesConfirm: (candidates: IAiCandidate[]) => void;
    selectedOptions: string[];
    toggleOption: (opt: string) => void;
    onMultiConfirm: () => void;
    // Props for Card Renderer
    onBatchApply?: (data: any[]) => void;
    onUpdateCardData: (messageId: string, newData: any) => void;
    onCardClick: (data: any) => void;
    onViewDetail?: (item: any, messageId: string, index: number) => void;
    onApplyChange?: (data: any) => void;
    onLocateIssue?: (quote: string) => void;
    onApplyComplianceFix?: (issue: any, messageId: string, issueIndex: number, prompt?: string) => void;
    onBatchOverrideConfirm?: (selectedIds: string[], overrideMessageId?: string, overrideCardData?: any) => void;
    addAiMessage: (msg: any) => void;
    // Refs for scrolling
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    pendingPerfBatch?: any;
    onShowBatchOverrideConfirm?: () => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
    messages,
    isTyping,
    setIsTyping,
    onImagePreview,
    onAttachmentClick,
    onCandidatesConfirm,
    selectedOptions,
    toggleOption,
    onMultiConfirm,
    onBatchApply,
    onUpdateCardData,
    onCardClick,
    onViewDetail,
    onApplyChange,
    onLocateIssue,
    onApplyComplianceFix,
    onBatchOverrideConfirm,
    addAiMessage,
    messagesEndRef,
    pendingPerfBatch,
    onShowBatchOverrideConfirm
}) => {
    return (
        <div className={`flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide bg-[#F7F8FA] relative`}>
            <AnimatePresence initial={false}>
                {messages.filter(msg => msg.type !== 'thinking').map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden', transition: { duration: 0.3, ease: "easeInOut" } }}
                        className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`flex flex-col w-full max-w-[95%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`flex w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {msg.role === 'ai' && (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E16AF3] to-[#6265F0] flex items-center justify-center text-white shrink-0 mx-2 shadow-sm mt-1">
                                        <Sparkles size={10} />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1 w-full">
                                    {(msg.images && msg.images.length > 0) && <div className={`flex flex-wrap gap-2 mb-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>{msg.images.map((img, idx) => <div key={`img-${idx}`} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-zoom-in group/image bg-white" onClick={() => onImagePreview(img)}><img src={img} alt={`uploaded-${idx}`} className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105" /></div>)}</div>}
                                    {msg.attachments && msg.attachments.length > 0 && <div className={`flex flex-wrap gap-2 mb-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>{msg.attachments.map((att, idx) => <div key={`att-${idx}`} className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm gap-2 max-w-[200px] cursor-pointer hover:bg-gray-50 hover:border-[#927FFF]/30 transition-colors" title={att.name} onClick={() => onAttachmentClick(att)}><div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0"><FileText size={16} /></div><div className="flex-1 min-w-0 overflow-hidden"><div className="text-xs font-medium text-gray-700 truncate">{att.name}</div><div className="text-[10px] text-gray-400">{formatSize(att.size)}</div></div></div>)}</div>}
                                    {(!msg.type || msg.role === 'user') && msg.content && <div className={`px-3 py-2 text-xs rounded-xl shadow-sm break-words w-fit ${msg.role === 'user' ? 'bg-gradient-to-br from-[#E16AF3] to-[#6265F0] text-white rounded-tr-none self-end' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 self-start'}`}>{msg.content}</div>}
                                    {msg.role === 'ai' && msg.type && msg.content && <div className={`px-3 py-2 text-xs rounded-xl shadow-sm break-words bg-white text-gray-800 rounded-tl-none border border-gray-100 mb-1 w-fit self-start`}>{msg.content}</div>}
                                </div>
                            </div>
                        </div>
                        {msg.type === 'multi_candidates' && msg.candidates && <MultiCandidateSelector candidates={msg.candidates} onConfirm={onCandidatesConfirm} />}
                        {msg.type === 'options' && msg.options && <div className="flex flex-col gap-2 mt-2 max-w-[85%] bg-white p-3 rounded-lg border border-gray-200 shadow-sm"><div className="flex flex-wrap gap-2">{msg.options.map(opt => <div key={opt} onClick={() => toggleOption(opt)} className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs cursor-pointer transition-all select-none ${selectedOptions.includes(opt) ? 'bg-[#927FFF]/10 border-[#927FFF] text-[#927FFF] font-medium' : 'bg-white border-gray-200 text-gray-600 hover:border-[#927FFF]/50'}`}>{selectedOptions.includes(opt) ? <CheckSquare size={14} /> : <Square size={14} />}{opt}</div>)}</div><div className="flex justify-end pt-2 border-t border-gray-100 mt-1"><button onClick={onMultiConfirm} disabled={selectedOptions.length === 0} className="bg-gradient-to-br from-[#E16AF3] to-[#6265F0] text-white text-xs px-3 py-1.5 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">确认选择</button></div></div>}
                        {msg.type === 'card' && msg.cardData && (
                            <div className="w-full">
                                <MessageCardRenderer 
                                    data={msg.cardData} 
                                    messageId={msg.id}
                                    onBatchApply={onBatchApply}
                                    onUpdateCardData={onUpdateCardData}
                                    onCardClick={onCardClick}
                                    onViewDetail={onViewDetail}
                                    onApplyChange={onApplyChange}
                                    onLocateIssue={onLocateIssue}
                                    onApplyComplianceFix={onApplyComplianceFix}
                                    onBatchOverrideConfirm={onBatchOverrideConfirm}
                                    addAiMessage={addAiMessage}
                                    setIsTyping={setIsTyping}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
            {pendingPerfBatch && onBatchApply && !isTyping && <div className="px-4 pb-2 bg-[#F7F8FA]"><div className="bg-white p-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#927FFF]/20 flex items-center gap-4 animate-in slide-in-from-bottom-2 fade-in duration-300"><div className="flex-1 text-xs text-[#6265F0] flex items-center font-medium pl-1"><Sparkles size={14} className="mr-2 text-[#927FFF]" /><span>{pendingPerfBatch.count} 项指标可优化</span></div><button onClick={onShowBatchOverrideConfirm} className="text-xs bg-[#6265F0] text-white px-3 py-1.5 rounded-lg hover:bg-[#5054D6] shadow-sm transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap"><CheckCircle2 size={14} />一键选择</button></div></div>}
            <div ref={messagesEndRef} />
        </div>
    );
};
