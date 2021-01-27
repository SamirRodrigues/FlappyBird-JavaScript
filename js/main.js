function loop () 
{    
    currentScene.update();

    countFrames += 1;
    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if(currentScene.click) {
      currentScene.click();
    }
  });

changeScene(Scenes.MENU);
loop();