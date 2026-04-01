
import React, { useState } from 'react';
import { Loader2, Sparkles, Check } from 'lucide-react';
import { ApiService } from '../../../api/api-service';

export const BatchFillConfigCard = ({ data, messageId, onUpdate, addAiMessage }: any) => {
    const [selectedFields, setSelectedFields] = useState<string[]>(['minutes', 'todos', 'plan']);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(data.hasGenerated || false);

    const handleGenerate = async () => { 
        if (selectedFields.length === 0) return; 
        setIsGenerating(true); 
        const itemsToProcess = data.items.map((item: any) => ({ id: item.id, context: item })); 
        try { 
            const updatesPerId: Record<string, any> = {}; 
            for (const field of selectedFields) { 
                const results = await ApiService.batchGenerateVisitRecordField(itemsToProcess, field, prompt); 
                results.forEach(r => { 
                    if (!updatesPerId[r.id]) updatesPerId[r.id] = { ...itemsToProcess.find((i: any) => i.id === r.id).context }; 
                    updatesPerId[r.id][field] = r.value; 
                }); 
            } 
            const generatedItems = Object.values(updatesPerId); 
            setIsGenerating(false); 
            setHasGenerated(true); 
            onUpdate(messageId, { ...data, hasGenerated: true }); 
            addAiMessage({ 
                id: Date.now().toString(), 
                role: 'ai', 
                content: `已完成 ${data.count} 条数据的字段填充，请点击下方卡片查看结果：`, 
                type: 'card', 
                cardData: { _type: 'BATCH_FILL_RESULT', count: data.count, items: generatedItems, fields: selectedFields } 
            }); 
        } catch (e) { 
            setIsGenerating(false); 
            console.error(e); 
        } 
    };

    return (
        <div className="w-full max-w-[310px] my-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#F9FAFB] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="text-sm font-bold text-gray-800">批量填充配置</div>
                <div className="text-xs text-gray-500">已选 {data.count} 条</div>
            </div>
            <div className="p-4 space-y-4">
                <div>
                    <div className="text-xs font-bold text-gray-700 mb-2">1. 选择填充字段</div>
                    <div className="flex flex-wrap gap-2">
                        {['minutes', 'todos', 'plan'].map(key => (
                            <button 
                                key={key} 
                                onClick={() => !hasGenerated && setSelectedFields(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])} 
                                disabled={hasGenerated} 
                                className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${selectedFields.includes(key) ? 'bg-[#F4F2FF] border-[#927FFF] text-[#6265F0]' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                {selectedFields.includes(key) && <Check size={10} />}
                                {key === 'minutes' ? '会议纪要' : key === 'todos' ? '待办事项' : '后续计划'}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-700 mb-2 flex justify-between items-center">2. 输入填充要求 (可选)</div>
                    <textarea 
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)} 
                        disabled={hasGenerated} 
                        placeholder="例如：语气委婉一点，强调价格..." 
                        className="w-full border border-gray-200 rounded p-2 text-xs h-20 resize-none focus:outline-none focus:border-[#927FFF] transition-colors" 
                    />
                </div>
                <button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || hasGenerated || selectedFields.length === 0} 
                    className="w-full bg-[#927FFF] hover:bg-[#7466CC] text-white py-2 rounded text-xs font-medium shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {hasGenerated ? '已生成' : '开始批量填充'}
                </button>
            </div>
        </div>
    );
};
