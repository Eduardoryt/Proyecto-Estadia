import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateFormSolicitud = (req, res) => {
  const {
    fecha,
    suministro,
    pc,
    myProyecto,
    myActividad,
    justificacion,
    items,
    solicitud,
    JefeInmediato,
    Validacion,
    Autorizo,
  } = req.body;

  const phpScriptPath = path.join(__dirname, "../php/formSolicitud.php");
  const args = [
    fecha,
    suministro,
    pc,
    myProyecto,
    myActividad,
    justificacion,
    items,
    solicitud,
    JefeInmediato,
    Validacion,
    Autorizo,
  ];

  const command = `php ${phpScriptPath} ${args.join(" ")}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PHP script: ${stderr}`);
      return res.status(500).send(`Error generating formSolicitud: ${stderr}`);
    }

    const nodeScriptPath = path.join(__dirname, "../apiPDF.js");
    const pdfCommand = `node ${nodeScriptPath} formSolicitud.docx formResult.pdf`;
    exec(pdfCommand, (pdfError, pdfStdout, pdfStderr) => {
      if (pdfError) {
        console.error(`Error converting to PDF: ${pdfStderr}`);
        return res.status(500).send(`Error converting to PDF: ${pdfStderr}`);
      }

      res.download(path.join(__dirname, "../formResult.pdf"), (downloadError) => {
        if (downloadError) {
          console.error(`Error sending PDF to client: ${downloadError}`);
          return res.status(500).send(`Error sending PDF to client: ${downloadError}`);
        }
      });
    });
  });
};

export const generateOrdenTrabajo = (req, res) => {
  const {
    folio,
    fecha,
    fechaAtencion,
    solicita,
    areasoli,
    edificio,
    tipoMantenimiento,
    tipoTrabajo,
    tipoSolicitud,
    desc,
    obs,
    items,
  } = req.body;

  const phpScriptPath = path.join(__dirname, "../php/ordenTrabajo.php");
  const args = [
    folio,
    fecha,
    fechaAtencion,
    solicita,
    areasoli,
    edificio,
    tipoMantenimiento,
    tipoTrabajo,
    tipoSolicitud,
    desc,
    obs,
    items,
  ];

  const command = `php ${phpScriptPath} ${args.join(" ")}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PHP script: ${stderr}`);
      return res.status(500).send(`Error generating ordenTrabajo: ${stderr}`);
    }

    const nodeScriptPath = path.join(__dirname, "../apiPDF.js");
    const pdfCommand = `node ${nodeScriptPath} ordenTrabajo.docx ordenResult.pdf`;
    exec(pdfCommand, (pdfError, pdfStdout, pdfStderr) => {
      if (pdfError) {
        console.error(`Error converting to PDF: ${pdfStderr}`);
        return res.status(500).send(`Error converting to PDF: ${pdfStderr}`);
      }

      res.download(path.join(__dirname, "../ordenResult.pdf"), (downloadError) => {
        if (downloadError) {
          console.error(`Error sending PDF to client: ${downloadError}`);
          return res.status(500).send(`Error sending PDF to client: ${downloadError}`);
        }
      });
    });
  });
};
s