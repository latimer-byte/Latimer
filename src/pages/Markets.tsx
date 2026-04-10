import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Globe, TrendingUp, TrendingDown, Star } from "lucide-react";

export function Markets() {
  const categories = ['All', 'Synthetics', 'Forex', 'Stock Indices', 'Commodities', 'Cryptocurrencies'];
  
  const markets = [
    { name: 'Volatility 100 Index', category: 'Synthetics', price: '1,245.32', change: '+2.4%', trend: 'up' },
    { name: 'Volatility 10 Index', category: 'Synthetics', price: '6,742.11', change: '-0.8%', trend: 'down' },
    { name: 'EUR/USD', category: 'Forex', price: '1.0542', change: '+0.12%', trend: 'up' },
    { name: 'Gold (XAUUSD)', category: 'Commodities', price: '1,982.45', change: '+1.5%', trend: 'up' },
    { name: 'BTC/USD', category: 'Cryptocurrencies', price: '34,210.00', change: '-2.1%', trend: 'down' },
    { name: 'US Tech 100', category: 'Stock Indices', price: '14,820.50', change: '+0.9%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Market Overview</h2>
          <p className="text-zinc-500 text-sm">Explore global markets and synthetic indices.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search markets..." 
            className="w-full bg-zinc-900 border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-amber transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              cat === 'All' ? 'bg-brand-amber text-brand-earth' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map((market, i) => (
          <Card key={i} className="glass-panel border-white/5 hover:border-brand-amber/30 transition-all group cursor-pointer">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 text-brand-amber">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-brand-amber transition-colors">{market.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">{market.category}</div>
                  </div>
                </div>
                <button className="text-zinc-600 hover:text-brand-amber transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold text-white font-mono">{market.price}</div>
                  <div className={`text-[10px] font-mono flex items-center gap-1 ${
                    market.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {market.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {market.change}
                  </div>
                </div>
                <div className="h-10 w-24 bg-white/5 rounded relative overflow-hidden">
                  {/* Sparkline placeholder */}
                  <div className={`absolute inset-0 opacity-20 ${
                    market.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} style={{ clipPath: 'polygon(0 100%, 20% 80%, 40% 90%, 60% 40%, 80% 60%, 100% 0, 100% 100%)' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
