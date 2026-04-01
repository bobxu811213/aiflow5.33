import React from 'react';
import { Search, Plus, Filter, Settings } from 'lucide-react';

interface PerformanceToolbarProps {
  totalCount: number;
  onSearch: (term: string) => void;
  onCreate: () => void;
}

export const PerformanceToolbar: React.FC<PerformanceToolbarProps> = ({ totalCount, onSearch, onCreate }) => {
  return (
    <div className="p-4 flex items-center justify-between bg-white shrink-0 border-b border-gray-100 min-w-0 gap-4">
        <div className="flex items-center gap-4">
             <div className="font-bold text-[#262626] text-base shrink-0">绩效指标({totalCount})</div>
             
             <div className="relative hidden md:block group">
                 <input 
                    type="text" 
                    placeholder="搜索指标名称、编码" 
                    className="border border-gray-300 rounded pl-9 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:border-primary placeholder:text-gray-400 transition-all" 
                    onChange={(e) => onSearch(e.target.value)}
                 />
                 <Search size={16} className="absolute left-3 top-2 text-gray-400 group-focus-within:text-primary transition-colors" />
             </div>
        </div>
        
        <div className="flex items-center space-x-2 shrink-0">
             <button 
                className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-sm shadow-sm transition-colors flex items-center"
                onClick={onCreate}
             >
                <Plus size={16} className="mr-1" />
                创建
             </button>
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