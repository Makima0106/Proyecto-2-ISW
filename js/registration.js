const formulario_cliente = document.getElementById("client_form");
const formulario_conductor = document.getElementById("driver_form");

if (formulario_cliente) {
    formulario_cliente.addEventListener("submit", function (e) {
        e.preventDefault();
        const nuevo_usuario = Obtener_Datos_Usuarios(e.target);
        Agregar_Usuario(nuevo_usuario);
    });
}

if (formulario_conductor) {
    formulario_conductor.addEventListener("submit", function (e) {
        e.preventDefault();
        const nuevo_usuario = Obtener_Datos_Usuarios(e.target);
        Agregar_Usuario(nuevo_usuario);
    });
}

function Obtener_Datos_Usuarios(formulario) {
    const nombre = formulario.querySelector("#first").value.trim();
    const apellido = formulario.querySelector("#last").value.trim();
    const cedula = formulario.querySelector("#cedula").value.trim();
    const email = formulario.querySelector("#email").value.trim();
    const contraseña1 = formulario.querySelector("#password").value.trim();
    const contraseña2 = formulario.querySelector("#repeat").value.trim();
    const direccion = formulario.querySelector("#address").value.trim();
    const pais = formulario.querySelector("#country").value.trim();
    const canton = formulario.querySelector("#state").value.trim();
    const ciudad = formulario.querySelector("#city").value.trim();
    const telefono = formulario.querySelector("#phone").value.trim();

    const nuevo_usuario = {
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        email: email,
        contraseña1: contraseña1,
        contraseña2: contraseña2,
        direccion: direccion,
        pais: pais,
        canton: canton,
        ciudad: ciudad,
        telefono: telefono,
    };

    if (formulario.querySelector("#plate")) {
        const placa = formulario.querySelector("#plate").value.trim();
        const modelo = formulario.querySelector("#model").value.trim();
        const año = formulario.querySelector("#year").value.trim();

        nuevo_usuario.placa = placa;
        nuevo_usuario.modelo = modelo;
        nuevo_usuario.año = año;
        nuevo_usuario.rol = "Conductor";
    } else {
        nuevo_usuario.rol = "Cliente";
    }

    if (!Validar_Campos(nuevo_usuario)) {
        alert("Por favor rellenar todos espacios dados...");
        return;
    }

    if (!Validar_Email(email)) {
        alert("El correo electronico no es valido...");
        return;
    }

    if (contraseña1 !== contraseña2) {
        alert("Las contraseñas dadas no coinciden...");
        return;
    }

    return nuevo_usuario;
}

function Agregar_Usuario(nuevo_usuario) {
    let usuarios = [];

    if (localStorage.getItem("usuarios")) {
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    } else {
        usuarios = [];
    }

    if (usuarios.some((u) => u.cedula === nuevo_usuario.cedula)) {
        alert("La cedula ya esta vinculada a otro usuario...");
        return;
    }

    if (usuarios.some((u) => u.telefono === nuevo_usuario.telefono)) {
        alert("El telefono ya esta vinculado a otro usuario...");
        return;
    }

    if (usuarios.some((u) => u.email === nuevo_usuario.email)) {
        alert("El correo electronico ya esta vinculado a otro usuario...");
        return;
    }

    usuarios.push(nuevo_usuario);

    window.location.href = "/login.html";

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro completado correctamente.");
}

function Validar_Email(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function Validar_Campos(campos) {
    return Object.values(campos).every((campo) => campo !== "");
}
