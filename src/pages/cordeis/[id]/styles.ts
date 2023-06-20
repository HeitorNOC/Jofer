import { styled } from "@stitches/react";
import { FilePdf } from "@phosphor-icons/react";
import Image from "next/image";

export const CordelContainer = styled("div", {});

export const CordelMain = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 250px",
  marginTop: 50
});

export const RightSection = styled("div", {});

export const CommentSection = styled("div", {});

export const CommentContainer = styled("div", {});

export const CommentInput = styled("div", {
  '.form__group': {
    position: 'relative',
    padding: '20px 0 0',
    width: '100%',
    height: "auto"
  },

  '.form__field': {
    fontFamily: 'inherit',
    width: '100%',
    padding: "7px 0 200px 0",

    border: '1px solid #9b9b9b',
    outline: '0',
    fontSize: '17px',
    color: '#fff',
    
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
    top: 0,
    display: 'block',
    transition: '0.2s',
    fontSize: '17px',
    color: '#9b9b9b',
    pointerEvents: 'none',
  },

  '.form__field:focus': {
    paddingBottom: '6px',
    fontWeight: 700,
    borderWidth: '3px',
    borderImage: 'linear-gradient(to right, #4dc7d9 0%,#66a6ff 100%)',
    borderImageSlice: 1,
    padding: "7px 0 200px 5px",
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },

  '.form__field:focus ~ .form__label': {
    position: 'absolute',
    top: -5,
    display: 'block',
    transition: '0.2s',
    fontSize: '17px',
    color: '#38caef',
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
  border: "1px solid #ccc",
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
});

export const Subtitle = styled("div", {
  fontSize: "14px",
  color: "#777",
  overflow: "hidden",
  textOverflow: "ellipsis",
});