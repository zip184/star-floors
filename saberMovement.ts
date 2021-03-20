const controlSaberMovement = (
    player: Sprite, 
    movementControls: MovementControls, 
    onStrikeSprite?: (sprite: Sprite) => void
) => {
    // Sword state
    let sword : Sprite;
    let isSwinging = false;
    let didHitSomethingOnSwing = false;

    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        if (isSwinging) {
            return;
        }

        // Create sword based on positions
        sword = sprites.create(getImageFromDirection(movementControls.getCurrentDirection(), saberImages), SpriteKind.Melee);
        const swordPos = getAdjacentPos(player, movementControls.getCurrentDirection());
        sword.setPosition(swordPos.x, swordPos.y);
        isSwinging = true;
        didHitSomethingOnSwing = false;
        movementControls.setMovementEnabled(false);

        setTimeout(function() {
            sword.destroy();
            isSwinging = false;
            movementControls.setMovementEnabled(true);
        }, SWORD_SWING_TIME);

        if (onStrikeSprite) {
            sprites.onOverlap(SpriteKind.Melee, SpriteKind.Smashable, function(sprite: Sprite, otherSprite: Sprite) {
                if (sprite !== sword) {
                    return;
                }

                if (!didHitSomethingOnSwing) { // Only 1 hit per strike
                    onStrikeSprite(otherSprite);
                    didHitSomethingOnSwing = true;
                }
            });
        }
    });
};