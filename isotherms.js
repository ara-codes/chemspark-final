/**
 * Isotherm modelling: Langmuir and Freundlich
 */

/**
 * Linear regression helper
 * Given arrays x and y, compute slope, intercept, and R²
 */
function linearRegression(x, y) {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: 0, r2: 0 };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const ssRes = y.reduce((a, yi, i) => a + (yi - (slope * x[i] + intercept)) ** 2, 0);
  const meanY = sumY / n;
  const ssTot = y.reduce((a, yi) => a + (yi - meanY) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
  return { slope, intercept, r2 };
}

/**
 * Langmuir Isotherm (linear form):
 *   Cₑ/qₑ = 1/(qₘₐₓ × Kₗ) + Cₑ/qₘₐₓ
 * x = Cₑ, y = Cₑ/qₑ
 * slope = 1/qₘₐₓ  →  qₘₐₓ = 1/slope
 * intercept = 1/(qₘₐₓ × Kₗ)  →  Kₗ = slope / intercept
 */
export function fitLangmuir(data) {
  const valid = data.filter(d => d.Ce > 0 && d.qe > 0);
  if (valid.length < 2) return null;
  const x = valid.map(d => d.Ce);
  const y = valid.map(d => d.Ce / d.qe);
  const { slope, intercept, r2 } = linearRegression(x, y);
  if (slope <= 0) return null;
  const qmax = 1 / slope;
  const Kl = intercept > 0 ? slope / intercept : 0;
  return {
    qmax: parseFloat(qmax.toFixed(4)),
    Kl: parseFloat(Kl.toFixed(6)),
    r2: parseFloat(r2.toFixed(6)),
    points: valid.map(d => ({ Ce: d.Ce, yCalc: d.Ce / d.qe })),
    curvePoints: Array.from({ length: 50 }, (_, i) => {
      const maxCe = Math.max(...valid.map(d => d.Ce));
      const Ce = (maxCe / 49) * i;
      const qe = (qmax * Kl * Ce) / (1 + Kl * Ce);
      return { Ce, qe };
    }),
  };
}

/**
 * Freundlich Isotherm (linear form):
 *   ln(qₑ) = ln(Kf) + (1/n) × ln(Cₑ)
 * x = ln(Cₑ), y = ln(qₑ)
 * slope = 1/n  →  n = 1/slope
 * intercept = ln(Kf)  →  Kf = exp(intercept)
 */
export function fitFreundlich(data) {
  const valid = data.filter(d => d.Ce > 0 && d.qe > 0);
  if (valid.length < 2) return null;
  const x = valid.map(d => Math.log(d.Ce));
  const y = valid.map(d => Math.log(d.qe));
  const { slope, intercept, r2 } = linearRegression(x, y);
  if (slope <= 0) return null;
  const n = 1 / slope;
  const Kf = Math.exp(intercept);
  return {
    Kf: parseFloat(Kf.toFixed(4)),
    n: parseFloat(n.toFixed(4)),
    r2: parseFloat(r2.toFixed(6)),
    points: valid.map(d => ({ Ce: d.Ce, lnCe: Math.log(d.Ce), lnqe: Math.log(d.qe) })),
    curvePoints: Array.from({ length: 50 }, (_, i) => {
      const maxCe = Math.max(...valid.map(d => d.Ce));
      const Ce = Math.max((maxCe / 49) * i, 0.001);
      const qe = Kf * Math.pow(Ce, 1 / n);
      return { Ce, qe };
    }),
  };
}

/**
 * Determine best-fit isotherm based on R²
 */
export function bestFitIsotherm(langmuir, freundlich) {
  if (!langmuir && !freundlich) return null;
  if (!langmuir) return 'freundlich';
  if (!freundlich) return 'langmuir';
  return langmuir.r2 >= freundlich.r2 ? 'langmuir' : 'freundlich';
}
