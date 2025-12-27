import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ValueDisplay from '@/components/ui/ValueDisplay';
import Callout from '@/components/ui/Callout';

export default function DocsContracts() {
  const { data: configs } = useQuery({
    queryKey: ['networkConfig'],
    queryFn: () => base44.entities.NetworkConfig.list(),
  });

  const config = configs?.[0];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Contracts & Addresses</h1>
      <p className="text-slate-400 mb-8">System contract addresses and network identifiers.</p>

      {/* System Contracts */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">System Contracts</h2>
        <p className="text-slate-400 mb-4">
          These are chain-level contracts. Integrate only if your application needs validator-related logic.
        </p>

        <div className="space-y-3">
          <ValueDisplay 
            label="Validator Messages Library" 
            value={config?.validatorMessagesLibraryAddress} 
          />
          <ValueDisplay 
            label="Validator Manager Contract" 
            value={config?.validatorManagerContractAddress} 
          />
        </div>

        <Callout type="danger" title="Warning">
          Do not send funds to system contracts unless you know exactly what you're doing. These contracts have specific purposes and sending tokens to them may result in permanent loss.
        </Callout>
      </section>

      {/* Network Identifiers */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Network Identifiers</h2>
        <p className="text-slate-400 mb-4">
          Avalanche-specific identifiers for the Martian Chain subnet.
        </p>

        <div className="space-y-3">
          <ValueDisplay label="Subnet ID" value={config?.subnetId} />
          <ValueDisplay label="Blockchain ID" value={config?.blockchainId} />
          <ValueDisplay label="Conversion TX ID" value={config?.conversionTxId} />
        </div>
      </section>

      {/* Owner Addresses */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Owner Addresses</h2>
        <p className="text-slate-400 mb-4">
          Administrative addresses for the network.
        </p>

        <div className="space-y-3">
          <ValueDisplay label="Owner (C-Chain)" value={config?.ownerAddressCChain} />
          <ValueDisplay label="Owner (P-Chain)" value={config?.ownerAddressPChain} />
        </div>
      </section>

      <Callout type="note" title="Checksum Addresses">
        All Ethereum-format addresses shown are in checksum format. Always verify addresses before interacting.
      </Callout>
    </div>
  );
}