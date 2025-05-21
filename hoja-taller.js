// hoja-taller.js

document.addEventListener('DOMContentLoaded', function() {
    const formularioTaller = document.getElementById('formularioTaller');
    const descargarPDFBtn = document.getElementById('descargarPDF');
  
    formularioTaller.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener datos del formulario
      const matricula = document.getElementById('matricula').value;
      const cliente = document.getElementById('cliente').value;
      const litrosAceite = document.getElementById('litrosAceite').value;
      const modeloFiltro = document.getElementById('modeloFiltro').value;
      const reparaciones = document.getElementById('reparaciones').value;
  
      // Guardar los datos en LocalStorage
      const mantenimiento = { fecha: new Date().toLocaleString(), matricula, cliente, litrosAceite, modeloFiltro, reparaciones };
      let mantenimientos = JSON.parse(localStorage.getItem('mantenimientos')) || [];
      mantenimientos.push(mantenimiento);
      localStorage.setItem('mantenimientos', JSON.stringify(mantenimientos));
  
      // Limpiar el formulario
      formularioTaller.reset();
      alert('Mantenimiento registrado correctamente ✅');
    });
  
    // Función para generar PDF con solicitud de credenciales de admin
    descargarPDFBtn.addEventListener('click', function() {
      const ADMIN_USER = 'admin';       // Usuario admin
      const ADMIN_PASS = 'password123'; // Cambia esta contraseña en producción
  
      const user = prompt('Usuario:');
      if (user !== ADMIN_USER) {
        alert('Usuario incorrecto');
        return;
      }
      const pass = prompt('Contraseña:');
      if (pass !== ADMIN_PASS) {
        alert('Contraseña incorrecta');
        return;
      }
  
      // Obtener todos los registros guardados
      const registros = JSON.parse(localStorage.getItem('mantenimientos')) || [];
      if (registros.length === 0) {
        alert('No hay registros para exportar.');
        return;
      }
  
      // Generar PDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Hoja de Mantenimientos - Taller', 20, 20);
  
      let y = 30;
      doc.setFontSize(12);
      registros.forEach((r, i) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`${i + 1}. Fecha: ${r.fecha}`, 20, y); y += 7;
        doc.text(`   Matrícula: ${r.matricula}`, 20, y); y += 7;
        doc.text(`   mecanico: ${r.mecanico}`, 20, y); y += 7;
        doc.text(`   Aceite (L): ${r.litrosAceite}`, 20, y); y += 7;
        doc.text(`   Filtro: ${r.modeloFiltro}`, 20, y); y += 7;
        doc.text(`   Reparaciones: ${r.reparaciones}`, 20, y); y += 10;
      });
  
      doc.save('mantenimientos_taller.pdf');
    });
  });
  
  