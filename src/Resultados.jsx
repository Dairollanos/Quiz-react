import { useState } from "react";
import { useEffect, useContext } from "react";
import { PreguntasContext } from "./PreguntasContext";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

const useStyles = makeStyles({
  inicio: {
    background: "#76ff03",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
  },
});

const Resultados = () => {
  const { usuario, puntuacion, setPuntuacion, Npreguntas } =
    useContext(PreguntasContext);
  const [mensaje, setMensaje] = useState("");
  const [calificacion, setCalificacion] = useState(null);
  const historial = useHistory();
  const classes = useStyles();

  const Calificar = function () {
    if (puntuacion === Npreguntas) {
      setMensaje("Congratulations, perfect score!");
      setCalificacion(1);
    } else if (puntuacion > Npreguntas / 2) {
      setMensaje("Good job!");
      setCalificacion(2);
    } else {
      setMensaje("Keep working, you need to improve");
      setCalificacion(3);
    }
  };
  const VolverInicio = function () {
    setPuntuacion(0);
    historial.push("/");
  };
  useEffect(function () {
    Calificar();
  }, []);
  return (
    <div className="resultados">
      <div className="titulos">
        <strong>{usuario}</strong> your score is: <br />
        <span
          className={`mensaje ${
            calificacion === 1
              ? "perfecta"
              : calificacion === 2
              ? "buena"
              : calificacion === 3
              ? "mala"
              : ""
          }`}
        >
          {puntuacion} / {Npreguntas} <br />
          {mensaje}
        </span>
      </div>
      <Box my={3}>
        <Button
          variant="contained"
          className={classes.inicio}
          fullWidth
          onClick={VolverInicio}
        >
          Jugar de nuevo <HomeOutlinedIcon />
        </Button>
      </Box>
    </div>
  );
};

export default Resultados;
