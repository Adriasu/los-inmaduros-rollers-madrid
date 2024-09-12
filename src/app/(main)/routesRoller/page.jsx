import React from 'react'
import ContainCardsRoutes from './ContainCardsRoutes'
import HeroRoutes from './HeroRoutes'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <HeroRoutes/>
      <ContainCardsRoutes/>
    </div>
  )
}

export default page
