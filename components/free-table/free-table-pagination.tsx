import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface FreeTablePaginationProps {
  totalCount: number;
  selectedCount: number;
}

export const FreeTablePagination: React.FC<FreeTablePaginationProps> = ({ totalCount, selectedCount }) => {
  return (
      <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-between px-4 text-xs text-gray-600 shrink-0">
          <div className="flex items-center gap-4">
              {selectedCount > 0 && (
                  <span className="text-primary font-medium">已选中 {selectedCount} 项</span>
              )}
          </div>
          <div className="flex items-center">
              <span className="mr-4">共 {totalCount} 条</span>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"><ChevronLeft size={14}/></button>
              <button className="w-6 h-6 border border-primary text-primary rounded flex items-center justify-center mr-2 bg-primary-light">1</button>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"><ChevronRight size={14}/></button>
              
              <div className="flex items-center ml-2">
                  <span className="border border-gray-200 px-2 py-1 rounded mr-2 flex items-center cursor-pointer hover:border-primary transition-colors">10 条/页 <ChevronDown size={10} className="ml-1"/></span>
              </div>
          </div>
      </div>
  );
};