function loop () 
{    
    currentScene.update();

    countFrames += 1;
    if(countFrames % 100 === 0 && currentScene === Scenes.GAME)
    {
      count += 1;
    }
    if(currentScene === Scenes.MENU || currentScene === Scenes.GAMEOVER) { count = 0;}
    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if(currentScene.click) {
      currentScene.click();
    }
  });

changeScene(Scenes.MENU);
loop();