import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, TrendingUp, TrendingDown } from "lucide-react";

export function History() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Trade History</h2>
          <p className="text-zinc-500 text-sm">Review your past performance and trading activity.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 text-zinc-400 p-2 rounded-lg hover:text-white transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Card className="glass-panel border-white/5">
        <CardHeader className="border-b border-white/5 p-4 flex flex-row items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-zinc-900 border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-amber transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                  <th className="p-4 font-bold">Asset</th>
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Stake</th>
                  <th className="p-4 font-bold">Entry Price</th>
                  <th className="p-4 font-bold">Exit Price</th>
                  <th className="p-4 font-bold">Profit/Loss</th>
                  <th className="p-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { asset: 'Volatility 100', type: 'Rise', stake: '$50.00', entry: '1,245.32', exit: '1,248.10', pl: '+$47.50', date: '2023-10-24 14:22' },
                  { asset: 'Gold (XAUUSD)', type: 'Fall', stake: '$100.00', entry: '1,982.45', exit: '1,985.20', pl: '-$100.00', date: '2023-10-24 12:15' },
                  { asset: 'BTC/USD', type: 'Rise', stake: '$25.00', entry: '34,210.00', exit: '34,255.00', pl: '+$23.75', date: '2023-10-23 22:10' },
                  { asset: 'Volatility 10', type: 'Rise', stake: '$10.00', entry: '6,742.11', exit: '6,745.50', pl: '+$9.50', date: '2023-10-23 18:45' },
                ].map((trade, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="text-sm font-bold text-white">{trade.asset}</div>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center gap-1.5 text-xs font-mono ${trade.type === 'Rise' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.type === 'Rise' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trade.type}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-mono text-zinc-300">{trade.stake}</td>
                    <td className="p-4 text-sm font-mono text-zinc-300">{trade.entry}</td>
                    <td className="p-4 text-sm font-mono text-zinc-300">{trade.exit}</td>
                    <td className="p-4">
                      <div className={`text-sm font-mono font-bold ${trade.pl.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.pl}
                      </div>
                    </td>
                    <td className="p-4 text-[10px] font-mono text-zinc-500">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
