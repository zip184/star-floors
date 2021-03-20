interface SmashableControls {
    sprite: Sprite;
    smash: (health: number) => void;
    getHealth: () => number;
    isDestroyed: () => boolean;
}

const createSmashable = (images: Image[], health: number) : SmashableControls => {
    // State
    let currentHealth = health; // Current health of smashable
    let imgIndex: number; // Last calculated image index

    const totalHealth = health;

    const calcImageIndex = () => {
        const factor = currentHealth / totalHealth;
        return Math.ceil(images.length - factor * images.length);
    };

    // Calc initial index
    imgIndex = calcImageIndex();

    const sprite = sprites.create(images[0], SpriteKind.Smashable);

    const getHealth = () => currentHealth;

    const smash = (health: number) => {
        currentHealth -= health;
        const newIndex = calcImageIndex();

        if (newIndex != imgIndex) {
            imgIndex = newIndex;
            sprite.setImage(images[imgIndex]);
        }

        if (currentHealth <= 0) {
            sprite.destroy();
            music.smallCrash.play();
        } else {
            music.zapped.play();
        }
    };

    const isDestroyed = () => currentHealth <= 0;

    return <SmashableControls>{
        getHealth,
        smash,
        sprite,
        isDestroyed
    };
};