// Variables para la paginación
let currentPage = 1;
const rowsPerPage = 5;

// Funciones para clientes
// Datos de clientes (simulados)
const clientes = [
    { cedula: "101010101", nombre: "Carlos", primerApellido: "Pérez", segundoApellido: "Ramírez", direccion: "Calle 1, San José", email: "carlos.perez@example.com", fechaInscripcion: "2023-01-15" },
    { cedula: "202020202", nombre: "María", primerApellido: "Gómez", segundoApellido: "Sánchez", direccion: "Avenida 10, Alajuela", email: "maria.gomez@example.com", fechaInscripcion: "2023-02-20" },
    { cedula: "303030303", nombre: "José", primerApellido: "Rodríguez", segundoApellido: "Vargas", direccion: "Calle 12, Cartago", email: "jose.rodriguez@example.com", fechaInscripcion: "2023-03-18" },
    { cedula: "404040404", nombre: "Ana", primerApellido: "Jiménez", segundoApellido: "Morales", direccion: "Avenida 4, Heredia", email: "ana.jimenez@example.com", fechaInscripcion: "2023-04-10" },
    { cedula: "505050505", nombre: "Luis", primerApellido: "Fernández", segundoApellido: "Cordero", direccion: "Calle 8, Guanacaste", email: "luis.fernandez@example.com", fechaInscripcion: "2023-05-22" },
    { cedula: "606060606", nombre: "Laura", primerApellido: "Salazar", segundoApellido: "Torres", direccion: "Avenida 9, Puntarenas", email: "laura.salazar@example.com", fechaInscripcion: "2023-06-05" },
    { cedula: "707070707", nombre: "Jorge", primerApellido: "Mendoza", segundoApellido: "León", direccion: "Calle 3, Limón", email: "jorge.mendoza@example.com", fechaInscripcion: "2023-07-19" },
    { cedula: "808080808", nombre: "Sofía", primerApellido: "Cruz", segundoApellido: "Campos", direccion: "Avenida 7, San José", email: "sofia.cruz@example.com", fechaInscripcion: "2023-08-23" },
    { cedula: "909090909", nombre: "Ricardo", primerApellido: "Rojas", segundoApellido: "Castillo", direccion: "Calle 5, Alajuela", email: "ricardo.rojas@example.com", fechaInscripcion: "2023-09-12" },
    { cedula: "1010101010", nombre: "Gabriela", primerApellido: "Ortiz", segundoApellido: "López", direccion: "Avenida 6, Cartago", email: "gabriela.ortiz@example.com", fechaInscripcion: "2023-10-03" }
];

// Elementos del DOM
const ClTableBody = document.querySelector("#clientes-table tbody");
const ClSearchInput = document.getElementById("searchCliente");
const ClPrevBtn = document.getElementById("Cl-prev-btn");
const ClNextBtn = document.getElementById("Cl-next-btn");
const ClPageInfo = document.getElementById("Cl-page-info");

document.addEventListener('DOMContentLoaded', async () => {
    setupClientesEventListeners();
    setupCursosEventListeners();
    setupMaquinasEventListeners();
    setupRutinasEventListeners();
    setupInstructorEventListeners();
});

function setupClientesEventListeners() {
    //Request al servidor para la lista de clientes.
    //getClientes();
    // Evento de búsqueda
    ClSearchInput.addEventListener("input", searchClientes);

    // Manejo de paginación
    ClPrevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayClientes(clientes, currentPage);
        }
    });

    ClNextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(clientes.length / rowsPerPage)) {
            currentPage++;
            displayClientes(clientes, currentPage);
        }
    });

    // Mostrar la primera página al cargar
    displayClientes(clientes, currentPage);
}

// Función para mostrar los clientes en la tabla
function displayClientes(clientes, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedClientes = clientes.slice(start, end);

    ClTableBody.innerHTML = "";

    paginatedClientes.forEach((cliente) => {
        const row = `
            <tr>
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.primerApellido}</td>
                <td>${cliente.segundoApellido}</td>
                <td>${cliente.direccion}</td>
                <td>${cliente.email}</td>
                <td>${cliente.fechaInscripcion}</td>
                <td><button class="update-clientes-btn" data-cedula="${cliente.cedula}">Update</button></td>
                <td><button class="delete-clientes-btn" data-cedula="${cliente.cedula}">Delete</button></td>
            </tr>
        `;
        ClTableBody.innerHTML += row;
    });

    // Asignar eventos después
    document.querySelectorAll('.update-clientes-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const cedula = event.target.getAttribute('data-cedula');
            const cliente = paginatedClientes.find(c => c.cedula === cedula);
            showUpdateCliente(cliente);
        });
    });

    document.querySelectorAll('.delete-clientes-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const cedula = event.target.getAttribute('data-cedula');
            const cliente = paginatedClientes.find(c => c.cedula === cedula);
            deleteCliente(cliente);
        });
    });

    // Actualizar información de la paginación
    ClPageInfo.textContent = `Página ${page} de ${Math.ceil(clientes.length / rowsPerPage)}`;
}


// Función para manejar la búsqueda
function searchClientes() {
    const searchTerm = ClSearchInput.value.toLowerCase();
    const filteredClientes = clientes.filter(cliente =>
        cliente.cedula.includes(searchTerm) || cliente.nombre.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reiniciar la página al buscar
    displayClientes(filteredClientes, currentPage);
}

function showUpdateCliente(cliente) {
    const clientesPopup = document.getElementById('cliente-popup');
    clientesPopup.style.display = "flex";

    // Rellenar los campos del formulario con los datos del cliente
    document.getElementById('clienteCedula').value = cliente.cedula;
    document.getElementById('clienteNombre').value = cliente.nombre;
    document.getElementById('clientePrimerApellido').value = cliente.primerApellido;
    document.getElementById('clienteSegundoApellido').value = cliente.segundoApellido;
    document.getElementById('clienteDirección').value = cliente.direccion;
    document.getElementById('clienteEmail').value = cliente.email;
    document.getElementById('clienteInscripcion').value = cliente.fechaInscripcion;

    //Ocultar un boton y mostrar el otro
    document.getElementById('createCliente').style.display = 'none';
    document.getElementById('updateCliente').style.display = 'block';
}

// Funciones para Cursos
// Datos de cursos (simulados)
const cursos = [
    { id: "101", nombre: "Yoga", horario: "Lunes 8:00 AM", disponibilidad: "Disponible" },
    { id: "102", nombre: "Pilates", horario: "Martes 10:00 AM", disponibilidad: "Disponible" },
    { id: "103", nombre: "CrossFit", horario: "Miércoles 7:00 AM", disponibilidad: "Lleno" },
    { id: "104", nombre: "Zumba", horario: "Jueves 6:00 PM", disponibilidad: "Disponible" },
    { id: "105", nombre: "Spinning", horario: "Viernes 5:00 PM", disponibilidad: "Disponible" },
    { id: "106", nombre: "Boxeo", horario: "Sábado 9:00 AM", disponibilidad: "Disponible" },
];

// Elementos del DOM
const CutableBody = document.querySelector("#cursos-table tbody");
const CusearchInput = document.getElementById("searchCursos");
const CuprevBtn = document.getElementById("Cu-prev-btn");
const CunextBtn = document.getElementById("Cu-next-btn");
const CupageInfo = document.getElementById("Cu-page-info");

function setupCursosEventListeners() {
    //Request al servidor para la lista de cursos.
    getCursos();
    // Evento de búsqueda
    CusearchInput.addEventListener("input", searchCursos);

    // Manejo de paginación
    CuprevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayCursos(cursos, currentPage);
        }
    });

    CunextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(cursos.length / rowsPerPage)) {
            currentPage++;
            displayCursos(cursos, currentPage);
        }
    });

    // Mostrar la primera página al cargar
    displayCursos(cursos, currentPage);
}


// Función para mostrar los cursos en la tabla
function displayCursos(cursos, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedCursos = cursos.slice(start, end);

    CutableBody.innerHTML = "";

    paginatedCursos.forEach((curso) => {
        const row = `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nombre}</td>
                <td>${curso.horario}</td>
                <td>${curso.disponibilidad}</td>
                <td><button class="update-curso-btn" data-id="${curso.id}">Update</button></td>
                <td><button class="delete-curso-btn" data-id="${curso.id}">Delete</button></td>
            </tr>
        `;
        CutableBody.innerHTML += row;
    });
    
    // Asignar eventos después
    document.querySelectorAll('.update-curso-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const curso = paginatedCursos.find(c => c.id === id);
            showUpdateCurso(curso);
        });
    });
    
    document.querySelectorAll('.delete-curso-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const curso = paginatedCursos.find(c => c.id === id);
            deleteCurso(curso);
        });
    }); 

    // Actualizar información de la paginación
    CupageInfo.textContent = `Página ${page} de ${Math.ceil(cursos.length / rowsPerPage)}`;
}

// Función para manejar la búsqueda
function searchCursos() {
    const searchTerm = CusearchInput.value.toLowerCase();
    const filteredCursos = cursos.filter(curso =>
        curso.id.includes(searchTerm) || curso.nombre.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reiniciar la página al buscar
    displayCursos(filteredCursos, currentPage);
}

function showUpdateCurso(curso) {
    const cursosPopup = document.getElementById('curso-popup');
    cursosPopup.style.display = "flex";

    // Rellenar los campos del formulario con los datos del curso
    document.getElementById('cursoId').value = curso.id;
    document.getElementById('cursoNombre').value = curso.nombre;
    document.getElementById('cursoHorario').value = curso.horario;
    document.getElementById('cursoDisponibilidad').value = curso.disponibilidad;

    //Ocultar un boton y mostrar el otro
    document.getElementById('createCurso').style.display = 'none';
    document.getElementById('updateCurso').style.display = 'block';
}

// Funciones para Maquinas
// Datos de clientes (simulados)
const maquinas = [
    { id: "101", nombre: "Maquina 1", estado: "T" },
    { id: "102", nombre: "Maquina 2", estado: "F" },
    { id: "103", nombre: "Maquina 3", estado: "F" },
    { id: "104", nombre: "Maquina 4", estado: "T" },
    { id: "105", nombre: "Maquina 5", estado: "T" },
    { id: "106", nombre: "Maquina 6", estado: "T" },
    { id: "107", nombre: "Maquina 7", estado: "F" },
];

// Elementos del DOM
const MatableBody = document.querySelector("#maquinas-table tbody");
const MasearchInput = document.getElementById("searchMaquinas");
const MaprevBtn = document.getElementById("Ma-prev-btn");
const ManextBtn = document.getElementById("Ma-next-btn");
const MapageInfo = document.getElementById("Ma-page-info");

function setupMaquinasEventListeners() {
    //Request al servidor para la lista de clientes.
    getMaquinas();
    // Evento de búsqueda
    MasearchInput.addEventListener("input", searchMaquinas);
    // Manejo de paginación
    MaprevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayMaquinas(maquinas, currentPage);
        }
    });
    ManextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(maquinas.length / rowsPerPage)) {
            currentPage++;
            displayMaquinas(maquinas, currentPage);
        }
    });
    // Mostrar la primera página al cargar
    displayMaquinas(maquinas, currentPage);
}

// Función para mostrar los clientes en la tabla
function displayMaquinas(maquinas, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedMaquinas = maquinas.slice(start, end);

    MatableBody.innerHTML = "";

    paginatedMaquinas.forEach((maquina) => {
        const row = `
            <tr>
                <td>${maquina.id}</td>
                <td>${maquina.nombre}</td>
                <td>${maquina.estado}</td>
                <td><button class="update-maquina-btn" data-id="${maquina.id}">Update</button></td>
                <td><button class="delete-maquina-btn" data-id="${maquina.id}">Delete</button></td>
            </tr>
        `;
        MatableBody.innerHTML += row;
    });

    // Asignar eventos después
    document.querySelectorAll('.update-maquina-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const maquina = paginatedMaquinas.find(c => c.id === id);        
            showUpdateMaquina(maquina);
        });
    });
    document.querySelectorAll('.delete-maquina-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const maquina = paginatedMaquinas.find(m => m.id === id);
            deleteMaquina(maquina);
        });
    });

    // Actualizar información de la paginación
    MapageInfo.textContent = `Página ${page} de ${Math.ceil(maquinas.length / rowsPerPage)}`;
}

// Función para manejar la búsqueda
function searchMaquinas() {
    const searchTerm = MasearchInput.value.toLowerCase();
    const filteredMaquinas = maquinas.filter(maquina =>
        maquina.id.includes(searchTerm) || maquina.nombre.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reiniciar la página al buscar
    displayMaquinas(filteredMaquinas, currentPage);
}

function showUpdateMaquina(maquina) {
    const maquinasPopup = document.getElementById('maquina-popup');
    maquinasPopup.style.display = "flex";

    // Rellenar los campos del formulario con los datos del curso
    document.getElementById('maquinaId').value = maquina.id;
    document.getElementById('maquinaDescripcion').value = maquina.nombre;
    document.getElementById('maquinaEstado').value = maquina.estado;

    //Ocultar un boton y mostrar el otro
    document.getElementById('createMaquina').style.display = 'none';
    document.getElementById('updateMaquina').style.display = 'block';
}

//Funciones para Rutinas
// Datos de cursos (simulados)
const rutinas = [
    { id: "1", idCliente: "101010101", idInstructor: "I001", maquina: "Press de Banca", fecha: "2024-10-01", hora: "08:30" },
    { id: '2', idCliente: "202020202", idInstructor: "I002", maquina: "Caminadora", fecha: "2024-10-02", hora: "09:00" },
    { id: "3", idCliente: "303030303", idInstructor: "I001", maquina: "Remo", fecha: "2024-10-03", hora: "10:00" },
    { id: "4", idCliente: "404040404", idInstructor: "I003", maquina: "Elíptica", fecha: "2024-10-04", hora: "11:30" },
    { id: "5", idCliente: "505050505", idInstructor: "I002", maquina: "Curl de Bíceps", fecha: "2024-10-05", hora: "12:00" },
    { id: "6", idCliente: "606060606", idInstructor: "I004", maquina: "Sentadilla", fecha: "2024-10-06", hora: "14:00" },
    { id: "7", idCliente: "707070707", idInstructor: "I003", maquina: "Extensión de Piernas", fecha: "2024-10-07", hora: "15:30" },
    { id: "8", idCliente: "808080808", idInstructor: "I002", maquina: "Flexión de Piernas", fecha: "2024-10-08", hora: "17:00" }
];


// Elementos del DOM
const RuTableBody = document.querySelector("#rutinas-table tbody");
const RuSearchInput = document.getElementById("searchRutina");
const RuPrevBtn = document.getElementById("R-prev-btn");
const RuNextBtn = document.getElementById("R-next-btn");
const RuPageInfo = document.getElementById("R-page-info");

function setupRutinasEventListeners() {
    //Request al servidor para la lista de rutinas
    getRutinas();

    // Evento de búsqueda
    RuSearchInput.addEventListener("input", searchRutinas);

    // Manejo de paginación
    RuPrevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayRutinas(rutinas, currentPage);
        }
    });

    RuNextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(rutinas.length / rowsPerPage)) {
            currentPage++;
            displayRutinas(rutinas, currentPage);
        }
    });

    // Mostrar la primera página al cargar
    displayRutinas(rutinas, currentPage);
}

// Función para mostrar las rutinas en la tabla
function displayRutinas(rutinas, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedRutinas = rutinas.slice(start, end);

    RuTableBody.innerHTML = "";

    paginatedRutinas.forEach((rutina) => {
        const row = `
            <tr>
                <td>${rutina.id}</td>
                <td>${rutina.idCliente}</td>
                <td>${rutina.idInstructor}</td>
                <td>${rutina.maquina}</td>
                <td>${rutina.fecha}</td>
                <td>${rutina.hora}</td>
                <td><button class="update-rutina-btn" data-id="${rutina.id}">Update</button></td>
                <td><button class="delete-rutina-btn" data-id="${rutina.id}">Delete</button></td>
            </tr>
        `;
        RuTableBody.innerHTML += row;
    });

    // Asignar eventos después
    document.querySelectorAll('.update-rutina-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const rutina = paginatedRutinas.find(r => r.id === id);
            showUpdateRutina(rutina);
        });
    });
    document.querySelectorAll('.delete-rutina-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const rutina = paginatedRutinas.find(r => r.id === id);
            deleteRutina(rutina);
        });
    });

    // Actualizar información de la paginación
    RuPageInfo.textContent = `Página ${page} de ${Math.ceil(rutinas.length / rowsPerPage)}`;
}

// Función para manejar la búsqueda
function searchRutinas() {
    const searchTerm = RuSearchInput.value.toLowerCase();
    const filteredCursos = rutinas.filter(rutina =>
        rutina.id.includes(searchTerm) || rutina.nombre.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reiniciar la página al buscar
    displayRutinas(filteredCursos, currentPage);
}

function showUpdateRutina(rutina) {
    const rutinasPopup = document.getElementById('rutina-popup');
    rutinasPopup.style.display = "flex";

    // Rellenar los campos del formulario con los datos del curso
    document.getElementById('rutinaId').value = rutina.id;
    document.getElementById('rutinaClienteId').value = rutina.idCliente;
    document.getElementById('rutinaInstructorId').value = rutina.idInstructor;
    document.getElementById('rutinaMaquina').value = rutina.maquina;
    document.getElementById('rutinaFecha').value = rutina.fecha;
    document.getElementById('rutinaHora').value = rutina.hora;

    //Ocultar un boton y mostrar el otro
    document.getElementById('createRutina').style.display = 'none';
    document.getElementById('updateRutina').style.display = 'block';
}

//Funcion para Instructores
// Datos de clientes (simulados)
const instructores = [
    { id: "I001", nombre: "Juan Pérez", email: "juan.perez@example.com", telefono: "88887777", fechaContratacion: "2022-01-15" },
    { id: "I002", nombre: "María López", email: "maria.lopez@example.com", telefono: "88886666", fechaContratacion: "2022-03-10" },
    { id: "I003", nombre: "Carlos Martínez", email: "carlos.martinez@example.com", telefono: "88885555", fechaContratacion: "2023-05-22" },
    { id: "I004", nombre: "Sofía Ramírez", email: "sofia.ramirez@example.com", telefono: "88884444", fechaContratacion: "2023-07-30" },
    { id: "I005", nombre: "Jorge Torres", email: "jorge.torres@example.com", telefono: "88883333", fechaContratacion: "2023-09-18" },
    { id: "I006", nombre: "Ana Jiménez", email: "ana.jimenez@example.com", telefono: "88882222", fechaContratacion: "2024-01-05" }
];

// Elementos del DOM
const InsTableBody = document.querySelector("#instructor-table tbody");
const InsSearchInput = document.getElementById("searchInstructores");
const InsPrevBtn = document.getElementById("Ins-prev-btn");
const InsNextBtn = document.getElementById("Ins-next-btn");
const InsPageInfo = document.getElementById("Ins-page-info");

function setupInstructorEventListeners() {
    //Request al servidor para la lista de clientes.
    //getInstuctores();
    // Evento de búsqueda
    InsSearchInput.addEventListener("input", searchInstructores);
    // Manejo de paginación
    InsPrevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayInstructores(instructores, currentPage);
        }
    });
    InsNextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(instructores.length / rowsPerPage)) {
            currentPage++;
            displayInstructores(instructores, currentPage);
        }
    });
    // Mostrar la primera página al cargar
    displayInstructores(instructores, currentPage);
}

// Función para mostrar los clientes en la tabla
function displayInstructores(instructores, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedInstructores = instructores.slice(start, end);

    InsTableBody.innerHTML = "";

    paginatedInstructores.forEach((instructor) => {
        const row = `
            <tr>
                <td>${instructor.id}</td>
                <td>${instructor.nombre}</td>
                <td>${instructor.email}</td>
                <td>${instructor.telefono}</td>
                <td>${instructor.fechaContratacion}</td>
                <td><button class="update-instructor-btn" data-id="${instructor.id}">Update</button></td>
                <td><button class="delete-instructor-btn" data-id="${instructor.id}">Delete</button></td>
            </tr>
        `;
        InsTableBody.innerHTML += row;
    });
    // Asignar eventos después
    document.querySelectorAll('.update-instructor-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const instructor = paginatedInstructores.find(i => i.id === id);
            showUpdateInstructor(instructor);
        });
    });
    document.querySelectorAll('.delete-instructor-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const instructor = paginatedInstructores.find(i => i.id === id);
            deleteInstructor(instructor);
        });
    });
    // Actualizar información de la paginación
    InsPageInfo.textContent = `Página ${page} de ${Math.ceil(instructores.length / rowsPerPage)}`;
}

// Función para manejar la búsqueda
function searchInstructores() {
    const searchTerm = InsSearchInput.value.toLowerCase();
    const filteredInstructores = instructores.filter(instructor =>
        instructor.id.includes(searchTerm) || instructor.nombre.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reiniciar la página al buscar
    displayInstructores(filteredInstructores, currentPage);
}

function showUpdateInstructor(instructor) {
    const instructoresPopup = document.getElementById('instructor-popup');
    instructoresPopup.style.display = "flex";

    // Rellenar los campos del formulario con los datos del curso
    document.getElementById('instructorId').value = instructor.id;
    document.getElementById('instructorNombre').value = instructor.nombre;
    document.getElementById('instructorEmail').value = instructor.email;
    document.getElementById('instructorTelefono').value = instructor.telefono;
    document.getElementById('instructorFechaContratacion').value = instructor.fechaContratacion;

    //Ocultar un boton y mostrar el otro
    document.getElementById('createInstructor').style.display = 'none';
    document.getElementById('updateInstructor').style.display = 'block';
}