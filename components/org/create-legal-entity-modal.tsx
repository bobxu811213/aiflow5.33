import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { DatePicker } from '../ui/date-picker';
import { ChevronDown } from 'lucide-react';

interface CreateLegalEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const CreateLegalEntityModal: React.FC<CreateLegalEntityModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    creditCode: '',
    applicableObjects: '全体员工',
    taxArea: '',
    address: '',
    phone: '',
    bankName: '',
    bankAccount: '',
    companyCode: '',
    companyShortName: '',
    establishmentDate: '',
    acquisitionDate: '',
    companyType: '',
    hrScopeCode: '',
    hrScope: '',
    salaryScopeCode: '',
    salaryScope: '',
    bankTransferCode: '',
    bankTransferName: '',
    legalRepresentative: '',
    remarks: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const footer = (
    <>
      <button 
        onClick={onClose}
        className="px-4 py-1.5 text-sm text-primary hover:bg-primary-light/50 rounded transition-colors"
      >
        取消
      </button>
      <button 
        onClick={handleSave}
        className="px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded shadow-sm transition-colors"
      >
        保存
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="创建法律实体"
      width="w-[800px]"
      footer={footer}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* Row 1 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>公司名称：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            <span className="text-[#FF4D4F] mr-1">*</span>社会信用代码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.creditCode}
            onChange={(e) => handleChange('creditCode', e.target.value)}
          />
        </div>

        {/* Row 2 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            适用对象：
          </label>
          <div className="flex items-center space-x-6 flex-1">
            <label className="flex items-center cursor-pointer">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${formData.applicableObjects === '全体员工' ? 'border-primary' : 'border-gray-300'}`}>
                {formData.applicableObjects === '全体员工' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <input 
                type="radio" 
                className="hidden" 
                checked={formData.applicableObjects === '全体员工'}
                onChange={() => handleChange('applicableObjects', '全体员工')}
              />
              <span className="text-sm text-[#262626]">全体员工</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${formData.applicableObjects === '指定员工' ? 'border-primary' : 'border-gray-300'}`}>
                {formData.applicableObjects === '指定员工' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <input 
                type="radio" 
                className="hidden" 
                checked={formData.applicableObjects === '指定员工'}
                onChange={() => handleChange('applicableObjects', '指定员工')}
              />
              <span className="text-sm text-[#262626]">指定员工</span>
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            报税区域：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.taxArea}
              onChange={(e) => handleChange('taxArea', e.target.value)}
            >
              <option value=""></option>
              <option value="区域A">区域A</option>
              <option value="区域B">区域B</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            地址：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            电话：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        {/* Row 4 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            开户银行：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.bankName}
            onChange={(e) => handleChange('bankName', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            银行账号：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.bankAccount}
            onChange={(e) => handleChange('bankAccount', e.target.value)}
          />
        </div>

        {/* Row 5 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            公司代码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.companyCode}
            onChange={(e) => handleChange('companyCode', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            公司简称：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.companyShortName}
            onChange={(e) => handleChange('companyShortName', e.target.value)}
          />
        </div>

        {/* Row 6 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            成立时间：
          </label>
          <div className="flex-1">
            <DatePicker 
              value={formData.establishmentDate}
              onChange={(date) => handleChange('establishmentDate', date)}
              placeholder="请选择日期"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            收购时间：
          </label>
          <div className="flex-1">
            <DatePicker 
              value={formData.acquisitionDate}
              onChange={(date) => handleChange('acquisitionDate', date)}
              placeholder="请选择日期"
            />
          </div>
        </div>

        {/* Row 7 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            公司类型：
          </label>
          <div className="relative flex-1">
            <select 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white transition-colors"
              value={formData.companyType}
              onChange={(e) => handleChange('companyType', e.target.value)}
            >
              <option value=""></option>
              <option value="类型A">类型A</option>
              <option value="类型B">类型B</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            人事范围代码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.hrScopeCode}
            onChange={(e) => handleChange('hrScopeCode', e.target.value)}
          />
        </div>

        {/* Row 8 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            人事范围：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.hrScope}
            onChange={(e) => handleChange('hrScope', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            工资范围代码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.salaryScopeCode}
            onChange={(e) => handleChange('salaryScopeCode', e.target.value)}
          />
        </div>

        {/* Row 9 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            工资范围：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.salaryScope}
            onChange={(e) => handleChange('salaryScope', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            银行传盘代码：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.bankTransferCode}
            onChange={(e) => handleChange('bankTransferCode', e.target.value)}
          />
        </div>

        {/* Row 10 */}
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            银行传盘名称：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.bankTransferName}
            onChange={(e) => handleChange('bankTransferName', e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0">
            法人：
          </label>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={formData.legalRepresentative}
            onChange={(e) => handleChange('legalRepresentative', e.target.value)}
          />
        </div>

        {/* Row 11 - Full Width */}
        <div className="col-span-2 flex items-start">
          <label className="w-32 text-right pr-4 text-sm text-[#262626] shrink-0 pt-2">
            备注：
          </label>
          <div className="flex-1 relative">
            <textarea 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-y min-h-[80px]"
              value={formData.remarks}
              onChange={(e) => handleChange('remarks', e.target.value)}
              maxLength={200}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {formData.remarks.length} / 200
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
