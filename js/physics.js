function collision(flappyBird, collider)
{
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const flappyBirdX = flappyBird.y + flappyBird.width;

    if(flappyBirdX >= collider.x && flappyBirdY >= collider.y)  
    {
        return true;
    }

    return false;
}