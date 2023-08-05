import { useState } from 'react'
import login from '../assets/userbg/login.svg'
import icons from '../assets/userbg/topuser.png'
import {BiShow, BiHide} from 'react-icons/bi'
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {loginRedux} from '../redux/userSlice';

const Login = () => {
    const navigate = useNavigate()
    // show and hide password
    const[showPwd, setShowPwd] = useState(false);
    const handleShowPwd = ()=>{
        setShowPwd(prev => !prev)
    }

     // get data
     const[data, setData]= useState({
        email:"",
        pwd:"",
    });

   
    const handleOnChange = (e)=>{
        const{name,value} = e.target
        setData((prevData)=>{
            return{
                ...prevData,
                [name]:value
        }   
        });
    }

    // redux
    const userData = useSelector(state=>state)
    const dispatch = useDispatch()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        // check inputs and password
        const{email,pwd} = data
        if(email && pwd){
            const fetchData = await fetch(`${import.meta.env.VITE_API_SERVER_DOMAIN}/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            const resData = await fetchData.json()

            toast.success(resData.message);
            
            if(resData.alert){
                dispatch(loginRedux(resData))
                setTimeout(() =>{
                    navigate('/')
                },1000)
            }
            console.log(userData);
        }else{
            toast.error('Kindly fill the fields');
        }
    }



  return (
    <section id="login-page" className="mt-5 md:mt-24">
        <div className="flex flex-col md:flex-row border rounded  mx-auto w-full md:w-1/2 md:pl-4 items-center shadow-md drop-shadow">
            <div className=" p-4 text-blue-950">
                <h3 className='font-bold text-4xl'> Welcome Back !</h3>
                <p className='mt-2 text-sm mb-16'>To keep connected with us please login with your personal info</p>
                <img src={login} alt="welcome user" className='w-full hidden md:block'/>

            </div>
            <div className=" w-full py-6 bg-white px-4 rounded-tr rounded-br">
                <h1 className='font-bold text-2xl'>Sign in</h1>
                <div className="w-20 mx-auto border overflow-hidden rounded-full drop-shadow-md shadow-md">
                <img src={icons} alt="register icon" className='w-full' />
                </div>
                <form className='mt-5' onSubmit={handleSubmit} autoComplete="off">

                <div className="form-group mb-3">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleOnChange} id="email" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' autoComplete="off" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="pwd" className='font-medium'>Password</label>
                        <div className='flex bg-slate-200 rounded items-center'>
                            <input type={showPwd?"text":"password"} name="pwd" value={data.pwd} onChange={handleOnChange} id="pwd" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' autoComplete="off" />
                            <span className='cursor-pointer ml-1  pr-3' onClick={handleShowPwd}>{showPwd?<BiShow/>:<BiHide/>}</span>
                        </div>
                    </div>
                   
                    
                    <div className="form-group mb-3">
                        <button className='bg-main p-3 px-4 pt-2 text-white font-medium'>Login</button>
                    </div>
                    <div className="form-group mb-2">
                        <Link to={'/register'}>Don&apos; have an account ? <span className='font-medium'>Register</span></Link>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login