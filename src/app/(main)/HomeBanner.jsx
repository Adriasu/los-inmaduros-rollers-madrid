import React from 'react'

const HomeBanner = () => {
  return (
    <div className="relative w-full m-auto">
    <video
      src="/images/homeBanner2.mp4"
      className="h-[175px] object-cover md:h-[350px]"
      loop
      preload="none"
      autoPlay
      muted
      playsInline
      width="100%"
    ></video>
    <div className="absolute px-4 top-1/2 -translate-y-1/2 md:px-20 lg:px-40">
      <h1 className="text-xl font-bold md:text-3xl lg:text-5xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">¡Rueda con nosotros por Madrid!</h1>
      <p className="text-base text-white mt-2 tracking-[-0.004em] md:hidden">La comunidad que reinventa la forma <br /> de explorar la ciudad. <br /> Crea tu propia ruta y comparte.</p>
      <p className="hidden md:flex text-base lg:text-xl mt-4 text-white">La comunidad que reinventa la forma de explorar la ciudad. <br /> Crea tu propia ruta y comparte.</p>
    </div>
  </div>
  )
}

export default HomeBanner