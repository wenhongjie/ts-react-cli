/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-router-dom" />

/** 当前应用的版本号 */
declare const VERSION: string;

/** 当前应用运行环境 */
declare const ENV: 'development' | 'production'

/** 当前应用运行环境 等同于 ENV */
declare const NODE_ENV: 'development' | 'production'

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

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.global.css' {
  const src: string;
  export default src;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.global.scss' {
  const src: string;
  export default src;
}

