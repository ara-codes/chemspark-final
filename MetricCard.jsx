import React from 'react';
import AnimatedNumber from './AnimatedNumber';

export default function MetricCard({ icon: Icon, label, value, unit, color = 'deep-green' }) {
  const colorMap = {
    'deep-green': { bg: 'bg-deep-green/10', icon: 'text-deep-green', border: 'border-deep-green/20', hover: 'hover:border-deep-green/40' },
    'accent-gold': { bg: 'bg-accent-gold/10', icon: 'text-accent-gold', border: 'border-accent-gold/20', hover: 'hover:border-accent-gold/40' },
    'muted-green': { bg: 'bg-muted-green/10', icon: 'text-muted-green', border: 'border-muted-green/20', hover: 'hover:border-muted-green/40' },
    'dark-brown': { bg: 'bg-dark-brown/10', icon: 'text-dark-brown', border: 'border-dark-brown/20', hover: 'hover:border-dark-brown/40' },
  };
  const c = colorMap[color] || colorMap['deep-green'];
  const isNumeric = typeof value === 'number' || (typeof value === 'string' && value !== '—' && !isNaN(Number(value)));

  return (
    <div className={`bg-cream rounded-2xl p-5 border ${c.border} ${c.hover} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon className={`w-5 h-5 ${c.icon}`} />}
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity"><Icon className={`w-3.5 h-3.5 ${c.icon}`} /></span>
      </div>
      <p className="text-xs font-medium text-muted-green uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        {isNumeric ? (
          <AnimatedNumber
            value={Number(value)}
            decimals={unit === 'mg/g' ? 2 : unit === '%' ? 1 : 0}
            suffix={unit ? ` ${unit}` : ''}
            className="text-2xl font-bold text-dark-brown"
          />
        ) : (
          <>
            <span className="text-2xl font-bold text-dark-brown">{value ?? '—'}</span>
            {unit && <span className="text-sm text-muted-green font-medium">{unit}</span>}
          </>
        )}
      </div>
    </div>
  );
}