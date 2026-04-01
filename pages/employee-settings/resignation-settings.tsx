import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { HelpCircle, ChevronLeft } from 'lucide-react';

export default function ResignationSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  
  const [limitApplyTime, setLimitApplyTime] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [defaultSocialSecurity, setDefaultSocialSecurity] = useState(true);

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '离职设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
        {/* Header/Tabs */}
        <div className="px-6 pt-4 border-b border-gray-100 flex items-center">
          <button 
            onClick={() => navigate('/employee-settings')}
            className="p-1.5 border border-gray-200 rounded mr-4 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex space-x-6">
            <button className="pb-3 text-sm font-medium border-b-2 border-primary text-primary transition-colors">
              规则设置
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 pb-24">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* 限制申请时间 */}
            <div>
              <div className="flex items-center w-full">
                <div className="w-[40%] text-right pr-4 text-sm text-gray-700">
                  员工发起离职申请时，是否限制申请时间：
                </div>
                <div className="w-[60%] flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="limitApplyTime" 
                      checked={limitApplyTime}
                      onChange={() => setLimitApplyTime(true)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="limitApplyTime" 
                      checked={!limitApplyTime}
                      onChange={() => setLimitApplyTime(false)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
              
              {limitApplyTime && (
                <div className="mt-4 ml-[40%] bg-gray-50 p-4 rounded flex items-center">
                  <span className="text-sm text-gray-700 mr-2">至少提前</span>
                  <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden w-24">
                    <input type="text" defaultValue="0" className="w-full px-2 py-1 text-center text-sm focus:outline-none" />
                    <div className="flex flex-col border-l border-gray-300">
                      <button className="h-3.5 w-4 bg-gray-50 border-b border-gray-300 flex items-center justify-center hover:bg-gray-100">
                        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 0L8 4H0L4 0Z" fill="#9CA3AF"/>
                        </svg>
                      </button>
                      <button className="h-3.5 w-4 bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4L0 0H8L4 4Z" fill="#9CA3AF"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 ml-2">天发起申请</span>
                </div>
              )}
            </div>

            {/* 自动确认离职 */}
            <div>
              <div className="flex items-center w-full mb-3">
                <div className="w-[40%] text-right pr-4 text-sm text-gray-700">
                  离职审批通过后，是否自动确认离职：
                </div>
                <div className="w-[60%] flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="autoConfirm" 
                      checked={autoConfirm}
                      onChange={() => setAutoConfirm(true)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="autoConfirm" 
                      checked={!autoConfirm}
                      onChange={() => setAutoConfirm(false)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
              
              <div className="ml-[40%] flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">短信通知 <span className="text-emerald-500">（剩余181条）</span></span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    邮件通知
                    <HelpCircle size={14} className="text-gray-400 ml-1" />
                  </span>
                </label>
              </div>
            </div>

            {/* 签署协议提示 */}
            <div className="flex items-center w-full">
              <div className="w-[40%] text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                签署了协议的员工离职，是否提示HR查看确认
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-[60%] flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="hrConfirm" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="hrConfirm" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* 默认社保公积金 */}
            <div>
              <div className="flex items-center w-full">
                <div className="w-[40%] text-right pr-4 text-sm text-gray-700">
                  默认社保公积金最后缴纳月：
                </div>
                <div className="w-[60%] flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="defaultSocialSecurity" 
                      checked={defaultSocialSecurity}
                      onChange={() => setDefaultSocialSecurity(true)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="defaultSocialSecurity" 
                      checked={!defaultSocialSecurity}
                      onChange={() => setDefaultSocialSecurity(false)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
              
              {defaultSocialSecurity && (
                <div className="mt-4 ml-[40%] bg-gray-50 p-6 rounded space-y-6">
                  <div className="text-sm font-medium text-gray-700">自动计算规则：</div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-24">离职日期每月</span>
                      <select className="mx-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white">
                        <option>15</option>
                      </select>
                      <span className="flex items-center">
                        <HelpCircle size={14} className="text-gray-400 mx-1" />日（不含）之前
                      </span>
                      <span className="ml-4 mr-2">「社保最后缴纳月」为离职日期</span>
                      <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white">
                        <option>上月</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700 pl-[230px]">
                      <span className="mr-2">「公积金最后缴纳月」为离职日期</span>
                      <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white">
                        <option>上月</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-24">离职日期每月</span>
                      <select className="mx-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white" disabled>
                        <option>15</option>
                      </select>
                      <span className="mx-1">日（含）之后</span>
                      <span className="ml-[34px] mr-2">「社保最后缴纳月」为离职日期</span>
                      <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white">
                        <option>当月</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700 pl-[230px]">
                      <span className="mr-2">「公积金最后缴纳月」为离职日期</span>
                      <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary bg-white">
                        <option>当月</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <span className="text-sm text-gray-700 mr-4 flex items-center">
                      字段只读是否自动计算
                      <HelpCircle size={14} className="text-gray-400 ml-1" />：
                    </span>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="readOnlyAutoCalc" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                        <span className="ml-2 text-sm text-gray-700">是</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="readOnlyAutoCalc" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                        <span className="ml-2 text-sm text-gray-700">否</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 查看员工分组 */}
            <div className="flex items-center w-full">
              <div className="w-[40%] text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                查看员工分组
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-[60%] flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewEmpGroupResign" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewEmpGroupResign" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* 查看权限分组 */}
            <div className="flex items-center w-full">
              <div className="w-[40%] text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
                查看权限分组
                <HelpCircle size={14} className="text-gray-400 ml-1" />：
              </div>
              <div className="w-[60%] flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewPermGroupResign" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="viewPermGroupResign" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

            {/* 签署人存在待签署 */}
            <div className="flex items-center w-full">
              <div className="w-[40%] text-right pr-4 text-sm text-gray-700">
                签署人存在待签署的签署记录时，是否可以确认离职：
              </div>
              <div className="w-[60%] flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="pendingSignConfirm" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="pendingSignConfirm" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700">否</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-100 flex justify-center bg-white z-10">
          <button className="px-8 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
