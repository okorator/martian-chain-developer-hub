import React from 'react';
import CopyButton from './CopyButton';
import { cn } from '@/lib/utils';

export default function CodeBlock({ code, language = "bash", title, className }) {
  return (
    <div className={cn("relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900", className)}>
      {title && (
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400 font-mono">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-slate-300 font-mono whitespace-pre">{code}</code>
        </pre>
        <CopyButton 
          text={code} 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-slate-700 hover:bg-slate-600" 
        />
      </div>
    </div>
  );
}