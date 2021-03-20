// Images
const starsBg = assets.image`starsBg`;

const yodaImages = <DirectionalImages>{
    up: assets.image`yodaUp`,
    down: assets.image`yodaDown`,
    left: assets.image`yodaLeft`,
    right: assets.image`yodaRight`,
};

const saberImages = <DirectionalImages>{
    up: assets.image`swordUp`,
    down: assets.image`swordDown`,
    left: assets.image`swordLeft`,
    right: assets.image`swordRight`,
};

const rockImages: Image[] = [
    assets.image`rock0`,
    assets.image`rock1`,
    assets.image`rock2`,
];

// Main
scene.setBackgroundImage(starsBg);
//game.splash("STAR FLOORS!", "Help Maybe Yoda Escape!");
//game.splash("May the FLOORS", "be with you!");

floor1.start(() => {
    game.splash("Maybe Yoda Escaped!");
});