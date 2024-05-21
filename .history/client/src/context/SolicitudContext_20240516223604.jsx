import { createContext, useContext, useState } from "react";
import {
  getSolitudes,
  createSoli,
  deleteSoli,
  getUnaSoli,
  updateSoli,
  idsProyect,traeUnProyectAct
} from "../api/soli";

const SoliContext = createContext();

export const useSoli = () => {
  const context = useContext(SoliContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function SoliProvider({ children }) {
  const [soli, setSoli] = useState([]);
  const [ids, setIds] = useState([]);
  const [idsAct, setIdsAct] = useState([]);

  const getSoli = async () => {
    const res = await getSolitudes();
    setSoli(res.data);
  };

  const getIdsProyect = async () => {
    const res = await idsProyect();
    setIds(res.data);
  };

  const getIdsProyectYAct = async (_id) => {
    const res = await traeUnProyectAct(idProyectoSeleccionado);
    setIdsAct(res.data);
  };

  const crearmySoli = async (soli) => {
    const res = await createSoli(soli);
    if (!res) {
      console.log("Error al iniciar sesión verifique su usuario o contraseña");
    } else {
      console.log("Inicio de sesión exitosa");
    }
  };

  return (
    <SoliContext.Provider
      value={{
        soli,
        getSoli,
        ids,
        getIdsProyect,
        idsAct,
        getIdsProyectYAct,
        crearmySoli,
        deleteSoli,
        getUnaSoli,
        updateSoli,
      }}
    >
      {children}
    </SoliContext.Provider>
  );
}
