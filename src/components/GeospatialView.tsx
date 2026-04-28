import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Info, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export const GeospatialView: React.FC = () => {
  const regions = [
    { name: 'Sumatera', score: 72, load: 'High', status: 'optimal', digital: '65%', inflation: '3.2%' },
    { name: 'Jawa', score: 88, load: 'Peak', status: 'optimal', digital: '82%', inflation: '2.8%' },
    { name: 'Kalimantan', score: 65, load: 'Medium', status: 'warning', digital: '54%', inflation: '4.1%' },
    { name: 'Sulawesi', score: 58, load: 'Medium', status: 'warning', digital: '48%', inflation: '4.5%' },
    { name: 'Papua', score: 42, load: 'Low', status: 'alert', digital: '32%', inflation: '5.8%' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-12 gap-8">
        {/* Map Visualization */}
        <div className="col-span-12 lg:col-span-8 bg-[#111] border border-white/5 rounded-sm p-10 relative overflow-hidden group">
           <div className="absolute top-0 left-0 p-8">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-amber-500 mb-2 font-black">Regional Signal Mapping</h2>
              <p className="text-xs text-white/30 font-serif italic">Live 3D-Projected Fiscal Dispersion</p>
           </div>

           <div className="flex items-center justify-center py-20 min-h-[500px]">
              <motion.div 
                initial={{ rotateX: 45, rotateZ: -10, opacity: 0 }}
                animate={{ rotateX: 25, rotateZ: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full max-w-2xl aspect-[2/1] bg-white/[0.02] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] transform-gpu hover:scale-105 transition-transform duration-700"
              >
                {/* Simplified SVG Map of Indonesia */}
                <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
                  <path d="M100,100 L150,120 L180,180 L120,200 Z" fill="white" /> {/* Sumatera */}
                  <path d="M250,220 L400,220 L450,250 L280,250 Z" fill="white" /> {/* Jawa */}
                  <path d="M280,100 L380,100 L400,180 L300,180 Z" fill="white" /> {/* Kalimantan */}
                  <path d="M450,120 L520,120 L550,180 L480,220 Z" fill="white" /> {/* Sulawesi */}
                  <path d="M600,150 L750,150 L780,250 L650,280 Z" fill="white" /> {/* Papua */}
                  <circle cx="340" cy="235" r="5" fill="#f59e0b" className="animate-pulse" /> {/* Interaction point */}
                </svg>

                {/* Floating Signal Tags */}
                {regions.map((region, i) => (
                  <motion.div 
                    key={region.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="absolute"
                    style={{ 
                      left: `${15 + (i * 18)}%`, 
                      top: `${30 + (i * 10)}%` 
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                       <div className={cn(
                         "h-12 w-px bg-gradient-to-t from-transparent",
                         region.status === 'optimal' ? "to-emerald-500" : region.status === 'warning' ? "to-amber-500" : "to-rose-500"
                       )} />
                       <div className="px-3 py-1.5 bg-black/90 border border-white/10 backdrop-blur-md rounded-sm whitespace-nowrap">
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{region.name}</p>
                          <p className="text-xs font-mono font-bold text-white">{region.score}.0 Index</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
           </div>

           <div className="absolute bottom-8 right-8 flex gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-white/20">Projection Engine</span>
                <span className="text-[10px] text-white/60 font-mono">BPS_V1_GEOSPATIAL</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-white/20">Data Accuracy</span>
                <span className="text-[10px] text-emerald-500 font-black">HIGH (σ=0.04)</span>
              </div>
           </div>
        </div>

        {/* Legend & Details */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-[#111] border border-white/5 p-8 rounded-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-8">Node Performance List</h3>
              <div className="space-y-4">
                 {regions.map((region) => (
                   <div key={region.name} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-sm group hover:bg-white/[0.05] transition-colors">
                      <div className="space-y-2">
                         <p className="text-xs font-bold text-white">{region.name}</p>
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                               <Zap size={10} className="text-amber-500" />
                               <span className="text-[8px] uppercase tracking-widest text-white/30">{region.load} Load</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <MapPin size={10} className="text-blue-500" />
                               <span className="text-[8px] uppercase tracking-widest text-white/30">Dig: {region.digital} | Inf: {region.inflation}</span>
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={cn(
                           "text-xl font-serif italic leading-none mb-1",
                           region.status === 'optimal' ? "text-emerald-500" : region.status === 'warning' ? "text-amber-500" : "text-rose-500"
                         )}>{region.score}</p>
                         <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">Sync Rate</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#111] border border-white/5 p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Info size={16} className="text-blue-500" />
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Geospatial Rule</h3>
              </div>
              <p className="text-xs text-white/30 leading-relaxed font-serif italic">
                 "Spatial correlation indicates that fiscal efficiency in maritime hubs (Jawa & Sumatera) is driving 14% higher 
                 economic velocity than land-locked regional clusters."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
