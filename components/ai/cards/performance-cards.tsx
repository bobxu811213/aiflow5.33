
import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles, Loader2, Maximize2, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../../store/use-app-store';
import { ApiService } from '../../../api/api-service';

export const PerformanceBatchOverrideCard = ({ data, messageId, onBatchApply, onConfirm }: any) => {
    const items = data.items || [];
    const [selectedIds, setSelectedIds] = useState<string[]>(() => items.map((i: any) => i.id));
    const [isApplied, setIsApplied] = useState(data.isApplied || false);

    useEffect(() => {
        if (data.isApplied !== undefined) setIsApplied(data.isApplied);
    }, [data.isApplied]);

    useEffect(() => {
        if (selectedIds.length === 0 && items.length > 0 && !isApplied && !data.isApplied) setSelectedIds(items.map((i: any) => i.id));
    }, [items.length]);

    const toggleId = (id: string) => {
        if (isApplied) return;
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleConfirmOverride = () => {
        const selectedItems = items.filter((i: any) => selectedIds.includes(i.id));
        const finalItems = selectedItems.map((item: any) => {
                let newItem = { ...item };
                if (item.aiSuggestion) {
                    newItem = { ...item, desc: item.aiSuggestion.description, meta: { ...item.meta, target: item.aiSuggestion.targetValue }, remarks: item.aiSuggestion.remarks, _modified: true, aiIssue: null, aiSuggestion: null };
                }
                return { id: newItem.id, code: newItem.code, name: newItem.title, description: newItem.desc, weight: newItem.meta.weight, targetValue: newItem.meta.target, remarks: newItem.remarks };
        });
        if (onBatchApply) onBatchApply(finalItems);
        setIsApplied(true);
        onConfirm(messageId, data, selectedIds);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-0 w-full max-w-[310px] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-800 text-sm">批量覆盖确认</span>
                <span className="text-xs text-gray-500">{selectedIds.length}/{items.length}</span>
            </div>
            <div className="max-h-[200px] overflow-y-auto p-2 scrollbar-hide">
                {items.map((item: any) => (
                    <div key={item.id} className={`flex items-start gap-2 p-2 rounded transition-colors ${isApplied ? 'cursor-default opacity-80' : 'hover:bg-gray-50 cursor-pointer'}`} onClick={() => !isApplied && toggleId(item.id)}>
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedIds.includes(item.id) ? (isApplied ? 'bg-gray-400 border-gray-400' : 'bg-[#927FFF] border-[#927FFF]') : 'border-gray-300 bg-white'}`}>
                            {selectedIds.includes(item.id) && <Check size={10} className="text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold truncate ${isApplied ? 'text-gray-500' : 'text-gray-800'}`}>{item.title}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">{item.code}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button onClick={handleConfirmOverride} disabled={selectedIds.length === 0 || isApplied} className={`w-full text-xs py-2 rounded shadow-sm transition-colors font-medium flex items-center justify-center gap-1 ${isApplied ? 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-[#927FFF] hover:bg-[#7466CC] text-white'}`}>
                    {isApplied ? <><Check size={12} /> 已覆盖</> : '一键覆盖'}
                </button>
            </div>
        </div>
    );
};

export const PerformanceCard = ({ item, onUpdate, onApply, onViewDetail, isOtherProcessing, onProcessing }: any) => {
    const [isAdjusting, setIsAdjusting] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [isApplied, setIsApplied] = useState(item._applied || false);
    
    // Connect to global highlighting
    const { activeHighlightId, setActiveHighlightId } = useAppStore();
    const cardRef = useRef<HTMLDivElement>(null);
    const isHighlighted = activeHighlightId === item.id;

    useEffect(() => {
        if (isHighlighted && cardRef.current) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [isHighlighted]);

    useEffect(() => {
        if (item._modified && !item._applied) setIsApplied(false);
        if (item._applied) setIsApplied(true);
    }, [item._modified, item._applied]);

    const notifyProcessing = (status: boolean) => { setLoading(status); if (onProcessing) onProcessing(status); };
    const handleAdjust = async () => {
        if (!prompt.trim()) return;
        notifyProcessing(true);
        try {
            const newData = await ApiService.adjustPerformanceIndicator(item, prompt);
            onUpdate({ ...newData, _applied: false });
            setIsAdjusting(false);
            setPrompt('');
        } catch (e) { console.error(e); } finally { notifyProcessing(false); }
    };
    const handleAutoAdjust = async () => {
        notifyProcessing(true);
        try {
            if (item.aiSuggestion) {
                await new Promise(resolve => setTimeout(resolve, 800));
                const newData = { ...item, desc: item.aiSuggestion.description, meta: { ...item.meta, target: item.aiSuggestion.targetValue }, remarks: item.aiSuggestion.remarks, _modified: true, aiIssue: null, _applied: true };
                if (onApply) onApply(newData);
                onUpdate(newData);
                setIsApplied(true);
            } else if (item.aiIssue) {
                const newData = await ApiService.adjustPerformanceIndicator(item, `请解决：${item.aiIssue}`);
                onUpdate({ ...newData, _applied: false });
            } else {
                await new Promise(resolve => setTimeout(resolve, 800));
                const newData = { ...item, _applied: true };
                if (onApply) onApply(newData);
                onUpdate(newData);
                setIsApplied(true);
            }
        } catch (e) { console.error(e); } finally { notifyProcessing(false); }
    };
    const handleApply = async () => { if (onApply) { await onApply(item); setIsApplied(true); onUpdate({ ...item, _applied: true }); } };

    const suggestion = item.aiSuggestion;
    return (
        <div ref={cardRef} onClick={() => setActiveHighlightId(item.id)} className={`bg-white p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer mb-3 ${isHighlighted ? "ring-2 ring-primary shadow-[0_0_15px_rgba(38,194,164,0.3)] border-primary scale-[1.02] z-10" : (isApplied ? "border-[#B7EB8F] bg-[#F6FFEC]/20 hover:shadow-md" : "border-gray-100 shadow-sm hover:shadow-md")}`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isApplied ? 'bg-[#52C41A]' : 'bg-[#927FFF]'}`}></div>
            {isApplied && <div className="absolute top-0 right-0 bg-[#52C41A] text-white text-[10px] px-2 py-1 rounded-bl-lg z-20 font-bold">已采纳</div>}
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                    <div className="font-bold text-gray-800 text-sm flex items-center gap-2">{item.title} {isHighlighted && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">选中</span>}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{item.code}</div>
                </div>
                <div className="flex gap-2 items-center"><div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); if (onViewDetail) onViewDetail(item); }}><Maximize2 size={14} /></div></div>
            </div>
            <div className="space-y-3">
                <div>
                    <div className="text-xs text-gray-400 mb-1">目标值</div>
                    <div className={`text-xs p-3 rounded-lg border leading-relaxed ${suggestion ? 'bg-[#F9F7FF] border-[#E3DFFF]' : 'bg-gray-50 border-gray-100 text-gray-600 font-medium'}`}>
                        {suggestion ? <><div className="flex items-center gap-1.5 text-[#927FFF] mb-2 font-bold select-none justify-between"><div className="flex items-center gap-1.5"><Sparkles size={12} className="fill-[#927FFF]/20" /> AI 优化建议</div>{suggestion.targetReason && <span className="text-[10px] bg-white text-[#927FFF] border border-[#927FFF]/20 px-1.5 py-0.5 rounded shadow-sm font-normal">{suggestion.targetReason}</span>}</div><div className="text-gray-900 font-medium">{suggestion.targetValue}</div></> : item.meta.target || '暂无目标'}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-400 mb-1">指标说明</div>
                    <div className={`text-xs px-3 py-2 rounded-lg border leading-relaxed text-justify overflow-y-auto max-h-[128px] relative ${suggestion ? 'bg-[#F9F7FF] border-[#E3DFFF]' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                        {suggestion ? <><div className="sticky top-0 z-10 flex items-center gap-1.5 text-[#927FFF] mb-1 font-bold select-none justify-between bg-[#F9F7FF] py-1 border-b border-[#E3DFFF]/30"><div className="flex items-center gap-1.5"><Sparkles size={12} className="fill-[#927FFF]/20" /> AI 优化建议</div>{suggestion.descReason && <span className="text-[10px] bg-white text-[#927FFF] border border-[#927FFF]/20 px-1.5 py-0.5 rounded shadow-sm font-normal">{suggestion.descReason}</span>}</div><div className="text-gray-800 pt-1">{suggestion.description}</div></> : <div className="py-1">{item.desc || '暂无描述'}</div>}
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-0">
                    {!isAdjusting ? (
                        <div className="flex gap-3">
                             {item._modified ? (
                                <><button onClick={(e) => { e.stopPropagation(); setIsAdjusting(true); }} disabled={loading || isOtherProcessing} className="flex-1 flex items-center justify-center text-xs text-[#927FFF] border border-[#927FFF]/30 bg-white hover:bg-[#F4F2FF] px-2 py-2 rounded-lg transition-colors disabled:opacity-50"><Sparkles size={14} className="mr-1.5" /> 继续调整</button><button onClick={(e) => { e.stopPropagation(); handleApply(); }} disabled={isApplied || loading || isOtherProcessing} className={`flex-1 flex items-center justify-center text-xs px-2 py-2 rounded-lg transition-colors shadow-sm text-white font-medium ${isApplied ? 'bg-gray-400 cursor-default' : 'bg-[#26C2A4] hover:bg-[#1DA58D]'}`}>{isApplied ? <><Check size={14} className="mr-1.5" /> 已采纳</> : <><CheckCircle2 size={14} className="mr-1.5" /> 采纳建议</>}</button></>
                             ) : (
                                <><button onClick={(e) => { e.stopPropagation(); setIsAdjusting(true); }} disabled={loading || isOtherProcessing} className="flex-1 flex items-center justify-center text-xs text-[#927FFF] border border-[#927FFF]/30 bg-white hover:bg-[#F4F2FF] px-2 py-2 rounded-lg transition-colors disabled:opacity-50"><Sparkles size={14} className="mr-1.5" /> 自定义调整</button><button onClick={(e) => { e.stopPropagation(); handleAutoAdjust(); }} disabled={loading || isOtherProcessing} className="flex-[1.5] flex items-center justify-center text-xs bg-[#927FFF] text-white hover:bg-[#7466CC] px-2 py-2 rounded-lg transition-colors shadow-sm whitespace-nowrap disabled:opacity-60">{loading ? <Loader2 size={14} className="animate-spin mr-1.5" /> : (suggestion ? <ArrowUpRight size={14} className="mr-1.5" /> : <Zap size={14} className="mr-1.5" />)}{suggestion ? '按照AI建议直接调整' : '直接调整'}</button></>
                             )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-[#927FFF] shadow-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="输入调整要求..." className="w-full text-xs border-none outline-none resize-none h-20 p-3 bg-transparent placeholder:text-gray-400 text-gray-700 block" autoFocus />
                            <div className="flex justify-end gap-2 p-2 bg-gray-50 border-t border-gray-100">
                                <button onClick={() => setIsAdjusting(false)} className="text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded hover:bg-gray-200">取消</button>
                                <button onClick={handleAdjust} disabled={loading || !prompt.trim()} className="text-xs bg-[#B8ACFF] text-white px-3 py-1.5 rounded hover:bg-[#927FFF] disabled:opacity-50 flex items-center shadow-sm">{loading ? <Loader2 size={12} className="animate-spin mr-1" /> : <Sparkles size={12} className="mr-1" />}生成调整</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};
