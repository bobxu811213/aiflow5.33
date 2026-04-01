import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api-service';
import { IVisitRecord } from '../types';
import { FloatingToolbar } from '../components/common/floating-toolbar';
import { AiAssistantModal } from '../components/org/ai-assistant-modal';
import { CreateVisitModal } from '../components/free-table/create-visit-modal';
import { AiCreateRecordModal } from '../components/free-table/ai-create-record-modal';
import { AiFillPopover } from '../components/free-table/ai-fill-popover';
import { FreeTableToolbar } from '../components/free-table/free-table-toolbar';
import { FreeTableList } from '../components/free-table/free-table-list';
import { FreeTablePagination } from '../components/free-table/free-table-pagination';
import { useAppStore } from '../store/use-app-store';

const AVAILABLE_FIELDS = [
    { key: 'customerName', label: '客户名称' },
    { key: 'visitDate', label: '拜访日期' },
    { key: 'minutes', label: '会议纪要' },
    { key: 'todos', label: '待办事项' },
    { key: 'plan', label: '后续计划' },
];

const FreeTablePage: React.FC = () => {
  const [data, setData] = useState<IVisitRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Column Widths State
  const [columnWidths, setColumnWidths] = useState({
    customerName: 200,
    visitDate: 120,
    minutes: 300,
    todos: 250,
    plan: 250
  });

  // AI Create logic
  const [isAiCreateModalOpen, setIsAiCreateModalOpen] = useState(false);
  const [aiCreatedData, setAiCreatedData] = useState<any>(null);

  // Selection State
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  // AI Fill State
  const [aiFillState, setAiFillState] = useState<{ 
      isOpen: boolean;
      field: string;
      label: string;
      anchorEl: HTMLElement | null;
  }>({ 
      isOpen: false, 
      field: '', 
      label: '', 
      anchorEl: null 
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingField, setGeneratingField] = useState<string | null>(null);
  
  // Track AI generated cells: "recordId-fieldKey"
  const [aiModifiedCells, setAiModifiedCells] = useState<Set<string>>(new Set());

  // Global AI State
  const { 
    aiSidebarOpen, 
    setAiSidebarOpen, 
    aiMode, 
    setAiMode,
    aiContext,
    setAiContext,
    startNewSession,
    addAiMessage,
    setAiSidebarPinned,
    setAiModeLocked
  } = useAppStore();

  const fetchData = async () => {
    setLoading(true);
    const records = await ApiService.getVisitRecords();
    setData(records);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAiChatOpen = () => {
    if (aiContext !== 'Chat') { 
        setAiContext('Chat');
        startNewSession();
    }
    setAiMode('bar');
    setAiSidebarOpen(true);
  };

  const handleAiHeaderClick = (e: React.MouseEvent, label: string, field: string) => {
      setAiFillState({ 
          isOpen: true, 
          field, 
          label, 
          anchorEl: e.currentTarget as HTMLElement 
      });
  };

  // Single Column AI Generation
  const handleAiGenerateConfirm = async (prompt: string) => {
    const { field } = aiFillState;
    if (!field) return;
    
    // Close popover immediately
    setAiFillState(prev => ({ ...prev, isOpen: false, anchorEl: null }));

    setIsGenerating(true);
    setGeneratingField(field);
    
    // Determine scope: If selection exists, use selection. Otherwise all.
    const itemsToProcess = data
        .filter(item => selectedRowIds.size === 0 || selectedRowIds.has(item.id))
        .map(item => ({
            id: item.id,
            context: item 
        }));

    try {
        const results = await ApiService.batchGenerateVisitRecordField(itemsToProcess, field, prompt);
        
        // Update state
        const updatesMap = new Map(results.map(r => [r.id, r.value]));
        
        // Track AI modifications
        setAiModifiedCells(prev => {
            const next = new Set(prev);
            results.forEach(r => next.add(`${r.id}-${field}`));
            return next;
        });
        
        setData(prev => prev.map(item => {
            if (updatesMap.has(item.id)) {
                return { ...item, [field]: updatesMap.get(item.id) };
            }
            return item;
        }));
        
    } catch (error) {
        console.error("Failed to generate", error);
    } finally {
        setIsGenerating(false);
        setGeneratingField(null);
    }
  };

  // Start Batch AI Fill (New Sidebar Flow)
  const handleStartBatchAiFill = () => {
      const selectedItems = data.filter(item => selectedRowIds.has(item.id));
      
      // 1. Switch context and open sidebar
      setAiContext('Chat');
      startNewSession(); // Start fresh for this task
      setAiMode('sidebar');
      setAiSidebarPinned(true);
      setAiModeLocked(true);
      setAiSidebarOpen(true);

      // 2. Add System/AI Message to init the config card
      setTimeout(() => {
          addAiMessage({
              id: Date.now().toString(),
              role: 'ai',
              content: `已为您选中 ${selectedItems.length} 条数据，请配置填充规则：`,
              type: 'card',
              cardData: {
                  _type: 'BATCH_FILL_CONFIG',
                  count: selectedItems.length,
                  items: selectedItems
              }
          });
      }, 100);
  };

  const handleBatchFillApply = (filledItems: IVisitRecord[]) => {
      const updatesMap = new Map(filledItems.map(item => [item.id, item]));
      const newModifiedCells = new Set(aiModifiedCells);

      // Find changed fields to highlight
      filledItems.forEach(newItem => {
          const oldItem = data.find(d => d.id === newItem.id);
          if (oldItem) {
              if (newItem.minutes !== oldItem.minutes) newModifiedCells.add(`${newItem.id}-minutes`);
              if (newItem.todos !== oldItem.todos) newModifiedCells.add(`${newItem.id}-todos`);
              if (newItem.plan !== oldItem.plan) newModifiedCells.add(`${newItem.id}-plan`);
          }
      });

      setAiModifiedCells(newModifiedCells);
      
      setData(prev => prev.map(item => {
          if (updatesMap.has(item.id)) {
              return updatesMap.get(item.id)!;
          }
          return item;
      }));
  };

  const handleManualAdd = () => {
      setAiCreatedData(null); // Clear any previous AI data
      setIsCreateModalOpen(true);
  };

  const handleAiAdd = () => {
      setIsAiCreateModalOpen(true);
  };

  const handleAiGeneratedData = (data: any) => {
      setAiCreatedData(data);
      setIsCreateModalOpen(true); // Open standard modal populated with AI data
  };

  const handleColumnResize = (field: string, newWidth: number) => {
      setColumnWidths(prev => ({ ...prev, [field]: newWidth }));
  };

  return (
    <div className={`flex flex-col h-full bg-white overflow-hidden relative transition-all duration-300 ease-in-out`}>
      <FreeTableToolbar 
          totalCount={data.length}
          selectedCount={selectedRowIds.size}
          onSearch={(term) => {
              // Mock search
              console.log('Search:', term);
          }}
          onAddManual={handleManualAdd}
          onAddAi={handleAiAdd}
          onBatchAiFill={handleStartBatchAiFill}
      />

      <div className="mx-4 mt-2 bg-blue-50 border border-blue-100 px-3 py-2 rounded-sm flex items-center text-xs text-blue-600 shrink-0">
          <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-[10px] font-bold">i</div>
          {selectedRowIds.size > 0 ? (
              <span>已选择 <span className="font-bold">{selectedRowIds.size}</span> 条记录，点击上方紫色按钮可进行批量 AI 填充。</span>
          ) : (
              <span>已选择 <span className="font-bold">{data.length > 0 ? selectedRowIds.size : 0}</span> 条记录，点击上方紫色按钮可进行批量 AI 填充。</span>
          )}
      </div>

      <FreeTableList 
          data={data}
          loading={loading}
          selectedRowIds={selectedRowIds}
          columnWidths={columnWidths}
          isGenerating={isGenerating}
          generatingField={generatingField}
          aiModifiedCells={aiModifiedCells}
          onSelectionChange={setSelectedRowIds}
          onColumnResize={handleColumnResize}
          onAiHeaderClick={handleAiHeaderClick}
      />

      <FreeTablePagination 
          totalCount={data.length}
          selectedCount={selectedRowIds.size}
      />

      {!aiSidebarOpen && <FloatingToolbar onAiClick={handleAiChatOpen} />}

      <CreateVisitModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchData}
        initialData={aiCreatedData}
      />

      <AiCreateRecordModal
        isOpen={isAiCreateModalOpen}
        onClose={() => setIsAiCreateModalOpen(false)}
        onGenerated={handleAiGeneratedData}
      />

      <AiFillPopover 
        anchorEl={aiFillState.anchorEl}
        onClose={() => setAiFillState(prev => ({ ...prev, isOpen: false, anchorEl: null }))}
        onGenerate={handleAiGenerateConfirm}
        columnLabel={aiFillState.label}
        isGenerating={isGenerating}
        availableFields={AVAILABLE_FIELDS}
        selectedCount={selectedRowIds.size}
      />

      <AiAssistantModal 
          isOpen={aiSidebarOpen}
          onClose={() => setAiSidebarOpen(false)}
          initialMode={aiMode}
          onModeChange={setAiMode}
          onSubmit={async () => {}} 
          onSuccess={fetchData}
          onBatchApply={handleBatchFillApply}
      />
    </div>
  );
};

export default FreeTablePage;