import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

interface TradeControlsProps {
  symbol: string;
  lastPrice: number | undefined;
  onTrade: (symbol: string, amount: number, type: 'CALL' | 'PUT') => void;
  isAuthorized: boolean;
}

export function TradeControls({ symbol, lastPrice, onTrade, isAuthorized }: TradeControlsProps) {
  const [amount, setAmount] = useState("10");

  return (
    <div className="space-y-6 bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500">
          <Wallet className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest font-mono">Demo Balance</span>
        </div>
        <span className="text-sm font-bold font-mono text-white">$10,000.00</span>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Stake Amount (USD)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">$</span>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="bg-zinc-900 border-zinc-800 pl-7 font-mono text-white focus-visible:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          disabled={!isAuthorized}
          className="h-16 bg-green-600 hover:bg-green-500 text-white flex flex-col gap-1 group disabled:opacity-50"
          onClick={() => onTrade(symbol, parseFloat(amount), 'CALL')}
        >
          <ArrowUpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Rise</span>
        </Button>
        <Button 
          disabled={!isAuthorized}
          className="h-16 bg-red-600 hover:bg-red-500 text-white flex flex-col gap-1 group disabled:opacity-50"
          onClick={() => onTrade(symbol, parseFloat(amount), 'PUT')}
        >
          <ArrowDownCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Fall</span>
        </Button>
      </div>

      <div className="pt-4 border-t border-zinc-800">
        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          <span>Payout</span>
          <span className="text-green-500">95.2%</span>
        </div>
        <div className="flex justify-between text-sm font-mono text-white mt-1">
          <span>Potential Profit</span>
          <span className="text-green-500">+${(parseFloat(amount || "0") * 0.952).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
