import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { FiscalData } from '../services/api.service';
import { formatIDR } from '../lib/utils';

interface DashboardChartsProps {
  data: FiscalData[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget vs Effectiveness Area Chart */}
      <div className="p-8 bg-[#111] border border-white/5 rounded-sm relative">
        <div className="flex justify-between items-start mb-12">
          <h3 className="text-[11px] uppercase tracking-widest text-white/60">Budget Effectiveness vs Growth Matrix</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Effectiveness</span>
            </div>
          </div>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#ffffff30', textTransform: 'uppercase' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#ffffff30' }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                formatter={(value: number, name: string) => [
                  name === 'budgetAllocated' ? formatIDR(value * 1000000000) : `${value}%`, 
                  name === 'budgetAllocated' ? 'Alokasi' : 'Efektivitas'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="budgetEffectiveness" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorEff)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inflation & Growth Bar Chart */}
      <div className="p-8 bg-[#111] border border-white/5 rounded-sm relative">
        <div className="flex justify-between items-start mb-12">
          <h3 className="text-[11px] uppercase tracking-widest text-white/60">UMKM Growth vs Inflation Watch</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Inflation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Growth</span>
            </div>
          </div>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#ffffff30' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#ffffff30' }} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
              />
              <Bar dataKey="msmeGrowth" name="Growth" radius={[2, 2, 0, 0]} fill="#10b981" barSize={12} />
              <Bar dataKey="inflation" name="Inflation" radius={[2, 2, 0, 0]} fill="#f59e0b" barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
