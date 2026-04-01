
import React from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { IAiHistoryItem } from '../../types';

interface ChatHistoryPanelProps {
    history: IAiHistoryItem[];
    currentSessionId: string;
    onRestore: (item: IAiHistoryItem) => void;
}

export const ChatHistoryPanel: React.FC<ChatHistoryPanelProps> = ({ history, currentSessionId, onRestore }) => {
    return (
        <div className="h-full overflow-y-auto p-4 scrollbar-hide">
            <h3 className="text-xs font-bold text-gray-500 mb-3 px-1">生成记录 ({history.length})</h3>
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm"><Clock size={24} className="mb-2 opacity-50"/>暂无历史记录</div>
            ) : (
                <div className="space-y-3">
                    {history.map(item => {
                        const theme = item.prompt.length > 20 ? item.prompt.substring(0, 20) + '...' : item.prompt;
                        return (
                        <div key={item.id} onClick={() => onRestore(item)} className={`bg-white p-3 rounded-lg border shadow-sm hover:border-primary hover:shadow-md cursor-pointer transition-all group ${currentSessionId === item.id ? 'border-primary bg-primary-light/5' : 'border-gray-100'}`}>
                            <div className="flex justify-between items-center mb-2"><span className="font-bold text-gray-800 text-sm truncate max-w-[150px]" title={item.prompt}>{theme}</span><span className="text-[10px] text-gray-400">{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                            <div className="bg-gray-50 rounded-md p-2 flex items-center gap-3 border border-gray-100 group-hover:bg-primary-light/10 transition-colors">
                                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-indigo-100 text-indigo-600"><MessageSquare size={16} /></div>
                                <div className="flex-1 min-w-0"><div className="text-xs font-bold text-gray-700 truncate">{item.businessType}</div></div>
                            </div>
                        </div>
                    )})}
                </div>
            )}
        </div>
    );
};
