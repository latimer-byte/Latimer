import React, { useState, useEffect } from 'react';
import { MarketSelector } from '@/components/MarketSelector';
import { TradingChart } from '@/components/TradingChart';
import { AIPanel } from '@/components/AIPanel';
import { TradeControls } from '@/components/TradeControls';
import { PositionsPanel } from '@/components/PositionsPanel';
import { useDeriv } from '@/hooks/useDeriv';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

export function Trade() {
  const {
    isConnected,
    isAuthorized,
    account,
    activeSymbols,
    ticks,
    positions,
    error,
    authorize,
    subscribeToTick,
    unsubscribeFromTick,
    placeTrade
  } = useDeriv();

  const [selectedSymbol, setSelectedSymbol] = useState('R_100');

  useEffect(() => {
    if (isConnected) {
      subscribeToTick(selectedSymbol);
    }
    return () => {
      unsubscribeFromTick(selectedSymbol);
    };
  }, [isConnected, selectedSymbol, subscribeToTick, unsubscribeFromTick]);

  const currentTicks = ticks[selectedSymbol] || [];
  const symbolInfo = activeSymbols.find(s => s.symbol === selectedSymbol);

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-mono text-xs uppercase tracking-wider">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {!isAuthorized && (
        <Alert className="bg-brand-amber/10 border-brand-amber/20 text-brand-amber">
          <Info className="h-4 w-4" />
          <AlertDescription className="font-mono text-xs uppercase tracking-wider">
            Account not authorized. Please go to Profile to connect your Deriv API token.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Market & Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 glass-panel p-4 rounded-xl border-white/5">
            <div className="flex-1 max-w-xs">
              <MarketSelector 
                symbols={activeSymbols} 
                selectedSymbol={selectedSymbol} 
                onSelect={setSelectedSymbol} 
              />
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Market Status</div>
                <div className="text-sm font-bold text-green-500 font-mono">OPEN</div>
              </div>
            </div>
          </div>

          <TradingChart 
            ticks={currentTicks} 
            symbolName={symbolInfo?.display_name || selectedSymbol} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIPanel symbol={selectedSymbol} ticks={currentTicks} />
            <PositionsPanel positions={positions} />
          </div>
        </div>

        {/* Right Column: Trade Controls */}
        <div className="lg:col-span-4 space-y-6">
          <TradeControls 
            symbol={selectedSymbol} 
            lastPrice={currentTicks[currentTicks.length - 1]?.quote} 
            onTrade={placeTrade}
            isAuthorized={isAuthorized}
          />

          <div className="glass-panel border-white/5 rounded-xl p-4">
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-3">Market Intelligence</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">Volatility Index</span>
                <span className="text-white">High</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">Trend Strength</span>
                <span className="text-brand-amber">Strong Bullish</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">AI Confidence</span>
                <span className="text-green-500">84%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
