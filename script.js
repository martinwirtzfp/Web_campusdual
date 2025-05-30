// Esperamos a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('miFormulario'); //Seleccionamos el formulario del DOM
  const historial = document.getElementById('miHistorial'); //Seleccionamos el contenedor del historial de correos

  //Añadimos un evento que se dispara cuando se envía el formulario
  form.addEventListener('submit', function (e) {
        e.preventDefault(); //Evitamos que el formulario recargue la página al enviarse
        
        //Obtenemos los valores introducidos por el usuario en cada campo
        const remitente = document.getElementById('email-remitente').value;
        const destinatario = document.getElementById('email-destinatario').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        //Creamos un superbloque al que añadiremos lo que iremos creando
        const superbloque = document.createElement('div');
        superbloque.classList.add('superbloque'); //Creamos una clase para poder aplicarle estilos

        //Creamos un nuevo bloque <div> para representar el "email enviado"
        const nuevoRegistro = document.createElement('div');

        //Le añadimos una clase para poder aplicarle estilos
        nuevoRegistro.classList.add('emailEnviado');

        // Rellenamos ese <div> con el contenido del mensaje
        nuevoRegistro.innerHTML = `
        <hr>
        <p><strong>De:</strong> ${remitente}</p>
        <p><strong>Para:</strong> ${destinatario}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        `;

        //Creamos un boton para poder borrar el mensaje
        const botonBorrar = document.createElement('button');
        botonBorrar.classList.add('botonBorrar');
        botonBorrar.innerHTML = 'Eliminar email';
        botonBorrar.addEventListener('click', function () {
            let elementoABorrar = botonBorrar.parentElement;
            elementoABorrar.remove();
        });
        
        //Añadimos el botón y el email enviado al superbloque
        superbloque.appendChild(botonBorrar);
        superbloque.appendChild(nuevoRegistro);

        //Añadimos el superbloque al contenedor
        historial.appendChild(superbloque);

        //Limpiamos todos los campos del formulario
        form.reset();

        //Mostramos un mensaje para confirmar que se ha enviado
        alert('Correo enviado ✅');
  });
});
