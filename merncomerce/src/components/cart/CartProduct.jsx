import {TbMinus, TbPlus} from 'react-icons/tb'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCartItem,increaseQty, decreaseQty } from '../../redux/productSlide'

const CartProduct = ({image,name,price,category,qty,total,id}) => {
    const dispatch = useDispatch()


  return (
    <div>
        <div className="flex flex-row gap-3 md:gap-6 items-center justify-between border text-main px-2">
            <div className="w-5 cursor-pointer hover:text-red-600" onClick={()=>dispatch(deleteCartItem(id))}><AiFillDelete size={20}/></div>
            <div className="w-24"><img src={image} alt={name} /></div>
            <div className="hidden md:flex md:w-30"><h4 className="font-bold">{category}</h4></div>
            <div className=" md:w-52 w-36"><h4 className="font-bold">{name}</h4></div>
            <div className="w-20 me-2 md:me-0 border"><p className="font-bold">&#8358;{price}</p></div>
            <span className="flex gap-1 md:gap-2 items-center w-20 border">
                <button onClick={()=>dispatch(decreaseQty(id))} className="bg-main p-1 rounded-md text-white"><TbMinus/></button>
                <p className="text-md md:text-xl">{qty}</p>
                <button onClick={()=>dispatch(increaseQty(id))} className="bg-main p-1 rounded-md text-white"><TbPlus/></button>
            </span>
            <h3 className="text-sm md:text-xl font-bold">&#8358; {total}</h3>
        </div>
       
    </div>
  )
}

export default CartProduct