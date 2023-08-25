import { css, styled } from "@stitches/react";

export const CordeisContainer = styled("div", {

})

export const CordeisOptions = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "40px -50px",
})

export const OptionsLeft = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

export const OptionsRight = styled("div", {
  display: "flex",
  alignItems: "center",
})

export const InputContainer = styled("div", {
  position: "relative",
  margin: "10px 0",
  width: "200px",
});

export const Input = styled("input", {
  fontSize: "20px",
  width: "100%",
  border: "none",
  borderBottom: "2px solid #ccc",
  padding: "5px 0",
  backgroundColor: "transparent",
  outline: "none",
  "&:focus ~ .label": {
    top: "-20px",
    fontSize: "16px",
    color: "#fff",
  },
});

export const Label = styled("label", {
  position: "absolute",
  top: "0",
  left: "0",
  color: "#ccc",
  transition: "all 0.3s ease",
  pointerEvents: "none",
});

export const Underline = styled("div", {
  position: "absolute",
  bottom: "0",
  left: "0",
  height: "2px",
  width: "100%",
  backgroundColor: "#fff",
  transform: "scaleX(0)",
  transition: "all 0.3s ease",
  [`${Input}:focus ~ &`]: {
    transform: "scaleX(1)",
  },
});

export const CordeisContent = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 270px)",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  gap: 50,

  img: {
    width: 270,
    height: 320
  },

  '.flip-card': {
    backgroundColor: 'transparent',
    width: '270px',
    height: '320px',
    perspective: '1000px',
  },

  '.flip-card-inner': {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 1.2s',
    transformStyle: 'preserve-3d',
  },

  '.flip-card:hover .flip-card-inner': {
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


export const PaginationButton = styled("button", {
  // Estilos para os botões de paginação
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  backgroundColor: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "8px",

  "&.active": {
    background: "linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%)",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    border: "none",
    color: "white",
    fontWeight: "bold"
  },
});