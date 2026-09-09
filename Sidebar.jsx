import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import {
  LayoutDashboard, FlaskConical, BarChart3, LineChart,
  Sparkles, Trophy, BookOpen, Beaker, Menu, X, Droplets, ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'waste-selection', label: 'Waste Selection', icon: Beaker },
  { id: 'experiment', label: 'Experiment', icon: FlaskConical },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'isotherm', label: 'Isotherm Modelling', icon: LineChart },
  { id: 'optimization', label: 'AI Optimization', icon: Sparkles },
  { id: 'results', label: 'Results', icon: Trophy },
  { id: 'methodology', label: 'Methodology', icon: BookOpen },
];

export default function Sidebar() {
  const { currentPage, setPage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (id) => {
    setPage(id);
    setMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-deep-green flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cream" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-deep-green tracking-wide leading-tight">WASTE-TO-WATER</h1>
            <p className="text-[10px] text-muted-green">AI Carbon Platform</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group animate-slide-in-left
                ${active
                  ? 'bg-deep-green text-cream shadow-lg shadow-deep-green/20 scale-[1.03]'
                  : 'text-dark-brown hover:bg-beige/60 hover:text-deep-green hover:translate-x-1'
                }`}
              style={{ animationDelay: `${idx * 20}ms` }}
            >
              <Icon className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'text-accent-gold' : 'text-muted-green group-hover:text-deep-green group-hover:scale-110'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-accent-gold animate-bounce-arrow" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-beige/50">
        <p className="text-[10px] text-muted-green text-center">
          Smart India Hackathon
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-deep-green text-cream shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark-brown/40 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 h-screen fixed left-0 top-0 bg-cream border-r border-beige z-30 shadow-sm">
        {navContent}
      </aside>

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-cream z-50 shadow-2xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navContent}
      </aside>
    </>
  );
}
