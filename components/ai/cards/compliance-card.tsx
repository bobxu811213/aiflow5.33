
import React, { useState } from 'react';
import { Check, CheckCircle2, Loader2, Sparkles, MapPin } from 'lucide-react';

export const ComplianceCard = ({ issue, index, onLocate, onApply, isProcessing, isFixed }: any) => {
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [prompt, setPrompt] = useState('');
    const getSeverityColor = (sev: string) => { switch(sev) { case 'HIGH': return 'border-l-[#FF4D4F]'; case 'MEDIUM': return 'border-l-[#FAAD14]'; default: return 'border-l-[#1677FF]'; } };
    const getSeverityLabel = (sev: string) => { switch(sev) { case 'HIGH': return <span className="text-[#FF4D4F] bg-[#FFF1F0] px-1.5 py-0.5 rounded text-[10px] border border-[#FFCCC7]">高风险</span>; case 'MEDIUM': return <span className="text-[#FAAD14] bg-[#FFFBE6] px-1.5 py-0.5 rounded text-[10px] border border-[#FFE58F]">建议优化</span>; default: return <span className="text-[#1677FF] bg-[#E6F4FF] px-1.5 py-0.5 rounded text-[10px] border border-[#91CAFF]">提示</span>; } };

    if (isFixed) return <div className="bg-[#F6FFEC] border border-[#B7EB8F] rounded-lg p-3 mb-3 flex items-center justify-between shadow-sm"><div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-[#52C41A] text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></div><div className="text-xs text-gray-600 font-medium line-through decoration-gray-400">{issue.description}</div></div><span className="text-[10px] text-[#52C41A] font-bold">已优化</span></div>;

    return (
        <div className={`bg-white rounded-lg border border-gray-100 shadow-sm mb-3 overflow-hidden border-l-4 ${getSeverityColor(issue.severity)}`}>
            <div className="p-3">
                <div className="flex justify-between items-start mb-2"><div className="font-bold text-gray-800 text-sm leading-tight flex-1 mr-2">{issue.description}</div>{getSeverityLabel(issue.severity)}</div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100 text-xs text-gray-600 mb-2 leading-relaxed"><span className="font-bold text-gray-700 mr-1">建议：</span>{issue.suggestion}</div>
                {!isCustomizing ? (
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <button onClick={() => onLocate(issue.quote)} className="text-xs text-gray-500 hover:text-primary flex items-center px-2 py-1 hover:bg-gray-50 rounded transition-colors"><MapPin size={12} className="mr-1" />定位</button>
                        <button onClick={() => setIsCustomizing(true)} disabled={isProcessing} className="text-xs text-[#927FFF] border border-[#927FFF]/20 hover:bg-[#F4F2FF] px-2 py-1 rounded transition-colors flex items-center disabled:opacity-60"><Sparkles size={12} className="mr-1" />自定义</button>
                        <button onClick={() => onApply()} disabled={isProcessing} className="text-xs bg-[#927FFF] text-white px-3 py-1 rounded hover:bg-[#7466CC] shadow-sm flex items-center transition-colors disabled:opacity-60">{isProcessing ? <Loader2 size={12} className="animate-spin mr-1"/> : <CheckCircle2 size={12} className="mr-1" />}一键优化</button>
                    </div>
                ) : (
                    <div className="mt-2 bg-[#F4F2FF] p-2 rounded border border-[#E3DFFF]">
                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="输入要求..." className="w-full text-xs border border-[#927FFF]/20 rounded p-2 mb-2 focus:border-[#927FFF] focus:outline-none resize-none h-16 bg-white" autoFocus />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => { setIsCustomizing(false); setPrompt(''); }} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100">取消</button>
                            <button onClick={() => onApply(prompt)} disabled={isProcessing} className="text-xs bg-[#927FFF] text-white px-3 py-1 rounded hover:bg-[#7466CC] flex items-center shadow-sm">{isProcessing ? <Loader2 size={10} className="animate-spin mr-1" /> : <Sparkles size={10} className="mr-1" />}确认修改</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
