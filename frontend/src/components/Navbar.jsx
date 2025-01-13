import {
  Box,
  Container,
  Flex,
  Button,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = "#333330";

  return (
    <Box
      as="header"
      w="100%"
      color="white"
      py={4}
      px={8}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex="1000"
    >
      <Container maxW="1200px">
        <Flex align="center">
          <Flex gap={3}>
            <Button as={Link} to="/" variant="solid" color={textColor}>
              Menu
            </Button>
            <Button
              as={Link}
              to="/graphic_generator"
              variant="solid"
              color={textColor}
            >
              Graphic Visualizer
            </Button>
            <Button
              as={Link}
              to="/credentials"
              variant="solid"
              color={textColor}
            >
              Credentials
            </Button>
          </Flex>

          <Spacer />

          <Flex align="center">
            <Button onClick={toggleColorMode} ml={3} color={textColor}>
              {colorMode === "light" ? (
                <IoMoon color={textColor} />
              ) : (
                <LuSun color={textColor} />
              )}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
