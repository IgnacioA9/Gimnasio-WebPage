document.addEventListener('DOMContentLoaded', () => {
    setupVisualizadorEventListeners();
    setupCursosEventListeners();
    setupMaquinasEventListeners();
    setupInstructorEventListeners();
});

function setupVisualizadorEventListeners(){
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

// Funciones de Cursos
// Variables para la paginación
let currentPage = 1;
const rowsPerPage = 5;

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

function getCursos(){
    //console.log(cursos);    
}

// Función para mostrar los cursos en la tabla
function displayCursos(cursos, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedCursos = cursos.slice(start, end);

    CutableBody.innerHTML = "";

    paginatedCursos.forEach(curso => {
        const row = `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nombre}</td>
                <td>${curso.horario}</td>
                <td>${curso.disponibilidad}</td>
            </tr>
        `;
        CutableBody.innerHTML += row;
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

// Funciones de Maquinas
// Datos de clientes (simulados)
const maquinas = [
    { id: "101", nombre: "Maquina 1", estado: "T", precio: "1000" },
    { id: "102", nombre: "Maquina 2", estado: "F", precio: "2000" },
    { id: "103", nombre: "Maquina 3", estado: "F", precio: "3000" },
    { id: "104", nombre: "Maquina 4", estado: "T", precio: "4000" },
    { id: "105", nombre: "Maquina 5", estado: "T", precio: "5000" },
    { id: "106", nombre: "Maquina 6", estado: "T", precio: "6000" },
    { id: "107", nombre: "Maquina 7", estado: "F", precio: "7000" },

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

function getMaquinas(){
    //console.log(clientes);
}

// Función para mostrar los clientes en la tabla
function displayMaquinas(maquinas, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedMaquinas = maquinas.slice(start, end);

    MatableBody.innerHTML = "";

    paginatedMaquinas.forEach(maquina => {
        const row = `
            <tr>
                <td>${maquina.id}</td>
                <td>${maquina.nombre}</td>
                <td>${maquina.estado}</td>
            </tr>
        `;
        MatableBody.innerHTML += row;
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
// Funciones de Instructores
// Datos de clientes (simulados)
const instructores = [
    { id: "11", nombre: "Instructor 1", experience: "1 año"},
    { id: "12", nombre: "Instructor 2", experience: "2 año"},
    { id: "13", nombre: "Instructor 3", experience: "3 año"},
    { id: "14", nombre: "Instructor 4", experience: "4 año"},
    { id: "15", nombre: "Instructor 5", experience: "5 año"},
    { id: "16", nombre: "Instructor 6", experience: "6 año"},
    { id: "17", nombre: "Instructor 7", experience: "7 año"},

];

// Elementos del DOM
const InsTableBody = document.querySelector("#instructor-table tbody");
const InsSearchInput = document.getElementById("searchInstructores");
const InsPrevBtn = document.getElementById("Ins-prev-btn");
const InsNextBtn = document.getElementById("Ins-next-btn");
const InsPageInfo = document.getElementById("Ins-page-info");

function setupInstructorEventListeners() {
    //Request al servidor para la lista de clientes.
    getInstuctores();
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

function getInstuctores(){
    //console.log(instructores);
}

// Función para mostrar los clientes en la tabla
function displayInstructores(instructores, page = 1) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedInstructores = instructores.slice(start, end);

    InsTableBody.innerHTML = "";

    paginatedInstructores.forEach(instructor => {
        const row = `
            <tr>
                <td>${instructor.id}</td>
                <td>${instructor.nombre}</td>
            </tr>
        `;
        InsTableBody.innerHTML += row;
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