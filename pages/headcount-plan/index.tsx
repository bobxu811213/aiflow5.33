import React, { useState } from 'react';
import { ChevronRight, Filter, Edit3, Trash2, Info, HelpCircle, ChevronDown } from 'lucide-react';

const HeadcountPlanPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const plans = [
    {
      id: '1',
      name: '1',
      cycle: '2024/08~2025/07',
      maintenanceMethod: '分别维护部门编制(含下级)、直属编制',
      applicableOrg: '.../回收站/删除部门/研发部',
      overControl: '强管控',
      controlDimension: '职位',
      notOccupyingConditions: '',
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Main Card */}
      <div className="flex-1 bg-white rounded-lg p-4 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-medium text-neutral-800 mr-4">编制方案</h2>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center space-x-2">
            <select 
              className="border border-neutral-200 rounded px-3 py-1.5 text-sm text-neutral-800 outline-none focus:border-primary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <button className="px-4 py-1.5 text-sm text-primary border border-primary rounded hover:bg-primary-light transition-colors">
              添加年度
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="px-4 py-1.5 text-sm text-white bg-primary rounded hover:bg-primary-hover transition-colors"
              onClick={() => setIsCreateModalOpen(true)}
            >
              创建方案
            </button>
            <button className="p-1.5 text-neutral-500 border border-neutral-200 rounded hover:bg-neutral-50 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 border border-neutral-200 rounded-lg overflow-auto relative">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="sticky top-0 bg-neutral-50 z-10 shadow-sm">
              <tr className="border-b border-neutral-200">
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">方案名称</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制周期</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">编制维护方式</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">适用组织</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">超编管控</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">控编维度</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600">不占编条件</th>
                <th className="py-3 px-4 text-sm font-medium text-neutral-600 sticky right-0 bg-neutral-50 shadow-[-2px_0_5px_rgba(0,0,0,0.05)] w-20"></th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => (
                <tr key={plan.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.cycle}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.maintenanceMethod}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.applicableOrg}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.overControl}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.controlDimension}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800">{plan.notOccupyingConditions}</td>
                  <td className="py-3 px-4 text-sm text-neutral-800 sticky right-0 bg-white group-hover:bg-neutral-50 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center space-x-3 text-primary">
                      <button className="hover:text-primary-hover" title="编辑">
                        <Edit3 size={16} />
                      </button>
                      <button className="hover:text-primary-hover" title="删除">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm text-neutral-500">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-end mt-4 shrink-0">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <button className="p-1 border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button className="px-2.5 py-1 border border-primary text-primary rounded bg-primary-light">1</button>
            <button className="p-1 border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
            <select className="border border-neutral-200 rounded px-2 py-1 outline-none focus:border-primary">
              <option value="10">10 条/页</option>
              <option value="20">20 条/页</option>
              <option value="50">50 条/页</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Plan Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[880px] max-h-[90vh] flex flex-col shadow-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-800">创建编制方案</h3>
            </div>
            
            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Info Banner */}
              <div className="bg-[#E6F7F5] border border-[#B3E6DF] rounded px-4 py-2 flex items-center text-sm text-neutral-700 mb-6">
                <Info size={16} className="text-primary mr-2" />
                创建编制方案后，可在“编制制定”中设置组织具体的编制人数和控编维度值！
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* 方案名称 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    <span className="text-red-500 mr-1">*</span>方案名称：
                  </div>
                  <div className="flex-1">
                    <input type="text" className="w-full border border-neutral-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary" placeholder="请输入" />
                  </div>
                </div>

                {/* 周期类型 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    周期类型：
                  </div>
                  <div className="flex-1 flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="radio" name="cycleType" className="peer appearance-none w-4 h-4 border border-neutral-300 rounded-full checked:border-primary cursor-pointer" defaultChecked />
                        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                      </div>
                      <span className="ml-2 text-sm text-neutral-800">年度</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="radio" name="cycleType" className="peer appearance-none w-4 h-4 border border-neutral-300 rounded-full checked:border-primary cursor-pointer" />
                        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                      </div>
                      <span className="ml-2 text-sm text-neutral-800">季度</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="radio" name="cycleType" className="peer appearance-none w-4 h-4 border border-neutral-300 rounded-full checked:border-primary cursor-pointer" />
                        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                      </div>
                      <span className="ml-2 text-sm text-neutral-800">月度</span>
                    </label>
                  </div>
                </div>

                {/* 编制周期 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    <span className="text-red-500 mr-1">*</span>编制周期<HelpCircle size={14} className="inline text-neutral-400 ml-1" />：
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <select className="border border-neutral-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary w-32">
                      <option>本年</option>
                    </select>
                    <select className="border border-neutral-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary w-32">
                      <option>1月</option>
                    </select>
                    <button className="text-primary text-sm flex items-center hover:text-primary-hover">
                      展开明细 <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>

                {/* 编制维护方式 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700 whitespace-nowrap">
                    <span className="text-red-500 mr-1">*</span>编制维护方式<HelpCircle size={14} className="inline text-neutral-400 ml-1" />：
                  </div>
                  <div className="flex-1">
                    <select className="w-full border border-neutral-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary text-neutral-400">
                      <option>请选择</option>
                    </select>
                  </div>
                </div>

                {/* 适用组织 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    <span className="text-red-500 mr-1">*</span>适用组织：
                  </div>
                  <div className="flex-1">
                    <select className="w-full border border-neutral-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary text-neutral-400">
                      <option>请选择</option>
                    </select>
                  </div>
                </div>

                {/* 超编管控 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    超编管控：
                  </div>
                  <div className="flex-1 flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="radio" name="overControl" className="peer appearance-none w-4 h-4 border border-neutral-300 rounded-full checked:border-primary cursor-pointer" defaultChecked />
                        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                      </div>
                      <span className="ml-2 text-sm text-neutral-800 flex items-center">强管控 <HelpCircle size={14} className="text-neutral-400 ml-1" /></span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="radio" name="overControl" className="peer appearance-none w-4 h-4 border border-neutral-300 rounded-full checked:border-primary cursor-pointer" />
                        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                      </div>
                      <span className="ml-2 text-sm text-neutral-800">弱管控(仅提醒)</span>
                    </label>
                  </div>
                </div>

                {/* 控编维度 */}
                <div className="flex items-start">
                  <div className="w-36 text-right pr-4 pt-1 text-sm text-neutral-700">
                    控编维度：
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-neutral-500 mb-3 leading-relaxed">
                      1.如果不勾选控编维度，则默认按组织部门控编。<br/>
                      2.控编维度最多可选择3个。
                    </div>
                    <div className="grid grid-cols-4 gap-y-4">
                      {['职位', '职务', '员工类型', '职级', '工作地点', '合同公司', '合同类型', '证件类型'].map(dim => (
                        <label key={dim} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="accent-primary w-4 h-4 rounded border-neutral-300" />
                          <span className="ml-2 text-sm text-neutral-800">{dim}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 不占编条件 */}
                <div className="flex items-center">
                  <div className="w-36 text-right pr-4 text-sm text-neutral-700">
                    不占编条件：
                  </div>
                  <div className="flex-1 flex items-center space-x-4">
                    <div className="text-sm text-neutral-500">
                      当满足条件时，员工不占编制名额，系统录入不受限制
                    </div>
                    <button className="px-4 py-1.5 text-sm text-primary border border-primary rounded hover:bg-primary-light transition-colors flex items-center">
                      添加条件
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-end space-x-3 bg-white rounded-b-lg">
              <button 
                className="px-4 py-2 text-sm text-primary hover:text-primary-hover transition-colors"
                onClick={() => setIsCreateModalOpen(false)}
              >
                取消
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-primary rounded hover:bg-primary-hover transition-colors"
                onClick={() => setIsCreateModalOpen(false)}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadcountPlanPage;
