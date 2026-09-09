import React from 'react';
import { useApp } from '../utils/AppContext';
import { WASTE_TYPES, AGENTS } from '../data/demoData';
import Reveal from '../components/Reveal';
import {
  Beaker, Thermometer, Clock, Zap, ArrowLeft, ArrowRight,
  FlaskConical, Leaf, CheckCircle,
} from 'lucide-react';

export default function WasteSelection() {
  const { wasteSelection, setWasteSelection, setPage } = useApp();
  const { wasteType, agent, activationTemp, activationTime } = wasteSelection;

  const handleChange = (field) => (e) => {
    const val = field === 'activationTemp' || field === 'activationTime'
      ? Number(e.target.value)
      : e.target.value;
    setWasteSelection({ [field]: val });
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <Reveal animation="animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-dark-brown flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-deep-green flex items-center justify-center animate-float">
              <Beaker className="w-6 h-6 text-accent-gold" />
            </span>
            Waste &amp; Activated Carbon Selection
          </h1>
          <p className="mt-2 text-muted-green text-sm">
            Choose your agricultural waste precursor and activation parameters to generate activated carbon.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form — left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Waste Type */}
          <Reveal delay={0}>
            <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md hover:border-deep-green/20 transition-all duration-300 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-dark-brown mb-3">
                <Leaf className="w-4 h-4 text-deep-green group-hover:animate-pulse-soft" />
                Agricultural Waste Type
              </label>
              <select
                value={wasteType}
                onChange={handleChange('wasteType')}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm
                           focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green
                           transition-all duration-200 hover:border-deep-green/30"
              >
                {WASTE_TYPES.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </Reveal>

          {/* Activating Agent */}
          <Reveal delay={30}>
            <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md hover:border-deep-green/20 transition-all duration-300 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-dark-brown mb-3">
                <FlaskConical className="w-4 h-4 text-deep-green group-hover:animate-pulse-soft" />
                Activating Agent
              </label>
              <select
                value={agent}
                onChange={handleChange('agent')}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm
                           focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green
                           transition-all duration-200 hover:border-deep-green/30"
              >
                {AGENTS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </Reveal>

          {/* Temperature */}
          <Reveal delay={60}>
            <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md hover:border-deep-green/20 transition-all duration-300 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-dark-brown mb-3">
                <Thermometer className="w-4 h-4 text-accent-gold group-hover:animate-pulse-soft" />
                Activation Temperature (°C)
              </label>
              <input
                type="number"
                min={300}
                max={900}
                step={10}
                value={activationTemp}
                onChange={handleChange('activationTemp')}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm
                           focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green
                           transition-all duration-200 hover:border-deep-green/30"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-green">
                <span>300 °C</span>
                <span>900 °C</span>
              </div>
              <input
                type="range"
                min={300}
                max={900}
                step={10}
                value={activationTemp}
                onChange={handleChange('activationTemp')}
                className="w-full mt-1 accent-deep-green"
              />
            </div>
          </Reveal>

          {/* Time */}
          <Reveal delay={90}>
            <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md hover:border-deep-green/20 transition-all duration-300 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-dark-brown mb-3">
                <Clock className="w-4 h-4 text-accent-gold group-hover:animate-pulse-soft" />
                Activation Time (min)
              </label>
              <input
                type="number"
                min={15}
                max={300}
                step={5}
                value={activationTime}
                onChange={handleChange('activationTime')}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm
                           focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green
                           transition-all duration-200 hover:border-deep-green/30"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-green">
                <span>15 min</span>
                <span>300 min</span>
              </div>
              <input
                type="range"
                min={15}
                max={300}
                step={5}
                value={activationTime}
                onChange={handleChange('activationTime')}
                className="w-full mt-1 accent-deep-green"
              />
            </div>
          </Reveal>
        </div>

        {/* Right column — previews */}
        <div className="space-y-6">
          {/* Live Preview */}
          <Reveal delay={50} animation="animate-slide-in-right">
            <div className="bg-cream rounded-2xl p-6 border border-deep-green/20 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-sm font-semibold text-dark-brown mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-gold animate-pulse-soft" />
                Live Preview
              </h3>

              <div key={`${wasteType}-${agent}-${activationTemp}-${activationTime}`} className="flex flex-col items-center gap-3 text-center animate-fade-in-up">
                <div className="w-full rounded-xl bg-beige/60 px-4 py-3 hover:bg-beige transition-colors duration-300">
                  <p className="text-[10px] uppercase tracking-wider text-muted-green mb-1">Raw Material</p>
                  <p className="text-sm font-bold text-dark-brown">{wasteType}</p>
                </div>

                <ArrowRight className="w-5 h-5 text-deep-green rotate-90 animate-bounce-arrow" />

                <div className="w-full rounded-xl bg-deep-green/10 px-4 py-3 hover:bg-deep-green/15 transition-colors duration-300">
                  <p className="text-[10px] uppercase tracking-wider text-muted-green mb-1">Activation</p>
                  <p className="text-sm font-bold text-dark-brown">{agent} @ {activationTemp}°C</p>
                  <p className="text-xs text-muted-green">{activationTime} min</p>
                </div>

                <ArrowRight className="w-5 h-5 text-deep-green rotate-90 animate-bounce-arrow" style={{ animationDelay: '150ms' }} />

                <div className="w-full rounded-xl bg-deep-green px-4 py-3 hover:shadow-lg transition-all duration-300">
                  <p className="text-[10px] uppercase tracking-wider text-cream/70 mb-1">Product</p>
                  <p className="text-sm font-bold text-cream">
                    {wasteType} Activated Carbon
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-gold animate-pulse-soft" />
                    <span className="text-[10px] text-accent-gold font-medium">Ready for Adsorption</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Process Parameters Summary */}
          <Reveal delay={90} animation="animate-slide-in-right">
            <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-sm font-semibold text-dark-brown mb-4 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-deep-green group-hover:animate-pulse-soft" />
                Process Parameters Summary
              </h3>

              <div className="space-y-3">
                {[
                  { label: 'Waste Type', value: wasteType },
                  { label: 'Activating Agent', value: agent },
                  { label: 'Temperature', value: `${activationTemp} °C` },
                  { label: 'Duration', value: `${activationTime} min` },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center hover:bg-beige/50 p-1.5 rounded-lg transition-colors duration-200">
                    <span className="text-xs text-muted-green">{item.label}</span>
                    <span className="text-sm font-semibold text-dark-brown">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Navigation */}
      <Reveal>
        <div className="flex justify-between pt-4">
          <button
            onClick={() => setPage('dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-green
                       border border-beige hover:bg-beige/60 hover:-translate-x-1 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <button
            onClick={() => setPage('experiment')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-cream
                       bg-deep-green hover:bg-deep-green/90 hover:-translate-y-0.5 shadow-lg shadow-deep-green/20 transition-all duration-200 group"
          >
            Next: Adsorption Experiment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </Reveal>
    </div>
  );
}