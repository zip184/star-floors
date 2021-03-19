const controlKnobMovement = (
    player: Sprite, movementControls: MovementControls, 
    barsTileLocations: Point[]
) : Sprite => {
        
    // State
    let knob : Sprite;
    let isThrowing = false; // Ball is moving
    let isReturning = false; // Ball has bounced and is returning

    const throwKnob = () => {
        knob = sprites.createProjectileFromSprite(assets.image`knob`, player, 0, 0);
        knob.setFlag(SpriteFlag.BounceOnWall, true);
        knob.setFlag(SpriteFlag.DestroyOnWall, false);
        knob.setFlag(SpriteFlag.AutoDestroy, false);

        // Set knob velocity
        let vx = 0, vy = 0;
        switch(movementControls.getCurrentDirection()) {
            case Direction.UP:
                vy = -BALL_SPEED;
                break;
            case Direction.DOWN:
                vy = BALL_SPEED;
                break;
            case Direction.LEFT:
                vx = -BALL_SPEED;
                break;
            case Direction.RIGHT:
                vx = BALL_SPEED;
                break;
        }
        knob.vx = vx;
        knob.vy = vy;

        isThrowing = true;
    }

    // Throw knob
    controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
        if (isThrowing) {
            // Ball is already moving
            return;
        }
        
        throwKnob();
    });

    scene.onHitWall(SpriteKind.Projectile, function(sprite: Sprite, location: tiles.Location) {
        if (knob && sprite === knob) {
            isReturning = true;
        }
    });

    // On catch
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function(sprite: Sprite, otherSprite: Sprite) {
        if (isReturning && sprite === player && otherSprite === knob) {
            knob.destroy();
            isReturning = false;
            isThrowing = false;
        }
    });

    return knob;
};