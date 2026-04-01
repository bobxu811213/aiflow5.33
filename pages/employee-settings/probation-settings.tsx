import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { Search, HelpCircle, Edit2, Trash2, ArrowDownUp, Filter, Settings, Maximize2 } from 'lucide-react';

export default function ProbationSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  const [activeTab, setActiveTab] = useState<'rules' | 'assessment'>('rules');
  const [assessmentTab, setAssessmentTab] = useState<'schemes' | 'tasks'>('schemes');

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '转正设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const renderRulesTab = () => (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="p-6 max-w-5xl overflow-y-auto flex-1 pb-24">
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="w-64 text-right pr-4 text-sm text-gray-700">员工发起转正申请最多可提前</div>
            <div className="flex items-center">
              <input type="text" defaultValue="30" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
              <div className="flex flex-col border-l border-gray-300 ml-[-1px] rounded-r overflow-hidden">
                <button className="h-3.5 w-4 bg-gray-50 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0L8 4H0L4 0Z" fill="#9CA3AF"/>
                  </svg>
                </button>
                <button className="h-3.5 w-4 bg-gray-50 border border-gray-300 border-t-0 flex items-center justify-center hover:bg-gray-100">
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4L0 0H8L4 4Z" fill="#9CA3AF"/>
                  </svg>
                </button>
              </div>
              <span className="ml-2 text-sm text-gray-700">天（自然日）</span>
              <HelpCircle size={14} className="text-gray-400 ml-2" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-64 text-right pr-4 text-sm text-gray-700">转正审批通过后，是否自动确认转正：</div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="autoConfirm" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">是</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="autoConfirm" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">否</span>
              </label>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex items-center mb-6">
              <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
              <h3 className="text-sm font-medium text-gray-900">员工端操作权限控制</h3>
            </div>

            <div className="space-y-6 pl-4">
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 text-sm text-gray-700 mt-0.5">导师可操作：</div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['退出考核', '添加任务', '编辑任务', '完成任务', '删除任务', '任务评价设置', '综合评价设置'].map(item => (
                    <label key={item} className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-32 text-right pr-4 text-sm text-gray-700 mt-0.5">员工本人可操作：</div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['退出考核', '添加任务', '编辑任务', '完成任务', '删除任务'].map(item => (
                    <label key={item} className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Absolute positioned footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-100 flex justify-center bg-white z-10">
        <button className="px-8 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">
          保存
        </button>
      </div>
    </div>
  );

  const renderSchemesTab = () => {
    const schemes = [
      { id: 1, name: '没有的部门方案', scope: '没有的部门', creator: '波波司机', createTime: '2024-07-30 15:47', modifier: '许鸣波', modifyTime: '2025-05-08 18:17', status: '禁用' },
      { id: 2, name: '研发部新员工初级试用期', scope: '试用期分组,后勤部门试用期', creator: '波波司机', createTime: '2024-07-25 10:29', modifier: '许鸣波', modifyTime: '2025-05-08 18:17', status: '禁用' },
      { id: 3, name: '后勤', scope: '试用期产品部', creator: '波波司机', createTime: '2024-07-01 13:22', modifier: '许鸣波', modifyTime: '2025-05-12 17:08', status: '启用' },
    ];

    return (
      <div className="flex-1 flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded ${assessmentTab === 'schemes' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setAssessmentTab('schemes')}
            >
              方案管理
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded ${assessmentTab === 'tasks' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setAssessmentTab('tasks')}
            >
              任务管理
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索方案名称" 
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm w-48 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
            </div>
            <button className="px-4 py-1.5 border border-primary text-primary text-sm rounded hover:bg-emerald-50 transition-colors">
              +添加方案
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-primary text-sm rounded hover:bg-gray-50 transition-colors">
              变更记录
            </button>
            <div className="flex items-center space-x-1 ml-2">
              <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                <ArrowDownUp size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Settings size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto border border-gray-200 rounded">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-16">序号</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">方案名称</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">适用范围</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">创建人</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">创建时间</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">修改人</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">修改时间</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">状态</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schemes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.scope}</td>
                  <td className="px-4 py-3">{item.creator}</td>
                  <td className="px-4 py-3">{item.createTime}</td>
                  <td className="px-4 py-3">{item.modifier}</td>
                  <td className="px-4 py-3">{item.modifyTime}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === '启用' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      {item.status}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-primary hover:text-primary-hover">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-hover">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <button className="p-1 border border-gray-300 rounded text-gray-400 hover:bg-gray-50 disabled:opacity-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="px-2 py-1 border border-primary text-primary rounded bg-emerald-50">1</button>
            <button className="p-1 border border-gray-300 rounded text-gray-400 hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <select className="ml-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary">
              <option>10 条/页</option>
              <option>20 条/页</option>
              <option>50 条/页</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderTasksTab = () => {
    const tasks = [
      { id: 1, name: '这个新的', tags: [], content: '111', status: '启用', creator: '波波', createTime: '2025-02-20 13:38', modifier: '波波', modifyTime: '2025-02-20 13:38' },
      { id: 2, name: '新来的任务否', tags: ['新的标签'], content: '来', status: '启用', creator: '许鸣波', createTime: '2024-09-24 16:53', modifier: '许鸣波', modifyTime: '' },
      { id: 3, name: '马上加一个任务', tags: ['初级', '研发部', '新的标签'], content: '马上加一个任务', status: '启用', creator: '波波司机', createTime: '2024-09-24 16:29', modifier: '波波司机', modifyTime: '2024-09-24 16:29' },
      { id: 4, name: '部门年度和季度目标', tags: [], content: '了解部门年度和季度目标', status: '启用', creator: '谢雨蓉', createTime: '2024-05-07 12:43', modifier: '谢雨蓉', modifyTime: '2024-07-25 10:31' },
      { id: 5, name: '参加一次周会', tags: ['行政通用'], content: '参加一次部门周会', status: '启用', creator: '谢雨蓉', createTime: '2024-05-07 12:42', modifier: '谢雨蓉', modifyTime: '2024-07-25 10:33' },
      { id: 6, name: '认识新同事', tags: ['初级', '研发部'], content: '认识新同事，写一份自我介绍', status: '启用', creator: 'Ayumi', createTime: '2024-04-09 10:39', modifier: 'Ayumi', modifyTime: '2024-07-25 10:32' },
      { id: 7, name: '工作日记', tags: ['全员适用'], content: '填写工作日记', status: '启用', creator: '波波司机', createTime: '2024-04-06 13:30', modifier: '波波司机', modifyTime: '2024-07-25 10:32' },
    ];

    return (
      <div className="flex-1 flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded ${assessmentTab === 'schemes' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setAssessmentTab('schemes')}
            >
              方案管理
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded ${assessmentTab === 'tasks' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setAssessmentTab('tasks')}
            >
              任务管理
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索任务名称" 
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm w-48 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
            </div>
            <button className="px-4 py-1.5 border border-primary text-primary text-sm rounded hover:bg-emerald-50 transition-colors">
              +添加任务
            </button>
            <button className="px-4 py-1.5 border border-gray-300 text-primary text-sm rounded hover:bg-gray-50 transition-colors">
              变更记录
            </button>
            <div className="flex items-center space-x-1 ml-2">
              <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                <ArrowDownUp size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Settings size={16} />
              </button>
              <button className="p-1.5 border border-gray-300 rounded text-primary hover:bg-gray-50">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto border border-gray-200 rounded">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-16">序号</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">任务名称</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">任务标签</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">任务内容</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">状态</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">创建人</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">创建时间</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">修改人</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">修改时间</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs text-blue-600 border border-blue-200 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate" title={item.content}>{item.content}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === '启用' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      {item.status}
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.creator}</td>
                  <td className="px-4 py-3">{item.createTime}</td>
                  <td className="px-4 py-3">{item.modifier}</td>
                  <td className="px-4 py-3">{item.modifyTime}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-primary hover:text-primary-hover">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-hover">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <button className="p-1 border border-gray-300 rounded text-gray-400 hover:bg-gray-50 disabled:opacity-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="px-2 py-1 border border-primary text-primary rounded bg-emerald-50">1</button>
            <button className="p-1 border border-gray-300 rounded text-gray-400 hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <select className="ml-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary">
              <option>10 条/页</option>
              <option>20 条/页</option>
              <option>50 条/页</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-gray-100">
          <div className="flex space-x-6">
            <button 
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'rules' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('rules')}
            >
              规则设置
            </button>
            <button 
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'assessment' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('assessment')}
            >
              试用期考核管理
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {activeTab === 'rules' && renderRulesTab()}
          {activeTab === 'assessment' && (
            assessmentTab === 'schemes' ? renderSchemesTab() : renderTasksTab()
          )}
        </div>
      </div>
    </div>
  );
}
