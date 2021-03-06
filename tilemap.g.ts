// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "floor1":
            case "level1":return tiles.createTilemap(hex`1000100002020202020202020202020202020202020101010101010101020202020202020201010101010101010201010202020202010101010101010103010105020202020101010101010101040101020202020201010101010101010201010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020101010101010101010101020202020201010101010101010101010202020202010101020202020202020102020202020101010202020202020101010202020201010102020202020201060102020202020202020202020202020202020202`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 2 2 2 2 2 2 
2 . . . . . . . . 2 . . 2 2 2 2 
2 . . . . . . . . . . . 2 2 2 2 
2 . . . . . . . . . . . 2 2 2 2 
2 . . . . . . . . 2 . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 
2 . . . . . . . . . . . 2 2 2 2 
2 . . . . . . . . . . . 2 2 2 2 
2 . . . 2 2 2 2 2 2 2 . 2 2 2 2 
2 . . . 2 2 2 2 2 2 . . . 2 2 2 
2 . . . 2 2 2 2 2 2 . . . 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight2,myTiles.tile2,myTiles.tile1,myTiles.tile3,myTiles.tile4,myTiles.tile9], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Wall":
            case "tile2":return tile2;
            case "rightBottomBars":
            case "tile3":return tile3;
            case "rightTopBars":
            case "tile1":return tile1;
            case "switchOnLeft":
            case "tile4":return tile4;
            case "switchOffLeft":
            case "tile5":return tile5;
            case "rightBottomBarsOpen":
            case "tile7":return tile7;
            case "rightTopBarsOpen":
            case "tile6":return tile6;
            case "exitStairs":
            case "tile9":return tile9;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
