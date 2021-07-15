import { useState } from "react";
import { useEffect, useContext } from "react";
import { PreguntasContext } from "./PreguntasContext";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

const useStyles = makeStyles({
  siguiente: {
    background: "#03a9f4",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
  },
  resultados: {
    background: "#ffeb3b",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
  },
});

const Preguntas = () => {
  const { data, usuario, puntuacion, setPuntuacion, Npreguntas } =
    useContext(PreguntasContext);
  const [cont, setCont] = useState(0);
  const [algo, setAlgo] = useState([]);
  const [proxima, setProxima] = useState(false);
  const [ultima, setUltima] = useState(false);
  const historial = useHistory();
  const classes = useStyles();

  const Pregunta = function () {
    let Preg_corr = data[cont];
    Preg_corr = Preg_corr.question.replace(/(&quot;)/g, '"');
    Preg_corr = Preg_corr.replace(/(&#039;)/g, "'");
    return Preg_corr;
  };
  const Respuestas = function () {
    let Resp_corr = data[cont];
    Resp_corr = Resp_corr.incorrect_answers;
    Resp_corr.push(data[cont].correct_answer);
    Resp_corr = Resp_corr.sort((a, b) => {
      return 0.5 - Math.random();
    });
    let items = [];
    Resp_corr.forEach((element) => {
      let resp = {
        respuesta: element,
        correcta: false,
        incorrecta: false,
      };
      items.unshift(resp);
    });
    return items;
  };
  const Responder = function (respuesta) {
    let Resp_corr = data[cont].correct_answer;
    setAlgo(
      algo.map(function (x) {
        if (x.respuesta === Resp_corr) {
          x.correcta = true;
        } else {
          x.incorrecta = true;
        }
        return x;
      })
    );
    if (respuesta.respuesta === Resp_corr) {
      setPuntuacion(puntuacion + 1);
    }
    if (cont < Npreguntas - 1) {
      setProxima(true);
    } else {
      setUltima(true);
    }
  };
  const AvanzarPregunta = function () {
    if (cont < Npreguntas) {
      setCont(cont + 1);
    }
  };
  const verResultados = function () {
    historial.push("/resultados");
  };
  useEffect(
    function () {
      setAlgo(Respuestas());
      setProxima(false);
      setUltima(false);
    },
    [cont]
  );
  return (
    <div className="preguntas">
      <div className="titulos">
        <h1>{usuario}, choose the correct answer</h1>
      </div>
      <h3>{Pregunta()}</h3>
      {algo.map((item) => (
        <p
          className={`respuestas ${item.correcta ? "correcta" : ""} ${
            item.incorrecta ? "incorrecta" : ""
          }`}
          key={item.respuesta}
          onClick={() => Responder(item)}
        >
          {item.respuesta}
        </p>
      ))}
      <Box my={3}>
        {proxima && (
          <Button
            variant="contained"
            className={classes.siguiente}
            fullWidth
            onClick={AvanzarPregunta}
          >
            Siguiente {""} <ArrowForwardOutlinedIcon />
          </Button>
        )}
        {ultima && (
          <Button
            variant="contained"
            className={classes.resultados}
            fullWidth
            onClick={verResultados}
          >
            Ver resultados <StarOutlineIcon />
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Preguntas;
