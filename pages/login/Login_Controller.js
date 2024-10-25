document.addEventListener('DOMContentLoaded', async () => {
    await menu();
    setupEventListeners();
});

// Función para inicializar la lógica de la página de clientes
function setupEventListeners() {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const closeBtn = document.getElementById("closeLogin");
    const closeRegisterBtn = document.getElementById("closeRegister");
    const loginPopup = document.getElementById("login-popup");
    const registerPopup = document.getElementById("register-popup");
    const loginSend = document.getElementById("login-send");
    const registerSend = document.getElementById("register-send");

    loginBtn.addEventListener("click", () => {
        loginPopup.style.display = "flex";
    });

    registerBtn.addEventListener("click", () => {
        registerPopup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        loginPopup.style.display = "none";
    });

    closeRegisterBtn.addEventListener("click", () => {
        registerPopup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == loginPopup) {
            loginPopup.style.display = "none";
        }
    });

    loginSend.addEventListener("click", login_without_server);
    registerSend.addEventListener("click", register_without_server);
}


function login() {
    // Obtener los valores del formulario
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');

    if (!username) {
        usernameInput.classList.add("error"); // Agregar clase de error al campo vacío
        hasError = true;
    }
    if (!password) {
        passwordInput.classList.add("error"); // Agregar clase de error al campo vacío
        hasError = true;
    }

    if (hasError) {
        return; // No continuar si hay errores
    }

    // Crear el objeto de usuario
    const user = { username, password };

    // Hacer la solicitud POST
    const request = new Request(api_login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    fetch(request)
        .then(response => {
            if (!response.ok) {
                throw response; // Lanzar la respuesta para manejar el error en el bloque catch
            }
            return response.json();
        })
        .then(data => {
            // Suponiendo que la respuesta contiene un objeto con el rol del usuario
            loginstate.logged = true;
            loginstate.user.id = data.id; // Asegúrate de que tu respuesta contenga este campo
            loginstate.user.rol = data.rol; // Asegúrate de que tu respuesta contenga este campo

            renderMenu(); // Renderiza el menú de nuevo para reflejar el estado de login
            document.getElementById("login-popup").style.display = "none"; // Cierra el popup de login
        })
        .catch(error => {
            // Manejar diferentes códigos de error
            if (error instanceof Response) {
                let errorMessage = "Error desconocido"; // Mensaje por defecto
                switch (error.status) {
                    case 404:
                        errorMessage = "Registro no encontrado";
                        break;
                    case 409:
                        errorMessage = "Registro duplicado";
                        break;
                    case 401:
                        errorMessage = "Usuario no autorizado";
                        break;
                    case 403:
                        errorMessage = "Usuario no tiene derechos";
                        break;
                    case 500:
                        errorMessage = "Error al procesar la solicitud";
                        break;
                }
                alert(errorMessage); // Mostrar mensaje de error como un alert
            } else {
                console.error('Error:', error);
                alert("Error desconocido"); // Mostrar mensaje de error genérico
            }
        });
}

function login_without_server() {
    // Obtener los valores del formulario
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos
    let hasError = false;

    // Limpiar errores anteriores
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');

    if (!username) {
        usernameInput.classList.add("error"); // Agregar clase de error al campo vacío
        hasError = true;
    }
    if (!password) {

        passwordInput.classList.add("error"); // Agregar clase de error al campo vacío
        hasError = true;
    }

    if (hasError) {
        return; // No continuar si hay errores
    }

    loginstate.logged = true;
    loginstate.user.id = username;
    loginstate.user.rol = "CLIENTE";

    renderMenu(); 
    document.getElementById("login-popup").style.display = "none";
}

function register(){

}

function register_without_server(){
    document.getElementById("register-popup").style.display = "none";
    console.log("Ususario registrado");
}