import { styled } from "@stitches/react";

export const NavContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "16px 240px"
})
export const NavLeft = styled("div", {

})

export const Button = styled("button", {
  border: "1px solid #000000",
  padding: "8px 4px",
  cursor: 'pointer',
  gap: 8,
  variants: {
    color: {
      black:{
        padding: "8px 14px",
        background: "#000000",
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "150%",
      },
      white: {
        background: "#FFFFFF",
        color: "#000000",
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "150%",
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
    color: "#000000",
  },
})

export const Line = styled("div", {
        content: `''`,
        display: 'block',
        background: '#000000',
        //position: 'absolute',
        margin: "0 auto",
        
        width: "75%",
        height: 2,
        borderRadius: 'inherit',
        zIndex: 99,
})