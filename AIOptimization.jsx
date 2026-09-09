import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import {
  findMaxRemoval,
  findMaxQe,
  computeOptimalConditions,
  generateRecommendation,
} from '../calculations/optimization';
import { fitLangmuir, fitFreundlich, bestFitIsotherm } from '../calculations/isotherms';
import Reveal from '../components/Reveal';
import {
  DEMO_EXPERIMENTS,
  DEMO_WASTE_SELECTION,
  WASTE_TYPES,
  AGENTS,
} from '../data/demoData';
import {
  Sparkles,
  Settings,
  Target,
  Zap,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Database,
} from 'lucide-react';

export default function AIOptimization() {
  const {
    processedExperiments,
    wasteSelection,
    loadDemo,
    setPage,
    setRecommendation,
    isDemo,
  } = useApp();

  const [params, setParams] = useState({
    wasteType: WASTE_TYPES[0],
    activationTemp: 600,
    activationTime: 120,
    activatingAgent: AGENTS[0],
    initialConc: 100,
    adsorbentDose: 5,
    contactTime: 60,
    pH: 7,
  });
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runOptimization = () => {
    setIsRunning(true);
    setTimeout(() => {
      const maxRemoval = findMaxRemoval(processedExperiments);
      const maxQe = findMaxQe(processedExperiments);
      const optimal = computeOptimalConditions(processedExperiments);
      const langmuir = fitLangmuir(processedExperiments);
      const freundlich = fitFreundlich(processedExperiments);
      const bestIso = bestFitIsotherm(langmuir, freundlich);

      const cond = optimal || {
        bestWasteType: params.wasteType,
        bestAgent: params.activatingAgent,
        activationTemp: params.activationTemp,
        activationTime: params.activationTime,
        pH: params.pH,
        adsorbentDose: params.adsorbentDose,
        contactTime: params.contactTime,
        predictedRemoval: maxRemoval?.removal || 0,
        predictedQe: maxQe?.qe || 0,
      };

      const rec = generateRecommendation(cond, bestIso);
      setRecommendation(rec);
      setResults({
        removal: cond.predictedRemoval,
        qe: cond.predictedQe,
        optimal: cond,
        bestIsotherm: bestIso || 'N/A',
      });
      setIsRunning(false);
    }, 300);
  };

  const handleLoadDemo = () => {
    loadDemo(DEMO_EXPERIMENTS, DEMO_WASTE_SELECTION);
  };

  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  if (!processedExperiments || processedExperiments.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={22} className="text-deep-green" />
            <h1 className="text-2xl font-bold text-dark-brown">AI-Assisted Process Optimization</h1>
          </div>
          <p className="text-muted-green text-sm">
            Maximize pollutant removal and adsorption performance
          </p>
        </div>

        <div className="bg-cream rounded-2xl border border-accent-gold/20 p-10 shadow-sm flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-accent-gold/10 flex items-center justify-center mb-4">
            <Database size={28} className="text-accent-gold" />
          </div>
          <h2 className="text-lg font-semibold text-dark-brown mb-2">No Experimental Data Available</h2>
          <p className="text-sm text-muted-green leading-relaxed mb-6">
            Load a demo dataset to explore AI-assisted process optimization, or run your own experiments first.
          </p>
          <button
            onClick={handleLoadDemo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-dark-brown rounded-xl font-medium text-sm hover:bg-accent-gold/90 transition-colors shadow-lg"
          >
            <Database className="w-4 h-4" />
            Load Demo Dataset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={22} className="text-deep-green" />
          <h1 className="text-2xl font-bold text-dark-brown">AI-Assisted Process Optimization</h1>
        </div>
        <p className="text-muted-green text-sm">
          Maximize pollutant removal and adsorption performance
        </p>
        {isDemo && (
          <div className="mt-2 flex items-center gap-2 text-accent-gold text-sm">
            <AlertCircle className="w-4 h-4" />
            Using demo data — predictions are labeled as Demo/Estimated
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parameter Controls */}
        <Reveal animation="animate-slide-in-left">
        <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-bold text-dark-brown mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-deep-green animate-spin" style={{ animationDuration: '8s' }} />
            Parameter Controls
          </h2>
          <div className="space-y-5">
            {/* Waste Type */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">Agricultural Waste Type</label>
              <select
                value={params.wasteType}
                onChange={(e) => updateParam('wasteType', e.target.value)}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green"
              >
                {WASTE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Activation Temp */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Activation Temperature: {params.activationTemp}°C
              </label>
              <input
                type="range"
                min="300"
                max="900"
                step="10"
                value={params.activationTemp}
                onChange={(e) => updateParam('activationTemp', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>300°C</span>
                <span>900°C</span>
              </div>
            </div>

            {/* Activation Time */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Activation Time: {params.activationTime} min
              </label>
              <input
                type="range"
                min="15"
                max="300"
                step="5"
                value={params.activationTime}
                onChange={(e) => updateParam('activationTime', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>15 min</span>
                <span>300 min</span>
              </div>
            </div>

            {/* Activating Agent */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">Activating Agent</label>
              <select
                value={params.activatingAgent}
                onChange={(e) => updateParam('activatingAgent', e.target.value)}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-dark-brown text-sm focus:outline-none focus:ring-2 focus:ring-deep-green/30 focus:border-deep-green"
              >
                {AGENTS.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Concentration */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Initial Pollutant Concentration: {params.initialConc} mg/L
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={params.initialConc}
                onChange={(e) => updateParam('initialConc', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>10 mg/L</span>
                <span>500 mg/L</span>
              </div>
            </div>

            {/* Adsorbent Dose */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Adsorbent Dose: {params.adsorbentDose} g/L
              </label>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={params.adsorbentDose}
                onChange={(e) => updateParam('adsorbentDose', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>0.5 g/L</span>
                <span>20 g/L</span>
              </div>
            </div>

            {/* Contact Time */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Contact Time: {params.contactTime} min
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={params.contactTime}
                onChange={(e) => updateParam('contactTime', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>5 min</span>
                <span>180 min</span>
              </div>
            </div>

            {/* pH */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Solution pH: {params.pH}
              </label>
              <input
                type="range"
                min="1"
                max="14"
                step="0.5"
                value={params.pH}
                onChange={(e) => updateParam('pH', Number(e.target.value))}
                className="w-full accent-deep-green"
              />
              <div className="flex justify-between text-xs text-muted-green mt-1">
                <span>1</span>
                <span>14</span>
              </div>
            </div>
          </div>

          <button
            onClick={runOptimization}
            disabled={isRunning}
            className="mt-8 w-full bg-deep-green hover:bg-deep-green/90 disabled:opacity-60 text-cream font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-deep-green/20 hover:-translate-y-0.5 active:scale-95"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Running Optimization…
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 animate-pulse-soft" />
                Run Optimization
              </>
            )}
          </button>
        </div>
        </Reveal>

        {/* Results */}
        <Reveal animation="animate-slide-in-right">
        <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-bold text-dark-brown mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-gold animate-pulse-soft" />
            Optimization Results
          </h2>
          {results ? (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-warm-white rounded-xl p-4 border border-beige hover:shadow-md transition-all duration-300">
                <h3 className="text-md font-semibold text-deep-green mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-gold animate-pulse-soft" />
                  Best Parameter Combination
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Waste Type', results.optimal?.bestWasteType || params.wasteType],
                    ['Activation Temp', `${results.optimal?.activationTemp || params.activationTemp}°C`],
                    ['Activation Time', `${results.optimal?.activationTime || params.activationTime} min`],
                    ['Agent', results.optimal?.bestAgent || params.activatingAgent],
                    ['Concentration', `${results.optimal?.C0 || params.initialConc} mg/L`],
                    ['Dose', `${results.optimal?.adsorbentDose || params.adsorbentDose} g/L`],
                    ['Contact Time', `${results.optimal?.contactTime || params.contactTime} min`],
                    ['pH', results.optimal?.pH || params.pH],
                  ].map(([label, value], idx) => (
                    <div key={label} className="bg-beige/50 rounded-lg p-2.5 hover:bg-beige hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up" style={{ animationDelay: `${idx * 25}ms` }}>
                      <span className="text-xs text-muted-green block">{label}</span>
                      <p className="font-semibold text-dark-brown">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-warm-white rounded-xl p-4 border border-beige hover:shadow-md transition-all duration-300">
                <h3 className="text-md font-semibold text-deep-green mb-3">Predicted Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-deep-green/10 rounded-xl p-4 text-center border border-deep-green/20 hover:border-deep-green/40 transition-all duration-300 animate-scale-in">
                    <p className="text-3xl font-bold text-deep-green">{results.removal?.toFixed(1)}%</p>
                    <p className="text-sm text-dark-brown mt-1">
                      Max Removal
                      {isDemo && <span className="block text-accent-gold text-xs">(Demo/Estimated)</span>}
                    </p>
                  </div>
                  <div className="bg-accent-gold/10 rounded-xl p-4 text-center border border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300 animate-scale-in" style={{ animationDelay: '150ms' }}>
                    <p className="text-3xl font-bold text-accent-gold">{results.qe?.toFixed(2)}</p>
                    <p className="text-sm text-dark-brown mt-1">
                      Max qₑ (mg/g)
                      {isDemo && <span className="block text-accent-gold text-xs">(Demo/Estimated)</span>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-warm-white rounded-xl p-4 border border-beige">
                <h3 className="text-md font-semibold text-dark-brown mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-deep-green" />
                  Confidence Indicator
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-beige rounded-full h-3">
                    <div className={`h-3 rounded-full ${isDemo ? 'bg-accent-gold w-1/4' : 'bg-deep-green w-3/4'}`} />
                  </div>
                  <span className="text-sm font-medium text-dark-brown">
                    {isDemo ? 'Low (Demo Data)' : 'Moderate (Experimental)'}
                  </span>
                </div>
                <p className="text-xs text-muted-green mt-2">
                  {isDemo
                    ? 'Predictions based on demo data are estimated. Use real experiments for accurate results.'
                    : 'Model fit based on your experimental data. More data points improve accuracy.'}
                </p>
              </div>

              {/* Best-Fit Isotherm */}
              {results.bestIsotherm && results.bestIsotherm !== 'N/A' && (
                <div className="bg-accent-gold/10 rounded-xl p-4 border border-accent-gold/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent-gold" />
                    <span className="text-sm font-semibold text-dark-brown">Best-Fit Isotherm:</span>
                    <span className="text-sm font-bold text-deep-green capitalize">{results.bestIsotherm}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-green">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-40 animate-pulse-soft" />
              <p className="text-sm">Set parameters and click "Run Optimization" to see results</p>
            </div>
          )}
        </div>
        </Reveal>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setPage('isotherm')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 hover:-translate-x-1 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Isotherm
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setPage('results')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-green text-cream text-sm font-medium hover:bg-deep-green/90 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-lg shadow-deep-green/20"
          >
            View Results
            <ArrowRight className="w-4 h-4 animate-bounce-arrow" />
          </button>
          <button
            onClick={() => setPage('experiment')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent-gold/40 text-dark-brown text-sm font-medium hover:bg-accent-gold/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Run New Experiment
          </button>
        </div>
      </div>
    </div>
  );
}
