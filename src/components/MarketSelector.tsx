import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveSymbol } from "@/hooks/useDeriv";

interface MarketSelectorProps {
  symbols: ActiveSymbol[];
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}

export function MarketSelector({ symbols, selectedSymbol, onSelect }: MarketSelectorProps) {
  // Group symbols by market
  const markets = symbols.reduce((acc, symbol) => {
    const market = symbol.market_display_name;
    if (!acc[market]) acc[market] = [];
    acc[market].push(symbol);
    return acc;
  }, {} as Record<string, ActiveSymbol[]>);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Select Market</label>
      <Select value={selectedSymbol} onValueChange={onSelect}>
        <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white font-mono">
          <SelectValue placeholder="Choose a symbol" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[300px]">
          {Object.entries(markets).map(([market, syms]) => (
            <div key={market}>
              <div className="px-2 py-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-bold bg-zinc-950/50">
                {market}
              </div>
              {(syms as ActiveSymbol[]).map((s) => (
                <SelectItem key={s.symbol} value={s.symbol} className="font-mono text-sm">
                  {s.display_name}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
