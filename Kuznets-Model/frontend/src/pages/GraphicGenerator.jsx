import React from "react";
import { Stack } from "@chakra-ui/react";
import KuznetsForm from "../components/Graphic/KuznetsForm";

const GraphicGenerator = () => {
  return (
    <Stack minH="100vh" position="relative">
      <KuznetsForm />
    </Stack>
  );
};

export default GraphicGenerator;
