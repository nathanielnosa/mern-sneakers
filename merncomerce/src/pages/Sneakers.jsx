import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AllProducts from "../components/allproducts/AllProducts"
import { addCartItem } from "../redux/productSlide"

const Sneakers = () => {

  const {id} = useParams()
  const productData = useSelector((state)=>state.products.productList)
  const productDisplay = productData.filter(el => el._id === id)[0]
  
  // add to cart
  const dispatch = useDispatch()
  const handleCart = ()=>{
      // e.stopPropagation();
      dispatch(addCartItem(productDisplay))
  }
  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-3">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img src={productDisplay.image} alt={productDisplay.pName} className=" hover:scale-105 transition-all hover:cursor-pointer" />
            </div>
            <div className="w-full md:w-1/2 px-4 md:px-0">
              <h1 className="text-3xl font-semibold mb-3">{productDisplay.pName}</h1>
              <span className="bg-main px-3 py-2 text-white rounded">{productDisplay.pCat}</span>
              <h3 className="text-4xl mt-3"> &#8358; {productDisplay.pPrice}</h3>
              <p className="text-lg font-medium mt-3 text-slate-500">Description:</p>
              <p className="text-sm">{productDisplay.pDesc}</p>
              <div className="flex flex-row gap-6">
                <button onClick={handleCart} className="bg-main w-full text-white py-3 mt-2 hover:scale-105 transition-all">Add to Cart</button>
                <button className="bg-main w-full text-white py-3 mt-2 hover:scale-105 transition-all">Buy Now</button>

              </div>
            </div>
        </div>
      </div>
      <AllProducts heading = {'Related Products'}/>
    </>
  )
}

export default Sneakers