import React from 'react';
import { Layers, ChevronLeft, ChevronRight, MoreHorizontal, Clock, FileText } from 'lucide-react';

export const GrowthRecordTab = () => {
  const transferRecords = [
    {
      date: '2026-01-01',
      opTime: '2026-01-10 15:33:08',
      type: '调动',
      detail: '许鸣波通过快速调动为徐波波办理了调岗，部门由许波波测试公司变更成许波波测试公司，职位由 变更成产品小助理'
    },
    {
      date: '2025-12-02',
      opTime: '2025-12-04 13:52:18',
      type: '复职',
      detail: '许鸣波通过花名册复职，为徐波波办理了复职'
    },
    {
      date: '2025-11-30',
      opTime: '2025-12-04 13:51:04',
      type: '离职',
      detail: '许鸣波为徐波波办理了离职'
    },
    {
      date: '2025-08-18',
      opTime: '2025-08-18 11:13:40',
      type: '复职',
      detail: '许鸣波通过花名册复职，为820合同测试办理了复职'
    },
    {
      date: '2024-10-05',
      opTime: '2024-10-06 00:40:48',
      type: '离职',
      detail: '波波司机为820合同测试办理了离职'
    }
  ];

  const jobRecords = [
    {
      startDate: '2026-01-01',
      endDate: '至今',
      type: '主岗',
      dept: '许波波测试公司',
      position: '产品小助理',
      job: '',
      rank: '',
      reason: '',
      source: '系统生成',
      opTime: '2026-01-10 15:33:13'
    },
    {
      startDate: '2025-12-02',
      endDate: '2026-01-01',
      type: '主岗',
      dept: '许波波测试公司',
      position: '',
      job: '',
      rank: '',
      reason: '员工入职',
      source: '系统生成',
      opTime: '2025-12-04 13:52:23'
    },
    {
      startDate: '2025-10-01',
      endDate: '至今',
      type: '兼岗',
      dept: '许波波测试公司/产品部',
      position: '',
      job: '',
      rank: '',
      reason: '',
      source: '系统生成',
      opTime: '2025-12-04 13:52:20'
    },
    {
      startDate: '2025-08-18',
      endDate: '2025-11-30',
      type: '主岗',
      dept: '许波波测试公司',
      position: '',
      job: '',
      rank: '',
      reason: '员工离职',
      source: '系统生成',
      opTime: '2025-12-04 13:51:04'
    },
    {
      startDate: '2024-08-14',
      endDate: '2024-10-05',
      type: '主岗',
      dept: '许波波测试公司',
      position: '',
      job: '',
      rank: '',
      reason: '员工离职',
      source: '系统生成',
      opTime: '2024-10-06 00:40:48'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      {/* Header Actions */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-1 px-3 py-1.5 border border-[#13A695] text-[#13A695] text-sm rounded hover:bg-[#E6F8F6] transition-colors">
          <Clock size={14} />
          时间轴
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 border border-[#13A695] text-[#13A695] text-sm rounded hover:bg-[#E6F8F6] transition-colors">
          <FileText size={14} />
          导出记录
        </button>
      </div>

      {/* Section 1: Transfer Records */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Layers size={18} className="text-[#13A695]" />
          <span className="text-gray-700 font-medium">异动记录</span>
        </div>
        
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-4 py-3 w-32">异动时间</th>
                <th className="px-4 py-3 w-48">操作时间</th>
                <th className="px-4 py-3 w-24">异动类型</th>
                <th className="px-4 py-3">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transferRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{record.date}</td>
                  <td className="px-4 py-3 text-gray-600">{record.opTime}</td>
                  <td className="px-4 py-3 text-gray-600">{record.type}</td>
                  <td className="px-4 py-3 text-gray-600">{record.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 border-t border-gray-100 flex justify-end items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded"><ChevronLeft size={14} /></button>
            <span className="px-2 py-0.5 border border-[#13A695] text-[#13A695] rounded text-xs">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded"><ChevronRight size={14} /></button>
            <div className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1">
                <span>10 条/页</span>
                <ChevronRight size={12} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Job History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers size={18} className="text-[#13A695]" />
          <span className="text-gray-700 font-medium">企业内任职记录</span>
        </div>
        
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1000px]">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">任职开始日期</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职结束日期</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职类型</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职部门</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职职位</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职职务</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职职级</th>
                  <th className="px-4 py-3 whitespace-nowrap">任职变动原因说明</th>
                  <th className="px-4 py-3 whitespace-nowrap">数据来源</th>
                  <th className="px-4 py-3 whitespace-nowrap">操作时间</th>
                  <th className="px-4 py-3 whitespace-nowrap w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{record.startDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.endDate}</td>
                    <td className="px-4 py-3 text-gray-600">{record.type}</td>
                    <td className="px-4 py-3 text-gray-600">{record.dept}</td>
                    <td className="px-4 py-3 text-gray-600">{record.position}</td>
                    <td className="px-4 py-3 text-gray-600">{record.job}</td>
                    <td className="px-4 py-3 text-gray-600">{record.rank}</td>
                    <td className="px-4 py-3 text-gray-600">{record.reason}</td>
                    <td className="px-4 py-3 text-gray-600">{record.source}</td>
                    <td className="px-4 py-3 text-gray-600">{record.opTime}</td>
                    <td className="px-4 py-3 text-[#13A695] cursor-pointer">
                        <MoreHorizontal size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-gray-100 flex justify-end items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded"><ChevronLeft size={14} /></button>
            <span className="px-2 py-0.5 border border-[#13A695] text-[#13A695] rounded text-xs">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded"><ChevronRight size={14} /></button>
             <div className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1">
                <span>10 条/页</span>
                <ChevronRight size={12} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
