// Constants
const SWORD_SWING_TIME = 240;
const MOVEMENT_SPEED = 80;
const BALL_SPEED = 120;

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

// Main
scene.setBackgroundImage(starsBg);
game.splash("STAR FLOORS!", "Help Maybe Yoda Escape!");
game.splash("May the FLOORS", "be with you!");

floor1.start(() => {
    game.splash("Maybe Yoda Escaped!");
});