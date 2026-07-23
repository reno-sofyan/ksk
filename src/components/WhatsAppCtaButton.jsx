import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils.js';

const variantClasses = {
  hero: 'border border-accent/80 bg-accent text-primary shadow-[0_18px_42px_rgba(208,173,90,0.28)] hover:border-white hover:bg-white',
  light: 'border border-primary/15 bg-white text-primary shadow-[0_18px_42px_rgba(7,39,29,0.08)] hover:border-accent hover:bg-accent',
  dark: 'border border-accent bg-primary text-accent shadow-[0_18px_42px_rgba(7,39,29,0.18)] hover:bg-accent hover:text-primary'
};

const WhatsAppCtaButton = ({
  href,
  children,
  ctaLabel,
  variant = 'dark',
  external = true,
  className,
  iconClassName
}) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    data-ctwa-label={ctaLabel}
    className={cn(
      'inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-h-14 sm:px-7 sm:py-4 sm:text-base',
      variantClasses[variant],
      className
    )}
  >
    <MessageCircle className={cn('h-5 w-5 shrink-0', iconClassName)} aria-hidden="true" />
    <span>{children}</span>
    <ArrowUpRight className={cn('h-4 w-4 shrink-0', iconClassName)} aria-hidden="true" />
  </a>
);

export default WhatsAppCtaButton;
