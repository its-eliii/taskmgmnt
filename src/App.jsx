import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Done from './pages/Done.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/done" element={<Done />} />
      </Routes>
    </>
  )
}

