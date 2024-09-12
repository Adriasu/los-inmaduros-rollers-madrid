import React from "react";

const HeroRoutes = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-3 py-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[-2px_4px_43px_5px_#029EE963]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h3> ¡Descubre nuestro recorrido!</h3>
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-cyan-900 to-cyan-600 bg-clip-text text-transparent">
              Cada ruta, una nueva historia sobre ruedas
            </h2>

            <p className="mt-4 text-gray-600">
              Explora nuestras rutas, donde la diversión, el desafío y la
              aventura se encuentran a cada giro. Ya sea que estés buscando una
              ruta tranquila o un reto emocionante, cada recorrido te invita a
              descubrir Madrid de una forma única. Recuerda: somos un grupo de
              amigos que patina por placer, así que disfruta el trayecto, cuida
              de tu seguridad y cuenta con nuestro apoyo en todo momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRoutes;
