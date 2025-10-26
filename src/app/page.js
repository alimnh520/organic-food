import React from 'react'
import Animation from './components/Animations'
import AllProducts from './components/AllProducts'
import FeaturesPage from './components/FeaturePage'
import CategoriesPage from './components/Category'
import OfferProductsPage from './components/OfferedProduct'

const page = () => {
  return (
    <div className='mx-auto flex flex-col sm:w-[1280px] w-full gap-y-5 bg-white sm:px-4 sm:pt-4'>
      <Animation />
      <CategoriesPage/>
      <OfferProductsPage/>
      <AllProducts/>
      <FeaturesPage/>
    </div>
  )
}

export default page