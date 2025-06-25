import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferBannerProps {
  /**
   * The main headline for the offer.
   */
  title?: string;
  /**
   * A short description of the offer.
   */
  description?: string;
  /**
   * The text to display on the call-to-action button.
   */
  ctaText?: string;
  /**
   * The URL the call-to-action button should link to.
   */
  ctaLink?: string;
  /**
   * Optional additional class names for custom styling.
   */
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Limited Time Offer",
  description = "Discover amazing deals on our top destinations. Book now and save!",
  ctaText = "View Deals",
  ctaLink = "#",
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg border bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-8 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30',
        className
      )}
    >
      {/* Subtle background glow element */}
      <div className="absolute -inset-24 -z-0 opacity-10 animate-pulse [background:radial-gradient(50%_50%_at_50%_50%,#f59e0b_0%,rgba(255,255,255,0)_100%)]" />

      <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="max-w-prose text-white/90">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button size="lg" variant="secondary" asChild>
            <a href={ctaLink}>
              {ctaText}
              <MoveRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;