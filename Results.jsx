import React from 'react';
import { useApp } from '../utils/AppContext';
import Reveal from '../components/Reveal';
import {
  Trophy, CheckCircle, Beaker, FlaskConical, Thermometer, Clock,
  Target, Droplets, TrendingUp, Award, ArrowRight, ArrowLeft, BarChart3,
} from 'lucide-react';

const confidenceStyles = {
  High: { bg: 'bg-deep-green/15', text: 'text-deep-green', border: 'border-deep-green/30' },
  Medium: { bg: 'bg-accent-gold/15', text: 'text-dark-brown', border: 'border-accent-gold/30' },
  Low: { bg: 'bg-muted-green/15', text: 'text-muted-green', border: 'border-muted-green/30' },
};

const paramItems = (rec) => [
  { icon: Beaker, label: 'Agricultural Waste', value: rec.wasteType, color: 'deep-green' },
  { icon: FlaskConical, label: 'Activating Agent', value: rec.agent, color: 'accent-gold' },
  { icon: Thermometer, label: 'Activation Temp', value: `${rec.activationTemp} °C`, color: 'dark-brown' },
  { icon: Clock, label: 'Activation Time', value: `${rec.activationTime} min`, color: 'muted-green' },
  { icon: Target, label: 'Optimal pH', value: rec.pH, color: 'deep-green' },
  { icon: Droplets, label: 'Adsorbent Dose', value: `${rec.adsorbentDose} g/L`, color: 'accent-gold' },
  { icon: Clock, label: 'Contact Time', value: `${rec.contactTime} min`, color: 'dark-brown' },
  { icon: TrendingUp, label: 'Removal Efficiency', value: `${rec.predictedRemoval} %`, color: 'deep-green' },
  { icon: Award, label: 'Adsorption Capacity', value: `${rec.predictedQe} mg/g`, color: 'accent-gold' },
];

const colorClasses = {
  'deep-green': { bg: 'bg-deep-green/10', icon: 'text-deep-green', border: 'border-deep-green/20' },
  'accent-gold': { bg: 'bg-accent-gold/10', icon: 'text-accent-gold', border: 'border-accent-gold/20' },
  'dark-brown': { bg: 'bg-dark-brown/10', icon: 'text-dark-brown', border: 'border-dark-brown/20' },
  'muted-green': { bg: 'bg-muted-green/10', icon: 'text-muted-green', border: 'border-muted-green/20' },
};

export default function Results() {
  const { recommendation, setPage } = useApp();

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center p-6 animate-fade-in">
        <div className="bg-cream rounded-3xl p-12 max-w-md w-full text-center border border-beige shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-accent-gold/15 flex items-center justify-center mx-auto mb-6 animate-float">
            <Trophy className="w-8 h-8 text-accent-gold" />
          </div>
          <h2 className="text-xl font-bold text-dark-brown mb-3">No Recommendation Yet</h2>
          <p className="text-muted-green text-sm mb-8 leading-relaxed">
            Run the AI Optimization module to generate recommended operating conditions based on your experimental data.
          </p>
          <button
            onClick={() => setPage('optimization')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-deep-green text-cream rounded-xl font-medium text-sm hover:bg-deep-green/90 hover:-translate-y-1 active:scale-95 transition-all duration-200 shadow-lg shadow-deep-green/20"
          >
            <FlaskConical className="w-4 h-4" />
            Run Optimization
            <ArrowRight className="w-4 h-4 animate-bounce-arrow" />
          </button>
        </div>
      </div>
    );
  }

  const rec = recommendation;
  const badge = confidenceStyles[rec.confidence] || confidenceStyles.Medium;
  const params = paramItems(rec);

  return (
    <div className="min-h-screen bg-beige p-6 lg:p-10 animate-fade-in">
      {/* Header */}
      <Reveal animation="animate-fade-in-down">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-deep-green flex items-center justify-center animate-float">
              <Trophy className="w-5 h-5 text-accent-gold" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-dark-brown">Recommended Operating Conditions</h1>
          </div>
          <p className="text-muted-green text-sm ml-13">
            AI-optimized parameters for maximum adsorption performance
          </p>
        </div>
      </Reveal>

      {/* Hero Card */}
      <Reveal>
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative overflow-hidden rounded-3xl border border-deep-green/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Gradient header band */}
          <div className="bg-gradient-to-r from-deep-green via-deep-green/90 to-muted-green px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cream/20 flex items-center justify-center backdrop-blur-sm animate-pulse-soft">
                  <Trophy className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cream">Optimal Configuration</h2>
                  <p className="text-cream/70 text-xs">Best-performing parameter set identified</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border animate-scale-in ${badge.bg} ${badge.text} ${badge.border}`}>
                <CheckCircle className="w-3.5 h-3.5 animate-pulse-soft" />
                {rec.confidence} Confidence
              </span>
            </div>
          </div>

          {/* Parameters grid */}
          <div className="bg-cream p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {params.map((item, idx) => {
                const c = colorClasses[item.color] || colorClasses['deep-green'];
                return (
                  <div
                    key={item.label}
                    className={`rounded-2xl border ${c.border} ${c.bg} p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate-scale-in group`}
                    style={{ animationDelay: `${idx * 25}ms` }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-cream/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <item.icon className={`w-4 h-4 ${c.icon}`} />
                      </div>
                      <span className="text-xs font-medium text-muted-green uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="text-xl font-bold text-dark-brown ml-[42px]">{item.value}</p>
                  </div>
                );
              })}

              {/* Isotherm - spans remaining slot */}
              <div className="rounded-2xl border border-accent-gold/20 bg-accent-gold/10 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${params.length * 25}ms` }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cream/80 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-accent-gold" />
                  </div>
                  <span className="text-xs font-medium text-muted-green uppercase tracking-wider">Best-Fit Isotherm</span>
                </div>
                <p className="text-xl font-bold text-dark-brown ml-[42px]">{rec.bestIsotherm}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Reveal>

      {/* Visual Summary Strip */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-cream/60 backdrop-blur-sm rounded-2xl border border-beige p-5">
          <h3 className="text-sm font-semibold text-dark-brown mb-4 uppercase tracking-wider">Quick Reference</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Thermometer, text: `${rec.activationTemp} °C` },
              { icon: Clock, text: `${rec.activationTime} min` },
              { icon: Target, text: `pH ${rec.pH}` },
              { icon: Droplets, text: `${rec.adsorbentDose} g/L` },
              { icon: TrendingUp, text: `${rec.predictedRemoval}% removal` },
              { icon: Award, text: `${rec.predictedQe} mg/g` },
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-beige/70 text-dark-brown px-3.5 py-2 rounded-xl text-sm font-medium border border-beige"
              >
                <chip.icon className="w-4 h-4 text-deep-green" />
                {chip.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setPage('analysis')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-cream text-dark-brown border border-deep-green/20 rounded-xl text-sm font-medium hover:bg-beige transition-all duration-200"
          >
            <BarChart3 className="w-4 h-4" />
            View Analysis
          </button>
          <button
            onClick={() => setPage('experiment')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-deep-green text-cream rounded-xl text-sm font-medium hover:bg-deep-green/90 transition-all duration-200 shadow-lg shadow-deep-green/20"
          >
            <FlaskConical className="w-4 h-4" />
            Run New Experiment
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-cream text-muted-green border border-beige rounded-xl text-sm font-medium hover:text-dark-brown hover:border-deep-green/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
