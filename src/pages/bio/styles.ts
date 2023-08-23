import { styled } from "@stitches/react";
import Image from "next/image";

export const BioContainer = styled('div', {
    display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "$loContrast",
})

export const Title = styled("h1", {
    // estilos do título
    fontFamily: "$system",
    fontSize: "$3",
    color: "$hiContrast",
  });
  
  export const Photo = styled(Image, {
    // estilos da foto
    borderRadius: "50%",
    border: "4px solid $hiContrast",
  });
  
  export const Text = styled("p", {
    // estilos do texto
    fontFamily: "$system",
    fontSize: "$2",
    color: "$hiContrast",
    textAlign: "center",
    maxWidth: "600px",
  });
  
  export const Icons = styled("div", {
    // estilos dos ícones
    display: "flex",
    gap: "16px",
  });
  
  export const Icon = styled(Image, {
    // estilos do ícone
    filter: "invert(1)",
  });