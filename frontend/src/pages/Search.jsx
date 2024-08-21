import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import FoodNotFound from '../components/FoodNotFound';
import Loader from '../components/Loader'; // Assuming you have a Loader component

const Search = () => {
  const [query, setQuery] = useState('');
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      if (response.ok) {
        const data = await response.json();
        setMeal(data.meals ? data.meals[0] : null); // Assuming the first match is returned
      } else {
        setMeal(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMeal(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className='container mx-auto p-5'>
        <div className='lg:w-2/3 w-full mx-auto'>
          <form className='flex items-center px-4 py-2 border rounded-lg' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Search food by name'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full text-lg outline-none '
              required
            />
            <button type='submit'><CiSearch size={30} /></button>
          </form>
        </div>

        <div className='mt-5 lg:w-2/3 mx-auto w-full'>
          {loading ? (
            <Loader /> // Display the loader while loading
          ) : meal ? (
            <div className='border p-5 rounded-lg'>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-60 object-cover rounded-lg mb-4' />
              <h2 className='text-2xl font-bold mb-2'>{meal.strMeal}</h2>
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Area:</strong> {meal.strArea}</p>
              <p><strong>Instructions:</strong> {meal.strInstructions}</p>
              <p><strong>Tags:</strong> {meal.strTags ? meal.strTags.split(',').join(', ') : 'None'}</p>
              <p><strong>Ingredients:</strong></p>
              <ul className='list-disc pl-5'>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                  return meal[`strIngredient${i}`] ? (
                    <li key={i}>
                      {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}
                    </li>
                  ) : null;
                })}
              </ul>
              {meal.strYoutube && (
                <p className='mt-4'>
                  <strong>Watch on YouTube:</strong> <a href={meal.strYoutube} className='text-blue-500' target='_blank' rel='noopener noreferrer'>{meal.strMeal}</a>
                </p>
              )}
            </div>
          ) : (
            <FoodNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
