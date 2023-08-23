import { styled } from "@stitches/react";

export const ContactContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "85vh",
    width: "100vw",

    "@media (max-width: 500px)": {
        overflow: "scroll",
        height: "100vh",
        paddingTop: 40
    }
});

export const ContactHero = styled("div", {
    // Estilos personalizados para ContactHero
});

export const ContactForm = styled("div", {
    // Estilos personalizados para ContactForm
});

export const Container = styled("div", {
    width: "100%",
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 30px 50px 0",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",

    "@media (max-width: 1440px)": {
        flexDirection: "column",
        width: "calc(100% - 70px)",
        margin: "0 auto",
        padding: "0 40px 30px 10px"
    },
    "@media (max-width: 768px)": {
        width: "70%",
        marginBottom: 30,
        
    }
    

});

export const Content = styled("div", {
    display: "flex",
    //alignItems: "center",
    justifyContent: "space-between",

    "@media (max-width: 1440px)": {
        flexDirection: "column",

    },

    "@media (max-width: 1024px)": {
        flexDirection: "column",
    },

    "@media (max-width: 768px)": {
        flexDirection: "column",
    },

    "@media (max-width: 500px)": {
        flexDirection: "column",
        

        '.dtContainer': {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 45,
            gap: 15,
            
        },
        overflow: "scroll"
    },
});

export const LeftSide = styled("div", {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",

    flexWrap: "wrap",
    "@media (max-width: 1440px)": {
        width: "100%",
        alignItems: "center",
        '.dtContainer': {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 45,
            gap: 15,
            marginTop: 0
        },



    },

    "@media (max-width: 1024px)": {
        width: "100%",
        flexDirection: "column",
        marginTop: 40,
        justifyContent: "center",
        flexWrap: "wrap",
    },

    "@media (max-width: 768px)": {
        width: "100%",
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "center",
        

        
    },

    "@media (max-width: 500px)": {
        width: "100%",
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "center",
        
    },
});

export const Details = styled("div", {
    margin: "30px 14px 30px 5px ",
    textAlign: "center",
    
});

export const DetailsIcon = styled("i", {
    fontSize: "30px",
    color: "#3e2093",
    marginBottom: "10px",
});

export const DetailsTopic = styled("div", {
    fontSize: "18px",
    fontWeight: "500",
});

export const TextOne = styled("div", {
    fontSize: "14px",
    color: "#afafb6",
});

export const TextTwo = styled("div", {
    fontSize: "14px",
    color: "#afafb6",
});

export const RightSide = styled("div", {
    display: "flex",
    gap: 5,
    flexDirection: "column",
    width: "75%",

    "@media (max-width: 1440px)": {
        width: "100%",
        marginLeft: 0,
    },

    "@media (max-width: 1024px)": {
        width: "100%",
        marginLeft: 0,
    },

    "@media (max-width: 768px)": {
        width: "70%",
        marginLeft: 0, 
        p: {
            display: "none"
        },

        justifyContent: "center"
    },

    "@media (max-width: 500px)": {
        width: "100%",
        marginLeft: 0,
    },
});

export const TopicText = styled("div", {
    fontSize: "23px",
    fontWeight: "600",
    color: "#3e2093",
});

export const InputBox = styled("div", {
    height: "50px",
    width: "100%",
    margin: "12px 0",
});

export const Input = styled("input", {
    height: "100%",
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "#F0F1F8",
    borderRadius: "6px",
    padding: "0 15px",
    resize: "none",

    variants: {
        sizeForm: {
            big: {
                minHeight: 80,
            },
        },
    },
});

export const TextArea = styled("textarea", {
    paddingTop: "6px",
});

export const Button = styled("div", {
    display: "inline-block",
    marginTop: "30px",
});

export const ButtonInput = styled("input", {
    color: "#fff",
    fontSize: "18px",
    outline: "none",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    background: "#3e2093",
    cursor: "pointer",
    transition: "all 0.3s ease",

    "&:hover": {
        background: "#5029bc",
    },
});

export const MediaQueries = {
    desktop: "@media (max-width: 1440px)",
    tablet: "@media (max-width: 1024px)",
    mobile: "@media (max-width: 768px)",
    smallMobile: "@media (max-width: 500px)",
};
