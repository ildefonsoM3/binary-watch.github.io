document.addEventListener('DOMContentLoaded', () => {
    const building = document.getElementById('building');
    const formatSwitch = document.getElementById('format-switch');
    const timeText = document.getElementById('time-text');
    
    const numTowers = 4; // 1 Torre de Leyenda + 3 Torres de Tiempo
    const numFloors = 4; // Bits: 8, 4, 2, 1

    // 1. Construcción dinámica de las 4 torres
    for (let t = 0; t < numTowers; t++) {
        const tower = document.createElement('div');
        // Asignar clase especial a la primera torre de la izquierda
        tower.className = 'tower' + (t === 0 ? ' legend-tower' : '');

        const roof = document.createElement('div');
        roof.className = 'roof';
        tower.appendChild(roof);

        for (let f = 1; f <= numFloors; f++) {
            const floor = document.createElement('div');
            floor.className = `floor floor-${f}`;

            for (let w = 0; w < 2; w++) {
                const win = document.createElement('div');
                win.className = 'window';
                
                if (t === 0) {
                    // Configuración de la columna indicadora izquierda
                    if (w === 1) { 
                        // La ventana derecha muestra el valor del bit (8, 4, 2, 1)
                        const bitValue = Math.pow(2, 4 - f); 
                        win.textContent = bitValue;
                        win.className = 'window legend-window';
                    } else {
                        // La ventana izquierda se oculta para alinearse con el reloj
                        win.className = 'window hidden-window';
                    }
                } else {
                    // Identificador único para las ventanas del reloj (Torres 0, 1 y 2 internas)
                    win.id = `win-t${t - 1}-f${f}-w${w}`;
                }

                floor.appendChild(win);
            }
            tower.appendChild(floor);
        }
        building.appendChild(tower);
    }

    // 2. Lógica del Reloj Binario
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Conversión opcional al formato de 12 horas
        if (formatSwitch.checked) {
            hours = hours % 12;
            if (hours === 0) hours = 12;
        }

        // Mostrar el formato digital abajo
        timeText.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Mapeo de las 3 torres de tiempo restantes
        const timeStrs = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ];

        for (let t = 0; t < 3; t++) {
            // Convierte decenas y unidades a binario (ej: 5 -> "0101")
            const tensBinary = parseInt(timeStrs[t][0]).toString(2).padStart(4, '0');
            const unitsBinary = parseInt(timeStrs[t][1]).toString(2).padStart(4, '0');

            for (let f = 1; f <= numFloors; f++) {
                const bitIndex = f - 1; // Piso 1 = Bit 8 (Índice 0), Piso 4 = Bit 1 (Índice 3)
                
                const winLeft = document.getElementById(`win-t${t}-f${f}-w0`);  // Decenas
                const winRight = document.getElementById(`win-t${t}-f${f}-w1`); // Unidades

                // Controlar iluminación de las decenas
                if (tensBinary[bitIndex] === '1') {
                    winLeft.classList.add('on');
                } else {
                    winLeft.classList.remove('on');
                }

                // Controlar iluminación de las unidades
                if (unitsBinary[bitIndex] === '1') {
                    winRight.classList.add('on');
                } else {
                    winRight.classList.remove('on');
                }
            }
        }
    }

    // Iniciar el intervalo del reloj
    setInterval(updateClock, 1000);
    updateClock();
});