import React, { useRef } from 'react';
import { IVisitRecord } from '../../types';
import { CheckSquare, Square, MoreHorizontal, Sparkles, Loader2 } from 'lucide-react';

interface FreeTableListProps {
  data: IVisitRecord[];
  loading: boolean;
  selectedRowIds: Set<string>;
  columnWidths: { [key: string]: number };
  isGenerating: boolean;
  generatingField: string | null;
  aiModifiedCells: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onColumnResize: (field: string, newWidth: number) => void;
  onAiHeaderClick: (e: React.MouseEvent, label: string, field: string) => void;
}

const ResizeHandle = ({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) => (
    <div
        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-primary/50 z-50 transition-colors group/handle"
        onMouseDown={onMouseDown}
        onClick={(e) => e.stopPropagation()}
    >
        <div className="w-[1px] h-full bg-gray-200 mx-auto group-hover/handle:bg-primary"></div>
    </div>
);

export const FreeTableList: React.FC<FreeTableListProps> = ({
  data,
  loading,
  selectedRowIds,
  columnWidths,
  isGenerating,
  generatingField,
  aiModifiedCells,
  onSelectionChange,
  onColumnResize,
  onAiHeaderClick
}) => {
  const draggingRef = useRef<{ field: string, startX: number, startWidth: number } | null>(null);

  React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (draggingRef.current) {
              const { field, startX, startWidth } = draggingRef.current;
              const diff = e.clientX - startX;
              const newWidth = Math.max(80, startWidth + diff);
              onColumnResize(field, newWidth);
          }
      };

      const handleMouseUp = () => {
          if (draggingRef.current) {
              draggingRef.current = null;
              document.body.style.cursor = '';
              document.body.style.userSelect = '';
          }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [onColumnResize]);

  const handleResizeStart = (e: React.MouseEvent, field: string) => {
      e.preventDefault();
      e.stopPropagation();
      draggingRef.current = {
          field,
          startX: e.clientX,
          startWidth: columnWidths[field]
      };
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
  };

  const toggleSelectAll = () => {
      if (selectedRowIds.size === data.length && data.length > 0) {
          onSelectionChange(new Set());
      } else {
          onSelectionChange(new Set(data.map(item => item.id)));
      }
  };

  const toggleSelectRow = (id: string) => {
      const newSet = new Set(selectedRowIds);
      if (newSet.has(id)) {
          newSet.delete(id);
      } else {
          newSet.add(id);
      }
      onSelectionChange(newSet);
  };

  const isAllSelected = data.length > 0 && selectedRowIds.size === data.length;
  const isIndeterminate = selectedRowIds.size > 0 && selectedRowIds.size < data.length;

  const renderAiHeader = (label: string, field: string) => (
    <div 
        className="flex items-center gap-1 cursor-pointer group/header hover:text-[#927FFF] transition-colors select-none w-full h-full" 
        onClick={(e) => onAiHeaderClick(e, label, field)}
        title={`AI 自动生成${label}`}
    >
        {label}
        {isGenerating && generatingField === field ? (
            <Loader2 size={14} className="animate-spin text-[#927FFF]" />
        ) : (
            <Sparkles size={14} className="text-[#927FFF] opacity-0 group-hover/header:opacity-100 transition-opacity" />
        )}
    </div>
  );

  const renderCellContent = (item: IVisitRecord, field: keyof IVisitRecord) => {
      const isAiModified = aiModifiedCells.has(`${item.id}-${field}`);
      const content = item[field];
      
      const isGeneratingThis = isGenerating && generatingField === field && (selectedRowIds.size === 0 || selectedRowIds.has(item.id));

      if (isGeneratingThis) {
           return (
              <div className="flex items-center text-xs text-[#927FFF] bg-[#F4F2FF] p-2 -mx-2 -my-1 rounded animate-pulse h-full">
                  <Loader2 size={14} className="animate-spin mr-2 shrink-0" />
                  <span className="truncate">正在思考生成中...</span>
              </div>
           );
      }
      
      return (
          <div className={`relative rounded transition-all duration-500 ${isAiModified ? 'bg-[#F4F2FF] border border-[#E3DFFF] p-2 -mx-2 -my-1 shadow-sm' : ''}`}>
              {isAiModified && (
                  <div className="absolute right-1 top-1 z-10 animate-pulse pointer-events-none">
                      <Sparkles size={12} className="text-[#927FFF] fill-[#927FFF]/10" />
                  </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
          </div>
      );
  };

  return (
      <div className="flex-1 overflow-auto px-4 py-2">
        <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200 table-fixed">
            <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                <tr className="h-10 text-left">
                    <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]">
                        <div 
                            className="flex items-center justify-center cursor-pointer"
                            onClick={toggleSelectAll}
                        >
                            {isAllSelected ? (
                                <CheckSquare size={16} className="text-primary" />
                            ) : isIndeterminate ? (
                                <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                                    <div className="w-2 h-2 bg-primary rounded-sm"></div>
                                </div>
                            ) : (
                                <Square size={16} className="text-gray-300 hover:text-gray-400" />
                            )}
                        </div>
                    </th>
                    <th 
                        className="px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 left-10 z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] relative"
                        style={{ width: columnWidths.customerName, minWidth: columnWidths.customerName }}
                    >
                        客户名称
                        <ResizeHandle onMouseDown={(e) => handleResizeStart(e, 'customerName')} />
                    </th>
                    <th 
                        className="px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7] relative"
                        style={{ width: columnWidths.visitDate, minWidth: columnWidths.visitDate }}
                    >
                        拜访日期
                        <ResizeHandle onMouseDown={(e) => handleResizeStart(e, 'visitDate')} />
                    </th>
                    <th 
                        className="px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7] relative"
                        style={{ width: columnWidths.minutes, minWidth: columnWidths.minutes }}
                    >
                        {renderAiHeader('会议纪要', 'minutes')}
                        <ResizeHandle onMouseDown={(e) => handleResizeStart(e, 'minutes')} />
                    </th>
                    <th 
                        className="px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7] relative"
                        style={{ width: columnWidths.todos, minWidth: columnWidths.todos }}
                    >
                        {renderAiHeader('待办事项', 'todos')}
                        <ResizeHandle onMouseDown={(e) => handleResizeStart(e, 'todos')} />
                    </th>
                    <th 
                        className="px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7] relative"
                        style={{ width: columnWidths.plan, minWidth: columnWidths.plan }}
                    >
                        {renderAiHeader('后续计划', 'plan')}
                        <ResizeHandle onMouseDown={(e) => handleResizeStart(e, 'plan')} />
                    </th>
                    <th className="w-16 px-4 text-center border-b border-gray-200 sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {data.map((item) => {
                    const isSelected = selectedRowIds.has(item.id);
                    return (
                        <tr key={item.id} className={`border-b border-gray-100 transition-colors group h-auto ${isSelected ? 'bg-blue-50/50' : 'hover:bg-blue-50/30'}`}>
                            <td className={`text-center border-r border-gray-100 sticky left-0 z-20 align-top py-3 ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                <div 
                                    className="flex items-center justify-center cursor-pointer"
                                    onClick={() => toggleSelectRow(item.id)}
                                >
                                    {isSelected ? (
                                        <CheckSquare size={16} className="text-primary" />
                                    ) : (
                                        <Square size={16} className="text-gray-300 hover:text-gray-400" />
                                    )}
                                </div>
                            </td>
                            <td className={`px-4 border-r border-gray-100 text-[#262626] font-medium sticky left-10 z-20 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] align-top py-3 break-words ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                {item.customerName}
                            </td>
                            <td className={`px-4 border-r border-gray-100 text-gray-600 align-top py-3 whitespace-nowrap ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                {item.visitDate}
                            </td>
                            <td className={`px-4 border-r border-gray-100 text-gray-600 align-top py-3 break-words ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                {renderCellContent(item, 'minutes')}
                            </td>
                            <td className={`px-4 border-r border-gray-100 text-gray-600 align-top py-3 break-words ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                {renderCellContent(item, 'todos')}
                            </td>
                            <td className={`px-4 border-r border-gray-100 text-gray-600 align-top py-3 break-words ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                {renderCellContent(item, 'plan')}
                            </td>
                            <td className={`px-4 text-center sticky right-0 z-20 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] align-top py-3 ${isSelected ? 'bg-blue-50/50' : 'bg-white group-hover:bg-blue-50/30'}`}>
                                <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} className="text-gray-400 hover:text-primary cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    );
                })}
                {data.length === 0 && !loading && (
                    <tr>
                        <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                            暂无拜访记录，点击“新增记录”添加
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
  );
};