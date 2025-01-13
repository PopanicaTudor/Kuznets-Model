import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    greenMountain: {
      50: "#e6f4e3",  // Verde foarte deschis
      100: "#c0e4b0",  // Nuanță de verde mai clară
      200: "#98d87f",  // Verde luminos, dar mai intens
      300: "#70cc4e",  // Verde vibrant, dar nu prea deschis
      400: "#48c023",  // Verde puternic, dar nu prea intens
      500: "#3d7c47",  // Green Mountain (verde echilibrat)
      600: "#2f6336",  // Nuanță închisă
      700: "#215024",
      800: "#15371b",
      900: "#0a1f11",
    },
    blueMountain: {
      50: "#b4e1e4",
      100: "#80b9c0",
      200: "#4c91a1",
      300: "#217a82",
      400: "#056f6f",
      500: "#09868b", // Blue Mountain
      600: "#077172",
      700: "#055556",
      800: "#033a3a",
      900: "#021e1e",
    },
    lightBlueBackdrop: {
      50: "#e6f6fb",
      100: "#bfe8f5",
      200: "#99daf0",
      300: "#73cbe9",
      400: "#4dbce3",
      500: "#76c1d4", // Light Blue Backdrop
      600: "#5d9db5",
      700: "#467e96",
      800: "#305f77",
      900: "#1a4060",
    },
    barelyGrayEdge: {
      50: "#fdfdfd",
      100: "#f9f9f9",
      200: "#f5f5f5",
      300: "#f2f2f2",
      400: "#eaeaea",
      500: "#f7f7f7", // Barely Gray Edge
      600: "#e1e1e1",
      700: "#cfcfcf",
      800: "#bdbdbd",
      900: "#9a9a9a",
    },
  },
  fonts: {
    body: "Arial, sans-serif", // Setează fontul global pentru corpul textului
    heading: "Georgia, serif", // Setează fontul pentru heading-uri
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", // Toate butoanele vor avea font bold
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {
        solid: {
          bg: "greenMountain.400", // Verde puternic și vibrant
          color: "white",
          _hover: {
            bg: "greenMountain.500", // Rămâne verdele principal la hover
          },
        },
      },
    },
  },
});

export default theme;
