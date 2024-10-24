const formulario = document.querySelector('#formulario');
const listaMensajes = document.querySelector('#lista-tweets');
let mensajes = [];
let id = 1;

//Listeners
document.addEventListener('DOMContentLoaded', (e) => {
    mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    id = parseInt(localStorage.getItem('id')) || 1;
    mostrarMensajes();  
});

formulario.addEventListener('submit', agregarMensaje);

// Funciones
function agregarMensaje(e) {
    e.preventDefault();

    const mensaje = document.querySelector('#tweet').value; //textarea

    const mensajeObjeto = {
        id: id, 
        texto: mensaje
    };
    id++
    mensajes = [...mensajes, mensajeObjeto];

    mostrarMensajes();
    actualizarStorage();
    formulario.reset();
}

function mostrarMensajes() {
    limpiarHTML();

    mensajes.forEach(mensaje => {
        const li = document.createElement('li');
        li.textContent = mensaje.texto;

        const botonEliminar = document.createElement('a');
        botonEliminar.classList.add('borrar-tweet');
        botonEliminar.textContent = 'X';
        botonEliminar.onclick = (e) => {
            borrarMensaje(mensaje.id);
        };

        li.appendChild(botonEliminar);
        listaMensajes.appendChild(li);
    });
}

function actualizarStorage() {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    localStorage.setItem('id', id);
}

function borrarMensaje(id) {
    mensajes = mensajes.filter(mensaje => mensaje.id !== id);

    mostrarMensajes();
    actualizarStorage();
}

function limpiarHTML() {
    while (listaMensajes.firstChild) {
        listaMensajes.removeChild(listaMensajes.firstChild);
    }
}

