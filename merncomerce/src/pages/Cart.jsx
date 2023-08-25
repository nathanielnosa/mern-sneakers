import {useSelector} from 'react-redux'
import CartProduct from '../components/cart/CartProduct'
import { Link } from 'react-router-dom'

import emptyCart from '../assets/empty/empty.gif'
const Cart = () => {
    const cartItems = useSelector((state)=>state.products.cartItem)
        // total price
        const grandTotal = cartItems.reduce((acc,curr)=>acc + parseInt(curr.total), 0)
        const totalQty  = cartItems.reduce((acc,curr)=>acc + parseInt(curr.qty), 0)

    return (

        <div className="w-full max-w-4xl mx-auto mt-3">
            <h2 className="text-3xl my-5 mt-10"> Manage Your Cart Items</h2>
            {/* cart table */}
            <div className="w-full">
                { cartItems[0] ?
                    <>
                        {
                            cartItems.map(el =>(
                                <CartProduct key={el._id}
                                image={el.image}
                                name={el.pName}
                                category={el.pCat}
                                price={el.pPrice}
                                qty ={el.qty}
                                total ={el.total}
                                id={el._id}
                                />
                            ))
                        }
        
        
                        <div className='mt-3'>
                            <h3 className="bg-main text-white py-3 px-2">Summary</h3>
                            
                            <p className='text-xl mt-6'>Total Qty:{totalQty} </p>
                            <h2 className='font-bold text-3xl'>Total: &#8358; {grandTotal} </h2>
        
                           <div className="flex gap-5">
                           <button className="bg-main text-white w-60 mt-4 p-3">Payment</button>
                            <Link to={'/'} className="bg-main text-white w-60 mt-4 p-3">Continue Shopping</Link>
                           </div>
                        </div>
                    </>

                :
                <div className=" h-fit py-3 bg-white">
                    <img src={emptyCart} className='w-60 mx-auto' />

                    <div className='text-center'>
                        <h4 className=" bg-red-400 p-3 text-white font-bold">Empty Cart !</h4>
                        <p className='mb-3'>There are no items current in your cart <br /> kindly continue shopping </p>
                        <Link to={"/"} className="bg-main mt-3 text-white px-4 py-2">Shop Now</Link>
                    </div>
                </div>

                }
           
               

            </div>
            
        </div>
  )
}

export default Cart