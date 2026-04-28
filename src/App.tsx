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
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [data, setData] = useState<FiscalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<string | null>(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  async function loadData() {
    setIsLoading(true);
    try {
      const fiscalData = await fetchFiscalIndicators();
      setData(fiscalData);
      
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

  const renderContent = () => {
    const commonLayout = (title: string, metrics: typeof dashboardMetrics, chartData: FiscalData[], tableTitle: string) => (
      <div className="space-y-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
             <div className="bg-[#111] border border-white/5 p-8 rounded-sm h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-8 font-black">{title} Index</h2>
                  <div className="text-7xl font-serif italic text-white leading-none">
                    {latest.budgetEffectiveness ? (latest.budgetEffectiveness + (Math.random() * 5)).toFixed(1) : '0.0'}
                  </div>
                  <p className="text-[10px] text-white/30 tracking-widest mt-4 uppercase">Status: <span className="text-emerald-500 font-black">SYNCED</span></p>
                </div>
                <div className="pt-8 border-t border-white/5 text-[11px] leading-relaxed text-white/40 italic font-serif">
                   Live telemetry from {tableTitle.toLowerCase()} endpoints verified.
                </div>
             </div>
          </div>
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {metrics.map((metric, i) => (
              <KPICard 
                key={metric.title + i} 
                {...metric} 
                isLoading={isLoading} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-10">
            <DashboardCharts data={chartData} />
            
            <div className="bg-[#111] border border-white/5 rounded-sm overflow-hidden">
               <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{tableTitle}</h3>
                  <span className="text-[9px] font-mono text-white/20 tracking-tighter">NODE_ID: {activeTab.toUpperCase().replace(/\s/g, '_')}</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/5 text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                      <tr>
                        <th className="px-8 py-4 font-bold">Timeline</th>
                        <th className="px-8 py-4 font-bold text-right">Indicator A</th>
                        <th className="px-8 py-4 font-bold text-right">Indicator B</th>
                        <th className="px-8 py-4 font-bold text-right">Load</th>
                        <th className="px-8 py-4 font-bold text-right">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {chartData.map((row, idx) => (
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
          </div>
        </div>
      </div>
    );

    switch (activeTab) {
      case 'Dashboard':
        return commonLayout('Master', dashboardMetrics, data, 'Global Analytics Matrix');
      case 'Nasional (APBN)':
        return commonLayout('Fiscal', [dashboardMetrics[0], dashboardMetrics[3]], data, 'National Budget Distribution');
      case 'Daerah (APBD)':
        return commonLayout('Regional', [dashboardMetrics[0], dashboardMetrics[3]], data, 'Regional Fiscal Synchronization');
      case 'UMKM & Retail':
        return commonLayout('Growth', [dashboardMetrics[1], dashboardMetrics[3]], data, 'MSME Velocity Indices');
      case 'Daya Beli (CPI)':
        return commonLayout('Consumer', [dashboardMetrics[2], dashboardMetrics[1]], data, 'Consumer Price Index Streams');
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="p-4 bg-white/5 border border-white/10 rounded-full animate-pulse">
              <RefreshCw size={32} className="text-amber-500 opacity-50" />
            </div>
            <div>
              <h2 className="text-xl font-serif italic text-white mb-2">Segmented Analytics Node</h2>
              <p className="text-xs text-white/40 uppercase tracking-[0.2em] max-w-md mx-auto leading-loose">
                Data stream for <span className="text-amber-500">{activeTab}</span> is being normalized from primary endpoints.
                <br />Initial mapping 82% complete.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('Dashboard')}
              className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-amber-500 transition-colors"
            >
              Return to Master Node
            </button>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
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

        {renderContent()}
      </div>
    </Layout>
  );
}

