import { KPI, ChartDataPoint, CombinedChartDataPoint, EVMDataPoint, RiskItem, DelayEvent, ActivityItem, Dictionary, Project, ProjectData, AppNotification, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin', password: 'password123', name: 'John Doe', role: 'Project Director', avatar: 'JD' },
  { id: 'u2', username: 'planner', password: 'password123', name: 'Jane Smith', role: 'Planning Manager', avatar: 'JS' },
  { id: 'guest', username: 'guest', name: 'Guest User', role: 'Viewer', avatar: 'GU' }
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Offshore Platform Alpha', type: 'EPC' },
  { id: 'p2', name: 'Refinery Turnaround 2024', type: 'Turnaround' },
  { id: 'p3', name: 'LNG Terminal Expansion', type: 'EPC' },
  { id: 'p4', name: 'Data Center Phase 2', type: 'Technology' }
];

export const WALLPAPERS = [
  { id: 'default', nameKey: 'wp.default', class: 'bg-slate-50 dark:bg-dark-bg' },
  { id: 'blueprint', nameKey: 'wp.blueprint', class: 'bg-blue-50/50 dark:bg-slate-900 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:20px_20px]' },
  { id: 'dots', nameKey: 'wp.dots', class: 'bg-slate-50 dark:bg-slate-900 bg-[radial-gradient(rgba(148,163,184,0.3)_1px,transparent_1px)] bg-[size:20px_20px]' },
  { id: 'grid', nameKey: 'wp.grid', class: 'bg-slate-50 dark:bg-slate-900 bg-[linear-gradient(rgba(148,163,184,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(148,163,184,0.1)_2px,transparent_2px)] bg-[size:40px_40px]' }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', titleKey: 'notif.1.title', messageKey: 'notif.1.msg', time: '10 mins ago', read: false, type: 'critical' },
  { id: 'n2', titleKey: 'notif.2.title', messageKey: 'notif.2.msg', time: '1 hour ago', read: false, type: 'warning' },
  { id: 'n3', titleKey: 'notif.3.title', messageKey: 'notif.3.msg', time: '2 hours ago', read: true, type: 'info' },
];

export const MODULES = [
  { id: 'dashboard', icon: 'LayoutDashboard', label: 'Command Center' },
  { id: 'schedule', icon: 'CalendarDays', label: 'Schedule Analytics' },
  { id: 'lookahead', icon: 'CalendarRange', label: 'Look Ahead Planning' },
  { id: 'baseline', icon: 'GitMerge', label: 'Baseline Management' },
  { id: 'cost', icon: 'CircleDollarSign', label: 'Cost Control' },
  { id: 'resources', icon: 'Users', label: 'Resource Management' },
  { id: 'procurement', icon: 'ShoppingCart', label: 'Procurement' },
  { id: 'engineering', icon: 'PenTool', label: 'Engineering' },
  { id: 'construction', icon: 'HardHat', label: 'Construction' },
  { id: 'quality', icon: 'CheckCircle', label: 'Quality (QA/QC)' },
  { id: 'hse', icon: 'ShieldPlus', label: 'HSE Management' },
  { id: 'risk', icon: 'ShieldAlert', label: 'Risk Management' },
  { id: 'delay', icon: 'Clock', label: 'Delay Analysis' },
  { id: 'contracts', icon: 'FileSignature', label: 'Contracts' },
  { id: 'commissioning', icon: 'Power', label: 'Commissioning' },
  { id: 'documents', icon: 'Files', label: 'Document Control' },
  { id: 'meetings', icon: 'UsersRound', label: 'Meetings' },
  { id: 'reports', icon: 'FileBarChart', label: 'Reporting Engine' },
  { id: 'settings', icon: 'Settings', label: 'Settings' },
];

// --- PROJECT 1: OFFSHORE PLATFORM (EPC) ---
const P1_DATA: ProjectData = {
  kpis: [
    { id: 'spi', title: 'kpi.spi', value: 0.92, trend: -0.03, status: 'warning', icon: 'TrendingDown' },
    { id: 'cpi', title: 'kpi.cpi', value: 1.05, trend: 0.02, status: 'healthy', icon: 'TrendingUp' },
    { id: 'progress', title: 'kpi.progress', value: 68.5, unit: '%', trend: 2.1, status: 'healthy', icon: 'Activity' },
    { id: 'delay', title: 'kpi.delay', value: 14, unit: 'Days', trend: 5, status: 'critical', icon: 'AlertTriangle' },
  ],
  sCurve: [
    { name: 'jan', planned: 10, actual: 12 }, { name: 'feb', planned: 25, actual: 22 },
    { name: 'mar', planned: 45, actual: 38 }, { name: 'apr', planned: 65, actual: 55 },
    { name: 'may', planned: 80, actual: 68 }, { name: 'jun', planned: 95, actual: 0, forecast: 82 },
    { name: 'jul', planned: 100, actual: 0, forecast: 95 }, { name: 'aug', planned: 100, actual: 0, forecast: 100 },
  ],
  combinedData: [
    { period: 'jan', plannedInc: 10, actualInc: 12, plannedCum: 10, actualCum: 12 },
    { period: 'feb', plannedInc: 15, actualInc: 10, plannedCum: 25, actualCum: 22 },
    { period: 'mar', plannedInc: 20, actualInc: 16, plannedCum: 45, actualCum: 38 },
    { period: 'apr', plannedInc: 20, actualInc: 17, plannedCum: 65, actualCum: 55 },
    { period: 'may', plannedInc: 15, actualInc: 13, plannedCum: 80, actualCum: 68 },
    { period: 'jun', plannedInc: 15, actualInc: undefined, plannedCum: 95, actualCum: undefined },
    { period: 'jul', plannedInc: 5, actualInc: undefined, plannedCum: 100, actualCum: undefined },
  ],
  evmData: [
    { month: 'jan', pv: 1000, ev: 1200, ac: 1100 }, { month: 'feb', pv: 2500, ev: 2200, ac: 2000 },
    { month: 'mar', pv: 4500, ev: 3800, ac: 3500 }, { month: 'apr', pv: 6500, ev: 5500, ac: 5200 },
    { month: 'may', pv: 8000, ev: 6800, ac: 6500 },
  ],
  burnData: [
    { period: 'jan', plannedScope: 100, actualCompleted: 10, idealRemaining: 90, actualRemaining: 90 },
    { period: 'feb', plannedScope: 100, actualCompleted: 25, idealRemaining: 75, actualRemaining: 75 },
    { period: 'mar', plannedScope: 105, actualCompleted: 40, idealRemaining: 55, actualRemaining: 65 },
    { period: 'apr', plannedScope: 105, actualCompleted: 55, idealRemaining: 35, actualRemaining: 50 },
    { period: 'may', plannedScope: 105, actualCompleted: 68, idealRemaining: 15, actualRemaining: 37 },
  ],
  tornadoData: [
    { nameKey: 'risk.001.desc', negativeImpact: -5, positiveImpact: 15 },
    { nameKey: 'risk.002.desc', negativeImpact: -2, positiveImpact: 20 },
    { nameKey: 'risk.003.desc', negativeImpact: -10, positiveImpact: 8 },
  ],
  constructionAreas: [
    { areaKey: 'area.p1.topside', progress: 75, status: 'On Track' },
    { areaKey: 'area.p1.jacket', progress: 92, status: 'Ahead' },
    { areaKey: 'area.p1.pipeline', progress: 45, status: 'Delayed' },
  ],
  wbs: [
    { id: 'W1', nameKey: 'wbs.eng', level: 1 },
    { id: 'W1.1', nameKey: 'wbs.eng.process', level: 2, parentId: 'W1' },
    { id: 'W2', nameKey: 'wbs.proc', level: 1 },
    { id: 'W3', nameKey: 'wbs.const', level: 1 },
    { id: 'W3.1', nameKey: 'wbs.const.jacket', level: 2, parentId: 'W3' },
    { id: 'W3.2', nameKey: 'wbs.const.topside', level: 2, parentId: 'W3' },
  ],
  activities: [
    { id: 'A1010', wbsId: 'W1.1', descKey: 'act.p1.eng1', start: '01-Jan-2024', finish: '15-Jan-2024', resKey: 'res.engineers', daysOut: -100, progress: 100 },
    { id: 'A1020', wbsId: 'W2', descKey: 'act.p1.proc1', start: '16-Jan-2024', finish: '20-Mar-2024', resKey: 'res.proc_team', daysOut: -50, progress: 100 },
    { id: 'A1030', wbsId: 'W3.1', descKey: 'act.p1.fab1', start: '21-Mar-2024', finish: '25-May-2024', resKey: 'res.welders', daysOut: -10, progress: 90 },
    { id: 'A1040', wbsId: 'W3.1', descKey: 'act.p1.loadout', start: '12-Oct-2024', finish: '15-Oct-2024', resKey: 'res.crane_barge', daysOut: 3, progress: 0, bl1Start: '10-Oct-2024', bl1Finish: '13-Oct-2024' },
    { id: 'A1050', wbsId: 'W3.2', descKey: 'act.p1.topside_lift', start: '16-Oct-2024', finish: '20-Oct-2024', resKey: 'res.hlv', daysOut: 7, progress: 0, bl1Start: '14-Oct-2024', bl1Finish: '18-Oct-2024' },
    { id: 'A1060', wbsId: 'W3.2', descKey: 'act.p1.hookup', start: '21-Oct-2024', finish: '25-Nov-2024', resKey: 'res.hookup_crew', daysOut: 12, progress: 0 },
  ],
  risks: [
    { id: 'RSK-001', descriptionKey: 'risk.001.desc', probability: 4, impact: 5, status: 'Open', ownerKey: 'dept.procurement' },
    { id: 'RSK-002', descriptionKey: 'risk.002.desc', probability: 3, impact: 4, status: 'Open', ownerKey: 'dept.construction' },
  ],
  delays: [
    { id: 'DLY-01', descriptionKey: 'delay.001.desc', days: 12, type: 'Excusable', status: 'Claim Drafted' },
  ]
};

// --- PROJECT 2: TURNAROUND SHUTDOWN ---
const P2_DATA: ProjectData = {
  kpis: [
    { id: 'spi', title: 'kpi.spi', value: 1.02, trend: 0.05, status: 'healthy', icon: 'TrendingUp' },
    { id: 'cpi', title: 'kpi.cpi', value: 0.88, trend: -0.12, status: 'critical', icon: 'TrendingDown' },
    { id: 'progress', title: 'kpi.progress', value: 45.0, unit: '%', trend: 15.0, status: 'healthy', icon: 'Activity' },
    { id: 'delay', title: 'kpi.delay', value: 0, unit: 'Days', trend: -2, status: 'healthy', icon: 'CheckCircle' },
  ],
  sCurve: [
    { name: 'jan', planned: 5, actual: 5 }, { name: 'feb', planned: 15, actual: 15 },
    { name: 'mar', planned: 50, actual: 45 }, { name: 'apr', planned: 85, actual: 0, forecast: 80 },
    { name: 'may', planned: 100, actual: 0, forecast: 100 },
  ],
  combinedData: [
    { period: 'jan', plannedInc: 5, actualInc: 5, plannedCum: 5, actualCum: 5 },
    { period: 'feb', plannedInc: 10, actualInc: 10, plannedCum: 15, actualCum: 15 },
    { period: 'mar', plannedInc: 35, actualInc: 30, plannedCum: 50, actualCum: 45 },
    { period: 'apr', plannedInc: 35, actualInc: undefined, plannedCum: 85, actualCum: undefined },
    { period: 'may', plannedInc: 15, actualInc: undefined, plannedCum: 100, actualCum: undefined },
  ],
  evmData: [
    { month: 'jan', pv: 500, ev: 500, ac: 550 }, { month: 'feb', pv: 1500, ev: 1500, ac: 1800 },
    { month: 'mar', pv: 5000, ev: 4500, ac: 6000 },
  ],
  burnData: [
    { period: 'jan', plannedScope: 500, actualCompleted: 50, idealRemaining: 450, actualRemaining: 450 },
    { period: 'feb', plannedScope: 500, actualCompleted: 150, idealRemaining: 350, actualRemaining: 350 },
    { period: 'mar', plannedScope: 520, actualCompleted: 250, idealRemaining: 150, actualRemaining: 270 },
  ],
  tornadoData: [
    { nameKey: 'risk.ta1.desc', negativeImpact: -2, positiveImpact: 10 },
    { nameKey: 'risk.ta2.desc', negativeImpact: -1, positiveImpact: 5 },
  ],
  constructionAreas: [
    { areaKey: 'area.p2.unit1', progress: 100, status: 'Ahead' },
    { areaKey: 'area.p2.unit2', progress: 40, status: 'Delayed' },
    { areaKey: 'area.p2.flare', progress: 10, status: 'On Track' },
  ],
  wbs: [
    { id: 'TA1', nameKey: 'wbs.pre_sd', level: 1 },
    { id: 'TA2', nameKey: 'wbs.sd_exec', level: 1 },
    { id: 'TA2.1', nameKey: 'wbs.sd_exec.mech', level: 2, parentId: 'TA2' },
    { id: 'TA3', nameKey: 'wbs.post_sd', level: 1 },
  ],
  activities: [
    { id: 'TA-100', wbsId: 'TA1', descKey: 'act.pre_sd_scaffold', start: '01-Mar-2024', finish: '10-Mar-2024', resKey: 'res.scaffolders', daysOut: -30, progress: 100 },
    { id: 'TA-200', wbsId: 'TA2.1', descKey: 'act.sd_blind', start: '11-Mar-2024', finish: '12-Mar-2024', resKey: 'res.mech_fitters', daysOut: -20, progress: 100 },
    { id: 'TA-210', wbsId: 'TA2.1', descKey: 'act.sd_bundle', start: '13-Mar-2024', finish: '18-Mar-2024', resKey: 'res.crane_bundle', daysOut: -15, progress: 100 },
    { id: 'TA-220', wbsId: 'TA2.1', descKey: 'act.sd_valve', start: '12-Oct-2024', finish: '14-Oct-2024', resKey: 'res.mech_fitters', daysOut: 2, progress: 0 },
    { id: 'TA-300', wbsId: 'TA3', descKey: 'act.post_hydro', start: '25-Oct-2024', finish: '27-Oct-2024', resKey: 'res.testing_crew', daysOut: 15, progress: 0 },
    { id: 'TA-310', wbsId: 'TA3', descKey: 'act.post_deblind', start: '28-Oct-2024', finish: '29-Oct-2024', resKey: 'res.mech_fitters', daysOut: 18, progress: 0 },
  ],
  risks: [
    { id: 'RSK-TA1', descriptionKey: 'risk.ta1.desc', probability: 5, impact: 5, status: 'Open', ownerKey: 'dept.maintenance' },
    { id: 'RSK-TA2', descriptionKey: 'risk.ta2.desc', probability: 3, impact: 3, status: 'Mitigated', ownerKey: 'dept.hse' },
  ],
  delays: [
    { id: 'DLY-TA1', descriptionKey: 'delay.ta1.desc', days: 2, type: 'Excusable', status: 'Identified' },
  ]
};

// --- PROJECT 3: LNG TERMINAL (EPC) ---
const P3_DATA: ProjectData = {
  kpis: [
    { id: 'spi', title: 'kpi.spi', value: 0.85, trend: -0.08, status: 'critical', icon: 'TrendingDown' },
    { id: 'cpi', title: 'kpi.cpi', value: 0.95, trend: -0.01, status: 'warning', icon: 'TrendingDown' },
    { id: 'progress', title: 'kpi.progress', value: 32.0, unit: '%', trend: 1.5, status: 'warning', icon: 'Activity' },
    { id: 'delay', title: 'kpi.delay', value: 45, unit: 'Days', trend: 10, status: 'critical', icon: 'AlertTriangle' },
  ],
  sCurve: [
    { name: 'jan', planned: 5, actual: 4 }, { name: 'feb', planned: 12, actual: 10 },
    { name: 'mar', planned: 22, actual: 18 }, { name: 'apr', planned: 35, actual: 25 },
    { name: 'may', planned: 48, actual: 32 }, { name: 'jun', planned: 60, actual: 0, forecast: 40 },
  ],
  combinedData: [
    { period: 'jan', plannedInc: 5, actualInc: 4, plannedCum: 5, actualCum: 4 },
    { period: 'feb', plannedInc: 7, actualInc: 6, plannedCum: 12, actualCum: 10 },
    { period: 'mar', plannedInc: 10, actualInc: 8, plannedCum: 22, actualCum: 18 },
    { period: 'apr', plannedInc: 13, actualInc: 7, plannedCum: 35, actualCum: 25 },
    { period: 'may', plannedInc: 13, actualInc: 7, plannedCum: 48, actualCum: 32 },
  ],
  evmData: [
    { month: 'jan', pv: 5000, ev: 4000, ac: 4200 }, { month: 'feb', pv: 12000, ev: 10000, ac: 10500 },
    { month: 'mar', pv: 22000, ev: 18000, ac: 19000 }, { month: 'apr', pv: 35000, ev: 25000, ac: 27000 },
  ],
  burnData: [
    { period: 'jan', plannedScope: 1000, actualCompleted: 40, idealRemaining: 960, actualRemaining: 960 },
    { period: 'feb', plannedScope: 1000, actualCompleted: 100, idealRemaining: 880, actualRemaining: 900 },
    { period: 'mar', plannedScope: 1100, actualCompleted: 180, idealRemaining: 780, actualRemaining: 920 },
  ],
  tornadoData: [
    { nameKey: 'risk.p3.1.desc', negativeImpact: -10, positiveImpact: 45 },
    { nameKey: 'risk.p3.2.desc', negativeImpact: -5, positiveImpact: 30 },
  ],
  constructionAreas: [
    { areaKey: 'area.p3.tank1', progress: 40, status: 'Delayed' },
    { areaKey: 'area.p3.tank2', progress: 20, status: 'Delayed' },
    { areaKey: 'area.p3.jetty', progress: 60, status: 'On Track' },
  ],
  wbs: [
    { id: 'L1', nameKey: 'wbs.eng', level: 1 },
    { id: 'L2', nameKey: 'wbs.proc', level: 1 },
    { id: 'L3', nameKey: 'wbs.const', level: 1 },
    { id: 'L3.1', nameKey: 'wbs.const.civil', level: 2, parentId: 'L3' },
    { id: 'L3.2', nameKey: 'wbs.const.tank', level: 2, parentId: 'L3' },
  ],
  activities: [
    { id: 'L-100', wbsId: 'L3.1', descKey: 'act.p3.piling', start: '01-Sep-2024', finish: '30-Sep-2024', resKey: 'res.piling_rig', daysOut: -10, progress: 100 },
    { id: 'L-200', wbsId: 'L3.1', descKey: 'act.p3.foundation', start: '10-Oct-2024', finish: '25-Oct-2024', resKey: 'res.concrete_pump', daysOut: 1, progress: 10 },
    { id: 'L-300', wbsId: 'L3.2', descKey: 'act.p3.tank_base', start: '26-Oct-2024', finish: '15-Nov-2024', resKey: 'res.welders', daysOut: 16, progress: 0 },
    { id: 'L-400', wbsId: 'L3.2', descKey: 'act.p3.tank_shell', start: '16-Nov-2024', finish: '30-Dec-2024', resKey: 'res.crane_welders', daysOut: 36, progress: 0 },
    { id: 'L-500', wbsId: 'L2', descKey: 'act.p3.compressor_del', start: '01-Dec-2024', finish: '01-Dec-2024', resKey: 'res.none', daysOut: 50, progress: 0 },
  ],
  risks: [
    { id: 'RSK-L1', descriptionKey: 'risk.p3.1.desc', probability: 4, impact: 5, status: 'Open', ownerKey: 'dept.procurement' },
    { id: 'RSK-L2', descriptionKey: 'risk.p3.2.desc', probability: 5, impact: 4, status: 'Open', ownerKey: 'dept.construction' },
  ],
  delays: [
    { id: 'DLY-L1', descriptionKey: 'delay.p3.1.desc', days: 45, type: 'Excusable', status: 'Submitted' },
  ]
};

// --- PROJECT 4: DATA CENTER (Technology/Infrastructure) ---
const P4_DATA: ProjectData = {
  kpis: [
    { id: 'spi', title: 'kpi.spi', value: 1.05, trend: 0.02, status: 'healthy', icon: 'TrendingUp' },
    { id: 'cpi', title: 'kpi.cpi', value: 0.98, trend: -0.01, status: 'warning', icon: 'TrendingDown' },
    { id: 'progress', title: 'kpi.progress', value: 85.0, unit: '%', trend: 5.0, status: 'healthy', icon: 'Activity' },
    { id: 'delay', title: 'kpi.delay', value: 0, unit: 'Days', trend: 0, status: 'healthy', icon: 'CheckCircle' },
  ],
  sCurve: [
    { name: 'jan', planned: 20, actual: 22 }, { name: 'feb', planned: 40, actual: 45 },
    { name: 'mar', planned: 60, actual: 65 }, { name: 'apr', planned: 80, actual: 85 },
    { name: 'may', planned: 100, actual: 0, forecast: 100 },
  ],
  combinedData: [
    { period: 'jan', plannedInc: 20, actualInc: 22, plannedCum: 20, actualCum: 22 },
    { period: 'feb', plannedInc: 20, actualInc: 23, plannedCum: 40, actualCum: 45 },
    { period: 'mar', plannedInc: 20, actualInc: 20, plannedCum: 60, actualCum: 65 },
    { period: 'apr', plannedInc: 20, actualInc: 20, plannedCum: 80, actualCum: 85 },
    { period: 'may', plannedInc: 20, actualInc: undefined, plannedCum: 100, actualCum: undefined },
  ],
  evmData: [
    { month: 'jan', pv: 20000, ev: 22000, ac: 21000 }, { month: 'feb', pv: 40000, ev: 45000, ac: 46000 },
    { month: 'mar', pv: 60000, ev: 65000, ac: 66000 }, { month: 'apr', pv: 80000, ev: 85000, ac: 86000 },
  ],
  burnData: [
    { period: 'jan', plannedScope: 500, actualCompleted: 110, idealRemaining: 400, actualRemaining: 390 },
    { period: 'feb', plannedScope: 500, actualCompleted: 225, idealRemaining: 300, actualRemaining: 275 },
    { period: 'mar', plannedScope: 500, actualCompleted: 325, idealRemaining: 200, actualRemaining: 175 },
    { period: 'apr', plannedScope: 500, actualCompleted: 425, idealRemaining: 100, actualRemaining: 75 },
  ],
  tornadoData: [
    { nameKey: 'risk.p4.1.desc', negativeImpact: -5, positiveImpact: 10 },
    { nameKey: 'risk.p4.2.desc', negativeImpact: -2, positiveImpact: 5 },
  ],
  constructionAreas: [
    { areaKey: 'area.p4.core', progress: 100, status: 'Ahead' },
    { areaKey: 'area.p4.mep', progress: 90, status: 'On Track' },
    { areaKey: 'area.p4.it', progress: 60, status: 'On Track' },
  ],
  wbs: [
    { id: 'D1', nameKey: 'wbs.dc.core', level: 1 },
    { id: 'D2', nameKey: 'wbs.dc.mep', level: 1 },
    { id: 'D3', nameKey: 'wbs.dc.it', level: 1 },
    { id: 'D4', nameKey: 'wbs.dc.comm', level: 1 },
  ],
  activities: [
    { id: 'DC-100', wbsId: 'D2', descKey: 'act.p4.chillers', start: '01-Sep-2024', finish: '15-Sep-2024', resKey: 'res.mech_fitters', daysOut: -30, progress: 100 },
    { id: 'DC-200', wbsId: 'D2', descKey: 'act.p4.generators', start: '16-Sep-2024', finish: '30-Sep-2024', resKey: 'res.elec_team', daysOut: -10, progress: 100 },
    { id: 'DC-300', wbsId: 'D3', descKey: 'act.p4.server_racks', start: '10-Oct-2024', finish: '20-Oct-2024', resKey: 'res.it_techs', daysOut: 1, progress: 20 },
    { id: 'DC-400', wbsId: 'D3', descKey: 'act.p4.cabling', start: '21-Oct-2024', finish: '10-Nov-2024', resKey: 'res.it_techs', daysOut: 11, progress: 0 },
    { id: 'DC-500', wbsId: 'D4', descKey: 'act.p4.ist', start: '11-Nov-2024', finish: '30-Nov-2024', resKey: 'res.testing_crew', daysOut: 31, progress: 0 },
  ],
  risks: [
    { id: 'RSK-D1', descriptionKey: 'risk.p4.1.desc', probability: 2, impact: 4, status: 'Mitigated', ownerKey: 'dept.procurement' },
    { id: 'RSK-D2', descriptionKey: 'risk.p4.2.desc', probability: 3, impact: 3, status: 'Open', ownerKey: 'dept.engineering' },
  ],
  delays: []
};

export const PROJECT_DATABASE: Record<string, ProjectData> = {
  'p1': P1_DATA,
  'p2': P2_DATA,
  'p3': P3_DATA,
  'p4': P4_DATA,
};

export const TRANSLATIONS: Dictionary = {
  // App & Nav
  'app.title': { en: 'AIPCOS', ar: 'نظام إدارة المشاريع الذكي', ml: 'എ.ഐ.പി.സി.ഒ.എസ്' },
  'nav.dashboard': { en: 'Command Center', ar: 'مركز القيادة', ml: 'കമാൻഡ് സെന്റർ' },
  'nav.schedule': { en: 'Schedule Analytics', ar: 'تحليل الجدول الزمني', ml: 'ഷെഡ്യൂൾ അനലിറ്റിക്സ്' },
  'nav.lookahead': { en: 'Look Ahead Planning', ar: 'التخطيط المستقبلي', ml: 'മുന്നോട്ടുള്ള ആസൂത്രണം' },
  'nav.baseline': { en: 'Baseline Management', ar: 'إدارة الخط المرجعي', ml: 'ബേസ്‌ലൈൻ മാനേജ്മെന്റ്' },
  'nav.cost': { en: 'Cost Control', ar: 'مراقبة التكاليف', ml: 'ചെലവ് നിയന്ത്രണം' },
  'nav.resources': { en: 'Resource Management', ar: 'إدارة الموارد', ml: 'വിഭവ മാനേജ്മെന്റ്' },
  'nav.procurement': { en: 'Procurement', ar: 'المشتريات', ml: 'സംഭരണം' },
  'nav.engineering': { en: 'Engineering', ar: 'الهندسة', ml: 'എഞ്ചിനീയറിംഗ്' },
  'nav.construction': { en: 'Construction', ar: 'البناء', ml: 'നിർമ്മാണം' },
  'nav.quality': { en: 'Quality (QA/QC)', ar: 'الجودة', ml: 'ഗുണനിലവാരം' },
  'nav.hse': { en: 'HSE Management', ar: 'الصحة والسلامة والبيئة', ml: 'എച്ച്.എസ്.ഇ മാനേജ്മെന്റ്' },
  'nav.risk': { en: 'Risk Management', ar: 'إدارة المخاطر', ml: 'റിസ്ക് മാനേജ്മെന്റ്' },
  'nav.delay': { en: 'Delay Analysis', ar: 'تحليل التأخير', ml: 'കാലതാമസം വിശകലനം' },
  'nav.contracts': { en: 'Contracts', ar: 'العقود', ml: 'കരാറുകൾ' },
  'nav.commissioning': { en: 'Commissioning', ar: 'التشغيل', ml: 'കമ്മീഷനിംഗ്' },
  'nav.documents': { en: 'Document Control', ar: 'مراقبة الوثائق', ml: 'രേഖാ നിയന്ത്രണം' },
  'nav.meetings': { en: 'Meetings', ar: 'الاجتماعات', ml: 'മീറ്റിംഗുകൾ' },
  'nav.reports': { en: 'Reporting Engine', ar: 'محرك التقارير', ml: 'റിപ്പോർട്ടിംഗ് എഞ്ചിൻ' },
  'nav.settings': { en: 'Settings', ar: 'الإعدادات', ml: 'ക്രമീകരണങ്ങൾ' },

  // Login & Auth
  'login.title': { en: 'Welcome to AIPCOS', ar: 'مرحباً بك في نظام إدارة المشاريع', ml: 'AIPCOS-ലേക്ക് സ്വാഗതം' },
  'login.username': { en: 'Username', ar: 'اسم المستخدم', ml: 'ഉപയോക്തൃനാമം' },
  'login.password': { en: 'Password', ar: 'كلمة المرور', ml: 'പാസ്‌വേഡ്' },
  'login.submit': { en: 'Sign In', ar: 'تسجيل الدخول', ml: 'സൈൻ ഇൻ ചെയ്യുക' },
  'login.guest': { en: 'Continue as Guest', ar: 'المتابعة كضيف', ml: 'അതിഥിയായി തുടരുക' },
  'login.error': { en: 'Invalid username or password', ar: 'اسم المستخدم أو كلمة المرور غير صالحة', ml: 'തെറ്റായ ഉപയോക്തൃനാമം അല്ലെങ്കിൽ പാസ്‌വേഡ്' },
  'login.signup': { en: 'Sign Up', ar: 'إنشاء حساب', ml: 'സൈൻ അപ്പ് ചെയ്യുക' },
  'login.forgot': { en: 'Forgot Password?', ar: 'هل نسيت كلمة المرور؟', ml: 'പാസ്‌വേഡ് മറന്നോ?' },
  'login.name': { en: 'Full Name', ar: 'الاسم الكامل', ml: 'പൂർണ്ണ നാമം' },
  'login.contact': { en: 'Email or Mobile Number', ar: 'البريد الإلكتروني أو رقم الهاتف', ml: 'ഇമെയിൽ അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ' },
  'login.confirm_password': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور', ml: 'പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക' },
  'login.create_account': { en: 'Create Account', ar: 'إنشاء حساب', ml: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക' },
  'login.back_to_login': { en: 'Back to Login', ar: 'العودة لتسجيل الدخول', ml: 'ലോഗിനിലേക്ക് മടങ്ങുക' },
  'login.send_otp': { en: 'Send OTP', ar: 'إرسال رمز التحقق', ml: 'OTP അയയ്‌ക്കുക' },
  'login.enter_otp': { en: 'Enter OTP', ar: 'أدخل رمز التحقق', ml: 'OTP നൽകുക' },
  'login.verify_reset': { en: 'Verify & Reset', ar: 'تحقق وإعادة تعيين', ml: 'സ്ഥിരീകരിച്ച് പുനഃസജ്ജമാക്കുക' },
  'login.new_password': { en: 'New Password', ar: 'كلمة المرور الجديدة', ml: 'പുതിയ പാസ്‌വേഡ്' },
  'login.otp_sent': { en: 'OTP sent successfully to your contact!', ar: 'تم إرسال رمز التحقق بنجاح!', ml: 'നിങ്ങളുടെ കോൺടാക്റ്റിലേക്ക് OTP വിജയകരമായി അയച്ചു!' },
  'login.signup_success': { en: 'Account created successfully! Please login.', ar: 'تم إنشاء الحساب بنجاح! الرجاء تسجيل الدخول.', ml: 'അക്കൗണ്ട് വിജയകരമായി സൃഷ്ടിച്ചു! ദയവായി ലോഗിൻ ചെയ്യുക.' },
  'login.no_account': { en: "Don't have an account?", ar: 'ليس لديك حساب؟', ml: 'അക്കൗണ്ട് ഇല്ലേ?' },
  'login.has_account': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟', ml: 'നേരത്തെ തന്നെ അക്കൗണ്ട് ഉണ്ടോ?' },
  'login.pass_mismatch': { en: 'Passwords do not match!', ar: 'كلمات المرور غير متطابقة!', ml: 'പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല!' },
  'ui.logout': { en: 'Logout', ar: 'تسجيل الخروج', ml: 'ലോഗൗട്ട് ചെയ്യുക' },

  // KPIs
  'kpi.spi': { en: 'Schedule Performance (SPI)', ar: 'أداء الجدول الزمني (SPI)', ml: 'ഷെഡ്യൂൾ പ്രകടനം (SPI)' },
  'kpi.cpi': { en: 'Cost Performance (CPI)', ar: 'أداء التكلفة (CPI)', ml: 'ചെലവ് പ്രകടനം (CPI)' },
  'kpi.tcpi': { en: 'To Complete Performance (TCPI)', ar: 'مؤشر الأداء للاكتمال (TCPI)', ml: 'പൂർത്തിയാക്കാനുള്ള പ്രകടനം (TCPI)' },
  'kpi.progress': { en: 'Overall Progress', ar: 'التقدم الإجمالي', ml: 'മൊത്തത്തിലുള്ള പുരോഗതി' },
  'kpi.delay': { en: 'Forecast Delay', ar: 'التأخير المتوقع', ml: 'പ്രതീക്ഷിക്കുന്ന കാലതാമസം' },

  // Months
  'month.jan': { en: 'Jan', ar: 'يناير', ml: 'ജനു' },
  'month.feb': { en: 'Feb', ar: 'فبراير', ml: 'ഫെബ്രു' },
  'month.mar': { en: 'Mar', ar: 'مارس', ml: 'മാർ' },
  'month.apr': { en: 'Apr', ar: 'أبريل', ml: 'ഏപ്രി' },
  'month.may': { en: 'May', ar: 'مايو', ml: 'മെയ്' },
  'month.jun': { en: 'Jun', ar: 'يونيو', ml: 'ജൂൺ' },
  'month.jul': { en: 'Jul', ar: 'يوليو', ml: 'ജൂലൈ' },
  'month.aug': { en: 'Aug', ar: 'أغسطس', ml: 'ഓഗ' },
  'month.sep': { en: 'Sep', ar: 'سبتمبر', ml: 'സെപ്റ്റം' },
  'month.oct': { en: 'Oct', ar: 'أكتوبر', ml: 'ഒക്ടോ' },
  'month.nov': { en: 'Nov', ar: 'نوفمبر', ml: 'നവം' },
  'month.dec': { en: 'Dec', ar: 'ديسمبر', ml: 'ഡിസം' },

  // Chart Labels
  'chart.planned': { en: 'Planned', ar: 'مخطط', ml: 'ആസൂത്രണം ചെയ്തത്' },
  'chart.actual': { en: 'Actual', ar: 'فعلي', ml: 'യഥാർത്ഥമായത്' },
  'chart.forecast': { en: 'Forecast', ar: 'متوقع', ml: 'പ്രവചനം' },
  'chart.plannedInc': { en: 'Planned (Period)', ar: 'مخطط (دوري)', ml: 'ആസൂത്രണം (ആനുകാലികം)' },
  'chart.actualInc': { en: 'Actual (Period)', ar: 'فعلي (دوري)', ml: 'യഥാർത്ഥ (ആനുകാലികം)' },
  'chart.plannedCum': { en: 'Planned (Cum)', ar: 'مخطط (تراكمي)', ml: 'ആസൂത്രണം (സഞ്ചിതം)' },
  'chart.actualCum': { en: 'Actual (Cum)', ar: 'فعلي (تراكمي)', ml: 'യഥാർത്ഥ (സഞ്ചിതം)' },
  'chart.pv': { en: 'Planned Value (PV)', ar: 'القيمة المخططة', ml: 'ആസൂത്രണ മൂല്യം' },
  'chart.ev': { en: 'Earned Value (EV)', ar: 'القيمة المكتسبة', ml: 'നേടിയ മൂല്യം' },
  'chart.ac': { en: 'Actual Cost (AC)', ar: 'التكلفة الفعلية', ml: 'യഥാർത്ഥ ചെലവ്' },
  'chart.periodic': { en: 'Periodic', ar: 'دوري', ml: 'ആനുകാലികം' },
  'chart.cumulative': { en: 'Cumulative', ar: 'تراكمي', ml: 'സഞ്ചിതം' },
  'chart.burnup': { en: 'Burn-Up Chart', ar: 'مخطط الإنجاز', ml: 'ബേൺ-അപ്പ് ചാർട്ട്' },
  'chart.burndown': { en: 'Burn-Down Chart', ar: 'مخطط المتبقي', ml: 'ബേൺ-ഡൗൺ ചാർട്ട്' },
  'chart.tornado': { en: 'Risk Sensitivity (Tornado)', ar: 'حساسية المخاطر (تورنادو)', ml: 'റിസ്ക് സെൻസിറ്റിവിറ്റി (ടൊർണാഡോ)' },
  'chart.scope': { en: 'Total Scope', ar: 'النطاق الإجمالي', ml: 'മൊത്തം വ്യാപ്തി' },
  'chart.completed': { en: 'Completed', ar: 'مكتمل', ml: 'പൂർത്തിയായി' },
  'chart.ideal_rem': { en: 'Ideal Remaining', ar: 'المتبقي المثالي', ml: 'അനുയോജ്യമായ ബാക്കി' },
  'chart.actual_rem': { en: 'Actual Remaining', ar: 'المتبقي الفعلي', ml: 'യഥാർത്ഥ ബാക്കി' },
  'chart.neg_impact': { en: 'Opportunity (Days)', ar: 'فرصة (أيام)', ml: 'അവസരം (ദിവസങ്ങൾ)' },
  'chart.pos_impact': { en: 'Risk (Days)', ar: 'خطر (أيام)', ml: 'അപകടസാധ്യത (ദിവസങ്ങൾ)' },

  // Statuses & Common
  'status.active': { en: 'Active', ar: 'نشط', ml: 'സജീവം' },
  'status.idle': { en: 'Idle', ar: 'خامل', ml: 'നിഷ്ക്രിയം' },
  'status.maintenance': { en: 'Maintenance', ar: 'صيانة', ml: 'അറ്റകുറ്റപ്പണി' },
  'status.open': { en: 'Open', ar: 'مفتوح', ml: 'തുറക്കുക' },
  'status.closed': { en: 'Closed', ar: 'مغلق', ml: 'അടച്ചു' },
  'status.mitigated': { en: 'Mitigated', ar: 'مخفف', ml: 'ലഘൂകരിച്ചു' },
  'status.healthy': { en: 'Healthy', ar: 'صحي', ml: 'ആരോഗ്യമുള്ള' },
  'status.warning': { en: 'Warning', ar: 'تحذير', ml: 'മുന്നറിയിപ്പ്' },
  'status.critical': { en: 'Critical', ar: 'حرج', ml: 'ഗുരുതരം' },
  'status.excusable': { en: 'Excusable', ar: 'معذور', ml: 'ക്ഷമിക്കാവുന്നത്' },
  'status.nonexcusable': { en: 'Non-Excusable', ar: 'غير معذور', ml: 'ക്ഷമിക്കാനാവാത്തത്' },
  'status.approved': { en: 'Approved', ar: 'معتمد', ml: 'അംഗീകരിച്ചു' },
  'status.identified': { en: 'Identified', ar: 'محدد', ml: 'തിരിച്ചറിഞ്ഞു' },
  'status.drafted': { en: 'Claim Drafted', ar: 'مسودة مطالبة', ml: 'ക്ലെയിം ഡ്രാഫ്റ്റ് ചെയ്തു' },

  // Table Headers
  'table.po': { en: 'PO Number', ar: 'رقم أمر الشراء', ml: 'PO നമ്പർ' },
  'table.desc': { en: 'Description', ar: 'الوصف', ml: 'വിവരണം' },
  'table.vendor': { en: 'Vendor', ar: 'المورد', ml: 'വില്പനക്കാരൻ' },
  'table.status': { en: 'Status', ar: 'الحالة', ml: 'അവസ്ഥ' },
  'table.delivery': { en: 'Delivery', ar: 'التسليم', ml: 'ഡെലിവറി' },
  'table.health': { en: 'Health', ar: 'الصحة', ml: 'ആരോഗ്യം' },
  'table.id': { en: 'ID', ar: 'المعرف', ml: 'ഐഡി' },
  'table.impact': { en: 'Impact', ar: 'التأثير', ml: 'ആഘാതം' },
  'table.type': { en: 'Type', ar: 'النوع', ml: 'തരം' },
  'table.action': { en: 'Action', ar: 'إجراء', ml: 'പ്രവർത്തനം' },
  'table.start': { en: 'Start Date', ar: 'تاريخ البدء', ml: 'ആരംഭ തീയതി' },
  'table.finish': { en: 'Finish Date', ar: 'تاريخ الانتهاء', ml: 'അവസാന തീയതി' },
  'table.resources': { en: 'Resources', ar: 'الموارد', ml: 'വിഭവങ്ങൾ' },
  'table.variance': { en: 'Variance', ar: 'التباين', ml: 'വ്യത്യാസം' },
  'table.wbs': { en: 'WBS', ar: 'هيكل تقسيم العمل', ml: 'WBS' },
  'table.progress': { en: 'Progress', ar: 'التقدم', ml: 'പുരോഗതി' },

  // UI Elements
  'ui.export_excel': { en: 'Export Excel', ar: 'تصدير إكسل', ml: 'എക്സൽ കയറ്റുമതി ചെയ്യുക' },
  'ui.export_powerbi': { en: 'Power BI Sync', ar: 'مزامنة Power BI', ml: 'Power BI സമന്വയം' },
  'ui.generate': { en: 'Generate Recovery Plan', ar: 'إنشاء خطة استرداد', ml: 'വീണ്ടെടുക്കൽ പ്ലാൻ സൃഷ്ടിക്കുക' },
  'ui.viewall': { en: 'View All', ar: 'عرض الكل', ml: 'എല്ലാം കാണുക' },
  'ui.add': { en: 'Add New', ar: 'إضافة جديد', ml: 'പുതിയത് ചേർക്കുക' },
  'ui.search': { en: 'Search activities, risks, resources...', ar: 'البحث في الأنشطة والمخاطر والموارد...', ml: 'പ്രവർത്തനങ്ങൾ, അപകടസാധ്യതകൾ, വിഭവങ്ങൾ എന്നിവ തിരയുക...' },
  'ui.custom_days': { en: 'Custom Days', ar: 'أيام مخصصة', ml: 'ഇഷ്‌ടാനുസൃത ദിവസങ്ങൾ' },
  'ui.compare': { en: 'Compare', ar: 'مقارنة', ml: 'താരതമ്യം ചെയ്യുക' },
  'ui.primary_baseline': { en: 'Primary Baseline', ar: 'الخط المرجعي الأساسي', ml: 'പ്രാഥമിക ബേസ്‌ലൈൻ' },
  'ui.compare_baseline': { en: 'Compare Baseline', ar: 'مقارنة الخط المرجعي', ml: 'ബേസ്‌ലൈൻ താരതമ്യം ചെയ്യുക' },
  'ui.data_story': { en: 'AI Data Story', ar: 'قصة البيانات بالذكاء الاصطناعي', ml: 'AI ഡാറ്റ സ്റ്റോറി' },

  // Settings & Notifications
  'wp.default': { en: 'Default Clean', ar: 'الافتراضي النظيف', ml: 'സ്ഥിരസ്ഥിതി' },
  'wp.blueprint': { en: 'Engineering Blueprint', ar: 'مخطط هندسي', ml: 'എഞ്ചിനീയറിംഗ് ബ്ലൂപ്രിന്റ്' },
  'wp.dots': { en: 'Dotted Matrix', ar: 'مصفوفة منقطة', ml: 'ഡോട്ടഡ് മാട്രിക്സ്' },
  'wp.grid': { en: 'Technical Grid', ar: 'شبكة تقنية', ml: 'സാങ്കേതിക ഗ്രിഡ്' },
  'wp.color': { en: 'Solid Color', ar: 'لون صلب', ml: 'സോളിഡ് നിറം' },
  'wp.image': { en: 'Custom Image', ar: 'صورة مخصصة', ml: 'ഇഷ്‌ടാനുസൃത ചിത്രം' },
  'notif.1.title': { en: 'Critical Delay Alert', ar: 'تنبيه تأخير حرج', ml: 'ഗുരുതരമായ കാലതാമസം മുന്നറിയിപ്പ്' },
  'notif.1.msg': { en: 'Piping installation is 5 days behind schedule.', ar: 'تركيب الأنابيب متأخر 5 أيام عن الجدول الزمني.', ml: 'പൈപ്പിംഗ് ഇൻസ്റ്റാളേഷൻ 5 ദിവസം വൈകി.' },
  'notif.2.title': { en: 'Procurement Warning', ar: 'تحذير المشتريات', ml: 'സംഭരണ മുന്നറിയിപ്പ്' },
  'notif.2.msg': { en: 'Gas Turbine delivery delayed by 2 weeks.', ar: 'تأخر تسليم توربينات الغاز لمدة أسبوعين.', ml: 'ഗ്യാസ് ടർബൈൻ വിതരണം 2 ആഴ്ച വൈകി.' },
  'notif.3.title': { en: 'Report Generated', ar: 'تم إنشاء التقرير', ml: 'റിപ്പോർട്ട് സൃഷ്ടിച്ചു' },
  'notif.3.msg': { en: 'Weekly Executive Summary is ready.', ar: 'الملخص التنفيذي الأسبوعي جاهز.', ml: 'പ്രതിവാര എക്സിക്യൂട്ടീവ് സംഗ്രഹം തയ്യാറാണ്.' },

  // WBS
  'wbs.eng': { en: 'Engineering', ar: 'الهندسة', ml: 'എഞ്ചിനീയറിംഗ്' },
  'wbs.eng.process': { en: 'Process Engineering', ar: 'هندسة العمليات', ml: 'പ്രോസസ്സ് എഞ്ചിനീയറിംഗ്' },
  'wbs.proc': { en: 'Procurement', ar: 'المشتريات', ml: 'സംഭരണം' },
  'wbs.const': { en: 'Construction', ar: 'البناء', ml: 'നിർമ്മാണം' },
  'wbs.const.jacket': { en: 'Jacket Fabrication', ar: 'تصنيع الغلاف', ml: 'ജാക്കറ്റ് നിർമ്മാണം' },
  'wbs.const.topside': { en: 'Topside Fabrication', ar: 'تصنيع الجزء العلوي', ml: 'ടോപ്സൈഡ് നിർമ്മാണം' },
  'wbs.const.civil': { en: 'Civil Works', ar: 'الأعمال المدنية', ml: 'സിവിൽ വർക്കുകൾ' },
  'wbs.const.tank': { en: 'Tank Erection', ar: 'تركيب الخزان', ml: 'ടാങ്ക് സ്ഥാപിക്കൽ' },
  'wbs.pre_sd': { en: 'Pre-Shutdown', ar: 'ما قبل الإغلاق', ml: 'പ്രീ-ഷട്ട്ഡൗൺ' },
  'wbs.sd_exec': { en: 'Shutdown Execution', ar: 'تنفيذ الإغلاق', ml: 'ഷട്ട്ഡൗൺ നിർവ്വഹണം' },
  'wbs.sd_exec.mech': { en: 'Mechanical Works', ar: 'الأعمال الميكانيكية', ml: 'മെക്കാനിക്കൽ വർക്കുകൾ' },
  'wbs.post_sd': { en: 'Post-Shutdown', ar: 'ما بعد الإغلاق', ml: 'പോസ്റ്റ്-ഷട്ട്ഡൗൺ' },
  'wbs.dc.core': { en: 'Core & Shell', ar: 'الهيكل الأساسي', ml: 'കോർ & ഷെൽ' },
  'wbs.dc.mep': { en: 'MEP Works', ar: 'أعمال الميكانيكا والكهرباء', ml: 'MEP വർക്കുകൾ' },
  'wbs.dc.it': { en: 'IT Fit-out', ar: 'تجهيزات تكنولوجيا المعلومات', ml: 'ഐടി ഫിറ്റ്-ഔട്ട്' },
  'wbs.dc.comm': { en: 'Commissioning', ar: 'التشغيل', ml: 'കമ്മീഷനിംഗ്' },

  // Areas
  'area.p1.topside': { en: 'Area A - Topside', ar: 'المنطقة أ - الجزء العلوي', ml: 'ഏരിയ എ - ടോപ്സൈഡ്' },
  'area.p1.jacket': { en: 'Area B - Jacket', ar: 'المنطقة ب - الغلاف', ml: 'ഏരിയ ബി - ജാക്കറ്റ്' },
  'area.p1.pipeline': { en: 'Area C - Pipeline', ar: 'المنطقة ج - خط الأنابيب', ml: 'ഏരിയ സി - പൈപ്പ്ലൈൻ' },
  'area.p2.unit1': { en: 'CDU Unit 1', ar: 'وحدة التقطير 1', ml: 'CDU യൂണിറ്റ് 1' },
  'area.p2.unit2': { en: 'VDU Unit 2', ar: 'وحدة التقطير الفراغي 2', ml: 'VDU യൂണിറ്റ് 2' },
  'area.p2.flare': { en: 'Flare System', ar: 'نظام الشعلة', ml: 'ഫ്ലെയർ സിസ്റ്റം' },
  'area.p3.tank1': { en: 'LNG Tank 1', ar: 'خزان الغاز 1', ml: 'LNG ടാങ്ക് 1' },
  'area.p3.tank2': { en: 'LNG Tank 2', ar: 'خزان الغاز 2', ml: 'LNG ടാങ്ക് 2' },
  'area.p3.jetty': { en: 'Marine Jetty', ar: 'الرصيف البحري', ml: 'മറൈൻ ജെട്ടി' },
  'area.p4.core': { en: 'Data Hall 1 & 2', ar: 'قاعة البيانات 1 و 2', ml: 'ഡാറ്റാ ഹാൾ 1 & 2' },
  'area.p4.mep': { en: 'Cooling Plant', ar: 'محطة التبريد', ml: 'കൂളിംഗ് പ്ലാന്റ്' },
  'area.p4.it': { en: 'Server Racks', ar: 'رفوف الخوادم', ml: 'സെർവർ റാക്കുകൾ' },

  // Deep Data Translations (Activities, Risks, Delays, Procurement)
  'act.clearance': { en: 'Site Clearance', ar: 'تجهيز الموقع', ml: 'സൈറ്റ് ക്ലിയറൻസ്' },
  'act.excavation': { en: 'Foundation Excavation', ar: 'حفر الأساسات', ml: 'അടിത്തറ ഖനനം' },
  'act.rebar': { en: 'Rebar Installation', ar: 'تركيب حديد التسليح', ml: 'കമ്പി സ്ഥാപിക്കൽ' },
  'act.concrete': { en: 'Concrete Pouring', ar: 'صب الخرسانة', ml: 'കോൺക്രീറ്റ് ഒഴിക്കൽ' },
  'act.curing': { en: 'Concrete Curing', ar: 'معالجة الخرسانة', ml: 'കോൺക്രീറ്റ് ക്യൂറിംഗ്' },
  'act.steel_erection': { en: 'Structural Steel Erection', ar: 'تركيب الهيكل الحديدي', ml: 'സ്റ്റീൽ ഘടന സ്ഥാപിക്കൽ' },
  
  'act.p1.eng1': { en: 'Process Flow Diagrams (PFD)', ar: 'مخططات تدفق العمليات', ml: 'പ്രോസസ്സ് ഫ്ലോ ഡയഗ്രമുകൾ' },
  'act.p1.proc1': { en: 'Procure Long Lead Items', ar: 'شراء المواد طويلة الأجل', ml: 'ലോംഗ് ലീഡ് ഇനങ്ങൾ വാങ്ങുക' },
  'act.p1.fab1': { en: 'Jacket Tubular Fabrication', ar: 'تصنيع أنابيب الغلاف', ml: 'ജാക്കറ്റ് ട്യൂബുലാർ നിർമ്മാണം' },
  'act.p1.loadout': { en: 'Jacket Load-out', ar: 'تحميل الغلاف', ml: 'ജാക്കറ്റ് ലോഡ്-ഔട്ട്' },
  'act.p1.topside_lift': { en: 'Topside Heavy Lift', ar: 'رفع الجزء العلوي', ml: 'ടോപ്സൈഡ് ഹെവി ലിഫ്റ്റ്' },
  'act.p1.hookup': { en: 'Offshore Hook-up', ar: 'الربط البحري', ml: 'ഓഫ്‌ഷോർ ഹുക്ക്-അപ്പ്' },

  'act.pre_sd_scaffold': { en: 'Erect Scaffolding (Pre-SD)', ar: 'تركيب السقالات', ml: 'സ്കാർഫോൾഡിംഗ് സ്ഥാപിക്കൽ' },
  'act.sd_blind': { en: 'Blinding & Spading', ar: 'تركيب الستائر', ml: 'ബ്ലൈൻഡിംഗ്' },
  'act.sd_bundle': { en: 'Pull Heat Exchanger Bundle', ar: 'سحب حزمة المبادل الحراري', ml: 'ഹീറ്റ് എക്സ്ചേഞ്ചർ ബണ്ടിൽ വലിക്കുക' },
  'act.sd_valve': { en: 'Replace Control Valves', ar: 'استبدال صمامات التحكم', ml: 'കൺട്രോൾ വാൽവുകൾ മാറ്റുക' },
  'act.post_hydro': { en: 'Hydrotesting', ar: 'الاختبار الهيدروستاتيكي', ml: 'ഹൈഡ്രോ ടെസ്റ്റിംഗ്' },
  'act.post_deblind': { en: 'De-blinding & Box-up', ar: 'إزالة الستائر والإغلاق', ml: 'ഡി-ബ്ലൈൻഡിംഗ്' },

  'act.p3.piling': { en: 'Jetty Piling Works', ar: 'أعمال خوازيق الرصيف', ml: 'ജെട്ടി പൈലിംഗ് വർക്കുകൾ' },
  'act.p3.foundation': { en: 'Tank Ring Wall Foundation', ar: 'أساس حلقة الخزان', ml: 'ടാങ്ക് റിംഗ് വാൾ ഫൗണ്ടേഷൻ' },
  'act.p3.tank_base': { en: 'Tank Base Plate Welding', ar: 'لحام قاعدة الخزان', ml: 'ടാങ്ക് ബേസ് പ്ലേറ്റ് വെൽഡിംഗ്' },
  'act.p3.tank_shell': { en: 'Tank Shell Erection', ar: 'تركيب هيكل الخزان', ml: 'ടാങ്ക് ഷെൽ സ്ഥാപിക്കൽ' },
  'act.p3.compressor_del': { en: 'Compressor Delivery', ar: 'تسليم الضاغط', ml: 'കംപ്രസ്സർ ഡെലിവറി' },

  'act.p4.chillers': { en: 'Install HVAC Chillers', ar: 'تركيب مبردات التكييف', ml: 'HVAC ചില്ലറുകൾ സ്ഥാപിക്കുക' },
  'act.p4.generators': { en: 'Install Backup Generators', ar: 'تركيب المولدات الاحتياطية', ml: 'ബാക്കപ്പ് ജനറേറ്ററുകൾ സ്ഥാപിക്കുക' },
  'act.p4.server_racks': { en: 'Install Server Racks', ar: 'تركيب رفوف الخوادم', ml: 'സെർവർ റാക്കുകൾ സ്ഥാപിക്കുക' },
  'act.p4.cabling': { en: 'Fiber Optic Cabling', ar: 'تمديد كابلات الألياف الضوئية', ml: 'ഫൈബർ ഒപ്റ്റിക് കേബിളിംഗ്' },
  'act.p4.ist': { en: 'Integrated Systems Testing (IST)', ar: 'اختبار الأنظمة المتكاملة', ml: 'ഇന്റഗ്രേറ്റഡ് സിസ്റ്റംസ് ടെസ്റ്റിംഗ്' },

  'res.excavator': { en: 'Excavator, 5 Labor', ar: 'حفارة، 5 عمال', ml: 'എക്സ്കവേറ്റർ, 5 തൊഴിലാളികൾ' },
  'res.excavator_labor': { en: 'Excavator, 10 Labor', ar: 'حفارة، 10 عمال', ml: 'എക്സ്കവേറ്റർ, 10 തൊഴിലാളികൾ' },
  'res.crane_steel': { en: 'Crane, 15 Steel Fixers', ar: 'رافعة، 15 حداد', ml: 'ക്രെയിൻ, 15 സ്റ്റീൽ ഫിക്സർമാർ' },
  'res.concrete_pump': { en: 'Concrete Pump, 10 Labor', ar: 'مضخة خرسانة، 10 عمال', ml: 'കോൺക്രീറ്റ് പമ്പ്, 10 തൊഴിലാളികൾ' },
  'res.none': { en: 'None', ar: 'لا يوجد', ml: 'ഒന്നുമില്ല' },
  'res.crane_welders': { en: 'Crane, 20 Welders', ar: 'رافعة، 20 لحام', ml: 'ക്രെയിൻ, 20 വെൽഡർമാർ' },
  'res.scaffolders': { en: '10 Scaffolders', ar: '10 عمال سقالات', ml: '10 സ്കാർഫോൾഡർമാർ' },
  'res.mech_fitters': { en: '5 Mech Fitters', ar: '5 فنيي ميكانيكا', ml: '5 മെക്കാനിക്കൽ ഫിറ്റർമാർ' },
  'res.crane_bundle': { en: 'Bundle Puller, Crane', ar: 'ساحب حزم، رافعة', ml: 'ബണ്ടിൽ പുള്ളർ, ക്രെയിൻ' },
  'res.testing_crew': { en: 'Testing Crew', ar: 'فريق الاختبار', ml: 'ടെസ്റ്റിംഗ് ക്രൂ' },
  'res.engineers': { en: '10 Process Engineers', ar: '10 مهندسي عمليات', ml: '10 പ്രോസസ്സ് എഞ്ചിനീയർമാർ' },
  'res.proc_team': { en: 'Procurement Team', ar: 'فريق المشتريات', ml: 'പ്രൊക്യുർമെന്റ് ടീം' },
  'res.welders': { en: '30 Welders', ar: '30 لحام', ml: '30 വെൽഡർമാർ' },
  'res.crane_barge': { en: 'Crane Barge', ar: 'بارجة رافعة', ml: 'ക്രെയിൻ ബാർജ്' },
  'res.hlv': { en: 'Heavy Lift Vessel', ar: 'سفينة رفع ثقيل', ml: 'ഹെവി ലിഫ്റ്റ് വെസൽ' },
  'res.hookup_crew': { en: '50 Hook-up Crew', ar: '50 عامل ربط', ml: '50 ഹുക്ക്-അപ്പ് ക്രൂ' },
  'res.piling_rig': { en: 'Piling Rig, 8 Crew', ar: 'حفارة خوازيق، 8 عمال', ml: 'പൈലിംഗ് റിഗ്, 8 ക്രൂ' },
  'res.elec_team': { en: '15 Electricians', ar: '15 كهربائي', ml: '15 ഇലക്ട്രീഷ്യൻമാർ' },
  'res.it_techs': { en: '20 IT Technicians', ar: '20 فني تكنولوجيا معلومات', ml: '20 ഐടി ടെക്നീഷ്യൻമാർ' },

  'risk.001.desc': { en: 'Late delivery of Gas Turbine Generator', ar: 'تأخر تسليم مولد التوربينات الغازية', ml: 'ഗ്യാസ് ടർബൈൻ ജനറേറ്റർ വൈകി വിതരണം ചെയ്യൽ' },
  'risk.002.desc': { en: 'Unusually severe weather during offshore installation', ar: 'طقس قاسي غير معتاد أثناء التركيب البحري', ml: 'ഓഫ്‌ഷോർ ഇൻസ്റ്റാളേഷൻ സമയത്ത് അസാധാരണമായ കഠിനമായ കാലാവസ്ഥ' },
  'risk.003.desc': { en: 'Design changes in piping isometric drawings', ar: 'تغييرات في تصميم رسومات الأنابيب', ml: 'പൈപ്പിംഗ് ഡ്രോയിംഗുകളിലെ ഡിസൈൻ മാറ്റങ്ങൾ' },
  'risk.004.desc': { en: 'Shortage of skilled 6G welders', ar: 'نقص في عمال اللحام المهرة 6G', ml: 'വിദഗ്ദ്ധരായ 6G വെൽഡർമാരുടെ കുറവ്' },
  'risk.ta1.desc': { en: 'Discovery work during internal inspection of vessel', ar: 'أعمال إضافية مكتشفة أثناء الفحص الداخلي للوعاء', ml: 'കപ്പലിന്റെ ആന്തരിക പരിശോധനയ്ക്കിടെ കണ്ടെത്തിയ ജോലികൾ' },
  'risk.ta2.desc': { en: 'Crane breakdown during bundle pulling', ar: 'عطل الرافعة أثناء سحب الحزمة', ml: 'ബണ്ടിൽ വലിക്കുന്നതിനിടെ ക്രെയിൻ തകരാർ' },
  'risk.p3.1.desc': { en: 'Delay in cryogenic steel plate delivery', ar: 'تأخير في تسليم ألواح الصلب المبردة', ml: 'ക്രയോജനിക് സ്റ്റീൽ പ്ലേറ്റ് വിതരണത്തിൽ കാലതാമസം' },
  'risk.p3.2.desc': { en: 'Soil settlement issues at tank foundation', ar: 'مشاكل هبوط التربة في أساس الخزان', ml: 'ടാങ്ക് ഫൗണ്ടേഷനിൽ മണ്ണ് സെറ്റിൽമെന്റ് പ്രശ്നങ്ങൾ' },
  'risk.p4.1.desc': { en: 'Global chip shortage delaying server racks', ar: 'نقص الرقائق العالمي يؤخر رفوف الخوادم', ml: 'ആഗോള ചിപ്പ് ക്ഷാമം സെർവർ റാക്കുകളെ വൈകിപ്പിക്കുന്നു' },
  'risk.p4.2.desc': { en: 'Cooling system integration failure during IST', ar: 'فشل تكامل نظام التبريد أثناء الاختبار', ml: 'IST സമയത്ത് കൂളിംഗ് സിസ്റ്റം ഇന്റഗ്രേഷൻ പരാജയം' },

  'dept.procurement': { en: 'Procurement', ar: 'المشتريات', ml: 'സംഭരണം' },
  'dept.construction': { en: 'Construction', ar: 'البناء', ml: 'നിർമ്മാണം' },
  'dept.engineering': { en: 'Engineering', ar: 'الهندسة', ml: 'എഞ്ചിനീയറിംഗ്' },
  'dept.hr': { en: 'HR', ar: 'الموارد البشرية', ml: 'എച്ച്.ആർ' },
  'dept.maintenance': { en: 'Maintenance', ar: 'الصيانة', ml: 'അറ്റകുറ്റപ്പണി' },
  'dept.hse': { en: 'HSE', ar: 'الصحة والسلامة', ml: 'എച്ച്.എസ്.ഇ' },

  'delay.001.desc': { en: 'Client delayed approval of IFC drawings for Topside', ar: 'تأخر العميل في الموافقة على رسومات IFC', ml: 'IFC ഡ്രോയിംഗുകൾക്ക് ക്ലയന്റ് അംഗീകാരം വൈകിപ്പിച്ചു' },
  'delay.002.desc': { en: 'Subcontractor mobilization delay', ar: 'تأخر تعبئة المقاول الباطن', ml: 'ഉപകരാറുകാരന്റെ മൊബിലൈസേഷൻ കാലതാമസം' },
  'delay.003.desc': { en: 'Force Majeure: Cyclone impact on yard', ar: 'قوة قاهرة: تأثير الإعصار على الساحة', ml: 'ഫോഴ്സ് مജ്യൂർ: യാർഡിൽ ചുഴലിക്കാറ്റിന്റെ ആഘാതം' },
  'delay.ta1.desc': { en: 'Delay in issuing confined space entry permit', ar: 'تأخير في إصدار تصريح دخول الأماكن المغلقة', ml: 'കൺഫൈൻഡ് സ്പേസ് എൻട്രി പെർമിറ്റ് നൽകുന്നതിൽ കാലതാമസം' },
  'delay.p3.1.desc': { en: 'Customs clearance delay for cryogenic valves', ar: 'تأخير التخليص الجمركي للصمامات المبردة', ml: 'ക്രയോജനിക് വാൽവുകൾക്കുള്ള കസ്റ്റംസ് ക്ലിയറൻസ് കാലതാമസം' },

  'proc.item.1': { en: 'Gas Turbine Generator', ar: 'مولد توربينات غازية', ml: 'ഗ്യാസ് ടർബൈൻ ജനറേറ്റർ' },
  'proc.item.2': { en: 'Structural Steel (500T)', ar: 'هيكل حديدي (500 طن)', ml: 'സ്ട്രക്ചറൽ സ്റ്റീൽ (500T)' },
  'proc.item.3': { en: 'Control Valves', ar: 'صمامات التحكم', ml: 'കൺട്രോൾ വാൽവുകൾ' },
  'proc.item.4': { en: 'Subsea Cables', ar: 'كابلات بحرية', ml: 'സബ്സീ കേബിളുകൾ' },
};

export const getTranslation = (key: string, lang: Language): string => {
  return TRANSLATIONS[key]?.[lang] || TRANSLATIONS[key]?.['en'] || key;
};