function loop () 
{
    background.print();
    ground.print();
    flappyBird.print();

    flappyBird.y = flappyBird.y + 1;

    requestAnimationFrame(loop);
}

loop();