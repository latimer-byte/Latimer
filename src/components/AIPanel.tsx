import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react";
import { analyzeMarket } from "@/src/services/gemini";
import { Tick } from "@/src/hooks/useDeriv";
import { motion, AnimatePresence } from "motion/react";

interface AIPanelProps {
  symbol: string;
  ticks: Tick[];
}

export function AIPanel({ symbol, ticks }: AIPanelProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performAnalysis = async () => {
    if (ticks.length < 5) return;
    setIsAnalyzing(true);
    const result = await analyzeMarket(symbol, ticks.slice(-20));
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    // Initial analysis
    if (ticks.length >= 10 && !analysis && !isAnalyzing) {
      performAnalysis();
    }
  }, [ticks.length]);

  const getSentiment = () => {
    if (!analysis) return 'Neutral';
    if (analysis.toLowerCase().includes('bullish')) return 'Bullish';
    if (analysis.toLowerCase().includes('bearish')) return 'Bearish';
    return 'Neutral';
  };

  const sentiment = getSentiment();

  return (
    <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
      <CardHeader className="border-b border-zinc-800 bg-zinc-900/50 py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2 text-zinc-400">
          <Sparkles className="w-4 h-4 text-orange-500" />
          Gemini AI Analysis
        </CardTitle>
        <button 
          onClick={performAnalysis}
          disabled={isAnalyzing || ticks.length < 5}
          className="text-[10px] uppercase tracking-widest font-bold text-orange-500 hover:text-orange-400 disabled:opacity-50 transition-colors"
        >
          {isAnalyzing ? 'Analyzing...' : 'Refresh'}
        </button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Sentiment</span>
          <Badge 
            className={`font-mono text-[10px] uppercase tracking-widest ${
              sentiment === 'Bullish' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
              sentiment === 'Bearish' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
              'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
            }`}
          >
            {sentiment === 'Bullish' && <TrendingUp className="w-3 h-3 mr-1" />}
            {sentiment === 'Bearish' && <TrendingDown className="w-3 h-3 mr-1" />}
            {sentiment === 'Neutral' && <Minus className="w-3 h-3 mr-1" />}
            {sentiment}
          </Badge>
        </div>

        <div className="min-h-[100px] relative">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500"
              >
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Processing Market Vibe...</span>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-zinc-300 leading-relaxed font-sans"
              >
                {analysis || "Waiting for more market data to provide a vibe check..."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
