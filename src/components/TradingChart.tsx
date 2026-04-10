import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Tick } from '@/src/hooks/useDeriv';
import { format } from 'date-fns';

interface TradingChartProps {
  ticks: Tick[];
  symbolName: string;
}

export function TradingChart({ ticks, symbolName }: TradingChartProps) {
  const data = useMemo(() => {
    return ticks.map(t => ({
      time: format(new Date(t.epoch * 1000), 'HH:mm:ss'),
      price: t.quote,
      timestamp: t.epoch
    }));
  }, [ticks]);

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const padding = (maxPrice - minPrice) * 0.1;

  const lastPrice = data[data.length - 1]?.price;

  return (
    <div className="w-full h-[400px] bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative overflow-hidden">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">Live Price</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-white">
            {lastPrice?.toFixed(4) || '---'}
          </span>
          <span className="text-xs text-zinc-500 font-mono">{symbolName}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 60, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            domain={[minPrice - padding, maxPrice + padding]} 
            orientation="right"
            tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => val.toFixed(2)}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
            itemStyle={{ color: '#f4f4f5', fontFamily: 'monospace', fontSize: '12px' }}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#f97316" 
            strokeWidth={2} 
            dot={false}
            animationDuration={300}
            isAnimationActive={false}
          />
          {lastPrice && (
            <ReferenceLine 
              y={lastPrice} 
              stroke="#f97316" 
              strokeDasharray="3 3" 
              label={{ 
                position: 'right', 
                value: lastPrice.toFixed(4), 
                fill: '#f97316', 
                fontSize: 10, 
                fontFamily: 'monospace',
                backgroundColor: '#000'
              }} 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
