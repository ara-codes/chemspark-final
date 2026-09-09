import React, { useState } from 'react';
import {
  Leaf,
  Flame,
  Droplets,
  ArrowRight,
  Sparkles,
  Beaker,
  Target,
  Clock,
  FlaskConical,
  BarChart3,
  CheckCircle,
  Zap,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Reveal from '../components/Reveal';
import AnimatedNumber from '../components/AnimatedNumber';
import { useApp } from '../utils/AppContext';

const TIMELINE_STAGES = [
  { icon: Leaf, label: 'Agricultural Waste', desc: 'Raw biomass feedstock' },
  { icon: Sparkles, label: 'Cleaning & Drying', desc: 'Pre-treatment preparation' },
  { icon: Flame, label: 'Carbonization', desc: 'Thermal decomposition' },
  { icon: Zap, label: 'Activation', desc: 'Chemical / physical activation' },
  { icon: Beaker, label: 'Activated Carbon', desc: 'Porous adsorbent material' },
  { icon: Droplets, label: 'Wastewater Treatment', desc: 'Pollutant removal process' },
  { icon: Target, label: 'Optimized Conditions', desc: 'Best parameter selection' },
];

export default function Dashboard() {
  const { processedExperiments, wasteSelection, setPage } = useApp();
  const [activeStage, setActiveStage] = useState(0);

  const hasData = processedExperiments && processedExperiments.length > 0;

  const avgRemoval = hasData
    ? (
        processedExperiments.reduce((sum, e) => sum + (e.removal ?? 0), 0) /
        processedExperiments.length
      )
    : 0;

  const avgQe = hasData
    ? (
        processedExperiments.reduce((sum, e) => sum + (e.qe ?? 0), 0) /
        processedExperiments.length
      )
    : 0;

  const avgPh = hasData
    ? (
        processedExperiments.reduce((sum, e) => sum + (e.pH ?? 0), 0) /
        processedExperiments.length
      )
    : 0;

  const avgContactTime = hasData
    ? Math.round(
        processedExperiments.reduce((sum, e) => sum + (e.contactTime ?? 0), 0) /
          processedExperiments.length
      )
    : 0;

  const avgDose = hasData
    ? (
        processedExperiments.reduce((sum, e) => sum + (e.adsorbentDose ?? 0), 0) /
        processedExperiments.length
      )
    : 0;

  const bestAdsorbent = wasteSelection?.wasteType || '—';

  return (
    <div className="min-h-screen bg-beige animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Header */}
        <Reveal animation="animate-fade-in-down">
          <header className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-deep-green/10 border border-deep-green/20 rounded-full px-4 py-1.5 mb-2 animate-pulse-soft">
              <Droplets className="w-4 h-4 text-deep-green animate-float" />
              <span className="text-xs font-semibold text-deep-green uppercase tracking-wider">
                Sustainable Water Treatment
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-brown tracking-tight">
              WASTE-TO-WATER
            </h1>
            <p className="text-lg text-muted-green max-w-xl mx-auto">
              Turning Agricultural Waste into Cleaner Water
            </p>
          </header>
        </Reveal>

        {/* Metric Cards */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Reveal delay={0}><MetricCard icon={BarChart3} label="Pollutant Removal" value={hasData ? avgRemoval : '—'} unit={hasData ? '%' : ''} color="deep-green" /></Reveal>
            <Reveal delay={40}><MetricCard icon={FlaskConical} label="Adsorption Capacity qₑ" value={hasData ? avgQe : '—'} unit={hasData ? 'mg/g' : ''} color="accent-gold" /></Reveal>
            <Reveal delay={80}><MetricCard icon={Leaf} label="Best Adsorbent" value={bestAdsorbent} unit="" color="muted-green" /></Reveal>
            <Reveal delay={120}><MetricCard icon={Beaker} label="Optimized pH" value={hasData ? avgPh : '—'} unit="" color="dark-brown" /></Reveal>
            <Reveal delay={160}><MetricCard icon={Clock} label="Optimized Contact Time" value={hasData ? avgContactTime : '—'} unit={hasData ? 'min' : ''} color="deep-green" /></Reveal>
            <Reveal delay={200}><MetricCard icon={Target} label="Optimized Adsorbent Dose" value={hasData ? avgDose : '—'} unit={hasData ? 'g/L' : ''} color="accent-gold" /></Reveal>
          </div>
          {!hasData && (
            <p className="text-center text-sm text-muted-green mt-3 italic animate-pulse-soft">
              No experiment data yet — results will appear once experiments are entered.
            </p>
          )}
        </section>

        {/* Process Visualization Timeline */}
        <Reveal>
          <section className="bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-dark-brown mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-gold animate-glow-pulse rounded-full" />
              Process Visualization
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch gap-0 sm:gap-0">
              {TIMELINE_STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i === activeStage;
                const isPast = i < activeStage;

                return (
                  <React.Fragment key={i}>
                    {/* Stage node */}
                    <button
                      onClick={() => setActiveStage(i)}
                      className={`
                        flex flex-col items-center text-center flex-1 group
                        transition-all duration-300 cursor-pointer outline-none
                        ${isActive ? 'scale-110' : 'hover:scale-105'}
                      `}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div
                        className={`
                          w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                          transition-all duration-300 border-2
                          ${
                            isActive
                              ? 'bg-deep-green border-deep-green text-warm-white shadow-lg shadow-deep-green/25 animate-glow-pulse'
                              : isPast
                                ? 'bg-deep-green/15 border-deep-green/30 text-deep-green'
                                : 'bg-beige border-muted-green/20 text-muted-green group-hover:border-deep-green/40 group-hover:text-deep-green'
                          }
                        `}
                      >
                        {isPast ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-scale-in" />
                        ) : (
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${i === activeStage ? 'animate-float' : 'group-hover:animate-pulse-soft'}`} />
                        )}
                      </div>
                      <p
                        className={`
                          mt-2 text-xs sm:text-sm font-semibold leading-tight transition-colors duration-300
                          ${isActive ? 'text-deep-green' : isPast ? 'text-dark-brown' : 'text-muted-green'}
                        `}
                      >
                        {stage.label}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-green/70 mt-0.5 hidden sm:block">
                        {stage.desc}
                      </p>
                    </button>

                    {/* Connector arrow */}
                    {i < TIMELINE_STAGES.length - 1 && (
                      <div className="flex items-center justify-center px-1 sm:px-0 py-2 sm:py-0">
                        <ArrowRight
                          className={`
                            w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300
                            ${i < activeStage ? 'text-deep-green animate-bounce-arrow' : 'text-muted-green/30'}
                          `}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Stage description */}
            <div className="mt-6 p-4 bg-beige/60 rounded-xl border border-muted-green/10 text-center animate-fade-in" key={activeStage}>
              <p className="text-sm text-dark-brown">
                <span className="font-semibold text-deep-green">
                  Stage {activeStage + 1}:
                </span>{' '}
                {TIMELINE_STAGES[activeStage].label} — {TIMELINE_STAGES[activeStage].desc}
              </p>
            </div>
          </section>
        </Reveal>

        {/* CTA Button */}
        <Reveal>
          <section className="text-center pb-4">
            <button
              onClick={() => setPage('waste-selection')}
              className="
                inline-flex items-center gap-3 bg-deep-green text-warm-white
                font-semibold text-lg px-8 py-4 rounded-2xl
                shadow-lg shadow-deep-green/20
                hover:bg-deep-green/90 hover:shadow-xl hover:shadow-deep-green/25
                hover:-translate-y-1 active:scale-[0.98]
                transition-all duration-300
                cursor-pointer animate-glow-pulse
              "
            >
              <Sparkles className="w-5 h-5 animate-float" />
              Start Analysis
              <ArrowRight className="w-5 h-5 animate-bounce-arrow" />
            </button>
          </section>
        </Reveal>
      </div>
    </div>
  );
}