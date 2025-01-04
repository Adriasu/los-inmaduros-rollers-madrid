import React from 'react'

const HomeBanner = () => {
  return (
    <div className="relative max-w-[909px] m-auto xl:max-w-[62%] mb-4">
    <video
      src="/images/homeBanner2.mp4"
      className="h-[131px] rounded-2xl object-cover md:h-[178px]"
      loop
      preload="none"
      autoPlay
      muted
      playsInline
      width="100%"
    ></video>
    <div className="absolute bottom-0 left-0 h-[131px] w-full rounded-2xl bg-[#00000033] md:h-[178px]"></div>
    <div className="absolute left-[21px] bottom-2 md:left-10 md:bottom-[50px]">
      <h1 className="text-xl font-bold sm:text-3xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">¡Rueda con nosotros por Madrid!</h1>
      <p className="text-body13 text-white mt-2 tracking-[-0.004em] md:hidden">La comunidad que reinventa la forma <br /> de explorar la ciudad. <br /> Crea tu propia ruta y comparte.</p>
      <p className="hidden md:flex text-body13 mt-4 text-white">La comunidad que reinventa la forma de explorar la ciudad. <br /> Crea tu propia ruta y comparte.</p>
    </div>
  </div>
  )
}

export default HomeBanner