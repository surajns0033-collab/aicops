import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';

export const Procurement: React.FC<BaseModuleProps> = ({ language, searchQuery }) => {
  const items = [
    { po: 'PO-2023-001', itemKey: 'proc.item.1', vendor: 'Siemens', status: 'status.active', delivery: '15-Oct-2024', health: 'warning' },
    { po: 'PO-2023-045', itemKey: 'proc.item.2', vendor: 'ArcelorMittal', status: 'status.active', delivery: '01-Sep-2024', health: 'healthy' },
    { po: 'PO-2023-089', itemKey: 'proc.item.3', vendor: 'Emerson', status: 'status.active', delivery: '20-Nov-2024', health: 'critical' },
    { po: 'PO-2023-102', itemKey: 'proc.item.4', vendor: 'Prysmian', status: 'status.closed', delivery: '10-Aug-2024', health: 'healthy' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const translatedItem = getTranslation(item.itemKey, language).toLowerCase();
      const search = searchQuery.toLowerCase();
      return translatedItem.includes(search) || item.po.toLowerCase().includes(search) || item.vendor.toLowerCase().includes(search);
    });
  }, [language, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.procurement', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Long lead items and material status.</p>
        </div>
        <ExportButtons language={language} moduleName="Procurement" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.po', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.desc', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.vendor', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.status', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.delivery', language)}</th>
                  <th className="px-6 py-4 font-medium">{getTranslation('table.health', language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredItems.length > 0 ? filteredItems.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400">{item.po}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white">{getTranslation(item.itemKey, language)}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.vendor}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {getTranslation(item.status, language)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.delivery}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          item.health === 'healthy' ? 'bg-emerald-500' : item.health === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></div>
                        <span className="capitalize text-slate-600 dark:text-slate-300">{getTranslation(`status.${item.health}`, language)}</span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No procurement items found matching your search.</td>
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