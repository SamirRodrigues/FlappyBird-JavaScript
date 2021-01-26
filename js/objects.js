const sprites = new Image();
sprites.src = '../assets/images/sprites.png';

const canvas = document.querySelector('canvas');
const object = canvas.getContext('2d');

// [Plano de Fundo]
const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,

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
    },
};

// [Chao]
const ground = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    
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

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,

    print() 
    {
        object.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
            flappyBird.width, flappyBird.height, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.width, flappyBird.height,
        );
    }
};