import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/ui/CodeBlock';
import Callout from '@/components/ui/Callout';
import ValueDisplay from '@/components/ui/ValueDisplay';

export default function DocsRpc() {
  const { data: configs } = useQuery({
    queryKey: ['networkConfig'],
    queryFn: () => base44.entities.NetworkConfig.list(),
  });

  const config = configs?.[0];
  const rpcUrl = config?.rpcUrls?.[0] || 'https://rpc1.martianchain.com';
  const wsUrl = config?.wsUrls?.[0] || 'wss://rpc-ws1.martianchain.com';

  const curlChainId = `curl -X POST ${rpcUrl} \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'`;

  const curlBlockNumber = `curl -X POST ${rpcUrl} \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'`;

  const curlGetBalance = `curl -X POST ${rpcUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0xYOUR_ADDRESS_HERE","latest"],
    "id":1
  }'`;

  const ethersExample = `import { ethers } from "ethers";

// Create provider
const provider = new ethers.JsonRpcProvider("${rpcUrl}");

// Get block number
const blockNumber = await provider.getBlockNumber();
console.log("Block:", blockNumber);

// Get chain ID
const network = await provider.getNetwork();
console.log("Chain ID:", network.chainId);

// Get balance
const balance = await provider.getBalance("0xYOUR_ADDRESS");
console.log("Balance:", ethers.formatEther(balance), "EROL");`;

  const viemExample = `import { createPublicClient, http } from "viem";
import { defineChain } from "viem";

// Define Martian Chain
const martianChain = defineChain({
  id: ${config?.chainIdDecimal || 2027},
  name: "${config?.chainName || 'Martian Chain'}",
  nativeCurrency: {
    name: "${config?.nativeTokenName || 'Erol Musk'}",
    symbol: "${config?.nativeTokenSymbol || 'EROL'}",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["${rpcUrl}"] }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "${config?.explorerUrl || 'https://explorer.martianchain.com'}" }
  }
});

// Create client
const client = createPublicClient({
  chain: martianChain,
  transport: http()
});

// Get block number
const blockNumber = await client.getBlockNumber();
console.log("Block:", blockNumber);

// Get balance
const balance = await client.getBalance({ 
  address: "0xYOUR_ADDRESS" 
});
console.log("Balance:", balance);`;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">RPC & WebSocket</h1>
      <p className="text-slate-400 mb-8">Connect to Martian Chain via HTTPS or WebSocket endpoints.</p>

      {/* HTTPS RPC */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">HTTPS RPC Endpoints</h2>
        <p className="text-slate-400 mb-4">
          Use any of these endpoints. RPC1 is recommended as the primary.
        </p>
        <div className="space-y-2 mb-4">
          {config?.rpcUrls?.map((url, i) => (
            <ValueDisplay key={i} label={`RPC ${i + 1}${i === 0 ? ' (Primary)' : ''}`} value={url} />
          ))}
        </div>
        <Callout type="tip">
          If experiencing slowness, try a different RPC endpoint. All endpoints connect to the same network.
        </Callout>
      </section>

      {/* WebSocket */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">WebSocket Endpoints</h2>
        <p className="text-slate-400 mb-4">
          Use WebSocket for real-time subscriptions (new blocks, pending transactions, logs).
        </p>
        <div className="space-y-2">
          {config?.wsUrls?.map((url, i) => (
            <ValueDisplay key={i} label={`WS ${i + 1}`} value={url} />
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Code Examples</h2>
        
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="bg-slate-800 border border-slate-700 shadow-lg shadow-purple-500/10">
            <TabsTrigger value="curl" className="data-[state=active]:bg-slate-700">curl</TabsTrigger>
            <TabsTrigger value="ethers" className="data-[state=active]:bg-slate-700">ethers v6</TabsTrigger>
            <TabsTrigger value="viem" className="data-[state=active]:bg-slate-700">viem</TabsTrigger>
          </TabsList>

          <TabsContent value="curl" className="space-y-4 mt-4">
            <CodeBlock code={curlChainId} title="eth_chainId" />
            <CodeBlock code={curlBlockNumber} title="eth_blockNumber" />
            <CodeBlock code={curlGetBalance} title="eth_getBalance" />
          </TabsContent>

          <TabsContent value="ethers" className="mt-4">
            <CodeBlock code={ethersExample} title="ethers.js v6" />
          </TabsContent>

          <TabsContent value="viem" className="mt-4">
            <CodeBlock code={viemExample} title="viem" />
          </TabsContent>
        </Tabs>
      </section>

      <Callout type="note" title="Rate Limits">
        Public RPC endpoints may have rate limits. For production applications with high traffic, consider running your own node.
      </Callout>
    </div>
  );
}