import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api-service';
import { IPerformanceIndicator } from '../types';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { PerformanceDetailModal } from '../components/performance/performance-detail-modal';
import { useAppStore } from '../store/use-app-store';
import { PerformanceTable } from '../components/performance/performance-table';
import { PerformanceToolbar } from '../components/performance/performance-toolbar';

const PerformanceIndicatorsPage: React.FC = () => {
  const [data, setData] = useState<IPerformanceIndicator[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastModifiedCells, setLastModifiedCells] = useState<Record<string, string[]>>({});
  // Store AI Suggestions: ItemID -> FieldName -> SuggestionText
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, Record<string, string>>>({});
  
  // Detail Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPerformanceIndicator | null>(null);

  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    setAiSidebarPinned,
    setAiModeLocked,
    addAiMessage,
    aiMessages,
    setAiMessages,
    activeHighlightId,
    setActiveHighlightId,
    aiContext,
    setAiContext,
    startNewSession,
    clearAiMessages
  } = useAppStore();

  const fetchData = async () => {
    setLoading(true);
    try {
        const result = await ApiService.getPerformanceIndicators();
        setData(result);
        setLastModifiedCells({});
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Effect to sync Detail Modal selection with Active Highlight
  useEffect(() => {
    if (isDetailModalOpen && activeHighlightId && selectedItem?.id !== activeHighlightId) {
        const item = data.find(i => i.id === activeHighlightId);
        if (item) {
            setSelectedItem(item);
        }
    }
  }, [activeHighlightId, isDetailModalOpen, data, selectedItem]);

  // Ensure strict AI mode when sidebar is open on this page
  useEffect(() => {
      if (aiSidebarOpen) {
          if (aiContext !== 'PERFORMANCE') {
              setAiContext('PERFORMANCE');
              startNewSession();
          }
          if (aiMode !== 'sidebar' || !useAppStore.getState().aiModeLocked) {
              setAiMode('sidebar');
              setAiSidebarPinned(true);
              setAiModeLocked(true);
          }
      }
  }, [aiSidebarOpen]);

  const handleAiChatOpen = () => {
    // 1. Force sidebar mode and lock it
    setAiMode('sidebar');
    setAiSidebarPinned(true);
    setAiModeLocked(true);
    
    // Switch Context if needed
    if (aiContext !== 'PERFORMANCE') {
        setAiContext('PERFORMANCE');
        startNewSession();
    }
    
    // 2. Open AI
    setAiSidebarOpen(true);
    
    // 3. Start a new context/session implicitly or just append message
    // Let's append a message that carries the current data
    ensurePerformanceListInChat();

    // 4. Mock AI Analysis for List View
    // Analyze descriptions and mark them if too long
    const newSuggestions: Record<string, Record<string, string>> = {};
    data.forEach(item => {
        // Specific rule: Description too long
        if (item.description && item.description.length > 50) {
             if (!newSuggestions[item.id]) newSuggestions[item.id] = {};
             // newSuggestions[item.id]['description'] = "指标说明过长，建议精简"; 
             // Commented out to not conflict with the demo 'modified' state
        }
    });
    setAiSuggestions(newSuggestions);
  };

  const ensurePerformanceListInChat = (force = false) => {
      // Check if we already have the list or the reading message
      const hasPerfList = aiMessages.some(m => m.cardData && m.cardData._type === 'PERFORMANCE_LIST');
      const hasReadingMsg = aiMessages.some(m => m.type === 'thinking');

      if ((!hasPerfList && !hasReadingMsg) || force) {
          // 1. Add reading message
          const thinkingId = Date.now().toString();
          addAiMessage({
              id: thinkingId,
              role: 'ai',
              content: '正在读取当前页面绩效指标数据...',
              type: 'thinking'
          });

          // 2. Simulate delay then add cards
          setTimeout(() => {
              const performanceCards = data.map(item => ({
                  id: item.id,
                  title: item.name,
                  code: item.code,
                  desc: item.description,
                  meta: { 
                      weight: item.weight, 
                      target: item.targetValue 
                  },
                  remarks: item.remarks,
                  type: 'PERFORMANCE',
                  // Inject consistent suggestion data matching the Detail Modal
                  aiSuggestion: {
                      reason: '基于同行业效能数据分析，您的当前指标描述过于宽泛，建议细化量化标准以提升考核的准确性。',
                      description: `${item.description} 建议增加对过程指标的考核，并引入季度复盘机制。同时结合历史数据，该目标设定具备挑战性但可达成。`,
                      targetValue: item.targetValue.replace(/(\d+)/g, (match) => {
                            const num = parseInt(match);
                            return (num < 100 ? num + 5 : num).toString();
                        }),
                      targetReason: '量化标准更明确',
                      descReason: '定义更清晰，便于考核',
                      remarks: `${item.remarks || ''} 建议结合部门年度目标进行季度审视。`,
                      remarksReason: '增加执行建议'
                  }
              }));

              const listMessageId = (Date.now() + 1).toString();
              
              // Add the message with an empty items array first
              addAiMessage({
                  id: listMessageId,
                  role: 'ai',
                  content: `已为您加载当前页面的 ${data.length} 个绩效指标数据，您可以针对这些指标进行提问或优化：`,
                  type: 'card',
                  cardData: {
                      _type: 'PERFORMANCE_LIST',
                      items: []
                  }
              });

              // Add items one by one with a random delay of 2-3 seconds
              let currentIndex = 0;
              const addNextItem = () => {
                  const currentMessages = useAppStore.getState().aiMessages;
                  const hasThinking = currentMessages.some(m => m.id === thinkingId);
                  
                  // If thinking message is gone, it means user clicked stop
                  if (!hasThinking) return;

                  if (currentIndex < performanceCards.length) {
                      const updatedMessages = currentMessages.map(m => {
                          if (m.id === listMessageId && m.cardData) {
                              return {
                                  ...m,
                                  cardData: {
                                      ...m.cardData,
                                      items: [...m.cardData.items, performanceCards[currentIndex]]
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
                  }
              };

              // Start adding items
              addNextItem();
              
          }, 1000);
      }
  };

  const handleApplyAiChange = async (cardData: any) => {
    const oldItem = data.find(p => p.id === cardData.id);

    const updatedItem: IPerformanceIndicator = {
        id: cardData.id,
        code: cardData.code,
        name: cardData.title,
        description: cardData.desc,
        weight: cardData.meta.weight,
        targetValue: cardData.meta.target,
        remarks: cardData.remarks,
    };
    
    // Change detection logic
    const changes: string[] = [];
    if (oldItem) {
        if (oldItem.name !== updatedItem.name) changes.push('name');
        if (Number(oldItem.weight) !== Number(updatedItem.weight)) changes.push('weight');
        if (oldItem.targetValue !== updatedItem.targetValue) changes.push('targetValue');
        if (oldItem.description !== updatedItem.description) changes.push('description');
        if (oldItem.remarks !== updatedItem.remarks) changes.push('remarks');
    }

    if (changes.length > 0) {
        // Merge changes instead of replacing to support multiple AI adjustments
        setLastModifiedCells(prev => {
            const existingChanges = prev[updatedItem.id] || [];
            const mergedChanges = Array.from(new Set([...existingChanges, ...changes]));
            return { ...prev, [updatedItem.id]: mergedChanges };
        });
        
        // Also clear any AI suggestions for modified fields since they are now updated
        setAiSuggestions(prev => {
            if (!prev[updatedItem.id]) return prev;
            const newForId = { ...prev[updatedItem.id] };
            changes.forEach(field => delete newForId[field]);
            if (Object.keys(newForId).length === 0) {
                const { [updatedItem.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [updatedItem.id]: newForId };
        });
    }

    await ApiService.updatePerformanceIndicator(updatedItem);
    setData(prev => prev.map(p => p.id === updatedItem.id ? updatedItem : p));
  };
  
  const handleBatchApplyAiChange = async (items: any[]) => {
      // items contains the updated data for multiple indicators.
      // Format of item is similar to what's used in handleApplyAiChange (from card data)
      // Map to IPerformanceIndicator
      const indicatorsToUpdate: IPerformanceIndicator[] = items.map(item => ({
          id: item.id,
          code: item.code,
          name: item.name,
          description: item.description,
          weight: item.weight,
          targetValue: item.targetValue,
          remarks: item.remarks
      }));

      // Calculate changes for highlighting
      const newModifiedCells: Record<string, string[]> = {};
      
      indicatorsToUpdate.forEach(newItem => {
          const oldItem = data.find(d => d.id === newItem.id);
          if (oldItem) {
              const changes: string[] = [];
              if (oldItem.name !== newItem.name) changes.push('name');
              if (Number(oldItem.weight) !== Number(newItem.weight)) changes.push('weight');
              if (oldItem.targetValue !== newItem.targetValue) changes.push('targetValue');
              if (oldItem.description !== newItem.description) changes.push('description');
              if (oldItem.remarks !== newItem.remarks) changes.push('remarks');
              
              if (changes.length > 0) {
                  newModifiedCells[newItem.id] = changes;
              }
          }
      });
      
      setLastModifiedCells(prev => {
          const merged = { ...prev };
          Object.keys(newModifiedCells).forEach(id => {
               const existing = merged[id] || [];
               merged[id] = Array.from(new Set([...existing, ...newModifiedCells[id]]));
          });
          return merged;
      });

      // Optimistic update all
      const updatesMap = indicatorsToUpdate.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
      }, {} as Record<string, IPerformanceIndicator>);

      setData(prev => prev.map(p => updatesMap[p.id] ? { ...p, ...updatesMap[p.id] } : p));
      
      // Clear suggestions for updated items
      setAiSuggestions(prev => {
          const newSuggestions = { ...prev };
          indicatorsToUpdate.forEach(item => {
              delete newSuggestions[item.id];
          });
          return newSuggestions;
      });

      // API calls (parallel)
      await Promise.all(indicatorsToUpdate.map(item => ApiService.updatePerformanceIndicator(item)));
  };

  const handleCreate = async () => {
      const newIndicator = await ApiService.createPerformanceIndicator({
          name: '',
          description: '',
          weight: 0,
          targetValue: ''
      });
      setData(prev => [...prev, newIndicator]);
  };

  const handleUpdate = async (id: string, field: keyof IPerformanceIndicator, value: any) => {
      const updatedItem = data.find(item => item.id === id);
      if (!updatedItem) return;

      const newItem = { ...updatedItem, [field]: value };
      
      // Optimistic update
      setData(prev => prev.map(item => item.id === id ? newItem : item));
      
      // Clear suggestion if exists
      if (aiSuggestions[id] && aiSuggestions[id][field as string]) {
          setAiSuggestions(prev => {
              const newForId = { ...prev[id] };
              delete newForId[field as string];
              if (Object.keys(newForId).length === 0) {
                  const { [id]: _, ...rest } = prev;
                  return rest;
              }
              return { ...prev, [id]: newForId };
          });
      }

      // API update
      await ApiService.updatePerformanceIndicator(newItem);
  };
  
  const handleFullUpdate = async (updatedItem: IPerformanceIndicator) => {
      // Optimistic update
      setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
      
      // Update selected item if it matches, to prevent stale data in modal when navigating back/forth
      if (selectedItem && selectedItem.id === updatedItem.id) {
          setSelectedItem(updatedItem);
      }

      await ApiService.updatePerformanceIndicator(updatedItem);
  };

  const handleDelete = async (id: string) => {
      if (confirm('确认删除该指标吗？')) {
          await ApiService.deletePerformanceIndicator(id);
          setData(prev => prev.filter(item => item.id !== id));
      }
  };

  const handleRowClick = (id: string) => {
    setActiveHighlightId(id);
  };

  const handleViewDetail = (item: IPerformanceIndicator) => {
    setSelectedItem(item);
    setActiveHighlightId(item.id); // Sync highlight
    setIsDetailModalOpen(true);
  };

  // Detail Navigation Handlers
  const handlePrevItem = () => {
      if (!selectedItem) return;
      const index = data.findIndex(i => i.id === selectedItem.id);
      if (index > 0) {
          const newItem = data[index - 1];
          setSelectedItem(newItem);
          setActiveHighlightId(newItem.id); // Sync highlight
      }
  };

  const handleNextItem = () => {
      if (!selectedItem) return;
      const index = data.findIndex(i => i.id === selectedItem.id);
      if (index < data.length - 1) {
          const newItem = data[index + 1];
          setSelectedItem(newItem);
          setActiveHighlightId(newItem.id); // Sync highlight
      }
  };

  const selectedIndex = selectedItem ? data.findIndex(i => i.id === selectedItem.id) : -1;
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex !== -1 && selectedIndex < data.length - 1;

  return (
    <div className={`flex flex-col h-full bg-white overflow-hidden relative transition-all duration-300 ease-in-out`}>
      <PerformanceToolbar 
          totalCount={data.length} 
          onSearch={(term) => console.log(term)} 
          onCreate={handleCreate} 
      />

      {/* Info Alert */}
      <div className="mx-4 mt-2 bg-[#E6F8F6] border border-[#B8EBE5] px-3 py-2 rounded-sm flex items-center text-xs text-[#13A695] shrink-0">
          <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-[10px] font-bold">i</div>
          绩效指标库用于管理公司级、部门级及个人级考核指标，点击单元格可直接编辑内容。
      </div>

      <PerformanceTable 
          data={data}
          loading={loading}
          activeHighlightId={activeHighlightId}
          lastModifiedCells={lastModifiedCells}
          aiSuggestions={aiSuggestions}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onViewDetail={handleViewDetail}
      />

       {/* Pagination Footer */}
      <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-end px-4 text-xs text-gray-600 shrink-0">
          <div className="flex items-center">
              <span className="mr-4">共 {data.length} 条</span>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"><ChevronLeft size={14}/></button>
              <button className="w-6 h-6 border border-primary text-primary rounded flex items-center justify-center mr-2 bg-primary-light">1</button>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center mr-2 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"><ChevronRight size={14}/></button>
              
              <div className="flex items-center ml-2">
                  <span className="border border-gray-200 px-2 py-1 rounded mr-2 flex items-center cursor-pointer hover:border-primary transition-colors">10 条/页 <ChevronDown size={10} className="ml-1"/></span>
              </div>
          </div>
      </div>

      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

      <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}} 
          onSuccess={fetchData}
          onApplyChange={handleApplyAiChange}
          onBatchApply={handleBatchApplyAiChange}
          showNewChat={false}
          showClearChat={true}
          onRegenerate={() => {
              clearAiMessages();
              startNewSession();
              setTimeout(() => {
                  ensurePerformanceListInChat(true);
              }, 100);
          }}
      />

      <PerformanceDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedItem}
        onUpdate={handleFullUpdate}
        onPrev={handlePrevItem}
        onNext={handleNextItem}
        disablePrev={!hasPrev}
        disableNext={!hasNext}
      />
    </div>
  );
};

export default PerformanceIndicatorsPage;