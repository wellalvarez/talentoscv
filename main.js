// --- BASE DE DATOS (Aquí agregarás a tus personas) ---
const perfiles = [
    {
        id: 1,
        nombre: "Ana Rodríguez",
        puesto: "Diseñadora UX/UI",
        foto: "img/Luis.jpg", // Ejemplo de imagen real
        email: "ana.rod@example.com",
        telefono: "+1 809-555-0123",
        ubicacion: "Santo Domingo, Esmeralda Heights",
        pasaporte: "PD-555-123", // NIE/Pasaporte Dominicano
        url_pdf: "img/Ana Rodriguez.pdf"// Aquí pondrás la ruta de tu PDF real más adelante
    },
    {
        id: 2,
        nombre: "Carlos Méndez",
        puesto: "Desarrollador Full Stack",
        foto: "https://github.com/wellalvarez/talentoscv/blob/main/img/foto-carlos.jpg",
        email: "carlos.dev@example.com",
        telefono: "+1 829-555-0987",
        ubicacion: "Samaná, Cabo Rojo",
        pasaporte: "PD-666-456",
        url_pdf: ""
    },
    // Puedes agregar infinitas personas aquí...
];

// Función para renderizar la galería
function cargarGaleria() {
    const contenedor = document.getElementById('grid-perfiles');
    
    perfiles.forEach(persona => {
        const cardHTML = `
            <div class="card" onclick="abrirModal(${persona.id})">
                <img src="${persona.foto}" alt="${persona.nombre}">
                <h3>${persona.nombre}</h3>
                <p>${persona.puesto}</p>
                <span style="font-size: 0.8rem; color: var(--accent-gold); text-transform: uppercase;">Ver Perfil</span>
            </div>
        `;
        contenedor.innerHTML += cardHTML;
    });
}

// --- LÓGICA DEL MODAL ---

const modal = document.getElementById('perfil-modal');
const iframePdf = document.getElementById('pdf-viewer');

function abrirModal(id) {
    const persona = perfiles.find(p => p.id === id);
    
    // Rellenar datos en el DOM
    document.getElementById('nombre-perfil').innerText = persona.nombre;
    document.getElementById('titulo-perfil').innerText = persona.puesto;
    document.getElementById('email-perfil').innerText = persona.email;
    document.getElementById('telefono-perfil').innerText = persona.telefono;
    document.getElementById('ubicacion-dato').innerText = persona.ubicacion; // Nota: Ajusta el ID si cambia en HTML
    document.getElementById('id-perfil').innerText = persona.pasaporte;
    
    // Si tienes una URL a PDF
    if(persona.url_pdf) {
        iframePdf.src = persona.url_pdf;
        iframePdf.style.display = "block";
        document.querySelector('.seccion-pdf-container h3').style.display = 'block';
    } else {
        alert("Archivo de PDF no cargado para este perfil (usa ruta relativa a la carpeta /pdfs)");
    }

    modal.style.display = 'flex';
    
    // Poner foco en el body para activar esc key si fuera necesario (aunque el botón X es más directo)
    document.body.focus(); 
}

function cerrarModal() {
    modal.style.display = 'none';
    iframePdf.src = ""; // Detener carga de PDF al cerrar
}

// --- MANEJO DE EVENTOS PARA CERRAR ---

// 1. Click en la X del círculo (ya hecho en el HTML/CSS con onclick="cerrarModal()")
// 2. Click fuera del contenido del modal (en el fondo oscuro)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// 3. Tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        cerrarModal();
    }
});

// Inicializar
cargarGaleria();
