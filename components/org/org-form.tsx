
import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../ui/date-picker';
import { PersonSelector } from '../ui/person-selector';
import { OrgPicker } from '../ui/org-picker';
import { ChevronDown, Sparkles, Loader2, PanelRight } from 'lucide-react';
import { IOrgNode } from '../../types';
import { ApiService } from '../../api/api-service';

export interface OrgFormProps {
  initialData?: IOrgNode | null;
  parentData?: IOrgNode | null;
  mode?: 'create' | 'edit' | 'create-sub';
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  externalData?: any;
  embedded?: boolean; 
  onDataChange?: (data: any) => void;
  hiddenFields?: string[]; // 新增：支持隐藏字段
}

export const OrgForm: React.FC<OrgFormProps> = ({ 
  initialData, 
  parentData,
  mode = 'create',
  onCancel,
  onSubmit,
  externalData,
  embedded = false,
  onDataChange,
  hiddenFields = []
}) => {
  const emptyForm = {
    name: '',
    code: '',
    type: '',
    shortName: '',
    parentOrg: '',
    establishDate: '',
    effectiveDate: '',
    isVirtual: '否',
    headcount: '',
    manager: '',
    location: '',
    costCenter: '',
    attribute: '',
    storeNumber: '',
    description: '',
    remark: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const [isPersonSelectorOpen, setPersonSelectorOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  
  // Ref to track if the update came from user input to prevent blinking
  const isInternalChange = useRef(false);

  // Initial Data Effect
  useEffect(() => {
    if (mode === 'edit' && initialData) {
        setFormData({
            name: initialData.name,
            code: initialData.code || '',
            type: initialData.type,
            shortName: initialData.shortName || '',
            parentOrg: '许波波测试公司',
            establishDate: '2023-01-01',
            effectiveDate: '2023-01-01',
            isVirtual: initialData.isVirtual ? '是' : '否',
            headcount: initialData.establishmentTotal?.toString() || '',
            manager: initialData.manager || '',
            location: '上海',
            costCenter: 'CC001',
            attribute: initialData.attribute || '',
            storeNumber: initialData.storeNumber || '',
            description: initialData.description || '',
            remark: initialData.remark || ''
        });
    } else if (mode === 'create-sub' && parentData) {
        setFormData({
            ...emptyForm,
            parentOrg: parentData.name,
            type: '部门'
        });
    }
  }, [initialData, parentData, mode]);

  // External Data Effect (AI / Embedded Sync Down)
  useEffect(() => {
    if (externalData) {
        // 如果是内部触发的更新，忽略这次从外部回传的数据，防止闪烁
        if (isInternalChange.current) {
            isInternalChange.current = false;
            return;
        }

        setFormData(prev => {
            const newData = {
                ...prev,
                ...externalData,
                isVirtual: externalData.isVirtual || prev.isVirtual || '否',
                parentOrg: externalData.parentOrg || prev.parentOrg || '许波波测试公司',
                type: externalData.type || prev.type || '部门'
            };
            
            if (JSON.stringify(prev) === JSON.stringify(newData)) {
                return prev;
            }
            return newData;
        });
    }
  }, [externalData]);

  const handleChange = (field: string, value: any) => {
    isInternalChange.current = true; // 标记为内部更新
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // 直接同步给父组件，不再依赖 useEffect
    if (embedded && onDataChange) {
        onDataChange(newData);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  const handleAiGenerate = async () => {
    if (!formData.name) return;
    setIsAiGenerating(true);
    try {
        const result = await ApiService.generateOrgAIContent(formData);
        isInternalChange.current = true;
        setFormData(prev => {
            const newData = {
                ...prev,
                description: result.description,
            };
            // 异步操作回调中使用 setTimeout 确保在渲染周期外调用 props 方法
            if (embedded && onDataChange) {
                setTimeout(() => onDataChange(newData), 0);
            }
            return newData;
        });
    } catch (e) {
        console.error("Failed to generate content");
    } finally {
        setIsAiGenerating(false);
    }
  };

  const isFieldHidden = (field: string) => hiddenFields.includes(field);

  // Common input styles
  const labelClass = "text-sm text-gray-600 text-right w-[100px] shrink-0 leading-[32px]";
  const inputClass = "flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-300 w-full hover:border-primary/50 transition-colors h-[32px]";
  const selectWrapperClass = "flex-1 relative h-[32px]";
  const selectClass = "w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary appearance-none bg-white cursor-pointer hover:border-primary/50 transition-colors h-[32px]";

  // AI Loading Overlay
  const AiLoadingOverlay = () => (
    <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[33px] bg-white z-20 px-3 py-2 flex flex-col rounded-t cursor-wait">
         <div className="flex items-center gap-2 text-primary text-sm mb-3">
            <Loader2 size={14} className="animate-spin" />
            <span>加载中...</span>
         </div>
         <div className="flex flex-col gap-2.5 opacity-60">
            <div className="h-2 bg-gray-100 rounded-sm w-[90%] animate-pulse"></div>
            <div className="h-2 bg-gray-100 rounded-sm w-full animate-pulse delay-75"></div>
            <div className="h-2 bg-gray-100 rounded-sm w-[85%] animate-pulse delay-150"></div>
            <div className="h-2 bg-gray-100 rounded-sm w-[60%] animate-pulse delay-200"></div>
         </div>
    </div>
  );

  return (
    <div className={`${embedded ? '' : 'h-full'} flex flex-col`}>
        <div className={`flex-1 ${embedded ? '' : 'overflow-y-auto px-6 py-4 scrollbar-hide'}`}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                
                {/* Row 1 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>组织名称：</label>
                    <input 
                        type="text" 
                        placeholder="请输入（最多128个字）" 
                        className={inputClass}
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        maxLength={128}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>部门编码：</label>
                    <input 
                        type="text" 
                        placeholder="请输入部门编码" 
                        className={inputClass}
                        value={formData.code}
                        onChange={e => handleChange('code', e.target.value)}
                    />
                </div>

                {/* Row 2 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>组织类别：</label>
                    <div className={selectWrapperClass}>
                        <select 
                            className={`${selectClass} ${!formData.type ? 'text-gray-400' : 'text-gray-800'}`}
                            value={formData.type}
                            onChange={e => handleChange('type', e.target.value)}
                        >
                            <option value="" disabled>请选择组织类别</option>
                            <option value="公司" className="text-gray-800">公司</option>
                            <option value="部门" className="text-gray-800">部门</option>
                            <option value="门店" className="text-gray-800">门店</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>简称：</label>
                    <input 
                        type="text" 
                        placeholder="请输入（最多128个字）" 
                        className={inputClass}
                        value={formData.shortName}
                        onChange={e => handleChange('shortName', e.target.value)}
                        maxLength={128}
                    />
                </div>

                {/* Row 3 */}
                {!isFieldHidden('parentOrg') && (
                    <div className="flex gap-2 items-center">
                        <label className={labelClass}><span className="text-red-500 mr-1">*</span>上级组织：</label>
                        <div className={selectWrapperClass}>
                            {mode === 'create-sub' ? (
                                <input
                                    type="text"
                                    className={`${inputClass} bg-gray-50 text-gray-500`}
                                    value={formData.parentOrg}
                                    readOnly
                                />
                            ) : (
                                <OrgPicker 
                                    value={formData.parentOrg}
                                    onChange={(val) => handleChange('parentOrg', val)}
                                    placeholder="请选择上级组织"
                                />
                            )}
                        </div>
                    </div>
                )}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>设立日期：</label>
                    <div className="flex-1 h-[32px]">
                        <DatePicker 
                            placeholder="请输入设立日期"
                            value={formData.establishDate}
                            onChange={date => handleChange('establishDate', date)}
                            className="h-full"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>生效日期：</label>
                    <div className="flex-1 h-[32px]">
                        <DatePicker 
                            placeholder="请输入生效日期"
                            value={formData.effectiveDate}
                            onChange={date => handleChange('effectiveDate', date)}
                            className="h-full"
                        />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}><span className="text-red-500 mr-1">*</span>虚拟组织：</label>
                    <div className="flex items-center space-x-6 h-[32px]">
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="radio" 
                                    name="isVirtual" 
                                    value="是" 
                                    checked={formData.isVirtual === '是'}
                                    onChange={e => handleChange('isVirtual', e.target.value)}
                                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-primary checked:border-[4px] transition-all"
                                />
                            </div>
                            <span className="ml-2 text-sm text-gray-700">是</span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="radio" 
                                    name="isVirtual" 
                                    value="否" 
                                    checked={formData.isVirtual === '否'}
                                    onChange={e => handleChange('isVirtual', e.target.value)}
                                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-primary checked:border-[4px] transition-all"
                                />
                            </div>
                            <span className="ml-2 text-sm text-gray-700">否</span>
                        </label>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>直属编制人数：</label>
                    <input 
                        type="text" 
                        placeholder="请输入直属编制人数" 
                        className={inputClass}
                        value={formData.headcount}
                        onChange={e => handleChange('headcount', e.target.value)}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>部门负责人：</label>
                    <div className="flex-1 relative cursor-pointer h-[32px]" onClick={() => setPersonSelectorOpen(true)}>
                        <input 
                            type="text" 
                            placeholder="请选择部门负责人" 
                            readOnly
                            className={`${inputClass} cursor-pointer bg-white pr-8 font-medium`}
                            value={formData.manager}
                        />
                        <div className="absolute right-2 top-2 text-gray-400">
                             <PanelRight size={16} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Row 6 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>工作地点：</label>
                    <div className={selectWrapperClass}>
                        <input 
                            type="text" 
                            placeholder="请选择工作地点" 
                            className={inputClass}
                            value={formData.location}
                            onChange={e => handleChange('location', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>成本中心：</label>
                    <div className={selectWrapperClass}>
                         <input 
                            type="text" 
                            placeholder="请选择成本中心" 
                            className={inputClass}
                            value={formData.costCenter}
                            onChange={e => handleChange('costCenter', e.target.value)}
                        />
                    </div>
                </div>

                {/* Row 7 */}
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>组织属性：</label>
                    <div className={selectWrapperClass}>
                        <select 
                            className={`${selectClass} ${!formData.attribute ? 'text-gray-400' : 'text-gray-800'}`}
                            value={formData.attribute}
                            onChange={e => handleChange('attribute', e.target.value)}
                        >
                            <option value="" disabled>部门</option>
                            <option value="中心" className="text-gray-800">中心</option>
                            <option value="板块" className="text-gray-800">板块</option>
                            <option value="部门" className="text-gray-800">部门</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <label className={labelClass}>门店编号：</label>
                    <input 
                        type="text" 
                        placeholder="请输入门店编号" 
                        className={inputClass}
                        value={formData.storeNumber}
                        onChange={e => handleChange('storeNumber', e.target.value)}
                    />
                </div>

                {/* Row 8 - Textareas */}
                <div className="flex gap-2 items-start col-span-2">
                    <label className={labelClass}>组织描述：</label>
                    <div className="flex-1">
                        <div className="w-full border border-gray-300 rounded hover:border-primary/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all bg-white flex flex-col group relative overflow-hidden">
                            {isAiGenerating && <AiLoadingOverlay />}
                            <textarea 
                                placeholder="请输入描述内容（最多1000个字）"
                                className="w-full border-none outline-none px-3 py-2 text-sm resize-none h-20 bg-transparent"
                                maxLength={1000}
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                            ></textarea>
                            <div className="flex items-center justify-between px-2 pb-1 h-[28px] bg-gray-50 border-t border-gray-100">
                                {!isAiGenerating ? (
                                    <button
                                        type="button"
                                        onClick={handleAiGenerate}
                                        disabled={!formData.name}
                                        className={`flex items-center text-xs px-1 rounded transition-colors
                                            ${!formData.name 
                                                ? 'text-gray-300 cursor-not-allowed' 
                                                : 'text-[#927FFF] hover:bg-[#F4F2FF] cursor-pointer'
                                            }
                                        `}
                                    >
                                    <Sparkles size={14} className="mr-1" />
                                    AI 帮我写
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                                <div className="text-gray-400 text-xs">{formData.description.length} / 1000</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2 items-start col-span-2">
                    <label className={labelClass}>备注：</label>
                    <div className="flex-1 relative">
                        <textarea 
                            placeholder="" 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none h-20 hover:border-primary/50 transition-colors"
                            maxLength={1000}
                            value={formData.remark}
                            onChange={e => handleChange('remark', e.target.value)}
                        ></textarea>
                    </div>
                </div>

            </div>
        </div>
        
        {!embedded && (
            <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg flex justify-end gap-3 shrink-0">
                <button 
                    onClick={onCancel} 
                    className="px-6 py-1.5 rounded text-sm text-primary hover:bg-primary-light transition-colors font-medium"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="px-6 py-1.5 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
                >
                    确定
                </button>
            </div>
        )}

        <PersonSelector 
            isOpen={isPersonSelectorOpen}
            onClose={() => setPersonSelectorOpen(false)}
            onSelect={(person) => {
                handleChange('manager', person.name);
                setPersonSelectorOpen(false);
            }}
        />
    </div>
  );
};
