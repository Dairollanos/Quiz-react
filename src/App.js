import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Inicio from "./Inicio";
import Preguntas from "./Preguntas";
import Resultados from "./Resultados";
import { PreguntasProvider } from "./PreguntasContext";

function App() {
  return (
    <div className="App">
      <Router>
        <PreguntasProvider>
          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>
            <Route path="/preguntas">
              <Preguntas />
            </Route>
            <Route path="/resultados">
              <Resultados />
            </Route>
          </Switch>
        </PreguntasProvider>
      </Router>
    </div>
  );
}

export default App;
