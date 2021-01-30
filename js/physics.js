function groundCollision(flappyBird, collider)
{
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const flappyBirdX = flappyBird.y + flappyBird.width;

    if(flappyBirdX >= collider.x && flappyBirdY >= collider.y)  
    {
        return true;
    }

    return false;
}


function pipeCollision(flappyBird, collider)
{
    const flappyBirdMinimumY = flappyBird.y; // Cabeça do Pássaro
    const flappyBirdMaximumY = flappyBird.y + flappyBird.height; // Pé do Pássaro
    const flappyBirdX = flappyBird.x + flappyBird.width; // Bico do Pássaro

    
    if(flappyBirdX >= collider.x) 
    {
        if(flappyBirdMinimumY <= collider.skyPipe.y)
        {                        
            return true
        }

        if(flappyBirdMaximumY >= collider.groundPipe.y)
        {
            return true;
        }
    }    
   
    return false;
}