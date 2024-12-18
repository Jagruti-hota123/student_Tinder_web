import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "./components"

const Body = () => {
  return (
    <>
      <Navbar/>      
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Body
