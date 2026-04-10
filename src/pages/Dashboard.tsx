import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Clock, Zap } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', balance: 4000 },
  { name: 'Tue', balance: 3000 },
  { name: 'Wed', balance: 5000 },
  { name: 'Thu', balance: 4500 },
  { name: 'Fri', balance: 6000 },
  { name: 'Sat', balance: 5500 },
  { name: 'Sun', balance: 7000 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Habari, Trader!</h2>
          <p className="text-zinc-500 text-sm">Welcome back to your AfriTrade command center.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-brand-amber text-brand-earth px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-amber/90 transition-colors">
            <Zap className="w-4 h-4 fill-current" />
            Quick Trade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Balance', value: '$12,450.00', icon: Wallet, color: 'text-brand-amber', trend: '+12%' },
          { label: 'Active Trades', value: '3', icon: TrendingUp, color: 'text-green-500', trend: 'Live' },
          { label: 'Weekly Profit', value: '+$1,240.00', icon: ArrowUpRight, color: 'text-green-500', trend: '+8%' },
          { label: 'Success Rate', value: '68%', icon: Zap, color: 'text-brand-amber', trend: 'Stable' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-panel border-white/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    stat.trend.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-brand-amber/10 text-brand-amber'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 glass-panel border-white/5">
          <CardHeader className="border-b border-white/5 py-4">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1917', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '10px' }}
                    itemStyle={{ color: '#D97706' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#D97706" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 glass-panel border-white/5">
          <CardHeader className="border-b border-white/5 py-4">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[
                { type: 'Buy', asset: 'Volatility 100', amount: '$50.00', status: 'Profit', time: '2m ago', profit: '+$47.50' },
                { type: 'Sell', asset: 'Gold (XAUUSD)', amount: '$100.00', status: 'Loss', time: '15m ago', profit: '-$100.00' },
                { type: 'Buy', asset: 'BTC/USD', amount: '$25.00', status: 'Profit', time: '1h ago', profit: '+$23.75' },
                { type: 'Deposit', asset: 'M-Pesa', amount: '$500.00', status: 'Success', time: '3h ago', profit: '' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded bg-white/5 ${
                      item.status === 'Profit' ? 'text-green-500' : 
                      item.status === 'Loss' ? 'text-red-500' : 'text-brand-amber'
                    }`}>
                      {item.type === 'Buy' ? <TrendingUp className="w-4 h-4" /> : 
                       item.type === 'Sell' ? <TrendingDown className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{item.asset}</div>
                      <div className="text-[10px] text-zinc-500 font-mono uppercase flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {item.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">{item.amount}</div>
                    <div className={`text-[10px] font-mono ${
                      item.profit.includes('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.profit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
