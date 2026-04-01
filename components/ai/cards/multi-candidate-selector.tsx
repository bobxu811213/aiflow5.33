
import React, { useState } from 'react';
import { Sparkles, Loader2, CheckSquare, Square, Building2, Briefcase, Layers, Clock, Network } from 'lucide-react';
import { ApiService } from '../../../api/api-service';

export const MultiCandidateSelector = ({ candidates, onConfirm }: any) => {
    const [items, setItems] = useState(candidates.map((c: any) => ({ ...c, checked: true, originalName: c.name })));
    const [confirmedOnce, setConfirmedOnce] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState<Record<number, boolean>>({});

    const toggleCheck = (index: number) => setItems((prev: any[]) => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
    const handleNameChange = (index: number, newName: string) => setItems((prev: any[]) => prev.map((item, i) => i === index ? { ...item, name: newName } : item));
    const handleConfirmClick = () => { setConfirmedOnce(true); onConfirm(items.filter((i: any) => i.checked)); };
    const handleAiSuggest = async (index: number) => {
        const item = items[index];
        setLoadingSuggestions(prev => ({ ...prev, [index]: true }));
        try {
            const context = items.map((i: any) => `${i.type}: ${i.name}`);
            const suggestion = await ApiService.getAiSuggestion(item.name, context, item.type);
            if (suggestion) handleNameChange(index, suggestion);
        } catch (e) { console.error(e); } finally { setLoadingSuggestions(prev => ({ ...prev, [index]: false })); }
    };

    return (
        <div className="flex flex-col gap-2 mt-2 max-w-[90%] bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Sparkles size={12} className="text-[#927FFF]" /> 检测到您可能想要创建以下内容，请勾选并确认：</div>
            <div className="space-y-2">
                {items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-100 hover:border-primary/20 transition-colors">
                        <div className={`cursor-pointer ${item.checked ? 'text-primary' : 'text-gray-400'}`} onClick={() => toggleCheck(index)}>{item.checked ? <CheckSquare size={16} /> : <Square size={16} />}</div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs shrink-0 font-medium ${item.type === 'ORG' ? 'bg-purple-100 text-purple-600' : item.type === 'POSITION' ? 'bg-orange-100 text-orange-600' : item.type === 'DUTY' ? 'bg-teal-100 text-teal-600' : item.type === 'CATEGORY' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            {item.type === 'ORG' ? <Building2 size={14} /> : item.type === 'POSITION' ? <Briefcase size={14} /> : item.type === 'DUTY' ? <Layers size={14} /> : item.type === 'RETRO_RULE' ? <Clock size={14} /> : <Network size={14} />}
                            {item.type === 'ORG' ? '创建组织' : item.type === 'POSITION' ? '创建职位' : item.type === 'DUTY' ? '创建职务' : item.type === 'RETRO_RULE' ? '创建规则' : '创建分类'}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center gap-2 relative">
                             <input type="text" value={item.name} onChange={(e) => handleNameChange(index, e.target.value)} className="w-full text-xs border-b border-gray-300 bg-transparent py-1 pr-6 focus:outline-none focus:border-primary transition-colors text-gray-700" placeholder="名称" />
                             <div className="absolute right-0 bottom-1.5">{loadingSuggestions[index] ? <Loader2 size={12} className="text-primary animate-spin" /> : <div onClick={() => handleAiSuggest(index)} className="cursor-pointer"><Sparkles size={12} className="text-gray-300 hover:text-[#927FFF] transition-colors" /></div>}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-gray-100 mt-1 gap-2">
                <button onClick={handleConfirmClick} disabled={items.filter((i: any) => i.checked).length === 0} className="bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-1">{confirmedOnce ? `重新创建` : `确认创建`}</button>
            </div>
        </div>
    );
};
