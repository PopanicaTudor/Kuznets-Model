import { Text, Box } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const HeroText = () => {
  const { colorMode } = useColorMode();
  const MotionBox = motion(Box);
  const MotionText = motion(Text);

  // Gradientele pentru modurile luminoase și întunecate, cu opacitate maximă
  const lightGradient = "linear(to-r, #1b49d0,#969200, #0e6b6c)";
  const darkGradient = "linear(to-r, #22c1c3, #90be78, #fdbb2d)"; // Gradient mai deschis pentru modul întunecat

  return (
    <MotionBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100px"
      marginTop="20px"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      bg="transparent"
    >
      <MotionText
        fontSize={{ base: "5xl", md: "7xl" }}
        fontWeight="bold"
        letterSpacing="2px"
        textTransform="uppercase"
        textAlign="center"
        // Setăm gradientul dinamic pe baza modului
        bgGradient={colorMode === "light" ? lightGradient : darkGradient}
        bgClip="text"
        animate={{ scale: [1, 1.03, 1] }} // Efect de respirație subtil
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        Kuznets
      </MotionText>
    </MotionBox>
  );
};

export default HeroText;
