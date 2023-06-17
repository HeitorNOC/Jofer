import { styled } from "@stitches/react";

export const CordeisContainer = styled("div", {

})

export const CordeisOptions = styled("div", {

})

export const OptionsLeft = styled("div", {

})

export const OptionsRight = styled("div", {
  
})

export const CordeisContent = styled("div", {
  '.flip-card': {
    backgroundColor: 'transparent',
    width: '190px',
    height: '254px',
    perspective: '1000px',
  },
  
  '.title': {
    fontSize: '1.5em',
    fontWeight: 900,
    textAlign: 'center',
    margin: 0,
  },
  
  '.flip-card-inner': {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 1.2s',
    transformStyle: 'preserve-3d',
  },
  
  '.flip-card:hover .flip-card-inner' :{
    transform: 'rotateY(180deg)',
  },
  
  '.flip-card-front, .flip-card-back': {
    boxShadow: '0 8px 14px 0 rgba(0,0,0,0.2)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    
    borderRadius: '1rem',
  },
  
  '.flip-card-front': {
    
    color: 'coral',
  },
  
  '.flip-card-back': {
    color: 'white',
    transform: 'rotateY(180deg)',
  }
})