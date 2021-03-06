document.addEventListener(`DOMContentLoaded`, () => {
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener(`click`, handleClick);
    })
})
function handleClick(event) {
    let square = event.target;
    let position = square.id;
    Turn();
    if (handleMove(position)) {
        setTimeout(() => {
            Swal.fire(
                'Parabéns!',
                'O vencedor foi: ' + raelzada()
            );
            resetFun();
            onGaming();
            Turn();
            contador = 0;
        }, 150);
    }
    updateSquare(position);
}
function updateSquare(position) {
    let square = document.getElementById(position.toString());
    let symbol = board[position];
    let turn1 = document.getElementById("j1");
    let turn2 = document.getElementById("j2");
    Turn();

    if (symbol == 'o' && jogador1 != '' && jogador2 != ``) {
        square.innerHTML = `<div class="card ${symbol}"><img class="card_image" src="demacia.png"></div>`;
        contador++;
        if (contador == 9 && !gameOver) {
            deuVelha();
            contador = 0;
        }
    }
    else if (symbol == 'x' && jogador1 != '' && jogador2 != ``) {
        square.innerHTML = `<div class="card ${symbol}"> <img class="card_image" src="noxus.png"></div>`
        contador++;
        if (contador == 9 && !gameOver) {
            deuVelha();
            contador = 0;
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Você está tentando começar a partida sem escolher o nome dos participantes ou esta caixa ja está com um símbolo.'
        })
    }
}
function resetFun() {
    let squares = document.querySelectorAll(".square");
    Turn();
    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

        if (symbol != ``) {
            square.innerHTML = '';
        }
    })
    board = [``, ``, ``, ``, ``, ``, ``, ``, ``]
    if (playertime == 0) {
        playertime = 1;


    }
    else {
        playertime = 0;

    }

    gameOver = false;
    contador = 0;
}
function ganhador() {
    if (playertime == 0) {
        ganhador1++;
        return "círculo!"
    }
    else {
        ganhador2++
        return "X!";
    }
}


function jogadores() {
    let j1 = document.getElementById("jogador1")
    let j2 = document.getElementById("jogador2")

    jogador1 = (j1.value);
    jogador2 = (j2.value);
    return onGaming()

}

function raelzada() {
    if (ganhador() == "círculo!") {
        return jogador1
    }
    else {
        return jogador2
    }
}

function onGaming() {
    caixa1.style = "display:none;"
    caixa2.style = "display:inline-block;"
    caixa2.innerHTML = '<div class="caixa_jogador"><p> JOGADOR DEMACIANO </p><div id="j1"><p class="grow xd">' + jogador1 + ' </p >'
        + ganhador1 + '</div></div ><div class="caixa_jogador"><p>JOGADOR NOXIANO </p><div id="j2"><p class="grow xd">'
        + jogador2 + '</p>' + ganhador2 + '</div></div><button class="areset" onclick="zero()">REINICIAR</button>'
}

function zero() {
    jogador1 = '';
    jogador2 = '';
    ganhador1 = 0;
    ganhador2 = 0;
    contador = 0;
    resetFun();
    caixa1.style = "display:inline-block;"
    caixa2.style = "display:none;"
}
function deuVelha() {

    let timerInterval
    Swal.fire({
        title: 'Ninguém ganhou dessa vez. Vocês empataram.',
        html: 'Reiniciando o Tabuleiro .<b></b>',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                contador = 0;
                resetFun();
                Turn();
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function Turn() {
    let turn = document.getElementById("turn");
    let j1 = document.getElementById("j1")
    let j2 = document.getElementById("j2")
    if (playertime == 0) {
        turn.innerHTML = ' <p class= "turn"> Turno :' + jogador1 + '</p'
    }
    else if (playertime == 1) {
        turn.innerHTML = ' <p class= "turn"> Turno :' + jogador2 + '</p'
    }
    else {
        turn.innerHTML = ' <p class= "turn"> Turno :' + jogador1 + '</p'
    }
    if (playertime == 0) {
        j1.style = 'background-color:goldenrod'
        j2.style = 'background-color: #ac843b'
    }
    else {
        j1.style = 'background-color:#ac843b'
        j2.style = 'background-color:goldenrod'
    }
}
