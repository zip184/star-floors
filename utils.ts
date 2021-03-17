// Returns the position adjacent to the sprite in the specified direction
const getAdjacentPos = (sprite: Sprite, direction: Direction) : Point  => {
    let dx = 0, dy = 0;
    switch(direction) {
        case Direction.UP:
            dy = -sprite.height;
            break;
        case Direction.DOWN:
            dy = sprite.height;
            break;
        case Direction.LEFT:
            dx = -sprite.width;
            break;
        case Direction.RIGHT:
            dx = sprite.width;
            break;
        default:
            console.error("getAdjacentPos: Bad direction");
            return null;
    }

    return <Point>{
        x: sprite.x + dx,
        y: sprite.y + dy,
    };
};

const getImageFromDirection = (direction: Direction, images: DirectionalImages) : Image => {
    let image = images.down;

    switch(direction) {
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

    return image;
};

const areSameLocation = (loc1: tiles.Location, loc2: tiles.Location): boolean =>
    loc1.x === loc2.x && loc1.y === loc2.y;