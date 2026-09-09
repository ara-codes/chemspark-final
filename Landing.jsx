import React from 'react';
import { useApp } from '../utils/AppContext';
import Reveal from '../components/Reveal';
import {
  Leaf, Flame, Droplets, ArrowRight, Sparkles, Beaker, TestTube,
  BarChart3, LineChart, Settings, RefreshCw, Columns, TrendingUp,
  DollarSign, FlaskConical, Trophy,
} from 'lucide-react';

const NOVELTY_CARDS = [
  { icon: Leaf, title: 'Agricultural-Waste Valorization', desc: 'Turn abundant crop residues into a valuable carbon resource from the very first step.' },
  { icon: Flame, title: 'Activated-Carbon Production', desc: 'Guided pyrolysis and activation parameters to craft high-performance adsorbents.' },
  { icon: Beaker, title: 'Adsorption Analysis', desc: 'Track contaminant removal across dosage, contact time, and concentration variables.' },
  { icon: LineChart, title: 'Langmuir / Freundlich Modelling', desc: 'Fit classic isotherm models to reveal adsorption capacity and surface affinity.' },
  { icon: BarChart3, title: 'Data-Driven Optimization', desc: 'Automated parameter search that surfaces the best-performing experimental recipe.' },
];

const TIMELINE = [
  { icon: Leaf, title: 'Waste Selection', step: '01' },
  { icon: Settings, title: 'Carbon Preparation', step: '02' },
  { icon: TestTube, title: 'Adsorption Experiment', step: '03' },
  { icon: BarChart3, title: 'Data Analysis', step: '04' },
  { icon: LineChart, title: 'Isotherm Fitting', step: '05' },
  { icon: Sparkles, title: 'Optimization', step: '06' },
  { icon: Trophy, title: 'Recommendation', step: '07' },
];

const FUTURE_SCOPE = [
  { icon: FlaskConical, title: 'Real Wastewater Validation', desc: 'Experimental validation with real industrial wastewater under field conditions.' },
  { icon: RefreshCw, title: 'Reactivation & Reuse', desc: 'Regeneration and reuse of activated carbon to extend adsorbent lifetime.' },
  { icon: Columns, title: 'Continuous Column Studies', desc: 'Continuous column adsorption studies for steady-state, flow-through operation.' },
  { icon: TrendingUp, title: 'Process Scale-Up', desc: 'Scale-up paths from lab batches to pilot and industrial treatment capacity.' },
  { icon: DollarSign, title: 'Techno-Economic Analysis', desc: 'Techno-economic analysis to weigh capital cost against long-term treatment gains.' },
];

export default function Landing() {
  const { setPage } = useApp();

  return (
    <div className="min-h-screen bg-beige text-dark-brown">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-10 pt-16 pb-20 lg:pt-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cream/70 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-deep-green/10 blur-3xl animate-float-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-deep-green/10 text-deep-green text-xs font-semibold uppercase tracking-widest border border-deep-green/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse-soft" />
            Smart Wastewater Remediation Platform
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-deep-green leading-none">
            WASTE-TO-
            <span className="text-accent-gold animate-glow-pulse rounded-2xl inline-block px-1">WATER</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-green leading-relaxed">
            Transforming agricultural waste into activated carbon for smarter, more sustainable wastewater treatment.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setPage('waste-selection')}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-deep-green text-cream font-semibold shadow-xl shadow-deep-green/25 hover:bg-dark-brown transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Start Analysis
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1 group-hover:scale-125" />
            </button>
            <button
              onClick={() => setPage('methodology')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cream text-deep-green font-semibold border border-deep-green/25 shadow-lg shadow-dark-brown/5 hover:border-accent-gold hover:text-dark-brown transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              <FlaskConical className="w-4.5 h-4.5 text-accent-gold group-hover:animate-pulse-soft" />
              Explore Methodology
            </button>
          </div>

          {/* Visual flow */}
          <div className="mt-16 w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-2">
            <div className="animate-fade-in-up delay-0"><FlowNode icon={Leaf} label="Agricultural Waste" sub="Biomass feedstock" color="bg-deep-green" /></div>
            <ArrowRight className="hidden sm:block w-6 h-6 text-accent-gold shrink-0 animate-bounce-arrow" />
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}><FlowNode icon={Flame} label="Activated Carbon" sub="Pyrolysis + activation" color="bg-accent-gold" /></div>
            <ArrowRight className="hidden sm:block w-6 h-6 text-accent-gold shrink-0 animate-bounce-arrow" style={{ animationDelay: '120ms' }} />
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}><FlowNode icon={Droplets} label="Cleaner Water" sub="Adsorption treatment" color="bg-muted-green" pulse /></div>
          </div>
        </div>
      </section>

      {/* ===================== PROJECT NOVELTY ===================== */}
      <section className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">The Novelty</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-deep-green">
                One integrated decision-support framework combining
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NOVELTY_CARDS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 40}>
                <div className={`bg-cream/80 rounded-2xl p-6 border border-dark-brown/5 shadow-lg shadow-dark-brown/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${i % 3 === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="w-11 h-11 rounded-xl bg-deep-green/10 flex items-center justify-center mb-4 group-hover:bg-deep-green group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-5.5 h-5.5 text-deep-green group-hover:text-cream transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-brown mb-2">{title}</h3>
                  <p className="text-sm text-muted-green leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WORKFLOW TIMELINE ===================== */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 bg-cream/60">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">Workflow</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-deep-green">Timeline of the Journey</h2>
              <p className="mt-3 text-muted-green max-w-xl mx-auto">
                Seven integrated stages guide you from raw biomass to an actionable treatment recommendation.
              </p>
            </div>
          </Reveal>

          <div className="hidden lg:grid grid-cols-7 gap-4">
            {TIMELINE.map(({ icon: Icon, title, step }, i, arr) => (
              <Reveal key={step} delay={i * 40}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-full rounded-2xl bg-beige border border-dark-brown/5 shadow-md p-4 flex flex-col items-center group hover:bg-deep-green hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <span className="text-xs font-black text-accent-gold mb-2">{step}</span>
                    <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center mb-3 group-hover:bg-deep-green group-hover:border group-hover:border-accent-gold/40 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-deep-green group-hover:text-cream transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-dark-brown group-hover:text-cream leading-tight">{title}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-accent-gold mt-3 text-lg font-bold animate-pulse-soft" style={{ animationDelay: `${i * 200}ms` }}>↓</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIMELINE.map(({ icon: Icon, title, step }, i) => (
              <Reveal key={step} delay={i * 30}>
                <div className="flex items-center gap-4 rounded-2xl bg-beige border border-dark-brown/5 shadow-md p-4 hover:bg-deep-green group hover:-translate-y-1 transition-all duration-300">
                  <span className="text-xs font-black text-accent-gold w-6">{step}</span>
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 group-hover:bg-deep-green/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-deep-green group-hover:text-cream transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-semibold text-dark-brown group-hover:text-cream">{title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FUTURE SCOPE ===================== */}
      <section className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">Road Ahead</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-deep-green">Future Scope</h2>
              <p className="mt-3 text-muted-green max-w-xl mx-auto">
                The next steps to move this framework from laboratory proof-of-concept to real-world deployment.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FUTURE_SCOPE.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 40}>
                <div className={`rounded-2xl p-6 border shadow-lg shadow-dark-brown/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${i % 2 === 0 ? 'bg-deep-green text-cream' : 'bg-cream/80'}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${i % 2 === 0 ? 'bg-cream/15 group-hover:bg-accent-gold group-hover:scale-110 group-hover:rotate-6' : 'bg-accent-gold/15 group-hover:bg-accent-gold group-hover:scale-110 group-hover:rotate-6'}`}>
                    <Icon className={`w-5.5 h-5.5 transition-colors duration-300 ${i % 2 === 0 ? 'text-accent-gold group-hover:text-deep-green' : 'text-accent-gold group-hover:text-cream'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${i % 2 === 0 ? 'text-cream' : 'text-dark-brown'}`}>{title}</h3>
                  <p className={`text-sm leading-relaxed ${i % 2 === 0 ? 'text-cream/70' : 'text-muted-green'}`}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER CTA ===================== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-20">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-3xl bg-deep-green px-8 py-12 sm:py-14 text-center shadow-2xl shadow-deep-green/30 hover:shadow-deep-green/40 transition-shadow duration-300">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-cream animate-pulse-soft">
              Ready to turn waste into water?
            </h2>
            <p className="mt-3 text-cream/70 max-w-lg mx-auto">
              Begin your analysis and let the framework guide you from agricultural waste to cleaner water.
            </p>
            <button
              onClick={() => setPage('waste-selection')}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent-gold text-deep-green font-bold shadow-xl shadow-black/20 hover:bg-cream hover:text-deep-green hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <Droplets className="w-4.5 h-4.5 animate-water-wave" />
              Start Analysis
              <ArrowRight className="w-4.5 h-4.5 animate-bounce-arrow" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function FlowNode({ icon: Icon, label, sub, color = 'bg-beige', pulse = false }) {
  const isPulse = !!pulse;
  return (
    <div className="flex flex-col items-center gap-3 w-44 sm:w-52 group">
      <div
        className={`w-20 h-20 rounded-2xl ${color} flex items-center justify-center shadow-xl shadow-dark-brown/15 border-4 border-cream ${isPulse ? 'animate-pulse-soft' : ''} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
      >
        <Icon className={`w-9 h-9 text-cream ${isPulse ? 'animate-water-wave' : ''}`} />
      </div>
      <div className="text-center">
        <p className="font-bold text-dark-brown text-sm">{label}</p>
        <p className="text-xs text-muted-green mt-0.5">{sub}</p>
      </div>
    </div>
  );
}