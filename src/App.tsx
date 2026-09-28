import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { RewardModal } from './components/RewardModal.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ParentDashboardPage } from './pages/ParentDashboardPage.tsx';
import { ChildHubPage } from './pages/ChildHubPage.tsx';
import { LogicPage } from './pages/LogicPage.tsx';
import { CodePage } from './pages/CodePage.tsx';
import { AIPage } from './pages/AIPage.tsx';
import { CreativePage } from './pages/CreativePage.tsx';
import { DigitalCulturePage } from './pages/DigitalCulturePage.tsx';
import { ProgressionPage } from './pages/ProgressionPage.tsx';
import { BadgesPage } from './pages/BadgesPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { ParentInsightsPage } from './pages/ParentInsightsPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';

function MainRouter() {
  const { user, currentPath, isLoading, mode } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-300">Initialisation de Smart Kids Lab...</span>
        </div>
      </div>
    );
  }

  // Not logged in -> LoginPage
  if (!user || currentPath === '/login') {
    return <LoginPage />;
  }

  // Route matching
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/dashboard':
        return <ParentDashboardPage />;
      case '/child':
        return <ChildHubPage />;
      case '/logic':
        return <LogicPage />;
      case '/code':
        return <CodePage />;
      case '/ai':
        return <AIPage />;
      case '/creative':
        return <CreativePage />;
      case '/digital':
        return <DigitalCulturePage />;
      case '/progression':
        return <ProgressionPage />;
      case '/badges':
        return <BadgesPage />;
      case '/profile':
        return <ProfilePage />;
      case '/parent':
        return <ParentInsightsPage />;
      case '/settings':
        return <SettingsPage />;
      default:
        return mode === 'child' ? <ChildHubPage /> : <ParentDashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:pl-72 transition-all">
        {renderCurrentPage()}
      </main>
      <RewardModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
