import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';

export const DelayAnalysis: React.FC<BaseModuleProps> = ({ language, searchQuery, projectData }) => {
  
  const filteredDelays = useMemo(() => {
    return projectData.delays.filter(delay => {
      const translatedDesc = getTranslation(delay.descriptionKey, language).toLowerCase();
      const search = searchQuery.toLowerCase();
      return translatedDesc.includes(search) || delay.id.toLowerCase().includes(search);
    });
  }, [language, searchQuery, projectData.delays]);

  const totalDelay = projectData.delays.reduce((acc, curr) => acc + curr.days, 0);
  const excusableDelay = projectData.delays.filter(d => d.type === 'Excusable').reduce((acc, curr) => acc + curr.days, 0);
  const nonExcusableDelay = projectData.delays.filter(d => d.type === 'Non-Excusable').reduce((acc, curr) => acc + curr.days, 0);
  const approvedDelay = projectData.delays.filter(d => d.status === 'Approved').reduce((acc, curr) => acc + curr.days, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.delay', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Time Impact Analysis and EOT generation.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-brand-600 to-brand-400 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium shadow-[0_0_15px_rgba(20,184,166,0.3)]">
            <Icons.Sparkles className="h-4 w-4" /> AI Generate EOT Draft
          </button>
          <ExportButtons language={language} moduleName="Delay Analysis" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Delay Days</p>
            <p className="text-3xl font-bold text-red-700 dark:text-red-500 mt-1">{totalDelay}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Excusable Delays</p>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-500 mt-1">{excusableDelay}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-800/50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Non-Excusable</p>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-300 mt-1">{nonExcusableDelay}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Approved EOT</p>
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mt-1">{approvedDelay}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delay Event Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.id', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.desc', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.impact', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.type', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.status', language)}</th>
                  <th className="px-6 py-4 font-medium text-right">{getTranslation('table.action', language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredDelays.length > 0 ? filteredDelays.map((delay) => (
                  <tr key={delay.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{delay.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{getTranslation(delay.descriptionKey, language)}</td>
                    <td className="px-6 py-4 font-bold text-red-500">{delay.days}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        delay.type === 'Excusable' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {getTranslation(`status.${delay.type.toLowerCase().replace('-', '')}`, language)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        delay.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {getTranslation(`status.${delay.status.toLowerCase().replace(' ', '')}`, language)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium text-xs">
                        View Narrative
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No delays found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};