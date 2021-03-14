// Types
enum Direction {
    UP, DOWN, LEFT, RIGHT
};

interface DirectionalImages {
    up: Image;
    down: Image;
    left: Image;
    right: Image;
}

interface MovementControls {
    setMovementEnabled: (enabled: boolean) => void;
    getCurrentDirection: () => Direction;
}

// Constants
const swordSwingTime = 240;
const movementSpeed = 100;

// Images
const starsBg = assets.image`starsBg`;

let yodaImages = <DirectionalImages>{
    up: assets.image`yodaUp`,
    down: assets.image`yodaDown`,
    left: assets.image`yodaLeft`,
    right: assets.image`yodaRight`,
};

let saberImages = <DirectionalImages>{
    up: assets.image`swordUp`,
    down: assets.image`swordDown`,
    left: assets.image`swordLeft`,
    right: assets.image`swordRight`,
};

const controlMovement = (player: Sprite, images: DirectionalImages) : MovementControls => {
    // State
    let movementEnabled = true;
    let currentDirection = Direction.DOWN;

    const getDirectionFromMovement = () => {
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

        let image = images.down;
        switch(dir) {
            case Direction.UP:
                image = images.up;
                break;
            case Direction.DOWN:
                image = images.down;
                break;
            case Direction.LEFT:
                image = images.left;
                break;
            case Direction.RIGHT:
                image = images.right;
                break;
        }
        player.setImage(image);

        currentDirection = dir;
    };

    const setVelocityFromControls = () => {
        let vx = 0;
        let vy = 0;

        if (movementEnabled) {
            if (controller.up.isPressed()) vy -= movementSpeed;
            if (controller.down.isPressed()) vy += movementSpeed;
            if (controller.left.isPressed()) vx -= movementSpeed;
            if (controller.right.isPressed()) vx += movementSpeed;
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

    return <MovementControls>{
        setMovementEnabled,
        getCurrentDirection: () => currentDirection,
    };
};

const controlSaber = (
        player: Sprite,
        movementControls: MovementControls,
    ) => {

    // Sword state
    let sword : Sprite;
    let isSwinging = false;

    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        if (isSwinging) {
            return;
        }

        // Create sword based on positions
        let saberImg : Image;
        let dx = 0, dy = 0;
        switch(movementControls.getCurrentDirection()) {
            case Direction.UP:
                saberImg = saberImages.up;
                dy = -player.height;
                break;
            case Direction.DOWN:
                saberImg = saberImages.down;
                dy = player.height;
                break;
            case Direction.LEFT:
                saberImg = saberImages.left;
                dx = -player.width;
                break;
            case Direction.RIGHT:
                dx = player.width;
                saberImg = saberImages.right;
                break;
            default:
                console.error("Bad direction");
                return;
        }
        
        sword = sprites.create(saberImg, SpriteKind.Projectile);
        sword.setPosition(player.x + dx, player.y + dy);
        isSwinging = true;
        movementControls.setMovementEnabled(false);

        setTimeout(function() {
            sword.destroy();
            isSwinging = false;
            movementControls.setMovementEnabled(true);
        }, swordSwingTime);
    });
};

const startFloor1 = () => {
    tiles.setTilemap(tilemap`floor1`);

    // Level State
    let yodaHasSaber = false;

    const yoda = sprites.create(yodaImages.down, SpriteKind.Player);
    yoda.x = 50;
    yoda.y = 50;

    const saber = sprites.create(assets.image`saberItem`, SpriteKind.Food);
    saber.x = 120;
    saber.y = 50;

    const movementControls : MovementControls = controlMovement(yoda, yodaImages);
          
    scene.cameraFollowSprite(yoda);
    
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
        if (sprite === yoda && otherSprite === saber) {
            yodaHasSaber = true;
            controlSaber(yoda, movementControls);
            otherSprite.destroy();
        }
    });

    //game.splash("Floor #1");
};

// Main
/*
scene.setBackgroundImage(starsBg);
game.splash("STAR FLOORS!", "Help Maybe Yoda Escape!");
game.splash("May the FLOORS", "be with you!");
*/

startFloor1();
