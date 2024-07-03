import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } 
    };

    fetchCategories();
  }, []);

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-2xl font-bold mb-5'>Categories</h2>
    
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories?.map((category, index) => (
            <li key={index} className='border rounded-lg p-4 shadow-md'>
              <h3 className='text-xl font-bold'>{category}</h3>
           
            </li>
          ))}
        </ul>
      
    </div>
  );
};

export default Categories;
