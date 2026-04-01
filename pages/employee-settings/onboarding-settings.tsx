import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { ChevronLeft, Search, HelpCircle, Edit2, ChevronDown } from 'lucide-react';

export default function OnboardingSettings() {
  const navigate = useNavigate();
  const { setHeaderBreadcrumbs } = useAppStore();
  const [activeTab, setActiveTab] = useState<'rules' | 'fields' | 'materials'>('rules');
  const [isMaterialEnabled, setIsMaterialEnabled] = useState(true);
  const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] = useState(false);

  useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '员工设置', path: '/employee-settings' },
      { label: '入职设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const renderRulesTab = () => (
    <div className="p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">员工求职登记时，不能选择</div>
          <div className="flex items-center">
            <input type="text" defaultValue="90" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
            <span className="ml-2 text-sm text-gray-700">天之外的最快到岗时间</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">是否启用入职审批：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="enableApproval" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="enableApproval" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">入职审批通过后，是否自动确认入职：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="autoConfirm" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="autoConfirm" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
            <HelpCircle size={14} className="text-gray-400 mr-1" />
            入职登记表审批，通知方式：
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="notifyMethod" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">设置默认通知方式</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="notifyMethod" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">发送时自选</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-64 text-right pr-4 text-sm text-gray-700 flex items-center justify-end mt-1">
            <HelpCircle size={14} className="text-gray-400 mr-1" />
            员工可入职年龄范围为：
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">男性</span>
              <input type="text" defaultValue="0" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
              <span className="mx-2 text-gray-500">—</span>
              <input type="text" defaultValue="99" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
              <span className="ml-2 text-sm text-gray-700">周岁</span>
              <span className="ml-2 text-xs text-gray-400">(最低周岁：包含，最高周岁：不包含)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">女性</span>
              <input type="text" defaultValue="0" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
              <span className="mx-2 text-gray-500">—</span>
              <input type="text" defaultValue="99" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
              <span className="ml-2 text-sm text-gray-700">周岁</span>
              <span className="ml-2 text-xs text-gray-400">(最低周岁：包含，最高周岁：不包含)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">入职登记表链接有效期：</div>
          <div className="flex items-center">
            <input type="text" defaultValue="30" className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-primary" />
            <span className="ml-2 text-sm text-gray-700">天 (自然日)</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">入职直属领导是否必填：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="leaderRequired" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="leaderRequired" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">员工进花名册自动发送加入公司邀请：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="autoInvite" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="autoInvite" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">是否限制员工办理入职周期天数：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="limitDays" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">不限</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="limitDays" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">限制</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-64 text-right pr-4 text-sm text-gray-700 mt-1">开启身份信息和银行卡认证：</div>
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <label className="flex items-center cursor-pointer mr-4">
                <input type="radio" name="enableAuth" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">是</span>
              </label>
              <label className="flex items-center cursor-pointer mr-4">
                <input type="radio" name="enableAuth" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">否</span>
              </label>
              <span className="text-sm text-gray-500 mr-2">余额：984次</span>
              <button className="text-sm text-primary hover:text-primary-hover">去充值</button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-100 w-[500px]">
              <div className="text-sm text-gray-700 mb-2">认证方式：</div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    身份信息二要素认证 <HelpCircle size={14} className="text-gray-400 ml-1" />
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    银行卡号三要素认证 <HelpCircle size={14} className="text-gray-400 ml-1" />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">待入职是否允许导入复职员工：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="allowRehire" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="allowRehire" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700">放弃入职原因：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="rejectReason" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">单选</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="rejectReason" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">多选</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-64 text-right pr-4 text-sm text-gray-700 flex items-center justify-end">
            <HelpCircle size={14} className="text-gray-400 mr-1" />
            复职员工入职日期是否限制：
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="limitRehireDate" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="limitRehireDate" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFieldsTab = () => {
    const fields = [
      { name: '手机号码', type: '文本', valid: true, required: true },
      { name: '证件号', type: '文本', valid: true, required: true },
      { name: '姓名', type: '文本', valid: true, required: true },
      { name: '工号', type: '文本', valid: true, required: false },
      { name: '头像', type: '图片', valid: true, required: false },
      { name: '出生日期', type: '日期', valid: true, required: false },
      { name: '民族', type: '选项', valid: true, required: false },
      { name: '证件照正面', type: '图片', valid: true, required: false },
      { name: '证件照反面', type: '图片', valid: false, required: false },
      { name: '户口所在地', type: '文本', valid: true, required: false },
      { name: '职务', type: '文本', valid: true, required: false },
      { name: '职务分类', type: '职务分类', valid: true, required: false },
      { name: '职级', type: '文本', valid: true, required: false },
      { name: '最高学历', type: '选项', valid: true, required: false },
      { name: '英文姓名', type: '文本', valid: false, required: false },
      { name: '证件类型', type: '选项', valid: true, required: true },
      { name: '历史工龄(年)', type: '小数', valid: false, required: false },
      { name: '工作地点', type: '文本', valid: true, required: false },
      { name: '联系地址', type: '文本', valid: false, required: false },
      { name: '首次参加工作日期', type: '日期', valid: false, required: false },
    ];

    return (
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-700 font-medium">
            <div className="w-4 h-4 mr-2 bg-emerald-100 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            </div>
            入职字段设置
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-1.5 border border-gray-300 text-primary text-sm rounded hover:bg-gray-50 transition-colors">
              重置系统默认
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="请输入关键字" 
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto border border-gray-200 rounded">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/4">字段</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/4">类型</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/4">
                  <div className="flex items-center">
                    入职配置有效 <HelpCircle size={14} className="text-gray-400 ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-1/4">
                  <div className="flex items-center">
                    待入职详情必填 <HelpCircle size={14} className="text-gray-400 ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900 flex items-center">
                  <ChevronDown size={16} className="mr-1 text-gray-500" />
                  默认分组(基础信息)
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                </td>
                <td className="px-4 py-2"></td>
              </tr>
              {fields.map((field, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 pl-10">{field.name}</td>
                  <td className="px-4 py-2">{field.type}</td>
                  <td className="px-4 py-2">
                    <input type="checkbox" defaultChecked={field.valid} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  </td>
                  <td className="px-4 py-2">
                    <input type="checkbox" defaultChecked={field.required} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900 flex items-center">
                  <ChevronDown size={16} className="mr-1 text-gray-500" />
                  合同信息(基础信息)
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                </td>
                <td className="px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMaterialsTab = () => {
    const materials = [
      { name: '特种作业证', desc: '', type: '文件', template: '否', required: '否' },
      { name: '健康证', desc: '', type: '文件', template: '否', required: '否' },
      { name: '电工证', desc: '', type: '文件', template: '否', required: '否' },
      { name: '学历证书', desc: '请上传个人获得的学历证书照片', type: '图片', template: '否', required: '否' },
      { name: '学位证书', desc: '请上传个人获得的学位证书照片', type: '图片', template: '否', required: '否' },
      { name: '离职证明', desc: '请上传上家公司的离职证明', type: '图片', template: '否', required: '否' },
      { name: '入职体检单', desc: '请上传6个月内的体检报告', type: '文件', template: '否', required: '否' },
      { name: '户籍证明', desc: '请上传本人户口簿照片，包含首页联、户主联、本人联', type: '图片', template: '否', required: '否' },
    ];

    return (
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-6">
          <div className="w-4 h-4 mr-2 bg-emerald-100 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
          </div>
          <span className="text-sm font-medium text-gray-900 mr-4">入职材料</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">入职材料：</span>
            <button 
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none mr-2 ${isMaterialEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              onClick={() => setIsMaterialEnabled(!isMaterialEnabled)}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMaterialEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
            <span className="text-sm text-gray-400">开启后，可线上收集候选人的附件资料</span>
          </div>
        </div>

        <div className="flex justify-end mb-4 space-x-2">
          <button 
            className="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-hover transition-colors"
            onClick={() => setIsAddMaterialModalOpen(true)}
          >
            添加
          </button>
          <button className="px-4 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
            删除
          </button>
          <button className="px-4 py-1.5 border border-gray-300 text-primary text-sm rounded hover:bg-gray-50 transition-colors">
            排序
          </button>
        </div>

        <div className="flex-1 overflow-auto border border-gray-200 rounded">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-12">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">资料名称</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">资料说明</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">类型</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">提供模板</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">是否必填</th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materials.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  </td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.desc}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.template}</td>
                  <td className="px-4 py-3">{item.required}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-primary hover:text-primary-hover">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <h1 className="text-base font-medium text-gray-900">入职设置</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6">
            <button 
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'rules' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('rules')}
            >
              规则设置
            </button>
            <button 
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'fields' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('fields')}
            >
              入职字段设置
            </button>
            <button 
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'materials' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('materials')}
            >
              入职材料
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'rules' && renderRulesTab()}
          {activeTab === 'fields' && renderFieldsTab()}
          {activeTab === 'materials' && renderMaterialsTab()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-white">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button className="px-6 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">
            保存
          </button>
        </div>
      </div>

      {/* Add Material Modal */}
      {isAddMaterialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-xl w-[600px] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base font-medium text-gray-900">添加入职资料</h2>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-24 text-right pr-4 text-sm text-gray-700"><span className="text-red-500 mr-1">*</span>资料名称：</div>
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="flex items-start">
                  <div className="w-24 text-right pr-4 text-sm text-gray-700 mt-2">资料说明：</div>
                  <div className="flex-1 flex flex-col">
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-none"
                      placeholder="用于说明对需要上传的资料的要求"
                    ></textarea>
                    <div className="text-right text-xs text-gray-400 mt-1">0 / 255</div>
                  </div>
                  <div className="ml-4 flex items-center mt-2">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="ml-2 text-sm text-gray-700">展示给员工</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-right pr-4 text-sm text-gray-700">资料类型：</div>
                  <div className="flex-1 relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white">
                      <option>附件</option>
                      <option>图片</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="ml-4 w-[100px]"></div> {/* Spacer to match layout */}
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-right pr-4 text-sm text-gray-700">是否有模板：</div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasTemplate" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasTemplate" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">否</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-right pr-4 text-sm text-gray-700">是否必填：</div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="isRequired" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="isRequired" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-700">否</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-4 bg-white rounded-b">
              <button 
                className="text-primary text-sm hover:text-primary-hover transition-colors"
                onClick={() => setIsAddMaterialModalOpen(false)}
              >
                取消
              </button>
              <button 
                className="px-6 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors"
                onClick={() => setIsAddMaterialModalOpen(false)}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
