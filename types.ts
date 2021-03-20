enum Direction {
    UP, DOWN, LEFT, RIGHT
};

interface DirectionalImages {
    up: Image;
    down: Image;
    left: Image;
    right: Image;
}

interface Point {
    x: number;
    y: number;
}

namespace SpriteKind {
    export const Item = SpriteKind.create();
    export const Melee = SpriteKind.create();
    export const Smashable = SpriteKind.create();
}

interface Floor {
    start: (onFinish: () => void) => void;
}
