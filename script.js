document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('miFormulario');
  const historial = document.getElementById('miHistorial');

  // Array para almacenar los correos
  const correos = [];

  form.addEventListener('submit', e => {
    e.preventDefault();

    const remitente = document.getElementById('email-remitente').value;
    const destinatario = document.getElementById('email-destinatario').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Añadimos el correo al array
    const nuevoCorreo = { remitente, destinatario, asunto, mensaje };
    correos.push(nuevoCorreo);

    // Función para añadir el correo al historial
    agregarCorreo(nuevoCorreo); 

    form.reset();

    alert('Correo enviado ✅');
  });

  // Creamos el elemento select
  const selectOrden = document.createElement('select');
  selectOrden.classList.add('select');
  selectOrden.innerHTML = `
    <option value="">-- Ordenar por --</option>
    <option value="destinatario">Destinatario</option>
    <option value="asunto">Asunto</option>
  `;
   historial.appendChild(selectOrden); // Lo añadimos debajo de contenedorH2

  // Evento que se dispara cuando se cambia el select
  // Solo se dispara si se ha seleccionado algo (si el value no es "")
  selectOrden.addEventListener('change', () => {
    if (selectOrden.value !== "") {
      ordenarYMostrar(selectOrden.value);
    }
  });

  // Función agregarCorreo
  function agregarCorreo(correo) {
    const superbloque = document.createElement('div');
    superbloque.classList.add('superbloque');

    const nuevoRegistro = document.createElement('div');
    nuevoRegistro.classList.add('emailEnviado');
    nuevoRegistro.innerHTML = `
      <hr>
      <p><strong>De:</strong> ${correo.remitente}</p>
      <p><strong>Para:</strong> ${correo.destinatario}</p>
      <p><strong>Asunto:</strong> ${correo.asunto}</p>
      <p><strong>Mensaje:</strong> ${correo.mensaje}</p>
    `;

    const botonBorrar = document.createElement('button');
    botonBorrar.classList.add('botonBorrar');
    botonBorrar.innerHTML = 'Eliminar email';
    botonBorrar.addEventListener('click', () => {
      const index = correos.indexOf(correo); // Busca el correo en el array
      if (index !== -1) correos.splice(index, 1); // Elimina el correo
      superbloque.remove(); // Elimina este superbloque del historial
    });

    superbloque.appendChild(botonBorrar);
    superbloque.appendChild(nuevoRegistro);
    historial.appendChild(superbloque);
  }

  // Función para ordenar y volver a mostrar el historial completo
  function ordenarYMostrar(criterio) {
    // Limpiar todos los correos (menos el <select>)
    historial.querySelectorAll('.superbloque').forEach(el => el.remove());

    // Crear copia ordenada
    const listaOrdenada = correos.slice().sort((a, b) =>
    a[criterio].localeCompare(b[criterio])
  );

    // Mostrar cada correo ordenado
    listaOrdenada.forEach(correo => agregarCorreo(correo));
  }
});
