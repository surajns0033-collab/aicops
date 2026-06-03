import React from 'react';
import * as Icons from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, ComposedChart, Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';

export const Dashboard: React.FC<BaseModuleProps> = ({ language, projectData }) => {
  const isRtl = language === 'ar';

  const translatedSCurve = projectData.sCurve.map(d => ({
    ...d,
    name: getTranslation(`month.${d.name}`, language)
  }));

  const translatedCombined = projectData.combinedData.map(d => ({
    ...d,
    period: getTranslation(`month.${d.period}`, language)
  }));

  const translatedBurn = projectData.burnData.map(d => ({
    ...d,
    period: getTranslation(`month.${d.period}`, language)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-slate-200/20 dark:border-slate-700/50 shadow-xl backdrop-blur-xl z-50">
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.dashboard', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time project intelligence and AI forecasting.</p>
        </div>
        <ExportButtons language={language} moduleName="Dashboard" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectData.kpis.map((kpi) => {
          const Icon = (Icons as any)[kpi.icon];
          const isPositive = kpi.trend > 0;
          const statusColors = {
            healthy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
            warning: 'text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
            critical: 'text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
          };

          return (
            <Card key={kpi.id} className="relative overflow-hidden group">
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${
                kpi.status === 'healthy' ? 'bg-emerald-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg border ${statusColors[kpi.status]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isPositive ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {isPositive ? <Icons.ArrowUpRight className="h-3 w-3" /> : <Icons.ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(kpi.trend)}%
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{getTranslation(kpi.title, language)}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{kpi.value}</span>
                    {kpi.unit && <span className="text-slate-500 font-medium">{kpi.unit}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{getTranslation('chart.scurve', language)}</CardTitle>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div> {getTranslation('chart.planned', language)}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div> {getTranslation('chart.actual', language)}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full bg-amber-500 border border-dashed border-amber-500"></div> {getTranslation('chart.forecast', language)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={translatedSCurve} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="planned" name={getTranslation('chart.planned', language)} stroke="#94a3b8" fill="rgba(148, 163, 184, 0.05)" strokeWidth={2} />
                  <Area type="monotone" dataKey="actual" name={getTranslation('chart.actual', language)} stroke="#14b8a6" fill="url(#colorActual)" strokeWidth={3} filter="url(#glow)" />
                  <Line type="monotone" dataKey="forecast" name={getTranslation('chart.forecast', language)} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-900/5 to-brand-500/10 border-brand-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full"></div>
          <CardHeader className="pb-2 border-b border-brand-500/10">
            <CardTitle className="flex items-center gap-2 text-brand-700 dark:text-brand-400">
              <Icons.BrainCircuit className="h-5 w-5" />
              {getTranslation('ui.data_story', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4 relative z-10">
            <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-700/50 shadow-sm backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Icons.Activity className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Performance Narrative</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    The project is currently tracking at an SPI of {projectData.kpis[0].value} and CPI of {projectData.kpis[1].value}. 
                    While cost is well-managed, schedule slippage requires immediate attention on critical path activities.
                  </p>
                </div>
              </div>
            </div>
            
            {projectData.delays.length > 0 && (
              <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-700/50 shadow-sm backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <Icons.AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Delay Risk Detected</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {getTranslation(projectData.delays[0].descriptionKey, language)} is causing a {projectData.delays[0].days}-day impact.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button className="w-full py-2 mt-2 text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
              <Icons.Wand2 className="h-4 w-4" />
              {getTranslation('ui.generate', language)}
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Burn-up and Burn-down Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation('chart.burnup', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={translatedBurn} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis dataKey="period" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="step" dataKey="plannedScope" name={getTranslation('chart.scope', language)} stroke="#94a3b8" fill="rgba(148, 163, 184, 0.1)" strokeWidth={2} />
                  <Line type="monotone" dataKey="actualCompleted" name={getTranslation('chart.completed', language)} stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} filter="url(#glow)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getTranslation('chart.burndown', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={translatedBurn} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis dataKey="period" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="idealRemaining" name={getTranslation('chart.ideal_rem', language)} stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="actualRemaining" name={getTranslation('chart.actual_rem', language)} stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} filter="url(#glow)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
