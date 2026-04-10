import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarketSelector } from './components/MarketSelector';
import { TradingChart } from './components/TradingChart';
import { AIPanel } from './components/AIPanel';
import { TradeControls } from './components/TradeControls';
import { PositionsPanel } from './components/PositionsPanel';
import { AuthPanel } from './components/AuthPanel';
import { useDeriv } from './hooks/useDeriv';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function App() {
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
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30">
      <Header isConnected={isConnected} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-mono text-xs uppercase tracking-wider">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Market & Chart */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
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

          {/* Right Column: Auth & Controls */}
          <div className="lg:col-span-4 space-y-6">
            <AuthPanel 
              onAuthorize={authorize} 
              isAuthorized={isAuthorized} 
              account={account} 
            />
            
            <TradeControls 
              symbol={selectedSymbol} 
              lastPrice={currentTicks[currentTicks.length - 1]?.quote} 
              onTrade={placeTrade}
              isAuthorized={isAuthorized}
            />

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-3">Market Intelligence</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Volatility Index</span>
                  <span className="text-white">High</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Trend Strength</span>
                  <span className="text-orange-500">Strong Bullish</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">AI Confidence</span>
                  <span className="text-green-500">84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-mono">
            MarketMosaic AI • Powered by Deriv API & Gemini 3.0
          </p>
        </div>
      </footer>
    </div>
  );
}
