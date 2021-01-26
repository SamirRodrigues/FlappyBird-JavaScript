function start()
{
    currentScene.start();
}

function loop () 
{    
    currentScene.update();
    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if(currentScene.click) {
      currentScene.click();
    }
  });

changeScene(Scenes.MENU);
start();
loop();