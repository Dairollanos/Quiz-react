import React from "react";
import { createContext, useState } from "react";

//context
export const PreguntasContext = createContext();

//provider

export const PreguntasProvider = (props) => {
  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [Npreguntas, setNpreguntas] = useState(5);

  return (
    <div>
      <PreguntasContext.Provider
        value={{
          data,
          setData,
          usuario,
          setUsuario,
          puntuacion,
          setPuntuacion,
          Npreguntas,
          setNpreguntas,
        }}
      >
        {props.children}
      </PreguntasContext.Provider>
    </div>
  );
};
