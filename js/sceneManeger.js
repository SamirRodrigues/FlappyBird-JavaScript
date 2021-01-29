
let currentScene = {};

function changeScene(newScene){
    currentScene = newScene;

    if(currentScene.start())
    {
        currentScene.start();
    }
}

const Scenes = {
    MENU: {

        start() 
        {
            global.flappyBird = newFlappy();
            global.ground = newGround();
            global.background = newBackground();
            global.pipe = newPipe();
        },
        
        click()
        {
            changeScene(Scenes.GAME);
        },

        update ()
        {
            global.background.print();            
            global.ground.print();
            global.flappyBird.print(); 
            getReadyMessage.print();
            
            global.background.update();
            global.ground.update();
        }
    },

    GAME: {

        start()
        {
            global.score = newScore();
        },

        click()
        {
            global.flappyBird.jump();
        },
       
        update ()
        {
            
            global.background.print();
            global.pipe.print(); 
            global.ground.print();
            global.flappyBird.print(); 
            global.score.print();
            
            global.pipe.update();
            global.flappyBird.update();
            global.ground.update();
            global.background.update();
            global.score.update();
        }
    },

    GAMEOVER: {

        start()
        {
            
        },

        click()
        {
            //changeScene(Scenes.MENU);
        },

        update ()
        {
            gameOverMessage.print();
        }
    }
}