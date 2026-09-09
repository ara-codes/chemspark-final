import React from 'react';
import {
  BookOpen,
  Beaker,
  Flame,
  Thermometer,
  Clock,
  Droplets,
  Target,
  FlaskConical,
  Zap,
  BarChart3,
  TrendingUp,
  Award,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Recycle,
} from 'lucide-react';
import { useApp } from '../utils/AppContext';
import Reveal from '../components/Reveal';

const PROCESS_STEPS = [
  {
    icon: Leaf,
    label: 'Agricultural Waste',
    desc: 'Raw biomass such as rice husk, coconut shell, or corn cob is collected as the primary feedstock.',
    color: 'bg-muted-green/10 text-muted-green border-muted-green/20',
    activeColor: 'bg-muted-green/20 border-muted-green/40',
  },
  {
    icon: Beaker,
    label: 'Cleaning & Drying',
    desc: 'Waste is washed to remove impurities, then dried to reduce moisture content for efficient carbonization.',
    color: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    activeColor: 'bg-accent-gold/20 border-accent-gold/40',
  },
  {
    icon: Flame,
    label: 'Carbonization',
    desc: 'Thermal decomposition in an inert atmosphere converts biomass into biochar at 400–600 °C.',
    color: 'bg-dark-brown/10 text-dark-brown border-dark-brown/20',
    activeColor: 'bg-dark-brown/20 border-dark-brown/40',
  },
  {
    icon: Zap,
    label: 'Activation',
    desc: 'Chemical activation using H₃PO₄ or KOH creates a highly porous surface structure with high surface area.',
    color: 'bg-deep-green/10 text-deep-green border-deep-green/20',
    activeColor: 'bg-deep-green/20 border-deep-green/40',
  },
  {
    icon: FlaskConical,
    label: 'Activated Carbon',
    desc: 'The resulting material possesses a vast network of micropores and mesopores for pollutant adsorption.',
    color: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    activeColor: 'bg-accent-gold/20 border-accent-gold/40',
  },
  {
    icon: Droplets,
    label: 'Wastewater Treatment',
    desc: 'Activated carbon is applied to contaminated water, adsorbing heavy metals, dyes, and organic pollutants.',
    color: 'bg-deep-green/10 text-deep-green border-deep-green/20',
    activeColor: 'bg-deep-green/20 border-deep-green/40',
  },
];

const OPERATING_VARIABLES = [
  {
    icon: Thermometer,
    title: 'Temperature',
    formula: '400 – 600 °C',
    desc: 'Carbonization temperature directly affects the carbon structure, porosity development, and total surface area of the activated carbon.',
  },
  {
    icon: Clock,
    title: 'Activation Time',
    formula: '1 – 3 hours',
    desc: 'Duration of chemical or thermal activation determines the degree of pore development and the resulting surface area.',
  },
  {
    icon: FlaskConical,
    title: 'Activating Agent',
    formula: 'H₃PO₄ / KOH',
    desc: 'Choice of chemical activating agent determines the pore size distribution, surface chemistry, and overall pore structure.',
  },
  {
    icon: Droplets,
    title: 'pH',
    formula: 'pH 2 – 10',
    desc: 'Solution pH affects the surface charge of the adsorbent and the speciation of pollutants in the aqueous phase.',
  },
  {
    icon: Target,
    title: 'Adsorbent Dose',
    formula: '0.5 – 5 g/L',
    desc: 'Amount of activated carbon added determines the total number of available adsorption sites in solution.',
  },
  {
    icon: BarChart3,
    title: 'Contact Time',
    formula: '10 – 180 min',
    desc: 'Duration of adsorbent-pollutant contact determines whether the system has reached equilibrium.',
  },
];

const KEY_CONCEPTS = [
  {
    title: 'Pollutant Removal Efficiency',
    icon: TrendingUp,
    formula: 'R (%) = (C₀ − Cₑ) / C₀ × 100',
    explanation:
      'Measures the percentage of pollutant removed from solution, where C₀ is the initial concentration and Cₑ is the equilibrium concentration after treatment.',
  },
  {
    title: 'Adsorption Capacity',
    icon: Award,
    formula: 'qₑ = (C₀ − Cₑ) × V / m',
    explanation:
      'Represents the mass of pollutant adsorbed per unit mass of adsorbent at equilibrium, where V is the solution volume and m is the adsorbent mass.',
  },
  {
    title: 'Langmuir Isotherm',
    icon: FlaskConical,
    formula: 'Cₑ / qₑ = 1 / (qₘₐₓ · Kₗ) + Cₑ / qₘₐₓ',
    explanation:
      'Assumes monolayer adsorption on a homogeneous surface with uniform energy. Parameters: qₘₐₓ (maximum capacity) and Kₗ (Langmuir constant).',
  },
  {
    title: 'Freundlich Isotherm',
    icon: Beaker,
    formula: 'log qₑ = log Kf + (1/n) log Cₑ',
    explanation:
      'Describes multilayer adsorption on a heterogeneous surface. Parameters: Kf (capacity factor) and n (intensity parameter).',
  },
  {
    title: 'Process Optimization',
    icon: Zap,
    formula: 'RSM / Taguchi / Factorial Design',
    explanation:
      'Statistical experimental design methods are used to identify the optimal combination of operating variables for maximum pollutant removal.',
  },
];

export default function Methodology() {
  const { setPage } = useApp();
  return (
    <div className="min-h-screen bg-beige animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ── Header ── */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-deep-green/10 border border-deep-green/20 rounded-full px-4 py-1.5 mb-2">
            <Recycle className="w-4 h-4 text-deep-green" />
            <span className="text-xs font-semibold text-deep-green uppercase tracking-wider">
              Research Approach
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-brown tracking-tight">
            Methodology
          </h1>
          <p className="text-lg text-muted-green max-w-2xl mx-auto">
            A systematic approach to converting agricultural waste into high-performance
            activated carbon for sustainable wastewater treatment
          </p>
        </header>

        {/* ── 1. Process Flow ── */}
        <Reveal>
        <section className="bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-dark-brown mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-deep-green animate-float" />
            Process Flow
          </h2>
          <p className="text-sm text-muted-green mb-8">
            From raw agricultural waste to clean water — six core stages
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`
                    relative flex flex-col items-start gap-3 p-5 rounded-xl border
                    transition-all duration-300 hover:shadow-md hover:-translate-y-1.5 hover:scale-[1.02]
                    ${step.activeColor} bg-cream animate-fade-in-up
                  `}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-muted-green/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center border
                      ${step.color} group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    <Icon className={`w-5 h-5 ${'animate-pulse-soft'}`} style={{ animationDelay: `${i * 90}ms` }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-brown text-sm">{step.label}</h3>
                    <p className="text-xs text-muted-green mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-green/30 animate-bounce-arrow" style={{ animationDelay: `${i * 80}ms` }} />
                  )}
                </div>
              );
            })}
          </div>
        </section>
        </Reveal>

        {/* ── 2. Operating Variables ── */}
        <Reveal delay={50}>
        <section className="bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-dark-brown mb-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-gold animate-pulse-soft" />
            Operating Variables
          </h2>
          <p className="text-sm text-muted-green mb-8">
            Key parameters that influence the preparation and performance of activated carbon
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPERATING_VARIABLES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-5 rounded-xl border border-deep-green/10 bg-warm-white hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-deep-green/10 border border-deep-green/20 hover:bg-deep-green hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-deep-green group-hover:text-cream" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-brown text-sm">{v.title}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/20">
                      {v.formula}
                    </span>
                    <p className="text-xs text-muted-green mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </Reveal>

        {/* ── 3. Key Concepts ── */}
        <Reveal delay={80}>
        <section className="bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-dark-brown mb-2 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-deep-green animate-float" />
            Key Concepts
          </h2>
          <p className="text-sm text-muted-green mb-8">
            Fundamental equations and models used in adsorption studies
          </p>

          <div className="space-y-4">
            {KEY_CONCEPTS.map((concept, i) => {
              const Icon = concept.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-deep-green/10 bg-warm-white hover:shadow-md hover:translate-x-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-deep-green/10 border border-deep-green/20 hover:bg-deep-green hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-deep-green" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark-brown text-sm">{concept.title}</h3>
                    <div className="mt-2 px-3 py-2 rounded-lg bg-beige/80 border border-deep-green/10 font-mono text-xs text-deep-green font-semibold tracking-wide">
                      {concept.formula}
                    </div>
                    <p className="text-xs text-muted-green mt-2 leading-relaxed">
                      {concept.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </Reveal>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button
            onClick={() => setPage('landing')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <button
            onClick={() => setPage('waste-selection')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-green text-cream text-sm font-medium shadow-sm hover:bg-deep-green/90 transition-colors"
          >
            Start Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
