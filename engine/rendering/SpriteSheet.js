/**
 * SpriteSheet Class
 * Handles extraction of individual sprites from sprite sheet images
 */
class SpriteSheet {
    /**
     * @param {HTMLImageElement} image - The sprite sheet image
     * @param {number} spriteWidth - Width of each sprite in pixels
     * @param {number} spriteHeight - Height of each sprite in pixels
     * @param {number} cols - Number of columns in the sprite sheet
     * @param {number} rows - Number of rows in the sprite sheet
     */
    constructor(image, spriteWidth, spriteHeight, cols, rows) {
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.cols = cols;
        this.rows = rows;
        this.totalSprites = cols * rows;
        
        // Cache for extracted sprites
        this.spriteCache = new Map();
    }
    
    /**
     * Get a sprite at a specific index
     * @param {number} index - Sprite index (0-based)
     * @returns {Object} Sprite data with source coordinates
     */
    getSprite(index) {
        if (index < 0 || index >= this.totalSprites) {
            console.warn(`Invalid sprite index: ${index}. Valid range: 0-${this.totalSprites - 1}`);
            return null;
        }
        
        // Check cache first
        if (this.spriteCache.has(index)) {
            return this.spriteCache.get(index);
        }
        
        // Calculate sprite position in the sheet
        const col = index % this.cols;
        const row = Math.floor(index / this.cols);
        
        const sprite = {
            image: this.image,
            sx: col * this.spriteWidth,
            sy: row * this.spriteHeight,
            width: this.spriteWidth,
            height: this.spriteHeight,
            index: index
        };
        
        // Cache the sprite data
        this.spriteCache.set(index, sprite);
        
        return sprite;
    }
    
    /**
     * Get multiple sprites by their indices
     * @param {number[]} indices - Array of sprite indices
     * @returns {Object[]} Array of sprite data objects
     */
    getSprites(indices) {
        return indices.map(index => this.getSprite(index)).filter(sprite => sprite !== null);
    }
    
    /**
     * Draw a sprite at a specific position
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} index - Sprite index
     * @param {number} x - X position to draw
     * @param {number} y - Y position to draw
     * @param {number} scale - Optional scale factor (default 1)
     */
    drawSprite(ctx, index, x, y, scale = 1) {
        const sprite = this.getSprite(index);
        if (!sprite) return;
        
        const width = sprite.width * scale;
        const height = sprite.height * scale;
        
        ctx.drawImage(
            sprite.image,
            sprite.sx,
            sprite.sy,
            sprite.width,
            sprite.height,
            x,
            y,
            width,
            height
        );
    }
    
    /**
     * Create an animation sequence from a range of sprites
     * @param {number} startIndex - First sprite index
     * @param {number} endIndex - Last sprite index
     * @param {number} frameDelay - Delay between frames in milliseconds
     * @returns {Object} Animation object
     */
    createAnimation(startIndex, endIndex, frameDelay = 100) {
        const frames = [];
        for (let i = startIndex; i <= endIndex; i++) {
            frames.push(i);
        }
        
        return {
            frames: frames,
            frameDelay: frameDelay,
            currentFrame: 0,
            elapsedTime: 0,
            loop: true
        };
    }
    
    /**
     * Update and draw an animation
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} animation - Animation object
     * @param {number} deltaTime - Time since last frame in milliseconds
     * @param {number} x - X position to draw
     * @param {number} y - Y position to draw
     * @param {number} scale - Optional scale factor (default 1)
     */
    updateAndDrawAnimation(ctx, animation, deltaTime, x, y, scale = 1) {
        // Update animation timing
        animation.elapsedTime += deltaTime;
        
        if (animation.elapsedTime >= animation.frameDelay) {
            animation.elapsedTime = 0;
            animation.currentFrame++;
            
            if (animation.currentFrame >= animation.frames.length) {
                if (animation.loop) {
                    animation.currentFrame = 0;
                } else {
                    animation.currentFrame = animation.frames.length - 1;
                }
            }
        }
        
        // Draw current frame
        const frameIndex = animation.frames[animation.currentFrame];
        this.drawSprite(ctx, frameIndex, x, y, scale);
    }
    
    /**
     * Get total number of sprites in the sheet
     * @returns {number}
     */
    getTotalSprites() {
        return this.totalSprites;
    }
    
    /**
     * Clear the sprite cache
     */
    clearCache() {
        this.spriteCache.clear();
    }
}
