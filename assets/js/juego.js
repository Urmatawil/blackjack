/*-----Declaracion variables --------*/
let puntosJug = 0;
let puntosOpo = 0;
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
      finalizar = document.querySelector("#finalizar");

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
    finalizar.disabled = false;
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

cartaNueva.addEventListener("click", ()=>{
    console.log(deck)
    const carta = pedirCarta();
    puntuacionJug.innerText = `Puntos : ${puntosJug += valorCarta(carta)}`;
    cartasJugador.innerHTML += `<img src="/assets/img/${carta}.png" alt="${carta}" />`;

    puntosJug >= 21 ? (cartaNueva.disabled = true, turnOponente(puntosJug)): console.log()
})

turnOponente = () => {
    const cartaOp = pedirCarta();
    puntuacionOp.innerText = `Puntos : ${puntosOpo += valorCarta(cartaOp)}`;
    cartasOp.innerHTML += `<img src="/assets/img/${cartaOp}.png" alt="${cartaOp}" />`;

}

finalizar.addEventListener("click", () => {
    cartaNueva.disabled = true;
    turnOponente()
})

nuevaPartida.addEventListener("click", ()=>{
    console.log(deck);
    crearDeck();
    console.log(deck);
    cartaNueva.disabled = false;
    finalizar.disabled = true;
    puntosJug = 0;
    puntosOpo = 0;
    cartasJugador.innerHTML = ""
    puntuacionJug.innerText = `Puntos : 0`;
    cartasOp.innerHTML = ""
    puntuacionOp.innerText = `Puntos : 0`;
})