import data from './data';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {FaUserAlt} from 'react-icons/fa';
import {BsCartFill} from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logoutRedux} from '../../redux/userSlice'
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate()
    const[showDrop, setShowDrop] = useState(false);
    const handleDrop=()=>{
        setShowDrop(prev => !prev)
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
                    <ul className='flex gap-4 md:gap-6 text-base md:text-lg '>
                    {
                        data.map(({id,title,href})=>(
                            <NavLink key={id} to={href} className='capitalize'>{title}</NavLink>
                        ))
                    }
                    </ul>
                    {/* users icons */}
                    <div className="relative cursor-pointer">
                        <BsCartFill size={24}/>
                        <div className="absolute -top-1 -right-2 text-white text-sm rounded-full w-4 h-4 text-center bg-red-500 p-0">1</div>
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
                                    <Link to={'newproduct'} className='cursor-pointer whitespace-nowrap px-2'>New Product</Link>
                                    {
                                        userData.profile
                                        ?<p className='cursor-pointer whitespace-nowrap bg-red-800 text-white px-2' onClick={handleLogout}>Logout</p>
                                        :<Link to={'login'} className='cursor-pointer whitespace-nowrap px-2'>Login</Link>
                                    }
                                    
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