/**
 * General utility helpers
 */

let _idCounter = 0;

export function generateId() {
  return Date.now() + '-' + (++_idCounter);
}

export function formatNumber(num, decimals = 2) {
  if (num == null || isNaN(num)) return '—';
  return Number(num).toFixed(decimals);
}

export function formatPercent(num) {
  if (num == null || isNaN(num)) return '—';
  return Number(num).toFixed(1) + '%';
}

export function formatChemical(formula) {
  const subscriptMap = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  return formula.replace(/([A-Z][a-z]?)(\d)/g, (_, elem, digit) => elem + subscriptMap[digit]);
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
