import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Info } from 'lucide-react';

interface InsightsPanelProps {
  insights: string | null;
  isLoading: boolean;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, isLoading }) => {
  return (
    <div className="bg-[#111] text-[#e0e0e0] rounded-sm overflow-hidden border border-white/5">
      <div className="p-5 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-amber-500" />
          <h3 className="font-medium text-[10px] uppercase tracking-[0.2em] text-white/60">Automated Intelligence</h3>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/20">
          Neural Engine v4
        </div>
      </div>
      
      <div className="p-8 min-h-[200px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <Loader2 className="animate-spin mb-4 text-amber-500" size={24} />
              <p className="text-[10px] uppercase tracking-widest text-white/30 animate-pulse">Running Regression Analysis...</p>
            </motion.div>
          ) : insights ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {insights.split('\n').filter(l => l.trim()).map((line, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-1 h-3 bg-amber-500/30 group-hover:bg-amber-500 transition-colors shrink-0" />
                  <p className="text-xs leading-relaxed text-white/60">
                    {line.split(/(\*\*.*?\*\*)/).map((part, index) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                      }
                      // Handle headers
                      if (part.startsWith('### ')) return <span key={index} className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">{part.replace('### ', '')}</span>;
                      if (part.startsWith('## ')) return <span key={index} className="text-sm font-bold text-white block mb-2">{part.replace('## ', '')}</span>;
                      
                      return part.replace(/^[-\-\•]\s*/, ''); // Remove bullet symbols from line start
                    })}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center py-10 text-[10px] uppercase tracking-widest text-white/20 italic">
              Awaiting Datastream Sync...
            </div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="px-8 py-4 bg-white/5 border-t border-white/5">
        <button className="text-[10px] text-amber-500 hover:text-amber-400 transition-colors font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          Export Intelligence Briefing
        </button>
      </div>
    </div>
  );
};
