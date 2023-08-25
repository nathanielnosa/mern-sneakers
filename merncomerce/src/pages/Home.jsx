import { useSelector } from "react-redux"
import HomeCard from "../components/home/HomeCard";
import CardItems from "../components/card/CardItems";
// import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from 'react-icons/bs'
import {GrPrevious,GrNext} from 'react-icons/gr'
import {useRef} from "react";
import AllProducts from "../components/allproducts/AllProducts";

const Home = () => {
  const productData = useSelector((state)=>state.products.productList)
  const homeProduct = productData.slice(0,4)
  const cardProduct = productData.filter(el => el.pCat === "basketball",[])



  // loading
  const loadingData = new Array(4).fill(null)
  const loadingFeatures = new Array(10).fill(null)

  // next and prev button for slider
  const sliderRef = useRef()
  const sliderPrev = ()=>{

    sliderRef.current.scrollLeft -= 200
  }
  const sliderNext = ()=>{
    sliderRef.current.scrollLeft += 200

  }
  // next and prev button for feature
  const slideProductRef = useRef()
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft += 200
  }
  const prevProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
    
  }

  return (
    <section id="home-page">
      <div className="py-3 shadow-sm drop-shadow mt-6 flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 px-2">
          <div className="flex items-center gap-3 bg-slate-300 p-2 w-40 rounded">
            <p>Free Delivery</p>
            <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className="h-8" alt="" />

          </div>
          <h2 className="text-4xl md:text-7xl">Get The Best <span className="text-red-500">Sneakers</span> In Town</h2>
          <p className="my-3 w-2/3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas quibusdam doloremque vel similique nisi esse est doloribus iure ea quasi.</p>
          <button className="bg-main rounded p-4 px-6 pt-2 text-white">Shop Now</button>
        </div>
        <div className="md:w-1/2">
          <div className="flex flex-row gap-3">
          <button onClick={sliderPrev} className="bg-main text-white p-2">
              <GrPrevious  />
            </button>
          <button onClick={sliderNext} className="bg-main text-white p-2">
              <GrNext  />
          </button>
          </div>
          <div className="flex flex-row w-full items-start gap-6 md:gap-2 overflow-x-scroll scroll-smooth transition-all scrollbar-none " ref={sliderRef}>

            {
              homeProduct[0] ?
              homeProduct.map(e=>(
                  <div key={e._id} className="w-full">
                    <HomeCard
                  key={e._id}
                  image={e.image}
                  id={e._id}
                  />
                  </div>
              )):
              loadingData.map((e,index) =>{
                return(
                  <HomeCard key={index} loading={'Loading Data...'}/>
                )
              })
            }
          </div>
          </div>
      </div>

      {/* featured products */}
      <div className="py-6 px-2">
          <div className="intro mt-8 mb-4 text-center">
            <h3 className="text-2xl font-semibold">BasketBall Sneakers</h3>
          </div>
          <div className="flex justify-end px-5 mb-3 gap-2">
            <button className="bg-main text-white p-2" onClick={prevProduct}>
              <GrPrevious  />
            </button>
            <button className="bg-main text-white p-2" onClick={nextProduct}>
              <GrNext/>
            </button>
          </div>
          <div className="flex flex-row overflow-x-scroll scroll-smooth transition-all scrollbar-none md:flex-row gap-8 justify-center" ref={slideProductRef}>
            {
              cardProduct[0]? cardProduct.map(el =>(
                <div key={el._id}>
                  <CardItems
                    name = {el.pName}
                    category = {el.pCat}
                    image = {el.image}
                    price = {el.pPrice}
                    id ={el._id}
                  />
                </div>
              ))
              :
              loadingFeatures.map((el,index) =><CardItems key={index} loading={'loading ...'}/>)
              
            }
          </div>
      </div>

      {/* all products by category */}
      <AllProducts heading = {'All Products'} loading={'loading data...'}/>


    </section>
  )
}

export default Home