import { styled } from "@stitches/react";

export const NavContainer = styled("div", {
  

  background: "rgba(255, 255, 255, 0.8)",
  margin: "8px 240px",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  //padding: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
})

export const NavContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 80px"
  

  
})
export const NavLeft = styled("div", {

})

export const Button = styled("button", {
  padding: "8px 20px",
  cursor: "pointer",
  background: "linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%)",
  
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  border: "none",
  color: "#FFFFFF",
  fontWeight: 400,
  fontSize: 20,
  lineHeight: "150%",
  borderRadius: "14px",
  transition: "all 0.3s",

  "&:hover": {
    transform: 'translateY(-3px)',
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
  },
  variants: {
    color: {
      black:{
        /* padding: "8px 14px",
        background: "#000000",
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "150%", */
      },
      white: {
        /* background: "#FFFFFF",
        color: "#000000",
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "150%", */
      }
    }
  }
})

export const NavRight = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 32,
  a: {
    textDecoration: "none",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: "150%",
    color: "#333333",
    transition: "color 0.3s ease",

    "&:hover": {
      color: "#555555",
    },
  },
})

