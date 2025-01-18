import React from "react";
import { useColorMode } from "@chakra-ui/react";
import "../styles/CascadingBackground.css";

const CascadingBackground = () => {
  const { colorMode } = useColorMode();

  return <div className={`cascading-background ${colorMode}`}></div>;
};

export default CascadingBackground;
