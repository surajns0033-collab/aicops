import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Language, Theme, Project } from '../types';
import { Button } from './ui/Button';
import { getTranslation, MOCK_PROJECTS, MOCK_NOTIFICATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  theme: Theme;
  searchQuery: string;
  selectedProjectId: string;
  onToggleSidebar: () => void;
  onToggleCopilot: () => void;
  onChangeLanguage: (lang: Language) => void;
  onChangeTheme: (theme: Theme) => void;
  onSearchChange: (query: string) => void;
  onProjectChange: (projectId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  searchQuery,
  selectedProjectId,
  onToggleSidebar,
  onToggleCopilot,
  onChangeLanguage,
  onChangeTheme,
  onSearchChange,
  onProjectChange
}) => {
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  const selectedProject = MOCK_PROJECTS.find(p => p.id === selectedProjectId) || MOCK_PROJECTS[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target as Node)) {
        setIsProjectMenuOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 glass border-b border-slate-200/20 dark:border-slate-700/50 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
          <Icons.Menu className="h-5 w-5" />
        </Button>
        
        {/* Functional Project Selector */}
        <div className="relative hidden md:block" ref={projectDropdownRef}>
          <div 
            onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
            className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <Icons.Briefcase className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-medium truncate max-w-[200px]">{selectedProject.name}</span>
            <Icons.ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isProjectMenuOpen ? 'rotate-180' : ''}`} />
          </div>

          {isProjectMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">Select Project</div>
                {MOCK_PROJECTS.map(project => (
                  <button
                    key={project.id}
                    onClick={() => {
                      onProjectChange(project.id);
                      setIsProjectMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                      selectedProjectId === project.id 
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="truncate">{project.name}</span>
                      <span className="text-[10px] text-slate-500">{project.type}</span>
                    </div>
                    {selectedProjectId === project.id && <Icons.Check className="h-4 w-4 text-brand-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search */}
        <div className="hidden lg:flex items-center relative">
          <Icons.Search className="h-4 w-4 absolute left-3 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={getTranslation('ui.search', language)} 
            className="pl-9 pr-4 py-1.5 text-sm bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 w-64 transition-all"
          />
        </div>

        {/* Language Switcher */}
        <div className="flex bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-1">
          {(['en', 'ar', 'ml'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onChangeLanguage(lang)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === lang 
                  ? 'bg-white dark:bg-slate-600 shadow-sm text-brand-600 dark:text-brand-400' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onChangeTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Icons.Sun className="h-5 w-5" /> : <Icons.Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <div className="relative" ref={notifDropdownRef}>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <Icons.Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>}
          </Button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!notif.read ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`mt-0.5 shrink-0 ${notif.type === 'critical' ? 'text-red-500' : notif.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
                        {notif.type === 'critical' ? <Icons.AlertTriangle className="h-4 w-4" /> : notif.type === 'warning' ? <Icons.AlertCircle className="h-4 w-4" /> : <Icons.Info className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {getTranslation(notif.titleKey, language)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {getTranslation(notif.messageKey, language)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Copilot Toggle */}
        <Button 
          variant="primary" 
          size="sm" 
          className="gap-2 hidden sm:flex bg-gradient-to-r from-brand-600 to-brand-400 border-none"
          onClick={onToggleCopilot}
        >
          <Icons.Sparkles className="h-4 w-4" />
          <span>AI Copilot</span>
        </Button>
        <Button 
          variant="primary" 
          size="icon" 
          className="sm:hidden bg-gradient-to-r from-brand-600 to-brand-400 border-none"
          onClick={onToggleCopilot}
        >
          <Icons.Sparkles className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};