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
      className="bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 hover:from-cyan-600 hover:via-purple-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-purple-500/20"
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