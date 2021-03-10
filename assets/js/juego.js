/*-----Declaracion variables --------*/
let puntosJug = 0;
let puntosOpo = 0;
let victoriaJug = 0;
let victoriaOp = 0;
let deck = [];
let cartaJ ="";
const tipos = ["C","H","S","D"];
const especiales = ["A","J","Q","K"];

const puntuacionJug = document.querySelector("#puntos-jugador"),
      puntuacionOp = document.querySelector("#puntos-oponente"),
      cartasJugador = document.querySelector(".cartas-jug"),
      cartasOp = document.querySelector(".cartas-Op"),
      cartaNueva = document.querySelector("#nuevaCarta"),
      nuevaPartida = document.querySelector("#nuevaPartida"),
      finalizar = document.querySelector("#finalizar"),
      mensaje = document.querySelector(".mensaje"),
      victoriasJ = document.querySelector("#victoriaJug"),
      victoriasO = document.querySelector("#victoriaOp");

      cartaNueva.disabled = true;
      finalizar.disabled = true;

/*--------funciones--------------*/

const crearDeck = ()=> {
    //generamos el arreglo de cartas por su numeracion y tipo
    for (let i = 2; i <= 10; i++) {
        for(const tipo of tipos) {
            deck.push(i+tipo)
        }           
    }
    //generamos el arreglo de cartas especiales y su tipo
    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    //utilizamos _.shuffle() libreria underscore para mezclar los numeros
    deck = _.shuffle(deck);
    return deck;
}

//Pedir Carta
    const pedirCarta = ()=>{
    let carta;
    deck.length ? carta = deck.pop() : console.log("no hay cartas");
    return carta;
}

//Obtener valor Carta
const valorCarta = (carta) => {
    let valor = carta.substring(0,carta.length-1);
    return isNaN(valor) ? 
        valor === "A" ? 11 :  10 : 
        valor * 1;
}

/*--------Eventos-------------*/

mensaje.addEventListener("click", ()=>{
    mensaje.style.display="none"
})

cartaNueva.addEventListener("click", ()=>{
    const carta = pedirCarta();
    puntuacionJug.innerText = `Puntos : ${puntosJug += valorCarta(carta)}`;
    cartasJugador.innerHTML += `<img src="/assets/img/${carta}.png" alt="${carta}" loading ="lazy" />`;
    if(puntosJug > 21) {cartaNueva.disabled = true, turnOponente(puntosJug)}
    else if(puntosJug === 21) {cartaNueva.disabled = true, turnOponente(puntosJug)}
})

const turnOponente = () => {
    do {
        cartaOp = pedirCarta();
        puntuacionOp.innerText = `Puntos : ${puntosOpo += valorCarta(cartaOp)}`;
        cartasOp.innerHTML += `<img src="/assets/img/${cartaOp}.png" alt="${cartaOp}" loading ="lazy"/>`;
        if (puntosJug > 21) {break}

    } while (puntosOpo < puntosJug);

    setTimeout(() => {
        if (puntosJug === puntosOpo) {alert('Empate!!')}
        else if (puntosOpo > 21){alert('Ganaste!'); victoriasJ.innerText = `Victorias - ${victoriaJug += 1}`}
        else if (puntosJug < puntosOpo && puntosOpo <= 21){alert('Perdiste!'); victoriasO.innerText = `Victorias - ${victoriaOp += 1}`}
        else if (puntosJug > 21) {alert('Perdiste!'); victoriasO.innerText = `Victorias - ${victoriaOp += 1}`}
    }, 100);

}

finalizar.addEventListener("click", () => {
    cartaNueva.disabled = true;
    finalizar.disabled = true;
    turnOponente()
})

nuevaPartida.addEventListener("click", ()=>{
    deck = [];
    deck = crearDeck();
    puntosJug = 0;
    puntosOpo = 0;
    cartaNueva.disabled = false;
    finalizar.disabled = false;
    cartasJugador.innerHTML = ""
    puntuacionJug.innerText = `Puntos : 0`;
    cartasOp.innerHTML = ""
    puntuacionOp.innerText = `Puntos : 0`;
})