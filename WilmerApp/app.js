//pasaremos
$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
//pasaremos
    let listaReclutas = [];

const objRecluta = {
    id: '',
    nombre: '',
    trainer: '',
    identificacion: '',
    edad: '',
    telefono:'',
    email: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const trainerInput = document.querySelector('#trainer');
const identificacionInput = document.querySelector('#identificacion');
const edadInput = document.querySelector('#edad');
const telefonoInput = document.querySelector('#telefono');
const emailInput = document.querySelector('#email');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || trainerInput.value === '' || identificacionInput.value === '' || edadInput.value === '' || telefonoInput.value === '' || emailInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarRecluta();
        editando = false;
    } else {
        objRecluta.id = Date.now();
        objRecluta.nombre = nombreInput.value;
        objRecluta.trainer = trainerInput.value;
        objRecluta.identificacion = identificacionInput.value;
        objRecluta.edad = edadInput.value;
        objRecluta.telefono = telefonoInput.value;
        objRecluta.email = emailInput.value;
        agregarRecluta();
    }
}

function agregarRecluta() {

    listaReclutas.push({...objRecluta});

    mostrarReclutas();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objRecluta.id = '';
    objRecluta.nombre = '';
    objRecluta.trainer = '';
    objRecluta.identificacion = '';
    objRecluta.edad = '';
    objRecluta.telefono = '';
    objRecluta.email = '';
}

function mostrarReclutas() {
    limpiarHTML();

    const divReclutas = document.querySelector('.div-reclutas');
    
    listaReclutas.forEach(recluta => {
        const {id, nombre, trainer, identificacion, edad, telefono, email} = recluta;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${trainer} - ${identificacion} - ${edad} - ${telefono} - ${email} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarRecluta(recluta);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarRecluta(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divReclutas.appendChild(parrafo);
        divReclutas.appendChild(hr);
    });
}

function cargarRecluta(recluta) {
    const {id, nombre, trainer, identificacion, edad, telefono, email} = recluta;

    nombreInput.value = nombre;
    trainerInput.value = trainer;
    identificacionInput.value = identificacion;
    edadInput.value = edad;
    telefonoInput.value = telefono;
    emailInput.value = email;

    objRecluta.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarRecluta() {

    objRecluta.nombre = nombreInput.value;
    objRecluta.trainer = trainerInput.value;
    objRecluta.identificacion = identificacionInput.value;
    objRecluta.edad = edadInput.value;
    objRecluta.telefono = telefonoInput.value;
    objRecluta.email = emailInput.value;


    listaReclutas.map(recluta => {

        if(recluta.id === objRecluta.id) {
            recluta.id = objRecluta.id;
            recluta.nombre = objRecluta.nombre;
            recluta.trainer = objRecluta.trainer;
            recluta.identificacion = objRecluta.identificacion;
            recluta.edad = objRecluta.edad;
            recluta.email = objRecluta.email;
        }

    });

    limpiarHTML();
    mostrarReclutas();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarRecluta(id) {

    listaReclutas = listaReclutas.filter(recluta => recluta.id !== id);

    limpiarHTML();
    mostrarReclutas();
}

function limpiarHTML() {
    const divReclutas = document.querySelector('.div-reclutas');
    while(divReclutas.firstChild) {
        divReclutas.removeChild(divReclutas.firstChild);
    }
} 
