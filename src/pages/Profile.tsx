import React from 'react';
import { AuthPanel } from '@/components/AuthPanel';
import { useDeriv } from '@/hooks/useDeriv';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Settings, Globe, Bell } from "lucide-react";

export function Profile() {
  const { authorize, isAuthorized, account } = useDeriv();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-amber flex items-center justify-center text-brand-earth">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <p className="text-zinc-500 text-sm">Manage your Deriv connection and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <AuthPanel 
            onAuthorize={authorize} 
            isAuthorized={isAuthorized} 
            account={account} 
          />

          <Card className="glass-panel border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Trading Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <div className="text-sm font-bold text-white">Default Currency</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Select your local currency</div>
                </div>
                <select className="bg-zinc-900 border-zinc-800 text-xs font-mono rounded px-2 py-1 text-white">
                  <option>USD</option>
                  <option>KES</option>
                  <option>NGN</option>
                  <option>ZAR</option>
                  <option>GHS</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <div className="text-sm font-bold text-white">One-Click Trading</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Place trades without confirmation</div>
                </div>
                <div className="w-10 h-5 bg-brand-amber rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-sm font-bold text-white">Two-Factor Auth</div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Not Enabled</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-sm font-bold text-white">API Permissions</div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">View Scopes</div>
              </button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">Trade Alerts</span>
                <div className="w-8 h-4 bg-zinc-800 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">Price Alerts</span>
                <div className="w-8 h-4 bg-brand-amber rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
