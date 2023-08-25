import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    productList: [],
    cartItem: [],
}

export const productsSlide = createSlice({
    name:'products',
    initialState,
    reducers:{
        setDataProduct:(state,action)=>{
            state.productList = [...action.payload]
        },
        addCartItem:(state,action)=>{
            const check = state.cartItem.some(el=>el._id === action.payload._id)
            if(check){
                toast.success('item already in cart')
            }else{
                toast.success('A new item added to cart')
                const total = action.payload.pPrice
                state.cartItem = [...state.cartItem,{...action.payload,qty:1, total:total}]
            }

        },

        deleteCartItem:(state,action)=>{
            toast.success('One Item Deleted')
            const index = state.cartItem.findIndex((el)=>el._id ===action.payload)
            
            state.cartItem.splice(index,1)
            
        },
        increaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id ===action.payload)
            let qty = state.cartItem[index].qty
            const qtyInc = ++qty
            state.cartItem[index].qty = qtyInc

            const price = state.cartItem[index].pPrice
            const total = price * qtyInc

            state.cartItem[index].total = total
            toast.success('Item quantity increase')
            
        },
        decreaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id ===action.payload)
            let qty = state.cartItem[index].qty
            if(qty > 1){
                const qtyDcr = --qty
            state.cartItem[index].qty = qtyDcr

            const price = state.cartItem[index].pPrice
            const total = price * qtyDcr

            state.cartItem[index].total = total
            toast.success('Item quantity decrease')

            }
            
            toast.success('Item quantity decrease')
        }
    }
})

export const {setDataProduct, addCartItem, deleteCartItem,increaseQty,decreaseQty} = productsSlide.actions
export default productsSlide.reducer
