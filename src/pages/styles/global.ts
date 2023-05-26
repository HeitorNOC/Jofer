import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,

    
  },

  '#container': {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  '#container::before': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    
    background: "linear-gradient(-45deg, #7348f3 50%, #a8b0ff 50%)",
    zIndex: -1,
  },

 /* '#container::after': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'green',
    clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
    zIndex: -1,
  } */

});