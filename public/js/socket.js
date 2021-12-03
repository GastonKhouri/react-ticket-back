const socket = io();

// Referencias a elementos del dom
const formulario = document.querySelector('#miFormulario');
const mensajes = document.querySelector('#misMensajes');
const txtMensaje = document.querySelector('#txtMensaje');

formulario.addEventListener( 'submit', ( e ) => {

    e.preventDefault();

    const texto = txtMensaje.value;

    socket.emit('msg-to-server', {
        texto
    })

    txtMensaje.value = '';

})

socket.on('msg-from-server', ({ texto }) => {

    mensajes.innerHTML += `<li> ${ texto } </li>`  

})