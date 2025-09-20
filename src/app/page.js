import React from 'react'
import Animation from './components/Animations'
import NewProducts from './components/NewProducts'
import AllProducts from './components/AllProducts'
import FeaturesPage from './components/FeaturePage'
import MostSoldProduct from './components/MostSoldProduct'
import CategoriesPage from './components/Category'

const page = () => {
  return (
    <div className='mx-auto flex flex-col sm:w-10/12 w-full gap-y-5 bg-white sm:px-4 sm:pt-4'>
      <Animation />
      <CategoriesPage/>
      <NewProducts/>
      <MostSoldProduct/>
      <AllProducts/>
      <FeaturesPage/>
    </div>
  )
}

export default page