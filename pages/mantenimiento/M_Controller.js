document.addEventListener('DOMContentLoaded', () => {
    setupMantenimientoEventListeners();
    setupClientesFormEventListeners();
    setupCursosFormEventListeners();
    setupMaquinasFormEventListeners();
    setupRutinasFormEventListeners();
    setupInstructoresFormEventListeners();
});

function setupMantenimientoEventListeners() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase 'active' de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Ocultar todo el contenido de las pestañas
            tabContents.forEach(content => content.style.display = 'none');
            // Agregar clase 'active' al botón clickeado
            button.classList.add('active');
            // Mostrar el contenido correspondiente
            const target = document.getElementById(button.getAttribute('data-target'));
            target.style.display = 'block';
        });
    });
}

//Formulario clientes
function setupClientesFormEventListeners() {
    const clientesPopup = document.getElementById('cliente-popup');
    const clienteAddBtn = document.getElementById('addClientBtn');
    const clienteCloseBtn = document.getElementById("closeCliente");
    const clienteSendBtn = document.getElementById("createCliente");
    const clientesUpadateBtn = document.getElementById('updateCliente');

    // Abrir form
    clienteAddBtn.addEventListener("click", () => {
        clientesPopup.style.display = "flex";
    });
    // Cerrar form
    clienteCloseBtn.addEventListener("click", () => {
        clientesPopup.style.display = "none";
        //Volver a los botones a la normalidad
        clienteSendBtn.style.display = 'block';
        clientesUpadateBtn.style.display = 'none';
        cleanClientesFields();
    });
    // Cerrar al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target == clientesPopup) {
            clientesPopup.style.display = 'none';
        }
    }

    clienteSendBtn.addEventListener("click", createCliente);
    clientesUpadateBtn.addEventListener("click", updateCliente);
}

async function getClientes() {
    try {
        const response = await fetch('/api/get-clientes');
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        const data = await response.json();
        clientes.push(...data);  // Añadir los datos recibidos al array clientes
        console.log('Clientes cargados:', clientes);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createCliente() {
    // Obtener los valores del formulario
    const cedulaInput = document.getElementById('clienteCedula');
    const nombreInput = document.getElementById('clienteNombre');
    const primerApellidoInput = document.getElementById('clientePrimerApellido');
    const segundoApellidoInput = document.getElementById('clienteSegundoApellido');
    const direccionInput = document.getElementById('clienteDirección');
    const emailInput = document.getElementById('clienteEmail');
    const inscripcionInput = document.getElementById('clienteInscripcion');

    // Obtener valores de los campos
    const cedula = cedulaInput.value.trim();
    const nombre = nombreInput.value.trim();
    const primerApellido = primerApellidoInput.value.trim();
    const segundoApellido = segundoApellidoInput.value.trim();
    const direccion = direccionInput.value.trim();
    const email = emailInput.value.trim();
    const inscripcion = inscripcionInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [cedulaInput, nombreInput, primerApellidoInput, segundoApellidoInput, direccionInput, emailInput, inscripcionInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!cedula) cedulaInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!primerApellido) primerApellidoInput.classList.add("error"), hasError = true;
    if (!segundoApellido) segundoApellidoInput.classList.add("error"), hasError = true;
    if (!direccion) direccionInput.classList.add("error"), hasError = true;
    if (!email) emailInput.classList.add("error"), hasError = true;
    if (!inscripcion) inscripcionInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto cliente
    const cliente = {
        cedula,
        nombre,
        primerApellido,
        segundoApellido,
        direccion,
        email,
        inscripcion
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/create-cliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Cliente creado correctamente');

        // Ocultar el popup
        document.getElementById('cliente-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanClientesFields();

        // Recargar la lista de clientes
        await getClientes();

        displayClientes(clientes, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function updateCliente() {
    // Obtener los valores del formulario
    const cedulaInput = document.getElementById('clienteCedula');
    const nombreInput = document.getElementById('clienteNombre');
    const primerApellidoInput = document.getElementById('clientePrimerApellido');
    const segundoApellidoInput = document.getElementById('clienteSegundoApellido');
    const direccionInput = document.getElementById('clienteDirección');
    const emailInput = document.getElementById('clienteEmail');
    const inscripcionInput = document.getElementById('clienteInscripcion');

    // Obtener valores de los campos
    const cedula = cedulaInput.value.trim();
    const nombre = nombreInput.value.trim();
    const primerApellido = primerApellidoInput.value.trim();
    const segundoApellido = segundoApellidoInput.value.trim();
    const direccion = direccionInput.value.trim();
    const email = emailInput.value.trim();
    const inscripcion = inscripcionInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [cedulaInput, nombreInput, primerApellidoInput, segundoApellidoInput, direccionInput, emailInput, inscripcionInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!cedula) cedulaInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!primerApellido) primerApellidoInput.classList.add("error"), hasError = true;
    if (!segundoApellido) segundoApellidoInput.classList.add("error"), hasError = true;
    if (!direccion) direccionInput.classList.add("error"), hasError = true;
    if (!email) emailInput.classList.add("error"), hasError = true;
    if (!inscripcion) inscripcionInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto cliente
    const cliente = {
        cedula,
        nombre,
        primerApellido,
        segundoApellido,
        direccion,
        email,
        inscripcion
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/update-cliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Cliente actualizado correctamente');

        // Ocultar el popup
        document.getElementById('cliente-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanClientesFields();

        // Recargar la lista de clientes
        await getClientes();

        displayClientes(clientes, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function deleteCliente(cliente) {
    console.log("eliminando el cliente " + cliente.cedula);
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar al cliente con cédula ${cliente.cedula}?`);
    if (!confirmDelete) {
        return;
    }

    try {
        const request = new Request(`/api/delete-cliente/${cliente.cedula}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw response;
        }

        const data = await response.json();
        alert('Cliente eliminado correctamente');

        await getClientes();
        displayClientes(clientes, currentPage);

    } catch (error) {
        if (error instanceof Response) {
            let errorMessage = "Error desconocido";
            switch (error.status) {
                case 404:
                    errorMessage = "Cliente no encontrado";
                    break;
                case 500:
                    errorMessage = "Error interno del servidor";
                    break;
            }
            alert(errorMessage);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

function cleanClientesFields() {
    const inputIds = ['clienteCedula', 'clienteNombre', 'clientePrimerApellido', 'clienteSegundoApellido', 'clienteDirección', 'clienteEmail', 'clienteInscripcion'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            input.classList.remove("error");
        }
    });
}

//Formulario cursos
function setupCursosFormEventListeners() {
    const cursoPopup = document.getElementById('curso-popup');
    const cursoAddBtn = document.getElementById('addCursoBtn');
    const cursoCloseBtn = document.getElementById("closeCurso");
    const cursoSendBtn = document.getElementById("createCurso");
    const cursoUpdateBtn = document.getElementById('updateCurso');

    // Abrir form
    cursoAddBtn.addEventListener("click", () => {
        cursoPopup.style.display = "flex";
        //Volver a los botones a la normalidad
        cursoSendBtn.style.display = 'block';
        cursoUpdateBtn.style.display = 'none';
        cleanCursosFields();
    });
    // Cerrar form
    cursoCloseBtn.addEventListener("click", () => {
        cursoPopup.style.display = "none";
    });
    // Cerrar al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target == cursoPopup) {
            cursoPopup.style.display = 'none';
        }
    }
    cursoSendBtn.addEventListener("click", createCurso);
    cursoUpdateBtn.addEventListener("click", updateCurso);
}

async function getCursos() {
    try {
        const response = await fetch('/api/get-cursos');
        if (!response.ok) {
            throw new Error('Error al obtener los cursos');
        }
        const data = await response.json();
        cursos.push(...data);  // Añadir los datos recibidos al array cursos
        console.log('Cursos cargados:', cursos);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createCurso() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('cursoId');
    const nombreInput = document.getElementById('cursoNombre');
    const horarioInput = document.getElementById('cursoHorario');
    const disponibilidadInput = document.getElementById('cursoDisponibilidad');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const nombre = nombreInput.value.trim();
    const horario = horarioInput.value.trim();
    const disponibilidad = disponibilidadInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, nombreInput, horarioInput, disponibilidadInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!horario) horarioInput.classList.add("error"), hasError = true;
    if (!disponibilidad) disponibilidadInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto curso
    const curso = {
        id,
        nombre,
        horario,
        disponibilidad
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/create-curso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(curso)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Curso creado correctamente');

        // Ocultar el popup
        document.getElementById('curso-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanCursosFields();

        // Recargar la lista de clientes
        await getCursos();

        displayCursos(cursos, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function updateCurso() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('cursoId');
    const nombreInput = document.getElementById('cursoNombre');
    const horarioInput = document.getElementById('cursoHorario');
    const disponibilidadInput = document.getElementById('cursoDisponibilidad');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const nombre = nombreInput.value.trim();
    const horario = horarioInput.value.trim();
    const disponibilidad = disponibilidadInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, nombreInput, horarioInput, disponibilidadInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!horario) horarioInput.classList.add("error"), hasError = true;
    if (!disponibilidad) disponibilidadInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto curso
    const curso = {
        id,
        nombre,
        horario,
        disponibilidad
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/udate-curso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(curso)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Curso actualizado correctamente');

        // Ocultar el popup
        document.getElementById('curso-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanCursosFields();

        // Recargar la lista de clientes
        await getCursos();

        displayCursos(cursos, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

function deleteCurso(curso) {
    console.log("eliminando el curso " + curso.id);
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar al curso con el ID ${curso.id}?`);
    if (!confirmDelete) {
        return;
    }

    // Realizar la solicitud DELETE al servidor
    const request = new Request(`/api/delete-curso/${curso.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    fetch(request)
        .then(response => {
            if (!response.ok) {
                throw response; // Lanza la respuesta para manejar el error en el bloque catch
            }
            return response.json();
        })
        .then(data => {
            alert('Curso eliminado correctamente');
            getCursos();
            displayCursos(cursos, currentPage);
        })
        .catch(error => {
            if (error instanceof Response) {
                let errorMessage = "Error desconocido";
                switch (error.status) {
                    case 404:
                        errorMessage = "Curso no encontrado";
                        break;
                    case 500:
                        errorMessage = "Error interno del servidor";
                        break;
                }
                alert(errorMessage); // Mostrar mensaje de error
            } else {
                console.error('Error:', error);
                alert("Error desconocido");
            }
        });
}

function cleanCursosFields() {
    const inputIds = ['cursoId', 'cursoNombre', 'cursoHorario', 'cursoDisponibilidad'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            input.classList.remove("error");
        }
    });
}

//Formulario maquinas
function setupMaquinasFormEventListeners() {
    const maquinaPopup = document.getElementById('maquina-popup');
    const maquinaAddBtn = document.getElementById('addMaquinaBtn');
    const maquinaCloseBtn = document.getElementById("closeMaquina");
    const maquinaSendBtn = document.getElementById("createMaquina");
    const maquinaUpdateBtn = document.getElementById("updateMaquina");

    // Abrir form
    maquinaAddBtn.addEventListener("click", () => {
        maquinaPopup.style.display = "flex";
        //Volver a los botones a la normalidad
        maquinaSendBtn.style.display = 'block';
        maquinaUpdateBtn.style.display = 'none';
        cleanMaquinasFields();
    });
    // Cerrar form
    maquinaCloseBtn.addEventListener("click", () => {
        maquinaPopup.style.display = "none";
    });
    // Cerrar al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target == maquinaPopup) {
            maquinaPopup.style.display = 'none';
        }
    }
    maquinaSendBtn.addEventListener("click", createMaquina);
    maquinaUpdateBtn.addEventListener("click", updateMaquina);
}

async function getMaquinas() {
    try {
        const response = await fetch('/api/get-maquinas');
        if (!response.ok) {
            throw new Error('Error al obtener las máquinas');
        }
        const data = await response.json();
        maquinas.push(...data);  // Añadir los datos recibidos al array maquinas
        console.log('Máquinas cargadas:', maquinas);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createMaquina() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('maquinaId');
    const descripcionInput = document.getElementById('maquinaDescripcion');
    const estadoInput = document.getElementById('maquinaEstado');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const estado = estadoInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, descripcionInput, estadoInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!descripcion) descripcionInput.classList.add("error"), hasError = true;
    if (!estado) estadoInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto máquina
    const maquina = {
        id,
        descripcion,
        estado
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/create-maquina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(maquina)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Maquina creada correctamente');

        // Ocultar el popup
        document.getElementById('maquina-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanMaquinasFields();

        // Recargar la lista de clientes
        await getMaquinas();

        displayMaquinas(maquinas, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function updateMaquina() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('maquinaId');
    const descripcionInput = document.getElementById('maquinaDescripcion');
    const estadoInput = document.getElementById('maquinaEstado');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const estado = estadoInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, descripcionInput, estadoInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!descripcion) descripcionInput.classList.add("error"), hasError = true;
    if (!estado) estadoInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto máquina
    const maquina = {
        id,
        descripcion,
        estado
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/update-maquina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(maquina)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Maquina actualizada correctamente');

        // Ocultar el popup
        document.getElementById('maquina-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanMaquinasFields();

        // Recargar la lista de clientes
        await getMaquinas();

        displayMaquinas(maquinas, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

function deleteMaquina(maquina) {
    console.log("eliminando maquina" + maquina.id);
    // Confirmar la eliminación
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar la maquina con ID ${maquina.id}?`);
    if (!confirmDelete) {
        return;
    }

    // Realizar la solicitud DELETE al servidor
    const request = new Request(`/api/delete-maquina/${maquina.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    fetch(request)
        .then(response => {
            if (!response.ok) {
                throw response; // Lanza la respuesta para manejar el error en el bloque catch
            }
            return response.json();
        })
        .then(data => {
            alert('Maquina eliminada correctamente');
            getMaquinas
            displayMaquinas(maquinas, currentPage);
        })
        .catch(error => {
            if (error instanceof Response) {
                let errorMessage = "Error desconocido";
                switch (error.status) {
                    case 404:
                        errorMessage = "Maquina no encontrado";
                        break;
                    case 500:
                        errorMessage = "Error interno del servidor";
                        break;
                }
                alert(errorMessage); // Mostrar mensaje de error
            } else {
                console.error('Error:', error);
                alert("Error desconocido");
            }
        });
}

function cleanMaquinasFields() {
    const inputIds = ['maquinaId', 'maquinaDescripcion', 'maquinaEstado'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            input.classList.remove("error");
        }
    });
}

//Formulario rutinas
function setupRutinasFormEventListeners() {
    const rutinaPopup = document.getElementById('rutina-popup');
    const rutinaAddBtn = document.getElementById('addRutinaBtn');
    const rutinaCloseBtn = document.getElementById("closeRutina");
    const rutinaSendBtn = document.getElementById("createRutina");
    const rutinaUpdateBtn = document.getElementById("updateRutina");
    // Abrir form
    rutinaAddBtn.addEventListener("click", () => {
        rutinaPopup.style.display = "flex";
        //Volver a los botones a la normalidad
        rutinaSendBtn.style.display = 'block';
        rutinaUpdateBtn.style.display = 'none';
        cleanRutinaFields();
    });
    // Cerrar form
    rutinaCloseBtn.addEventListener("click", () => {
        rutinaPopup.style.display = "none";
    });
    // Cerrar al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target == rutinaPopup) {
            rutinaPopup.style.display = 'none';
        }
    }
    rutinaSendBtn.addEventListener("click", createRutina);
}

async function getRutinas() {
    try {
        const response = await fetch('/api/get-rutinas');
        if (!response.ok) {
            throw new Error('Error al obtener las rutinas');
        }
        const data = await response.json();
        rutinas.push(...data);  // Añadir los datos recibidos al array rutinas
        console.log('Rutinas cargadas:', rutinas);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createRutina() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('rutinaId');
    const clienteIdInput = document.getElementById('rutinaClienteId');
    const instructorIdInput = document.getElementById('rutinaInstructorId');
    const maquinaInput = document.getElementById('rutinaMaquina');
    const fechaInput = document.getElementById('rutinaFecha');
    const horaInput = document.getElementById('rutinaHora');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const clienteId = clienteIdInput.value.trim();
    const instructorId = instructorIdInput.value.trim();
    const maquina = maquinaInput.value.trim();
    const fecha = fechaInput.value.trim();
    const hora = horaInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, clienteIdInput, instructorIdInput, maquinaInput, fechaInput, horaInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!clienteId) clienteIdInput.classList.add("error"), hasError = true;
    if (!instructorId) instructorIdInput.classList.add("error"), hasError = true;
    if (!maquina) maquinaInput.classList.add("error"), hasError = true;
    if (!fecha) fechaInput.classList.add("error"), hasError = true;
    if (!hora) horaInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto rutina
    const rutina = {
        id,
        clienteId,
        instructorId,
        maquina,
        fecha,
        hora
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/create-rutina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rutina)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Rutina creada correctamente');

        // Ocultar el popup
        document.getElementById('rutina-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanRutinaFields();

        // Recargar la lista de clientes
        await getRutinas();

        displayRutinas(rutinas, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function updateRutina() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('rutinaId');
    const clienteIdInput = document.getElementById('rutinaClienteId');
    const instructorIdInput = document.getElementById('rutinaInstructorId');
    const maquinaInput = document.getElementById('rutinaMaquina');
    const fechaInput = document.getElementById('rutinaFecha');
    const horaInput = document.getElementById('rutinaHora');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const clienteId = clienteIdInput.value.trim();
    const instructorId = instructorIdInput.value.trim();
    const maquina = maquinaInput.value.trim();
    const fecha = fechaInput.value.trim();
    const hora = horaInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, clienteIdInput, instructorIdInput, maquinaInput, fechaInput, horaInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!clienteId) clienteIdInput.classList.add("error"), hasError = true;
    if (!instructorId) instructorIdInput.classList.add("error"), hasError = true;
    if (!maquina) maquinaInput.classList.add("error"), hasError = true;
    if (!fecha) fechaInput.classList.add("error"), hasError = true;
    if (!hora) horaInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto rutina
    const rutina = {
        id,
        clienteId,
        instructorId,
        maquina,
        fecha,
        hora
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/update-rutina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rutina)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Rutina actualizada correctamente');

        // Ocultar el popup
        document.getElementById('rutina-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanRutinaFields();

        // Recargar la lista de clientes
        await getRutinas();

        displayRutinas(rutinas, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

function deleteRutina(rutina) {
    console.log("eliminando la rutina" + rutina.id);
    // Confirmar la eliminación
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar la rutina con ID ${rutina.id}?`);
    if (!confirmDelete) {
        return;
    }

    // Realizar la solicitud DELETE al servidor
    const request = new Request(`/api/delete-rutina/${rutina.id}`, { // Cambiar la URL por la correcta
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    fetch(request)
        .then(response => {
            if (!response.ok) {
                throw response; // Lanza la respuesta para manejar el error en el bloque catch
            }
            return response.json();
        })
        .then(data => {
            alert('Rutina eliminada correctamente');
            getRutinas();
            displayRutinas(rutinas, currentPage);
        })
        .catch(error => {
            if (error instanceof Response) {
                let errorMessage = "Error desconocido";
                switch (error.status) {
                    case 404:
                        errorMessage = "Rutina no encontrado";
                        break;
                    case 500:
                        errorMessage = "Error interno del servidor";
                        break;
                }
                alert(errorMessage);
            } else {
                console.error('Error:', error);
                alert("Error desconocido");
            }
        });
}

function cleanRutinaFields() {
    const inputIds = ['rutinaId', 'rutinaClienteId', 'rutinaInstructorId', 'rutinaMaquina', 'rutinaFecha', 'rutinaHora'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            input.classList.remove("error");
        }
    });
}

//Formulario instructores
function setupInstructoresFormEventListeners() {
    const instructorPopup = document.getElementById('instructor-popup');
    const instructorAddBtn = document.getElementById('addInstructorBtn');
    const instructorCloseBtn = document.getElementById("closeInstructor");
    const instructorSendBtn = document.getElementById("createInstructor");
    const instructorUpdateBtn = document.getElementById("updateInstructor");

    // Abrir form
    instructorAddBtn.addEventListener("click", () => {
        instructorPopup.style.display = "flex";
        //Volver a los botones a la normalidad
        instructorSendBtn.style.display = 'block';
        instructorUpdateBtn.style.display = 'none';
        cleanInstructoresFields();
    });
    // Cerrar form
    instructorCloseBtn.addEventListener("click", () => {
        instructorPopup.style.display = "none";
    });
    // Cerrar al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target == instructorPopup) {
            instructorPopup.style.display = 'none';
        }
    }
    instructorSendBtn.addEventListener("click", createInstructor);
}

async function getInstructores() {
    try {
        const response = await fetch('/api/get-instructores');
        if (!response.ok) {
            throw new Error('Error al obtener los instructores');
        }
        const data = await response.json();
        instructores.push(...data);  // Añadir los datos recibidos al array instructores
        console.log('Instructores cargados:', instructores);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createInstructor() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('instructorId');
    const nombreInput = document.getElementById('instructorNombre');
    const emailInput = document.getElementById('instructorEmail');
    const telefonoInput = document.getElementById('instructorTelefono');
    const fechaInput = document.getElementById('instructorFechaContratacion');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const fechaContratacion = fechaInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, nombreInput, emailInput, telefonoInput, fechaInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!email) emailInput.classList.add("error"), hasError = true;
    if (!telefono) telefonoInput.classList.add("error"), hasError = true;
    if (!fechaContratacion) fechaInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto instructor
    const instructor = {
        id,
        nombre,
        email,
        telefono,
        fechaContratacion
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/create-instructor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instructor)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Instructor creado correctamente');

        // Ocultar el popup
        document.getElementById('instructor-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanInstructoresFields();

        // Recargar la lista de clientes
        await getInstructores();

        displayInstructores(instructores, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

async function updateInstructor() {
    // Obtener los valores del formulario
    const idInput = document.getElementById('instructorId');
    const nombreInput = document.getElementById('instructorNombre');
    const emailInput = document.getElementById('instructorEmail');
    const telefonoInput = document.getElementById('instructorTelefono');
    const fechaInput = document.getElementById('instructorFechaContratacion');

    // Obtener valores de los campos
    const id = idInput.value.trim();
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const fechaContratacion = fechaInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    const inputs = [idInput, nombreInput, emailInput, telefonoInput, fechaInput];
    inputs.forEach(input => input.classList.remove('error'));

    // Validar si los campos están vacíos
    if (!id) idInput.classList.add("error"), hasError = true;
    if (!nombre) nombreInput.classList.add("error"), hasError = true;
    if (!email) emailInput.classList.add("error"), hasError = true;
    if (!telefono) telefonoInput.classList.add("error"), hasError = true;
    if (!fechaContratacion) fechaInput.classList.add("error"), hasError = true;

    // Si hay errores, detener la ejecución
    if (hasError) return;

    // Crear el objeto instructor
    const instructor = {
        id,
        nombre,
        email,
        telefono,
        fechaContratacion
    };

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('/api/update-instructor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instructor)
        });

        if (!response.ok) {
            throw response; // Lanza la respuesta para manejar el error en el bloque catch
        }

        const data = await response.json();
        alert('Instructor actualizado correctamente');

        // Ocultar el popup
        document.getElementById('instructor-popup').style.display = 'none';

        // Limpiar los campos del formulario
        cleanInstructoresFields();

        // Recargar la lista de clientes
        await getInstructores();

        displayInstructores(instructores, currentPage);
    } catch (error) {
        if (error instanceof Response) {
            const errorMessage = await error.text(); // Leer el cuerpo de la respuesta
            alert(`Error: ${errorMessage}`);
        } else {
            console.error('Error:', error);
            alert("Error desconocido");
        }
    }
}

function deleteInstructor(instructor) {
    console.log("eliminando el instructor" + instructor.id);
    // Confirmar la eliminación
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar al instructor con id ${instructor.id}?`);
    if (!confirmDelete) {
        return;
    }

    // Realizar la solicitud DELETE al servidor
    const request = new Request(`/api/delete-instructor/${instructor.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    fetch(request)
        .then(response => {
            if (!response.ok) {
                throw response; // Lanza la respuesta para manejar el error en el bloque catch
            }
            return response.json();
        })
        .then(data => {
            alert('Instructor eliminado correctamente');
            getInstuctores();
            displayInstructores(instructores, currentPage);
        })
        .catch(error => {
            if (error instanceof Response) {
                let errorMessage = "Error desconocido";
                switch (error.status) {
                    case 404:
                        errorMessage = "Instructor no encontrado";
                        break;
                    case 500:
                        errorMessage = "Error interno del servidor";
                        break;
                }
                alert(errorMessage); // Mostrar mensaje de error
            } else {
                console.error('Error:', error);
                alert("Error desconocido");
            }
        });
}

function cleanInstructoresFields() {
    const inputIds = ['instructorId', 'instructorNombre', 'instructorEmail', 'instructorTelefono', 'instructorFechaContratacion'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            input.classList.remove("error");
        }
    });
}