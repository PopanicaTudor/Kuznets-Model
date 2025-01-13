import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Credentials from './pages/Credentials'
import GraphicGenerator from './pages/GraphicGenerator'

function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphic_generator" element={<GraphicGenerator />} />
        <Route path="/credentials" element={<Credentials />} />
      </Routes>
  )
}

export default AppRouter