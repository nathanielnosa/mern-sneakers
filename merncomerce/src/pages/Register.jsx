import { useState } from 'react'
import register from '../assets/userbg/register.svg'
import icons from '../assets/userbg/topuser.png'
import {BiShow, BiHide} from 'react-icons/bi'
import { Link, useNavigate} from 'react-router-dom';

import {Imagetobase64} from '../utilities/imagetobase64'
import { toast } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()
    // show and hide password
    const[showPwd, setShowPwd] = useState(false);
    const handleShowPwd = ()=>{
        setShowPwd(prev => !prev)
    }
    const[showCPwd, setShowCPwd] = useState(false);
    const handleShowCPwd = ()=>{
        setShowCPwd(prev => !prev)
    }

    // get data
    const[data, setData]= useState({
        fname:"",
        lname:"",
        email:"",
        pwd:"",
        cpwd:"",
        profile : ""
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
    // profile image
    const handleProfileImage = async (e)=>{
        const data = await Imagetobase64(e.target.files[0])
        setData((prevData)=>{
            return{
                ...prevData,
                profile: data
            }
        })
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        // check inputs and password
        const{fname,email,pwd,cpwd} = data
        if(fname && email && pwd && cpwd){
            if(pwd === cpwd){

                const fetchData = await fetch(`${import.meta.env.VITE_API_SERVER_DOMAIN}/register`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                const resData = await fetchData.json()
                toast.success(resData.message);

                if(resData.alert){
                    navigate('/login')
                }
            }else{
                toast.error('Password does not match');
            }
        }else{
            toast.error('Kindly fill the fields');
        }
    }


  return (
    <section id="login-page" className="mt-5">
        <div className="flex flex-col md:flex-row border rounded  mx-auto w-full md:w-1/2 md:pl-4 items-center shadow-md drop-shadow">
            <div className="w-full md:w-1/2 p-4 text-blue-950">
                <h3 className='font-bold text-4xl'>Hi Welcome!</h3>
                <p className='mt-2 text-sm mb-16'>New user right? Use to form to get started, its absolutely free</p>
                <img src={register} alt="welcome user" className='w-full hidden md:block'/>

            </div>
            <div className="w-full md:w-1/2 bg-white px-4 rounded-tr rounded-br">
                <h1 className='font-bold text-2xl'>Sign up</h1>
                <div className="w-20 h-20 mx-auto hover:cursor-pointer relative border overflow-hidden rounded-full drop-shadow-md shadow-md">
                    <img src={data.profile?data.profile:icons} alt="register icon" className='w-full h-full' />

                    <label htmlFor="profile" className=' cursor-pointer '>
                        <div className="absolute bottom-0 h-1/2 bg-red-500 w-full text-center text-white opacity-40" >
                            <p className='p-1 font-medium opacity-100'>upload</p>
                        </div>
                        <input type="file" name="profile" id="profile" accept='image/*' className='hidden' onChange={handleProfileImage} />
                    </label>    
                </div>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="fname" className='font-medium'>First Name</label>
                        <input type="text" name="fname" value={data.fname} onChange={handleOnChange} id="fname" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="lname" className='font-medium'>Last Name</label>
                        <input type="text" name="lname" value={data.lname} onChange={handleOnChange} id="lname" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleOnChange} id="email" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="pwd" className='font-medium'>Password</label>
                        <div className='flex bg-slate-200 rounded items-center'>
                            <input type={showPwd?"text":"password"} name="pwd" value={data.pwd} onChange={handleOnChange} id="pwd" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' />
                            <span className='cursor-pointer ml-1 pr-3' onClick={handleShowPwd}>{showPwd?<BiShow/>:<BiHide/>}</span>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="cpwd" className='font-medium'>Confirm Password</label>
                        <div className='flex bg-slate-200 rounded items-center'>
                            <input type={showCPwd?"text":"password"} name="cpwd" value={data.cpwd} onChange={handleOnChange} id="cpwd" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none' />
                            <span className='cursor-pointer ml-1 pr-3' onClick={handleShowCPwd}>{showCPwd?<BiShow/>:<BiHide/>}</span>
                        </div>
                    </div>
                    
                    <div className="form-group mb-3">
                        <button className='bg-main p-3 px-4 pt-2 text-white font-medium'>Sign up</button>
                    </div>
                    <div className="form-group mb-2">
                        <Link to={'/login'}>Have an account already? <span className='font-medium'>Login</span></Link>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register