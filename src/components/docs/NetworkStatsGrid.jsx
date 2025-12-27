import React from 'react';
import { ExternalLink } from 'lucide-react';
import CopyButton from '@/components/ui/CopyButton';

export default function NetworkStatsGrid({ config }) {
  if (!config) return null;

  const stats = [
    { 
      label: 'Chain ID', 
      value: `${config.chainIdDecimal} (${config.chainIdHex})`,
      copyValue: config.chainIdDecimal.toString()
    },
    { 
      label: 'Block Time', 
      value: `${config.blockTimeSeconds}s`,
      copyValue: config.blockTimeSeconds.toString()
    },
    { 
      label: 'Gas Limit', 
      value: config.gasLimit?.toLocaleString(),
      copyValue: config.gasLimit?.toString()
    },
    { 
      label: 'Base Fee', 
      value: `${config.baseFeeGwei} gwei`,
      copyValue: config.baseFeeGwei?.toString()
    },
    { 
      label: 'Native Token', 
      value: `$${config.nativeTokenSymbol}`,
      copyValue: config.nativeTokenSymbol
    },
    { 
      label: 'Explorer', 
      value: 'View',
      link: config.explorerUrl,
      copyValue: config.explorerUrl
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 group">
          <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
          <div className="flex items-center justify-between">
            {stat.link ? (
              <a 
                href={stat.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-mono"
              >
                {stat.value} <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="font-mono text-white">{stat.value}</span>
            )}
            <CopyButton 
              text={stat.copyValue} 
              className="opacity-0 group-hover:opacity-100 h-6 w-6" 
            />
          </div>
        </div>
      ))}
    </div>
  );
}