import React from 'react';
import { 
  TrendingUp, 
  PieChart, 
  Settings, 
  Map, 
  ShoppingBag, 
  Building2,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const navItems = [
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Nasional (APBN)', icon: Building2 },
    { name: 'Daerah (APBD)', icon: Map },
    { name: 'UMKM & Retail', icon: ShoppingBag },
    { name: 'Daya Beli (CPI)', icon: PieChart },
    { name: 'Geospatial Intel', icon: Map },
    { name: 'Executive Summary', icon: Sparkles },
    { name: 'Source & Legal', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex text-[#e0e0e0] font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#111] border-r border-white/5 transition-all duration-300 flex flex-col z-20 shrink-0",
        isOpen ? "w-64" : "w-20"
      )}>
        <div className={cn(
          "h-24 flex items-center border-b border-white/5 transition-all",
          isOpen ? "px-8 justify-between" : "justify-center"
        )}>
          {isOpen && (
            <div className="flex items-center gap-3 transition-opacity">
              <span className="font-serif italic text-2xl tracking-tight text-white">FISCALENS</span>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="p-3 hover:bg-white/5 rounded-sm text-white/30">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className={cn("flex-1 space-y-2 overflow-y-auto transition-all", isOpen ? "p-6" : "p-4")}>
          <p className={cn("text-[9px] uppercase tracking-[0.2em] text-white/20 mb-4 px-2", !isOpen && "hidden")}>Main Intelligence</p>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onTabChange(item.name)}
              className={cn(
                "w-full flex items-center transition-all group rounded-sm shrink-0",
                isOpen ? "gap-4 p-3 text-left" : "justify-center p-4",
                activeTab === item.name 
                  ? "bg-white/5 text-white font-medium border-l border-amber-500" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
              title={!isOpen ? item.name : undefined}
            >
              <item.icon size={18} className={cn("shrink-0", activeTab === item.name ? "text-amber-500" : "text-white/20 group-hover:text-white/60")} />
              {isOpen && (
                <span className="text-xs uppercase tracking-widest whitespace-nowrap transition-opacity">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className={cn("border-t border-white/5 mt-auto space-y-1 transition-all", isOpen ? "p-6" : "p-4 flex justify-center")}>
          <button className={cn(
            "flex items-center text-white/40 hover:text-white hover:bg-white/5 rounded-sm transition-colors font-medium",
            isOpen ? "w-full gap-4 p-3 text-left" : "p-4 justify-center"
          )}>
            <Settings size={18} className="shrink-0" />
            {isOpen && <span className="text-[10px] uppercase tracking-widest">System Config</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-24 border-b border-white/10 flex items-center justify-between px-10 sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md">
          <div>
            <h1 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-2 font-medium">Fiscal Intelligence Engine</h1>
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-white">{activeTab}</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] uppercase tracking-wider text-green-500 font-bold">Public Node Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Access Level</p>
              <p className="text-sm font-medium text-white">Public Guest</p>
            </div>
            <div className="h-10 w-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/40 font-mono text-xs">
              PG
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
