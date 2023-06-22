import { styled } from "@stitches/react";
import { FilePdf } from "@phosphor-icons/react";
import Image from "next/image";

export const CordelContainer = styled("div", {});

export const CordelMain = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "0 250px",
  marginTop: 50
});

export const RightSection = styled("div", {
  marginLeft: 200,
  width: "100%",
  maxWidth: "59%",
});

export const CommentSection = styled("div", {
  
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "White",

});

export const CommentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",

  h1: {
    alignSelf: "center",
    marginTop: 20,
  },

  '.btn': {
    position: 'relative',
    fontSize: '17px',
    textDecoration: 'none',
    padding: '1em 2.5em',
    display: 'inline-block',
    //borderRadius: '6em',
    transition: 'all .2s',
    border: 'none',
    fontWeight: 700,
    color: 'black',
    backgroundColor: 'White',
    cursor: "pointer"
   },
   
   '.btn:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
   },
   
   '.btn:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
   },
   
   '.btn::after': {
    content: "",
    display: 'inline-block',
    height: '100%',
    width: '100%',
    //borderRadius: '100px',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '-1',
    transition: 'all .4s',
    backgroundColor: '#fff',
   },
   
   '.btn:hover::after': {
    transform: 'scaleX(1.4) scaleY(1.6)',
    opacity: 0,
   }
});

export const FormError = styled("p", {
  color: '#F75A68',
  fontSize: 16,
  margin: "10px 0",
  fontWeight: "bold"
})

export const CommentInput = styled("div", {
  
  marginBottom: 20,
  marginTop: 10,

  '.form__group': {
    position: 'relative',
    padding: '20px 0 0',
    width: '100%',
    height: "auto",
    
    
  },

  '.form__field': {
    fontFamily: 'inherit',
    width: '100%',
    padding: "7px 0 100px 0 ",
    
    border: '2px solid #000',
    outline: '0',
    fontSize: '17px',
    color: '#000',
    
    background: 'transparent',
    transition: 'border-color 0.2s',
    display: 'flex',
    alignItems: 'flex-start',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    
    
  },

  '.form__field::placeholder': {
    color: 'transparent',

  },

  '.form__field:placeholder-shown ~ .form__label': {
    fontSize: '17px',
    cursor: 'text',
    top: '30px',
    left: "10px"
  },

  '.form__label': {
    position: 'absolute',
    top: -5,
    display: 'block',
    transition: '0.2s',
    fontSize: '20px',
    color: '#fff',
    pointerEvents: 'none',
    fontWeight: 700
  },

  '.form__field:focus': {
    
    fontWeight: 700,
    
    borderColor: '#000',
    //borderImageSlice: 1,
    padding: "7px 0 100px 0",
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    background: '#fff',
    
  },

  '.form__field:focus ~ .form__label': {
    position: 'absolute',
    top: -5,
    display: 'block',
    transition: '0.2s',
    fontSize: '17px',
    color: '#000',
    fontWeight: 700,
    left: 0
  },

  /* reset input */
  '.form__field:required, .form__field:invalid': {
    boxShadow: 'none',
  }
});

export const CardContainer = styled("div", {
  width: "max-content",
  height: "700px",
  border: "2px solid #000",
  borderRadius: "8px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  transition: "transform 0.3s",
  cursor: "pointer",

  "&:hover": {
    transform: "scale(1.03)",
  },
});

export const IconContainer = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  margin: "10px 0"
});

export const PdfIcon = styled(FilePdf, {
  fontSize: "30px",
  color: "#fff"
});

export const Thumbnail = styled("div", {
  marginBottom: "8px",
  borderRadius: "4px",
  width: "100%",
  flex: "1",
  position: "relative",
  overflow: "hidden",
});

export const ThumbnailImage = styled(Image, {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const Title = styled("h3", {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: '#fff'
});

export const Subtitle = styled("div", {
  fontSize: "16px",
  color: "#fff",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const CommentDiv = styled("div", {
  display: "flex",
  flexDirection:"column",
  justifyContent: "flex-start",
  
  maxHeight: 250,
  overflowY: "auto",
  
})

export const CommentBox = styled("div", {
  display: "flex",
  alignItems: "center",
  height: 90,
  margin: "20px 0",
  padding: "10px",
  border: "2px solid #000",
  
})

export const LeftBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: 10,

  div: {
    display: "flex",
    flexDirection:"column",
    gap: 10
  }
})

export const RightBox = styled("div", {
  height: 70,
  width: "70%",
  padding: 5,
  borderRadius: 8,
  
  
  marginLeft: 20,
  color: "#fff",
  fontSize: 16,
  
  whiteSpace: "pre-wrap",
  wordWrap: "break-word"
})