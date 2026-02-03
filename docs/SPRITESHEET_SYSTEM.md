# SpriteSheet System Reference

## Overview
The SpriteSheet class provides efficient extraction and rendering of individual sprites from larger sprite sheet images.

## Class: SpriteSheet

### Constructor
```javascript
new SpriteSheet(image, spriteWidth, spriteHeight, cols, rows)
```

**Parameters:**
- `image` (HTMLImageElement): The sprite sheet image
- `spriteWidth` (number): Width of each sprite in pixels
- `spriteHeight` (number): Height of each sprite in pixels
- `cols` (number): Number of columns in the sprite sheet
- `rows` (number): Number of rows in the sprite sheet

**Example:**
```javascript
const image = assetLoader.getImage('walls_rubble');
const spriteSheet = new SpriteSheet(image, 64, 128, 8, 8);
```

## Methods

### getSprite(index)
Get a sprite at a specific index (0-based).

**Parameters:**
- `index` (number): Sprite index in the sheet

**Returns:** Object with sprite data
```javascript
{
    image: HTMLImageElement,  // Source image
    sx: number,              // Source X coordinate
    sy: number,              // Source Y coordinate  
    width: number,           // Sprite width
    height: number,          // Sprite height
    index: number            // Original index
}
```

**Example:**
```javascript
const sprite = spriteSheet.getSprite(0);  // Get first sprite
```

### getSprites(indices)
Get multiple sprites by their indices.

**Parameters:**
- `indices` (number[]): Array of sprite indices

**Returns:** Array of sprite data objects

**Example:**
```javascript
const sprites = spriteSheet.getSprites([0, 1, 2, 3]);
```

### drawSprite(ctx, index, x, y, scale)
Draw a sprite at a specific position.

**Parameters:**
- `ctx` (CanvasRenderingContext2D): Canvas context
- `index` (number): Sprite index
- `x` (number): X position to draw
- `y` (number): Y position to draw
- `scale` (number): Optional scale factor (default: 1)

**Example:**
```javascript
spriteSheet.drawSprite(ctx, 0, 100, 100, 1.5);  // Draw at 1.5x scale
```

### createAnimation(startIndex, endIndex, frameDelay)
Create an animation sequence from a range of sprites.

**Parameters:**
- `startIndex` (number): First sprite index
- `endIndex` (number): Last sprite index
- `frameDelay` (number): Delay between frames in milliseconds (default: 100)

**Returns:** Animation object
```javascript
{
    frames: number[],        // Array of frame indices
    frameDelay: number,      // Milliseconds per frame
    currentFrame: number,    // Current frame index
    elapsedTime: number,     // Time since last frame change
    loop: boolean            // Whether to loop animation
}
```

**Example:**
```javascript
const anim = spriteSheet.createAnimation(0, 7, 150);  // 8 frames, 150ms each
```

### updateAndDrawAnimation(ctx, animation, deltaTime, x, y, scale)
Update and draw an animation.

**Parameters:**
- `ctx` (CanvasRenderingContext2D): Canvas context
- `animation` (Object): Animation object from createAnimation()
- `deltaTime` (number): Time since last frame in milliseconds
- `x` (number): X position to draw
- `y` (number): Y position to draw
- `scale` (number): Optional scale factor (default: 1)

**Example:**
```javascript
// In game loop:
spriteSheet.updateAndDrawAnimation(ctx, doorAnimation, deltaTime, 100, 100);
```

### getTotalSprites()
Get the total number of sprites in the sheet.

**Returns:** number

**Example:**
```javascript
const total = spriteSheet.getTotalSprites();  // Returns cols * rows
```

### clearCache()
Clear the internal sprite cache.

**Example:**
```javascript
spriteSheet.clearCache();
```

## Usage Examples

### Basic Sprite Extraction
```javascript
// Load sprite sheet image
const image = assetLoader.getImage('structures');

// Create sprite sheet
const sheet = new SpriteSheet(image, 64, 64, 4, 4);

// Get a specific sprite
const wallSprite = sheet.getSprite(0);

// Draw it
ctx.drawImage(
    wallSprite.image,
    wallSprite.sx, wallSprite.sy,
    wallSprite.width, wallSprite.height,
    100, 100,
    wallSprite.width, wallSprite.height
);
```

### Using with AssetLoader
```javascript
// In AssetLoader.loadStructures()
const wallsImg = this.getImage('walls_rubble');
if (wallsImg) {
    this.spriteSheets.set(
        'walls_rubble',
        new SpriteSheet(wallsImg, 64, 128, 8, 8)
    );
}

// Later, retrieve and use
const spriteSheet = assetLoader.getSpriteSheet('walls_rubble');
const sprite = spriteSheet.getSprite(5);
```

### Creating Animated Door
```javascript
// Create animation for door opening
const doorSheet = assetLoader.getSpriteSheet('doors');
const openAnimation = doorSheet.createAnimation(0, 3, 100);  // 4 frames

// In render loop:
function render(deltaTime) {
    doorSheet.updateAndDrawAnimation(
        ctx,
        openAnimation,
        deltaTime,
        doorX,
        doorY,
        1.0
    );
}
```

### Multiple Sprites at Once
```javascript
// Get multiple wall variations
const wallSheet = assetLoader.getSpriteSheet('walls');
const wallVariants = wallSheet.getSprites([0, 1, 2, 3, 4]);

// Randomly pick one
const randomWall = wallVariants[Math.floor(Math.random() * wallVariants.length)];
```

## Performance Considerations

### Caching
- The SpriteSheet class caches sprite data internally
- First call to `getSprite(index)` calculates coordinates
- Subsequent calls return cached data
- Use `clearCache()` if memory is a concern

### Best Practices
1. **Create once**: Create SpriteSheet instances once during asset loading
2. **Reuse**: Store references and reuse them
3. **Batch drawing**: Group sprites by sheet to minimize texture switches
4. **Appropriate scale**: Use native resolution when possible

### Memory Usage
```javascript
// Memory per cached sprite: ~100 bytes
// For a 64-tile sheet: ~6.4 KB cached data
// Plus the actual image data
```

## Integration with Building System

### In Building.js
```javascript
render(renderer, camera, isometricRenderer, tileScreenPos) {
    // Check if structure uses sprite sheet
    if (this.type.spriteSheet && this.type.spriteIndex !== undefined) {
        const spriteSheet = this.assetLoader.getSpriteSheet(this.type.spriteSheet);
        if (spriteSheet) {
            const sprite = spriteSheet.getSprite(this.type.spriteIndex);
            if (sprite) {
                // Calculate position
                const spriteX = tileScreenPos.x - sprite.width / 2 - camera.x;
                const spriteY = tileScreenPos.y - sprite.height + 16 - camera.y;
                
                // Draw sprite
                renderer.ctx.drawImage(
                    sprite.image,
                    sprite.sx, sprite.sy,
                    sprite.width, sprite.height,
                    spriteX, spriteY,
                    sprite.width, sprite.height
                );
            }
        }
    }
}
```

## Sprite Sheet Specifications

### Supported Formats
- PNG (recommended)
- JPEG
- Any format supported by HTML Image element

### Tile Sizes
- 64x32 (isometric diamond)
- 64x64 (square)
- 64x128 (tall structures)
- Custom sizes supported

### Grid Layout
- Sprites must be in regular grid
- No padding between sprites (currently)
- Indices start at 0, left-to-right, top-to-bottom

## Troubleshooting

### Sprite Not Appearing
```javascript
// Check if sprite sheet loaded
const sheet = assetLoader.getSpriteSheet('mysheet');
console.log(sheet ? 'Loaded' : 'Not loaded');

// Check if sprite index is valid
const sprite = sheet.getSprite(index);
console.log(sprite ? 'Valid' : 'Invalid index');
```

### Wrong Sprite Displayed
```javascript
// Verify sprite sheet dimensions
console.log(`Total: ${sheet.getTotalSprites()}`);
console.log(`Cols: ${sheet.cols}, Rows: ${sheet.rows}`);

// Check index calculation
// Index N is at: col = N % cols, row = floor(N / cols)
```

### Performance Issues
```javascript
// Clear cache if memory is tight
spriteSheet.clearCache();

// Consider creating smaller sprite sheets
// Or using individual sprite files
```

## See Also
- [BUILDING_STRUCTURES.md](BUILDING_STRUCTURES.md) - Building structures guide
- [ASSET_CATALOG.md](ASSET_CATALOG.md) - Asset inventory
- [RENDERING_SYSTEM.md](RENDERING_SYSTEM.md) - Rendering architecture
