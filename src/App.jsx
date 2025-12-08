import { useState } from 'react'
import Home from './pages/home'
import Bookings from './pages/bookings'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home></Home> */}
      <Bookings></Bookings>
    </>
  )
}

export default App
