import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { PreguntasContext } from "./PreguntasContext";
import { useHistory } from "react-router-dom";

const Inicio = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [categoria, setCategoria] = useState(9);
  const [dificultad, setDificultad] = useState("easy");
  const { setData, usuario, setUsuario, Npreguntas, setNpreguntas } =
    useContext(PreguntasContext);
  const historial = useHistory();

  useEffect(function () {
    fetchCategorias();
  }, []);
  const fetchCategorias = async function () {
    let respuesta2 = await fetch(`https://opentdb.com/api_category.php`);
    respuesta2 = await respuesta2.json();
    respuesta2 = await respuesta2.trivia_categories;
    setPreguntas(respuesta2);
  };
  const fetchPreguntas = async function () {
    let fPreguntas = await fetch(
      `https://opentdb.com/api.php?amount=${Npreguntas}&category=${categoria}&difficulty=${dificultad}&type=multiple`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          // "Content-Type": "application/json",
        },
      }
    );
    fPreguntas = await fPreguntas.json();
    fPreguntas = await fPreguntas.results;
    setData(fPreguntas);
    historial.push("/preguntas");
  };
  return (
    <div className="inicio">
      <div className="titulos">
        <h1>Welcome to your favorite quiz app</h1>
        <h3>Choose your options</h3>
      </div>
      <div className="opciones">
        <Box my={2}>
          <label htmlFor="usuario">Username:</label>
        </Box>
        <TextField
          id="usuario"
          variant="outlined"
          fullWidth
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Box my={2}>
          <label htmlFor="Npreguntas"># questions:</label>
        </Box>
        <Select
          id="Npreguntas"
          fullWidth
          required
          value={Npreguntas}
          onChange={(e) => setNpreguntas(e.target.value)}
        >
          <MenuItem value={5}>Five(5)</MenuItem>
          <MenuItem value={10}>Ten(10)</MenuItem>
          <MenuItem value={20}>Twenty(20)</MenuItem>
        </Select>

        <Box my={2}>
          <label htmlFor="categoria">Category:</label>
        </Box>
        <Select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          fullWidth
        >
          {preguntas.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Box my={2}>
          <label htmlFor="dificultad">Difficulty:</label>
        </Box>
        <Select
          id="dificultad"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          required
          fullWidth
        >
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
        </Select>

        <Box my={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={usuario ? false : true}
            onClick={fetchPreguntas}
          >
            Comenzar
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Inicio;
