import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Tablelist from './components/Tablelist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Tablelist></Tablelist>
    </>
  )
}

export default App
