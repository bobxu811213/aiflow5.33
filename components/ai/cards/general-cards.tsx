
import React from 'react';
import { AlertTriangle, AlertCircle, Clock, User, ChevronRight, Table, Layers, Building2, Briefcase, Network, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { useAppStore } from '../../../store/use-app-store';

export const OnboardingApprovalListCard = ({ data, onConfirm }: { data: any, onConfirm: (selectedIds: string[]) => void }) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>(data.items.map((i: any) => i.id));

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full max-w-[310px] my-2 bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-[#F9FAFB] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="font-bold text-gray-800 text-sm">待入职员工确认</div>
                <div className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    已选 {selectedIds.length} 人
                </div>
            </div>
            <div className="p-3 max-h-[240px] overflow-y-auto space-y-2">
                {data.items.map((emp: any) => (
                    <div 
                        key={emp.id} 
                        onClick={() => !data.isApplied && toggleSelection(emp.id)}
                        className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                            data.isApplied ? 'cursor-default opacity-70' : 'cursor-pointer'
                        } ${
                            selectedIds.includes(emp.id) 
                                ? 'bg-primary/5 border-primary/30' 
                                : 'bg-white border-gray-100 hover:border-gray-200'
                        }`}
                    >
                        <div className={`text-primary transition-opacity ${selectedIds.includes(emp.id) ? 'opacity-100' : 'opacity-30'}`}>
                            {selectedIds.includes(emp.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-800 truncate">{emp.name}</div>
                            <div className="text-xs text-gray-500 truncate">{emp.department} · {emp.position}</div>
                        </div>
                    </div>
                ))}
            </div>
            {!data.isApplied && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button 
                        onClick={() => onConfirm(selectedIds)}
                        disabled={selectedIds.length === 0}
                        className="bg-primary text-white text-xs px-4 py-2 rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        确认选择
                    </button>
                </div>
            )}
            {data.isApplied && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-center text-xs text-gray-500">
                    已确认审批
                </div>
            )}
        </div>
    );
};

export const EmployeeCheckReportCard = ({ data }: { data: any }) => {
    const { setHighlightedWorkExperienceIds } = useAppStore();
    return (
        <div className="w-full max-w-[310px] my-2 flex flex-col gap-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="h-1.5 w-full bg-orange-500"></div>
                <div className="p-4">
                    <div className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-orange-500" /> 经历核查报告
                    </div>
                    <div className="text-xs text-gray-500">共发现 {data.issues.length} 个疑点，建议进一步核实。</div>
                </div>
            </div>
            {data.issues.map((issue: any, idx: number) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-orange-200" onClick={() => issue.relatedIds && setHighlightedWorkExperienceIds(issue.relatedIds)}>
                    <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${issue.type === 'conflict' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                            {issue.type === 'conflict' ? <AlertCircle size={14} /> : <Clock size={14} />}
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-gray-800 mb-1">{issue.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed mb-2">{issue.description}</div>
                            <div className="flex justify-end gap-2">
                                <button className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-200 hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); }}>忽略</button>
                                <button className="text-[10px] px-2 py-1 bg-red-50 text-red-600 rounded border border-red-100 hover:bg-red-100" onClick={(e) => { e.stopPropagation(); }}>标记存疑</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const EmployeeAnalysisResultCard = ({ data, onClick }: { data: any, onClick: () => void }) => {
    // Generate summary text based on scopes if available
    const summaryText = data.scopes && data.scopes.length > 0 
        ? `员工的${data.scopes.join('、')}`
        : data.summary;

    return (
        <div className="w-full max-w-[310px] my-2 bg-white rounded-xl border border-gray-100 shadow-md cursor-pointer hover:shadow-lg transition-all overflow-hidden group" onClick={onClick}>
            <div className="h-2 w-full bg-gradient-to-r from-[#13A695] to-[#50CABC]"></div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-gray-800">多维度交叉分析报告</div>
                </div>
                <div className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                    <User size={12} /> {data.employeeName}
                    <span className="w-px h-3 bg-gray-200"></span>
                    <Clock size={12} /> {data.period}
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded line-clamp-2 leading-relaxed">{summaryText}</div>
            </div>
            <div className="h-8 flex items-center justify-center bg-[#F9FAFB] border-t border-gray-100 text-xs text-primary group-hover:bg-primary/5 transition-colors font-medium">
                查看完整报告 <ChevronRight size={12} className="ml-1" />
            </div>
        </div>
    );
};

export const BatchFillResultCard = ({ data, onClick }: { data: any, onClick: () => void }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 w-[290px] my-2 select-none ring-1 ring-black/5 overflow-hidden group" onClick={onClick}>
        <div className="h-1.5 w-full bg-gradient-to-r from-[#927FFF] to-[#6265F0]"></div>
        <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#F4F2FF] flex items-center justify-center text-[#6265F0]">
                    <Table size={20} />
                </div>
                <div>
                    <div className="font-bold text-gray-800">批量填充内容已生成</div>
                    <div className="text-xs text-gray-400">{data.count} 条记录</div>
                </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded border border-gray-100">点击查看填充结果并应用到表格。</div>
        </div>
        <div className="h-8 flex items-center justify-center bg-[#F9FAFB] border-t border-gray-100 text-xs text-gray-400 group-hover:text-primary group-hover:bg-[#F4F2FF]/50 transition-colors gap-1 font-medium">
            <span>点击查看</span><ChevronRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </div>
    </div>
);

export const BatchSummaryCard = ({ data, onClick }: { data: any, onClick: () => void }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 w-[290px] my-2 select-none ring-1 ring-black/5 overflow-hidden group" onClick={onClick}>
        <div className="h-1.5 w-full bg-gradient-to-r from-[#E16AF3] to-[#6265F0]"></div>
        <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 relative">
                    <Layers size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">{data.count}</span>
                </div>
                <div>
                    <div className="font-bold text-gray-800">批量创建</div>
                    <div className="text-xs text-gray-400">{data.count} 个业务对象</div>
                </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded border border-gray-100">
                <span className="text-gray-400 mr-1">包含:</span>{data.items?.map((i: any) => i.title || i.data.name).join('、')}
            </div>
        </div>
        <div className="h-8 flex items-center justify-center bg-[#F9FAFB] border-t border-gray-100 text-xs text-gray-400 group-hover:text-primary group-hover:bg-[#F4F2FF]/50 transition-colors gap-1 font-medium">
            <span>点击查看</span><ChevronRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </div>
    </div>
);

export const TransferRecordCard = ({ data }: { data: any }) => (
    <div className="w-full max-w-[310px] my-2 bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-[#F9FAFB] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <div className="font-bold text-gray-800 text-sm">人事异动记录</div>
            <div className="text-xs text-[#13A695] bg-[#E6F8F6] px-2 py-0.5 rounded border border-[#B8EBE5]">已生效</div>
        </div>
        <div className="p-4 space-y-3">
            <div className="flex justify-between text-xs"><span className="text-gray-500">异动类型</span><span className="font-medium text-gray-800">{data.changeType}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">生效日期</span><span className="font-medium text-gray-800">{data.effectiveDate}</span></div>
            <div className="h-px bg-gray-100 my-2"></div>
            <div className="grid grid-cols-[1fr_20px_1fr] gap-2 text-xs">
                <div className="text-center"><div className="text-gray-400 mb-1">变动前</div><div className="font-bold text-gray-700">{data.prevPost}</div><div className="text-gray-500 scale-90">{data.prevGrade}</div></div>
                <div className="flex items-center justify-center text-gray-300"><ArrowRight size={14} /></div>
                <div className="text-center"><div className="text-gray-400 mb-1">变动后</div><div className="font-bold text-[#13A695]">{data.newPost}</div><div className="text-[#13A695] scale-90">{data.newGrade}</div></div>
            </div>
            <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mt-2 leading-relaxed"><span className="font-bold text-gray-700">原因：</span>{data.reason}</div>
        </div>
        <div className="h-8 flex items-center justify-center bg-[#F9FAFB] border-t border-gray-100 text-xs text-gray-400 cursor-pointer hover:text-primary transition-colors">
            查看完整档案 <ChevronRight size={12} className="ml-1" />
        </div>
    </div>
);

export const GenericEntityCard = ({ data, onClick }: { data: any, onClick: () => void }) => {
    const type = data._type || 'ORG';
    let icon = Building2; 
    let colorClass = "text-[#927FFF] bg-[#F4F2FF] border-[#E3DFFF]"; 
    let typeLabel = "组织";
    
    if (type === 'POSITION') { icon = Briefcase; colorClass = "text-[#E6AF2E] bg-[#FEF8E8] border-[#FDE5A8]"; typeLabel = "职位"; } 
    else if (type === 'DUTY') { icon = Layers; colorClass = "text-[#26C2A4] bg-[#E8F8F6] border-[#B8EBE5]"; typeLabel = "职务"; } 
    else if (type === 'CATEGORY') { icon = Network; colorClass = "text-[#5483F1] bg-[#DDEBFE] border-[#BBD5FD]"; typeLabel = "职务分类"; } 
    else if (type === 'RETRO_RULE') { icon = Clock; colorClass = "text-[#FF6B6B] bg-[#FFF0F0] border-[#FFD9D9]"; typeLabel = "补卡规则"; }
    
    const IconComp = icon;
    const allFields: any[] = [];
    if (type === 'ORG') { allFields.push({ label: '类型', value: data.type }); allFields.push({ label: '上级', value: data.parentOrg }); } 
    else if (type === 'POSITION') { allFields.push({ label: '部门', value: data.department }); } 
    else if (type === 'DUTY') { allFields.push({ label: '编码', value: data.code }); } 
    else if (type === 'RETRO_RULE') { allFields.push({ label: '范围', value: data.scope === 'all' ? '全体' : '部分' }); allFields.push({ label: '补卡', value: data.allowRetro ? '是' : '否' }); }
    
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 group overflow-hidden w-[290px] my-2 select-none ring-1 ring-black/5" onClick={onClick}>
            <div className={`h-1.5 w-full bg-gradient-to-r ${type === 'ORG' ? 'from-[#E16AF3] to-[#6265F0]' : 'from-blue-400 to-indigo-500'}`}></div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${colorClass}`}>
                            <IconComp size={18} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-bold text-gray-800 text-[15px] truncate leading-tight">{data.name || data.ruleName || '未命名'}</span>
                            <span className="text-[10px] text-gray-400 truncate mt-0.5">AI 生成{typeLabel}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-2.5 space-y-1.5 border border-gray-100/50">
                    {allFields.map((field, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 scale-90 origin-left">{field.label}</span>
                            <span className="font-medium text-gray-700 truncate max-w-[140px]" title={String(field.value)}>{field.value || '-'}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-8 flex items-center justify-center bg-[#F9FAFB] border-t border-gray-100 text-xs text-gray-400 group-hover:text-primary group-hover:bg-[#F4F2FF]/50 transition-colors gap-1 font-medium">
                <span>点击确认信息</span><ChevronRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </div>
        </div>
    );
};
