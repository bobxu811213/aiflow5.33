
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IAiMessage, IAiHistoryItem } from '../types';

interface AppState {
  currentOrgId: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentUser: {
    name: string;
    avatar: string;
    notifications: number;
  };
  
  // AI Sidebar State
  aiSidebarOpen: boolean;
  setAiSidebarOpen: (open: boolean) => void;
  aiMode: 'full' | 'mini' | 'bar' | 'sidebar';
  setAiMode: (mode: 'full' | 'mini' | 'bar' | 'sidebar') => void;
  
  aiSidebarPinned: boolean;
  toggleAiSidebarPin: () => void;
  setAiSidebarPinned: (pinned: boolean) => void;

  aiModeLocked: boolean;
  setAiModeLocked: (locked: boolean) => void;

  aiContext: 'ORG' | 'PERFORMANCE' | 'EMPLOYEE' | 'ESIGN' | 'Chat' | 'ATTENDANCE' | 'ONBOARDING';
  setAiContext: (context: 'ORG' | 'PERFORMANCE' | 'EMPLOYEE' | 'ESIGN' | 'Chat' | 'ATTENDANCE' | 'ONBOARDING') => void;

  // AI Chat Persistence
  aiMessages: IAiMessage[];
  addAiMessage: (message: IAiMessage) => void;
  setAiMessages: (messages: IAiMessage[]) => void;
  clearAiMessages: () => void;
  
  // Session & History
  currentSessionId: string;
  startNewSession: () => void;
  restoreSession: (id: string, messages: IAiMessage[]) => void;

  aiHistory: IAiHistoryItem[];
  updateAiHistory: (item: IAiHistoryItem) => void;

  // Interaction State
  activeHighlightId: string | null;
  setActiveHighlightId: (id: string | null) => void;

  // Document Interaction
  activeDocumentQuote: string | null;
  setActiveDocumentQuote: (quote: string | null) => void;
  
  pendingDocumentContent: string | null;
  setPendingDocumentContent: (content: string | null) => void;

  // Employee Check Interaction
  highlightedWorkExperienceIds: number[];
  setHighlightedWorkExperienceIds: (ids: number[]) => void;

  // Onboarding Interaction
  selectedOnboardingEmployees: any[];
  setSelectedOnboardingEmployees: (employees: any[]) => void;

  // Dynamic Header Breadcrumbs
  headerBreadcrumbs: { label: string; path?: string | null; onClick?: () => void }[] | null;
  setHeaderBreadcrumbs: (breadcrumbs: { label: string; path?: string | null; onClick?: () => void }[] | null) => void;

  // Sidebar Menu State
  openMenus: string[];
  setOpenMenus: (menus: string[] | ((prev: string[]) => string[])) => void;
}

// Helper to save current session to history list
const saveCurrentSession = (state: AppState): IAiHistoryItem[] => {
    const { aiMessages, currentSessionId, aiHistory } = state;
    // Safety check: ensure aiMessages is an array
    if (!aiMessages || !Array.isArray(aiMessages) || aiMessages.length === 0) return aiHistory;

    // Logic to derive preview data for the history item
    const firstUserMsg = aiMessages.find(m => m.role === 'user');
    // Find the very last card generated in the conversation
    const lastCardMsg = [...aiMessages].reverse().find(m => m.type === 'card' && m.cardData);
    
    let businessType: any = 'CHAT';
    let data = null;
    const prompt = firstUserMsg?.content || '新对话 ' + new Date().toLocaleTimeString();

    if (lastCardMsg && lastCardMsg.cardData) {
        // Use the type from the card if available, otherwise default to CHAT/BATCH based on structure
        const type = lastCardMsg.cardData._type;
        if (type) {
             businessType = type;
        } else {
             // Fallback inference if _type is missing
             if (lastCardMsg.cardData.name) businessType = 'ORG'; // Guess
        }
        data = lastCardMsg.cardData;
    }

    const historyItem: IAiHistoryItem = {
        id: currentSessionId,
        timestamp: Date.now(),
        prompt: prompt,
        data: data,
        businessType: businessType,
        messages: [...aiMessages]
    };

    // Remove existing entry with same ID if exists (update it), then prepend
    const filteredHistory = aiHistory.filter(h => h.id !== currentSessionId);
    return [historyItem, ...filteredHistory];
};

// Helper to strip heavy content (images/attachments) from messages for storage to avoid QuotaExceededError
const stripHeavyContent = (messages: IAiMessage[]): IAiMessage[] => {
    if (!Array.isArray(messages)) return [];
    return messages.map(msg => {
        // Create a shallow copy
        const newMsg = { ...msg };
        // Remove large base64 data fields
        if (newMsg.images) delete newMsg.images;
        if (newMsg.attachments) delete newMsg.attachments;
        return newMsg;
    });
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentOrgId: 'org-001',
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      currentUser: {
        name: '管理员',
        avatar: 'https://picsum.photos/200',
        notifications: 88,
      },
      
      // AI State
      aiSidebarOpen: false,
      setAiSidebarOpen: (open) => set({ aiSidebarOpen: open }),
      aiMode: 'bar', 
      setAiMode: (mode) => set({ aiMode: mode }),
      
      aiSidebarPinned: false,
      toggleAiSidebarPin: () => set((state) => ({ aiSidebarPinned: !state.aiSidebarPinned })),
      setAiSidebarPinned: (pinned) => set({ aiSidebarPinned: pinned }),

      aiModeLocked: false,
      setAiModeLocked: (locked) => set({ aiModeLocked: locked }),

      aiContext: 'ORG',
      setAiContext: (context) => set({ aiContext: context }),

      // AI Chat Persistence
      aiMessages: [],
      addAiMessage: (message) => set((state) => {
          const currentMessages = Array.isArray(state.aiMessages) ? state.aiMessages : [];
          return { aiMessages: [...currentMessages, message] };
      }),
      setAiMessages: (messages) => set({ aiMessages: Array.isArray(messages) ? messages : [] }),
      clearAiMessages: () => set({ aiMessages: [] }),
      
      // Session & History
      currentSessionId: 'session-' + Date.now(),
      
      startNewSession: () => set((state) => {
          const newHistory = saveCurrentSession(state);
          return { 
              aiHistory: newHistory,
              aiMessages: [], 
              currentSessionId: 'session-' + Date.now() 
          };
      }),
      
      restoreSession: (id, messages) => set((state) => {
          const newHistory = saveCurrentSession(state);
          return {
              aiHistory: newHistory,
              currentSessionId: id,
              aiMessages: Array.isArray(messages) ? messages : []
          };
      }),

      aiHistory: [],
      updateAiHistory: (item) => set((state) => {
          const otherItems = state.aiHistory.filter(i => i.id !== item.id);
          return { aiHistory: [item, ...otherItems] };
      }),

      // Interaction State
      activeHighlightId: null,
      setActiveHighlightId: (id) => set({ activeHighlightId: id }),
      
      // Document Interaction
      activeDocumentQuote: null,
      setActiveDocumentQuote: (quote) => set({ activeDocumentQuote: quote }),
      
      pendingDocumentContent: null,
      setPendingDocumentContent: (content) => set({ pendingDocumentContent: content }),

      // Employee Check Interaction
      highlightedWorkExperienceIds: [],
      setHighlightedWorkExperienceIds: (ids) => set({ highlightedWorkExperienceIds: ids }),

      // Onboarding Interaction
      selectedOnboardingEmployees: [],
      setSelectedOnboardingEmployees: (employees) => set({ selectedOnboardingEmployees: employees }),

      // Dynamic Header Breadcrumbs
      headerBreadcrumbs: null,
      setHeaderBreadcrumbs: (breadcrumbs) => set({ headerBreadcrumbs: breadcrumbs }),

      // Sidebar Menu State
      openMenus: ['org', 'staff', 'attendance', 'performance', 'esign', 'free-table'],
      setOpenMenus: (menus) => set((state) => ({
        openMenus: typeof menus === 'function' ? menus(state.openMenus) : menus
      })),
    }),
    {
      name: 'aiflow-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Select fields to persist, ensure aiMessages is safe
        currentOrgId: state.currentOrgId,
        sidebarOpen: state.sidebarOpen,
        aiMode: state.aiMode,
        aiSidebarPinned: state.aiSidebarPinned,
        // Only store stripped messages
        aiMessages: stripHeavyContent(state.aiMessages),
        currentSessionId: state.currentSessionId,
        // Limit history to last 15 items and strip content
        aiHistory: state.aiHistory.slice(0, 15).map(item => ({
            ...item,
            messages: item.messages ? stripHeavyContent(item.messages) : []
        })),
        aiContext: state.aiContext,
        openMenus: state.openMenus,
      }),
    }
  )
);
