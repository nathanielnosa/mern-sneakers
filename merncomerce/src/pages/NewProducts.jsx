import { BiSolidCloudUpload, BiPlusCircle} from "react-icons/bi";

import { Imagetobase64 } from "../utilities/imagetobase64";
import { useState } from "react";
import { toast } from "react-hot-toast";


const NewProducts = () => {
  // data
  const[data, setData]= useState({
    pName:"",
    pCat:"",
    pPrice:"",
    pDesc:"",
    image : ""
  }); 

  const handleOnChange = (e)=>{
    const{name,value} = e.target
    setData((prevData)=>{
      return{
        ...prevData,
        [name]:value
      }
    })
  }


  // upload image
  const uploadImage = async(e)=>{
    const data = await Imagetobase64(e.target.files[0])
        setData((prevData)=>{
            return{
                ...prevData,
                image: data
            }
        })
  }

  // handle submit
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {pName,pCat,pPrice,pDesc,image} = data;
    if(pName && pCat && pPrice && pDesc && image){
      const fetchData = await fetch(`${import.meta.env.VITE_API_SERVER_DOMAIN}/addproduct`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resData = await fetchData.json()
    toast.success(resData.message)

    setData(()=>{
      return{
        pName:"",
        pCat:"",
        pPrice:"",
        pDesc:"",
        image : ""
      }
    })
    }else{
      toast.error('Error! Kindly fill the fields')
    }

    
  }


  return (
    <section id="new_product" className="mt-5">
      <div className="w-full md:w-1/2 shadow-md drop-shadow mx-auto p-3">
        <h1 className="text-2xl flex flex-row items-center"> <BiPlusCircle size={20}/> New Product</h1>

        <div className="forms mt-5">
          <form onSubmit={handleSubmit}>
            
            <div className="form-group my-2 flex flex-col">
              <label htmlFor="name">Product Name</label>
              <input type="text" onChange={handleOnChange} value={data.pName} name="pName" id="name" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none mt-1' />
            </div>

            <div className="form-group my-2 flex flex-col">
              <label htmlFor="category">Category</label>
              <select name="pCat" onChange={handleOnChange} value={data.pCat} id="category" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none mt-1'>
                <option disabled={true} value={'none'}>--select sneakers---</option>
                <option value={'canvas'}>canvas</option>
                <option value={'basketball'}>basketball</option>
                <option value={'leather'}>leather</option>
                <option value={'authentic'}>authentic</option>
                <option value={'plimsolls'}>plimsolls</option>
                <option value={'designers'}>designers</option>
              </select>
            </div>
            <label htmlFor="image" className="mt-2">Image
              <div className="form-group cursor-pointer mb-2 bg-slate-200 h-32 text-center flex items-center justify-center">
                
                  {
                    data.image?<img src={data.image} alt="" className=" w-1/2 h-full" />:<span className="text-main"><BiSolidCloudUpload size={103}/></span>
                  }
                
                
                <input type="file" className="hidden" accept="image/*" name="image" id="image" onChange={uploadImage} />
              </div>
            </label>

            <div className="form-group my-2 flex flex-col">
              <label htmlFor="price">Price</label>
              <input type="number" onChange={handleOnChange} value={data.pPrice} name="pPrice" id="price" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none mt-1' />
            </div>

            <div className="form-group my-2 flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea onChange={handleOnChange} value={data.pDesc} name="pDesc" id="description" cols="3" className='rounded w-full bg-slate-200 px-2 py-1 border-none outline-none mt-1' />
            </div>
            
            <div className="form-group my-3">
              <button className='bg-main p-3 px-4 pt-2 text-white font-medium'>Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewProducts