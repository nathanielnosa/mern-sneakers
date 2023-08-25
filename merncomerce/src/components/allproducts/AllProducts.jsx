import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "../filterproducts/FilterProduct";
import CardItems from "../card/CardItems";

const AllProducts = ({heading,loading}) => {
    const productData = useSelector((state)=>state.products.productList)

    //category list for shuffling/filter
    const categoryList = [...new Set(productData.map(el => el.pCat))]

    // filter data display
    const [dataFilter, setDataFilter] = useState([])

    useEffect(()=>{
        setDataFilter(productData)
    },[productData])
    const handleFilter = (category)=>{
        const filter = productData.filter(el =>el.pCat.toLowerCase() === category.toLowerCase())
        setDataFilter(()=>{
        return[
            ...filter
        ]
        })
    }
  return (
    <div className="py-6 px-2">
          <div className="intro mt-8 mb-4 text-center">
            <h3 className="text-2xl font-semibold">{heading}</h3>
          </div>

          <div className="flex gap-3 justify-center overflow-scroll scroll-smooth scrollbar-none">
            {
              categoryList[0]?  categoryList.map((el,index)=>(
                <FilterProduct key={index} category={el} onClick={()=>handleFilter(el)}/>
              )):
              <p className="text-center">{loading}</p>
            }
          </div>
          {/* display products */}
          <div className="flex gap-6 px-0 mt-9 flex-wrap mx-auto container ">
            {
              dataFilter.map(el=>(
                <CardItems key={el._id}
                image={el.image}
                name ={el.pName}
                category = {el.pCat}
                price = {el.pPrice}
                id ={el._id}
                />
              ))
            }
          </div>


      </div>
  )
}

export default AllProducts