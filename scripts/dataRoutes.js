const routes = [
  {
    name: "Héroes",
    image: "",
    approximateDistance: "18 km",
    description:
      "Ruta muy disfrutable, con muchos kilómetros de suave bajada, hasta llegar a cuesta de la vega, donde la cosa se pone interesante.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1KPK-bbn08C-m3Mb62pWiDUomDCSl7mE&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Súper héroes",
    image: "",
    approximateDistance: "25 km",
    description:
      "Ideal para patinadores con experiencia, ya que requiere buen control de los patines y habilidad para frenar en zonas de tráfico. Disfruta de una mezcla de paisajes urbanos mientras desafías tu técnica.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1YcrpGJz5BLutYewAFdGDoGC7MueexYw&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Clásica",
    image: "",
    approximateDistance: "16 km",
    description:
      "La ruta discurre por asfalto, se recomiendan protecciones y luces. Cada uno es responsable de su seguridad.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1h_BwKj1VDwFl8l3sZkBzq4JIiFI_Sds&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Queen",
    image: "",
    approximateDistance: "15 km",
    description: "Esta ruta mezcla tramos de carril bici y carretera, diseñada para patinadores con experiencia intermedia. Es ideal para pasar un buen rato, combinando la tranquilidad del carril bici con la emoción de la carretera, requiriendo cierta autonomía y habilidad para mantener el control en diferentes entornos.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1qptdLKd01l_wmlA9B4R9XjG_SbEXQBY&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "El calamar",
    image: "",
    approximateDistance: "14 km",
    description: "Explora las calles de Madrid en una ruta que combina el placer de callejear con una parada deliciosa en el Palacio Real para disfrutar de un bocadillo de calamares. Una experiencia completa para patinadores con autonomía, antes de continuar el recorrido.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1vQ_lOqqvR1UjxjejpSHmbaeyoRrmQiU&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Arcade",
    image: "",
    approximateDistance: "18 km",
    description: "Una ruta de mayor distancia diseñada para patinadores con autonomía y confianza en carretera. Toda la ruta transcurre por asfalto, lo que permite un patinaje fluido y sostenido. Recomendado para quienes buscan velocidad y adrenalina en un entorno urbano.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1jn_UxYOYkPzZAjzy4bRJSZTOrlUtG6w&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Anillo ciclista",
    image: "",
    approximateDistance: "55 km",
    description:
      "Ruta de larga distancia por carril bici, para los patinadores con más fondo. Vuelta completa al anillo ciclista de Madrid.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1y31XfqHU-xc3t5w-gbgZH-Zzuuee8lE&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "La leyenda",
    image: "",
    approximateDistance: "25 km",
    description: "Una emocionante ruta por carretera que incluye los mejores túneles de la ciudad. Perfecta para patinadores con control en bajadas y búsqueda de adrenalina. Disfruta de la velocidad en un entorno único, ideal para quienes tienen autonomía total sobre sus patines.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1U-Fy08xRQySKsx0BIOwK99AmFgponNU&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Vladi",
    image: "",
    approximateDistance: "24 km",
    description: "Una ruta de mayor distancia diseñada para patinadores con autonomía y confianza en carretera. Toda la ruta transcurre por asfalto, lo que permite un patinaje fluido y sostenido. Recomendado para quienes buscan velocidad y adrenalina en un entorno urbano.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1sB8Z4pUv6Ev5VTzrAsmd3RFkw0kmsyg&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "4 Torres",
    image: "",
    approximateDistance: "29 km",
    description: "Ideal para patinadores con resistencia y control. Subidas largas y bajadas emocionantes, se requiere autonomía y capacidad para manejar terrenos inclinados.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1eTZzWhQz93cWZL2jYHt7MNDn68hRwxs&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Dora",
    image: "",
    approximateDistance: "19 km",
    description: "Diseñada para patinadores con fondo y resistencia, esta ruta por carretera desafía con buenas subidas y premia con emocionantes bajadas. Requiere autonomía completa para disfrutar al máximo de este recorrido exigente.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1TNnJJTb_ATRn8OQzpMCKMI4ZEkFz7ro&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Caracolera",
    image: "",
    approximateDistance: "12 km",
    description:
      "Ruta apta para niños y todo aquel que tenga ganas de divertirse. Se hace a ritmo tranquilo y se ayudará a quien lo necesite en las bajadas. Se hacen paradas para reagrupar y beber agua. Recomendamos llevar protecciones, casco y agua.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1cBsMyC0Dp-fURJvEatHCKnvI17KfiHw&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Caracolera central",
    image: "",
    approximateDistance: "14 km",
    description:
      "Una ruta ideal para niños y cualquier persona con ganas de divertirse, recorriendo el centro de Madrid a un ritmo tranquilo. Se ofrecen paradas para reagrupamiento y beber agua, con apoyo en las bajadas para quienes lo necesiten. Es recomendable llevar protecciones, casco y agua para disfrutar con seguridad.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1Bi8uD7pZsmez4wXMzhS4PXlOr4XJuXc&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "los 40",
    image: "",
    approximateDistance: "15 km",
    description: "Esta ruta de distancia media combina carril bici y tramos de carretera. Ideal para patinadores con experiencia, ya que requiere buen control de los patines y habilidad para frenar en zonas de tráfico. Disfruta de una mezcla de paisajes urbanos mientras desafías tu técnica.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1cKrGgyzWyhQv2W8Ds_H5Wmljcs_O1fE&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "Los poblados",
    image: "",
    approximateDistance: "12 km",
    description: "Esta ruta sigue exclusivamente el carril bici, perfecta para un patinaje relajado pero continuo. Ideal para disfrutar del entorno mientras mantienes un buen ritmo, sin preocuparte por el tráfico vehicular.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1pN616xk2ZJZePv6VsT4YeipbyxAX-KE&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "La horchata",
    image: "",
    approximateDistance: "16 km",
    description: "Una ruta urbana por carretera pensada para disfrutar del entorno mientras callejeas. Perfecta para explorar la ciudad a un ritmo relajado, con una parada estratégica para saborear una refrescante horchata antes de continuar la aventura sobre ruedas.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1MWmEtXzG07A1CVSBTSFXhikEikFmMOc&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
  {
    name: "The prince",
    image: "",
    approximateDistance: "20 km",
    description: "Nivel medio-avanzado, perfecta para quienes dominan cuestas y frenado. Recorrido urbano con cuestas moderadas, ideal para perfeccionar técnica y disfrutar del entorno.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1_l0RTgRwkPvM-xv8xKOy0QqJOnrK4C0&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: []
  },
];
