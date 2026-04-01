
import React from 'react';
import { IEsignTemplate } from '../../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface BasicSettingsProps {
  template: IEsignTemplate;
}

export const BasicSettings: React.FC<BasicSettingsProps> = ({ template }) => {
  // Mock form state based on template
  const [formData, setFormData] = React.useState({
      name: template.name,
      description: template.description || '',
      type: template.type || '离职证明',
      validity: template.validityDays || 7,
      initiator: '',
      autoForward: '否',
      notifyMethods: ['站内信']
  });

  const labelClass = "text-sm text-gray-600 text-right w-[180px] shrink-0 leading-[32px]";
  const inputClass = "w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-300 hover:border-primary/50 transition-colors h-[32px]";
  const selectWrapperClass = "w-full relative h-[32px]";

  return (
    <div className="max-w-4xl mx-auto py-8 pr-32">
        <div className="space-y-5">
            <div className="flex gap-4 items-center">
                <label className={labelClass}><span className="text-red-500 mr-1">*</span>模板名称：</label>
                <div className="flex-1">
                    <input 
                        type="text" 
                        className={inputClass}
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
            </div>

            <div className="flex gap-4 items-start">
                <label className={labelClass}>模板说明：</label>
                <div className="flex-1 relative">
                    <textarea 
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none h-24 hover:border-primary/50 transition-colors"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        maxLength={100}
                    ></textarea>
                    <div className="text-right text-gray-400 text-xs mt-1 absolute bottom-2 right-2">
                        {formData.description.length} / 100
                    </div>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <label className={labelClass}><span className="text-red-500 mr-1">*</span>模板类型：</label>
                <div className="flex-1 flex gap-4">
                     <div className="flex-1 relative h-[32px]">
                         <div className={selectWrapperClass}>
                            <select 
                                className={`${inputClass} appearance-none bg-white cursor-pointer`}
                                value="其他文件类型"
                                disabled
                            >
                                <option>其他文件类型</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                     </div>
                     <div className="flex-1 relative h-[32px]">
                         <div className={selectWrapperClass}>
                            <select 
                                className={`${inputClass} appearance-none bg-white cursor-pointer`}
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="离职证明">离职证明</option>
                                <option value="劳动合同">劳动合同</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                     </div>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <label className={labelClass}><span className="text-red-500 mr-1">*</span>签署时效：</label>
                <div className="flex-1 relative">
                    <input 
                        type="number" 
                        className={inputClass}
                        value={formData.validity}
                        onChange={e => setFormData({...formData, validity: parseInt(e.target.value)})}
                    />
                    <span className="absolute right-3 top-1.5 text-sm text-gray-500">天</span>
                </div>
            </div>

             <div className="flex gap-4 items-center">
                <label className={labelClass}>发起主体：</label>
                <div className="flex-1 relative h-[32px]">
                     <div className={selectWrapperClass}>
                        <select 
                            className={`${inputClass} appearance-none bg-white cursor-pointer`}
                            value={formData.initiator}
                            onChange={e => setFormData({...formData, initiator: e.target.value})}
                        >
                            <option value="">请选择</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className={labelClass}>
                    <div className="flex items-center justify-end">
                        签署完成后果否自动转发签署文件给员工
                        <HelpCircle size={14} className="ml-1 text-gray-400" />
                        ：
                    </div>
                </div>
                <div className="flex items-center gap-6">
                     <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                            checked={formData.autoForward === '是'}
                            onChange={() => setFormData({...formData, autoForward: '是'})}
                        />
                        <span className="ml-2 text-sm text-gray-700">是</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                            checked={formData.autoForward === '否'}
                            onChange={() => setFormData({...formData, autoForward: '否'})}
                        />
                        <span className="ml-2 text-sm text-gray-700">否</span>
                    </label>
                </div>
            </div>

             <div className="flex gap-4 items-center">
                <div className={labelClass}>
                    <div className="flex items-center justify-end">
                        <span className="text-red-500 mr-1">*</span>电子签约通知方式
                        <HelpCircle size={14} className="ml-1 text-gray-400" />
                        ：
                    </div>
                </div>
                <div className="flex items-center gap-6">
                     <label className="flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.notifyMethods.includes('短信')}
                            onChange={(e) => {
                                if (e.target.checked) setFormData({...formData, notifyMethods: [...formData.notifyMethods, '短信']});
                                else setFormData({...formData, notifyMethods: formData.notifyMethods.filter(m => m !== '短信')});
                            }}
                        />
                        <span className="ml-2 text-sm text-gray-700">短信</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.notifyMethods.includes('站内信')}
                            onChange={(e) => {
                                if (e.target.checked) setFormData({...formData, notifyMethods: [...formData.notifyMethods, '站内信']});
                                else setFormData({...formData, notifyMethods: formData.notifyMethods.filter(m => m !== '站内信')});
                            }}
                        />
                        <span className="ml-2 text-sm text-gray-700">站内信</span>
                    </label>
                </div>
            </div>
        </div>
        
        {/* Background Image decoration at bottom right to match screenshot */}
        <div className="fixed bottom-0 right-0 pointer-events-none opacity-50 z-0">
             {/* Using a placeholder SVG or logic to replicate the faint background image if needed, but keeping clean for now */}
        </div>
    </div>
  );
};
