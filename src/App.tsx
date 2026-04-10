import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Trade } from './pages/Trade';
import { Markets } from './pages/Markets';
import { Funds } from './pages/Funds';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { useDeriv } from './hooks/useDeriv';

export default function App() {
  const { isConnected } = useDeriv();

  return (
    <Router>
      <div className="min-h-screen bg-brand-earth text-zinc-100 font-sans selection:bg-brand-amber/30">
        <Header isConnected={isConnected} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <footer className="border-t border-white/5 py-12 mt-12 bg-zinc-950/20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">Secure</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">Regulated</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">African First</div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-mono">
              AfriTrade • The Future of African Trading • Powered by Deriv & Gemini
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
