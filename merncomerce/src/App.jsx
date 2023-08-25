// component
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";

const App = () => {

  // for the products slide
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.products)

  useEffect(()=>{
    ( async ()=>{
      const res = await fetch(`${import.meta.env.VITE_API_SERVER_DOMAIN}/products`)
      const resData = await res.json()

      dispatch(setDataProduct(resData));
    })()
  },[])

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