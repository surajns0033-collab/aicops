import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps, ProjectData, ActivityItem } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import { FileUpload } from './FileUpload';
import * as Icons from 'lucide-react';

interface ScheduleAnalyticsProps extends BaseModuleProps {
  onUploadSuccess: (data: ProjectData) => void;
}

export const ScheduleAnalytics: React.FC<ScheduleAnalyticsProps> = ({ language, searchQuery, projectData, onUploadSuccess }) => {
  
  const filteredActivities = useMemo(() => {
    return projectData.activities.filter(act => {
      const translatedDesc = getTranslation(act.descKey, language).toLowerCase();
      const search = searchQuery.toLowerCase();
      return translatedDesc.includes(search) || act.id.toLowerCase().includes(search);
    });
  }, [language, searchQuery, projectData.activities]);

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.schedule', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Parse XER/XML files locally and explore WBS/Activities.</p>
        </div>
        <ExportButtons language={language} moduleName="Schedule Analytics" />
      </div>

      <FileUpload onUploadSuccess={onUploadSuccess} />

      <Card>
        <CardHeader>
          <CardTitle>Work Breakdown Structure (WBS) & Activities</CardTitle>
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
                  <th className="px-6 py-4 font-medium">{getTranslation('table.progress', language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {Object.keys(groupedActivities).length > 0 ? (
                  Object.entries(groupedActivities).map(([wbsId, acts]) => {
                    const wbs = projectData.wbs.find(w => w.id === wbsId);
                    return (
                      <React.Fragment key={wbsId}>
                        <tr className="bg-slate-100/50 dark:bg-slate-800/80">
                          <td colSpan={5} className="px-6 py-2 font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider flex items-center gap-2">
                            <Icons.FolderTree className="h-4 w-4 text-brand-500" />
                            {wbs ? getTranslation(wbs.nameKey, language) : wbsId}
                          </td>
                        </tr>
                        {acts.map((act) => (
                          <tr key={act.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400 pl-10">{act.id}</td>
                            <td className="px-6 py-4 text-slate-900 dark:text-white">{getTranslation(act.descKey, language)}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{act.start}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{act.finish}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 max-w-[100px]">
                                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${act.progress}%` }}></div>
                                </div>
                                <span className="text-xs text-slate-500">{act.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No activities found matching your search.</td>
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