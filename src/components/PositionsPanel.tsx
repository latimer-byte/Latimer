import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Position } from "@/hooks/useDeriv";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, TrendingUp, TrendingDown, Clock } from "lucide-react";

interface PositionsPanelProps {
  positions: Position[];
}

export function PositionsPanel({ positions }: PositionsPanelProps) {
  return (
    <Card className="bg-zinc-950 border-zinc-800 h-full flex flex-col">
      <CardHeader className="border-b border-zinc-800 bg-zinc-900/50 py-3">
        <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2 text-zinc-400">
          <History className="w-4 h-4 text-orange-500" />
          Active Positions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[300px]">
          {positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-zinc-600">
              <Clock className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-[10px] uppercase tracking-widest font-mono">No active trades</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-900">
              {positions.map((pos) => (
                <div key={pos.contract_id} className="p-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${pos.contract_type === 'CALL' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      {pos.contract_type === 'CALL' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{pos.symbol}</div>
                      <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">
                        ID: {pos.contract_id}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs font-bold text-white font-mono">${pos.buy_price.toFixed(2)}</div>
                    <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest border-zinc-800 text-zinc-400">
                      {pos.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
