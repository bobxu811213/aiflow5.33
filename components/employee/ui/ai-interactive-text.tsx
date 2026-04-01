
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../../store/use-app-store';

export const AiInteractiveText = ({ text, type }: { text: string, type: 'school' | 'company' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const { setAiSidebarOpen, setAiMode, setAiModeLocked, setAiSidebarPinned, addAiMessage, setAiContext } = useAppStore();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleOpenAi = (customPrompt?: string) => {
        setIsMenuOpen(false);
        setAiContext('ORG'); 
        setAiMode('sidebar');
        setAiSidebarPinned(true);
        setAiModeLocked(true);
        setAiSidebarOpen(true);
        
        setTimeout(() => {
             const messageText = customPrompt || (type === 'school' ? `请为我详细介绍一下${text}这所学校，包括排名、优势专业等信息。` : `请为我详细介绍一下${text}这家公司，包括主要业务、发展历程等信息。`);
             addAiMessage({
                 id: Date.now().toString(),
                 role: 'user',
                 content: messageText
             });
        }, 100);
    };

    return (
        <div 
            ref={wrapperRef}
            className="relative inline-flex items-center group/text"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="font-bold text-gray-800 text-base transition-colors cursor-pointer border-b border-transparent hover:border-[#13A695] hover:text-[#13A695]" onClick={() => setIsMenuOpen(true)}>
                {text}
            </span>
            
            <div 
                className={`ml-1.5 cursor-pointer transition-all duration-200 ${isHovered || isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 pointer-events-none'}`}
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            >
                <div className="w-5 h-5 rounded-full bg-[#F4F2FF] flex items-center justify-center hover:bg-[#E3DFFF] text-[#927FFF]">
                    <Sparkles size={10} fill="currentColor" />
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-[280px] bg-white rounded-lg shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-200 cursor-default" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-50">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#927FFF]">
                            <Sparkles size={12} />
                            <span>AI 智能助手</span>
                        </div>
                        <span className="text-[10px] text-gray-400">已选中: {text}</span>
                    </div>
                    
                    <button 
                        onClick={() => handleOpenAi()}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#F4F2FF] hover:text-[#6265F0] rounded-md transition-colors flex items-center gap-2 mb-2 group/btn"
                    >
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-white text-gray-500 group-hover/btn:text-[#6265F0]">
                            {type === 'school' ? <GraduationCap size={12} /> : <Building2 size={12} />}
                        </div>
                        一键生成{type === 'school' ? '学校' : '公司'}介绍
                    </button>

                    <div className="relative mt-2">
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-[#927FFF] rounded-md pl-2 pr-7 py-1.5 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                            placeholder="输入问题，例如：排名多少？"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && prompt.trim()) {
                                    handleOpenAi(`关于${text}：${prompt}`);
                                    setPrompt('');
                                }
                            }}
                        />
                        <button 
                            className="absolute right-1.5 top-1.5 p-0.5 text-gray-400 hover:text-[#927FFF] transition-colors"
                            onClick={() => {
                                if (prompt.trim()) {
                                    handleOpenAi(`关于${text}：${prompt}`);
                                    setPrompt('');
                                }
                            }}
                        >
                            <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};
