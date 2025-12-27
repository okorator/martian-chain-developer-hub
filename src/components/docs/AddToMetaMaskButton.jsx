import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Check, AlertCircle } from 'lucide-react';

export default function AddToMetaMaskButton({ config }) {
  const [status, setStatus] = useState('idle');

  const addNetwork = async () => {
    if (!window.ethereum) {
      setStatus('no-wallet');
      return;
    }

    try {
      setStatus('loading');
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: config.chainIdHex,
          chainName: config.chainName,
          nativeCurrency: {
            name: config.nativeTokenName,
            symbol: config.nativeTokenSymbol,
            decimals: 18
          },
          rpcUrls: config.rpcUrls,
          blockExplorerUrls: [config.explorerUrl]
        }]
      });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Button 
      onClick={addNetwork}
      disabled={status === 'loading'}
      className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-900 font-semibold"
    >
      {status === 'loading' ? (
        <>Adding...</>
      ) : status === 'success' ? (
        <><Check className="h-4 w-4 mr-2" /> Added!</>
      ) : status === 'no-wallet' ? (
        <><AlertCircle className="h-4 w-4 mr-2" /> No Wallet</>
      ) : status === 'error' ? (
        <><AlertCircle className="h-4 w-4 mr-2" /> Failed</>
      ) : (
        <><Wallet className="h-4 w-4 mr-2" /> Add to MetaMask</>
      )}
    </Button>
  );
}