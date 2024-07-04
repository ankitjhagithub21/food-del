import useFetchCategory from '../hooks/useFetchCategory'
import Category from './Category'
import Results from './Results'


const Categories = () => {
  
 const categories = useFetchCategory()



  return (
    <>
      <div className='lg:w-2/3 mx-auto'>
        <h2 className='mt-5 font-bold text-xl  text-center'>Popular Cuisines</h2>
        <div className='flex gap-5 overflow-x-auto items-center menu p-5'>
          {
            categories && categories.map((category) => {
              return <Category key={category.idCategory} category={category}/>
            })
          }
        </div>
      </div>

     <Results/>


    </>
  )
}

export default Categories
