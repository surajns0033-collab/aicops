import React from 'react';
import { 
  BarChart, Bar, ComposedChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';

export const ResourceManagement: React.FC<BaseModuleProps> = ({ language, projectData }) => {
  const translatedCombined = projectData.combinedData.map(d => ({
    ...d,
    period: getTranslation(`month.${d.period}`, language)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-slate-200/20 dark:border-slate-700/50 shadow-xl backdrop-blur-xl">
          <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }} />
              <span className="text-slate-600 dark:text-slate-300">{entry.name}:</span>
              <span className="font-medium text-slate-900 dark:text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.resources', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manpower histograms, cumulative S-curves, and equipment utilization.</p>
        </div>
        <ExportButtons language={language} moduleName="Resource Management" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Periodic Resource Loading (Histogram)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={translatedCombined} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis dataKey="period" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.05)' }} />
                  <Legend />
                  <Bar dataKey="plannedInc" name={getTranslation('chart.plannedInc', language)} fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actualInc" name={getTranslation('chart.actualInc', language)} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumulative Resource Progress (S-Curve)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={translatedCombined} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis dataKey="period" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="plannedCum" name={getTranslation('chart.plannedCum', language)} stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="actualCum" name={getTranslation('chart.actualCum', language)} stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Combined Resource Loading & Cumulative S-Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={translatedCombined} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="barPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="barActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                  <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis yAxisId="left" orientation="left" stroke="#9ca3af" label={{ value: getTranslation('chart.periodic', language), angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" label={{ value: getTranslation('chart.cumulative', language), angle: 90, position: 'insideRight', fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.05)' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="plannedInc" name={getTranslation('chart.plannedInc', language)} fill="url(#barPlanned)" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar yAxisId="left" dataKey="actualInc" name={getTranslation('chart.actualInc', language)} fill="url(#barActual)" radius={[4, 4, 0, 0]} barSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="plannedCum" name={getTranslation('chart.plannedCum', language)} stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                <Line yAxisId="right" type="monotone" dataKey="actualCum" name={getTranslation('chart.actualCum', language)} stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} filter="url(#glowLine)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};