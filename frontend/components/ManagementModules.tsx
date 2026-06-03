import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation } from '../constants';
import { BaseModuleProps } from '../types';
import { ExportButtons } from './ui/ExportButtons';
import * as Icons from 'lucide-react';

export const QualityManagement: React.FC<BaseModuleProps> = ({ language }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.quality', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">NCRs, RFIs, and Punch Lists.</p>
        </div>
        <ExportButtons language={language} moduleName="Quality" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Open NCRs</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-500 mt-1">12</p>
            </div>
            <Icons.AlertOctagon className="h-8 w-8 text-red-500/50" />
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Pending RFIs</p>
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-500 mt-1">45</p>
            </div>
            <Icons.HelpCircle className="h-8 w-8 text-amber-500/50" />
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Punch Items</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-500 mt-1">128</p>
            </div>
            <Icons.ListChecks className="h-8 w-8 text-blue-500/50" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const HSEManagement: React.FC<BaseModuleProps> = ({ language }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.hse', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Safety Statistics and Incident Tracking.</p>
        </div>
        <ExportButtons language={language} moduleName="HSE" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Safe Man-hours', val: '1.2M', icon: 'Clock', color: 'text-emerald-500' },
          { title: 'LTIFR', val: '0.00', icon: 'Activity', color: 'text-emerald-500' },
          { title: 'Near Misses', val: '14', icon: 'Eye', color: 'text-amber-500' },
          { title: 'Incidents', val: '0', icon: 'ShieldAlert', color: 'text-emerald-500' },
        ].map((stat, i) => {
          const Icon = (Icons as any)[stat.icon];
          return (
            <Card key={i}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export const GenericListModule: React.FC<BaseModuleProps & { titleKey: string, desc: string, items: any[] }> = ({ language, titleKey, desc, items }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation(titleKey, language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{desc}</p>
        </div>
        <ExportButtons language={language} moduleName={getTranslation(titleKey, language)} />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {items.map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ContractManagement: React.FC<BaseModuleProps> = (props) => (
  <GenericListModule {...props} titleKey="nav.contracts" desc="Variations, Claims, and Invoices." items={[
    { title: 'Variation Order 001: Additional Piping', sub: 'Submitted: 12-Oct-2024 | Value: $150k', status: 'Under Review' },
    { title: 'Invoice #45 (September Progress)', sub: 'Submitted: 05-Oct-2024 | Value: $2.1M', status: 'Approved' },
  ]} />
);

export const DocumentControl: React.FC<BaseModuleProps> = (props) => (
  <GenericListModule {...props} titleKey="nav.documents" desc="Transmittals and Approval Workflows." items={[
    { title: 'TR-STR-0045: Topside Structural Drawings', sub: 'Sent to Client: 14-Oct-2024', status: 'Pending Approval' },
    { title: 'TR-PIP-0089: Piping Isometrics Area B', sub: 'Received from Eng: 15-Oct-2024', status: 'Code 1 (Approved)' },
  ]} />
);

export const MeetingManagement: React.FC<BaseModuleProps> = (props) => (
  <GenericListModule {...props} titleKey="nav.meetings" desc="MOMs and Action Registers." items={[
    { title: 'Weekly Progress Meeting #24', sub: 'Date: 15-Oct-2024 | 5 Open Actions', status: 'Minutes Published' },
    { title: 'Executive Steering Committee', sub: 'Date: 01-Oct-2024 | 2 Open Actions', status: 'Minutes Published' },
  ]} />
);