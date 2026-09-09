/**
 * Adsorption calculation utilities
 * Core formulas for wastewater treatment analysis
 */

/**
 * Calculate pollutant removal efficiency (%)
 * Formula: Removal (%) = [(C₀ − Cₑ) / C₀] × 100
 * @param {number} C0 - Initial concentration (mg/L)
 * @param {number} Ce - Equilibrium concentration (mg/L)
 * @returns {number} Removal percentage
 */
export function calcRemoval(C0, Ce) {
  if (!C0 || C0 <= 0 || Ce < 0) return null;
  return ((C0 - Ce) / C0) * 100;
}

/**
 * Calculate adsorption capacity (qₑ)
 * Formula: qₑ = [(C₀ − Cₑ) × V] / m
 * @param {number} C0 - Initial concentration (mg/L)
 * @param {number} Ce - Equilibrium concentration (mg/L)
 * @param {number} V  - Solution volume (mL)
 * @param {number} m  - Adsorbent mass (g)
 * @returns {number} Adsorption capacity (mg/g)
 */
export function calcAdsorptionCapacity(C0, Ce, V, m) {
  if (!C0 || !V || !m || C0 <= 0 || V <= 0 || m <= 0) return null;
  return ((C0 - Ce) * V) / (m * 1000);
}

/**
 * Process a single experiment row and compute derived values
 */
export function processExperiment(exp) {
  const removal = calcRemoval(exp.C0, exp.Ce);
  const qe = calcAdsorptionCapacity(exp.C0, exp.Ce, exp.V, exp.m);
  return {
    ...exp,
    removal: removal !== null ? parseFloat(removal.toFixed(2)) : null,
    qe: qe !== null ? parseFloat(qe.toFixed(4)) : null,
  };
}

/**
 * Process all experiments
 */
export function processExperiments(experiments) {
  return experiments.map(processExperiment);
}

/**
 * Validate an experiment row
 */
export function validateExperiment(exp) {
  const errors = {};
  if (!exp.C0 || exp.C0 <= 0) errors.C0 = 'C₀ must be > 0';
  if (exp.Ce < 0) errors.Ce = 'Cₑ cannot be negative';
  if (exp.Ce >= exp.C0 && exp.C0 > 0) errors.Ce = 'Cₑ must be < C₀';
  if (!exp.V || exp.V <= 0) errors.V = 'Volume must be > 0';
  if (!exp.m || exp.m <= 0) errors.m = 'Mass must be > 0';
  if (!exp.pH || exp.pH < 1 || exp.pH > 14) errors.pH = 'pH must be 1–14';
  if (!exp.contactTime || exp.contactTime <= 0) errors.contactTime = 'Time must be > 0';
  return errors;
}
