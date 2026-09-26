import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatView } from './components/ChatView';
import { TasksView } from './components/TasksView';
import { BooksView } from './components/BooksView';
import { ProgressView } from './components/ProgressView';
import { PaceSelectionModal } from './components/PaceSelectionModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] dark:bg-[#131211] text-[#1C1917] dark:text-[#F5F2EB] font-sans antialiased selection:bg-[#C25E34] selection:text-white pb-20 md:pb-0 transition-colors duration-200">
      {/* Sidebar / Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {activeTab === 'home' && <HomeDashboard />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'books' && <BooksView />}
        {activeTab === 'progress' && <ProgressView />}
      </main>

      {/* Pace Selection Modal (7 Days vs 30 Days) */}
      <PaceSelectionModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
