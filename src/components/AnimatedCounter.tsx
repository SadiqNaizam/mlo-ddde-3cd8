import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  /**
   * The target value to animate to.
   */
  value: number;
  /**
   * Optional className to apply to the component.
   */
  className?: string;
  /**
   * Animation duration in seconds.
   * @default 0.8
   */
  duration?: number;
}

/**
 * A component that animates a numerical value from a start to an end point.
 * It uses framer-motion for a smooth animation.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className,
  duration = 0.8,
}) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log('AnimatedCounter loaded or value changed');
    const node = countRef.current;
    if (!node) return;

    // Get the previous value from the node's text content, or default to 0
    const fromValue = parseFloat(node.textContent?.replace(/,/g, '') || '0');

    // Only animate if the value has actually changed
    if (fromValue !== value) {
      const controls = animate(fromValue, value, {
        duration: duration,
        ease: 'easeOut',
        onUpdate(latest) {
          if (node) {
            // Format number with commas and no decimal places
            node.textContent = new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 0,
            }).format(Math.round(latest));
          }
        },
      });

      // Cleanup function to stop the animation if the component unmounts
      return () => controls.stop();
    }
  }, [value, duration]);

  return (
    <motion.span
      ref={countRef}
      className={cn("font-mono", className)}
      // Set initial text content to avoid flash of 0 if initial value is different
      suppressHydrationWarning
    >
      {new Intl.NumberFormat('en-US').format(value)}
    </motion.span>
  );
};

export default AnimatedCounter;