import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, CheckCircle2, AlertCircle } from "lucide-react";

interface AuthPanelProps {
  onAuthorize: (token: string) => void;
  isAuthorized: boolean;
  account: any;
}

export function AuthPanel({ onAuthorize, isAuthorized, account }: AuthPanelProps) {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onAuthorize(token.trim());
    }
  };

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader className="border-b border-zinc-800 bg-zinc-900/50 py-3">
        <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2 text-zinc-400">
          <Key className="w-4 h-4 text-orange-500" />
          Account Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isAuthorized ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-xs font-bold text-green-500 font-mono">AUTHORIZED</div>
                <div className="text-[10px] text-zinc-400 font-mono uppercase">{account?.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                <div className="text-[9px] text-zinc-500 uppercase font-mono">Balance</div>
                <div className="text-sm font-bold text-white font-mono">${account?.balance || '0.00'}</div>
              </div>
              <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                <div className="text-[9px] text-zinc-500 uppercase font-mono">Currency</div>
                <div className="text-sm font-bold text-white font-mono">{account?.currency}</div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Deriv API Token</label>
                <a 
                  href="https://app.deriv.com/account/api-token" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[9px] text-orange-500 hover:underline font-mono"
                >
                  Get Token →
                </a>
              </div>
              <Input 
                type="password" 
                placeholder="Enter your API token..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-zinc-900 border-zinc-800 font-mono text-white focus-visible:ring-orange-500"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-mono uppercase tracking-widest text-xs h-10">
              Authorize Account
            </Button>
            <div className="flex items-start gap-2 p-2 bg-zinc-900/50 rounded border border-zinc-800">
              <AlertCircle className="w-3 h-3 text-zinc-500 mt-0.5" />
              <p className="text-[9px] text-zinc-500 leading-tight">
                Your token is only used for this session and is not stored on any server.
              </p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
