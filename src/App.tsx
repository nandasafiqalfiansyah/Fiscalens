/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { KPICard } from './components/KPICard';
import { DashboardCharts } from './components/DashboardCharts';
import { InsightsPanel } from './components/InsightsPanel';
import { 
  fetchFiscalIndicators, 
  FiscalData 
} from './services/api.service';
import { generateFiscalInsights } from './services/gemini.service';
import { 
  Coins, 
  Target, 
  ArrowDownCircle, 
  TrendingUp,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { cn, formatIDR, formatPercent } from './lib/utils';

export default function App() {
  const [data, setData] = useState<FiscalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<string | null>(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  async function loadData() {
    setIsLoading(true);
    try {
      const fiscalData = await fetchFiscalIndicators();
      setData(fiscalData);
      
      // Auto-trigger insights after data is loaded
      setIsGeneratingInsights(true);
      const aiInsights = await generateFiscalInsights(fiscalData);
      setInsights(aiInsights);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsGeneratingInsights(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const latest = data[data.length - 1] || {
    inflation: 0,
    msmeGrowth: 0,
    purchasingPower: 0,
    budgetAllocated: 0,
    budgetEffectiveness: 0
  };

  const dashboardMetrics = [
    { 
      title: 'Efektivitas Anggaran', 
      value: `${latest.budgetEffectiveness}/100`, 
      change: 8.2, 
      icon: Target, 
      color: 'blue' as const 
    },
    { 
      title: 'Pertumbuhan UMKM', 
      value: formatPercent(latest.msmeGrowth), 
      change: 12.5, 
      icon: TrendingUp, 
      color: 'green' as const 
    },
    { 
      title: 'Tingkat Inflasi (CPI)', 
      value: `${latest.inflation}%`, 
      change: -2.1, 
      icon: ArrowDownCircle, 
      color: 'amber' as const 
    },
    { 
      title: 'Alokasi Real-time', 
      value: formatIDR(latest.budgetAllocated * 1000000000), 
      change: 4.3, 
      icon: Coins, 
      color: 'blue' as const 
    },
  ];

  return (
    <Layout>
      <div className="p-10 max-w-7xl mx-auto space-y-10">
        {/* Dashboard Header/Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-1 bg-[#111] p-1 rounded-sm border border-white/5">
            <button className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black rounded-sm">6 Months Matrix</button>
            <button className="px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">YTD Signal</button>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="SEARCH SIGNAL..."
                className="w-full pl-12 pr-4 py-3 bg-[#111] border border-white/5 rounded-sm text-[10px] tracking-widest text-white placeholder:text-white/10 focus:ring-1 focus:ring-amber-500 focus:border-transparent outline-none uppercase"
              />
            </div>
            <button 
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              Sync Engine
            </button>
          </div>
        </div>

        {/* Impact Score & KPIS Grid Area */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
             <div className="bg-[#111] border border-white/5 p-8 rounded-sm h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-8 font-black">Overall Impact Score</h2>
                  <div className="text-7xl font-serif italic text-white leading-none">
                    {latest.budgetEffectiveness ? (latest.budgetEffectiveness + 4.4).toFixed(1) : '0.0'}
                  </div>
                  <p className="text-[10px] text-white/30 tracking-widest mt-4 uppercase">Efficiency Rating: <span className="text-emerald-500 font-black">OPTIMUM</span></p>
                </div>
                <div className="pt-8 border-t border-white/5 text-[11px] leading-relaxed text-white/40 italic font-serif">
                   Budget allocation shows high correlation with MSME credit absorption across provinces.
                </div>
             </div>
          </div>
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {dashboardMetrics.map((metric, i) => (
              <KPICard 
                key={metric.title} 
                {...metric} 
                isLoading={isLoading} 
              />
            ))}
          </div>
        </div>

        {/* Charts & Insights Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-10">
            <DashboardCharts data={data} />
            
            {/* Table Detail */}
            <div className="bg-[#111] border border-white/5 rounded-sm overflow-hidden">
               <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Dataset Endpoint Normalization</h3>
                  <span className="text-[9px] font-mono text-white/20 tracking-tighter">DIRECT_LINK: BPS_V1_732</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/5 text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                      <tr>
                        <th className="px-8 py-4 font-bold">Timeline Bucket</th>
                        <th className="px-8 py-4 font-bold text-right">CPI Index</th>
                        <th className="px-8 py-4 font-bold text-right">MSME Velocity</th>
                        <th className="px-8 py-4 font-bold text-right">Budget Load</th>
                        <th className="px-8 py-4 font-bold text-right">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                          <td className="px-8 py-5 text-white font-serif italic text-base">{row.month} 2023</td>
                          <td className="px-8 py-5 text-right text-amber-500 font-bold">{row.inflation}%</td>
                          <td className="px-8 py-5 text-right text-emerald-500 font-bold">{row.msmeGrowth}%</td>
                          <td className="px-8 py-5 text-right text-white/40">{row.budgetAllocated} M</td>
                          <td className="px-8 py-5 text-right text-white font-black">{row.budgetEffectiveness}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <InsightsPanel 
              insights={insights} 
              isLoading={isGeneratingInsights} 
            />
            
            {/* Status Card */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-sm">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-8">Node Connectivity</h4>
              <div className="space-y-6">
                {[
                  { name: 'BPS Endpoint V1', status: 'active' },
                  { name: 'Kemenkeu CKAN Data', status: 'active' },
                  { name: 'BI Monetary Node', status: 'warning' },
                ].map((node) => (
                  <div key={node.name} className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span className="text-white/40">{node.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] text-white/20">Operational</span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full animate-pulse",
                        node.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Footer in Sidebar area */}
            <div className="pt-8 border-t border-white/5">
               <p className="text-[9px] uppercase tracking-widest text-white/20 leading-loose">
                  Platform v2.4.1<br/>
                  Client-Side Fetch Strategy<br/>
                  No database architecture
               </p>
               <p className="text-[9px] uppercase tracking-widest text-white/40 mt-4 font-black">
                  © 2024 FISCALENS ANALYTICS
               </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

