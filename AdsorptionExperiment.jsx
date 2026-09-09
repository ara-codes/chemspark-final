import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { processExperiment, validateExperiment } from '../calculations/adsorption';
import { DEMO_EXPERIMENTS } from '../data/demoData';
import { generateId } from '../utils/helpers';
import { POLLUTANT_TYPES } from '../data/demoData';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Plus, Trash2, Calculator, RotateCcw, Database,
  ArrowLeft, ArrowRight, FlaskConical, AlertCircle, RefreshCw,
} from 'lucide-react';

const EMPTY_ROW = () => ({
  id: generateId(),
  C0: '',
  Ce: '',
  V: '',
  m: '',
  pH: '',
  contactTime: '',
  adsorbentDose: '',
  pollutant: 'Methylene Blue',
});

export default function AdsorptionExperiment() {
  const {
    experiments, setExperiments, addExperiment, removeExperiment,
    loadDemo, setPage, isDemo,
  } = useApp();

  const [calculated, setCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [calculating, setCalculating] = useState(false);

  const processed = calculated
    ? experiments.map(e => processExperiment(e))
    : experiments;

  const handleAddRow = () => {
    setCalculated(false);
    setErrors({});
    addExperiment(EMPTY_ROW());
  };

  const handleRemoveRow = (id) => {
    setCalculated(false);
    removeExperiment(id);
    setErrors(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleClear = () => {
    setExperiments([]);
    setCalculated(false);
    setErrors({});
  };

  const handleLoadDemo = () => {
    loadDemo(DEMO_EXPERIMENTS);
    setCalculated(false);
    setErrors({});
  };

  const handleChange = (id, field, value) => {
    setExperiments(
      experiments.map(e =>
        e.id === id ? { ...e, [field]: field === 'pollutant' ? value : (value === '' ? '' : Number(value)) } : e
      )
    );
    setCalculated(false);
  };

  const handleCalculate = () => {
    const allErrors = {};
    experiments.forEach(exp => {
      const errs = validateExperiment(exp);
      if (Object.keys(errs).length > 0) allErrors[exp.id] = errs;
    });
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      setCalculating(true);
      setTimeout(() => {
        setCalculated(true);
        setCalculating(false);
      }, 250);
    }
  };

  const fieldError = (expId, field) =>
    errors[expId]?.[field] || null;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-deep-green flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-accent-gold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-brown">Adsorption Experiment</h2>
          <p className="text-sm text-muted-green">Enter experimental parameters for batch adsorption studies</p>
        </div>
      </div>

      {/* Demo notice */}
      {isDemo && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-gold/10 border border-accent-gold/30 text-dark-brown text-sm">
          <Database className="w-4 h-4 text-accent-gold shrink-0" />
          <span>
            <strong>Demo Dataset</strong> — Replace with your experimental data or modify the values above.
          </span>
        </div>
      )}

      {/* Validation banner */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Please fix the highlighted errors before calculating.</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-beige shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-deep-green/5 border-b border-beige">
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">#</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">C₀ (mg/L)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">Cₑ (mg/L)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">V (mL)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">m (g)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">pH</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">Contact Time (min)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">Dose (g/L)</th>
                <th className="px-3 py-3 text-left font-semibold text-dark-brown">Pollutant</th>
                {calculated && (
                  <>
                    <th className="px-3 py-3 text-left font-semibold text-deep-green">Removal (%)</th>
                    <th className="px-3 py-3 text-left font-semibold text-deep-green">qₑ (mg/g)</th>
                  </>
                )}
                <th className="px-3 py-3 text-center font-semibold text-dark-brown">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processed.length === 0 ? (
                <tr>
                  <td colSpan={calculated ? 12 : 10} className="px-3 py-12 text-center text-muted-green">
                    No experiments yet. Click "Add Experiment" or "Load Demo Dataset" to begin.
                  </td>
                </tr>
              ) : (
                processed.map((exp, idx) => {
                  const hasErrors = errors[exp.id] && Object.keys(errors[exp.id]).length > 0;
                  return (
                    <tr
                      key={exp.id}
                      className={`border-b border-beige/60 transition-colors animate-fade-in ${
                        hasErrors ? 'bg-red-50/50' : 'hover:bg-beige/30'
                      }`}
                      style={{ animationDelay: `${idx * 15}ms` }}
                    >
                      <td className="px-3 py-2.5 font-medium text-muted-green">{idx + 1}</td>

                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.C0}
                          onChange={e => handleChange(exp.id, 'C0', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'C0') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 100"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.Ce}
                          onChange={e => handleChange(exp.id, 'Ce', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'Ce') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 12.5"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.V}
                          onChange={e => handleChange(exp.id, 'V', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'V') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 100"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.m}
                          onChange={e => handleChange(exp.id, 'm', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'm') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 0.5"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.pH}
                          onChange={e => handleChange(exp.id, 'pH', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'pH') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 6.0"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.contactTime}
                          onChange={e => handleChange(exp.id, 'contactTime', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20 ${
                            fieldError(exp.id, 'contactTime') ? 'border-red-400' : 'border-beige'
                          }`}
                          placeholder="e.g. 60"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={exp.adsorbentDose}
                          onChange={e => handleChange(exp.id, 'adsorbentDose', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-beige bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20"
                          placeholder="e.g. 5.0"
                          step="any"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <select
                          value={exp.pollutant}
                          onChange={e => handleChange(exp.id, 'pollutant', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-beige bg-warm-white/60 text-dark-brown text-sm outline-none transition-colors focus:border-deep-green focus:ring-1 focus:ring-deep-green/20"
                        >
                          {POLLUTANT_TYPES.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>

                      {calculated && (
                        <>
                          <td className="px-3 py-2.5">
                            {exp.removal != null ? (
                              <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                                exp.removal >= 80 ? 'bg-deep-green/10 text-deep-green'
                                  : exp.removal >= 50 ? 'bg-accent-gold/15 text-dark-brown'
                                    : 'bg-red-100 text-red-600'
                              }`}>
                                {exp.removal.toFixed(1)}%
                              </span>
                            ) : (
                              <span className="text-muted-green">—</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            {exp.qe != null ? (
                              <span className="text-dark-brown font-medium text-xs">
                                {exp.qe.toFixed(4)}
                              </span>
                            ) : (
                              <span className="text-muted-green">—</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="px-3 py-2.5 text-center">
                        <button
                          onClick={() => handleRemoveRow(exp.id)}
                          className="p-1.5 rounded-lg text-muted-green hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete experiment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleAddRow}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-deep-green text-cream text-sm font-medium shadow-sm hover:bg-deep-green/90 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
        >
          <Plus className="w-4 h-4" /> Add Experiment
        </button>

        <button
          onClick={handleCalculate}
          disabled={experiments.length === 0 || calculating}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-gold text-dark-brown text-sm font-medium shadow-sm hover:bg-accent-gold/90 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {calculating
            ? <><RefreshCw className="w-4 h-4 animate-spin" /> Calculating…</>
            : <><Calculator className="w-4 h-4" /> Calculate</>
          }
        </button>

        <button
          onClick={handleClear}
          disabled={experiments.length === 0 || calculating}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" /> Clear Data
        </button>

        <button
          onClick={handleLoadDemo}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-accent-gold/40 text-dark-brown text-sm font-medium hover:bg-accent-gold/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
        >
          <Database className="w-4 h-4" /> Load Demo Dataset
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setPage('waste-selection')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Waste Selection
        </button>
        <button
          onClick={() => setPage('analysis')}
          disabled={experiments.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-green text-cream text-sm font-medium shadow-sm hover:bg-deep-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next: Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
