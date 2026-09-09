import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal — wraps children and animates them into view
 * when they enter the viewport (IntersectionObserver based).
 */
export default function Reveal({
  children,
  delay = 0,
  animation = 'animate-fade-in-up',
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${className} ${visible ? animation : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}