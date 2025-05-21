// === Datos del inventario ===
const inventario = [
  { id: 1, clave: 'aceite', cantidad: 6, unidad: 'litros', minimo: 5, precioUnitario: 5.23 },
  { id: 2, clave: 'filtro_aire', cantidad: 10, unidad: 'unidades', minimo: 5, precioUnitario: 5 },
  { id: 3, clave: 'neumatico', cantidad: 10, unidad: 'unidades', minimo: 4, precioUnitario: 60 },
  { id: 4, clave: 'pastillas_freno', cantidad: 10, unidad: 'juegos', minimo: 4, precioUnitario: 25 }
];

// === Traducciones por idioma ===
const traduccionesJS = {
  es: {
    stock_bajo: 'Stock Bajo',
    stock_ok: 'Stock OK',
    alerta_asunto: '⚠️ Alerta: hay {n} producto(s) con stock bajo:\n\n{lista}',
    articulos: {
      aceite: 'Aceite 10W40',
      filtro_aire: 'Filtro de aire',
      neumatico: 'Neumático 205/55R16',
      pastillas_freno: 'Pastillas de freno'
    },
    categorias: {
      aceite: 'Lubricantes',
      filtro_aire: 'Filtros',
      neumatico: 'Neumáticos',
      pastillas_freno: 'Frenos'
    },
    unidades: {
      litros: 'Litros',
      unidades: 'Unidades',
      juegos: 'Juegos'
    },
    encabezados: ['ID', 'Artículo', 'Categoría', 'Cantidad', 'Unidad', 'Mínimo', 'Estado', 'Precio Unit.', 'Precio Total'],
    total: 'Total Inventario (€):',
    descargar: '📄 Descargar PDF'
  },
  en: {
    stock_bajo: 'Low Stock',
    stock_ok: 'Stock OK',
    alerta_asunto: '⚠️ Alert: there are {n} item(s) with low stock:\n\n{lista}',
    articulos: {
      aceite: 'Oil 10W40',
      filtro_aire: 'Air Filter',
      neumatico: 'Tire 205/55R16',
      pastillas_freno: 'Brake Pads'
    },
    categorias: {
      aceite: 'Lubricants',
      filtro_aire: 'Filters',
      neumatico: 'Tires',
      pastillas_freno: 'Brakes'
    },
    unidades: {
      litros: 'Liters',
      unidades: 'Units',
      juegos: 'Sets'
    },
    encabezados: ['ID', 'Item', 'Category', 'Qty', 'Unit', 'Min', 'Status', 'Unit Price', 'Total Price'],
    total: 'Total Inventory (€):',
    descargar: '📄 Download PDF'
  },
  it: {
    stock_bajo: 'Scorta Bassa',
    stock_ok: 'Stock OK',
    alerta_asunto: '⚠️ Avviso: ci sono {n} articolo/i con scorta bassa:\n\n{lista}',
    articulos: {
      aceite: 'Olio 10W40',
      filtro_aire: 'Filtro aria',
      neumatico: 'Pneumatico 205/55R16',
      pastillas_freno: 'Pasticche freno'
    },
    categorias: {
      aceite: 'Lubrificanti',
      filtro_aire: 'Filtri',
      neumatico: 'Pneumatici',
      pastillas_freno: 'Freni'
    },
    unidades: {
      litros: 'Litri',
      unidades: 'Unità',
      juegos: 'Set'
    },
    encabezados: ['ID', 'Articolo', 'Categoria', 'Quantità', 'Unità', 'Minimo', 'Stato', 'Prezzo Unit.', 'Prezzo Totale'],
    total: 'Totale Inventario (€):',
    descargar: '📄 Scarica PDF'
  }
};

// === Obtener idioma y traducciones ===
const idioma = localStorage.getItem("idiomaSeleccionado") || "es";
const t = traduccionesJS[idioma];

// === Ordenar inventario: stock bajo primero ===
inventario.sort((a, b) => (b.cantidad < b.minimo) - (a.cantidad < a.minimo));

// === Referencias al DOM ===
const tbody = document.querySelector('#tabla-inventario tbody');
const totalInventarioTd = document.querySelector('#total-inventario');
const contenedor = document.querySelector('.contenedor');

let totalInventario = 0;

// === Mostrar inventario en la tabla ===
inventario.forEach(item => {
  const clave = item.clave;
  const tr = document.createElement('tr');

  const nombre = t.articulos[clave];
  const categoria = t.categorias[clave];
  const unidad = t.unidades[item.unidad];
  const esBajo = item.cantidad < item.minimo;

  const estado = esBajo ? t.stock_bajo : t.stock_ok;
  const claseEstado = esBajo ? 'estado-bajo' : 'estado-ok';
  const precioTotal = item.precioUnitario * item.cantidad;
  totalInventario += precioTotal;

  tr.innerHTML = `
    <td>${item.id}</td>
    <td>${nombre}</td>
    <td>${categoria}</td>
    <td>${item.cantidad}</td>
    <td>${unidad}</td>
    <td>${item.minimo}</td>
    <td class="${claseEstado}">${estado}</td>
    <td>${item.precioUnitario.toFixed(2)} €</td>
    <td>${precioTotal.toFixed(2)} €</td>
  `;

  tbody.appendChild(tr);
});

// === Mostrar total ===
totalInventarioTd.textContent = `${totalInventario.toFixed(2)} €`;

// === Detectar stock bajo y enviar alerta ===
const productosBajoStock = inventario.filter(i => i.cantidad < i.minimo);

if (productosBajoStock.length > 0) {
  const lista = productosBajoStock.map(p =>
    `• ${t.articulos[p.clave]} (${p.cantidad}/${p.minimo})`).join('\n');

  const mensaje = t.alerta_asunto
    .replace('{n}', productosBajoStock.length)
    .replace('{lista}', lista);

  emailjs.send("default_service", "template_tyx9d9q", {
    mensaje: mensaje
  }).then(() => {
    console.log("Correo enviado correctamente.");
  }).catch((error) => {
    console.error("Error al enviar el correo:", error);
  });
}

// === Crear botón PDF ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement('button');
  btn.textContent = t.descargar;
  btn.id = 'btn-descargar-pdf';

  Object.assign(btn.style, {
    margin: '20px auto',
    display: 'block',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  contenedor?.prepend(btn);

  btn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const body = inventario.map(item => {
      const clave = item.clave;
      return [
        item.id,
        t.articulos[clave],
        t.categorias[clave],
        item.cantidad,
        t.unidades[item.unidad],
        item.minimo,
        item.cantidad < item.minimo ? t.stock_bajo : t.stock_ok,
        item.precioUnitario.toFixed(2),
        (item.precioUnitario * item.cantidad).toFixed(2)
      ];
    });

    doc.text("Inventario", 14, 15);
    doc.autoTable({
      head: [t.encabezados],
      body: body,
      startY: 20,
      styles: { fontSize: 10, halign: 'center' },
      headStyles: { fillColor: [52, 152, 219] }
    });

    doc.text(`${t.total} ${totalInventario.toFixed(2)} €`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("inventario.pdf");
  });
});
