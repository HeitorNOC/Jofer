// src/global.d.ts
import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string
        alt?: string
        cameraControls?: boolean
        environmentImage?: string
        ar?: boolean
        // outras props que usar…
      }
    }
  }
}
