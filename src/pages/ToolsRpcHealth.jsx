import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Zap, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ToolsRpcHealth() {
  const { data: configs } = useQuery({
    queryKey: ['networkConfig'],
    queryFn: () => base44.entities.NetworkConfig.list(),
  });

  const config = configs?.[0];
  const [rpcStatuses, setRpcStatuses] = useState([]);
  const [serverRpcStatuses, setServerRpcStatuses] = useState([]);
  const [wsStatuses, setWsStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverLoading, setServerLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [checkMode, setCheckMode] = useState('browser');

  const checkRpcHealth = async () => {
    if (!config?.rpcUrls) return;

    setLoading(true);
    const results = await Promise.all(
      config.rpcUrls.map(async (url) => {
        const start = Date.now();
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_blockNumber',
              params: [],
              id: 1
            }),
            signal: AbortSignal.timeout(10000)
          });

          const latency = Date.now() - start;

          if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            let errorDetail = `HTTP ${response.status}`;

            if (response.status === 403) {
              errorDetail = 'Access Forbidden (403) - May need authentication or IP whitelisting';
            } else if (response.status === 429) {
              errorDetail = 'Rate Limited (429)';
            } else if (response.status === 502 || response.status === 503) {
              errorDetail = `Service Unavailable (${response.status})`;
            }

            return {
              url,
              status: 'offline',
              latency,
              error: errorDetail
            };
          }

          const data = await response.json();
          const blockNumber = data.result ? parseInt(data.result, 16) : null;

          return {
            url,
            status: 'online',
            latency,
            blockNumber
          };
        } catch (error) {
          const latency = Date.now() - start;
          let errorMsg = error.message;

          if (error.name === 'AbortError' || error.message.includes('timeout')) {
            errorMsg = 'Request timeout (>10s)';
          } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMsg = 'Network error - CORS or connection blocked';
          }

          return {
            url,
            status: 'offline',
            latency,
            error: errorMsg
          };
        }
      })
    );
    setRpcStatuses(results);
    setLoading(false);
  };

  const checkWsHealth = async () => {
    if (!config?.wsUrls) return;

    const results = await Promise.all(
      config.wsUrls.map(async (url) => {
        return new Promise((resolve) => {
          const start = Date.now();
          let ws;

          try {
            ws = new WebSocket(url);
          } catch (error) {
            resolve({
              url,
              status: 'failed',
              latency: Date.now() - start,
              error: 'WebSocket creation failed'
            });
            return;
          }

          const timeout = setTimeout(() => {
            ws.close();
            resolve({
              url,
              status: 'timeout',
              latency: Date.now() - start,
              error: 'Connection timeout (>10s)'
            });
          }, 10000);

          ws.onopen = () => {
            clearTimeout(timeout);
            const latency = Date.now() - start;
            ws.close();
            resolve({
              url,
              status: 'connected',
              latency
            });
          };

          ws.onerror = (error) => {
            clearTimeout(timeout);
            resolve({
              url,
              status: 'failed',
              latency: Date.now() - start,
              error: 'Connection failed - May be blocked or unreachable'
            });
          };
        });
      })
    );
    setWsStatuses(results);
  };

  const checkServerRpcHealth = async () => {
    if (!config?.rpcUrls) return;

    setServerLoading(true);
    try {
      const result = await base44.functions.checkRpcHealth({
        urls: config.rpcUrls
      });

      if (result.results) {
        setServerRpcStatuses(result.results);
      }
    } catch (error) {
      console.error('Server health check failed:', error);
    }
    setServerLoading(false);
  };

  const checkAll = async () => {
    if (checkMode === 'browser') {
      await Promise.all([checkRpcHealth(), checkWsHealth()]);
    } else {
      await checkServerRpcHealth();
    }
  };

  useEffect(() => {
    if (config) {
      checkAll();
    }
  }, [config]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(checkAll, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, config]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'connected':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'timeout':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'text-red-400 bg-red-500/10 border-red-500/30';
    }
  };

  const getLatencyColor = (latency) => {
    if (latency < 100) return 'text-green-400';
    if (latency < 300) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
      case 'connected':
        return <CheckCircle className="h-5 w-5" />;
      case 'timeout':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <XCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">RPC Health Checker</h1>
            <p className="text-slate-400">Monitor endpoint status and performance from both browser and server perspectives.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(
                "border-slate-700",
                autoRefresh && "bg-orange-500/10 border-orange-500/30 text-orange-400"
              )}
            >
              <Zap className="h-4 w-4 mr-2" />
              {autoRefresh ? 'Auto On' : 'Auto Off'}
            </Button>
            <Button
              onClick={checkAll}
              disabled={loading || serverLoading}
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 hover:from-cyan-600 hover:via-purple-600 hover:to-orange-600"
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", (loading || serverLoading) && "animate-spin")} />
              {(loading || serverLoading) ? 'Checking...' : 'Refresh'}
            </Button>
          </div>
        </div>

        <Tabs value={checkMode} onValueChange={setCheckMode} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="browser" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Browser Mode
            </TabsTrigger>
            <TabsTrigger value="server" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Server Mode
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            {checkMode === 'browser' ? (
              <div>
                <p className="text-sm text-slate-300 mb-2">
                  <strong>Browser Mode:</strong> Tests if endpoints are reachable from a web browser (your current device).
                </p>
                <p className="text-xs text-slate-400">
                  403 errors usually mean the endpoint blocks browser requests due to CORS, WAF rules, or authentication requirements.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-300 mb-2">
                  <strong>Server Mode:</strong> Tests endpoints from the Base44 backend server.
                </p>
                <p className="text-xs text-slate-400">
                  This eliminates browser-specific issues and shows true infrastructure health.
                </p>
              </div>
            )}
          </div>
        </Tabs>

        {checkMode === 'browser' ? (
          <>
            {/* Browser Mode - RPC Endpoints */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">HTTPS RPC Endpoints (Browser)</h2>

              {rpcStatuses.length > 0 && rpcStatuses.every(rpc => rpc.status === 'offline' && rpc.error?.includes('403')) && (
                <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-orange-400 text-sm">
                    <strong>⚠️ All endpoints returning 403 Forbidden in browser:</strong> The endpoints are blocking browser-origin requests. Try Server Mode to check if they work from a server.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {rpcStatuses.map((rpc, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={cn("rounded-lg p-2 border", getStatusColor(rpc.status))}>
                        {getStatusIcon(rpc.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-white truncate">{rpc.url}</p>
                        {rpc.error && (
                          <p className="text-xs text-red-400 mt-1">{rpc.error}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      {rpc.blockNumber && (
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">Block</p>
                          <p className="text-white font-mono">{rpc.blockNumber.toLocaleString()}</p>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="text-slate-400 text-xs">Latency</p>
                        <p className={cn("font-mono", getLatencyColor(rpc.latency))}>
                          {rpc.latency}ms
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Server Mode - RPC Endpoints */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">HTTPS RPC Endpoints (Server)</h2>

              {serverRpcStatuses.length === 0 && !serverLoading && (
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-center text-slate-400">
                  Click "Refresh" to check server-side health
                </div>
              )}

              <div className="space-y-3">
                {serverRpcStatuses.map((rpc, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={cn("rounded-lg p-2 border", getStatusColor(rpc.status))}>
                        {getStatusIcon(rpc.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-white truncate">{rpc.url}</p>
                        {rpc.error && (
                          <p className="text-xs text-red-400 mt-1">{rpc.error}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      {rpc.blockNumber && (
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">Block</p>
                          <p className="text-white font-mono">{rpc.blockNumber.toLocaleString()}</p>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="text-slate-400 text-xs">Latency</p>
                        <p className={cn("font-mono", getLatencyColor(rpc.latency))}>
                          {rpc.latency}ms
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* WebSocket Endpoints - Only in Browser Mode */}
        {checkMode === 'browser' && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">WebSocket Endpoints</h2>
            <div className="space-y-3">
              {wsStatuses.map((ws, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn("rounded-lg p-2 border", getStatusColor(ws.status))}>
                    {getStatusIcon(ws.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-white truncate">{ws.url}</p>
                    {ws.error && (
                      <p className="text-xs text-red-400 mt-1">{ws.error}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Connection</p>
                  <p className={cn("font-mono text-sm", getLatencyColor(ws.latency))}>
                    {ws.latency}ms
                  </p>
                </div>
              </div>
            ))}
            </div>
            </section>
            )}

            {autoRefresh && (
          <p className="text-center text-sm text-slate-500 mt-8">
            Auto-refresh enabled. Checking every 60 seconds.
          </p>
        )}
      </div>
    </div>
  );
}