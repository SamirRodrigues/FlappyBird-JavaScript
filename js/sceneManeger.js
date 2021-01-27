
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

            global.ground.update();
            global.background.update();
        }
    },

    GAME: {

        start()
        {
            
        },

        click()
        {
            global.flappyBird.jump();
        },
       
        update ()
        {
            
            global.background.print();
            global.ground.print();
            global.flappyBird.print(); 
            
            global.flappyBird.update();
            global.ground.update();
            global.background.update();
        }
    },

    GAMEOVER: {

        start()
        {
            
        },

        click()
        {
            changeScene(Scenes.GAME);
        },

        update ()
        {

        }
    }
}