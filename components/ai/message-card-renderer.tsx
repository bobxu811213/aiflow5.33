
import React, { useState } from 'react';
import { IPerformanceIndicator } from '../../types';
import { PerformanceBatchOverrideCard, PerformanceCard } from './cards/performance-cards';
//import { PerformanceBatchRegenerateCard } from './cards/performance-batch-regenerate-card';
import { ComplianceCard } from './cards/compliance-card';
import { BatchFillConfigCard } from './cards/batch-fill-config-card';
import { AnalysisScopeSelector } from './cards/analysis-scope-selector';
import { EmployeeCheckReportCard, EmployeeAnalysisResultCard, BatchFillResultCard, BatchSummaryCard, TransferRecordCard, GenericEntityCard, OnboardingApprovalListCard } from './cards/general-cards';

interface MessageCardRendererProps {
    data: any;
    messageId: string;
    onBatchApply?: (data: any[]) => void;
    onUpdateCardData: (messageId: string, newData: any) => void;
    onCardClick: (data: any) => void;
    onViewDetail?: (item: any, messageId: string, index: number) => void;
    onApplyChange?: (data: any) => void;
    onLocateIssue?: (quote: string) => void;
    onApplyComplianceFix?: (issue: any, messageId: string, issueIndex: number, prompt?: string) => void;
    onBatchOverrideConfirm?: (selectedIds: string[], overrideMessageId?: string, overrideCardData?: any) => void;
    onBatchRegenerateConfirm?: (selectedIds: string[], overrideMessageId?: string, overrideCardData?: any) => void;
    setHighlightedWorkExperienceIds?: (ids: number[]) => void;
    addAiMessage: (msg: any) => void;
    setIsTyping?: (isTyping: boolean) => void;
}

export const MessageCardRenderer: React.FC<MessageCardRendererProps> = ({ 
    data, 
    messageId, 
    onBatchApply, 
    onUpdateCardData, 
    onCardClick,
    onViewDetail,
    onApplyChange,
    onLocateIssue,
    onApplyComplianceFix,
    onBatchOverrideConfirm,
    onBatchRegenerateConfirm,
    addAiMessage,
    setIsTyping
}) => {
    const type = data._type || 'ORG';

    if (type === 'ANALYSIS_SCOPE_SELECTOR') {
        return (
            <AnalysisScopeSelector 
                data={data} 
                onAnalyze={(scopes, timeRange, salaryFilters, talentModes, talentOptions) => {
                    let scopeText = scopes.map(s => s === '考勤汇总' && timeRange ? `考勤汇总(${timeRange})` : s).join('、');
                    
                    if (salaryFilters && scopes.includes('薪酬数据')) {
                        const filters = [];
                        if (salaryFilters.rankId) filters.push(`职级:${salaryFilters.rankId}`);
                        if (salaryFilters.locationId) filters.push(`地点:${salaryFilters.locationId}`);
                        if (salaryFilters.tenureStart || salaryFilters.tenureEnd) filters.push(`工龄:${salaryFilters.tenureStart}-${salaryFilters.tenureEnd}`);
                        
                        if (filters.length > 0) {
                            scopeText += ` (薪酬筛选: ${filters.join(' ')})`;
                        }
                    }

                    if (talentModes && scopes.includes('人才盘点')) {
                        const modes = [];
                        if (talentModes.includes('timeline')) {
                            let label = '时间轴';
                            if (talentOptions?.timelineTimeRange) label += `(${talentOptions.timelineTimeRange})`;
                            modes.push(label);
                        }
                        if (talentModes.includes('grid')) {
                            let label = '宫格';
                            if (talentOptions?.gridScheme) label += `(${talentOptions.gridScheme})`;
                            modes.push(label);
                        }
                        if (modes.length > 0) {
                            scopeText += ` (人才盘点: ${modes.join('+')})`;
                        }
                    }

                    addAiMessage({
                        id: Date.now().toString(),
                        role: 'user',
                        content: `开始分析，范围：${scopeText}`
                    });
                    
                    setTimeout(() => {
                        addAiMessage({
                            id: (Date.now() + 1).toString(),
                            role: 'ai',
                            content: '正在进行多维度交叉分析...'
                        });
                        
                        setTimeout(() => {
                            addAiMessage({
                                id: (Date.now() + 2).toString(),
                                role: 'ai',
                                content: '分析完成，已为您生成分析报告：',
                                type: 'card',
                                cardData: {
                                    _type: 'EMPLOYEE_ANALYSIS_RESULT',
                                    employeeName: data.employeeName || '栗子',
                                    period: '近 1 年',
                                    score: 92,
                                    summary: '该员工在选定周期内工作表现平稳，考勤正常。绩效产出与职级相符，建议保持当前培养计划。',
                                    details: { performance: 'A', attendance: '正常', potential: '高' },
                                    scopes: scopes,
                                    timeRange: timeRange,
                                    salaryFilters: salaryFilters,
                                    talentModes: talentModes,
                                    talentOptions: talentOptions
                                }
                            });
                        }, 1500);
                    }, 500);
                }} 
            />
        );
    }

    if (type === 'ONBOARDING_APPROVAL_LIST') {
        return (
            <OnboardingApprovalListCard 
                data={data} 
                onConfirm={(selectedIds) => {
                    onUpdateCardData(messageId, { ...data, isApplied: true });
                    addAiMessage({
                        id: Date.now().toString(),
                        role: 'user',
                        content: `确认入职审批（已选 ${selectedIds.length} 人）`
                    });
                    if (setIsTyping) setIsTyping(true);
                    setTimeout(() => {
                        if (setIsTyping) setIsTyping(false);
                        if (onBatchApply) {
                            onBatchApply(selectedIds.map(id => ({ type: 'ONBOARDING_APPROVAL', id })));
                        }
                        addAiMessage({
                            id: (Date.now() + 1).toString(),
                            role: 'ai',
                            content: `已成功为您提交 ${selectedIds.length} 名员工的入职审批流程。`
                        });
                    }, 5000);
                }} 
            />
        );
    }

    if (type === 'EMPLOYEE_CHECK_REPORT') {
        return <EmployeeCheckReportCard data={data} />;
    }

    if (type === 'EMPLOYEE_ANALYSIS_RESULT') {
        return <EmployeeAnalysisResultCard data={data} onClick={() => onCardClick(data)} />;
    }

    if (type === 'PERFORMANCE_BATCH_OVERRIDE') {
        return (
            <PerformanceBatchOverrideCard 
                data={data} 
                messageId={messageId} 
                onBatchApply={onBatchApply} 
                onConfirm={(mId: string, cData: any, selectedIds: string[]) => {
                    if (onBatchOverrideConfirm) {
                        onBatchOverrideConfirm(selectedIds, mId, cData);
                    } else {
                        onUpdateCardData(mId, { ...cData, isApplied: true });
                    }
                }} 
            />
        );
    }

    /*
    if (type === 'PERFORMANCE_BATCH_REGENERATE') {
        return (
            <PerformanceBatchRegenerateCard 
                data={data} 
                messageId={messageId} 
                onConfirm={(mId: string, cData: any, selectedIds: string[]) => {
                    if (onBatchRegenerateConfirm) {
                        onBatchRegenerateConfirm(selectedIds, mId, cData);
                    } else {
                        onUpdateCardData(mId, { ...cData, isApplied: true });
                    }
                }} 
            />
        );
    }
    */

    if (type === 'COMPLIANCE_REPORT') {
        const overallStatus = data.overallStatus || 'WARNING';
        const issues = data.issues || [];
        return (
            <div className="w-full max-w-[310px] my-2 flex flex-col gap-2">
                <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className={`h-1.5 w-full ${overallStatus === 'PASS' ? 'bg-green-500' : overallStatus === 'DANGER' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                    <div className="p-4">
                        <div className="font-bold text-gray-800 mb-1">文档合规性检测报告</div>
                        <div className="text-xs text-gray-500 mb-3">{overallStatus === 'PASS' ? '未发现重大风险，文档合规。' : `发现 ${issues.length} 个潜在合规隐患，建议优化。`}</div>
                    </div>
                </div>
                {issues.map((issue: any, idx: number) => (
                    <ComplianceCard 
                        key={idx} 
                        issue={issue} 
                        index={idx} 
                        onLocate={onLocateIssue} 
                        onApply={(prompt: string) => onApplyComplianceFix && onApplyComplianceFix(issue, messageId, idx, prompt)} 
                        isProcessing={issue.isProcessing} 
                        isFixed={issue.isFixed} 
                    />
                ))}
            </div>
        );
    }

    if (type === 'BATCH_FILL_CONFIG') {
        return <BatchFillConfigCard data={data} messageId={messageId} onUpdate={onUpdateCardData} addAiMessage={addAiMessage} />;
    }

    if (type === 'BATCH_FILL_RESULT') {
        return <BatchFillResultCard data={data} onClick={() => onCardClick({ ...data, _type: 'BATCH_VISIT_RECORD' })} />;
    }

    if (type === 'BATCH') {
        return <BatchSummaryCard data={data} onClick={() => onCardClick(data)} />;
    }

    if (type === 'PERFORMANCE_LIST') {
        const items = data.items || [];
        // We need local state for processing? Or just pass down.
        // Simplified for this extraction.
        return (
            <div className="flex flex-col gap-3 w-full max-w-[310px] my-2">
                {items.map((item: any, index: number) => (
                    <PerformanceCard 
                        key={item.id} 
                        item={item} 
                        onUpdate={(newData: any) => {
                             const newItems = [...items];
                             newItems[index] = newData;
                             onUpdateCardData(messageId, { ...data, items: newItems });
                        }} 
                        onApply={onApplyChange} 
                        onViewDetail={(i: any) => onViewDetail && onViewDetail(i, messageId, index)} 
                        isOtherProcessing={false} // Simplification
                    />
                ))}
            </div>
        );
    }

    if (type === 'TRANSFER_RECORD') {
        return <TransferRecordCard data={data} />;
    }

    return <GenericEntityCard data={data} onClick={() => onCardClick(data)} />;
};
