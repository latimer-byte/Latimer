import { useState, useEffect, useCallback, useRef } from 'react';

const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089';

export interface Tick {
  symbol: string;
  quote: number;
  epoch: number;
  id: string;
}

export interface ActiveSymbol {
  symbol: string;
  display_name: string;
  market_display_name: string;
  submarket_display_name: string;
}

export interface Position {
  contract_id: number;
  symbol: string;
  buy_price: number;
  entry_tick: number;
  contract_type: string;
  status: 'open' | 'won' | 'lost';
  payout?: number;
}

export function useDeriv() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [ticks, setTicks] = useState<Record<string, Tick[]>>({});
  const [activeSymbols, setActiveSymbols] = useState<ActiveSymbol[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const subscriptions = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ws = new WebSocket(DERIV_WS_URL);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      ws.send(JSON.stringify({ active_symbols: 'brief', product_type: 'basic' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error.message);
        return;
      }

      switch (data.msg_type) {
        case 'active_symbols':
          setActiveSymbols(data.active_symbols);
          break;
        case 'authorize':
          setIsAuthorized(true);
          setAccount(data.authorize);
          // Subscribe to portfolio/proposals if needed
          break;
        case 'tick':
          const tick = data.tick;
          setTicks((prev) => {
            const symbolTicks = prev[tick.symbol] || [];
            const newTicks = [...symbolTicks, {
              symbol: tick.symbol,
              quote: tick.quote,
              epoch: tick.epoch,
              id: tick.id
            }].slice(-100);
            return { ...prev, [tick.symbol]: newTicks };
          });
          break;
        case 'buy':
          const buyInfo = data.buy;
          setPositions(prev => [...prev, {
            contract_id: buyInfo.contract_id,
            symbol: buyInfo.shortcode.split('_')[1],
            buy_price: buyInfo.buy_price,
            entry_tick: buyInfo.start_time,
            contract_type: buyInfo.shortcode.split('_')[0],
            status: 'open'
          }]);
          break;
        case 'proposal':
          // Automatically buy the proposal for now (MVP behavior)
          if (data.proposal && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
              buy: data.proposal.id,
              price: data.proposal.ask_price
            }));
          }
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setIsAuthorized(false);
      setSocket(null);
    };

    ws.onerror = () => {
      setError('WebSocket connection error');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const authorize = useCallback((token: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ authorize: token }));
    }
  }, [socket]);

  const subscribeToTick = useCallback((symbol: string) => {
    if (socket && socket.readyState === WebSocket.OPEN && !subscriptions.current.has(symbol)) {
      socket.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
      subscriptions.current.add(symbol);
    }
  }, [socket]);

  const unsubscribeFromTick = useCallback((symbol: string) => {
    if (socket && socket.readyState === WebSocket.OPEN && subscriptions.current.has(symbol)) {
      socket.send(JSON.stringify({ forget_all: 'ticks' }));
      subscriptions.current.delete(symbol);
    }
  }, [socket]);

  const placeTrade = useCallback((symbol: string, amount: number, type: 'CALL' | 'PUT') => {
    if (!isAuthorized || !socket) return;
    
    // First get a proposal
    socket.send(JSON.stringify({
      proposal: 1,
      amount: amount,
      basis: 'stake',
      contract_type: type,
      currency: 'USD',
      duration: 5,
      duration_unit: 't',
      symbol: symbol
    }));

    // Listen for proposal and buy (simplified for MVP: we'll handle the buy in a real app by waiting for proposal ID)
    // For now, we'll assume the user wants to buy immediately if they click.
    // In a real implementation, we'd wait for the proposal response then send 'buy'.
    // Let's add a listener for proposal in the main useEffect.
  }, [isAuthorized, socket]);

  return {
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
  };
}
