import useFetchCategory from '../hooks/useFetchCategory'
import Category from './Category'



const Categories = () => {

  const categories = useFetchCategory()



  return (
    <>
    <section className="container mx-auto my-5  px-5 md:px-0  ">
      <div className="flex items-center overflow-x-scroll menu gap-5 ">
        {
          categories.map((category)=>{
            return <Category key={category.idCategory} category={category}/>
          })
        }

      </div>
    </section>
    
    </>

  )
}

export default Categories
