/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';
declare module 'react-country-flag';
declare module 'cidr-matcher';
declare module '@analytics/google-analytics';

declare module 'use-analytics' {
  const AnalyticsInstance = import('analytics').AnalyticsInstance;
  const React = import('react').React;
  export const useAnalytics = (): AnalyticsInstance => AnalyticsInstance;
  export const AnalyticsProvider: React.FC<{
    instance: AnalyticsInstance;
  }>;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '*.module.scss' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '*.module.sass' {
  const classes: {[key: string]: string};
  export default classes;
}
