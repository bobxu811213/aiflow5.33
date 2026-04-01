import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Upload, Smartphone } from 'lucide-react';

const steps = [
  { id: 1, title: '基础设置' },
  { id: 2, title: '引导页' },
  { id: 3, title: '表单内容' },
  { id: 4, title: '入职材料' },
  { id: 5, title: '信息提交' },
];

export default function OnboardingFormWizardPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    navigate('/employee-settings/onboarding-form-settings');
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
        <button 
          onClick={() => navigate('/employee-settings/onboarding-form-settings')}
          className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
        >
          <ChevronLeft size={20} />
          <span className="ml-1 text-sm">返回</span>
        </button>
        <h1 className="text-base font-medium text-gray-800">创建模板</h1>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setCurrentStep(step.id)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 
                  ${currentStep === step.id ? 'border-primary text-primary' : 
                    currentStep > step.id ? 'border-primary bg-primary text-white' : 
                    'border-gray-300 text-gray-400'}`}
                >
                  {currentStep > step.id ? <Check size={14} /> : step.id}
                </div>
                <span className={`ml-2 text-sm ${currentStep === step.id ? 'text-primary font-medium' : currentStep > step.id ? 'text-gray-800' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 min-h-full">
          {currentStep === 1 && <Step1BasicSettings />}
          {currentStep === 2 && <Step2GuidePage />}
          {currentStep === 3 && <Step3FormContent />}
          {currentStep === 4 && <Step4Materials />}
          {currentStep === 5 && <Step5Submission />}
        </div>
      </div>

      {/* Footer */}
      <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-end px-6 shrink-0 space-x-3">
        <button 
          onClick={() => navigate('/employee-settings/onboarding-form-settings')}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded border border-transparent"
        >
          取消
        </button>
        {currentStep > 1 && (
          <button 
            onClick={handlePrev}
            className="px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded border border-transparent"
          >
            上一步
          </button>
        )}
        {currentStep < 5 ? (
          <button 
            onClick={handleNext}
            className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded"
          >
            下一步
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded"
          >
            保存
          </button>
        )}
      </div>
    </div>
  );
}

function Step1BasicSettings() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center mb-6 text-gray-800 font-medium">
        <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
        基础设置
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600"><span className="text-red-500 mr-1">*</span>名称：</div>
          <input type="text" className="flex-1 max-w-md h-8 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary" />
        </div>
        
        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600">是否启用OCR自动解析身份证、银行卡信息：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="ocr" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="ocr" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600">模板首页是否显示企业名称：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="showEnterprise" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">显示</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="showEnterprise" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">不显示</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600">入职部门选择模式：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="deptMode" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">按照部门名称搜索选择</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="deptMode" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">按照部门列表直接选择</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600">是否仅待入职员工可填写：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="onlyPending" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="onlyPending" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-48 text-right pr-4 text-sm text-gray-600">开启身份信息、人脸核身和银行卡认证：</div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="verify" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">是</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="verify" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">否</span>
            </label>
            <span className="text-sm text-gray-500 ml-4">余额：984次 <a href="#" className="text-primary hover:underline">去充值</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2GuidePage() {
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState('入职引导');
  const [content, setContent] = useState('亲爱的小伙伴：\n  感谢你对公司的认可，欢迎你的加入！在填写入职信息前，请认真阅读以下说明，提前准备好相关材料。\n\n办理入职所需的材料和证件如下：\n1. 原单位离职证明（加盖原单位公章）1份\n2. 身份证原件\n3. 学位证、毕业证原件\n4. 相关资格证书原件\n5. 入职体检报告\n6. 银行卡一张');

  return (
    <div className="flex h-full py-4">
      <div className="flex-1 pr-8 border-r border-gray-100">
        <div className="flex items-center mb-6 text-gray-800 font-medium">
          <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
          引导页
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-24 text-right pr-4 text-sm text-gray-600">引导页：</div>
            <div className="flex items-center">
              <button 
                className={`w-10 h-5 rounded-full relative transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setEnabled(!enabled)}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="ml-3 text-sm text-gray-400">开启后，员工在填写入职登记表时，可看到引导页面</span>
            </div>
          </div>

          {enabled && (
            <>
              <div className="flex items-center">
                <div className="w-24 text-right pr-4 text-sm text-gray-600"><span className="text-red-500 mr-1">*</span>标题：</div>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 max-w-2xl h-8 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary" 
                />
              </div>

              <div className="flex items-start">
                <div className="w-24 text-right pr-4 text-sm text-gray-600 pt-2"><span className="text-red-500 mr-1">*</span>内容：</div>
                <div className="flex-1 max-w-2xl relative">
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-64 p-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary resize-none"
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {content.length} / 2000
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-24 text-right pr-4 text-sm text-gray-600 pt-2">企业logo：</div>
                <div>
                  <div className="w-24 h-24 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition-colors bg-gray-50">
                    <Upload size={20} className="mb-2" />
                    <span className="text-xs">上传</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">只支持JPG、PNG，大小不超过8M</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-80 pl-8 flex flex-col items-center">
        <div className="w-[280px] h-[580px] border-[8px] border-gray-100 rounded-[36px] bg-white shadow-sm relative overflow-hidden flex flex-col">
          <div className="h-6 w-full flex justify-center absolute top-0 z-10">
            <div className="w-24 h-4 bg-gray-100 rounded-b-xl"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 pt-8 bg-gray-50">
            {enabled && (
              <div className="bg-white rounded-lg p-4 shadow-sm min-h-full">
                <h3 className="text-center font-medium text-gray-800 mb-4">{title}</h3>
                <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>
              </div>
            )}
          </div>
          <div className="h-12 border-t border-gray-100 flex items-center justify-center bg-white">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3FormContent() {
  const tableData = [
    { group: '默认分组(基础信息)', field: '手机号码', type: '文本', empReq: true, empRead: true, empEdit: false, revReq: true, revRead: true, revEdit: false },
    { group: '', field: '证件号', type: '文本', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
    { group: '', field: '姓名', type: '文本', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
    { group: '', field: '工号', type: '文本', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '', field: '头像', type: '图片', empReq: false, empRead: false, empEdit: true, revReq: false, revRead: false, revEdit: true },
    { group: '', field: '出生日期', type: '日期', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
    { group: '', field: '民族', type: '选项', empReq: false, empRead: false, empEdit: true, revReq: false, revRead: false, revEdit: true },
    { group: '', field: '证件照正面', type: '图片', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '', field: '户口所在地', type: '文本', empReq: false, empRead: false, empEdit: true, revReq: false, revRead: false, revEdit: true },
    { group: '', field: '职务', type: '文本', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '', field: '职务分类', type: '职务分类', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '', field: '职级', type: '文本', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '', field: '最高学历', type: '选项', empReq: false, empRead: false, empEdit: true, revReq: false, revRead: false, revEdit: true },
    { group: '', field: '证件类型', type: '选项', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
    { group: '', field: '工作地点', type: '文本', empReq: false, empRead: false, empEdit: false, revReq: false, revRead: false, revEdit: false },
    { group: '合同信息(基础信息)', field: '入职日期', type: '日期', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
    { group: '', field: '部门', type: '文本', empReq: true, empRead: false, empEdit: true, revReq: true, revRead: false, revEdit: true },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-800 font-medium">
          <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
          表单内容
        </div>
        <button className="px-3 py-1.5 border border-primary text-primary text-sm rounded hover:bg-primary/5 transition-colors">
          重置系统默认
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-medium border-r border-gray-200" rowSpan={2}>分组名称</th>
              <th className="py-3 px-4 font-medium border-r border-gray-200" rowSpan={2}>字段名称</th>
              <th className="py-3 px-4 font-medium border-r border-gray-200" rowSpan={2}>类型</th>
              <th className="py-3 px-4 font-medium border-r border-gray-200 text-center" rowSpan={2}>员工必填</th>
              <th className="py-2 px-4 font-medium border-r border-gray-200 text-center border-b" colSpan={2}>员工可见</th>
              <th className="py-3 px-4 font-medium border-r border-gray-200 text-center" rowSpan={2}>审核人必填</th>
              <th className="py-2 px-4 font-medium text-center border-b" colSpan={2}>审核人可见</th>
            </tr>
            <tr>
              <th className="py-2 px-4 font-medium border-r border-gray-200 text-center">员工只读</th>
              <th className="py-2 px-4 font-medium border-r border-gray-200 text-center">员工可编辑</th>
              <th className="py-2 px-4 font-medium border-r border-gray-200 text-center">审核人只读</th>
              <th className="py-2 px-4 font-medium text-center">审核人可编辑</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50/50">
                {row.group !== '' ? (
                  <td className="py-3 px-4 border-r border-gray-200 align-top" rowSpan={index === 0 ? 15 : 2}>
                    {row.group}
                  </td>
                ) : null}
                <td className="py-3 px-4 border-r border-gray-200">{row.field}</td>
                <td className="py-3 px-4 border-r border-gray-200">{row.type}</td>
                <td className="py-3 px-4 border-r border-gray-200 text-center">
                  <input type="checkbox" checked={row.empReq} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3 px-4 border-r border-gray-200 text-center bg-green-50/30">
                  <input type="checkbox" checked={row.empRead} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3 px-4 border-r border-gray-200 text-center">
                  <input type="checkbox" checked={row.empEdit} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3 px-4 border-r border-gray-200 text-center">
                  <input type="checkbox" checked={row.revReq} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3 px-4 border-r border-gray-200 text-center bg-green-50/30">
                  <input type="checkbox" checked={row.revRead} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" checked={row.revEdit} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Step4Materials() {
  const [enabled, setEnabled] = useState(true);
  
  const materials = [
    { name: '特种作业证', desc: '', visible: false, required: false },
    { name: '健康证', desc: '', visible: false, required: false },
    { name: '电工证', desc: '', visible: false, required: false },
    { name: '学历证书', desc: '请上传个人获得的学历证书照片', visible: false, required: false },
    { name: '学位证书', desc: '请上传个人获得的学位证书照片', visible: false, required: false },
    { name: '离职证明', desc: '请上传上家公司的离职证明', visible: false, required: false },
    { name: '入职体检单', desc: '请上传6个月内的体检报告', visible: false, required: false },
    { name: '户籍证明', desc: '请上传本人户口簿照片，包含首页联、户主联、本人联', visible: false, required: false },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center mb-6 text-gray-800 font-medium">
        <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
        入职材料
      </div>

      <div className="flex items-center mb-6">
        <div className="text-sm text-gray-800 mr-4">入职材料：</div>
        <button 
          className={`w-10 h-5 rounded-full relative transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300'}`}
          onClick={() => setEnabled(!enabled)}
        >
          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <span className="ml-3 text-sm text-gray-400">设置员工填写入职登记时需要提交的材料附件，比如身份证原件复印件、个人证件照、学历证明等</span>
      </div>

      {enabled && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-medium w-1/4">资料名称</th>
                <th className="py-3 px-6 font-medium w-1/2">员工看到的资料说明</th>
                <th className="py-3 px-6 font-medium text-center">是否可见</th>
                <th className="py-3 px-6 font-medium text-center">是否必填</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {materials.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50">
                  <td className="py-3 px-6 text-gray-800">{item.name}</td>
                  <td className="py-3 px-6 text-gray-500">{item.desc}</td>
                  <td className="py-3 px-6 text-center">
                    <input type="checkbox" checked={item.visible} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <input type="checkbox" checked={item.required} readOnly className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Step5Submission() {
  const [commitmentEnabled, setCommitmentEnabled] = useState(true);
  const [signatureEnabled, setSignatureEnabled] = useState(true);
  const [content, setContent] = useState('本人承诺以上所填写的全部内容真实，有效，不存在任何隐瞒与不实的情况，更无遗漏之处，我了解若是被雇佣的话，我所提供的任何错误的说明或者信息都可以成为被解雇的理由。');

  return (
    <div className="flex h-full py-4">
      <div className="flex-1 pr-8 border-r border-gray-100">
        <div className="flex items-center mb-6 text-gray-800 font-medium">
          <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
          员工承诺
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-24 text-right pr-4 text-sm text-gray-600">员工承诺：</div>
            <div className="flex items-center">
              <button 
                className={`w-10 h-5 rounded-full relative transition-colors ${commitmentEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setCommitmentEnabled(!commitmentEnabled)}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${commitmentEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="ml-3 text-sm text-gray-400">开启后，候选人在填写入职登记表时，可查看员工承诺信息</span>
            </div>
          </div>

          {commitmentEnabled && (
            <div className="flex items-start">
              <div className="w-24 text-right pr-4 text-sm text-gray-600 pt-2"><span className="text-red-500 mr-1">*</span>内容：</div>
              <div className="flex-1 max-w-2xl relative">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary resize-none"
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                  {content.length} / 2000
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="w-24 text-right pr-4 text-sm text-gray-600">手写签名：</div>
            <div className="flex items-center">
              <button 
                className={`w-10 h-5 rounded-full relative transition-colors ${signatureEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setSignatureEnabled(!signatureEnabled)}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${signatureEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="ml-3 text-sm text-gray-400">仅支持移动端手写签名</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80 pl-8 flex flex-col items-center">
        <div className="w-[280px] h-[580px] border-[8px] border-gray-100 rounded-[36px] bg-white shadow-sm relative overflow-hidden flex flex-col">
          <div className="h-6 w-full flex justify-center absolute top-0 z-10">
            <div className="w-24 h-4 bg-gray-100 rounded-b-xl"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 pt-8 bg-gray-50">
            {(commitmentEnabled || signatureEnabled) && (
              <div className="bg-white rounded-lg p-4 shadow-sm min-h-full">
                {commitmentEnabled && (
                  <>
                    <h3 className="text-center font-medium text-gray-800 mb-4">员工承诺</h3>
                    <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed mb-6">
                      {content}
                    </div>
                  </>
                )}
                {signatureEnabled && (
                  <div>
                    <div className="text-sm text-gray-800 mb-2"><span className="text-red-500 mr-1">*</span>手写签名</div>
                    <div className="h-24 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center text-sm text-gray-400">
                      点此签名
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="h-12 border-t border-gray-100 flex items-center justify-center bg-white">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
