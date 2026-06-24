import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AddTask } from "./components/AddTask"
import List from "./components/List"
import { Update } from "./components/Update"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<List/>}/>
        <Route path="/add" element={<AddTask/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/update/:id" element={<Update/>}/>
    </Routes>
    </>
  )
}

export default App
