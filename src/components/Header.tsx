import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, LayoutDashboard, TrendingUp, Wallet, History, Globe, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isConnected: boolean;
}

export function Header({ isConnected }: HeaderProps) {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Trade', path: '/trade', icon: TrendingUp },
    { label: 'Markets', path: '/markets', icon: Globe },
    { label: 'Funds', path: '/funds', icon: Wallet },
    { label: 'History', path: '/history', icon: History },
  ];

  return (
    <header className="border-b border-white/5 bg-brand-earth/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-amber p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap className="w-5 h-5 text-brand-earth fill-current" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white">
              AFRI<span className="text-brand-amber">TRADE</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive 
                      ? 'bg-brand-amber/10 text-brand-amber' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
            <Badge variant={isConnected ? "outline" : "destructive"} className="font-mono text-[10px] uppercase tracking-widest border-white/10">
              {isConnected ? 'Live' : 'Offline'}
            </Badge>
          </div>
          
          <Link 
            to="/profile" 
            className={`p-2 rounded-full transition-colors ${
              location.pathname === '/profile' ? 'bg-brand-amber text-brand-earth' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
