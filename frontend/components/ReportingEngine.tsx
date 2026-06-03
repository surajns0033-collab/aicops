import React from 'react';
import { Card, CardContent } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';

export const ReportingEngine: React.FC<BaseModuleProps> = ({ language }) => {
  const reports = [
    { title: 'Daily Progress Report', desc: 'Site activities, manpower, and equipment logs.', icon: 'Calendar', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Weekly Executive Summary', desc: 'High-level KPIs, SPI/CPI, and critical issues.', icon: 'Briefcase', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { title: 'Monthly Project Controls', desc: 'Comprehensive schedule, cost, and risk analysis.', icon: 'PieChart', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-900/20' },
    { title: 'Power BI Dataset Export', desc: 'Structured fact and dimension tables for BI.', icon: 'Database', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'HSE & Quality Report', desc: 'Safety statistics, NCRs, and inspection logs.', icon: 'ShieldCheck', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { title: 'Delay & Claims Narrative', desc: 'AI-generated EOT drafts and delay logs.', icon: 'FileText', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.reports', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Generate automated reports and exports locally.</p>
        </div>
        <div className="flex items-center gap-3 bg-brand-50 dark:bg-brand-900/10 p-2 rounded-xl border border-brand-200 dark:border-brand-800/50">
          <span className="text-sm font-semibold text-brand-700 dark:text-brand-400 px-2">Overall Project Export:</span>
          <ExportButtons language={language} moduleName="Entire Project" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => {
          const Icon = (Icons as any)[report.icon];
          return (
            <Card key={i} className="group hover:border-brand-500/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${report.bg} ${report.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {report.desc}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                    <Icons.FileText className="h-3.5 w-3.5" /> PDF
                  </button>
                  <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                    <Icons.Table className="h-3.5 w-3.5" /> Excel
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};