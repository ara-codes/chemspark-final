import React, { createContext, useContext, useState, useEffect } from 'react';
import { processExperiments } from '../calculations/adsorption';

const AppContext = createContext(null);

const STORAGE_KEY = 'waste-to-water-state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

const defaultState = {
  currentPage: 'landing',
  wasteSelection: { wasteType: 'Coconut Shell', agent: 'KOH', activationTemp: 700, activationTime: 120 },
  experiments: [],
  processedExperiments: [],
  isDemo: false,
  recommendation: null,
};

export function AppProvider({ children }) {
  const [state, setState] = useState(() => loadState() || defaultState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setPage = (page) => setState(s => ({ ...s, currentPage: page }));

  const setWasteSelection = (sel) => setState(s => ({ ...s, wasteSelection: { ...s.wasteSelection, ...sel } }));

  const setExperiments = (exps) => {
    const processed = processExperiments(exps);
    setState(s => ({ ...s, experiments: exps, processedExperiments: processed }));
  };

  const addExperiment = (exp) => {
    setState(s => {
      const updated = [...s.experiments, exp];
      return { ...s, experiments: updated, processedExperiments: processExperiments(updated) };
    });
  };

  const removeExperiment = (id) => {
    setState(s => {
      const updated = s.experiments.filter(e => e.id !== id);
      return { ...s, experiments: updated, processedExperiments: processExperiments(updated) };
    });
  };

  const loadDemo = (demoExps, demoWaste) => {
    const processed = processExperiments(demoExps);
    setState(s => ({
      ...s,
      experiments: demoExps,
      processedExperiments: processed,
      wasteSelection: demoWaste || s.wasteSelection,
      isDemo: true,
    }));
  };

  const setRecommendation = (rec) => setState(s => ({ ...s, recommendation: rec }));

  const clearAll = () => setState(defaultState);

  const value = {
    ...state,
    setPage,
    setWasteSelection,
    setExperiments,
    addExperiment,
    removeExperiment,
    loadDemo,
    setRecommendation,
    clearAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
