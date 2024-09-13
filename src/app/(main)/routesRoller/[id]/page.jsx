import React from 'react'
import RouteInfo from './RouteInfo'
import Reviews from './Reviews'
import RouteInfoMobile from './RouteInfoMobile'
import ReviewsMobile from './ReviewsMobile'


const page = () => {
  return (
    <div>
    <RouteInfo/>
    <RouteInfoMobile/>
    <Reviews/>
    <ReviewsMobile/>
    </div>
  )
}

export default page
