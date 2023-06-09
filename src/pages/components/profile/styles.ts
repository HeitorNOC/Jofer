import { styled } from "@stitches/react";

export const ProfileContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  marginTop: 125,
  marginRight: 120,

  "@media (max-width: 1440px)": {
    marginTop: 30,
    marginRight: 0
  },
  "@media (max-width: 500px)": {
    marginTop: 30,
    marginRight: 0,
    flexDirection: "column",
    

  },

  "@media (max-width: 768px)": {
    marginRight: 10
  }
});

export const ProfileLeft = styled("div", {});

export const ProfileRight = styled("div", {
  textAlign: "right",
  ".upper": {
    marginBottom: 70,
    h1: {
      fontWeight: 700,
      fontSize: 96,
      color: "#FFFFFF",
    },
    h4: {
      fontWeight: 400,
      fontSize: 40,
      color: "#FFFFFF",
    },
  },
  ".lower": {
    display: "flex",
    justifyContent: "space-between",
    button: {
      cursor: "pointer",
      fontSize: "18px",
      background: "linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%)",
      color: "white",
      padding: "0.8em 1.2em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "25px",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
      },
      "&:active": {
        transform: "scale(0.95)",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      },
    },
    ".animated": {
      "&:hover svg": {
        transform: "rotate(45deg)",
      },
    },
    span: {
      display: "block",
      marginLeft: "0.4em",
      transition: "all 0.3s",
    },
    svg: {
      width: "18px",
      height: "18px",
      fill: "white",
      transition: "all 0.3s",
    },
    "button .svg-wrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      marginRight: "0.5em",
      transition: "all 0.3s",
    },
    "button:hover .svg-wrapper": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  "@media (max-width: 1440px)": {
    marginRight: 80,
    ".lower button": {
      fontSize: "16px",
      padding: "0.6em 1em",
    },
    ".upper": {
      h1: {
      fontSize: 62
    },
    h4: {
      fontSize: 28
    }
    }
    
  },
  "@media (max-width: 1024px)": {
    marginRight: 0,
    ".upper": {
      marginBottom: 50,
      h1: {
        fontSize: 60,
      },
      h4: {
        fontSize: 28,
      },
    },
    ".lower": {
      flexDirection: "column",
      alignItems: "center",
      button: {
        marginBottom: 20,
      },
    },
  },
  "@media (max-width: 768px)": {
    ".upper": {
      marginBottom: 40,
      h1: {
        fontSize: 48,
      },
      h4: {
        fontSize: 24,
      },
    },
    "@media (max-height: 480px)": {

      ".lower": {
        display: "flex",
        flexDirection: "row"
      }
    }
  },
  "@media (max-width: 500px)": {
    flexDirection: "column",
    ".upper": {
      marginBottom: 30,
      textAlign: "center",
      h1: {
        fontSize: 36,
      },
      h4: {
        fontSize: 18,
      },
    },
    ".lower": {
      button: {
        fontSize: 16,
        padding: "0.6em 1em",
      },
    },
  },
});
