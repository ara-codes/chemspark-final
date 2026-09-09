/**
 * Optimization logic for AI module
 * Identifies best operating conditions from experimental data
 */

/**
 * Find the experiment with maximum removal
 */
export function findMaxRemoval(experiments) {
  const processed = experiments.filter(e => e.removal !== null && e.removal !== undefined);
  if (processed.length === 0) return null;
  return processed.reduce((best, curr) =>
    (curr.removal > (best?.removal ?? -Infinity)) ? curr : best
  , null);
}

/**
 * Find the experiment with maximum adsorption capacity
 */
export function findMaxQe(experiments) {
  const processed = experiments.filter(e => e.qe !== null && e.qe !== undefined);
  if (processed.length === 0) return null;
  return processed.reduce((best, curr) =>
    (curr.qe > (best?.qe ?? -Infinity)) ? curr : best
  , null);
}

/**
 * Compute average optimal conditions across top performers (top 25%)
 */
export function computeOptimalConditions(experiments) {
  const processed = experiments.filter(e => e.removal !== null && e.removal !== undefined);
  if (processed.length === 0) return null;

  const sorted = [...processed].sort((a, b) => b.removal - a.removal);
  const topN = Math.max(1, Math.ceil(sorted.length * 0.25));
  const top = sorted.slice(0, topN);

  const avg = (arr, key) => {
    const vals = arr.map(e => e[key]).filter(v => v != null && !isNaN(v));
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };

  return {
    pH: parseFloat(avg(top, 'pH')?.toFixed(1) ?? '7.0'),
    contactTime: parseFloat(avg(top, 'contactTime')?.toFixed(0) ?? '30'),
    adsorbentDose: parseFloat(avg(top, 'adsorbentDose')?.toFixed(2) ?? '1.0'),
    C0: parseFloat(avg(top, 'C0')?.toFixed(1) ?? '50'),
    predictedRemoval: parseFloat(avg(top, 'removal')?.toFixed(1) ?? '0'),
    predictedQe: parseFloat(avg(top, 'qe')?.toFixed(2) ?? '0'),
    bestWasteType: top[0]?.wasteType || 'Coconut Shell',
    bestAgent: top[0]?.agent || 'KOH',
    activationTemp: top[0]?.activationTemp || 600,
    activationTime: top[0]?.activationTime || 60,
  };
}

/**
 * Generate recommendation text
 */
export function generateRecommendation(conditions, bestIsotherm) {
  if (!conditions) return null;
  return {
    wasteType: conditions.bestWasteType,
    agent: conditions.bestAgent,
    activationTemp: conditions.activationTemp,
    activationTime: conditions.activationTime,
    pH: conditions.pH,
    adsorbentDose: conditions.adsorbentDose,
    contactTime: conditions.contactTime,
    predictedRemoval: conditions.predictedRemoval,
    predictedQe: conditions.predictedQe,
    bestIsotherm: bestIsotherm || 'N/A',
    confidence: 'Medium',
  };
}
