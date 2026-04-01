import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, HelpCircle, Globe, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';
import { CustomSelect } from '../../components/ui/custom-select';

// Dropdown Constants
const RESIGNATION_REASONS = ['个人原因', '职业发展', '薪资福利', '家庭原因', '健康原因', '其他'];
const PRIMARY_RESIGNATION_REASONS = ['薪资偏低', '管理问题', '工作环境', '工作压力', '职业瓶颈', '其他'];

interface ResignationDetailProps {
  onCancel: () => void;
  onSave: (data: any) => void;
}

export const ResignationDetail: React.FC<ResignationDetailProps> = ({ onCancel, onSave }) => {
  const { setHeaderBreadcrumbs } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    applicationDate: '2026-03-06',
    resignationType: '主动离职',
    resignationReason: '',
    reasonDescription: '',
    primaryReason: '',
    lastWorkingDate: '',
    resignationDate: '',
    remark: '',
    salaryCutoffDate: '',
    isBlacklisted: false,
    blacklistReason: '',
  });

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', onClick: onCancel },
      { label: '异动管理', onClick: onCancel },
      { label: '离职', onClick: onCancel },
      { label: '办理员工离职' }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs, onCancel]);

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.applicationDate) {
      alert('请填写必填项');
      return;
    }
    if (formData.isBlacklisted && !formData.blacklistReason.trim()) {
      alert('请填写加入黑名单原因');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white shadow-sm z-20 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-[#15B8A6] font-medium">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>办理员工离职</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Name */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                <span className="text-red-500 mr-1">*</span>姓名：
              </label>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="请输入员工姓名查询"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* Application Date */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                <span className="text-red-500 mr-1">*</span>申请日期：
              </label>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6]"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                />
              </div>
            </div>

            {/* Resignation Type */}
            <div className="flex items-center col-span-2">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                <span className="text-red-500 mr-1">*</span>离职类型：
              </label>
              <div className="flex-1 flex space-x-6">
                {['主动离职', '被动离职', '发疯', '其他'].map((type) => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="resignationType"
                      className="w-4 h-4 text-[#15B8A6] border-gray-300 focus:ring-[#15B8A6]"
                      checked={formData.resignationType === type}
                      onChange={() => setFormData({ ...formData, resignationType: type })}
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex items-center flex-1">
                <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                  <span className="text-red-500 mr-1">*</span>离职原因：
                </label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={RESIGNATION_REASONS}
                    value={formData.resignationReason}
                    onChange={(val) => setFormData({ ...formData, resignationReason: val })}
                    placeholder="请选择"
                  />
                </div>
              </div>
            </div>

            {/* Reason Description & Primary Reason */}
            <div className="flex items-start col-span-2">
              <div className="flex-1 flex items-start">
                <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 mt-2">
                  原因说明：
                </label>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6] h-32 resize-none"
                    placeholder=""
                    value={formData.reasonDescription}
                    onChange={(e) => setFormData({ ...formData, reasonDescription: e.target.value })}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {formData.reasonDescription.length} / 600
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-start ml-12">
                <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 mt-2 flex items-center justify-end">
                  <HelpCircle className="w-4 h-4 mr-1 text-gray-400" />
                  离职首要原因：
                </label>
                <div className="flex-1 relative">
                  <CustomSelect 
                    options={PRIMARY_RESIGNATION_REASONS}
                    value={formData.primaryReason}
                    onChange={(val) => setFormData({ ...formData, primaryReason: val })}
                    placeholder="请选择"
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                <span className="text-red-500 mr-1">*</span>最后工作日期：
              </label>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6]"
                  value={formData.lastWorkingDate}
                  onChange={(e) => setFormData({ ...formData, lastWorkingDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 flex items-center justify-end">
                <span className="text-red-500 mr-1">*</span>
                <HelpCircle className="w-4 h-4 mr-1 text-gray-400" />
                离职日期：
              </label>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6]"
                  value={formData.resignationDate}
                  onChange={(e) => setFormData({ ...formData, resignationDate: e.target.value })}
                />
              </div>
            </div>

            {/* Remark & Salary Cutoff */}
            <div className="flex items-start col-span-2">
              <div className="flex-1 flex items-start">
                <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 mt-2">
                  备注：
                </label>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6] h-32 resize-none"
                    placeholder=""
                    value={formData.remark}
                    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {formData.remark.length} / 200
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-start ml-12">
                <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 mt-2">
                  计薪截止日期：
                </label>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6]"
                    value={formData.salaryCutoffDate}
                    onChange={(e) => setFormData({ ...formData, salaryCutoffDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Blacklist */}
            <div className="flex items-center col-span-2">
              <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4">
                是否加入黑名单：
              </label>
              <div className="flex-1">
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.isBlacklisted ? 'bg-[#15B8A6]' : 'bg-gray-300'}`}
                  onClick={() => setFormData({ ...formData, isBlacklisted: !formData.isBlacklisted })}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${formData.isBlacklisted ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>

            {/* Blacklist Reason - Conditional */}
            {formData.isBlacklisted && (
                <div className="flex items-start col-span-2">
                    <label className="w-32 text-right text-sm font-medium text-gray-700 mr-4 mt-2">
                        <span className="text-red-500 mr-1">*</span>加入黑名单原因：
                    </label>
                    <div className="flex-1 relative">
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#15B8A6] focus:border-[#15B8A6] h-32 resize-none"
                            value={formData.blacklistReason}
                            onChange={(e) => setFormData({ ...formData, blacklistReason: e.target.value })}
                            placeholder=""
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {formData.blacklistReason?.length || 0} / 500
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-center space-x-4 z-20">
        <button
          onClick={onCancel}
          className="px-8 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-sm font-medium"
        >
          取消
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-2 bg-[#15B8A6] text-white rounded hover:bg-[#0d9488] text-sm font-medium"
        >
          保存
        </button>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-8 flex flex-col space-y-3 z-30">
        <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <Globe className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-full shadow-lg text-[#15B8A6] hover:bg-gray-50">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-full shadow-lg relative">
            <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                 <img src="https://picsum.photos/seed/avatar/200/200" alt="Avatar" />
            </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
      </div>
    </div>
  );
};
