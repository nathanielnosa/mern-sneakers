import { Link } from "react-router-dom"

const HomeCard = ({image,name,loading,id}) => {
  
  return (
    <Link to={`/sneakers/${id}`} onClick={window.scrollTo({top:"0", behavior:"smooth"})}>

    <div className=" w-96 md:min-w-[600px]"> 
    {
      image ? 
        <img src={image} alt={name} width={500}/>
    :
      <div className="flex items-end h-full justify-center">
        <p>{loading}</p>
      </div>
    }         
    </div>
    </Link>
  )
}

export default HomeCard