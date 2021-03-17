const controlSaberMovement = (player: Sprite, movementControls: MovementControls) => {
    // Sword state
    let sword : Sprite;
    let isSwinging = false;

    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        if (isSwinging) {
            return;
        }

        // Create sword based on positions
        sword = sprites.create(getImageFromDirection(movementControls.getCurrentDirection(), saberImages), SpriteKind.Melee);
        const swordPos = getAdjacentPos(player, movementControls.getCurrentDirection());
        sword.setPosition(swordPos.x, swordPos.y);
        isSwinging = true;
        movementControls.setMovementEnabled(false);

        setTimeout(function() {
            sword.destroy();
            isSwinging = false;
            movementControls.setMovementEnabled(true);
        }, swordSwingTime);
    });
};