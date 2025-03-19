let notaSeleccionada = 'https://i.postimg.cc/rsp7G0kr/Noti-Amarilla.png'; // Valor inicial

function seleccionarNota(nota) {
    notaSeleccionada = nota; // Actualiza la nota seleccionada
    document.getElementById('notita-preview').src = notaSeleccionada; // Actualiza la vista previa
}

document.querySelectorAll('.nota').forEach(nota => {
    nota.addEventListener('click', () => {
        notaSeleccionada = nota.src;
        document.getElementById('notita-preview').src = notaSeleccionada;
    });
});

document.getElementById('texto').addEventListener('input', () => {
    document.getElementById('notita-texto').innerText = document.getElementById('texto').value;
});

document.getElementById('color-texto').addEventListener('input', () => {
    document.getElementById('notita-texto').style.color = document.getElementById('color-texto').value;
});

document.getElementById('brillo').addEventListener('input', () => {
    let brillo = document.getElementById('brillo').value;
    document.getElementById('notita-preview').style.filter = `brightness(${brillo}%)`;
});

function actualizarTexto() {
    const texto = document.getElementById("texto").value;
    document.getElementById("notita-texto").innerText = texto;
}
function cambiarSaturacion() {
    const saturacion = document.getElementById("saturacion").value;
    document.getElementById("notita-preview").style.filter = `saturate(${saturacion}%)`;
}
function cambiarBrillo() {
    const brillo = document.getElementById("brillo").value;
    document.getElementById("notita-preview").style.filter = `brightness(${brillo}%)`;
}

function descargarNotita() {
    const texto = document.getElementById("texto").value;
    const colorTexto = document.getElementById("color-texto").value;
    const brillo = document.getElementById("brillo").value;

    // Crear un canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Cargar la imagen seleccionada
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Configura el atributo crossOrigin
    img.src = notaSeleccionada; // Usa la imagen seleccionada

    img.onload = function() {
        // Ajustar el tamaño del canvas
        canvas.width = img.width;
        canvas.height = img.height;

 // **Dibujar el fondo blanco**
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);

        // Aplicar brillo
        ctx.filter = `brightness(${brillo}%)`;

        // Configurar el texto con la fuente correcta y el interlineado
        ctx.font = '68px "Felt Tip Roman"'; // Asegura la fuente correcta
        ctx.fillStyle = colorTexto;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Configurar la sombra del texto
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';  // Color de la sombra
        ctx.shadowOffsetX = 2;  // Desplazamiento horizontal
        ctx.shadowOffsetY = 2;  // Desplazamiento vertical
        ctx.shadowBlur = 4;  // Desenfoque de la sombra

        // Ajustar el área del texto
        const maxWidth = canvas.width * 0.7; // 70% del ancho de la imagen
        const lineHeight = 90; // Espaciado entre líneas
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        // Función para dividir el texto en líneas
        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            const lines = [];
            
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' ';
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && i > 0) {
                    lines.push(line);
                    line = words[i] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            
            let startY = y - ((lines.length - 1) * lineHeight) / 2; // Centrar el texto
            lines.forEach(line => {
                context.fillText(line, x, startY);
                startY += lineHeight;
            });
        }

        // Dibujar el texto con ajuste de línea
        wrapText(ctx, texto, x, y, maxWidth, lineHeight);

        // Descargar la imagen
        const link = document.createElement('a');
        link.download = 'NotitaToxica2009.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
         img.onerror = function() {
             console.error('Error al cargar la imagen:', img.src);
             alert('No se pudo cargar la imagen. Asegúrate de que la ruta sea correcta.');
         };
     }
     
     function agregarEmoji(emoji) {
        const texto = document.getElementById('texto');
        texto.value += emoji;
        actualizarTexto();  // Para que se actualice en la notita de vista previa
      }
      
