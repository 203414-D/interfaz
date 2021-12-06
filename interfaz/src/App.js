
import Mascota from "./mascota";
import Dueno from "./Dueno";
import Medicamentos from "./medicamentos";
import './App.css';



function App() {

  return (
    <div className="App">
          <h1>Veterinaria</h1>
        <Mascota></Mascota>
        <Dueno></Dueno>
        <Medicamentos></Medicamentos>
    </div>
  );
}

export default App;
