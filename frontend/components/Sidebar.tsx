import React from 'react';
import * as Icons from 'lucide-react';
import { MODULES, getTranslation } from '../constants';
import { Language, User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  activeModule: string;
  language: Language;
  currentUser: User | null;
  onModuleChange: (moduleId: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeModule, language, currentUser, onModuleChange, onClose, onLogout }) => {
  const isRtl = language === 'ar';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 h-screen w-72 
          glass border-r border-slate-200/20 dark:border-slate-700/50
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3 text-brand-500">
            <Icons.Hexagon className="h-8 w-8 fill-brand-500/20" />
            <span className="text-xl font-bold tracking-wider text-slate-900 dark:text-white">
              AIPCOS <span className="text-brand-500 text-sm align-top">PRO</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden ms-auto text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
          {MODULES.map((module) => {
            const Icon = (Icons as any)[module.icon];
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => {
                  onModuleChange(module.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-brand-500' : ''}`} />
                <span className="text-sm text-start flex-1">{getTranslation(`nav.${module.id}`, language) || module.label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile / Bottom Area */}
        <div className="p-4 border-t border-slate-200/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 mb-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
              {currentUser?.avatar || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser?.role || 'Role'}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Icons.LogOut className="h-4 w-4" />
            {getTranslation('ui.logout', language)}
          </button>
        </div>
      </aside>
    </>
  );
};