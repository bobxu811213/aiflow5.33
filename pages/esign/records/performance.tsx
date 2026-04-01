import React from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

const PerformanceSigningRecordsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-neutral-500">
          <span>首页</span>
          <span>&gt;</span>
          <span>电子签</span>
          <span>&gt;</span>
          <span>签署记录</span>
          <span>&gt;</span>
          <span className="text-neutral-800 font-medium">绩效签署</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
          <h3 className="text-base font-medium">绩效签署记录</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <input
                placeholder="搜索绩效考核名称"
                className="flex h-9 w-[240px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <Filter className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">考核名称</th>
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">考核周期</th>
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">被考核人</th>
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">签署状态</th>
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">发起时间</th>
                  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">完成时间</th>
                  <th className="h-10 px-2 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-2 align-middle font-medium">2023年度绩效考核</td>
                    <td className="p-2 align-middle">2023-01-01 ~ 2023-12-31</td>
                    <td className="p-2 align-middle">李四</td>
                    <td className="p-2 align-middle">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        已完成
                      </span>
                    </td>
                    <td className="p-2 align-middle">2024-01-15 09:00</td>
                    <td className="p-2 align-middle">2024-01-20 16:45</td>
                    <td className="p-2 align-middle text-right">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3 text-primary hover:text-primary-hover hover:bg-primary-light">
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSigningRecordsPage;
