const canvas = document.getElementById('Jogo2D');
const ctx = canvas.getContext('2d');

const desenhoObs = new Image();
desenhoObs.src = 'burro.jpg';

const desenhoOPersonagem = new Image();
desenhoOPersonagem.src = 'shrek.jpg';

let gravidade = 0.8;
let velocidadePersonagem = 25;
const velocidadeObstaculo = 2;

let pontos = 0;
let highscore = 0; // Variável para armazenar o maior score

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = velocidadePersonagem;
        personagem.pulando = true;
    }
});

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
};

function gerarObstaculos() {
    const numeroDeObstaculos = 3;
    const obstaculos = [];

    for (let i = 0; i < numeroDeObstaculos; i++) {
        const largura = Math.floor(Math.random() * 30) + 30;
        const altura = Math.floor(Math.random() * 30) + 30;
        const x = canvas.width + (i * 300);
        const y = canvas.height - altura;

        obstaculos.push({ x, y, largura, altura });
    }

    return obstaculos;
}

let obstaculos = gerarObstaculos();

function desenharPersonagem() {
    ctx.drawImage(desenhoOPersonagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function desenharObstaculos() {
    obstaculos.forEach(obstaculo => {
        ctx.drawImage(desenhoObs, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
    });
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;

        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.y = canvas.height - personagem.altura;
            personagem.velocidadey = 0;
            personagem.pulando = false;
        }
    }
}

function moverObstaculos() {
    obstaculos.forEach(obstaculo => {
        obstaculo.x -= velocidadeObstaculo;

        if (obstaculo.x + obstaculo.largura < 0) {
            obstaculo.x = canvas.width;
            obstaculo.largura = Math.floor(Math.random() * 30) + 30;
            obstaculo.altura = Math.floor(Math.random() * 30) + 30;
            obstaculo.y = canvas.height - obstaculo.altura;
            pontos += 10;
            if (pontos > highscore) {
                highscore = pontos; // Atualiza o highscore se a pontuação for maior
            }
        }
    });
}

function verificarColisao() {
    obstaculos.forEach(obstaculo => {
        if (personagem.x + personagem.largura > obstaculo.x &&
            personagem.x < obstaculo.x + obstaculo.largura &&
            personagem.y + personagem.altura > obstaculo.y) {
            resetarJogo();
        }
    });
}

function resetarJogo() {
    personagem.y = canvas.height - personagem.altura;
    personagem.pulando = false;
    personagem.velocidadey = 0;
    obstaculos = gerarObstaculos();
    pontos = 0; // Reseta a pontuação ao reiniciar
}

function desenharPontuacao() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Pontos: ' + pontos, 10, 30); // Exibe a pontuação atual
    ctx.fillText('Highscore: ' + highscore, canvas.width - 150, 30); // Exibe o highscore no canto superior direito
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moverObstaculos();
    desenharPersonagem();
    desenharObstaculos();
    atualizarPersonagem();
    verificarColisao();
    desenharPontuacao();

    requestAnimationFrame(loop);
}

loop();
