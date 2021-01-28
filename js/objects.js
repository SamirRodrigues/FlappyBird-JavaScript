let countFrames = 0;


const HitSound = new Audio();
HitSound.src = '../assets/sounds/hit.wav';

const sprites = new Image();
sprites.src = '../assets/images/sprites.png';

const canvas = document.querySelector('canvas');
const object = canvas.getContext('2d');

const global = {};

// [Plano de Fundo]

function newBackground()
{
    const background = {
        spriteX: 390,
        spriteY: 0,
        height: 204,
        width: 275,
        x: 0,
        y: canvas.height - 204,

        update()
        {
            //Parallax do chão
            const backgroundMoviment = 0.5;
            const resetMoviment = background.width;
            const moviment = background.x - backgroundMoviment;

            background.x = moviment % resetMoviment;
        },
    
        print() 
        {
            object.fillStyle = '#70c5ce';
            object.fillRect(0,0, canvas.width, canvas.height)
    
            object.drawImage(
                sprites,
                background.spriteX, background.spriteY,
                background.width, background.height,
                background.x, background.y,
                background.width, background.height,
            );
    
            object.drawImage(
                sprites,
                background.spriteX, background.spriteY,
                background.width, background.height,
                (background.x + background.width), background.y,
                background.width, background.height,
            );

            object.drawImage(
                sprites,
                background.spriteX, background.spriteY,
                background.width, background.height,
                (background.x + (background.width * 2)), background.y,
                background.width, background.height,
            );
        },
    };

    return background;
}

// [Chao]

function newGround()
{
    const ground = {
        spriteX: 0,
        spriteY: 610,
        height: 112,
        width: 224,
        x: 0,
        y: canvas.height - 112,
        
        update()
        {
            //Parallax do chão
            const groundMoviment = 1;
            const resetMoviment = ground.width / 2;
            const moviment = ground.x - groundMoviment;
            
            ground.x = moviment % resetMoviment;
        },
        
        print()
        {
            object.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.width, ground.height,
            ground.x, ground.y,
            ground.width, ground.height,
            );
            
            object.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.width, ground.height,
            (ground.x + ground.width), ground.y,
            ground.width, ground.height,
            );
        },
    };

    return ground;
            
}

// [Pássaro]
function newFlappy()
{
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        height: 24,
        width: 33,
        x: 10,
        y: 50,
        gravity: 0.25,
        speed: 0,
        jumpSize: 4.6,
        
        update()
        {
            //Verificador de colisão
            if(groundCollision(flappyBird, global.ground))
            {
                HitSound.play();

                setTimeout(() => {
                    changeScene(Scenes.GAMEOVER);
                }, 500);

                return;
            }
            
            // Calculo de Gravidade
            flappyBird.speed = flappyBird.speed + flappyBird.gravity;
            flappyBird.y = flappyBird.y + flappyBird.speed;
        },

        // #START ANIMAÇÃO 
        birdSprites: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
          ],
          
        currentFrame: 0,

        frameUpdate() 
        {     
            const cooldown = 5; // Cooldown de 5 frames

            const endCooldown = countFrames % cooldown === 0; //Verifica se terminou o cooldown            
        
            if(endCooldown) {
                const incrementBase = 1;
                const increment = incrementBase + flappyBird.currentFrame;
                const repeatBase = flappyBird.birdSprites.length;
                flappyBird.currentFrame = increment % repeatBase
            }                
        },

        // #END ANIMAÇÃO
        
        jump(){
            flappyBird.speed -= flappyBird.jumpSize; 
        },

        print() 
        {
            flappyBird.frameUpdate();
            const { spriteX, spriteY } = flappyBird.birdSprites[flappyBird.currentFrame];

            object.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X, Sprite Y
                flappyBird.width, flappyBird.height, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.width, flappyBird.height,
            );
        } 
    };

    return flappyBird;
}

const getReadyMessage = {
    spriteX: 134,
    spriteY: 0,
    height: 152,
    width: 174,
    x: (canvas.width / 2) - (174 / 2),
    y: 50,

    
    print() 
    {
        object.drawImage(
            sprites,
            getReadyMessage.spriteX, getReadyMessage.spriteY, // Sprite X, Sprite Y
            getReadyMessage.width, getReadyMessage.height, // Tamanho do recorte na sprite
            getReadyMessage.x, getReadyMessage.y,
            getReadyMessage.width, getReadyMessage.height,
        );
    }
};

const gameOverMessage = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    
    print() 
    {
      object.drawImage(
        sprites,
        gameOverMessage.sX, gameOverMessage.sY,
        gameOverMessage.w, gameOverMessage.h,
        gameOverMessage.x, gameOverMessage.y,
        gameOverMessage.w, gameOverMessage.h
      );
    }
  }


function newPipe() 
{
    const pipe = {

      width: 52,
      height: 400,
      ground: {
        spriteX: 0,
        spriteY: 169,
      },
      sky: {
        spriteX: 52,
        spriteY: 169,
      },

      pairs: [],

      print() {
        pipe.pairs.forEach(function(pair) {
          const yRandom = pair.y;
          const areaBtwPipes = 180;
    
          const skyPipeX = pair.x;
          const skyPipeY = yRandom; 
  
          // [Cano do Céu]
          object.drawImage(
            sprites, 
            pipe.sky.spriteX, pipe.sky.spriteY,
            pipe.width, pipe.height,
            skyPipeX, skyPipeY,
            pipe.width, pipe.height,
          )
          
          // [Cano do Chão]
          const groundPipeX = pair.x;
          const groundPipeY = pipe.height + areaBtwPipes + yRandom; 
          object.drawImage(
            sprites, 
            pipe.ground.spriteX, pipe.ground.spriteY,
            pipe.width, pipe.height,
            groundPipeX, groundPipeY,
            pipe.width, pipe.height,
          )
  
          pair.skyPipe = {
            x: skyPipeX,
            y: pipe.height + skyPipeY
          }
          pair.groundPipe = {
            x: groundPipeX,
            y: groundPipeY
          }
        })
      },

      
      update()
      {
        
        if(countFrames % 100 === 0) // se Passou 100 frames
        {
          console.log('Passou 100 frames');
          
          pipe.pairs.push({
            x: canvas.width,
            y: -150 * (Math.random() + 1), // Calculando as alturas randomicas
          });
          
        } 
  
        pipe.pairs.forEach(function(pair) 
        {
          pair.x = pair.x - 2; // faz com que ande 2 pixels para o lado por frame

          if(pipeCollision(global.flappyBird, pair)) 
          {
            console.log('Você perdeu!')
            HitSound.play();
            changeScene(Scenes.GAMEOVER);
          }
  
          if(pair.x + pipe.largura <= 0) 
          {
            pipe.pairs.shift(); //Remove primeiro elemento da lista
          }

        });
      }
    }
  
    return pipe;
  };

function newScore()
{
    const score = {
        scoreCounter: 0,
        print() {
          object.font = '35px "VT323"';
          object.textAlign = 'right';
          object.fillStyle = 'white';
          object.fillText(`${score.scoreCounter}`, canvas.width - 10, 35);      
        },
        update() {
          const cooldown = 20;
          const endCooldown = countFrames % cooldown === 0;
    
          if(endCooldown) {
            score.scoreCounter +=1;
          }
        }
    }

    return score;
}