const canvas = document.getElementById('Jogo2D')

const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space'){
        console.log('sim')
        personagem.velocidadey = 15
        personagem.pulando = true
    }
})

const personagem = {
    x:100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidade:0, 
    pulando: false
}

function desenharPersonagem(){
ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura)

ctx.fillStyle = 'Black'
}
desenharPersonagem()

function atualizarPersonagem(){

    if(personagem.pulando == true){
        personagem.y -= personagem.velocidadey
    }

}

function loop (){
    ctx.clearRect(0,0,canvas.width,canvas.height)
   
    desenharPersonagem()

    atualizarPersonagem()

    requestAnimationFrame(loop)
}
loop()