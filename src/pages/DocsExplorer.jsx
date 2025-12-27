import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Callout from '@/components/ui/Callout';

export default function DocsExplorer() {
  const { data: configs } = useQuery({
    queryKey: ['networkConfig'],
    queryFn: () => base44.entities.NetworkConfig.list(),
  });

  const config = configs?.[0];

  const debugChecklist = [
    {
      title: "Confirm Chain ID",
      description: "Ensure your wallet and code are using Chain ID 2027 (0x7EB)."
    },
    {
      title: "Verify RPC Reachability",
      description: "Test with curl or the RPC Health tool to confirm the endpoint responds."
    },
    {
      title: "Check Gas Settings",
      description: "Query current base fee via eth_feeHistory or provider.getFeeData(). Ensure your maxFeePerGas is higher than current base fee."
    },
    {
      title: "Verify Nonce",
      description: "If transactions are stuck, check if you have pending transactions with lower nonces."
    },
    {
      title: "Check Balance",
      description: `Ensure you have enough $${config?.nativeTokenSymbol || 'EROL'} for gas fees.`
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Explorer & Debugging</h1>
      <p className="text-slate-400 mb-8">View transactions, addresses, and debug common issues.</p>

      {/* Explorer Link */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Block Explorer</h2>
        <p className="text-slate-400 mb-4">
          The Martian Chain explorer lets you search transactions, addresses, and blocks.
        </p>
        
        {config?.explorerUrl ? (
          <a href={config.explorerUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 hover:from-cyan-600 hover:via-purple-600 hover:to-orange-600">
              Open Explorer <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        ) : (
          <p className="text-slate-500 text-sm">Explorer URL not configured</p>
        )}
      </section>

      {/* Using the Explorer */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Using the Explorer</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">Search Transaction Hash</h3>
            <p className="text-slate-400 text-sm">
              Paste a transaction hash (0x...) to view status, gas used, logs, and input data.
            </p>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">Search Address</h3>
            <p className="text-slate-400 text-sm">
              View an address's balance, transaction history, and token holdings.
            </p>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">View Blocks</h3>
            <p className="text-slate-400 text-sm">
              Browse recent blocks, see transactions per block, and verify block times.
            </p>
          </div>
        </div>
      </section>

      {/* Debug Checklist */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Debug Checklist</h2>
        <p className="text-slate-400 mb-4">
          If something isn't working, run through this checklist:
        </p>

        <div className="space-y-3">
          {debugChecklist.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400 font-medium text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Callout type="tip" title="Pro Tip">
        Use the explorer's "Internal Transactions" tab to debug failed contract calls. It shows the exact revert reason.
      </Callout>
    </div>
  );
}