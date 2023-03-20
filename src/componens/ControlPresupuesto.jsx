import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setPresupuesto,
  setGastos,
  setisValidPresupuesto
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;
    //Calcular el porcentaje gastado
    const calculoPorcentaje = ((100 * totalGastado) / presupuesto).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(calculoPorcentaje);
    }, 750);
  }, [gastos]);

  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Desea reiniciar presupuesto y gastos?");
if(resultado){
  setPresupuesto(0);
  setGastos([]);
  setisValidPresupuesto(false)
}
    
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        {/* <CircularProgressbar
        value={10}
        /> */}

        <ChangingProgressProvider values={[porcentaje]}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${value}% Gastado`}
              circleRatio={0.75}
              styles={buildStyles({
                pathColor: porcentaje < 100 ? "#3B82F6" : "#DC2626",
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "butt",
                trailColor: "#eee",
                textColor: porcentaje < 100 ? "#3B82F6" : "#DC2626",
              })}
            />
          )}
        </ChangingProgressProvider>
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>

        <p>
          <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
        </p>
        <p className={disponible < 0 && "negativo"}>
          <span>Disponible: </span> {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
