// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');




// Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}



// Clases
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    intertarPresupuesto(cantidad){
        // Se extrae valores
        const {presupuesto, restante} = cantidad;

        // Se insertan en HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    mostrarError(mensaje, tipo){
        // Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Agregar mensaje
        divMensaje.textContent = mensaje;

        // Insertar HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

// Instanciar
const ui = new UI();
let presupuesto;

// Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cuál es tu presupuesto?');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.intertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();

    // Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    // Validar
    if (nombre === '' || cantidad === ''){
        ui.mostrarError('Todos los campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.mostrarError('La cantidad ingresada no es válida', 'error');
        return;
    }
}

