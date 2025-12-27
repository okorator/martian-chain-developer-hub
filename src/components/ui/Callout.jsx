import React from 'react';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  note: {
    icon: Info,
    bg: 'bg-blue-500/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/10 border-amber-500/30',
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-400'
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-green-500/10 border-green-500/30',
    iconColor: 'text-green-400',
    titleColor: 'text-green-400'
  },
  danger: {
    icon: AlertCircle,
    bg: 'bg-red-500/10 border-red-500/30',
    iconColor: 'text-red-400',
    titleColor: 'text-red-400'
  }
};

export default function Callout({ type = "note", title, children }) {
  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={cn("rounded-lg border p-4 my-4", variant.bg)}>
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", variant.iconColor)} />
        <div className="flex-1">
          {title && (
            <p className={cn("font-semibold mb-1", variant.titleColor)}>{title}</p>
          )}
          <div className="text-slate-300 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}