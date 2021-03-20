interface SmashableControls {
    smash: (health: number) => void;
    getHealth: () => number;
    getImage: () => Image;
}

const createSmashable = (images: Image[], health: number) : SmashableControls => {
    
    const totalHealth = health;
    let currentHealth = health;

    const getImage = () => {
        const factor = currentHealth / totalHealth;
        const imgIndex = Math.trunc(factor * totalHealth);
        return images[imgIndex];
    };

    const getHealth = () => currentHealth;

    const smash = (health: number) => currentHealth -= health;

    return <SmashableControls>{
        getImage,
        getHealth,
        smash,
    };
};