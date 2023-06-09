import { styled } from "@stitches/react";

export const NavContainer = styled("div", {
  background: "rgba(255, 255, 255, 0.8)",
  margin: "8px 240px",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

  "@media (max-width: 1440px)": {
    margin: "8px 100px",
  },

  "@media (max-width: 1024px)": {
    margin: "8px 20px",
  },

  "@media (max-width: 768px)": {
    margin: "8px 20px",
  },

  "@media (max-width: 500px)": {
    margin: "8px 10px",
  },

  variants: {
    blur: {
      true: {
        backdropFilter: "blur(10px)",
        pointerEvents: "none",
      },
    },
  },
});

export const NavContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 80px",

  "@media (max-width: 1024px)": {
    padding: "8px 20px",
  },

  "@media (max-width: 768px)": {
    padding: "8px 20px",
  },

  "@media (max-width: 500px)": {
    padding: "8px 10px",
  },
});

export const NavLeft = styled("div", {});

export const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: 6,
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
    transform: "translateY(-3px)",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
  },

  variants: {
    color: {
      black: {},
      white: {},
    },
  },

  "@media (max-width: 500px)": {
    //display: "none",
  },
});

export const SidebarIcon = styled("div", {
  display: "none",
  cursor: "pointer",
  "@media (max-width: 768px)": {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 10px",
  },
});

export const SidebarLinks = styled("div", {
  display: "none",
  flexDirection: "column",
  gap: 16,
  padding: "16px 24px",
  position: "fixed",
  top: 0,
  right: 0,
  width: "300px",
  height: "100vh",
  background: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "0 0 8px 0",
  overflowY: "auto",
  zIndex: 999,

  a: {
    color: "#333333",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "150%",
    transition: "color 0.3s",

    "&:hover": {
      color: "#4dc7d9",
    },
  },

  "@media (max-width: 768px)": {
    display: "flex",
  },
});

export const CloseButton = styled("button", {
  display: "none",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "#000",
  position: "fixed",
  top: 20,
  right: 20,
  fontSize: 24,
  padding: 8,
  zIndex: 999999999999,

  "@media (max-width: 768px)": {
    display: "block",
  },
});

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

  variants: {
    blur: {
      true: {
        backdropFilter: "blur(10px)",
        pointerEvents: "none",
      },
    },
  },

  "@media (max-width: 768px)": {
    display: "none",
  },
});
