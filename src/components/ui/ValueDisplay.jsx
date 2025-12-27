import React from 'react';
import CopyButton from './CopyButton';
import { cn } from '@/lib/utils';

export default function ValueDisplay({ label, value, copyable = true, mono = true, className }) {
  return (
    <div className={cn("flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700", className)}>
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-slate-400 mb-1">{label}</p>}
        <p className={cn("text-slate-200 truncate", mono && "font-mono text-sm")}>{value}</p>
      </div>
      {copyable && <CopyButton text={value} className="ml-2 flex-shrink-0" />}
    </div>
  );
}