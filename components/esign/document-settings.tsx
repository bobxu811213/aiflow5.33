
import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { ChevronDown, Undo, Redo, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Image, Table, Eraser, Type, Baseline, ArrowLeftRight, Quote, Sparkles, Sigma, Code, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';
import { ApiService } from '../../api/api-service';
import { createPortal } from 'react-dom';

export interface DocumentSettingsRef {
  getContent: () => string;
}

export interface DocumentSettingsProps {
    initialContent?: string;
}

const DEFAULT_CONTENT = `
<div style="font-family: 'SimSun', serif; line-height: 1.8;">
    <h1 style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 40px;">劳动合同书</h1>

    <div style="margin-bottom: 30px; font-size: 14px;">
        <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px; font-weight: bold;">甲方（用人单位）：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">某某科技有限公司</span>
        </div>
        <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px;">法定代表人：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">张三</span>
        </div>
        <div style="display: flex; margin-bottom: 20px;">
            <span style="width: 120px;">注册地址：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">北京市海淀区XX路XX号</span>
        </div>
        
        <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px; font-weight: bold;">乙方（劳动者）：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">李四</span>
        </div>
        <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px;">身份证号码：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">11010119900101XXXX</span>
        </div>
        <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px;">联系电话：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">13800000000</span>
        </div>
         <div style="display: flex; margin-bottom: 10px;">
            <span style="width: 120px;">家庭住址：</span>
            <span style="border-bottom: 1px solid #000; flex: 1; padding-left: 10px;">北京市朝阳区XX小区XX号楼</span>
        </div>
    </div>

    <p style="text-indent: 2em; margin-bottom: 20px;">
        甲乙双方根据《中华人民共和国劳动法》、《中华人民共和国劳动合同法》等相关法律法规，在平等自愿、协商一致的基础上，订立本合同。
    </p>

    <div style="font-size: 14px;">
        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第一条 合同期限</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            本合同为固定期限劳动合同，期限为三年，自 <span style="font-weight: bold; text-decoration: underline;">2026年2月1日</span> 起至 <span style="font-weight: bold; text-decoration: underline;">2029年1月31日</span> 止。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            试用期自 <span style="font-weight: bold; text-decoration: underline;">2026年2月1日</span> 起至 <span style="font-weight: bold; text-decoration: underline;">2026年8月31日</span> 止。
        </p>

        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第二条 工作内容与工作地点</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            乙方同意根据甲方工作需要，担任 <span style="font-weight: bold; text-decoration: underline;">软件开发工程师</span> 岗位。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            乙方的工作地点为 <span style="font-weight: bold; text-decoration: underline;">北京</span>。根据业务需要，甲方有权单方面调整乙方的工作岗位及地点，乙方必须无条件服从。
        </p>

        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第三条 工作时间与休息休假</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            甲方实行标准工时制，每日工作8小时，每周工作40小时。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            因业务繁忙需要，甲方可安排乙方加班。乙方同意加班费已包含在每月固定基本工资内，不再另行支付。
        </p>

        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第四条 劳动报酬</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            乙方试用期工资为人民币 <span style="font-weight: bold; text-decoration: underline;">8,000</span> 元/月。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            试用期满后，乙方基本工资为人民币 <span style="font-weight: bold; text-decoration: underline;">10,000</span> 元/月。工资于次月15日前以货币形式支付。
        </p>

        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第五条 社会保险与福利</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            甲乙双方应依法参加社会保险。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            鉴于乙方自愿放弃缴纳社会保险，甲方按月向乙方发放500元现金补贴，以此替代社会保险的缴纳。甲方不再承担任何社保统筹义务。
        </p>

        <h3 style="font-weight: bold; margin-bottom: 10px; margin-top: 20px;">第六条 劳动纪律与合同解除</h3>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            乙方应遵守甲方的规章制度。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            乙方在合同期内如需辞职，必须提前60天以书面形式通知甲方，并经甲方总经理批准后方可离职，否则甲方有权扣发其未结薪资。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            若乙方未提前通知或未经批准擅自离职，应向甲方支付违约金人民币 <span style="font-weight: bold; text-decoration: underline;">20,000</span> 元。
        </p>
        <p style="text-indent: 2em; margin-bottom: 10px;">
            合同期内，若乙方发生重大违纪行为，甲方可立即解除合同且不支付补偿金。
        </p>
    </div>

    <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between;">
            <div style="width: 45%;">
                <div style="margin-bottom: 40px; font-weight: bold;">甲方（盖章）：</div>
                <div>法定代表人（签字）：________________</div>
                <div style="margin-top: 20px;">日期：2026年2月1日</div>
            </div>
            <div style="width: 45%;">
                <div style="margin-bottom: 40px; font-weight: bold;">乙方（签字）：</div>
                <div>________________________</div>
                <div style="margin-top: 40px;">日期：2026年2月1日</div>
            </div>
        </div>
    </div>
</div>
`;

export const DocumentSettings = forwardRef<DocumentSettingsRef, DocumentSettingsProps>((props, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const highlightedElementRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("基础信息");
  const [aiTooltip, setAiTooltip] = useState<{x: number, y: number, text: string} | null>(null);
  
  const { 
      setAiContext, 
      setAiMode, 
      setAiModeLocked, 
      setAiSidebarPinned, 
      setAiSidebarOpen, 
      addAiMessage, 
      activeDocumentQuote, 
      setActiveDocumentQuote,
      startNewSession,
      pendingDocumentContent,
      setPendingDocumentContent
  } = useAppStore();

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.innerHTML || ''
  }));

  // Handle auto-scrolling to quote
  useEffect(() => {
    // 1. Cleanup previous highlight immediately
    if (highlightedElementRef.current) {
        highlightedElementRef.current.style.backgroundColor = '';
        highlightedElementRef.current = null;
    }

    if (activeDocumentQuote && editorRef.current) {
        const quote = activeDocumentQuote;
        
        // Find all text elements that might contain the quote
        const elements = editorRef.current.querySelectorAll('p, div, h1, h2, h3, li, span');
        let foundElement: Element | null = null;
        const elementArray = Array.from(elements) as Element[];
        
        // Simple search strategy: check if textContent matches or includes
        for (const el of elementArray) {
            // Check direct text content match (ignoring whitespace differences)
            const elText = el.textContent?.replace(/\s+/g, '').trim() || '';
            const quoteText = quote.replace(/\s+/g, '').trim();
            
            if (elText.includes(quoteText) && elText.length < quoteText.length + 200) {
                 foundElement = el;
                 break;
            }
        }

        if (!foundElement) {
             // Fallback: If exact match fails, try simple includes
             for (const el of elementArray) {
                  if (el.textContent?.includes(quote)) {
                      foundElement = el;
                      break;
                  }
             }
        }

        if (foundElement) {
            foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Persistent highlight
            (foundElement as HTMLElement).style.backgroundColor = '#FEF9C3'; // yellow-100
            highlightedElementRef.current = foundElement as HTMLElement;
        }
    }
  }, [activeDocumentQuote]);

  // Click listener to dismiss highlight
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
        if (activeDocumentQuote && editorRef.current && editorRef.current.contains(e.target as Node)) {
             setActiveDocumentQuote(null);
        }
    };
    
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [activeDocumentQuote, setActiveDocumentQuote]);

  // Listen for AI generated content updates
  useEffect(() => {
      if (pendingDocumentContent && editorRef.current) {
          editorRef.current.innerHTML = pendingDocumentContent;
          setPendingDocumentContent(null); // Clear pending state
      }
  }, [pendingDocumentContent, setPendingDocumentContent]);

  // Tooltip interaction for AI modified content
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('ai-modified-highlight')) {
            const rect = target.getBoundingClientRect();
            // Calculate absolute position
            setAiTooltip({
                x: rect.left + rect.width / 2,
                y: rect.top,
                text: target.getAttribute('data-reason') || 'AI 智能修改'
            });
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
         const target = e.target as HTMLElement;
         if (target.classList.contains('ai-modified-highlight')) {
             setAiTooltip(null);
         }
    };

    editor.addEventListener('mouseover', handleMouseOver);
    editor.addEventListener('mouseout', handleMouseOut);

    return () => {
        editor.removeEventListener('mouseover', handleMouseOver);
        editor.removeEventListener('mouseout', handleMouseOut);
    }
  }, []);

  const labelClass = "text-sm text-[#262626] text-right w-[100px] shrink-0 leading-[32px] font-bold";
  
  const tagCategories = [
      "基础信息", "薪资档案", "银行卡信息", "合同信息", "协议信息", "离职信息", "签署公司信息", "印章位置", "特殊参数"
  ];

  const tags = [
      { label: '[手机号码]', code: 'phone' },
      { label: '[姓名]', code: 'name' },
      { label: '[头像]', code: 'avatar' },
      { label: '[工号]', code: 'id' },
      { label: '[出生日期]', code: 'dob' },
      { label: '[年龄]', code: 'age' },
      { label: '[户口所在地]', code: 'hukou' },
      { label: '[职务]', code: 'duty' },
      { label: '[职务分类]', code: 'duty_cat' },
      { label: '[职级]', code: 'level' },
      { label: '[最高学历]', code: 'education' },
  ];

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
  };

  const handleToolbarClick = (e: React.MouseEvent, cmd: string, val?: string) => {
      e.preventDefault(); // Prevent losing focus from editor
      execCmd(cmd, val);
  };

  const handleAiComplianceCheck = async () => {
    if (!editorRef.current) return;
    
    // 1. Force Open Sidebar in Locked Mode
    setAiContext('ESIGN');
    setAiMode('sidebar');
    setAiModeLocked(true);
    setAiSidebarPinned(true);
    setAiSidebarOpen(true);
    
    startNewSession();

    // 2. Add Thinking Message
    setTimeout(async () => {
        addAiMessage({ id: Date.now().toString(), role: 'user', content: '请帮我检查当前文档的合规性' });
        addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '正在分析文档条款及法律风险...' });

        try {
            // 3. API Call
            const content = editorRef.current?.innerHTML || "";
            const result = await ApiService.checkDocumentCompliance(content);

            // 4. Add Result Card with original content attached
            addAiMessage({
                id: (Date.now() + 2).toString(),
                role: 'ai',
                content: `分析完成，发现 ${result.issues?.length || 0} 个潜在合规风险：`,
                type: 'card',
                cardData: { 
                    _type: 'COMPLIANCE_REPORT', 
                    ...result, 
                    originalContent: content 
                }
            });
        } catch (e) {
            addAiMessage({ id: Date.now().toString(), role: 'ai', content: '合规性检查失败，请稍后重试。' });
        }
    }, 10);
  };

  return (
    <div className="flex flex-col h-full pl-6 pt-4 relative">
        <style>{`
            .ai-modified-highlight {
                background-color: #F4F2FF;
                border-bottom: 2px dashed #927FFF;
                cursor: help;
                transition: background-color 0.2s;
            }
            .ai-modified-highlight:hover {
                background-color: #E3DFFF;
            }
        `}</style>
        
        {aiTooltip && createPortal(
            <div 
                className="fixed z-[9999] px-3 py-2 bg-white rounded shadow-xl border border-[#927FFF]/20 animate-in fade-in zoom-in-95 duration-200 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px]"
                style={{ top: aiTooltip.y, left: aiTooltip.x }}
            >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#927FFF] mb-0.5 whitespace-nowrap">
                    <Sparkles size={12} fill="currentColor" />
                    AI 智能优化
                </div>
                <div className="text-[11px] text-gray-600 max-w-[200px] leading-tight">
                    {aiTooltip.text}
                </div>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#927FFF]/20 rotate-45"></div>
            </div>,
            document.body
        )}

        <div className="flex gap-4 items-start h-full">
            <div className="w-[100px] shrink-0 pt-2 text-right font-bold text-sm text-[#262626]">
                模板内容：
            </div>
            
            <div className="flex-1 flex flex-col h-full border border-[#E4E6E9] shadow-sm bg-white mr-6 mb-4">
                {/* 1. Category Tabs */}
                <div className="flex flex-wrap border-b border-[#E4E6E9] bg-white">
                    {tagCategories.map((cat, idx) => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs px-4 py-3 transition-colors font-medium border-r border-[#E4E6E9] last:border-r-0 relative whitespace-nowrap
                                ${activeCategory === cat ? 'text-[#13A695] bg-[#E8F8F6]' : 'text-gray-600 hover:text-[#13A695] hover:bg-gray-50'}
                            `}
                        >
                            {cat}
                            {activeCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13A695]"></div>}
                        </button>
                    ))}
                </div>
                
                {/* 2. Specific Tags & AI Button */}
                <div className="flex flex-wrap gap-3 px-3 py-2 bg-white border-b border-[#E4E6E9] items-center text-xs">
                    {tags.map(tag => (
                        <span key={tag.code} className="cursor-pointer hover:opacity-80 text-[#13A695] bg-[#E8F8F6] border border-[#ADE6E0] px-2 py-1 rounded-sm transition-colors">
                            {tag.label}
                        </span>
                    ))}
                     <div className="ml-auto flex items-center gap-2">
                         <button 
                            onClick={handleAiComplianceCheck}
                            className="flex items-center gap-1.5 bg-[#927FFF] text-white px-3 py-1.5 rounded shadow-sm hover:bg-[#7466CC] transition-all font-medium text-xs"
                         >
                             <Sparkles size={12} />
                             AI 合规检测
                         </button>
                     </div>
                </div>

                {/* 3. Formatting Toolbar */}
                <div className="flex items-center bg-[#F8F8F8] border-b border-[#E4E6E9] px-2 py-2 gap-2 text-[#666666] flex-wrap select-none shadow-inner">
                    <div className="flex items-center gap-1 mr-1">
                        <button onMouseDown={e => handleToolbarClick(e, 'undo')} className="p-1 hover:bg-[#E4E6E9] rounded text-gray-600"><Undo size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'redo')} className="p-1 hover:bg-[#E4E6E9] rounded text-gray-600"><Redo size={14} /></button>
                    </div>
                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-[#E4E6E9] rounded-sm px-2 py-0.5 text-xs cursor-pointer w-20 justify-between hover:border-primary text-gray-700">
                            普通 <ChevronDown size={10} />
                        </div>
                        <div className="flex items-center bg-white border border-[#E4E6E9] rounded-sm px-2 py-0.5 text-xs cursor-pointer w-20 justify-between hover:border-primary text-gray-700">
                            黑体 <ChevronDown size={10} />
                        </div>
                        <div className="flex items-center bg-white border border-[#E4E6E9] rounded-sm px-2 py-0.5 text-xs cursor-pointer w-14 justify-between hover:border-primary text-gray-700">
                            16 <ChevronDown size={10} />
                        </div>
                    </div>
                    
                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <button onMouseDown={e => handleToolbarClick(e, 'bold')} className="p-1 hover:bg-[#E4E6E9] rounded"><Bold size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'italic')} className="p-1 hover:bg-[#E4E6E9] rounded"><Italic size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'underline')} className="p-1 hover:bg-[#E4E6E9] rounded"><Underline size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'strikeThrough')} className="p-1 hover:bg-[#E4E6E9] rounded"><Strikethrough size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'removeFormat')} className="p-1 hover:bg-[#E4E6E9] rounded flex items-center"><Eraser size={14} /></button>
                    </div>

                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <button className="p-1 hover:bg-[#E4E6E9] rounded flex items-center gap-0.5" title="文字颜色">
                            <Baseline size={14} />
                            <ChevronDown size={8} />
                        </button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded flex items-center gap-0.5" title="背景颜色">
                            <div className="w-3.5 h-3.5 bg-black flex items-center justify-center text-white font-bold text-[10px] rounded-sm">A</div>
                            <ChevronDown size={8} />
                        </button>
                    </div>

                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <button onMouseDown={e => handleToolbarClick(e, 'justifyLeft')} className="p-1 hover:bg-[#E4E6E9] rounded"><AlignLeft size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'justifyCenter')} className="p-1 hover:bg-[#E4E6E9] rounded"><AlignCenter size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'justifyRight')} className="p-1 hover:bg-[#E4E6E9] rounded"><AlignRight size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'justifyFull')} className="p-1 hover:bg-[#E4E6E9] rounded"><AlignJustify size={14} /></button>
                    </div>

                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <button onMouseDown={e => handleToolbarClick(e, 'insertOrderedList')} className="p-1 hover:bg-[#E4E6E9] rounded"><ListOrdered size={14} /></button>
                        <button onMouseDown={e => handleToolbarClick(e, 'insertUnorderedList')} className="p-1 hover:bg-[#E4E6E9] rounded"><List size={14} /></button>
                    </div>

                    <div className="w-px h-4 bg-[#D1D5DB] mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <button className="p-1 hover:bg-[#E4E6E9] rounded"><ArrowLeftRight size={14} /></button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded"><ArrowLeftRight size={14} className="transform rotate-90" /></button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded font-serif font-bold w-6 text-center">"</button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded flex items-center gap-0.5 text-xs font-bold font-serif italic">W</button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded"><Image size={14} /></button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded"><Table size={14} /></button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded"><Code size={14} /></button>
                        <button className="p-1 hover:bg-[#E4E6E9] rounded flex items-center justify-center font-serif">Ω</button>
                    </div>
                </div>

                {/* 4. Editor Content Area */}
                <div className="flex-1 bg-[#F0F2F5] overflow-auto p-8 relative">
                    <div 
                        ref={editorRef}
                        className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-md border border-[#E4E6E9] p-12 text-[#262626] text-sm leading-relaxed selection:bg-primary/20 outline-none focus:ring-0 transition-all"
                        contentEditable
                        suppressContentEditableWarning
                        dangerouslySetInnerHTML={{ __html: props.initialContent || DEFAULT_CONTENT }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
});

DocumentSettings.displayName = 'DocumentSettings';
