import React, { useEffect, useState } from "react";
import Papel from "../img/Papel.jpeg";
import Papel2 from "../img/Papel2.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSoli } from "../context/SolicitudContext";
import { useAuth } from "../context/authContext";
import useFetch from "../util/useFetch.js";

export const RegisterSolicitudPage = () => {
  const [folio, setFolio] = useState("");
  const [fecha, setFecha] = useState("");
  const [suministro, setSuministro] = useState("");
  const [pc, setPc] = useState("");
  const [proyecto, setProyecto] = useState("");
  // const [actividad, setActividad] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [items, setItems] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [activitiesLoaded, setActivitiesLoaded] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState("");
  const [selectedActividad, setSelectedActividad] = useState("");
  const {
    crearmySoli,
    getIdsProyectYAct,
    getIdsProyect,ids, //ids trae los proyectos xd
    idsAct = [],
  } = useSoli();
  const { user } = useAuth();
  const id = user.id;



  const guardarDatos = () => {
    // Guardar los datos del formulario en el estado
    const datosSolicitud = {
      folio,
      fecha,
      suministro,
      pc,
      proyecto,
      actividad,
      justificacion,
      items,
      id,
    };
    setDatos(datosSolicitud);

    console.log("Datos de solicitud:", datosSolicitud);
    crearmySoli(datosSolicitud);
    // Guardar los datos en localStorage
    localStorage.setItem("datosSolicitud", JSON.stringify(datosSolicitud));
    // Limpiar campos
    setFolio("");
    setFecha("");
    setSuministro("");
    setPc("");
    setProyecto("");
    setActividad("");
    setJustificacion("");
    setItems([]);

    alert("Datos guardados exitosamente.");
  };

  const agregarItem = () => {
    if (items.length < 10) {
      setItems([...items, { cantidad: "", unidad: "", descripcion: "" }]);
    } else {
      alert("No se pueden agregar más de 10 items.");
    }
  };

  const guardarDatosYGenerarPDF = () => {
    if (
      !folio ||
      !fecha ||
      !suministro ||
      !pc ||
      !proyecto ||
      !actividad ||
      !justificacion ||
      items.length === 0
    ) {
      alert("Por favor, complete todos los campos y agregue al menos un ítem.");
      return;
    }

    const datosSolicitud = {
      folio,
      fecha,
      suministro,
      pc,
      proyecto,
      actividad,
      justificacion,
      items,
    };
    setDatos(datosSolicitud);

    localStorage.setItem("datosSolicitud", JSON.stringify(datosSolicitud));
  };

  const [datos, setDatos] = useState({
    folio: "",
    fecha: "",
    suministro: "",
    pc: "",
    proyecto: "",
    actividad: "",
    justificacion: "",
    items: [],
  });

  useEffect(() => {
    // Cargar datos guardados desde localStorage al cargar la página
    const datosGuardados = JSON.parse(localStorage.getItem("datosSolicitud"));
    if (datosGuardados) {
      setFolio(datosGuardados.folio);
      setFecha(datosGuardados.fecha);
      setSuministro(datosGuardados.suministro);
      setPc(datosGuardados.pc);
      setProyecto(datosGuardados.proyecto);
      setActividad(datosGuardados.actividad);
      setJustificacion(datosGuardados.justificacion);
      setItems(datosGuardados.items);
    }
  }, []);

  const handleProyectoChange = async (value) => {
    setSelectedProyecto(value);
    setSelectedActividad("");
    setActivitiesLoaded(false);
    try {
      await getIdsProyectYAct(value); // Pasar el id del proyecto seleccionado
      setActivitiesLoaded(true);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
  

  useEffect(() => {
    const fetchActivities = async () => {
      console.log(selectedProyecto)
      if (selectedProyecto && !activitiesLoaded) {
        try {
          await getIdsProyectYAct(selectedProyecto);
          setActivitiesLoaded(true);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    }; 

    fetchActivities();
  }, [proyecto, activitiesLoaded, getIdsProyectYAct]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!projectsLoaded) {
        try {
          await getIdsProyect(); // Cargar proyectos al inicio
          setProjectsLoaded(true);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };
  
    fetchProjects();
  }, [projectsLoaded, getIdsProyect]);
  

  
  function generarPDF() {
    const img1 = document.getElementById("image1");
    const img2 = document.getElementById("image2");

    if (!img1 || !img2) {
      console.error("No se encontraron los elementos con ID image1 o image2");
      return;
    }

    const datos = JSON.parse(localStorage.getItem("datosSolicitud"));
    if (!datos) {
      console.error("Datos no encontrados en el localStorage");
      return;
    }

    const maxItemsPerPage = 10;
    const itemsChunks = [];

    for (let i = 0; i < datos.items.length; i += maxItemsPerPage) {
      itemsChunks.push(datos.items.slice(i, i + maxItemsPerPage));
    }

    itemsChunks.forEach((items, pageIndex) => {
      const doc = new jsPDF("p", "pt", "letter"); // Tamaño carta

      // Convertir imágenes a base64
      const canvas1 = document.createElement("canvas");
      const context1 = canvas1.getContext("2d");
      canvas1.width = img1.width;
      canvas1.height = img1.height;
      context1.drawImage(img1, 0, 0, img1.width, img1.height);
      const imgData1 = canvas1.toDataURL("image/jpeg");

      const canvas2 = document.createElement("canvas");
      const context2 = canvas2.getContext("2d");
      canvas2.width = img2.width;
      canvas2.height = img2.height;
      context2.drawImage(img2, 0, 0, img2.width, img2.height);
      const imgData2 = canvas2.toDataURL("image/jpeg");

      // Calcular las posiciones de las imágenes y la tabla
      const img1Height = (img1.height * 600) / img1.width;
      const img2Height = (img2.height * 600) / img2.width;

      // Agregar la primera imagen al PDF
      doc.addImage(imgData1, "JPEG", 0, 0, 600, img1Height);

      // Usar autoTable para generar la tabla del HTML al PDF
      doc.autoTable({
        html: "#miTabla",
        startY: img1Height + 3,
        margin: { top: 0, bottom: 0, left: 30, right: 100 },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          valign: "middle",
          halign: "center",
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
          cellHeight: "auto",
        },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 50 },
          2: { cellWidth: 50 },
          3: { cellWidth: 50 },
          4: { cellWidth: 50 },
          5: { cellWidth: 200 },
          6: { cellWidth: 50 },
        },
        rowPageBreak: "auto",
      });

      // Obtener la fecha del localStorage
      if (datos.fecha) {
        const [year, month, day] = datos.fecha.split("-");

        // Agregar la fecha seleccionada al PDF
        doc.setFontSize(9); // Establecer el tamaño de la fuente
        doc.text(day, 460, img1Height - 70.3);
        doc.text(month, 505, img1Height - 70.3);
        doc.text(year, 545, img1Height - 70.3);
      } else {
        console.error("Fecha no encontrada en los datos almacenados");
      }

      // Listo para suministro
      doc.setFontSize(30);
      if (datos.suministro === "Normal") {
        doc.text("•", 92, img1Height - 5);
      } else {
        doc.text("•", 165, img1Height - 4.9);
      }

      doc.setFontSize(30);
      if (datos.pc === "Educativo") {
        doc.text("•", 304, img1Height - 22);
      } else {
        doc.text("•", 298, img1Height - 1);
      }

      // Agregar la segunda imagen al PDF
      doc.addImage(
        imgData2,
        "JPEG",
        0,
        doc.previousAutoTable.finalY,
        600,
        img2Height
      );

      doc.save(`solicitud_page_${pageIndex + 1}.pdf`);
    });
  }

  return (
    <div className="body2">
      <div className="formulariodatos" id="formRef">
        <div className="division">
          <label htmlFor="Folio" className="labels">
            No. de folio:
          </label>
          <input
            type="number"
            id="Folio"
            className="Inputfolio"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
          />
          <label>Selecciona la fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="division">
          <label className="labels">Tipo de Suministro:</label>
          <label className="labels">Proceso Clave (PC):</label>
        </div>
        <div className="division">
          <select
            id="Suministro"
            value={suministro}
            onChange={(e) => setSuministro(e.target.value)}
          >
            <option value="">Seleccione un suministro</option>
            <option value="Normal">Normal</option>
            <option value="Urgente">Urgente</option>
          </select>
          <select id="PC" value={pc} onChange={(e) => setPc(e.target.value)}>
            <option value="">Seleccione el PC</option>
            <option value="Educativo">PC Educativo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="division">
          <label className="labels">Proyecto:</label>
          <label className="labels">Actividad:</label>
        </div>
        <div className="division">
          <div className="division">
          <div className="division">
          <label className="labels">Proyecto:</label>
          <select
            id="Proyecto"
            value={selectedProyecto}
            onChange={(e) => handleProyectoChange(e.target.value)}
          >
            <option value="">Seleccione el Proyecto</option>
            {ids.map((proyecto) => (
              <option key={proyecto.id} value={proyecto.id}>
                {proyecto.nombre}
              </option>
            ))}
          </select>
        </div>
          </div>
          <select
            id="Actividad"
            value={actividad}
            onChange={(e) => setSelectedActividad(e.target.value)}
          >
            <option value="">Selecciona una actividad</option>
              {idsAct.map((actividad) => (
                <option key={actividad._id} value={actividad._id}>
                  {actividad.nombre}
                </option>
              ))}
          </select>
        </div>
        <div id="itemsContainer">
          {items.map((item, index) => (
            <div key={index} className="division">
              <label className="labels">Cantidad:</label>
              <input
                type="number"
                className="item-cantidad"
                value={item.cantidad}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].cantidad = e.target.value;
                  setItems(newItems);
                }}
              />
              <label className="labels">Unidad de medida:</label>
              <select
                className="item-unidad"
                value={item.unidad}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].unidad = e.target.value;
                  setItems(newItems);
                }}
              >
                <option value="">Seleccione la Unidad</option>
                <option value="Paquete">Paquete</option>
                <option value="Rollo">Rollo</option>
                <option value="Caja">Caja</option>
              </select>
              <label className="labels">Descripcion del bien solicitado:</label>
              <textarea
                className="inputs3 item-descripcion"
                value={item.descripcion}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].descripcion = e.target.value;
                  setItems(newItems);
                }}
              ></textarea>
            </div>
          ))}
          <button onClick={agregarItem}>Agregar Item</button>
        </div>
        <button type="button" onClick={guardarDatosYGenerarPDF}>
          Guardar cambios y generar PDF
        </button>

        <div className="division">
          <label className="labels">Justificacion para la adquisición:</label>
        </div>
        <textarea
          className="inputs3"
          id="Justificacion"
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
        ></textarea>
      </div>
      <div className="botones">
        <button className="btn-primary" onClick={guardarDatos}>
          Guardar cambios
        </button>
        <button onClick={generarPDF}>Generar PDF</button>
      </div>
      <div style={{ display: "none" }}>
        <img
          src={Papel}
          id="image1"
          alt="Papel"
          style={{ height: "100%", width: "100%" }}
        />
        <table id="miTabla" className="tabla">
          <thead>
            <tr>
              <th rowSpan="2">POA</th>
              <th style={{ width: "80px" }} rowSpan="2">
                PPTO.
              </th>
              <th colSpan="2">CANTIDAD</th>
              <th rowSpan="2">UNIDAD DE MEDIDA</th>
              <th style={{ width: "200px" }} rowSpan="2">
                DESCRIPCION DEL BIEN SOLICITADO
              </th>
              <th rowSpan="2">CANT. ENT.</th>
            </tr>
            <tr>
              <th>SOLIC.</th>
              <th>POA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="td-proyecto" rowSpan="5">
                Proyecto: <br />
                {datos.proyecto}
              </td>
              <td></td>
              <td>{datos.items[0]?.cantidad}</td>

              <td></td>
              <td>{datos.items[0]?.unidad}</td>

              <td>{datos.items[0]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[1]?.cantidad}</td>

              <td></td>
              <td>{datos.items[1]?.unidad}</td>

              <td>{datos.items[1]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[2]?.cantidad}</td>

              <td></td>
              <td>{datos.items[2]?.unidad}</td>

              <td>{datos.items[2]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[3]?.cantidad}</td>

              <td></td>
              <td>{datos.items[3]?.unidad}</td>

              <td>{datos.items[3]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[4]?.cantidad}</td>

              <td></td>
              <td>{datos.items[4]?.unidad}</td>

              <td>{datos.items[4]?.descripcion}</td>
            </tr>
            <tr>
              <td id="td-actividad" rowSpan="5">
                Actividad: <br /> {datos.actividad}
              </td>
              <td></td>
              <td>{datos.items[5]?.cantidad}</td>

              <td></td>
              <td>{datos.items[5]?.unidad}</td>

              <td>{datos.items[5]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[6]?.cantidad}</td>

              <td></td>
              <td>{datos.items[6]?.unidad}</td>

              <td>{datos.items[6]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[7]?.cantidad}</td>

              <td></td>
              <td>{datos.items[7]?.unidad}</td>

              <td>{datos.items[7]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[8]?.cantidad}</td>

              <td></td>
              <td>{datos.items[8]?.unidad}</td>

              <td>{datos.items[8]?.descripcion}</td>
            </tr>
            <tr>
              <td></td>
              <td>{datos.items[9]?.cantidad}</td>

              <td></td>
              <td>{datos.items[9]?.unidad}</td>

              <td>{datos.items[9]?.descripcion}</td>
            </tr>
            <tr>
              <td rowSpan="">JUSTIFICACION PARA LA ADQUISICION:</td>
              <td id="td-justificacion" colSpan="6">
                {datos.justificacion}
              </td>
            </tr>
          </tbody>
        </table>
        <img
          src={Papel2}
          id="image2"
          alt="Papel2"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};
