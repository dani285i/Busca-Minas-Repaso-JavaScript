let filas = 8;
let columnas = 10;
let minasTotales = 5;
let mapa = [];

function iniciarJuego(){

    let tablero = document.getElementById('tablero');
    // Vaciar tablero para generarlo de nuevo
    tablero.innerHTML = '';
    // Creacion del tablero con grid
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 70px)`;
    // Inicializamos la variable mapa de matrices (array mas o menos)
    mapa = [];
    
    // Bucles para creacion de filas
    for(let f = 0; f < filas; f++){

        // Creamos una variable ayudante que lo que hace es crear otra fila de arrays para guardar datos en posiciones más
        // exactas y no en una unica fila de array. Es para posteriormente tener localizadas las celdas por coordenadas por así decirlo...
        let filaAyudante = [];
        // Bucle para creacion de columnas
        for(let c = 0; c < columnas; c++){
            // Creamos la variable casilla como un <div>
            let casilla = document.createElement('div');
            // Le asignamos la clase .casilla
            casilla.classList.add('casilla');
            // Le asignamos las variables f y c para asignarle una coordenada a cada celda
            casilla.id = `casilla-${f}-${c}`;

            // Usamos una función anónima para usar las casillas como botones de un solo uso,
            // es decir, para evitar que se ejecute el código nada más arrancar el tablero
            // guardo cada casilla en una funcion y no se ejecuta hasta que hago click en ella
            casilla.onclick = function() {
            clickCasilla(f, c);
            };

            // Hace que exista la casilla en pantalla, imprime la casilla para que la veas junto con el HTML
            tablero.appendChild(casilla);
            // Por defecto las celdas sin bomba tienen un valor de 0 y las que tienen bomba tienen un valor de 9
            filaAyudante.push(0);
        };
        // Añade todas esos arrays de filas y los mete dentro del array grande en sí
        mapa.push(filaAyudante);
    };

    spawnearMinas();
    calcularNumerosDelTablero();
};

function clickCasilla(f, c){
    let casilla = document.getElementById(`casilla-${f}-${c}`);

    if(casilla.classList.contains("cavado")) {
        return;
    }

    let valor = mapa[f][c];

    if(valor == 9) {
        casilla.classList.add("bomba");
        casilla.innerHTML = '<img src="./img/mina-foto.png" width="30">';
        alert("Has Perdido.");
    }
    else{
        casilla.classList.add("cavado");

        if(valor > 0){
            casilla.innerHTML = valor;
            if(valor == 1) casilla.style.color = "blue";
            if(valor == 2) casilla.style.color = "yellow";
            if(valor == 3) casilla.style.color = "orange";
        }
        else{}
    }
}

function spawnearMinas(){
    let minasColocadas = 0;

    // Hasta que minas colocadas no supere a las totales asignadas en la variable, no para de spawnear las minas
    while (minasColocadas < minasTotales) {
        let filaAzar = Math.floor(Math.random() * filas);
        let columnaAzar = Math.floor(Math.random() * columnas);

        if(mapa[filaAzar][columnaAzar] !== 9){
            mapa[filaAzar][columnaAzar] = 9;
            minasColocadas++;
        }
    }
}

function calcularNumerosDelTablero() {
    // Recorremos TODAS las filas y columnas
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            
            // Si la casilla actual ya es una bomba, no se toca
            if (mapa[f][c] == 9) {
                continue;
            }
            let numeroDeMinas = calcularMinasCercanas(f, c);
            mapa[f][c] = numeroDeMinas;
        }
    }
}

function calcularMinasCercanas(f, c){
    let contador = 0;

    // Miramos alrededor (desde -1 hasta +1 en filas y columnas)
    for (let i = f - 1; i <= f + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {

            // Comprobamos que no salimos del tablero
            if (i >= 0 && i < filas && j >= 0 && j < columnas) {
                if (mapa[i][j] === 9) {
                    contador++;
                }
            }
        }
    }
    return contador;
}