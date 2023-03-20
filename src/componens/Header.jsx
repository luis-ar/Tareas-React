import React from "react";
import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setisValidPresupuesto,
  gastos,
}) => {
  return (
    <header className="header-global">
      <h1 className="titulo-header">Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
