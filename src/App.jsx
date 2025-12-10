import { useState } from 'react'
import Home from './pages/home'
import Bookings from './pages/bookings'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home></Home>}></Route>
        <Route path="/bookings" element = {<Bookings></Bookings>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
