import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Smartphone, Landmark, CreditCard, Bitcoin, ArrowRight } from "lucide-react";

export function Funds() {
  const methods = [
    { name: 'M-Pesa', icon: Smartphone, color: 'text-green-600', desc: 'Instant deposit/withdraw' },
    { name: 'MTN MoMo', icon: Smartphone, color: 'text-yellow-500', desc: 'Instant mobile money' },
    { name: 'Bank Transfer', icon: Landmark, color: 'text-blue-500', desc: 'Local bank transfers' },
    { name: 'Card', icon: CreditCard, color: 'text-brand-amber', desc: 'Visa/Mastercard' },
    { name: 'Crypto', icon: Bitcoin, color: 'text-orange-500', desc: 'BTC, ETH, USDT' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Fund Management</h2>
        <p className="text-zinc-500 text-sm">Deposit or withdraw funds using local African payment methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-white/5">
          <CardHeader className="border-b border-white/5 py-4">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400">Deposit Funds</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {methods.map((method) => (
              <button key={method.name} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${method.color}`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">{method.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">{method.desc}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-amber transition-colors" />
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-panel border-white/5 bg-brand-amber/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-brand-amber">Current Balance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-white font-mono">$12,450.00</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Available for withdrawal</div>
              <button className="w-full mt-6 bg-brand-amber text-brand-earth py-3 rounded-xl font-bold text-sm hover:bg-brand-amber/90 transition-colors">
                Withdraw Now
              </button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  { type: 'Deposit', method: 'M-Pesa', amount: '+$500.00', date: 'Oct 24, 2023' },
                  { type: 'Withdraw', method: 'Bank', amount: '-$1,200.00', date: 'Oct 20, 2023' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white">{tx.type} via {tx.method}</div>
                      <div className="text-[10px] text-zinc-500 font-mono uppercase">{tx.date}</div>
                    </div>
                    <div className={`text-sm font-mono font-bold ${tx.amount.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
