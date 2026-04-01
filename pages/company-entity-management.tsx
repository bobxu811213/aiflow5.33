import React, { useState } from 'react';
import { 
  Settings, Maximize2, Plus, FileText, 
  Trash2, ChevronRight, ChevronLeft, ChevronDown,
  ExternalLink, Share2
} from 'lucide-react';

interface CompanyEntity {
  id: string;
  name: string;
  socialCreditCode: string;
  signingMethod: string;
  legalRepresentative: string;
  remark: string;
  verificationStatus: '已认证' | '未认证';
  creator: string;
  updateTime: string;
}

const MOCK_COMPANIES: CompanyEntity[] = [
  {
    id: '1',
    name: '边体股份公司',
    socialCreditCode: '',
    signingMethod: '手动签署',
    legalRepresentative: '',
    remark: '总公司',
    verificationStatus: '未认证',
    creator: '谢青',
    updateTime: '2023-10-25 14:30:00'
  },
  {
    id: '2',
    name: '北京分公司',
    socialCreditCode: '789789789789789',
    signingMethod: '手动签署',
    legalRepresentative: '',
    remark: '华北区业务',
    verificationStatus: '未认证',
    creator: '谢青',
    updateTime: '2023-10-26 09:15:00'
  },
  {
    id: '3',
    name: '测试法律实体',
    socialCreditCode: '8967898',
    signingMethod: '手动签署',
    legalRepresentative: '',
    remark: '测试用',
    verificationStatus: '未认证',
    creator: '谢青',
    updateTime: '2023-10-27 16:45:00'
  }
];

export default function CompanyEntityManagement() {
  const [companies, setCompanies] = useState<CompanyEntity[]>(MOCK_COMPANIES);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const toggleAllRows = () => {
    if (selectedRowIds.length === companies.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(companies.map(c => c.id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-lg font-bold text-gray-800">
          公司主体 ({companies.length})
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-1.5 bg-[#3bc5a9] text-white rounded text-sm hover:bg-[#32b097] transition-colors flex items-center">
            添加
          </button>
          <button className="px-4 py-1.5 border border-[#3bc5a9] text-[#3bc5a9] rounded text-sm hover:bg-green-50 transition-colors">
            批量分享权限
          </button>
          <button className="px-4 py-1.5 border border-[#3bc5a9] text-[#3bc5a9] rounded text-sm hover:bg-green-50 transition-colors">
            操作记录
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
            <Settings size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 cursor-pointer"
                  checked={companies.length > 0 && selectedRowIds.length === companies.length}
                  onChange={toggleAllRows}
                />
              </th>
              <th className="py-3 px-4">公司名称</th>
              <th className="py-3 px-4">社会信用代码</th>
              <th className="py-3 px-4">签署方式</th>
              <th className="py-3 px-4">法人</th>
              <th className="py-3 px-4">备注</th>
              <th className="py-3 px-4">
                <div className="flex items-center cursor-pointer hover:text-gray-900">
                  认证状态
                  <div className="ml-1 flex flex-col">
                    {/* Simple sort icon representation */}
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-gray-400 mb-[1px]"></div>
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-gray-400"></div>
                  </div>
                </div>
              </th>
              <th className="py-3 px-4">创建人</th>
              <th className="py-3 px-4">更新时间</th>
              <th className="py-3 px-4 w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {companies.map((company) => (
              <tr 
                key={company.id} 
                className={`hover:bg-[#eafaf7] group transition-colors ${selectedRowIds.includes(company.id) ? 'bg-[#eafaf7]' : ''}`}
              >
                <td className="py-3 px-6">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 cursor-pointer"
                    checked={selectedRowIds.includes(company.id)}
                    onChange={() => toggleRowSelection(company.id)}
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">{company.name}</td>
                <td className="py-3 px-4 text-gray-600">{company.socialCreditCode}</td>
                <td className="py-3 px-4 text-gray-600">{company.signingMethod}</td>
                <td className="py-3 px-4 text-gray-600">{company.legalRepresentative}</td>
                <td className="py-3 px-4 text-gray-600">{company.remark}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-gray-500">
                    <span className={`w-2 h-2 rounded-full mr-2 ${company.verificationStatus === '已认证' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    {company.verificationStatus}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{company.creator}</td>
                <td className="py-3 px-4 text-gray-600">{company.updateTime}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[#3bc5a9] hover:text-[#32b097]" title="分享">
                      <ExternalLink size={16} />
                    </button>
                    <button className="text-[#3bc5a9] hover:text-[#32b097]" title="删除">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-[#3bc5a9] hover:text-[#32b097]" title="详情">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end items-center space-x-2">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-400 disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-[#3bc5a9] text-[#3bc5a9] rounded bg-white">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
          <ChevronRight size={16} />
        </button>
        <div className="relative ml-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-600 flex items-center hover:bg-gray-50">
            10 条/页 <ChevronDown size={14} className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Floating Buttons (Reused from App layout, but if this component is inside Main, they might be duplicated if not careful. 
          The screenshot shows them, but usually they are global. 
          In App.tsx, the floating buttons are inside the 'else' block of the main content switch. 
          Since we are adding a new module, we should probably check if we need to add them here or if App.tsx handles them globally.
          Looking at App.tsx, floating buttons are inside the `else` block (signature records). 
          So we should probably add them here or move them to a global location in App.tsx. 
          For now, I'll add them here to match the screenshot exactly for this view.) 
      */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-4">
        <button className="w-12 h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#3bc5a9] hover:bg-gray-50 border border-gray-100 transition-transform hover:scale-105">
          <div className="w-6 h-6 flex items-center justify-center border-2 border-[#3bc5a9] rounded-full">
             <span className="text-xs font-bold">🌐</span>
          </div>
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#3bc5a9] hover:bg-gray-50 border border-gray-100 transition-transform hover:scale-105">
          <HelpCircleIcon />
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center relative border border-gray-100 overflow-hidden transition-transform hover:scale-105">
          <img src="https://picsum.photos/seed/assistant/48/48" alt="assistant" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </div>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}
