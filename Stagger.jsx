import React from 'react';

/**
 * Stagger — shows children one after another with a cascading delay.
 * Klon: pass `delay` per item via index.
 */
export default function Stagger({ children, baseDelay = 40, className = '' }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          className: `${child.props.className || ''} stagger-item`,
          style: { animationDelay: `${baseDelay * index}ms` },
        })
      )}
    </div>
  );
}