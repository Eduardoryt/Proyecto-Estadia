import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSoli } from "../context/SolicitudContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClone } from '@fortawesome/free-solid-svg-icons';

export const RegisterTecnicoPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [fechaAtencion, setFechaAtencion] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [selectedOrderDate, setSelectedOrderDate] = useState(new Date());
  const [selectedAttentionDate, setSelectedAttentionDate] = useState(new Date());


  const { createInfo, getIdsProyect, ids, getIdsProyectYAct } = useSoli();
  const { user } = useAuth();
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState("");
  const [insumos, setInsumos] = useState([{ cantidad: "", descripcion: "" }]);
  const { createInfo, getIdsProyect, ids, getIdsProyectYAct } = useSoli();

  useEffect(() => {
    if (!projectsLoaded) {
      getIdsProyect()
        .then(() => {
          setProjectsLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [projectsLoaded, getIdsProyect]);

  const handleProyectoChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProyecto(projectId);
    setValue("proyecto", projectId);

    try {
      await getIdsProyectYAct(projectId);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const agregarItem = (e) => {
    e.preventDefault();
    if (insumos.length < 4) {
      setInsumos([...insumos, { cantidad: "", descripcion: "" }]);
    } else {
      alert("No se pueden agregar más de 4 insumos.");
    }
  };

  const eliminarItem = (index, e) => {
    e.preventDefault();
    setInsumos(insumos.filter((_, i) => i !== index));
  };

  const duplicarItem = (index) => {
    if (insumos.length < 4) {
      const insumoToDuplicate = insumos[index];
      setInsumos([...insumos, { ...insumoToDuplicate }]);
    } else {
      alert("No se pueden agregar más de 4 insumos.");
    }
  };

  const handleInsumoChange = (index, field, value) => {
    const newInsumos = [...insumos];
    newInsumos[index][field] = value;
    setInsumos(newInsumos);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // const response = await fetch('http://localhost/Tutorial2_OpentbsWordPHP-master/ordenSoli.php', {
    //   method: 'POST',
    //   body: formData
    // });

    // const result = await response.json();
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <form method="post" target="_blank" onSubmit={handleSubmit2}>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">Orden de trabajo de mantenimiento a mobiliario e instalaciones</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6 text-black">
            <div>
              <label className="block text-sm font-medium mb-1">Folio Interno:</label>
              <input
                type="number"
                id="folio"
                name="folio"
                disabled
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("folio")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Selecciona la fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={fecha || ""}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Selecciona la fecha de atención:</label>
              <input
                type="date"
                id="fechaAtencion"
                name="fechaAtencion"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={fechaAtencion || ""}
                onChange={(e) => setFechaAtencion(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6 text-black">
            <div>
              <label className="block text-sm font-medium mb-1">Area solicitante:</label>
              <input
                type="text"
                id="areasoli"
                name="areasoli"
                {...register("areasoli")}
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Solicita:</label>
              <input
                type="text"
                id="solicita"
                name="solicita"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("solicita")}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Edificio:</label>
              <input
                type="text"
                id="edificio"
                name="edificio"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("edificio")}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-black">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Mantenimiento:</label>
              <select
                id="tipoMantenimiento"
                {...register("tipoMantenimiento")}
                name="tipoMantenimiento"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccione un tipo de mantenimiento</option>
                <option value="mobilario">Mobilario</option>
                <option value="instalaciones">Instalaciones</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Trabajo:</label>
              <select
                id="tipoTrabajo"
                {...register("tipoTrabajo")}
                name="tipoTrabajo"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccione el tipo de trabajo</option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Solicitud:</label>
              <select
                id="tipoSolicitud"
                {...register("tipoSolicitud")}
                name="tipoSolicitud"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccione el tipo de solicitud</option>
                <option value="normal">Normal</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>
          <div className="mb-6 text-black">
            <label className="block text-sm font-medium mb-1">Descripción (servicio requerido):</label>
            <textarea
              className="w-full resize-none p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="desc"
              name="desc"
              {...register("desc")}
            ></textarea>
          </div>
          <div className="mb-6 bg-green-500 p-3 rounded-md text-white">
            <label className="block text-center text-sm font-bold mb-1">Llenado Exclusivo para el DEP MSG:</label>
          </div>
          <div className="text-black flex flex-col items-center">
            <label className="block text-sm font-medium mb-1">Seleccione la fecha de atención:</label>
            <input
              type="date"
              id="fechaAtencion"
              name="fechaAtencion"
              className="w-96 p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={fechaAtencion || ""}
              onChange={(e) => setFechaAtencion(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Insumos Solicitados:</label>
            <div className="flex justify-center items-center">
              <table className="min-w-full divide-y divide-black text-black">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-center text-xs font-medium text-black uppercase tracking-wider p-2 border">Cantidad</th>
                    <th className="text-center text-xs font-medium text-black uppercase tracking-wider p-2 border">Descripción del insumo</th>
                    <th className="text-center text-xs font-medium text-black uppercase tracking-wider p-2 border">Acción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-400">
                  {insumos.map((insumo, index) => (
                    <tr key={index}>
                      <td className="w-1/6 p-2 align-middle">
                        <input
                          type="number"
                          id={`cantidad-${index}`}
                          name={`insumos[${index}][cantidad]`}
                          placeholder="Ingresa la cantidad"
                          className="text-center w-full p-2 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          value={insumo.cantidad}
                          onChange={(e) => handleInsumoChange(index, "cantidad", e.target.value)}
                        />
                      </td>
                      <td className="w-1/3 p-2 align-middle">
                        <textarea
                          type="text"
                          className="w-full resize-none p-1 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          id={`descripcion-${index}`}
                          name={`insumos[${index}][descripcion]`}
                          placeholder="Descripción"
                          value={insumo.descripcion}
                          onChange={(e) => handleInsumoChange(index, "descripcion", e.target.value)}
                        />
                      </td>
                      <td className="w-1/6 p-2 align-middle">
                        <div className="flex space-x-4 justify-center">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => eliminarItem(index, e)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => duplicarItem(index)}
                          >
                            <FontAwesomeIcon icon={faClone} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-md border border-black"
                onClick={agregarItem}
              >
                Añadir Insumo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-black">
            <div>
              <label className="block text-sm font-medium mb-1">Proyecto:</label>
              <select
                id="proyecto"
                name="proyecto"
                className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedProyecto}
                onChange={handleProyectoChange}
                required
              >
                <option value="" disabled>Seleccione el Proyecto</option>
                {ids.map((proyecto) => (
                  <option key={proyecto._id} value={proyecto._id}>
                    {proyecto.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <div>
                <label className="block text-sm font-medium mb-1">Observaciones y/o diagnóstico técnico:</label>
                <textarea
                  className="w-full resize-none p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  id="obs"
                  name="obs"
                  {...register("obs")}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-black" style={{ display: 'none' }}>
            <div className="flex justify-between mt-4">
              {['Solicitud', 'Revisión', 'Validación', 'Autorizó'].map((label, idx) => (
                <div key={idx} className="w-1/4">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td><label htmlFor={label.toLowerCase()}>{label}</label></td>
                      </tr>
                      <tr className="h-16">
                        <td>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            id={label.toLowerCase()}
                            name={label.toLowerCase()}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-6 justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md border border-black">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
