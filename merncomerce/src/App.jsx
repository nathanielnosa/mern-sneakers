// component
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <div className="font-main">
      
      <Toaster />
      <Navbar/>
      <div className="pages pt-16 bg-slate-50 min-h-[calc(100vh)] ">
        <Outlet/>
      </div>
    </div>
  )
}

export default App