import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

interface DirectoryPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectoryPermissionModal: React.FC<DirectoryPermissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    message: 'all',
    report: 'all',
    points: 'all',
    approval: 'same',
    display: 'default',
    view: 'allow',
  });

  if (!isOpen) return null;

  const RadioGroup = ({ 
    label, 
    name, 
    options, 
    value, 
    onChange,
    showHelp = false
  }: { 
    label: string; 
    name: string; 
    options: { label: string; value: string }[]; 
    value: string; 
    onChange: (val: string) => void;
    showHelp?: boolean;
  }) => (
    <div className="flex items-center mb-4">
      <div className="w-32 flex items-center text-sm text-gray-700">
        {showHelp && <HelpCircle size={14} className="text-gray-400 mr-1" />}
        {label}：
      </div>
      <div className="flex items-center space-x-6">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center cursor-pointer">
            <div className="relative flex items-center justify-center w-4 h-4 mr-2">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-primary checked:border-[5px] transition-all cursor-pointer"
              />
            </div>
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg w-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-900">设置</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <RadioGroup
            label="企信"
            name="message"
            value={formData.message}
            onChange={(val) => setFormData({ ...formData, message: val })}
            options={[
              { label: '全体员工', value: 'all' },
              { label: '同通讯录权限', value: 'same' },
            ]}
          />
          <RadioGroup
            label="工作汇报"
            name="report"
            value={formData.report}
            onChange={(val) => setFormData({ ...formData, report: val })}
            options={[
              { label: '全体员工', value: 'all' },
              { label: '同通讯录权限', value: 'same' },
            ]}
          />
          <RadioGroup
            label="积分"
            name="points"
            value={formData.points}
            onChange={(val) => setFormData({ ...formData, points: val })}
            options={[
              { label: '全体员工', value: 'all' },
              { label: '同通讯录权限', value: 'same' },
            ]}
          />
          <RadioGroup
            label="审批"
            name="approval"
            value={formData.approval}
            onChange={(val) => setFormData({ ...formData, approval: val })}
            options={[
              { label: '全体员工', value: 'all' },
              { label: '同通讯录权限', value: 'same' },
            ]}
          />
          <RadioGroup
            label="通讯录显示设置"
            name="display"
            showHelp={true}
            value={formData.display}
            onChange={(val) => setFormData({ ...formData, display: val })}
            options={[
              { label: '显示默认', value: 'default' },
              { label: '全部隐藏', value: 'hide_all' },
              { label: '部分隐藏', value: 'hide_partial' },
            ]}
          />
          <RadioGroup
            label="通讯录查看设置"
            name="view"
            showHelp={true}
            value={formData.view}
            onChange={(val) => setFormData({ ...formData, view: val })}
            options={[
              { label: '允许', value: 'allow' },
              { label: '不允许', value: 'not_allow' },
              { label: '部门内允许', value: 'allow_dept' },
              { label: '公司内允许', value: 'allow_company' },
            ]}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
          >
            关闭
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};
