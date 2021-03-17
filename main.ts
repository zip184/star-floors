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

    const saber = sprites.create(assets.image`saberItem`, SpriteKind.Item);
    saber.x = 87;
    saber.y = 50;

    const knobItem = sprites.create(assets.image`knob`, SpriteKind.Item);
    knobItem.x = 87;
    knobItem.y = 80;

    const movementControls : MovementControls = controlPlayerMovement(yoda, yodaImages);
    
    scene.cameraFollowSprite(yoda);
    
    // Pickup items
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function(sprite: Sprite, otherSprite: Sprite) {
        if (sprite === yoda && otherSprite === saber) {
            yodaHasSaber = true;
            controlSaberMovement(yoda, movementControls);
            otherSprite.destroy();
        }

        if (sprite === yoda && otherSprite === knobItem) {
            yodaHasKnob = true;
            controlKnobMovement(yoda, movementControls, barsTileLocations);
            knobItem.destroy();
        }
    });

    // On bars touch
    const pushBackYoda = function(sprite: Sprite, location: tiles.Location) {
        if (sprite !== yoda) {
            yoda.x -= 1;
        }
    };
    scene.onOverlapTile(SpriteKind.Player, assets.tile`rightBottomBars`, pushBackYoda);
    scene.onOverlapTile(SpriteKind.Player, assets.tile`rightTopBars`, pushBackYoda);

    

    //game.splash("Floor #1");
};

// Main

scene.setBackgroundImage(starsBg);
//game.splash("STAR FLOORS!", "Help Maybe Yoda Escape!");
//game.splash("May the FLOORS", "be with you!");


startFloor1();
