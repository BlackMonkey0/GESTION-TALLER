document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registroForm = document.getElementById('registroForm');
  const noCuentaLink = document.getElementById('no-cuenta-link');
  const yaTengoCuentaLink = document.getElementById('ya-tengo-cuenta-link');
  const mensajeError = document.getElementById('mensaje-error');
  const mensajeRegistroError = document.getElementById('mensaje-registro-error');

  const rolSelect = document.getElementById('rolSelect'); // Asegúrate de tener un <select id="rolSelect"> en el HTML

  noCuentaLink.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registroForm.classList.remove('hidden');
    limpiarMensajes();
  });

  yaTengoCuentaLink.addEventListener('click', () => {
    registroForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    limpiarMensajes();
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuariosGuardados.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (usuarioExistente) {
      localStorage.setItem('rolUsuario', usuarioExistente.rol); // Guardar rol
      window.location.href = 'index.html';
    } else {
      mensajeError.textContent = 'Usuario o contraseña incorrectos.';
    }
  });

  registroForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nuevoUsuario = document.getElementById('nuevoUsuario').value;
    const nuevaContrasena = document.getElementById('nuevaContrasena').value;
    const rolSeleccionado = rolSelect.value;

    if (nuevaContrasena.length < 8) {
      mensajeRegistroError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuariosGuardados.some(u => u.usuario === nuevoUsuario)) {
      mensajeRegistroError.textContent = 'Este usuario ya existe.';
      return;
    }

    usuariosGuardados.push({
      usuario: nuevoUsuario,
      contrasena: nuevaContrasena,
      rol: rolSeleccionado
    });

    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    registroForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    limpiarMensajes();
    registroForm.reset();
  });

  function limpiarMensajes() {
    mensajeError.textContent = '';
    mensajeRegistroError.textContent = '';
  }
});
