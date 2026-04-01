
import React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';

export const MainLayout: React.FC = () => {
  const { aiSidebarOpen, aiMode, aiSidebarPinned } = useAppStore();
  const isPinned = aiSidebarOpen && aiMode === 'sidebar' && aiSidebarPinned;

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden bg-secondary transition-all duration-300 ease-in-out ${isPinned ? 'pr-[380px]' : ''}`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className={`flex-1 overflow-hidden bg-white shadow-sm relative z-0 flex flex-col transition-all duration-300 ease-in-out my-2 ml-2 ${isPinned ? 'mr-0 rounded-r-none' : 'mr-2 rounded-lg'}`}>
           <Outlet />
        </main>
      </div>
    </div>
  );
};
