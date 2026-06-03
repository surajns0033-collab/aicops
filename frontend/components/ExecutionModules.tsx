import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const EngineeringManagement: React.FC<BaseModuleProps> = ({ language }) => {
  const mdrData = [
    { discipline: 'Process', planned: 100, actual: 95 },
    { discipline: 'Mechanical', planned: 150, actual: 120 },
    { discipline: 'Piping', planned: 300, actual: 210 },
    { discipline: 'Electrical', planned: 120, actual: 90 },
    { discipline: 'Instrumentation', planned: 180, actual: 110 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.engineering', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Master Document Register (MDR) and IFC Status.</p>
        </div>
        <ExportButtons language={language} moduleName="Engineering" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Engineering Progress by Discipline (Drawings)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mdrData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(156, 163, 175, 0.2)" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="discipline" type="category" stroke="#9ca3af" />
                <Tooltip cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
                <Legend />
                <Bar dataKey="planned" name="Planned (IFC)" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                <Bar dataKey="actual" name="Actual (IFC)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ConstructionManagement: React.FC<BaseModuleProps> = ({ language, projectData }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.construction', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Physical progress tracking by area and discipline.</p>
        </div>
        <ExportButtons language={language} moduleName="Construction" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectData.constructionAreas.map((area, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">{getTranslation(area.areaKey, language)}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${area.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {area.status}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">{getTranslation('table.progress', language)}</span>
                <span className="font-bold text-slate-900 dark:text-white">{area.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full ${area.status === 'Delayed' ? 'bg-red-500' : 'bg-brand-500'}`} style={{ width: `${area.progress}%` }}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const CommissioningManagement: React.FC<BaseModuleProps> = ({ language }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.commissioning', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Mechanical Completion and Startup Tracking.</p>
        </div>
        <ExportButtons language={language} moduleName="Commissioning" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subsystem Completion Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {[
              { sys: 'SS-101: Instrument Air', mc: '100%', precom: '100%', com: '80%' },
              { sys: 'SS-205: Fuel Gas', mc: '100%', precom: '60%', com: '0%' },
              { sys: 'SS-310: Fire Water', mc: '85%', precom: '20%', com: '0%' },
            ].map((sys, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="font-medium text-slate-900 dark:text-white">{sys.sys}</div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center"><div className="text-slate-500 text-xs">MC</div><div className="font-bold text-emerald-500">{sys.mc}</div></div>
                  <div className="text-center"><div className="text-slate-500 text-xs">Pre-Com</div><div className="font-bold text-amber-500">{sys.precom}</div></div>
                  <div className="text-center"><div className="text-slate-500 text-xs">Com</div><div className="font-bold text-slate-700 dark:text-slate-300">{sys.com}</div></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};