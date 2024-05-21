import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/solicitud.css";
import { generatePDF } from "../util/pdfUtils";
import { useSoli } from "../context/SolicitudContext";

export const RegisterTecnicoPage = () => {
  const formRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const {
    createInfo,
    getIdsProyect,
    ids,
    getIdsProyectYAct,
  } = useSoli();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;

    const formData = new FormData(form);
    const data = {
      folio: formData.get("Folio"),
      areaSolicitante: formData.get("AreaSolicitante"),
      solicita: formData.get("Solicita"),
      edificio: formData.get("Edificio"),
      tipoMantenimiento: formData.get("TipoMantenimiento"),
      tipoTrabajo: formData.get("TipoTrabajo"),
      tipoSolicitud: formData.get("TipoSolicitud"),
      suministro: formData.get("Suministro"),
      justificacion: formData.get("Justificacion"),
      fecha: selectedDate,
      proyecto: form.querySelector("#Proyecto option:checked").innerText,
      observaciones: formData.get("Observaciones"),
        cantidad: formData.get("Cantidad"),
        descripcion: formData.get("Descripcion"),
    };

    createInfo(data);
    console.log(data);
  };

  const handleGeneratePDF = (event) => {
    event.preventDefault();
    handleSubmit(event);

    const form = formRef.current;
    const formData = new FormData(form);
    const data = {
      folio: formData.get("Folio"),
      areaSolicitante: formData.get("AreaSolicitante"),
      solicita: formData.get("Solicita"),
      edificio: formData.get("Edificio"),
      tipoMantenimiento: formData.get("TipoMantenimiento"),
      tipoTrabajo: formData.get("TipoTrabajo"),
      tipoSolicitud: formData.get("TipoSolicitud"),
      suministro: formData.get("Suministro"),
      justificacion: formData.get("Justificacion"),
      fecha: selectedDate,
      actividad: form.querySelector("#Actividad option:checked").innerText,
      observaciones: formData.get("Observaciones"),
      insumosSolicitados: formData.get("InsumosSolicitados"),
      cantidad: formData.get("Cantidad"),
      descripcion: formData.get("Descripcion"),
    };
    
    generatePDF(data);
    console.log("Generate PDF with data:", data);
  };

  return (
    <div className="body2">
      <form className="formulariodatos" onSubmit={handleSubmit} ref={formRef}>
        <div className="division">
          <label htmlFor="Folio" className="labels">
            No. de folio:
          </label>
          <input type="number" id="Folio" name="Folio" className="Inputs2" required/>
          <label htmlFor="" className="labels">
            Selecciona la fecha:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            name="Fecha"
            required
            className="Inputs2"
          />
        </div>
        <div className="division">
          <label htmlFor="AreaSolicitante" className="labels">
            Area solicitante:
          </label>
          <input
            type="text"
            id="AreaSolicitante"
            name="AreaSolicitante"
            className="Inputs2" required
          />
          <label htmlFor="Solicita" className="labels">
            Solicita:
          </label>
          <input type="text" id="Solicita" name="Solicita"  className="Inputs2" required />
          <label htmlFor="Edificio" className="labels">
            Edificio:
          </label>
          <input type="text" id="Edificio" name="Edificio"  className="Inputs2" required/>
        </div>
        <div className="division">
          <label className="labels">Tipo de Mantenimiento:</label>
          <label className="labels">Tipo de Trabajo:</label>
          <label className="labels">Tipo de Solicitud:</label>
        </div>
        <div className="division">
          <select id="TipoMantenimiento" name="TipoMantenimiento"  className="select" required>
            <option value="">Seleccione un tipo de mantenimiento</option>
            <option value="Normal">Normal</option>
            <option value="Urgente">Urgente</option>
          </select>
          <select id="TipoTrabajo" name="TipoTrabajo" className="select" required>
            <option value="">Seleccione el tipo de trabajo</option>
            <option value="Educativo">PC Educativo</option>
            <option value="Otro">Otro</option>
          </select>
          <select id="TipoSolicitud" name="TipoSolicitud"  className="select" required>
            <option value="">Seleccione el tipo de solicitud</option>
            <option value="Educativo">PC Educativo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="division">
          <label className="labels">Descripción (servicio requerido):</label>
        </div>
        <textarea
          className="inputs3"
          id="Justificacion"
          name="Justificacion"
        ></textarea>
        <div className="division" style={{ backgroundColor: "green" }}>
          <label className="labels">Llenado Exclusivo para el DEP MSG:</label>
        </div>
        <div>
          <label className="labels">Seleccione la fecha de atencion:</label>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)} className="Inputs2" required
        />
        <div className="division">
          <label className="labels">Insumos Solicitados:</label>
        </div>
        <div className="division">
          <label className="labels">Cantidad:</label>
          <label className="labels">Descripcion:</label>
        </div>
        <div className="division">
          <input type="number" id="Cantidad" name="Cantidad" className="Inputs2" placeholder="Ingresa la cantidad" />
          <input
            className="Inputs2" 
            id="Descripcion"
            name="Descripcion"
          ></input>
        </div>
        <div className="division">
          <select id="Proyecto" name="Proyecto"  className="select" value={selectedProyecto} required>
            <option value="">Seleccione el Proyecto</option>
            <option value="ProyectoA">Mantenimiento</option>
            <option value="ProyectoB">Mantenimiento 2</option>
          </select>
        </div>
        <div className="division">
          <label className="labels">
            Observaciones y/o diagnóstico técnico:
          </label>
        </div>
        <textarea
          className="inputs3"
          id="Observaciones"
          name="Observaciones"
        ></textarea>
        <div className="botones">
          <button type="submit" className="btn-primary">
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleGeneratePDF}
          >
            Generar PDF
          </button>
        </div>
      </form>
    </div>
  );
};
