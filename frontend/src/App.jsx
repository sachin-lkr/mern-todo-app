import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AddTask } from "./components/AddTask"
import List from "./components/List"
import { Update } from "./components/Update"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Protect from "./components/Protect.jsx"

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Protect><List/></Protect>}/>
        <Route path="/add" element={<Protect><AddTask/></Protect>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/update/:id" element={<Update/>}/>
    </Routes>
    </>
  )
}

export default App
