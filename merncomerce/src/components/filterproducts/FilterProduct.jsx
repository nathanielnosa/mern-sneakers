import {GiConverseShoe} from 'react-icons/gi'
const FilterProduct = ({category,onClick}) => {
  return (
    <div className='mt-5 w-40 hover:cursor-pointer' onClick={onClick}>
        <div className="flex flex-col items-center">
            <div className="rounded-full bg-main text-white p-4 w-12">
                <GiConverseShoe/>
            </div>
            {category}

        </div>

    </div>
  )
}

export default FilterProduct