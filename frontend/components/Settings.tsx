import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getTranslation, WALLPAPERS } from '../constants';
import { AppState } from '../types';
import * as Icons from 'lucide-react';

interface SettingsProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const Settings: React.FC<SettingsProps> = ({ state, setState }) => {
  const { language, settings, currentUser } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'wallpaper') return;
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !prev.settings[key]
      }
    }));
  };

  const setWallpaperPreset = (wpId: string) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        wallpaper: { type: 'preset', value: wpId }
      }
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        wallpaper: { type: 'color', value: e.target.value }
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setState(prev => ({
            ...prev,
            settings: {
              ...prev.settings,
              wallpaper: { type: 'image', value: event.target!.result as string }
            }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTranslation('nav.settings', language)}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure AIPCOS architecture, integrations, and profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile & About Me */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.User className="h-5 w-5 text-brand-500" />
              User Profile & About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
                {currentUser?.avatar || 'U'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{currentUser?.name || 'User'}</h3>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">{currentUser?.role || 'Role'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
                  15+ years of experience in offshore, EPC, and infrastructure projects. Expert in Primavera P6, Earned Value Management (EVM), Delay Analysis, and AI-driven project forecasting. Passionate about leveraging technology to deliver projects on time and under budget.
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Icons.Mail className="h-4 w-4" /> {currentUser?.username}@aipcos.com
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Icons.MapPin className="h-4 w-4" /> Global
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                Edit Profile
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Personalization (Wallpaper) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Palette className="h-5 w-5 text-brand-500" />
              Personalization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Background Wallpaper</p>
            
            {/* Presets */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {WALLPAPERS.map(wp => (
                <div 
                  key={wp.id}
                  onClick={() => setWallpaperPreset(wp.id)}
                  className={`
                    relative h-20 rounded-xl border-2 cursor-pointer overflow-hidden transition-all
                    ${settings.wallpaper.type === 'preset' && settings.wallpaper.value === wp.id ? 'border-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.3)]' : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'}
                  `}
                >
                  <div className={`absolute inset-0 ${wp.class}`}></div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold drop-shadow-md">{getTranslation(wp.nameKey, language)}</span>
                  </div>
                  {settings.wallpaper.type === 'preset' && settings.wallpaper.value === wp.id && (
                    <div className="absolute top-1 right-1 bg-brand-500 rounded-full p-0.5">
                      <Icons.Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Options */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">{getTranslation('wp.color', language)}</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={settings.wallpaper.type === 'color' ? settings.wallpaper.value : '#0b0f19'}
                    onChange={handleColorChange}
                    className="h-10 w-full rounded cursor-pointer border-0 p-0"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">{getTranslation('wp.image', language)}</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-10 w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <Icons.Upload className="h-4 w-4" /> Upload
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Sliders className="h-5 w-5 text-brand-500" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => toggleSetting('offlineMode')}>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Offline-First Mode</p>
                <p className="text-xs text-slate-500">Process XER/XML files locally without server.</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors relative ${settings.offlineMode ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.offlineMode ? 'left-5' : 'left-1'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => toggleSetting('notifications')}>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Push Notifications</p>
                <p className="text-xs text-slate-500">Receive alerts for critical delays and risks.</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors relative ${settings.notifications ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications ? 'left-5' : 'left-1'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => toggleSetting('autoSync')}>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Auto-Sync to Cloud</p>
                <p className="text-xs text-slate-500">Automatically backup data when online.</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors relative ${settings.autoSync ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.autoSync ? 'left-5' : 'left-1'}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};