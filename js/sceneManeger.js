
let currentScene = {};

function changeScene(newScene){
    currentScene = newScene;
}

const Scenes = {
    MENU: {

        start() 
        {
            
        },
        
        click()
        {
            changeScene(Scenes.GAME);
        },

        update ()
        {
            background.print();
            ground.print();
            flappyBird.print(); 
            getReadyMessage.print();
        }
    },

    GAME: {

        start()
        {
            
        },

        click()
        {
            changeScene(Scenes.GAME);
        },
       
        update ()
        {
            flappyBird.update();

            background.print();
            ground.print();
            flappyBird.print(); 

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