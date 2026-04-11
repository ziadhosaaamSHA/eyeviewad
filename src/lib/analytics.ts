'use client';

type AnalyticsValue = string | number | boolean;
type AnalyticsProps = Record<string, AnalyticsValue | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: Record<string, AnalyticsValue>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function normalizeProps(props: AnalyticsProps = {}) {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined && value !== null)
  ) as Record<string, AnalyticsValue>;
}

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === 'undefined') return;

  const payload = normalizeProps(props);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', eventName, payload);
  }
}
