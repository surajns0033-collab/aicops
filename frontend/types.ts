export type Language = 'en' | 'ar' | 'ml';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  username: string;
  password?: string; // Mock only
  name: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  type: 'EPC' | 'Turnaround' | 'Infrastructure' | 'Technology';
}

export interface WBSItem {
  id: string;
  nameKey: string;
  level: number;
  parentId?: string;
}

export interface WallpaperSetting {
  type: 'preset' | 'color' | 'image';
  value: string;
}

export interface AppState {
  language: Language;
  theme: Theme;
  activeModule: string;
  isSidebarOpen: boolean;
  isCopilotOpen: boolean;
  searchQuery: string;
  selectedProjectId: string;
  uploadedData: ProjectData | null;
  currentUser: User | null;
  settings: {
    offlineMode: boolean;
    notifications: boolean;
    autoSync: boolean;
    wallpaper: WallpaperSetting;
  };
}

export interface AppNotification {
  id: string;
  titleKey: string;
  messageKey: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'critical';
}

export interface ConstructionArea {
  areaKey: string;
  progress: number;
  status: 'On Track' | 'Ahead' | 'Delayed';
}

export interface BurnDataPoint {
  period: string;
  plannedScope: number;
  actualCompleted: number;
  idealRemaining: number;
  actualRemaining: number;
}

export interface TornadoDataPoint {
  nameKey: string;
  negativeImpact: number; // Cost or Time decrease (opportunity)
  positiveImpact: number; // Cost or Time increase (risk)
}

export interface ProjectData {
  kpis: KPI[];
  sCurve: ChartDataPoint[];
  combinedData: CombinedChartDataPoint[];
  evmData: EVMDataPoint[];
  wbs: WBSItem[];
  activities: ActivityItem[];
  risks: RiskItem[];
  delays: DelayEvent[];
  constructionAreas: ConstructionArea[];
  burnData: BurnDataPoint[];
  tornadoData: TornadoDataPoint[];
}

export interface BaseModuleProps {
  language: Language;
  searchQuery: string;
  projectData: ProjectData;
}

export interface KPI {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  planned: number;
  actual: number;
  forecast?: number;
}

export interface CombinedChartDataPoint {
  period: string;
  plannedInc: number;
  actualInc?: number;
  plannedCum: number;
  actualCum?: number;
}

export interface EVMDataPoint {
  month: string;
  pv: number;
  ev: number;
  ac: number;
}

export interface RiskItem {
  id: string;
  descriptionKey: string;
  probability: number;
  impact: number;
  status: 'Open' | 'Mitigated' | 'Closed';
  ownerKey: string;
}

export interface DelayEvent {
  id: string;
  descriptionKey: string;
  days: number;
  type: 'Excusable' | 'Non-Excusable' | 'Concurrent';
  status: 'Identified' | 'Claim Drafted' | 'Submitted' | 'Approved';
}

export interface ActivityItem {
  id: string;
  wbsId: string;
  descKey: string;
  start: string;
  finish: string;
  resKey: string;
  daysOut: number;
  bl1Start?: string;
  bl1Finish?: string;
  bl2Start?: string;
  bl2Finish?: string;
  progress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Dictionary {
  [key: string]: {
    [lang in Language]: string;
  };
}