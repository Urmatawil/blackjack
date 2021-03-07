// C = club, H = Heart, S = Spade, D = Diamond

let deck = [];
const tipos = ["C","H","S","D"];
const especiales = ["A","J","Q","K"];

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
    //utilizamos _.shuffle() de la libreria underscore para mezclar los numeros
    deck = _.shuffle(deck)
    console.log(deck)
    return deck;
}

crearDeck()

/*-------Pedir Carta---------*/

const pedirCarta = ()=>{
    
}
