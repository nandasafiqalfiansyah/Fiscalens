import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'red';
  isLoading?: boolean;
}

const colors = {
  blue: 'text-blue-600 bg-blue-50 border-blue-100',
  green: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  amber: 'text-amber-600 bg-amber-50 border-amber-100',
  red: 'text-rose-600 bg-rose-50 border-rose-100',
};

export const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, color, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#111] border border-white/5 rounded-sm flex flex-col justify-between group"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{title}</h3>
        <div className={cn(
          "text-[10px] font-mono px-2 py-0.5 rounded-full border",
          change >= 0 
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
            : "text-rose-400 bg-rose-500/10 border-rose-500/20"
        )}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      
      <div>
        {isLoading ? (
          <div className="h-10 w-24 bg-white/5 animate-pulse rounded" />
        ) : (
          <p className="text-3xl font-serif italic text-white tracking-tight">
            {value}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
           <Icon size={14} className={cn(
             color === 'blue' ? 'text-blue-500' :
             color === 'green' ? 'text-emerald-500' :
             color === 'amber' ? 'text-amber-500' : 'text-rose-500'
           )} />
           <span className="text-[10px] text-white/30 uppercase tracking-wider">Historical Index Target</span>
        </div>
      </div>
    </motion.div>
  );
};
