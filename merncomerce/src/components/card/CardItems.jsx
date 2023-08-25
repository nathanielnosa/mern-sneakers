import { Link } from "react-router-dom"
import { addCartItem } from "../../redux/productSlide"
import { useDispatch } from "react-redux"

const CardItems = ({name,category,price,image,loading,id}) => {
    const dispatch = useDispatch()

    // add to cart
    const handleCart = (e)=>{
        // e.stopPropagation();
        dispatch(addCartItem({
            _id:id,
            pName:name,
            pPrice:price,
            pCat:category,
            image:image
        }))
    }
  return (
      <div className="border w-full h-full min-w-[300px] max-w-[200px] bg-slate-100 hover:shadow-lg cursor-pointer py-5 px-3 drop-shadow-md">
        {
            name ?
            ( 
                <>
                <Link to={`/sneakers/${id}`} onClick={()=>window.scrollTo({top:"0", behavior:"smooth"})}>
                
                    <div className="card-img h-60 flex justify-center relative">
                        <img src={image} alt={name} className="h-60 w-80"/>
                        <p className="font-bold text-md absolute left-0 bg-main px-3 py-2 rounded-full text-white">{category}</p>
                    </div>
                    <div className="details text-center mt-5 whitespace-nowrap">
                        <h4 className="text-2xl">{name}</h4>
                        <h5 className="text-xl font-medium my-3">&#8358; {price}</h5>
                    </div>
                </Link>

                    <button onClick={handleCart} className="bg-main w-full text-white py-3">Add to Cart</button>
                </>
            )
            :
            <p className="text-center">{loading}</p>

        }
        </div>    
  )
}

export default CardItems