const floor1 = <Floor>{
    start: function()  {
        // Constants
        const barsTileLocations : Point[] = [{x: 9, y: 4},{x: 9, y: 5}];

        tiles.setTilemap(tilemap`floor1`);

        // Level State
        let yodaHasSaber = false;
        let yodaHasKnob = false;
        let cellLockIsOn = true;
        let knobProjectile: Sprite = null;

        const yoda = sprites.create(yodaImages.down, SpriteKind.Player);
        yoda.x = 50;
        yoda.y = 50;

        const saber = sprites.create(assets.image`saberItem`, SpriteKind.Item);
        //saber.x = 184;
        //saber.y = 200;
        saber.x = 22;
        saber.y = 22;

        const knobItem = sprites.create(assets.image`knob`, SpriteKind.Item);
        knobItem.x = 136;
        knobItem.y = 25;

        const rockControls: SmashableControls = createSmashable(rockImages, 10);
        const rock = sprites.create(rockImages[0], SpriteKind.Smashable);
        rock.x = 35;
        rock.y = 80;

        const yodaMovementControls : MovementControls = controlPlayerMovement(yoda, yodaImages);
        
        scene.cameraFollowSprite(yoda);
        
        // Pickup items
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function(sprite: Sprite, otherSprite: Sprite) {
            if (sprite === yoda && otherSprite === saber) {
                yodaHasSaber = true;
                controlSaberMovement(yoda, yodaMovementControls);
                otherSprite.destroy();
            }

            if (sprite === yoda && otherSprite === knobItem) {
                yodaHasKnob = true;
                knobProjectile = controlKnobMovement(yoda, yodaMovementControls, barsTileLocations);
                knobItem.destroy();
            }
        });

        // On bars touch
        const pushBackYoda = function(sprite: Sprite, location: tiles.Location) {
            if (sprite === yoda && cellLockIsOn) {
                yodaMovementControls.pushBack();
            }
        };
        scene.onOverlapTile(SpriteKind.Player, assets.tile`rightBottomBars`, pushBackYoda);
        scene.onOverlapTile(SpriteKind.Player, assets.tile`rightTopBars`, pushBackYoda);
        
        // Switch code
        const switchLocation = tiles.getTilesByType(assets.tile`switchOnLeft`)[0];
        scene.onHitWall(SpriteKind.Projectile, function(sprite: Sprite, location: tiles.Location) {
            if (!cellLockIsOn) {
                return;
            }

            if (areSameLocation(location, switchLocation)) {
                cellLockIsOn = false;
                
                // Flip switch tile to off
                tiles.setTileAt(switchLocation, assets.tile`switchOffLeft`);

                // Open cell doors
                const topCell = tiles.getTilesByType(assets.tile`rightTopBars`)[0];
                tiles.setTileAt(topCell, assets.tile`rightTopBarsOpen`);
                const bottomCell = tiles.getTilesByType(assets.tile`rightBottomBars`)[0];
                tiles.setTileAt(bottomCell, assets.tile`rightBottomBarsOpen`);
            }
        });

        sprites.onOverlap(SpriteKind.Melee, SpriteKind.Smashable, function(sprite: Sprite, otherSprite: Sprite) {
            console.log('hit');
        });

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Smashable, function(sprite: Sprite, otherSprite: Sprite) {
            console.log('player hit');
        });

        //game.splash("Floor #1");
        //yoda.say("What's that?", 1200);
    }
};