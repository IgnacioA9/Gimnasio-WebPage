const backend = "http://localhost:8080/api";
const api_login = `${backend}/login`;
const api_clientes = `${backend}/clientes`;
const api_cursos = `${backend}/cursos`;
const api_maquinas = `${backend}/maquinas`;
const api_rutinas = `${backend}/rutinas`;

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', menu);3

const loginstate = {
    logged: false,
    user: { id: "", rol: "" },
};

async function menu() {
    checkUser(); // Aquí deberías implementar la lógica para verificar el estado del usuario
    renderMenu();
}

function renderMenu() {
    const header = document.querySelector('header nav ul');
    header.innerHTML = ''; // Limpiar el menú existente

    if (!loginstate.logged) {
        // Menú para usuarios no autenticados
        header.innerHTML = `
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Contactos</a></li>
            <li><a href="#" id="login-btn">Ingreso</a></li>
            <li><a href="#" id="register-btn">Registrarse</a></li>
        `;
    } else {
        // Menú para clientes
        if (loginstate.user.rol === 'CLIENTE') {
            header.innerHTML = `
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="#">Tablas</a></li>
                <li><a href="#" id="logout-btn">Cerrar Sesión</a></li>
            `;
        }
        // Menú para instructores
        if (loginstate.user.rol === 'INSTRUCTOR') {
            header.innerHTML = `
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Clientes</a></li>
                <li><a href="#">Cursos</a></li>
                <li><a href="#" id="logout-btn">Cerrar Sesión</a></li>
            `;
        }
        // Menú para soporte
        if (loginstate.user.rol === 'SOPORTE') {
            header.innerHTML = `
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Clientes</a></li>
                <li><a href="#">Bitácoras</a></li>
                <li><a href="#" id="logout-btn">Cerrar Sesión</a></li>
            `;
        }
    }

    // Opcional: Lógica para cerrar sesión
    document.getElementById("logout-btn")?.addEventListener("click", () => {
        loginstate.logged = false; // Cambiar el estado a no autenticado
        loginstate.user = { id: "", rol: "" }; // Limpiar información del usuario
        renderMenu(); // Volver a renderizar el menú
    });
}

// Simulación de la función para verificar el estado del usuario
function checkUser() {
    // Aquí deberías implementar tu lógica para verificar el estado del usuario
    // Simulando que el usuario ha iniciado sesión como 'CLIENTE'
    // Puedes reemplazar esta parte con tu lógica de autenticación real
    loginstate.logged = false; // Cambia esto según el estado real
    loginstate.user.rol = ''; // Cambia esto según el rol real
}
