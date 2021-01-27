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
            if(collision(flappyBird, global.ground))
            {
                console.log('colidiu');
                HitSound.play();

                setTimeout(() => {
                    changeScene(Scenes.MENU);
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