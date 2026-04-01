import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, PenTool, Sparkles, Filter, Settings } from 'lucide-react';

interface FreeTableToolbarProps {
  totalCount: number;
  selectedCount: number;
  onSearch: (term: string) => void;
  onAddManual: () => void;
  onAddAi: () => void;
  onBatchAiFill: () => void;
}

export const FreeTableToolbar: React.FC<FreeTableToolbarProps> = ({
  totalCount,
  selectedCount,
  onSearch,
  onAddManual,
  onAddAi,
  onBatchAiFill
}) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (addBtnRef.current && !addBtnRef.current.contains(event.target as Node)) {
            setIsAddMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4 h-[64px]">
        <div className="flex items-center gap-4">
             <div className="font-bold text-[#262626] text-base shrink-0">客户拜访管理({totalCount})</div>
             
             <div className="relative hidden md:block group">
                 <input 
                    type="text" 
                    placeholder="搜索客户名称" 
                    className="border border-gray-300 rounded pl-9 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:border-primary placeholder:text-gray-400 transition-all"
                    onChange={(e) => onSearch(e.target.value)}
                 />
                 <Search size={16} className="absolute left-3 top-2 text-gray-400 group-focus-within:text-primary transition-colors" />
             </div>
        </div>
        
        <div className="flex items-center space-x-2 shrink-0">
             {selectedCount > 0 && (
                 <button 
                    className="bg-[#927FFF] hover:bg-[#7466CC] text-white px-3 py-1.5 rounded text-sm shadow-sm transition-colors flex items-center animate-in fade-in slide-in-from-right-2 duration-200"
                    onClick={onBatchAiFill}
                 >
                    <Sparkles size={14} className="mr-1.5" />
                    AI 批量填充 ({selectedCount})
                 </button>
             )}
             
             <div className="relative" ref={addBtnRef}>
                 <button 
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors flex items-center"
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                 >
                    <Plus size={16} className="mr-1" />
                    新增记录
                 </button>
                 
                 {isAddMenuOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                        <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center"
                            onClick={() => { onAddManual(); setIsAddMenuOpen(false); }}
                        >
                            <PenTool size={14} className="mr-2" />
                            手动添加
                        </button>
                        <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#927FFF] flex items-center"
                            onClick={() => { onAddAi(); setIsAddMenuOpen(false); }}
                        >
                            <Sparkles size={14} className="mr-2 text-[#927FFF]" />
                            AI 助手添加
                        </button>
                    </div>
                 )}
             </div>

             <button className="border border-gray-300 text-gray-600 hover:border-primary hover:text-primary px-3 py-1.5 rounded text-sm bg-white transition-colors flex items-center">
                 <Filter size={14} className="mr-1" /> 筛选
             </button>
             <button className="border border-gray-300 text-gray-600 px-2 py-1.5 rounded bg-white hover:border-primary hover:text-primary transition-colors">
                <Settings size={16} />
             </button>
        </div>
      </div>
  );
};