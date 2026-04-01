
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../ui/modal';
import { OrgForm } from './org-form';
import { JobForm } from '../job/job-form';
import { DutyForm } from '../job/duty-form';
import { DutyCategoryForm } from '../job/duty-category-form';
import { MultiBusinessForm } from '../business/multi-business-form';
import { BatchRecordReview } from '../free-table/batch-record-review';
import { RetroRuleForm } from '../attendance/retro-rule-form';
import { Sparkles, Loader2, Building2, Minus, History, X, ChevronLeft, Minimize2, PanelLeftClose, PanelLeftOpen, PanelRight, AppWindow, Square, MessageSquarePlus, Eraser, Table, Layers, FileText, BarChart3, Pin, PinOff, Paperclip, Send, RefreshCw, Lightbulb } from 'lucide-react';
import { ApiService } from '../../api/api-service';
import { useAppStore } from '../../store/use-app-store';
import { IAiMessage, IAiHistoryItem, IAiCandidate, IPerformanceIndicator, IAttachment } from '../../types';
import { PerformanceDetailModal } from '../performance/performance-detail-modal';

// Imported Refactored Components
import { ChatInput } from '../ai/chat-input';
import { ChatHistoryPanel } from '../ai/chat-history-panel';
import { ChatMessageList } from '../ai/chat-message-list';
import { FilePreview } from '../ai/cards/file-preview';
import { EmployeeAnalysisReport } from '../ai/cards/employee-analysis-report';
import { HeaderActionBtn, HeaderSeparator } from '../ai/utils';
import { ThinkingAnimation } from '../ai/thinking-animation';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'full' | 'mini' | 'bar' | 'sidebar';
  onModeChange?: (mode: 'full' | 'mini' | 'bar' | 'sidebar') => void;
  onSubmit: (data: any) => Promise<void>;
  onSuccess?: () => void;
  onApplyChange?: (data: any) => void;
  onBatchApply?: (data: any[]) => void;
  showNewChat?: boolean;
  showClearChat?: boolean;
  onRegenerate?: () => void;
}

type DisplayMode = 'full' | 'mini' | 'bar' | 'sidebar';

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ 
    isOpen, 
    onClose, 
    initialMode = 'full',
    onModeChange,
    onSubmit,
    onSuccess,
    onApplyChange,
    onBatchApply,
    showNewChat = true,
    showClearChat = false,
    onRegenerate
}) => {
  const { 
      aiSidebarPinned, 
      toggleAiSidebarPin,
      setAiSidebarPinned,
      aiMessages: rawAiMessages, 
      addAiMessage,
      setAiMessages,
      clearAiMessages,
      aiHistory,
      currentSessionId,
      startNewSession,
      restoreSession,
      aiModeLocked,
      setAiModeLocked,
      aiContext,
      setActiveDocumentQuote,
      setPendingDocumentContent,
      setHighlightedWorkExperienceIds,
      activeHighlightId, 
      setActiveHighlightId 
  } = useAppStore();

  const aiMessages = Array.isArray(rawAiMessages) ? rawAiMessages : [];

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputImages, setInputImages] = useState<string[]>([]);
  const [inputAttachments, setInputAttachments] = useState<IAttachment[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const shouldStopRef = useRef(false);
  const [processingContext, setProcessingContext] = useState<{source: 'text' | 'interaction', text?: string} | null>(null);

  const [viewMode, setViewMode] = useState<'chat' | 'split'>('chat');
  const [displayMode, setDisplayMode] = useState<DisplayMode>(initialMode);
  const [showHistory, setShowHistory] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false); 
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentDetailItem, setCurrentDetailItem] = useState<IPerformanceIndicator | null>(null);
  const [currentDetailSuggestion, setCurrentDetailSuggestion] = useState<any>(null);
  const [detailItemSource, setDetailItemSource] = useState<{messageId: string, index: number} | null>(null);

  const [chatPanelWidth, setChatPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

  const isAiThinking = aiMessages.some(m => m.type === 'thinking' && !m.isComplete);
  const isCurrentlyTyping = isTyping || isAiThinking;

  const startResizing = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      const minWidth = 320;
      const maxWidth = Math.min(800, window.innerWidth - 640);
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setChatPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Add a class to body to prevent text selection while dragging
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing]);

  const minibarFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if (isDetailModalOpen && activeHighlightId && currentDetailItem?.id !== activeHighlightId) {
          let foundItem: any = null;
          let sourceMsgId = '';
          let sourceIndex = -1;
          for (let i = aiMessages.length - 1; i >= 0; i--) {
              const msg = aiMessages[i];
              if (msg.cardData && msg.cardData._type === 'PERFORMANCE_LIST' && msg.cardData.items) {
                  const idx = msg.cardData.items.findIndex((item: any) => item.id === activeHighlightId);
                  if (idx !== -1) {
                      foundItem = msg.cardData.items[idx];
                      sourceMsgId = msg.id;
                      sourceIndex = idx;
                      break;
                  }
              }
          }
          if (foundItem) {
              const perfData: IPerformanceIndicator = { id: foundItem.id, code: foundItem.code, name: foundItem.title, description: foundItem.desc, weight: foundItem.meta.weight, targetValue: foundItem.meta.target, remarks: foundItem.remarks };
              setCurrentDetailItem(perfData);
              setCurrentDetailSuggestion(foundItem.aiSuggestion);
              setDetailItemSource({ messageId: sourceMsgId, index: sourceIndex });
          }
      }
  }, [activeHighlightId, isDetailModalOpen, aiMessages, currentDetailItem]);

  const [generatedData, setGeneratedData] = useState<any>(null);
  const [generatedType, setGeneratedType] = useState<'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'BATCH' | 'CHAT' | 'BATCH_VISIT_RECORD' | 'RETRO_RULE' | 'FILE_PREVIEW' | 'EMPLOYEE_CHECK_REPORT' | 'EMPLOYEE_ANALYSIS_RESULT' | 'TRANSFER_RECORD'>('ORG');
  const [rightPanelEmpty, setRightPanelEmpty] = useState(false);
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedAnalysisModules, setSelectedAnalysisModules] = useState<string[]>([]);
  const [dismissedBatchMessageId, setDismissedBatchMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedMessageIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen && aiMessages.length === 0) {
      let welcomeMsg = '你好，我是智能助手。请描述您想要创建的业务数据，支持同时创建多个对象，例如：“创建一个产品部和一个产品经理职位”。';
      if (aiContext === 'PERFORMANCE') welcomeMsg = '你好，我是绩效管理助手。我可以协助您优化指标、分析数据。请告诉我您需要调整哪些指标。';
      else if (aiContext === 'ESIGN') welcomeMsg = '你好，我是电子签助手。我可以协助您管理合同模版、解答签署流程问题。您可以点击编辑器工具栏的“AI 合规检测”对文档进行审查。';
      else if (aiContext === 'Chat') welcomeMsg = '你好，我是表格助手。我可以帮您批量生成、填充或优化表格数据。请选择数据并点击工具栏的“AI 批量填充”开始。';
      else if (aiContext === 'ATTENDANCE') welcomeMsg = '你好，我是考勤助手。我可以帮您创建补卡规则，例如“创建一个全体员工适用的补卡规则，每月允许补卡3次”。';
      else if (aiContext === 'EMPLOYEE') welcomeMsg = '你好，我是员工档案助手。我可以协助您核查员工信息、生成简介等。';
      addAiMessage({ id: '1', role: 'ai', content: welcomeMsg });
    }
  }, [isOpen, aiMessages.length, addAiMessage, aiContext]);

  useEffect(() => {
      const lastMsg = aiMessages[aiMessages.length - 1];
      if (isOpen && lastMsg && lastMsg.role === 'user' && !processedMessageIds.current.has(lastMsg.id)) {
          if (lastMsg.content.includes('检查员工') && lastMsg.content.includes('工作经历')) {
              processedMessageIds.current.add(lastMsg.id);
              shouldStopRef.current = false;
              setIsTyping(true);
              setTimeout(() => {
                  if (shouldStopRef.current) return;
                  setIsTyping(false);
                  addAiMessage({ id: Date.now().toString(), role: 'ai', content: '正在交叉比对员工履历时间轴...' });
                  setIsTyping(true);
                  setTimeout(() => {
                      if (shouldStopRef.current) return;
                      setIsTyping(false);
                      addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '分析完成，发现以下 2 个潜在问题：', type: 'card', cardData: { _type: 'EMPLOYEE_CHECK_REPORT', issues: [ { type: 'conflict', title: '工作时间重叠', description: '百度在线网络技术 (2020.01-2020.12) 与 阿里巴巴 (2019.07-2021.06) 存在时间重叠。', severity: 'high', relatedIds: [2, 5] }, { type: 'gap', title: '存在空窗期', description: '2017.09 至 2018.07 期间存在约 10 个月的工作空档期。', severity: 'medium', relatedIds: [3, 4] } ] } });
                  }, 1200);
              }, 800);
          } else if (lastMsg.content.includes('检查员工') && lastMsg.content.includes('家庭成员')) {
              processedMessageIds.current.add(lastMsg.id);
              shouldStopRef.current = false;
              setIsTyping(true);
              setTimeout(() => {
                  if (shouldStopRef.current) return;
                  setIsTyping(false);
                  addAiMessage({ id: Date.now().toString(), role: 'ai', content: '正在核对家庭成员逻辑...' });
                  setIsTyping(true);
                  setTimeout(() => {
                      if (shouldStopRef.current) return;
                      setIsTyping(false);
                      addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '分析完成，发现 1 个逻辑异常：', type: 'card', cardData: { _type: 'EMPLOYEE_CHECK_REPORT', issues: [ { type: 'conflict', title: '亲属关系逻辑异常', description: '弟弟徐小小出生于 2015 年，员工本人出生于 2018 年，弟弟年龄大于本人。', severity: 'high', relatedIds: [103] } ] } });
                  }, 1200);
              }, 800);
          }
      }
  }, [aiMessages, isOpen]);

  useLayoutEffect(() => { if (isOpen) setDisplayMode(initialMode); }, [isOpen, initialMode]);
  const handleModeChange = (mode: DisplayMode) => { setDisplayMode(mode); if (onModeChange) onModeChange(mode); };
  const handleClose = () => { setAiModeLocked(false); setAiSidebarPinned(false); setHighlightedWorkExperienceIds([]); onClose(); };
  const handleNewChat = () => { startNewSession(); setGeneratedData(null); setRightPanelEmpty(true); setViewMode(prev => prev === 'split' ? 'split' : 'chat'); setInput(''); setInputImages([]); setInputAttachments([]); setSelectedOptions([]); setHighlightedWorkExperienceIds([]); };
  const handleClearChat = () => { clearAiMessages(); setGeneratedData(null); setRightPanelEmpty(true); setViewMode(prev => prev === 'split' ? 'split' : 'chat'); setInput(''); setInputImages([]); setInputAttachments([]); setSelectedOptions([]); setHighlightedWorkExperienceIds([]); };

  useEffect(() => {
    if (!isLoadingHistory) scrollToBottom(messagesEndRef);
  }, [aiMessages.length, isTyping, showHistory, viewMode, displayMode, isLoadingHistory]);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement | null>) => { setTimeout(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 100); };
  
  const handleStop = () => { 
      shouldStopRef.current = true; 
      setIsTyping(false); 
      
      const newMessages = aiMessages.filter(m => m.type !== 'thinking');
      newMessages.push({
          id: Date.now().toString(),
          role: 'ai',
          content: '已停止生成。'
      });
      setAiMessages(newMessages);
      
      setProcessingContext(null); 
  };

  const processMinibarFiles = (files: FileList) => {
      const newImages: string[] = [];
      const newAttachments: IAttachment[] = [];
      const promises = Array.from(files).map(file => { return new Promise<void>((resolve) => { const reader = new FileReader(); reader.onload = (e) => { const result = e.target?.result as string; if (file.type.startsWith('image/')) newImages.push(result); else newAttachments.push({ id: Date.now() + Math.random().toString(), name: file.name, type: file.type, size: file.size, data: result }); resolve(); }; reader.readAsDataURL(file); }); });
      if (promises.length > 0) { setIsUploading(true); Promise.all(promises).then(() => { setTimeout(() => { if (newImages.length > 0) setInputImages(prev => [...prev, ...newImages]); if (newAttachments.length > 0) setInputAttachments(prev => [...prev, ...newAttachments]); setIsUploading(false); handleModeChange('mini'); }, 600); }).catch(e => { console.error(e); setIsUploading(false); }); }
  };
  const handleMinibarPaste = (e: React.ClipboardEvent) => { const items = e.clipboardData.items; const files: File[] = []; for (let i = 0; i < items.length; i++) { if (items[i].kind === 'file') { const file = items[i].getAsFile(); if (file) files.push(file); } } if (files.length > 0) { e.preventDefault(); const dt = new DataTransfer(); files.forEach(f => dt.items.add(f)); processMinibarFiles(dt.files); } };
  const handleMinibarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) processMinibarFiles(e.target.files); if (minibarFileInputRef.current) minibarFileInputRef.current.value = ''; };

  const processInput = async (inputText: string, forcedType?: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'RETRO_RULE', userMsg?: IAiMessage) => {
    setIsTyping(true);
    
    if (inputText === '请展示一下报错信息') {
      setTimeout(() => {
        if (shouldStopRef.current) return;
        setIsTyping(false);
        addAiMessage({
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: '网络已断开，请重试。'
        });
      }, 500);
      return;
    }

    if (aiContext === 'ONBOARDING' && inputText === '入职审批助手') {
      const { selectedOnboardingEmployees } = useAppStore.getState();
      if (selectedOnboardingEmployees.length > 0) {
        setTimeout(() => {
          if (shouldStopRef.current) return;
          setIsTyping(false);
          addAiMessage({
            id: (Date.now() + 1).toString(),
            role: 'ai',
            content: `已选择了以下 ${selectedOnboardingEmployees.length} 个待入职员工：`,
            type: 'card',
            cardData: {
              _type: 'ONBOARDING_APPROVAL_LIST',
              items: selectedOnboardingEmployees
            }
          });
        }, 5000);
        return;
      } else {
        setTimeout(() => {
          if (shouldStopRef.current) return;
          setIsTyping(false);
          addAiMessage({
            id: (Date.now() + 1).toString(),
            role: 'ai',
            content: '请先在左侧列表中勾选需要处理的待入职员工。'
          });
        }, 500);
        return;
      }
    }

    try {
        const result = await ApiService.parseBusinessIntent(inputText, forcedType);
        if (shouldStopRef.current) return;
        setIsTyping(false); setProcessingContext(null);
        if (result.type === 'AMBIGUOUS' || result.type === 'MULTI_OPTIONS') { addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '检测到您可能想要创建以下内容，请勾选需要生成的项目：', type: 'options', options: result.options || ['创建组织', '创建职位', '创建职务', '创建职务分类', '创建补卡规则'] }); setSelectedOptions([]); return; }
        if (result.type === 'MULTI_CANDIDATES' && result.candidates) { addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '检测到您可能想要创建以下内容，请勾选并确认：', type: 'multi_candidates', candidates: result.candidates }); return; }
        const typeLabels: Record<string, string> = { 'ORG': '组织', 'POSITION': '职位', 'DUTY': '职务', 'CATEGORY': '职务分类', 'RETRO_RULE': '补卡规则' };
        addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: `已为您生成以下${typeLabels[result.type] || '数据'}信息：`, type: 'card', cardData: { ...result.data, _type: result.type } });
        setGeneratedData(result.data); setGeneratedType(result.type as any);
    } catch (e) { if (shouldStopRef.current) return; setIsTyping(false); setProcessingContext(null); addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: '抱歉，处理您的请求时遇到问题，请重试。' }); }
  };

  const handleSendMessage = async (overrideText?: string | React.MouseEvent) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : input;
    if (!textToSend.trim() && inputImages.length === 0 && inputAttachments.length === 0) return;
    if (displayMode === 'bar') handleModeChange('mini');
    shouldStopRef.current = false;
    setProcessingContext({ source: 'text', text: textToSend });

    // Check if user is asking to regenerate specific indicators
    const isRegenerateIndicators = textToSend.includes('重新生成') && aiContext === 'PERFORMANCE';
    
    if (isRegenerateIndicators) {
        // Aggregate all latest items from all PERFORMANCE_LIST messages
        const latestItemsMap = new Map();
        for (const msg of aiMessages) {
            if (msg.role === 'ai' && msg.cardData?._type === 'PERFORMANCE_LIST') {
                for (const item of msg.cardData.items) {
                    latestItemsMap.set(item.id, item);
                }
            }
        }
        const allLatestItems = Array.from(latestItemsMap.values());
        
        // Find which items to regenerate based on input text
        let itemsToRegenerate = allLatestItems.filter((item: any) => textToSend.includes(item.title));
        
        // If no specific items matched, just pick the first one for demo purposes
        if (itemsToRegenerate.length === 0 && allLatestItems.length > 0) {
            itemsToRegenerate = [allLatestItems[0]];
        }
        
        if (itemsToRegenerate.length > 0) {
            const idsToRegenerate = itemsToRegenerate.map((i: any) => i.id);

            // Remove previous PERFORMANCE_BATCH_OVERRIDE cards
            let updatedMessages = [...aiMessages].filter(m => m.cardData?._type !== 'PERFORMANCE_BATCH_OVERRIDE');
            
            // Remove the items being regenerated from their previous messages
            updatedMessages = updatedMessages.map(msg => {
                if (msg.role === 'ai' && msg.cardData?._type === 'PERFORMANCE_LIST') {
                    const newItems = msg.cardData.items.filter((item: any) => !idsToRegenerate.includes(item.id));
                    return {
                        ...msg,
                        cardData: {
                            ...msg.cardData,
                            items: newItems
                        }
                    };
                }
                return msg;
            }).filter(msg => {
                // Remove PERFORMANCE_LIST messages that have no items left
                if (msg.role === 'ai' && msg.cardData?._type === 'PERFORMANCE_LIST') {
                    return msg.cardData.items.length > 0;
                }
                return true;
            });
            
            // Add user message
            const userMsg: IAiMessage = { id: Date.now().toString(), role: 'user', content: textToSend, images: inputImages.length > 0 ? inputImages : undefined, attachments: inputAttachments.length > 0 ? inputAttachments : undefined };
            updatedMessages.push(userMsg);
            
            const currentInput = textToSend; setInput(''); setInputImages([]); setInputAttachments([]);
            
            // Add thinking message
            const thinkingId = (Date.now() + 1).toString();
            updatedMessages.push({ id: thinkingId, role: 'ai', content: '正在重新生成指标...', type: 'thinking' });
            setAiMessages(updatedMessages);
            setIsTyping(true);
            
            setTimeout(() => {
                if (shouldStopRef.current) return;
                
                // Add new performance list with regenerated items
                const regeneratedItems = itemsToRegenerate.map((item: any) => ({
                    ...item,
                    title: item.title,
                    desc: item.desc + ' 增加了具体的量化考核标准。',
                    aiSuggestion: null, // clear suggestion as it's regenerated
                    _regenerated: true
                }));
                
                const listMessageId = (Date.now() + 2).toString();
                
                // Add the message with an empty items array first
                const newMessages = useAppStore.getState().aiMessages;
                newMessages.push({
                    id: listMessageId,
                    role: 'ai',
                    content: `已为您重新生成了 ${regeneratedItems.length} 个指标：`,
                    type: 'card',
                    cardData: {
                        _type: 'PERFORMANCE_LIST',
                        items: []
                    }
                });
                setAiMessages(newMessages);

                // Add items one by one with a random delay of 2-3 seconds
                let currentIndex = 0;
                const addNextItem = () => {
                    if (shouldStopRef.current) return;
                    if (currentIndex < regeneratedItems.length) {
                        const currentMessages = useAppStore.getState().aiMessages;
                        const updatedMessages = currentMessages.map(m => {
                            if (m.id === listMessageId && m.cardData) {
                                return {
                                    ...m,
                                    cardData: {
                                        ...m.cardData,
                                        items: [...m.cardData.items, regeneratedItems[currentIndex]]
                                    }
                                };
                            }
                            return m;
                        });
                        setAiMessages(updatedMessages);
                        currentIndex++;
                        
                        const randomDelay = Math.floor(Math.random() * 1000) + 2000; // 2000ms to 3000ms
                        setTimeout(addNextItem, randomDelay);
                    } else {
                        // Remove thinking message when all cards are added
                        setAiMessages(useAppStore.getState().aiMessages.filter(m => m.id !== thinkingId));
                        setIsTyping(false);
                    }
                };

                // Start adding items
                addNextItem();
            }, 1000);
            
            return;
        }
    }

    const userMsg: IAiMessage = { id: Date.now().toString(), role: 'user', content: textToSend, images: inputImages.length > 0 ? inputImages : undefined, attachments: inputAttachments.length > 0 ? inputAttachments : undefined };
    addAiMessage(userMsg);
    const currentInput = textToSend; setInput(''); setInputImages([]); setInputAttachments([]);
    await processInput(currentInput, undefined, userMsg);
  };

  const toggleOption = (option: string) => setSelectedOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
  const handleMultiConfirm = async () => {
      if (selectedOptions.length === 0) return;
      shouldStopRef.current = false;
      const currentSelection = [...selectedOptions];
      const selectionText = currentSelection.join('、');
      addAiMessage({ id: Date.now().toString(), role: 'user', content: `选择了：${selectionText}` });
      
      const analysisKeywords = ['基础信息', '考勤信息', '薪资信息', '绩效信息', '招聘信息', '培训信息', '考勤汇总', '工作经历', '人才盘点', '薪酬数据'];
      const timeKeywords = ['近 1 个月', '近 3 个月', '近 6 个月', '近 1 年', '自定义'];
      
      const isAnalysis = currentSelection.some(opt => analysisKeywords.includes(opt));
      const isTimeSelection = currentSelection.some(opt => timeKeywords.includes(opt));
      
      setSelectedOptions([]);
      
      if (isAnalysis) { 
          setSelectedAnalysisModules(currentSelection);
          setIsTyping(true); 
          setTimeout(() => { 
              if (shouldStopRef.current) return;
              setIsTyping(false); 
              addAiMessage({ id: Date.now().toString(), role: 'ai', content: `已选择这些维度：${selectionText}。同时请选择维度分析的时间范围：`, type: 'options', options: ['近 1 个月', '近 3 个月', '近 6 个月', '近 1 年', '自定义'] }); 
          }, 1000); 
          return; 
      }
      
      if (isTimeSelection) { 
          const modules = selectedAnalysisModules.length > 0 ? selectedAnalysisModules : ['基础信息', '考勤汇总', '工作经历', '人才盘点', '薪酬数据'];
          const summaryText = `员工的${modules.join('、')}`;
          
          setIsTyping(true); 
          setTimeout(() => { 
              if (shouldStopRef.current) return;
              setIsTyping(false); 
              addAiMessage({ id: Date.now().toString(), role: 'ai', content: '正在整合数据进行多维度交叉分析...' }); 
              setIsTyping(true);
              setTimeout(() => { 
                  if (shouldStopRef.current) return;
                  setIsTyping(false);
                  addAiMessage({ 
                      id: (Date.now() + 1).toString(), 
                      role: 'ai', 
                      content: '分析完成，已为您生成多维度交叉分析报告：', 
                      type: 'card', 
                      cardData: { 
                          _type: 'EMPLOYEE_ANALYSIS_RESULT', 
                          employeeName: '徐波波', 
                          period: selectionText, 
                          score: 92, 
                          summary: summaryText, 
                          scopes: modules,
                          details: { performance: '近半年绩效考核结果为 A, B+，整体呈现上升趋势。', attendance: '无迟到早退记录，平均每周加班时长 4.5 小时，处于正常水平。', potential: '高潜人才，具备晋升潜力。' } 
                      } 
                  }); 
              }, 1500); 
          }, 800); 
          return; 
      }
      
      await processInput(selectionText);
  };

  const handleCandidatesConfirm = async (confirmedCandidates: IAiCandidate[]) => {
      if (confirmedCandidates.length === 0) return;
      setProcessingContext({ source: 'interaction' });
      shouldStopRef.current = false;
      addAiMessage({ id: Date.now().toString(), role: 'user', content: `确认创建 ${confirmedCandidates.length} 项内容` });
      setIsTyping(true);
      const lastUserMsg = [...aiMessages].reverse().find(m => m.role === 'user' && m.content !== `确认创建 ${confirmedCandidates.length} 项内容`);
      const contextText = lastUserMsg?.content || "";
      try {
          const batchResults = await ApiService.generateBatchContent(confirmedCandidates, contextText);
          if (shouldStopRef.current) return;
          setIsTyping(false); setProcessingContext(null);
          const batchData = batchResults.map((item, index) => ({ id: `batch-${Date.now()}-${index}`, type: item.type as any, data: item.data, title: item.data.name || item.data.ruleName || '未命名' }));
          setGeneratedData(batchData); setGeneratedType('BATCH');
          addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: `已为您准备了 ${batchData.length} 个业务表单，请在右侧确认。`, type: 'card', cardData: { _type: 'BATCH', count: batchData.length, items: batchData } });
      } catch (e) { if (shouldStopRef.current) return; setIsTyping(false); setProcessingContext(null); addAiMessage({ id: Date.now().toString(), role: 'ai', content: '批量生成失败，请重试。' }); }
  };

  const handleCardClick = (data: any) => {
    if (data._type === 'BATCH_VISIT_RECORD') setGeneratedData(data);
    else if (data._type === 'BATCH') setGeneratedData(data.items);
    else if (data._type === 'EMPLOYEE_ANALYSIS_RESULT') { setGeneratedData(data); setGeneratedType(data._type); setRightPanelEmpty(false); setViewMode('split'); handleModeChange('full'); return; }
    else setGeneratedData(data);
    setGeneratedType(data._type || 'ORG'); setRightPanelEmpty(false); setViewMode('split');
    if (displayMode === 'sidebar' || displayMode === 'mini') handleModeChange('full');
  };

  const handleAttachmentClick = (att: IAttachment) => { setGeneratedData(att); setGeneratedType('FILE_PREVIEW'); setRightPanelEmpty(false); setViewMode('split'); if (displayMode !== 'full') handleModeChange('full'); };
  const handleFormSubmit = async (data: any) => { if (generatedType === 'ORG') await ApiService.createOrgNode(data); else if (generatedType === 'POSITION') await ApiService.createJobPosition(data); else if (generatedType === 'DUTY') await ApiService.createJobDuty(data); else if (generatedType === 'CATEGORY') await ApiService.createJobDutyCategory(data); else if (generatedType === 'RETRO_RULE') await ApiService.createRetroRule(data); else await onSubmit(data); if (onSuccess) onSuccess(); onClose(); };
  const handleBatchSubmit = async (dataList: any[]) => { if (generatedType === 'BATCH_VISIT_RECORD') { if (onBatchApply) onBatchApply(dataList); } else { for (const item of dataList) { if (item.type === 'ORG') await ApiService.createOrgNode(item.data); else if (item.type === 'POSITION') await ApiService.createJobPosition(item.data); else if (item.type === 'DUTY') await ApiService.createJobDuty(item.data); else if (item.type === 'CATEGORY') await ApiService.createJobDutyCategory(item.data); else if (item.type === 'RETRO_RULE') await ApiService.createRetroRule(item.data); } } if (onSuccess) onSuccess(); onClose(); return dataList; };
  const handleFormCancelRequest = () => { setShowCancelConfirm(true); };
  const confirmCancel = () => { setGeneratedData(null); setRightPanelEmpty(true); setShowCancelConfirm(false); };
  const handleRestoreHistory = (item: IAiHistoryItem) => { setShowHistory(false); setIsLoadingHistory(true); setTimeout(() => { if (item.messages && item.messages.length > 0) { restoreSession(item.id, item.messages); if (item.data) { if (item.businessType === 'BATCH' && item.data.items) setGeneratedData(item.data.items); else if (item.businessType === 'BATCH_VISIT_RECORD' || (item.data._type === 'BATCH_VISIT_RECORD')) setGeneratedData(item.data); else setGeneratedData(item.data); setGeneratedType(item.businessType as any); setRightPanelEmpty(false); } else { setGeneratedData(null); setRightPanelEmpty(true); setViewMode('chat'); } } else { startNewSession(); addAiMessage({ id: Date.now().toString(), role: 'ai', content: `已恢复历史记录：${item.prompt}` }); setGeneratedData(null); setRightPanelEmpty(true); } setIsLoadingHistory(false); }, 600); };
  const toggleSplitView = () => { if (viewMode === 'split') setViewMode('chat'); else { if (!generatedData) setRightPanelEmpty(true); setViewMode('split'); } };
  const updateCardData = (messageId: string, newData: any) => { setAiMessages(aiMessages.map(msg => msg.id === messageId ? { ...msg, cardData: newData } : msg)); };
  
  const handleViewDetail = (itemData: any, messageId: string, index: number) => { const perfData: IPerformanceIndicator = { id: itemData.id, code: itemData.code, name: itemData.title, description: itemData.desc, weight: itemData.meta.weight, targetValue: itemData.meta.target, remarks: itemData.remarks }; setCurrentDetailItem(perfData); setCurrentDetailSuggestion(itemData.aiSuggestion); setDetailItemSource({ messageId, index }); setActiveHighlightId(itemData.id); setIsDetailModalOpen(true); };
  const handleDetailUpdate = (updatedData: IPerformanceIndicator) => { if (!detailItemSource) return; if (onApplyChange) { const payload = { id: updatedData.id, code: updatedData.code, title: updatedData.name, desc: updatedData.description, meta: { weight: updatedData.weight, target: updatedData.targetValue }, remarks: updatedData.remarks }; onApplyChange(payload); } const message = aiMessages.find(m => m.id === detailItemSource.messageId); if (message && message.cardData && message.cardData._type === 'PERFORMANCE_LIST') { const items = [...message.cardData.items]; const currentItem = items[detailItemSource.index]; items[detailItemSource.index] = { ...currentItem, title: updatedData.name, desc: updatedData.description, meta: { weight: updatedData.weight, target: updatedData.targetValue }, remarks: updatedData.remarks, _applied: true, _modified: true }; updateCardData(detailItemSource.messageId, { ...message.cardData, items }); } };
  const handlePrevItem = () => { if (!detailItemSource) return; const message = aiMessages.find(m => m.id === detailItemSource.messageId); if (message && message.cardData && message.cardData._type === 'PERFORMANCE_LIST') { const items = message.cardData.items; const newIndex = detailItemSource.index - 1; if (newIndex >= 0) handleViewDetail(items[newIndex], detailItemSource.messageId, newIndex); } };
  const handleNextItem = () => { if (!detailItemSource) return; const message = aiMessages.find(m => m.id === detailItemSource.messageId); if (message && message.cardData && message.cardData._type === 'PERFORMANCE_LIST') { const items = message.cardData.items; const newIndex = detailItemSource.index + 1; if (newIndex < items.length) handleViewDetail(items[newIndex], detailItemSource.messageId, newIndex); } };
  let hasPrev = false; let hasNext = false; if (detailItemSource) { const message = aiMessages.find(m => m.id === detailItemSource.messageId); if (message && message.cardData && message.cardData.items) { hasPrev = detailItemSource.index > 0; hasNext = detailItemSource.index < message.cardData.items.length - 1; } }
  
  const handleLocateIssue = (quote: string) => { setActiveDocumentQuote(quote); };
  const handleApplyComplianceFix = async (issue: any, messageId: string, issueIndex: number, customPrompt?: string) => { 
      shouldStopRef.current = false;
      const message = aiMessages.find(m => m.id === messageId); 
      if (!message || !message.cardData) return; 
      const cardData = message.cardData; 
      const currentDocContent = cardData.currentContent || cardData.originalContent || ""; 
      const updatedIssues = [...cardData.issues]; 
      updatedIssues[issueIndex] = { ...issue, isProcessing: true }; 
      updateCardData(messageId, { ...cardData, issues: updatedIssues }); 
      try { 
          let instruction = ""; 
          if (customPrompt) { 
              instruction = `针对以下条款："${issue.quote}"。用户指令：${customPrompt}。（参考建议：${issue.suggestion}）`; 
          } else { 
              instruction = `针对以下条款："${issue.quote}"，应用修改建议：${issue.suggestion}`; 
          } 
          const newContent = await ApiService.modifyDocument(currentDocContent, instruction); 
          if (shouldStopRef.current) {
              const revertedIssues = [...cardData.issues];
              revertedIssues[issueIndex] = { ...issue, isProcessing: false };
              updateCardData(messageId, { ...cardData, issues: revertedIssues });
              return;
          }
          setPendingDocumentContent(newContent); 
          const finalIssues = [...cardData.issues]; 
          finalIssues[issueIndex] = { ...issue, isProcessing: false, isFixed: true }; 
          updateCardData(messageId, { ...cardData, issues: finalIssues, currentContent: newContent }); 
      } catch (e) { 
          if (shouldStopRef.current) return;
          console.error("Fix application failed", e); 
          const failedIssues = [...cardData.issues]; 
          failedIssues[issueIndex] = { ...issue, isProcessing: false }; 
          updateCardData(messageId, { ...cardData, issues: failedIssues }); 
      } 
  };
  
  const pendingPerfBatch = (() => { 
      const latestOverrideMsg = [...aiMessages].reverse().find(m => m.role === 'ai' && m.cardData?._type === 'PERFORMANCE_BATCH_OVERRIDE');
      if (latestOverrideMsg && !latestOverrideMsg.cardData?.isApplied) {
          return null;
      }

      const perfMessages = [...aiMessages].filter(m => m.role === 'ai' && m.cardData?._type === 'PERFORMANCE_LIST');
      if (perfMessages.length === 0) return null;
      
      const latestItemsMap = new Map();
      for (const msg of perfMessages) {
          const items = msg.cardData?.items || [];
          for (const item of items) {
              latestItemsMap.set(item.id, item);
          }
      }
      
      const allLatestItems = Array.from(latestItemsMap.values());
      const optimizableItems = allLatestItems.filter((i: any) => (i.aiSuggestion || i._modified || i._regenerated) && !i._applied);
      
      if (optimizableItems.length > 0) {
          return { messageId: perfMessages[perfMessages.length - 1].id, count: optimizableItems.length, items: allLatestItems };
      }
      return null;
  })();
  const handleShowBatchOverrideConfirm = () => { if (!pendingPerfBatch) return; setDismissedBatchMessageId(pendingPerfBatch.messageId); const { items } = pendingPerfBatch; const candidates = items.filter((i: any) => (i.aiSuggestion || i._modified || i._regenerated) && !i._applied); if (candidates.length === 0) return; addAiMessage({ id: Date.now().toString(), role: 'ai', content: '请确认需要批量覆盖的指标：', type: 'card', cardData: { _type: 'PERFORMANCE_BATCH_OVERRIDE', items: candidates, count: candidates.length } }); };
  const handleBatchOverrideConfirm = (selectedIds: string[], overrideMessageId?: string, overrideCardData?: any) => {
      const newMessages = useAppStore.getState().aiMessages.map(msg => {
          if (overrideMessageId && msg.id === overrideMessageId) {
              return { ...msg, cardData: { ...overrideCardData, isApplied: true } };
          }
          if (msg.role === 'ai' && msg.cardData?._type === 'PERFORMANCE_LIST') {
              const newItems = msg.cardData.items.map((item: any) => {
                  if (selectedIds.includes(item.id)) {
                      return { ...item, _applied: true };
                  }
                  return item;
              });
              return { ...msg, cardData: { ...msg.cardData, items: newItems } };
          }
          return msg;
      });
      setAiMessages(newMessages);
  };
  const handleMilestoneClick = (milestone: any) => { 
      shouldStopRef.current = false;
      addAiMessage({ id: Date.now().toString(), role: 'user', content: `查看里程碑：${milestone.label}` }); 
      setIsTyping(true);
      setTimeout(() => { 
          if (shouldStopRef.current) return;
          setIsTyping(false);
          addAiMessage({ id: (Date.now() + 1).toString(), role: 'ai', content: `### ${milestone.label} (${milestone.time})\n\n在此阶段，员工${milestone.desc ? `担任${milestone.desc}` : '表现稳定'}。\n绩效评分为 ${milestone.perf}，薪资增长幅度符合预期。${milestone.tag ? `\n\n获得标签：${milestone.tag.text}` : ''}` }); 
      }, 600); 
  };

  if (!isOpen) return null;

  const renderHistoryPanel = () => {
      const isOverlayMode = displayMode === 'full' && viewMode === 'chat';
      return (
          <>
              {showHistory && isOverlayMode && <div className="absolute inset-0 bg-black/5 z-20 transition-opacity" onClick={() => setShowHistory(false)} />}
              <div className={`absolute top-0 bottom-0 right-0 bg-white z-30 transition-transform duration-300 ease-in-out flex flex-col ${showHistory ? 'translate-x-0' : 'translate-x-full'} ${isOverlayMode ? 'w-[280px] border-l border-gray-100 shadow-[-4px_0_24px_rgba(0,0,0,0.08)]' : 'w-full'}`}>
                  <ChatHistoryPanel history={aiHistory} currentSessionId={currentSessionId} onRestore={handleRestoreHistory} />
              </div>
          </>
      );
  };

  const renderChatContent = (isSidebar = false) => (
      <>
        <div className={`flex-1 overflow-y-auto relative min-h-0`}>
            {isLoadingHistory ? <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#F7F8FA]"><Loader2 size={20} className="text-[#927FFF] animate-spin" /><p className="text-xs text-gray-400 mt-2">正在同步会话记录...</p></div> : (
                <ChatMessageList
                    messages={aiMessages}
                    isTyping={isCurrentlyTyping}
                    setIsTyping={setIsTyping}
                    onImagePreview={setPreviewImage}
                    onAttachmentClick={handleAttachmentClick}
                    onCandidatesConfirm={handleCandidatesConfirm}
                    selectedOptions={selectedOptions}
                    toggleOption={toggleOption}
                    onMultiConfirm={handleMultiConfirm}
                    onBatchApply={onBatchApply}
                    onUpdateCardData={updateCardData}
                    onCardClick={handleCardClick}
                    onViewDetail={handleViewDetail}
                    onApplyChange={onApplyChange}
                    onLocateIssue={handleLocateIssue}
                    onApplyComplianceFix={handleApplyComplianceFix}
                    onBatchOverrideConfirm={handleBatchOverrideConfirm}
                    addAiMessage={addAiMessage}
                    messagesEndRef={messagesEndRef}
                    pendingPerfBatch={pendingPerfBatch}
                    onShowBatchOverrideConfirm={handleShowBatchOverrideConfirm}
                />
            )}
        </div>
        <div className="p-2 bg-[#F7F8FA] relative z-10">
            {isCurrentlyTyping ? (
                <div className="flex items-center gap-2 px-3 py-1.5 mb-2 ml-1 w-fit max-w-[calc(100%-1rem)]">
                    <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-[#927FFF]/30 border-t-[#927FFF] animate-spin"></div>
                        <div className="w-3 h-3 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#927FFF]">
                            <Lightbulb size={10} />
                        </div>
                    </div>
                    <ThinkingAnimation context={aiContext} />
                </div>
            ) : (
                <>
                {aiContext === 'PERFORMANCE' && onRegenerate && (
                    <button 
                        onClick={onRegenerate}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white transition-colors mb-2 ml-1 w-fit"
                    >
                        <RefreshCw size={12} className="text-[#15B8A6]" />
                        <span>清空并重新生成</span>
                    </button>
                )}
                {aiContext === 'ONBOARDING' && (
                    <button 
                        onClick={() => handleSendMessage('入职审批助手')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white transition-colors mb-2 ml-1 w-fit"
                    >
                        <Sparkles size={12} className="text-[#15B8A6]" />
                        <span>入职审批助手</span>
                    </button>
                )}
                </>
            )}
            <ChatInput value={input} onChange={setInput} onSend={handleSendMessage} onStop={handleStop} isTyping={isCurrentlyTyping} disabled={isUploading || (!input.trim() && inputImages.length === 0 && inputAttachments.length === 0 && !isCurrentlyTyping)} placeholder={isUploading ? "正在上传..." : (aiContext === 'PERFORMANCE' ? "请告诉 AI 如何优化绩效指标..." : (aiContext === 'ATTENDANCE' ? "请告诉 AI 您想创建什么补卡规则..." : (aiContext === 'EMPLOYEE' ? "请输入员工核查指令..." : (aiContext === 'ONBOARDING' ? "请告诉 AI 您想处理什么入职任务..." : "输入消息..."))))} mode={displayMode} autoFocus={true} containerClassName="rounded-2xl border-gray-300 focus-within:border-[#927FFF] focus-within:ring-1 focus-within:ring-[#927FFF]/20" textareaClassName="pl-3 pr-2 py-2 text-xs" buttonClassName="p-1 bg-gradient-to-br from-[#E16AF3] to-[#6265F0] text-white rounded-full hover:opacity-90" iconSize={12} images={inputImages} onImagesChange={setInputImages} attachments={inputAttachments} onAttachmentsChange={setInputAttachments} onUploadStatusChange={setIsUploading} onImagePreview={setPreviewImage} />
        </div>
      </>
  );

  const sharedSidebarContent = <>{renderChatContent(true)}{renderHistoryPanel()}</>;
  const DetailModal = <PerformanceDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} data={currentDetailItem} aiSuggestion={currentDetailSuggestion} onUpdate={handleDetailUpdate} onPrev={handlePrevItem} onNext={handleNextItem} disablePrev={!hasPrev} disableNext={!hasNext} />;
  const ImagePreviewOverlay = previewImage ? <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200" onClick={() => setPreviewImage(null)}><button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md z-[101]" onClick={() => setPreviewImage(null)}><X size={24} /></button><img src={previewImage} alt="Preview" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none" onClick={(e) => e.stopPropagation()} /></div> : null;
  
  if (displayMode === 'bar') { 
      return createPortal(
          <>
          <div className="fixed bottom-8 right-8 z-[80] animate-in fade-in zoom-in-90 slide-in-from-bottom-4 duration-300 origin-bottom-right">
              <div className={`bg-white/95 backdrop-blur-sm rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border ${isUploading ? 'border-[#927FFF]' : 'border-[#927FFF]/20'} flex items-center h-[52px] pl-2 pr-2 w-[480px] hover:border-[#927FFF]/50 transition-colors group`}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E16AF3] to-[#6265F0] flex items-center justify-center text-white shrink-0 shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => !isUploading && handleModeChange('mini')}>{isUploading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}</div>
                  <div className="relative flex items-center justify-center ml-1"><button className="p-1.5 text-gray-400 hover:text-[#927FFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => minibarFileInputRef.current?.click()} title="上传文件" disabled={isUploading}><Paperclip size={16} /></button><input type="file" ref={minibarFileInputRef} hidden multiple onChange={handleMinibarFileSelect} /></div>
                  <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !isUploading && handleSendMessage()} onPaste={handleMinibarPaste} disabled={isUploading} placeholder={isUploading ? "正在上传..." : (aiContext === 'PERFORMANCE' ? "请告诉 AI 如何优化绩效指标..." : (aiContext === 'ATTENDANCE' ? "请告诉 AI 您想创建什么补卡规则..." : (aiContext === 'EMPLOYEE' ? "请输入员工核查指令..." : (aiContext === 'ONBOARDING' ? "请告诉 AI 您想处理什么入职任务..." : "告诉 AI 帮你创建什么业务..."))))} className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-2 text-sm text-gray-700 placeholder:text-gray-400 min-w-0 disabled:bg-transparent disabled:text-gray-400" autoFocus />
                  <div className="flex items-center space-x-1 border-l border-gray-100 pl-2 shrink-0">
                       {isCurrentlyTyping ? <button onClick={handleStop} disabled={isUploading} className="relative w-8 h-8 flex items-center justify-center bg-[#262626] text-white rounded-full hover:bg-black transition-all animate-in zoom-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed" title="停止生成"><div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin"></div><Square size={14} fill="currentColor" className="relative z-10" /></button> : (input.trim() && <button onClick={handleSendMessage} disabled={isUploading} className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#E16AF3] to-[#6265F0] text-white rounded-full hover:opacity-90 transition-all animate-in zoom-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"><Send size={14} /></button>)}
                       {!aiModeLocked && <><HeaderActionBtn onClick={() => handleModeChange('full')} icon={Square} title="全屏模式" className="rounded-full w-8 h-8 p-0 flex items-center justify-center" disabled={isUploading} /><HeaderActionBtn onClick={() => handleModeChange('sidebar')} icon={PanelRight} title="切换为侧边栏" className="rounded-full w-8 h-8 p-0 flex items-center justify-center" disabled={isUploading} /><HeaderActionBtn onClick={() => handleModeChange('mini')} icon={AppWindow} title="窗口模式" className="rounded-full w-8 h-8 p-0 flex items-center justify-center" disabled={isUploading} /></>}
                       <HeaderActionBtn onClick={handleClose} icon={X} title="关闭" className="rounded-full w-8 h-8 p-0 flex items-center justify-center hover:text-red-500" disabled={isUploading} />
                  </div>
              </div>
          </div>
          {DetailModal}{ImagePreviewOverlay}
          </>,
          document.body
      )
  }

  if (displayMode === 'sidebar') { 
      return createPortal(
        <><div className={`fixed top-0 right-0 h-full w-[380px] bg-white border-l border-gray-200 flex flex-col z-[80] animate-in slide-in-from-right duration-300 ${aiSidebarPinned ? 'shadow-none' : 'shadow-2xl'}`}>
             <div className="px-4 border-b border-gray-200 bg-white flex justify-between items-center h-[56px] shrink-0">
                <div className="flex items-center">{showHistory ? <button onClick={() => setShowHistory(false)} className="mr-2 hover:bg-gray-100 p-1 rounded-md transition-colors flex items-center text-gray-600 font-bold text-sm"><ChevronLeft size={16} className="mr-1" />返回</button> : <><Sparkles size={16} className="text-[#927FFF] mr-2" /><span className="font-bold text-gray-800 text-sm">AI 助手</span></>}</div>
                <div className="flex items-center">
                    {!showHistory && <>{showNewChat && <HeaderActionBtn onClick={handleNewChat} icon={MessageSquarePlus} title="新建对话" />}{showClearChat && <HeaderActionBtn onClick={handleClearChat} icon={Eraser} title="清空对话" />}<HeaderActionBtn onClick={() => setShowHistory(true)} icon={History} title="历史记录" /><HeaderSeparator /></>}
                    {!aiModeLocked ? <><HeaderActionBtn onClick={toggleAiSidebarPin} icon={aiSidebarPinned ? PinOff : Pin} title={aiSidebarPinned ? "取消钉住" : "钉在侧边栏"} active={aiSidebarPinned} /><HeaderActionBtn onClick={() => handleModeChange('full')} icon={Square} title="全屏模式" /><HeaderActionBtn onClick={() => handleModeChange('mini')} icon={AppWindow} title="切换为悬浮窗" /><HeaderActionBtn onClick={() => handleModeChange('bar')} icon={Minus} title="收起为聊天条" /></> : <span className="text-xs text-gray-400 mr-2 border border-gray-200 rounded px-2 py-0.5">模式锁定</span>}
                    <HeaderSeparator /><HeaderActionBtn onClick={handleClose} icon={X} title="关闭" className="rounded-full w-8 h-8 p-0 flex items-center justify-center hover:text-red-500" />
                </div>
            </div>
            <div className="relative flex-1 overflow-hidden flex flex-col bg-[#F7F8FA]">{sharedSidebarContent}</div>
        </div>{DetailModal}{ImagePreviewOverlay}</>,
        document.body
      )
  }

  if (displayMode === 'mini') { 
     return createPortal(
          <><div className="fixed bottom-6 right-6 z-[80] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 origin-bottom-right"><div className="w-[400px] h-[550px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                  <div className="px-4 border-b border-gray-200 bg-white flex justify-between items-center h-[56px] shrink-0"><div className="flex items-center">{showHistory ? <button onClick={() => setShowHistory(false)} className="mr-2 hover:bg-gray-100 p-1 rounded-md transition-colors flex items-center text-gray-600 font-bold text-sm"><ChevronLeft size={16} className="mr-1" />返回</button> : <><Sparkles size={16} className="text-[#927FFF] mr-2" /><span className="font-bold text-gray-800 text-sm">AI 助手</span></>}</div><div className="flex items-center">{!showHistory && <>{showNewChat && <HeaderActionBtn onClick={handleNewChat} icon={MessageSquarePlus} title="新建对话" />}{showClearChat && <HeaderActionBtn onClick={handleClearChat} icon={Eraser} title="清空对话" />}<HeaderActionBtn onClick={() => setShowHistory(true)} icon={History} title="历史记录" /></>}{!aiModeLocked && <><HeaderActionBtn onClick={() => handleModeChange('full')} icon={Square} title="展开详情" /><HeaderActionBtn onClick={() => handleModeChange('sidebar')} icon={PanelRight} title="切换为侧边栏" /><HeaderActionBtn onClick={() => handleModeChange('bar')} icon={Minus} title="收起为聊天条" /></>}<HeaderSeparator /><HeaderActionBtn onClick={handleClose} icon={X} title="关闭" className="hover:text-red-500" /></div></div>
                  <div className="relative flex-1 overflow-hidden flex flex-col bg-[#F7F8FA]">{renderChatContent()}{renderHistoryPanel()}</div>
              </div></div>{DetailModal}{ImagePreviewOverlay}</>,
          document.body
      )
  }

  return (
    <>
    <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={null}
        width={viewMode === 'chat' ? 'w-[1000px]' : 'w-full'}
        padding={viewMode === 'chat' ? 'p-4' : 'p-1'}
        noContentPadding={true}
        scrollable={false}
        className={`transition-all duration-300 ${viewMode === 'chat' ? 'h-[85vh]' : 'h-full'} flex flex-col shadow-2xl`}
        footer={null}
        zIndex="z-[80]"
    >
        <div className="flex flex-1 overflow-hidden relative min-h-0">
            <div className={`flex-1 bg-white relative flex flex-col ${viewMode === 'chat' ? 'w-0 opacity-0 pointer-events-none border-none overflow-hidden' : 'opacity-100 min-w-[640px]'} ${isResizing ? '' : 'transition-all duration-300'}`}>
                {viewMode === 'split' && (
                    <>
                    <div className="h-14 border-b border-gray-200 flex items-center justify-center relative px-6 bg-white shrink-0">
                        <div className="flex items-center gap-2 absolute left-6">
                            {generatedType === 'BATCH' ? <Layers size={20} className="text-gray-400" /> : generatedType === 'BATCH_VISIT_RECORD' ? <Table size={20} className="text-gray-400" /> : generatedType === 'FILE_PREVIEW' ? <FileText size={20} className="text-gray-400" /> : generatedType === 'EMPLOYEE_ANALYSIS_RESULT' ? <BarChart3 size={20} className="text-gray-400" /> : <Building2 size={20} className="text-gray-400" />}
                            <span className="font-bold text-gray-800">{generatedType === 'BATCH' ? '批量创建预览' : generatedType === 'BATCH_VISIT_RECORD' ? '批量填充预览' : generatedType === 'FILE_PREVIEW' ? '文件预览' : generatedType === 'EMPLOYEE_ANALYSIS_RESULT' ? '分析报告详情' : '生成结果详情'}</span>
                        </div>
                        <div className="flex items-center gap-2 absolute right-6">
                            {generatedType !== 'FILE_PREVIEW' && generatedType !== 'EMPLOYEE_ANALYSIS_RESULT' && <><button onClick={handleFormCancelRequest} className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">放弃</button></>}
                            <button onClick={() => setViewMode('chat')} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"><PanelLeftClose size={20} /></button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden relative bg-white flex flex-col min-h-0">
                        {rightPanelEmpty ? <div className="flex flex-col items-center justify-center h-full text-gray-300 select-none"><div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Sparkles size={40} className="opacity-20" /></div><p className="text-sm">点击左侧卡片查看详情</p></div> : (
                            <>{generatedType === 'ORG' && <OrgForm externalData={generatedData} onCancel={confirmCancel} onSubmit={handleFormSubmit} />}
                                {generatedType === 'POSITION' && <JobForm initialData={generatedData} onCancel={confirmCancel} onSubmit={handleFormSubmit} />}
                                {generatedType === 'DUTY' && <DutyForm initialData={generatedData} onCancel={confirmCancel} onSubmit={handleFormSubmit} />}
                                {generatedType === 'CATEGORY' && <DutyCategoryForm initialData={generatedData} onCancel={confirmCancel} onSubmit={handleFormSubmit} />}
                                {generatedType === 'RETRO_RULE' && <RetroRuleForm initialData={generatedData} onCancel={confirmCancel} onSubmit={handleFormSubmit} />}
                                {generatedType === 'BATCH' && <MultiBusinessForm initialDataList={generatedData} onSubmit={handleBatchSubmit} onCancel={confirmCancel} />}
                                {generatedType === 'BATCH_VISIT_RECORD' && <BatchRecordReview initialData={generatedData.items} aiFields={generatedData.fields} onSubmit={handleBatchSubmit} onCancel={confirmCancel} />}
                                {generatedType === 'FILE_PREVIEW' && <FilePreview file={generatedData} />}
                                {generatedType === 'EMPLOYEE_ANALYSIS_RESULT' && <EmployeeAnalysisReport data={generatedData} onMilestoneClick={handleMilestoneClick} />}
                            </>
                        )}
                    </div>
                    </>
                )}
            </div>

            {viewMode === 'split' && (
                <div 
                    className={`w-1 cursor-col-resize hover:bg-[#927FFF]/50 active:bg-[#927FFF] z-50 transition-colors relative ${isResizing ? 'bg-[#927FFF]' : 'bg-transparent'}`}
                    onMouseDown={startResizing}
                >
                    <div className="absolute inset-y-0 -left-2 -right-2" />
                </div>
            )}

            <div 
                className={`${viewMode === 'chat' ? 'w-full' : 'border-l border-gray-200'} flex flex-col bg-[#F7F8FA] relative shrink-0 ${isResizing ? '' : 'transition-all duration-300'}`}
                style={viewMode === 'split' ? { width: `${chatPanelWidth}px` } : undefined}
            >
                <div className="h-14 border-b border-gray-200 bg-white flex justify-between items-center px-4 shrink-0">
                    <div className="flex items-center">{showHistory ? <button onClick={() => setShowHistory(false)} className="mr-2 hover:bg-gray-100 p-1 rounded-md transition-colors flex items-center text-gray-600 font-bold text-sm"><ChevronLeft size={16} className="mr-1" />返回</button> : <><Sparkles size={16} className="text-[#927FFF] mr-2" /><span className="font-bold text-gray-800 text-sm">AI 助手</span></>}</div>
                    <div className="flex items-center">
                        {!showHistory && <>{showNewChat && <HeaderActionBtn onClick={handleNewChat} icon={MessageSquarePlus} title="新建对话" />}{showClearChat && <HeaderActionBtn onClick={handleClearChat} icon={Eraser} title="清空对话" />}<HeaderActionBtn onClick={() => setShowHistory(true)} icon={History} title="历史记录" /><HeaderSeparator /></>}
                        {!aiModeLocked ? <><HeaderActionBtn onClick={() => toggleSplitView()} icon={viewMode === 'chat' ? PanelLeftOpen : PanelLeftClose} title={viewMode === 'chat' ? "展开详情" : "收起详情"} active={viewMode === 'split'} disabled={!generatedData && viewMode === 'chat'} /><HeaderActionBtn onClick={() => handleModeChange('sidebar')} icon={PanelRight} title="切换为侧边栏" /><HeaderActionBtn onClick={() => handleModeChange('mini')} icon={Minimize2} title="切换为窗口" /></> : <span className="text-xs text-gray-400 mr-2 border border-gray-200 rounded px-2 py-0.5">模式锁定</span>}
                        <HeaderSeparator /><HeaderActionBtn onClick={handleClose} icon={X} title="关闭" className="hover:text-red-500" />
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden flex flex-col">
                    {renderChatContent()}
                    {renderHistoryPanel()}
                </div>
            </div>
        </div>
    </Modal>
    {DetailModal}
    {ImagePreviewOverlay}
    </>
  );
};
