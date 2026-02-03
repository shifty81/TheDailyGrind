/**
 * Building Class
 * Represents a building or structure in the game
 */
class Building {
    static TYPES = {
        HOUSE: {
            name: 'House',
            width: 1,
            height: 1,
            buildHeight: 40,
            topColor: '#8b4513',
            leftColor: '#654321',
            rightColor: '#7a3d0f',
            sprite: 'house' // Use house sprite
        },
        TOWER: {
            name: 'Tower',
            width: 1,
            height: 1,
            buildHeight: 60,
            topColor: '#696969',
            leftColor: '#505050',
            rightColor: '#5a5a5a',
            sprite: 'building_iso' // Use iso building sprite
        },
        WAREHOUSE: {
            name: 'Warehouse',
            width: 2,
            height: 2,
            buildHeight: 30,
            topColor: '#a0522d',
            leftColor: '#8b4513',
            rightColor: '#964b1a',
            sprite: 'treehouse' // Use treehouse sprite for warehouse
        },
        // Structure types
        WALL_WOOD: {
            name: 'Wooden Wall',
            width: 1,
            height: 1,
            buildHeight: 48,
            structureType: 'wall',
            material: 'wood',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 0,
            walkable: false,
            blocksVision: true,
            health: 100
        },
        WALL_STONE: {
            name: 'Stone Wall',
            width: 1,
            height: 1,
            buildHeight: 48,
            structureType: 'wall',
            material: 'stone',
            spriteSheet: 'walls_rubble',
            spriteIndex: 0,
            walkable: false,
            blocksVision: true,
            health: 200
        },
        WALL_BRICK: {
            name: 'Brick Wall',
            width: 1,
            height: 1,
            buildHeight: 48,
            structureType: 'wall',
            material: 'brick',
            spriteSheet: 'walls_rubble',
            spriteIndex: 8,
            walkable: false,
            blocksVision: true,
            health: 150
        },
        DOOR_WOOD: {
            name: 'Wooden Door',
            width: 1,
            height: 1,
            buildHeight: 48,
            structureType: 'door',
            material: 'wood',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 3,
            walkable: true,
            blocksVision: false,
            canOpen: true,
            health: 80
        },
        WINDOW_GLASS: {
            name: 'Glass Window',
            width: 1,
            height: 1,
            buildHeight: 32,
            structureType: 'window',
            material: 'glass',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 6,
            walkable: false,
            blocksVision: false,
            health: 30
        },
        STAIRS_WOOD: {
            name: 'Wooden Stairs',
            width: 1,
            height: 1,
            buildHeight: 32,
            structureType: 'stairs',
            material: 'wood',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 8,
            walkable: true,
            blocksVision: false,
            connectsFloors: true,
            health: 100
        },
        LADDER_WOOD: {
            name: 'Wooden Ladder',
            width: 1,
            height: 1,
            buildHeight: 48,
            structureType: 'ladder',
            material: 'wood',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 9,
            walkable: true,
            blocksVision: false,
            climbable: true,
            connectsFloors: true,
            health: 80
        },
        HATCH_WOOD: {
            name: 'Wooden Hatch',
            width: 1,
            height: 1,
            buildHeight: 8,
            structureType: 'hatch',
            material: 'wood',
            spriteSheet: 'greenlands_structures',
            spriteIndex: 3,  // Reuses door sprite as hatches are similar to horizontal doors
            walkable: true,
            blocksVision: false,
            canOpen: true,
            connectsFloors: true,
            health: 60
        }
    };
    
    constructor(x, y, type = Building.TYPES.HOUSE, assetLoader = null) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.constructed = true;
        this.health = 100;
        this.assetLoader = assetLoader;
    }
    
    /**
     * Render building
     */
    render(renderer, camera, isometricRenderer, tileScreenPos) {
        if (!this.constructed) return;
        
        // Check if this is a structure type (wall, door, window, etc.)
        if (this.type.spriteSheet && this.type.spriteIndex !== undefined) {
            // Use sprite sheet rendering for structures
            if (this.assetLoader) {
                const spriteSheet = this.assetLoader.getSpriteSheet(this.type.spriteSheet);
                if (spriteSheet) {
                    const sprite = spriteSheet.getSprite(this.type.spriteIndex);
                    if (sprite) {
                        const spriteX = tileScreenPos.x - sprite.width / 2 - camera.x;
                        const spriteY = tileScreenPos.y - sprite.height + 16 - camera.y;
                        
                        renderer.ctx.drawImage(
                            sprite.image,
                            sprite.sx,
                            sprite.sy,
                            sprite.width,
                            sprite.height,
                            spriteX,
                            spriteY,
                            sprite.width,
                            sprite.height
                        );
                        return;
                    }
                }
            }
        }
        
        // Try to use sprite if available (for traditional buildings)
        let buildingSprite = null;
        if (this.assetLoader && this.type.sprite) {
            buildingSprite = this.assetLoader.getImage(this.type.sprite);
        }
        
        if (buildingSprite) {
            // Draw building sprite centered on tile
            const GROUND_ALIGNMENT_OFFSET = 16; // Offset to align sprite base with ground
            const spriteX = tileScreenPos.x - buildingSprite.width / 2 - camera.x;
            const spriteY = tileScreenPos.y - buildingSprite.height + GROUND_ALIGNMENT_OFFSET - camera.y;
            renderer.drawImage(
                buildingSprite,
                spriteX,
                spriteY,
                buildingSprite.width,
                buildingSprite.height
            );
        } else {
            // Fallback to isometric cube rendering
            isometricRenderer.drawIsometricCube(
                tileScreenPos.x,
                tileScreenPos.y,
                64, // tileWidth
                32, // tileHeight
                this.type.buildHeight,
                this.type.topColor,
                this.type.leftColor,
                this.type.rightColor,
                camera
            );
        }
    }
    
    /**
     * Get building info
     */
    getInfo() {
        return {
            name: this.type.name,
            position: { x: this.x, y: this.y },
            health: this.health
        };
    }
}
