import React, { useRef, useEffect } from 'react';
import { IPerformanceIndicator } from '../../types';
import { Trash2 } from 'lucide-react';
import { EditableCell } from './editable-cell';

interface PerformanceTableProps {
  data: IPerformanceIndicator[];
  loading: boolean;
  activeHighlightId: string | null;
  lastModifiedCells: Record<string, string[]>;
  aiSuggestions: Record<string, Record<string, string>>;
  onUpdate: (id: string, field: keyof IPerformanceIndicator, value: any) => void;
  onDelete: (id: string) => void;
  onRowClick: (id: string) => void;
  onViewDetail: (item: IPerformanceIndicator) => void;
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({
  data,
  loading,
  activeHighlightId,
  lastModifiedCells,
  aiSuggestions,
  onUpdate,
  onDelete,
  onRowClick,
  onViewDetail
}) => {
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  useEffect(() => {
    if (activeHighlightId && rowRefs.current[activeHighlightId]) {
        rowRefs.current[activeHighlightId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeHighlightId]);

  return (
      <div className="flex-1 overflow-auto px-4 py-2">
        <table className="w-full border-collapse min-w-max border-l border-r border-t border-gray-200">
            <thead className="bg-[#F5F6F7] text-xs text-[#262626] font-medium z-10 shadow-sm">
                <tr className="h-10 text-left">
                    <th className="w-10 min-w-[2.5rem] max-w-[2.5rem] border-r border-gray-200 border-b text-center sticky top-0 left-0 z-40 bg-[#F5F6F7]"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/></th>
                    <th className="w-[60px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 left-10 z-40 bg-[#F5F6F7] text-center">序号</th>
                    <th className="w-[120px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 left-[100px] z-40 bg-[#F5F6F7] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">指标编号</th>
                    <th className="w-[180px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">指标名称</th>
                    <th className="w-[100px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">权重</th>
                    <th className="w-[200px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">目标值</th>
                    <th className="w-[350px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">指标说明</th>
                    <th className="w-[350px] px-4 border-r border-gray-200 border-b whitespace-nowrap sticky top-0 z-30 bg-[#F5F6F7]">备注</th>
                    <th className="w-16 px-4 text-center border-b border-gray-200 whitespace-nowrap sticky top-0 right-0 z-40 bg-[#F5F6F7] shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)]">操作</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {data.map((item, index) => {
                    const isActive = activeHighlightId === item.id;
                    const rowClass = `border-b border-gray-100 h-[120px] transition-colors group cursor-pointer ${isActive ? 'bg-[#E6F8F6]' : 'hover:bg-[#F5FBFA] bg-white'}`;
                    const stickyBgClass = isActive ? 'bg-[#E6F8F6]' : 'bg-white group-hover:bg-[#F5FBFA]';
                    const modifiedFields = lastModifiedCells[item.id] || [];
                    const issueFields = aiSuggestions[item.id] || {};
                    
                    return (
                        <tr 
                            key={item.id} 
                            ref={(el) => { if (el) rowRefs.current[item.id] = el }}
                            onClick={() => onRowClick(item.id)}
                            onDoubleClick={() => onViewDetail(item)}
                            className={rowClass}
                        >
                            <td className={`text-center border-r border-gray-100 sticky left-0 z-20 h-[120px] ${stickyBgClass}`}>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </td>
                            <td className={`text-center border-r border-gray-100 sticky left-10 z-20 h-[120px] ${stickyBgClass} text-gray-500 font-medium`}>
                                {index + 1}
                            </td>
                            <td 
                                className={`px-4 border-r border-gray-100 text-[#262626] font-medium sticky left-[100px] z-20 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)] h-[120px] align-middle ${stickyBgClass}`}
                            >
                                {item.code}
                            </td>
                            <td className="px-2 border-r border-gray-100 h-[120px] align-middle">
                                <EditableCell 
                                    value={item.name} 
                                    onChange={(val) => onUpdate(item.id, 'name', val)}
                                    onBlur={() => {}}
                                    placeholder="输入指标名称"
                                    isAiModified={modifiedFields.includes('name')}
                                    aiIssue={issueFields['name']}
                                />
                            </td>
                            <td className="px-2 border-r border-gray-100 h-[120px] align-middle">
                                <EditableCell 
                                    value={item.weight} 
                                    onChange={(val) => onUpdate(item.id, 'weight', Number(val))}
                                    onBlur={() => {}}
                                    placeholder="0"
                                    type="number"
                                    suffix="%"
                                    isAiModified={modifiedFields.includes('weight')}
                                    aiIssue={issueFields['weight']}
                                />
                            </td>
                            <td className="px-2 border-r border-gray-100 h-[120px] align-top">
                                 <div className="w-[190px] h-full py-2">
                                    <EditableCell 
                                        value={item.targetValue} 
                                        onChange={(val) => onUpdate(item.id, 'targetValue', val)}
                                        onBlur={() => {}}
                                        placeholder="输入目标值"
                                        type="textarea"
                                        isAiModified={modifiedFields.includes('targetValue')}
                                        aiIssue={issueFields['targetValue']}
                                    />
                                </div>
                            </td>
                            <td className="px-2 border-r border-gray-100 h-[120px] align-top">
                                <div className="w-[334px] h-full py-2">
                                    <EditableCell 
                                        value={item.description} 
                                        onChange={(val) => onUpdate(item.id, 'description', val)}
                                        onBlur={() => {}}
                                        placeholder="输入指标说明"
                                        type="textarea"
                                        isAiModified={modifiedFields.includes('description')}
                                        aiIssue={issueFields['description']}
                                    />
                                </div>
                            </td>
                            <td className="px-2 border-r border-gray-100 h-[120px] align-top">
                                <div className="w-[334px] h-full py-2">
                                    <EditableCell 
                                        value={item.remarks || ''} 
                                        onChange={(val) => onUpdate(item.id, 'remarks', val)}
                                        onBlur={() => {}}
                                        placeholder="暂无备注"
                                        type="textarea"
                                        isAiModified={modifiedFields.includes('remarks')}
                                        aiIssue={issueFields['remarks']}
                                    />
                                </div>
                            </td>
                            <td className={`px-2 text-center sticky right-0 z-20 shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.05)] h-[120px] align-middle ${stickyBgClass}`}>
                                <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                        title="删除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                {data.length === 0 && !loading && (
                    <tr>
                        <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">
                            暂无指标数据，点击上方“创建”按钮添加
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
  );
};