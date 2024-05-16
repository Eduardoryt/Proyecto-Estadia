import React, { useRef, useState } from 'react';
import { generatePDF } from '../utils/pdfUtils';
import '../../SolicitudStyles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SolicitudPage = () => {
  const formRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [items, setItems] = useState([{ cantidad: '', unidad: '', descripcion: '' }]);

  const handleGeneratePDF = () => {
    const form = formRef.current;
    const data = {
      folio: form.querySelector('#Folio').value,
      suministro: form.querySelector('#Suministro').value,
      pc: form.querySelector('#PC').value,
      proyecto: form.querySelector('#Proyecto').value,
      actividad: form.querySelector('#Actividad').value,
      justificacion: form.querySelector('#Justificacion').value,
      fecha: selectedDate,
      items,
    };
    generatePDF(data);
  };

  const addItem = () => {
    setItems([...items, { cantidad: '', unidad: '', descripcion: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div className='body2'>
      <div className='formulariodatos' ref={formRef}>
        <div className='division'>
          <label htmlFor='Folio' className="labels">No. de folio:</label>
          <input type="number" id='Folio' className='Inputfolio' />
          <label htmlFor="">Selecciona la fecha:</label>
          <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
        </div>
        <div className='division'>
          <label className="labels">Tipo de Suministro:</label>
          <label className="labels">Proceso Clave (PC):</label>
        </div>
        <div className='division'>
          <select id="Suministro">
            <option value="">Seleccione un suministro</option>
            <option value="Normal">Normal</option>
            <option value="Urgente">Urgente</option>
          </select>
          <select id="PC">
            <option value="">Seleccione el PC</option>
            <option value="Educativo">PC Educativo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className='division'>
          <label className="labels">Proyecto:</label>
          <label className="labels">Actividad:</label>
        </div>
        <div className='division'>
          <select id="Proyecto">
            <option value="">Seleccione el Proyecto</option>
            <option value="ProyectoA">Mantenimiento</option>
            <option value="ProyectoB">Mantenimiento 2</option>
          </select>
          <select id="Actividad">
            <option value="">Seleccione la Actividad</option>
            <option value="Actividad A">Verificación de la verificación del programa anual  de mantenimiento</option>
            <option value="Actividad B">Actividad B</option>
          </select>
        </div>
        {items.map((item, index) => (
          <div className='division' key={index}>
            <label className='labels'>Cantidad:</label>
            <input 
              type="number" 
              value={item.cantidad} 
              onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} 
            />
            <label className="labels">Unidad de medida:</label>
            <select 
              value={item.unidad} 
              onChange={(e) => handleItemChange(index, 'unidad', e.target.value)}
            >
              <option value="">Seleccione la Unidad</option>
              <option value="Paquete">Paquete</option>
              <option value="Rollo">Rollo</option>
              <option value="Caja">Caja</option>
            </select>
            <label className="labels">Descripcion del bien solicitado:</label>
            <textarea 
              className='inputs3' 
              value={item.descripcion} 
              onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
            ></textarea>
          </div>
        ))}
        <button onClick={addItem}>Agregar otra fila</button>
        <div className='division'>
          <label className="labels">Justificacion para la adquisición:</label>
        </div>
        <textarea className='inputs3' id="Justificacion"></textarea>
      </div>
      <div className='botones'>
        <button className="btn-primary">Guardar cambios</button>
        <button className="btn-primary" onClick={handleGeneratePDF}>Generar PDF</button>
      </div>
    </div>
  );
};