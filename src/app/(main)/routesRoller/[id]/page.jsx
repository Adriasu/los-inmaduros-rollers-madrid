import React from 'react'
import RouteInfo from './RouteInfo'
import Reviews from './Reviews'
import RouteInfoMobile from './RouteInfoMobile'


const page = () => {
  return (
    <div>
    <RouteInfo/>
    <RouteInfoMobile/>
    <Reviews/>
    </div>
  )
}

export default page
