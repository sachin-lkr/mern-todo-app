import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AddTask } from "./components/AddTask"

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<h2> all list show</h2>}/>
        <Route path="/add" element={<AddTask/>}/>
    </Routes>
    </>
  )
}

export default App
