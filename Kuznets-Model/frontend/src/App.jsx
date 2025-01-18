import React from 'react';
import { Stack } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import CascadingBackground from './components/CascadingBackground';
import AppRouter from './router'

function App() {
  return (
    <Stack minH="100vh" position="relative">
      <CascadingBackground /> 
      <Navbar />
      <AppRouter /> 
    </Stack>
  );
}

export default App;
