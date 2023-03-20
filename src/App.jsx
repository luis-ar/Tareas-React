import { useState, useEffect } from "react";
import Header from "./componens/Header";
import ListadoGastos from "./componens/ListadoGastos";
import Modal from "./componens/Modal";
import Filtros from "./componens/Filtros";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

// import { generarId } from "./helpers";
import { nanoid } from "nanoid";

//importar para generarid unico
//npm install --save nanoid

function App() {
  const inicioPresupuesto = Number(localStorage.getItem("presupuesto")) || 0;
  const inicioGastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const [presupuesto, setPresupuesto] = useState(inicioPresupuesto);

  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(inicioGastos);

  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const eliminarGasto = (id) => {
    const gastosActualizadosEliminados = gastos.filter(
      (gasto) => gasto.id !== id
    );
    setGastos(gastosActualizadosEliminados);
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    if (filtro) {
      console.log(filtro);
      //Filtros Gastos por categoria
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) || 0;
    if (presupuestoLS > 0) {
      setisValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //Nuwvo gasto
      gasto.id = nanoid();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main className="main-gasto">
            <Filtros filtro={filtro} setFiltro={setFiltro} />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
