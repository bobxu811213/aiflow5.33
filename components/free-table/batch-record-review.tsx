
import React, { useState, useEffect } from 'react';
import { IVisitRecord } from '../../types';
import { CheckCircle2, ChevronRight, AlertCircle, Save, Sparkles, Pencil, RotateCcw } from 'lucide-react';

interface BatchRecordReviewProps {
  initialData: IVisitRecord[];
  aiFields?: string[]; // New prop to track which fields were AI generated
  onSubmit: (data: IVisitRecord[]) => void;
  onCancel: () => void;
}

export const BatchRecordReview: React.FC<BatchRecordReviewProps> = ({ initialData, aiFields = [], onSubmit, onCancel }) => {
  const [data, setData] = useState<IVisitRecord[]>(initialData);
  const [activeTab, setActiveTab] = useState('review'); // 'review' | 'success'

  useEffect(() => {
      if (initialData) {
          setData(initialData);
      }
  }, [initialData]);

  const handleSave = () => {
      onSubmit(data);
      setActiveTab('success');
  };

  const handleCellChange = (id: string, field: keyof IVisitRecord, value: string) => {
      setData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const isAiField = (field: string) => aiFields.includes(field);

  if (activeTab === 'success') {
      return (
          <div className="flex flex-col h-full items-center justify-center bg-white p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-[#F6FFEC] rounded-full flex items-center justify-center mb-6 border border-[#D9F7BE]">
                  <CheckCircle2 size={40} className="text-[#52C41A]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">批量填充完成</h2>
              <p className="text-gray-500 mb-8 text-center max-w-md">
                  已成功将 AI 生成的内容填充到 {data.length} 条记录中。您可以返回表格查看完整数据。
              </p>
              <button 
                  onClick={onCancel}
                  className="px-8 py-2.5 rounded bg-primary text-white hover:bg-primary-hover shadow-lg transition-colors flex items-center text-sm font-medium"
              >
                  返回表格查看
              </button>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
        <div className="flex-1 overflow-auto p-6 scrollbar-hide">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        生成结果确认
                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">共 {data.length} 条</span>
                    </h3>
                    <div className="flex gap-2">
                         <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-300 rounded hover:border-gray-400 transition-colors bg-white">
                            <RotateCcw size={12} />
                            重新生成
                         </button>
                    </div>
                </div>
                <div className="bg-[#F4F2FF] border border-[#E3DFFF] px-4 py-3 rounded-lg text-xs text-[#6265F0] flex items-start gap-2">
                    <Sparkles size={16} className="shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold mb-0.5">AI 已为您自动生成以下内容</p>
                        <p className="opacity-80">请检查 AI 生成的内容，您可以直接编辑修改。确认无误后点击下方按钮填充。</p>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-medium">
                        <tr>
                            <th className="px-4 py-3 text-left w-[200px] font-bold text-gray-600 bg-[#FAFAFA] border-b border-gray-200">客户名称</th>
                            
                            <th className={`px-4 py-3 text-left min-w-[220px] border-b ${isAiField('minutes') ? 'bg-[#F4F2FF] border-[#E3DFFF] text-[#6265F0]' : 'bg-[#FAFAFA] border-gray-200 text-gray-600'}`}>
                                <div className="flex items-center gap-1.5">
                                    {isAiField('minutes') && <Sparkles size={14} />}
                                    会议纪要
                                </div>
                            </th>
                            
                            <th className={`px-4 py-3 text-left min-w-[220px] border-b ${isAiField('todos') ? 'bg-[#F4F2FF] border-[#E3DFFF] text-[#6265F0]' : 'bg-[#FAFAFA] border-gray-200 text-gray-600'}`}>
                                <div className="flex items-center gap-1.5">
                                    {isAiField('todos') && <Sparkles size={14} />}
                                    待办事项
                                </div>
                            </th>
                            
                            <th className={`px-4 py-3 text-left min-w-[220px] border-b ${isAiField('plan') ? 'bg-[#F4F2FF] border-[#E3DFFF] text-[#6265F0]' : 'bg-[#FAFAFA] border-gray-200 text-gray-600'}`}>
                                <div className="flex items-center gap-1.5">
                                    {isAiField('plan') && <Sparkles size={14} />}
                                    后续计划
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-4 py-4 align-top bg-white border-r border-gray-100">
                                    <div className="font-bold text-gray-800">{item.customerName}</div>
                                    <div className="text-xs text-gray-400 mt-1 font-mono">{item.visitDate}</div>
                                </td>
                                
                                <td className={`px-2 py-2 align-top relative group/cell border-r border-gray-100 ${isAiField('minutes') ? 'bg-[#F4F2FF]/20 border-[#E3DFFF]/30' : 'bg-white'}`}>
                                    {isAiField('minutes') && (
                                        <div className="absolute top-2 right-2 opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity z-10">
                                            <Pencil size={12} className="text-[#927FFF]" />
                                        </div>
                                    )}
                                    <textarea 
                                        className={`w-full h-32 p-3 text-xs border border-transparent rounded-md resize-none transition-all leading-relaxed bg-transparent
                                            ${isAiField('minutes') 
                                                ? 'text-gray-700 hover:bg-white hover:border-[#E3DFFF] hover:shadow-sm focus:border-[#927FFF] focus:bg-white focus:shadow-md focus:outline-none placeholder-gray-400' 
                                                : 'text-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:shadow-sm focus:outline-none'
                                            }`}
                                        value={item.minutes}
                                        onChange={(e) => handleCellChange(item.id, 'minutes', e.target.value)}
                                        placeholder={isAiField('minutes') ? "AI 生成内容为空..." : "暂无内容"}
                                        readOnly={!isAiField('minutes')} // Optional: restrict editing of non-AI fields during this review step
                                    />
                                </td>

                                <td className={`px-2 py-2 align-top relative group/cell border-r border-gray-100 ${isAiField('todos') ? 'bg-[#F4F2FF]/20 border-[#E3DFFF]/30' : 'bg-white'}`}>
                                    {isAiField('todos') && (
                                        <div className="absolute top-2 right-2 opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity z-10">
                                            <Pencil size={12} className="text-[#927FFF]" />
                                        </div>
                                    )}
                                    <textarea 
                                        className={`w-full h-32 p-3 text-xs border border-transparent rounded-md resize-none transition-all leading-relaxed bg-transparent
                                            ${isAiField('todos') 
                                                ? 'text-gray-700 hover:bg-white hover:border-[#E3DFFF] hover:shadow-sm focus:border-[#927FFF] focus:bg-white focus:shadow-md focus:outline-none placeholder-gray-400' 
                                                : 'text-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:shadow-sm focus:outline-none'
                                            }`}
                                        value={item.todos}
                                        onChange={(e) => handleCellChange(item.id, 'todos', e.target.value)}
                                        placeholder={isAiField('todos') ? "AI 生成内容为空..." : "暂无内容"}
                                        readOnly={!isAiField('todos')}
                                    />
                                </td>

                                <td className={`px-2 py-2 align-top relative group/cell ${isAiField('plan') ? 'bg-[#F4F2FF]/20' : 'bg-white'}`}>
                                    {isAiField('plan') && (
                                        <div className="absolute top-2 right-2 opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity z-10">
                                            <Pencil size={12} className="text-[#927FFF]" />
                                        </div>
                                    )}
                                    <textarea 
                                        className={`w-full h-32 p-3 text-xs border border-transparent rounded-md resize-none transition-all leading-relaxed bg-transparent
                                            ${isAiField('plan') 
                                                ? 'text-gray-700 hover:bg-white hover:border-[#E3DFFF] hover:shadow-sm focus:border-[#927FFF] focus:bg-white focus:shadow-md focus:outline-none placeholder-gray-400' 
                                                : 'text-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:shadow-sm focus:outline-none'
                                            }`}
                                        value={item.plan}
                                        onChange={(e) => handleCellChange(item.id, 'plan', e.target.value)}
                                        placeholder={isAiField('plan') ? "AI 生成内容为空..." : "暂无内容"}
                                        readOnly={!isAiField('plan')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0 z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
            <button 
                onClick={onCancel}
                className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                取消
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2 rounded text-sm bg-[#13A695] text-white hover:bg-[#13A695]/90 shadow-sm transition-colors flex items-center font-medium"
            >
                <CheckCircle2 size={16} className="mr-1.5" />
                确认并填充
            </button>
        </div>
    </div>
  );
};
