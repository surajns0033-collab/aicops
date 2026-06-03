import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export const RiskManagement: React.FC<BaseModuleProps> = ({ language, searchQuery, projectData }) => {
  
  const filteredRisks = useMemo(() => {
    return projectData.risks.filter(risk => {
      const translatedDesc = getTranslation(risk.descriptionKey, language).toLowerCase();
      const translatedOwner = getTranslation(risk.ownerKey, language).toLowerCase();
      const search = searchQuery.toLowerCase();
      return translatedDesc.includes(search) || translatedOwner.includes(search) || risk.id.toLowerCase().includes(search);
    });
  }, [language, searchQuery, projectData.risks]);

  const translatedTornado = projectData.tornadoData.map(d => ({
    ...d,
    name: getTranslation(d.nameKey, language)
  }));

  const renderHeatmap = () => {
    const grid = [];
    for (let impact = 5; impact >= 1; impact--) {
      for (let prob = 1; prob <= 5; prob++) {
        const score = impact * prob;
        let colorClass = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-400';
        if (score >= 15) colorClass = 'bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
        else if (score >= 8) colorClass = 'bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]';

        const count = filteredRisks.filter(r => r.impact === impact && r.probability === prob).length;

        grid.push(
          <div key={`${impact}-${prob}`} className={`aspect-square border rounded-md flex items-center justify-center ${colorClass} transition-all hover:scale-105 cursor-pointer`}>
            {count > 0 ? <span className="font-bold text-lg">{count}</span> : <span className="opacity-30 text-xs">{score}</span>}
          </div>
        );
      }
    }
    return grid;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-slate-200/20 dark:border-slate-700/50 shadow-xl backdrop-blur-xl z-50 max-w-xs">
          <p className="font-semibold text-slate-900 dark:text-white mb-2 text-xs">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 dark:text-slate-300">{entry.name}:</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{Math.abs(entry.value)} Days</span>
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.risk', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Risk Register, Heatmap, and Sensitivity Analysis.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
            <Icons.Plus className="h-4 w-4" /> {getTranslation('ui.add', language)}
          </button>
          <ExportButtons language={language} moduleName="Risk Management" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-6 pl-6">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-slate-500 tracking-widest uppercase">Impact</div>
              <div className="grid grid-cols-5 gap-1">
                {renderHeatmap()}
              </div>
              <div className="text-center text-xs font-medium text-slate-500 tracking-widest uppercase mt-4">Probability</div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{getTranslation('chart.tornado', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={translatedTornado} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                  <XAxis type="number" stroke="#9ca3af" tickFormatter={(val) => Math.abs(val).toString()} />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" width={150} tick={{fontSize: 10}} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.05)' }} />
                  <Legend />
                  <ReferenceLine x={0} stroke="#9ca3af" />
                  <Bar dataKey="negativeImpact" name={getTranslation('chart.neg_impact', language)} fill="#10b981" radius={[4, 0, 0, 4]} barSize={20} />
                  <Bar dataKey="positiveImpact" name={getTranslation('chart.pos_impact', language)} fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Risks Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredRisks.length > 0 ? filteredRisks.map((risk) => (
              <div key={risk.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded">{risk.id}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${risk.status === 'Open' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                      {getTranslation(`status.${risk.status.toLowerCase()}`, language)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">Owner: {getTranslation(risk.ownerKey, language)}</div>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">{getTranslation(risk.descriptionKey, language)}</p>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Icons.Target className="h-3.5 w-3.5" /> Impact: {risk.impact}/5
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Icons.Dices className="h-3.5 w-3.5" /> Probability: {risk.probability}/5
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    Score: {risk.impact * risk.probability}
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-slate-500">No risks found matching your search.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};