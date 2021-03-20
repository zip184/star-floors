interface MovementControls {
    setMovementEnabled: (enabled: boolean) => void;
    getCurrentDirection: () => Direction;
    pushBack: () => void;
}

const controlPlayerMovement = (player: Sprite, images: DirectionalImages) : MovementControls => {
    // State
    let movementEnabled = true;
    let currentDirection = Direction.DOWN;

    const getDirectionFromMovement = (): Direction | undefined => {
        const { vx, vy } = player;

        if (vx && !vy) {
            return vx > 0 ? Direction.RIGHT : Direction.LEFT;
        }
        if (!vx && vy) {
            return vy > 0 ? Direction.DOWN : Direction.UP;
        }

        return undefined;
    };

    const setDirection = (suggestedDirection?: Direction) => {
        let dir = getDirectionFromMovement();
        if (dir === undefined) {
            dir = suggestedDirection;
            if (suggestedDirection === undefined) {
                dir = currentDirection;
            }
        }
        
        player.setImage(getImageFromDirection(dir, images));

        currentDirection = dir;
    };

    const setVelocityFromControls = () => {
        let vx = 0;
        let vy = 0;

        if (movementEnabled) {
            if (controller.up.isPressed()) vy -= MOVEMENT_SPEED;
            if (controller.down.isPressed()) vy += MOVEMENT_SPEED;
            if (controller.left.isPressed()) vx -= MOVEMENT_SPEED;
            if (controller.right.isPressed()) vx += MOVEMENT_SPEED;
        }

        player.vx = vx;
        player.vy = vy;
    };

    // Key events
    // Up
    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        setVelocityFromControls();
        setDirection(Direction.UP);
    });
    controller.up.onEvent(ControllerButtonEvent.Released, function() {
        setVelocityFromControls();
        setDirection();
    });
    
    // Down
    controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
        setVelocityFromControls();
        setDirection(Direction.DOWN);
    });
    controller.down.onEvent(ControllerButtonEvent.Released, function() {
        setVelocityFromControls();
        setDirection();
    });
    
    // Left
    controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
        setVelocityFromControls();
        setDirection(Direction.LEFT);
    });
    controller.left.onEvent(ControllerButtonEvent.Released, function() {
        setVelocityFromControls();
        setDirection();
    });

    // Right
    controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
        setVelocityFromControls();
        setDirection(Direction.RIGHT);
    });
    controller.right.onEvent(ControllerButtonEvent.Released, function() {
        setVelocityFromControls();
        setDirection();
    });

    const setMovementEnabled = (enabled: boolean) => {
        movementEnabled = enabled;
        setVelocityFromControls();
    };

    const pushBack = () => {
        if (player.vx > 0) {
            player.x -= PUSH_BACK_DISTANCE;
            player.vx = 0;
        } else if (player.vx < 0) {
            player.x += PUSH_BACK_DISTANCE;
            player.vx = 0;
        }

        if (player.vy > 0) {
            player.y -= PUSH_BACK_DISTANCE;
            player.vy = 0;
        } else if (player.vy < 0) {
            player.y += PUSH_BACK_DISTANCE;
            player.vy = 0;
        }

        player.say("Won't Budge!", 800);
    }

    return <MovementControls>{
        setMovementEnabled,
        getCurrentDirection: () => currentDirection,
        pushBack,
    };
};