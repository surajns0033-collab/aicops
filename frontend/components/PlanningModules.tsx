import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps, ActivityItem } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const LookAheadPlanning: React.FC<BaseModuleProps> = ({ language, searchQuery, projectData }) => {
  const [customDays, setCustomDays] = useState<number>(14);

  const filteredActivities = useMemo(() => {
    return projectData.activities.filter(act => {
      const translatedDesc = getTranslation(act.descKey, language).toLowerCase();
      const matchesSearch = translatedDesc.includes(searchQuery.toLowerCase()) || act.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDays = act.daysOut <= customDays;
      return matchesSearch && matchesDays;
    });
  }, [language, searchQuery, customDays, projectData.activities]);

  // Group by WBS
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ActivityItem[]> = {};
    filteredActivities.forEach(act => {
      if (!groups[act.wbsId]) groups[act.wbsId] = [];
      groups[act.wbsId].push(act);
    });
    return groups;
  }, [filteredActivities]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.lookahead', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Generate dynamic look ahead schedules.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 mr-2">
            {[7, 14, 30].map(days => (
              <button 
                key={days} 
                onClick={() => setCustomDays(days)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${customDays === days ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                {days}d
              </button>
            ))}
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center px-2">
              <span className="text-xs text-slate-500 mr-2">{getTranslation('ui.custom_days', language)}:</span>
              <input 
                type="number" 
                value={customDays} 
                onChange={(e) => setCustomDays(Number(e.target.value) || 0)}
                className="w-16 px-2 py-1 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
                min="1"
              />
            </div>
          </div>
          <ExportButtons language={language} moduleName="Look Ahead" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Activities (Next {customDays} Days)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.id', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.desc', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.start', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.finish', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.resources', language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {Object.keys(groupedActivities).length > 0 ? (
                  Object.entries(groupedActivities).map(([wbsId, acts]) => {
                    const wbs = projectData.wbs.find(w => w.id === wbsId);
                    return (
                      <React.Fragment key={wbsId}>
                        <tr className="bg-slate-100/50 dark:bg-slate-800/80">
                          <td colSpan={5} className="px-6 py-2 font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">
                            {wbs ? getTranslation(wbs.nameKey, language) : wbsId}
                          </td>
                        </tr>
                        {acts.map((act, i) => (
                          <tr key={act.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400 pl-8">{act.id}</td>
                            <td className="px-6 py-4 text-slate-900 dark:text-white">{getTranslation(act.descKey, language)}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{act.start}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{act.finish}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{getTranslation(act.resKey, language)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No activities found for the selected duration or search query.</td>
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

export const BaselineManagement: React.FC<BaseModuleProps> = ({ language, searchQuery, projectData }) => {
  const [primaryBL, setPrimaryBL] = useState('current');
  const [compareBL, setCompareBL] = useState('bl1');

  const baselineData = [
    { month: 'Jan', bl1: 10, bl2: 10, current: 12 },
    { month: 'Feb', bl1: 25, bl2: 20, current: 22 },
    { month: 'Mar', bl1: 45, bl2: 35, current: 38 },
    { month: 'Apr', bl1: 65, bl2: 50, current: 55 },
    { month: 'May', bl1: 80, bl2: 65, current: 68 },
  ].map(d => ({ ...d, month: getTranslation(`month.${d.month.toLowerCase()}`, language) }));

  const filteredActivities = useMemo(() => {
    return projectData.activities.filter(act => {
      const translatedDesc = getTranslation(act.descKey, language).toLowerCase();
      return translatedDesc.includes(searchQuery.toLowerCase()) || act.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [language, searchQuery, projectData.activities]);

  const getBLDate = (act: ActivityItem, blType: string, isStart: boolean) => {
    if (blType === 'current') return isStart ? act.start : act.finish;
    if (blType === 'bl1') return isStart ? act.bl1Start : act.bl1Finish;
    if (blType === 'bl2') return isStart ? act.bl2Start : act.bl2Finish;
    return '-';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.baseline', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Compare schedules and analyze variances.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">{getTranslation('ui.primary_baseline', language)}</label>
            <select 
              value={primaryBL} 
              onChange={(e) => setPrimaryBL(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="current">Current Schedule</option>
              <option value="bl1">Baseline 1 (Original)</option>
              <option value="bl2">Baseline 2 (Recovery)</option>
            </select>
          </div>
          <Icons.ArrowRightLeft className="h-4 w-4 text-slate-400 mt-5" />
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">{getTranslation('ui.compare_baseline', language)}</label>
            <select 
              value={compareBL} 
              onChange={(e) => setCompareBL(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="bl1">Baseline 1 (Original)</option>
              <option value="bl2">Baseline 2 (Recovery)</option>
              <option value="current">Current Schedule</option>
            </select>
          </div>
          <div className="ml-2 mt-5">
            <ExportButtons language={language} moduleName="Baseline Management" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Baseline Comparison Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={baselineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey={primaryBL} name="Primary" stroke="#14b8a6" strokeWidth={3} />
                <Line type="monotone" dataKey={compareBL} name="Comparison" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Variance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.id', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.wbs', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.desc', language)}</th>
                  <th className="px-6 py-4 font-medium">Primary Start</th>
                  <th className="px-6 py-4 font-medium">Compare Start</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.variance', language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredActivities.map((act, i) => {
                  const pStart = getBLDate(act, primaryBL, true);
                  const cStart = getBLDate(act, compareBL, true);
                  const variance = pStart !== cStart ? (i % 2 === 0 ? '+2 Days' : '-1 Day') : '0 Days';
                  const isDelayed = variance.includes('+');
                  const wbs = projectData.wbs.find(w => w.id === act.wbsId);
                  
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400">{act.id}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{wbs ? getTranslation(wbs.nameKey, language) : act.wbsId}</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-white">{getTranslation(act.descKey, language)}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{pStart}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{cStart}</td>
                      <td className={`px-6 py-4 font-bold ${isDelayed ? 'text-red-500' : variance === '0 Days' ? 'text-slate-500' : 'text-emerald-500'}`}>
                        {variance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};