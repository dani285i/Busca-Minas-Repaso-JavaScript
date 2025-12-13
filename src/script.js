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
    mapa = [];
    
    for(let f = 0; f < filas; f++){

        let filaAyudante = [];
        for(let c = 0; c < columnas; c++){
            
            let casilla = document.createElement('div');
            casilla.classList.add('casilla');
            casilla.id = `casilla-${f}-${c}`;

            casilla.onclick = function() {
            clickCasilla(f, c);
            };

            tablero.appendChild(casilla);
            filaAyudante.push(0);
        };
        mapa.push(filaAyudante);
    };

    spawnearMinas();
    calcularMinasCercanas();
};

function spawnearMinas(){
    
}

function calcularMinasCercanas(){

}