import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AddTask } from "./components/AddTask"
import List from "./components/List"

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<List/>}/>
        <Route path="/add" element={<AddTask/>}/>
    </Routes>
    </>
  )
}

export default App
