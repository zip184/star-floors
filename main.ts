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

interface Point {
    x: number;
    y: number;
}

// Constants
const swordSwingTime = 240;
const movementSpeed = 80;
const ballSpeed = 120;

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
        
        player.setImage(getImageFromDirection(dir, images));

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

const controlSaber = (player: Sprite, movementControls: MovementControls) => {

    // Sword state
    let sword : Sprite;
    let isSwinging = false;

    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        if (isSwinging) {
            return;
        }

        // Create sword based on positions
        sword = sprites.create(getImageFromDirection(movementControls.getCurrentDirection(), saberImages), SpriteKind.Projectile);
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

const controlKnob = (player: Sprite, movementControls: MovementControls, barsTileLocations: Point[]) => {
    // State
    let knob : Sprite;
    let isThrowing = false; // Ball is moving
    let isReturning = false; // Ball has bounced and is returning

    const throwKnob = () => {
        knob = sprites.createProjectileFromSprite(assets.image`knob`, player, -50, 0);
        knob.setFlag(SpriteFlag.BounceOnWall, true);
        knob.setFlag(SpriteFlag.DestroyOnWall, false);
        knob.setFlag(SpriteFlag.AutoDestroy, false);

        // Set knob velocity
        let vx = 0, vy = 0;
        switch(movementControls.getCurrentDirection()) {
            case Direction.UP:
                vy = -ballSpeed;
                break;
            case Direction.DOWN:
                vy = ballSpeed;
                break;
            case Direction.LEFT:
                vx = -ballSpeed;
                break;
            case Direction.RIGHT:
                vx = ballSpeed;
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
    
    // On bounce
    scene.onHitWall(SpriteKind.Projectile, function(sprite: Sprite, location: tiles.Location) {
        if (knob && sprite === knob) {
            isReturning = true;
        }

        for (let i=0; i < barsTileLocations.length; i++) {
            if (location.x === barsTileLocations[i].x && location.y === barsTileLocations[i].y) {
                console.log('hit bars ');
                return;
            }
        }

        console.log('hit wall ' + location.x + ', ' + location.y);
    });

    // On catch
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function(sprite: Sprite, otherSprite: Sprite) {
        if (isReturning && sprite === player && otherSprite === knob) {
            knob.destroy();
            isReturning = false;
            isThrowing = false;
        }
    });


};

const startFloor1 = () => {
    // Constants
    const barsTileLocations : Point[] = [{x: 9, y: 4},{x: 9, y: 5}];

    tiles.setTilemap(tilemap`floor1`);

    // Level State
    let yodaHasSaber = false;
    let yodaHasKnob = false;

    const yoda = sprites.create(yodaImages.down, SpriteKind.Player);
    yoda.x = 50;
    yoda.y = 50;

    const saber = sprites.create(assets.image`saberItem`, SpriteKind.Food);
    saber.x = 87;
    saber.y = 50;

    const knobItem = sprites.create(assets.image`knob`, SpriteKind.Food);
    knobItem.x = 87;
    knobItem.y = 80;

    const movementControls : MovementControls = controlMovement(yoda, yodaImages);
          
    scene.cameraFollowSprite(yoda);
    
    // Pickup items
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
        if (sprite === yoda && otherSprite === saber) {
            yodaHasSaber = true;
            controlSaber(yoda, movementControls);
            otherSprite.destroy();
        }

        if (sprite === yoda && otherSprite === knobItem) {
            yodaHasKnob = true;
            controlKnob(yoda, movementControls, barsTileLocations);
            knobItem.destroy();
        }
    });

    game.splash("Floor #1");
};

// Main

scene.setBackgroundImage(starsBg);
game.splash("STAR FLOORS!", "Help Maybe Yoda Escape!");
game.splash("May the FLOORS", "be with you!");


startFloor1();
