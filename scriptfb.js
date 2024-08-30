var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Carregando imagens
var bird = new Image();
bird.src = "images/bird.png";
var bg = new Image();
bg.src = "images/bg.png";
var chao = new Image();
chao.src = "images/chao.png";
var canocima = new Image();
canocima.src = "images/canocima.png";
var canobaixo = new Image();
canobaixo.src = "images/canobaixo.png";

// Variáveis
var eec = 100;
var constant;
var bX = 33;
var bY = 300;
var gravity = 1.4;
var score = 0;
var cano = [];

cano[0] = {
	x : canvas.width,
	y : 0,
}

// Carregando sons
var fly = new Audio();
fly.src = "sounds/fly.mp3";
var scoreSound = new Audio();
scoreSound.src = "sounds/scoreSound.mp3";

	// Captura de tecla
	document.addEventListener("keydown",voa);

	// Voando
	function voa(){
		bY = bY - 26;
		fly.play();
	}

function jogo(){
	// Fundo do jogo
	ctx.drawImage(bg,0,0);
	// drawImage(imagem,X,Y)

	// Criando canos
	for(let i = 0; i < cano.length; i++){
		// Posição do cano de baixo
		constant = canocima.height + eec;
		// Configurando o cano de cima
		ctx.drawImage(canocima, cano[i].x, cano[i].y);
		// Configurando o cano de baixo
		ctx.drawImage(canobaixo, cano[i].x, cano[i].y + constant);
		// Movimentação do cano
		cano[i].x = cano[i].x - 1;
		// Criar novos canos
		if(cano[i].x == 125){
			cano.push({
				x : canvas.width,
				y : Math.floor(Math.random()*canocima.height)-canocima.height
			})
		}
		// Pássaro entre as bordas do cano
		if(bX + bird.width >= cano[i].x && bX <= cano[i].x + canocima.width
    		// Pássaro colidiu com o cano de cima ou com o cano de baixo
    		&& (bY <= cano[i].y + canocima.height || bY+bird.height >= cano[i].y+constant)
    		// Pássaro colidiu com o chão
    		|| bY + bird.height >= canvas.height - chao.height) {
			location.reload();
		}

		// Marcando pontos
		if(cano[i].x == 5){
			score = score + 1;
			scoreSound.play();
		}
	}


	// Desenhando o chão
	ctx.drawImage(chao, 0, canvas.height - chao.height);

	// Pássaro
	ctx.drawImage(bird, bX, bY);
	bY += gravity;

	// Criando o placar
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Placar: " + score, 10, canvas.height-20);

	requestAnimationFrame(jogo);
}

jogo();