import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AICopilot } from './AICopilot';
import { AppState, Language, Theme } from '../types';
import { WALLPAPERS } from '../constants';

interface LayoutProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ state, setState, children, onLogout }) => {
  const isRtl = state.language === 'ar';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setState(prev => ({ ...prev, isSidebarOpen: true }));
      } else {
        setState(prev => ({ ...prev, isSidebarOpen: false }));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setState]);

  const toggleSidebar = () => setState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  const toggleCopilot = () => setState(prev => ({ ...prev, isCopilotOpen: !prev.isCopilotOpen }));
  
  const changeLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const changeTheme = (theme: Theme) => {
    setState(prev => ({ ...prev, theme }));
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearchChange = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const handleProjectChange = (projectId: string) => {
    setState(prev => ({ ...prev, selectedProjectId: projectId }));
  };

  // Determine Wallpaper Styles
  const wp = state.settings.wallpaper;
  let containerClass = "min-h-screen flex overflow-hidden transition-colors duration-300 ";
  let containerStyle: React.CSSProperties = {};

  if (wp.type === 'preset') {
    const preset = WALLPAPERS.find(w => w.id === wp.value) || WALLPAPERS[0];
    containerClass += preset.class;
  } else if (wp.type === 'color') {
    containerStyle.backgroundColor = wp.value;
  } else if (wp.type === 'image') {
    containerStyle.backgroundImage = `url(${wp.value})`;
    containerStyle.backgroundSize = 'cover';
    containerStyle.backgroundPosition = 'center';
    containerStyle.backgroundAttachment = 'fixed';
  }

  return (
    <div className={containerClass} style={containerStyle}>
      {/* Only show default decorative blobs if using a preset */}
      {wp.type === 'preset' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>
      )}

      <Sidebar 
        isOpen={state.isSidebarOpen} 
        activeModule={state.activeModule}
        language={state.language}
        currentUser={state.currentUser}
        onModuleChange={(mod) => setState(prev => ({ ...prev, activeModule: mod }))}
        onClose={() => setState(prev => ({ ...prev, isSidebarOpen: false }))}
        onLogout={onLogout}
      />

      <div 
        className={`
          flex-1 flex flex-col min-w-0 z-10 transition-all duration-300 ease-in-out
          ${state.isSidebarOpen ? (isRtl ? 'lg:mr-72' : 'lg:ml-72') : ''}
          ${state.isCopilotOpen ? (isRtl ? 'sm:ml-96' : 'sm:mr-96') : ''}
        `}
      >
        <Header 
          language={state.language}
          theme={state.theme}
          searchQuery={state.searchQuery}
          selectedProjectId={state.selectedProjectId}
          onToggleSidebar={toggleSidebar}
          onToggleCopilot={toggleCopilot}
          onChangeLanguage={changeLanguage}
          onChangeTheme={changeTheme}
          onSearchChange={handleSearchChange}
          onProjectChange={handleProjectChange}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 no-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <AICopilot 
        isOpen={state.isCopilotOpen} 
        onClose={() => setState(prev => ({ ...prev, isCopilotOpen: false }))}
        contextData={{ spi: 0.92, cpi: 1.05, delay: 14, criticalPath: 'Piping Installation' }}
      />
    </div>
  );
};