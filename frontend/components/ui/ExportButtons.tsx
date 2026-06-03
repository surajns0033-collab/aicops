import React from 'react';
import * as Icons from 'lucide-react';
import { getTranslation } from '../../constants';
import { Language } from '../../types';

interface ExportButtonsProps {
  language: Language;
  moduleName: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ language, moduleName }) => {
  const handleExport = (type: string) => {
    alert(`Generating ${type} report for ${moduleName}... (Simulation)`);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleExport('Excel')}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <Icons.Table className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="hidden sm:inline">{getTranslation('ui.export_excel', language)}</span>
      </button>
      <button 
        onClick={() => handleExport('Power BI')}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
      >
        <Icons.BarChart2 className="h-4 w-4" />
        <span className="hidden sm:inline">{getTranslation('ui.export_powerbi', language)}</span>
      </button>
    </div>
  );
};