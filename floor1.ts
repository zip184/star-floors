const floor1 = <Floor>{
    start: function(onFinish)  {
        // Constants
        const barsTileLocations : Point[] = [{x: 9, y: 4},{x: 9, y: 5}];

        tiles.setTilemap(tilemap`floor1`);

        // Level State
        let yodaHasSaber = false;
        let yodaHasKnob = false;
        let cellLockIsOn = true;
        let knobProjectile: Sprite = null;

        let onSaberStrike: (sprite: Sprite) => void;

        const saber = sprites.create(assets.image`saberItem`, SpriteKind.Item);
        saber.x = 40;
        saber.y = 230;
        //saber.x = 22;
        //saber.y = 22;

        const knobItem = sprites.create(assets.image`knob`, SpriteKind.Item);
        knobItem.x = 136;
        knobItem.y = 25;

        // Setup smashable rock
        const rockControls: SmashableControls = createSmashable(rockImages, 7);
        const rock = rockControls.sprite;
        rock.x = 182;
        rock.y = 200;
        onSaberStrike = (sprite: Sprite) => {
            rockControls.smash(1); 
        };

        // Create Yoda
        const yoda = sprites.create(yodaImages.down, SpriteKind.Player);
        yoda.x = 50;
        yoda.y = 50;
        const yodaMovementControls : MovementControls = controlPlayerMovement(yoda, yodaImages);
        scene.cameraFollowSprite(yoda);
        
        // Pickup items
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function(sprite: Sprite, otherSprite: Sprite) {
            if (sprite === yoda && otherSprite === saber) {
                yodaHasSaber = true;
                controlSaberMovement(yoda, yodaMovementControls, onSaberStrike);
                otherSprite.destroy();
                music.powerUp.play();
                yoda.say('I slash with A', 2400);
            }

            if (sprite === yoda && otherSprite === knobItem) {
                yodaHasKnob = true;
                knobProjectile = controlKnobMovement(yoda, yodaMovementControls, barsTileLocations);
                knobItem.destroy();
                yoda.say('I throw with B', 2400);
                music.thump.play();
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
                music.powerUp.play();
            }
        });

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Smashable, function(sprite: Sprite, otherSprite: Sprite) {
            if (sprite === yoda) {
                yodaMovementControls.pushBack();
            }
        });

        // Finish level
        scene.onOverlapTile(SpriteKind.Player, assets.tile`exitStairs`, function(sprite: Sprite, location: tiles.Location) {
            if (sprite === yoda) {
                onFinish();
            };
        });

        //game.splash("Floor #1");
        //yoda.say("What's that?", 1200);
    }
};