// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Aquí puedes agregar futuras funcionalidades JavaScript
    // Por ahora, el script.js está vacío porque no se requieren interacciones dinámicas en este momento.
});
// index.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Página principal cargada correctamente.');
    // Puedes añadir funcionalidades específicas del index aquí en el futuro
});

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapBtn = document.getElementById('snap');
const searchBtn = document.getElementById('buscarMatricula');
const inputMatricula = document.getElementById('matriculaInput');
const resultado = document.getElementById('resultado');

// Base de datos simulada
const vehiculosDB = {
  "GX474WG": {
    color: "BLANCO",
    bastidor: "VF3YCF6F7SG009044",
    categoria: "FG",
    itv: "Vigente hasta 08/05/2029",
    ultimaRevision: "04-06-2024"
  },
  "XYZ789": {
    color: "Negro",
    bastidor: "WB987654321",
    categoria: "Camión",
    itv: "Faltan 3 meses",
    ultimaRevision: "2025-04-10"
  }
};

// Encender la cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("No se pudo acceder a la cámara: ", err);
  });

// Tomar una foto (sólo visual, no hace OCR)
snapBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Buscar matrícula
searchBtn.addEventListener('click', () => {
  const matricula = inputMatricula.value.trim().toUpperCase();
  if (!matricula) {
    resultado.innerHTML = "<p style='color:red;'>Introduce una matrícula válida.</p>";
    return;
  }

  const datos = vehiculosDB[matricula];
  if (datos) {
    resultado.innerHTML = `
      <h3>Datos del vehículo:</h3>
      <ul>
        <li><strong>Color:</strong> ${datos.color}</li>
        <li><strong>Bastidor:</strong> ${datos.bastidor}</li>
        <li><strong>Categoría:</strong> ${datos.categoria}</li>
        <li><strong>ITV:</strong> ${datos.itv}</li>
        <li><strong>Última Revisión:</strong> ${datos.ultimaRevision}</li>
      </ul>
    `;
  } else {
    resultado.innerHTML = `<p style="color:red;">No se encontraron datos para la matrícula: ${matricula}</p>`;
  }
});
