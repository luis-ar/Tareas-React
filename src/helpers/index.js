export const generarId = () => {
  const random = Math.random().toString(36).substring(2)
  const fecha = Date.now().toString(36);
  id = random + fecha;
  return id;
};

export const formatearFecha=fecha=>{
  const fehcaNueva=new Date(fecha)
  const opciones={
    year:'numeric',
    month:'long',
    day:'2-digit'
  }
  return fehcaNueva.toLocaleDateString('es-ES',opciones)
}