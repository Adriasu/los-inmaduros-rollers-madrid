import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const PaceDialogInfo = ({ location }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <i
        className="pi pi-question-circle cursor-pointer hover:scale-105 hover:text-red-600"
        onClick={() => setVisible(true)}
      ></i>
      <Dialog
        header={
          location === "card"
            ? "🛑 UN SANO CONSEJO: LEER BIEN EL NIVEL ANTES DE PRESENTARSE A LA RUTA"
            : "Ritmo de las rutas."
        }
        visible={visible}
        className="w-full md:w-[60vw]"
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          🪨<span className="font-bold">Nivel Roca.</span> Aún no te ves seguro
          sobre los patines y evitas las cuestas a toda costa. No sabes frenar.{" "}
          <br />
          🐌 <span className="font-bold">Nivel Caracol.</span> Eres autónomo en
          rectas y cuesta arriba, pero necesitas ayuda todavía para frenar,
          aunque lo intentes solo. <br />
          🐛 <span className="font-bold">Nivel Gusano.</span> Eres autónomo 100%
          y te gusta ir a las caracoleras, pero te gusta salir por la calle,
          ritmo disfrutón. <br />
          🦋 <span className="font-bold">
            Nivel Mariposa (Avanzado o Pro).
          </span>{" "}
          Te gusta la calle, bajar cuestas infinitas sin frenar, pasar por
          túneles, ritmo avanzado. <br />
          🚀 <span className="font-bold">Nivel Experimentado. </span> rutas X,
          Galáctica, 7 picos... <br />
          ☠️ <span className="font-bold">Nivel Locura total.</span> Te pasas los
          semáforos, esquivas coches, descensos a toda hostia y alcohol en las
          venas. <br />
          🐈 🦄 <span className="font-bold">Nivel Miaucornia.</span> Siempre
          cerveza en mano, nadie te gana a patinar pedo. Coges la ruta a mitad
          de camino para evitar las cuestas. Llegas tarde y persigues la ruta.
          Te quejas del cansancio y pides un descanso para ir al chino. Bomba de
          humo. <br /> <br />
          Para pasar de uno a otro hay que ir probando poco a poco. <br />
          🪨🔜🐌🔜🐛🔜🦋🔜🚀🔜☠️🔜🐈🦄
        </p>
      </Dialog>
    </div>
  );
};

export default PaceDialogInfo;
