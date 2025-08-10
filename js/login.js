const formulario_login = document.getElementById("login_form");

if (formulario_login) {
    formulario_login.addEventListener("submit", function (e) {
        e.preventDefault();
        Inicio_Sesion_Usuario(e.target);
    });
}

function Inicio_Sesion_Usuario(formulario) {
    const email = formulario.querySelector("#email").value.trim();
    const contraseña = formulario.querySelector("#password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(
        (usuario) => usuario.email == email && usuario.contraseña1 == contraseña
    );

    if (encontrado) {
        sessionStorage.setItem("usuario_activo", JSON.stringify(encontrado));
        window.location.href = "/myrides.html";
    } else {
        alert("No se pudo encontrar un usuario con esos datos...");
    }
}
