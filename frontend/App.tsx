import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ScheduleAnalytics } from './components/ScheduleAnalytics';
import { CostControl } from './components/CostControl';
import { ResourceManagement } from './components/ResourceManagement';
import { Procurement } from './components/Procurement';
import { RiskManagement } from './components/RiskManagement';
import { DelayAnalysis } from './components/DelayAnalysis';
import { ReportingEngine } from './components/ReportingEngine';
import { Settings } from './components/Settings';
import { LookAheadPlanning, BaselineManagement } from './components/PlanningModules';
import { EngineeringManagement, ConstructionManagement, CommissioningManagement } from './components/ExecutionModules';
import { QualityManagement, HSEManagement, ContractManagement, DocumentControl, MeetingManagement } from './components/ManagementModules';
import { AppState, ProjectData, User } from './types';
import { Card, CardContent } from './components/ui/Card';
import { getTranslation, PROJECT_DATABASE } from './constants';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('aipcos_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Migrate old wallpaper string to new object format if necessary
        let wallpaper = parsed.settings?.wallpaper;
        if (typeof wallpaper === 'string') {
          wallpaper = { type: 'preset', value: wallpaper };
        } else if (!wallpaper) {
          wallpaper = { type: 'preset', value: 'default' };
        }

        return { 
          ...parsed, 
          searchQuery: '',
          selectedProjectId: parsed.selectedProjectId || 'p1',
          uploadedData: null, // Reset uploaded data on hard refresh for demo purposes
          settings: parsed.settings ? { ...parsed.settings, wallpaper } : { offlineMode: true, notifications: true, autoSync: false, wallpaper: { type: 'preset', value: 'default' } }
        };
      } catch (e) {
        console.error("Failed to parse saved state");
      }
    }
    return {
      language: 'en',
      theme: 'dark',
      activeModule: 'dashboard',
      isSidebarOpen: true,
      isCopilotOpen: false,
      searchQuery: '',
      selectedProjectId: 'p1',
      uploadedData: null,
      currentUser: null,
      settings: { offlineMode: true, notifications: true, autoSync: false, wallpaper: { type: 'preset', value: 'default' } }
    };
  });

  useEffect(() => {
    const stateToSave = { ...state, searchQuery: '', uploadedData: null };
    localStorage.setItem('aipcos_state', JSON.stringify(stateToSave));
  }, [state]);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = state.language;
  }, [state.theme, state.language]);

  const handleLogin = (user: User) => {
    setState(prev => ({ ...prev, currentUser: user }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null, activeModule: 'dashboard' }));
  };

  // Determine which data to show: Uploaded file data OR Selected Project data
  const currentProjectData: ProjectData = state.uploadedData || PROJECT_DATABASE[state.selectedProjectId] || PROJECT_DATABASE['p1'];

  const handleFileUploadSuccess = (mockParsedData: ProjectData) => {
    setState(prev => ({
      ...prev,
      uploadedData: mockParsedData,
      activeModule: 'dashboard' // Redirect to dashboard to see new data
    }));
  };

  if (!state.currentUser) {
    return <Login language={state.language} onLogin={handleLogin} />;
  }

  const renderModule = () => {
    const props = { 
      language: state.language, 
      searchQuery: state.searchQuery,
      projectData: currentProjectData 
    };
    
    switch (state.activeModule) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'schedule': return <ScheduleAnalytics {...props} onUploadSuccess={handleFileUploadSuccess} />;
      case 'lookahead': return <LookAheadPlanning {...props} />;
      case 'baseline': return <BaselineManagement {...props} />;
      case 'cost': return <CostControl {...props} />;
      case 'resources': return <ResourceManagement {...props} />;
      case 'procurement': return <Procurement {...props} />;
      case 'engineering': return <EngineeringManagement {...props} />;
      case 'construction': return <ConstructionManagement {...props} />;
      case 'quality': return <QualityManagement {...props} />;
      case 'hse': return <HSEManagement {...props} />;
      case 'risk': return <RiskManagement {...props} />;
      case 'delay': return <DelayAnalysis {...props} />;
      case 'contracts': return <ContractManagement {...props} />;
      case 'commissioning': return <CommissioningManagement {...props} />;
      case 'documents': return <DocumentControl {...props} />;
      case 'meetings': return <MeetingManagement {...props} />;
      case 'reports': return <ReportingEngine {...props} />;
      case 'settings': return <Settings state={state} setState={setState} />;
      default:
        return (
          <div className="flex items-center justify-center h-[60vh] animate-in fade-in duration-500">
            <Card className="max-w-md text-center p-8">
              <CardContent>
                <Icons.Wrench className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Module Under Construction</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  The {state.activeModule} module is being loaded.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout state={state} setState={setState} onLogout={handleLogout}>
      {state.uploadedData && (
        <div className="mb-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-sm font-medium">
            <Icons.FileCheck className="h-4 w-4" />
            Viewing data from uploaded file.
          </div>
          <button 
            onClick={() => setState(prev => ({ ...prev, uploadedData: null }))}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
          >
            Clear Upload & Return to Project
          </button>
        </div>
      )}
      {renderModule()}
    </Layout>
  );
};

export default App;