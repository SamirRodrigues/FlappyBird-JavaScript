
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
        },
        
        click()
        {
            changeScene(Scenes.GAME);
        },

        update ()
        {
            background.print();
            ground.print();
            global.flappyBird.print(); 
            getReadyMessage.print();
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
            global.flappyBird.update();

            background.print();
            ground.print();
            global.flappyBird.print(); 

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