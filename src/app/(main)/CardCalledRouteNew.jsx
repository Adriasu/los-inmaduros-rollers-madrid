import Image from 'next/image'
import React from 'react'
import Link from "next/link";

const CardCalledRouteNew = ({event}) => {
  return (
    <div className='rounded-2xl'>
        <div>
        {event.nameRoute.name === "Nueva" ? (
              event.nameRoute.image && event.nameRoute.image !== "" ? (
                <Image
                  src={event.nameRoute.image}
                  alt={event.nameRoute.name}
                  width={500}
                  height={500}
                  className="h-[220px] w-full rounded-2xl object-fill"
                />
              ) : (
                <Image
                  src={"https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"}
                  alt={event.nameRoute.name}
                  width={500}
                  height={500}
                  className="h-[220px] w-full rounded-2xl object-fill"
                />
              )
            ) : (
              <Link href={`/routesRoller/${event.nameRoute.id}`}>
                <div>
                  <Image
                    src={event.nameRoute.image}
                    alt={event.nameRoute.name}
                    width={500}
                    height={500}
                    className="h-[220px] w-full rounded-2xl object-fill"
                  />
                </div>
              </Link>
            )}
        </div>
        CardCalledRouteNew
        
        </div>
  )
}

export default CardCalledRouteNew