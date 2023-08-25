import data from './data';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {FaUserAlt} from 'react-icons/fa';
import {BsCartFill} from 'react-icons/bs';
import {BiMenuAltRight} from 'react-icons/bi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logoutRedux} from '../../redux/userSlice'
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate()
    const[showDrop, setShowDrop] = useState(false);
    const[showNav, setShowNav] = useState(false);
    const handleDrop=()=>{
        setShowDrop(prev => !prev)
    }
    const handleNav=()=>{
        setShowNav(prev => !prev)
    }
    // change icon to use image when login
    const userData = useSelector((state)=> state.user);

    // handle logout
    const dispatch= useDispatch()
    const handleLogout =()=>{
        dispatch(logoutRedux())
        toast('Logout successful!')
        setTimeout(()=>{
            navigate('/login')
        },1000)

    }
    // cart items
    const cartItems = useSelector((state)=>state.products.cartItem)
  return (
    <section id="navbar">
        <nav className='fixed bg-white z-50 border w-full shadow-md h-16 px-2 md:px-4'>
            <div className="flex items-center justify-between h-full">
                <Link to={""}>
                <div className="h-12">
                    <img src={logo} alt="" className='h-full'/>
                </div>
                </Link>

                <div className=" flex items-center gap-4 md:gap-10 ">
                    {/* list */}
                    <ul className='hidden md:flex gap-4 md:gap-6 text-base md:text-lg '>
                    {
                        data.map(({id,title,href})=>(
                            <NavLink key={id} to={href} className='capitalize'>{title}</NavLink>
                        ))
                    }
                    </ul>
                    {/* users icons */}
                    <div className="relative cursor-pointer">
                        <Link to={'cart'}><BsCartFill size={24}/>
                        <div className="absolute -top-1 -right-2 bottom-3 text-white text-sm rounded-full w-4 h-4 text-center bg-red-500 p-0">
                            {cartItems.length}
                        </div>
                        </Link>
                    </div>
                   <div className="" onClick={handleDrop}>
                        <div className=" cursor-pointer w-10 h-10 text-center shadow drop-shadow rounded-full overflow-hidden">
                            {
                                userData.profile
                                ? <img src={userData.profile} alt={userData.fname} className='h-full w-full'/>
                                :<FaUserAlt size={24} className='mt-2 ml-2'/>
                            }
                        </div>
                        {
                            showDrop && (
                                <div className="flex flex-col absolute right-2 top-16 bg-white py-2 shadow drop-shadow">
                                    {
                                        userData.email === import.meta.env.VITE_API_ADMIN_EMAIL &&
                                        <Link to={'newproduct'} className='cursor-pointer whitespace-nowrap px-2'>New Product</Link>
                                    }
                                    
                                    {
                                        userData.profile
                                        ?<p className='cursor-pointer whitespace-nowrap bg-red-800 text-white px-2' onClick={handleLogout}>Logout <strong>{userData.fname}</strong></p>
                                        :<Link to={'login'} className='cursor-pointer whitespace-nowrap px-2'>Login</Link>
                                    }
                                    
                                </div>
                            )
                        }
                        
                   </div>
                   <div className="cursor-pointer md:hidden" onClick={handleNav}>
                        <BiMenuAltRight size={29}/>
                        {
                            showNav && (
                               <div className='bg-main absolute top-16 left-0 right-0 w-screen text-center text-white h-screen'>
                                     <ul className='flex h-full flex-col gap-12 pt-20 text-base'>
                                {
                                    data.map(({id,title,href})=>(
                                        <NavLink key={id} to={href} className='capitalize'>{title}</NavLink>
                                    ))
                                }
                                </ul>
                               </div>
                            )
                        }
                   </div>
                </div>
            </div>
        </nav>
    </section>
  )
}

export default Navbar