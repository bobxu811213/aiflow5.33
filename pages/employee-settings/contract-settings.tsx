import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { ChevronLeft, HelpCircle } from 'lucide-react';

export default function ContractSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  
  const [firstTerm, setFirstTerm] = useState('12');
  const [secondTermType, setSecondTermType] = useState('fixed'); // 'fixed' | 'unfixed'
  const [secondTerm, setSecondTerm] = useState('36');
  const [thirdTermType, setThirdTermType] = useState('unfixed'); // 'fixed' | 'unfixed'
  const [thirdTerm, setThirdTerm] = useState('');
  
  const [warningDays, setWarningDays] = useState('45');
  const [autoEsign, setAutoEsign] = useState(false);

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '合同设置', path: null }
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
              合同设置
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="max-w-3xl mx-auto space-y-10 mt-4">
            
            {/* 默认合同期限 */}
            <div className="space-y-6">
              <div className="flex items-center text-gray-800 font-medium">
                默认合同期限：<span className="text-gray-500 text-sm font-normal ml-2">(仅限合同类型为劳动合同)</span>
              </div>
              
              <div className="space-y-6 pl-2">
                {/* 第一次 */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-40">第一次签订合同默认期限：</span>
                  <input 
                    type="text" 
                    value={firstTerm}
                    onChange={(e) => setFirstTerm(e.target.value)}
                    className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mx-2"
                  />
                  <span>月</span>
                </div>

                {/* 第二次 */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-40">第二次签订合同默认期限：</span>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="secondTermType"
                        checked={secondTermType === 'fixed'}
                        onChange={() => setSecondTermType('fixed')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                      />
                      固定期限
                    </label>
                    {secondTermType === 'fixed' && (
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          value={secondTerm}
                          onChange={(e) => setSecondTerm(e.target.value)}
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mx-2"
                        />
                        <span>月</span>
                      </div>
                    )}
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="secondTermType"
                        checked={secondTermType === 'unfixed'}
                        onChange={() => setSecondTermType('unfixed')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                      />
                      无固定期限
                    </label>
                  </div>
                </div>

                {/* 第三次 */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-40">第三次签订合同默认期限：</span>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="thirdTermType"
                        checked={thirdTermType === 'fixed'}
                        onChange={() => setThirdTermType('fixed')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                      />
                      固定期限
                    </label>
                    {thirdTermType === 'fixed' && (
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          value={thirdTerm}
                          onChange={(e) => setThirdTerm(e.target.value)}
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mx-2"
                        />
                        <span>月</span>
                      </div>
                    )}
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="thirdTermType"
                        checked={thirdTermType === 'unfixed'}
                        onChange={() => setThirdTermType('unfixed')}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                      />
                      无固定期限
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 合同到期预警通知 */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-800 font-medium">
                合同到期预警通知：
              </div>
              <div className="flex items-center text-sm text-gray-700 pl-2">
                <span>提前</span>
                <input 
                  type="text" 
                  value={warningDays}
                  onChange={(e) => setWarningDays(e.target.value)}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mx-2"
                />
                <span>天生成到期提醒</span>
              </div>
            </div>

            {/* 是否开启自动发起电子签约流程 */}
            <div className="flex items-center text-sm text-gray-700">
              <span className="flex items-center mr-6">
                是否开启自动发起电子签约流程
                <HelpCircle size={14} className="text-gray-400 ml-1" />
                ：
              </span>
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="autoEsign"
                    checked={autoEsign === true}
                    onChange={() => setAutoEsign(true)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                  />
                  是
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="autoEsign"
                    checked={autoEsign === false}
                    onChange={() => setAutoEsign(false)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary mr-2"
                  />
                  否
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
