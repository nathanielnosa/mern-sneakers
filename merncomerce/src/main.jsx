// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// redux
import {store} from '../src/redux/index.js';
import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route } from "react-router-dom"

  // pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Sneakers from './pages/sneakers.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NewProducts from './pages/NewProducts.jsx'
import Cart from './pages/Cart.jsx';


  const routers = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element ={<About/>}/>
        <Route path='sneakers/:id' element={<Sneakers/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='newproduct' element={<NewProducts/>}/>
        <Route path='cart' element={<Cart/>}/>
      </Route>
    )
  ) 


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>

)
