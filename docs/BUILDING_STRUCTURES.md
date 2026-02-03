# Building Structures Implementation Guide

## Overview
This document describes the new building structure system that supports walls, doors, windows, stairs, ladders, and hatches with proper sprite sheet implementation.

## Features Implemented

### 1. Sprite Sheet System
A new `SpriteSheet` class (`engine/rendering/SpriteSheet.js`) provides:
- Extraction of individual sprites from sprite sheet images
- Sprite caching for performance
- Animation support for structure states
- Drawing utilities for rendering sprites

### 2. Structure Types
The following structure types are now available:

#### Walls
- **Wood Wall**: Basic wooden wall for structures
  - Health: 100
  - Blocks vision: Yes
  - Walkable: No
  
- **Stone Wall**: Durable stone wall
  - Health: 200
  - Blocks vision: Yes
  - Walkable: No
  
- **Brick Wall**: Intermediate strength brick wall
  - Health: 150
  - Blocks vision: Yes
  - Walkable: No

#### Doors
- **Wooden Door**: Standard wooden door
  - Health: 80
  - Can open/close
  - Walkable: Yes (when open)
  
- **Reinforced Door**: Heavy-duty security door
  - Health: 150
  - Can open/close
  - Can be locked

#### Windows
- **Glass Window**: Standard transparent window
  - Health: 30
  - Allows vision through
  - Blocks projectiles
  
- **Shuttered Window**: Window with protective shutters
  - Health: 60
  - Provides more protection

#### Vertical Access
- **Wooden Stairs**: Connects different floor levels
  - Health: 100
  - Walkable: Yes
  - Connects floors
  
- **Wooden Ladder**: Vertical climbing access
  - Health: 80
  - Climbable: Yes
  - Connects floors
  
- **Wooden Hatch**: Trapdoor for floor access
  - Health: 60
  - Can open/close
  - Can be locked

### 3. Asset Integration

#### Sprite Metadata
New metadata file: `assets/sprite_metadata/structures.json`
- Defines all structure types and their properties
- Maps structure types to sprite sheet locations
- Includes placement rules and gameplay mechanics

#### Sprite Sheets
Two main sprite sheets are integrated:
1. **Greenlands Structures** (`spr_Greenlands_iso_day_0.png`)
   - 64x64 px sprites
   - 10 tiles total
   - Wooden structures (walls, doors, stairs, ladders)

2. **Rubble Walls** (`TileObjectsRubbleWalls.png`)
   - 64x128 px sprites
   - 64 tiles total
   - Stone/brick walls in various states

### 4. Tiled Integration

#### New Tileset Files
- `tilesheets/structures/greenlands_structures.tsx`
- `tilesheets/structures/walls_rubble.tsx`

These tilesets can be imported into Tiled Map Editor for creating game levels with proper structure placement.

### 5. C++ Engine Support

Updated C++ classes to support structure types:
- `cpp/include/building/Building.h`
- `cpp/src/building/Building.cpp`

Added:
- New `BuildingType` enum entries for all structure types
- New `StructureType` enum for categorization
- Properties: walkable, blocksVision, health
- Proper initialization for each structure type

### 6. Web Editor Support

Updated JavaScript classes:
- `src/building/Building.js` - Added all structure types
- `engine/assets/AssetLoader.js` - Loads structure sprite sheets
- `index.html` - Includes SpriteSheet.js script

## Usage

### In Code (JavaScript)

```javascript
// Create a wooden wall
const wall = new Building(x, y, Building.TYPES.WALL_WOOD, assetLoader);

// Create a stone wall
const stoneWall = new Building(x, y, Building.TYPES.WALL_STONE, assetLoader);

// Create a door
const door = new Building(x, y, Building.TYPES.DOOR_WOOD, assetLoader);

// Create stairs
const stairs = new Building(x, y, Building.TYPES.STAIRS_WOOD, assetLoader);
```

### In Code (C++)

```cpp
// Create a wooden wall
Building wall(x, y, BuildingType::WALL_WOOD);

// Create a stone wall
Building stoneWall(x, y, BuildingType::WALL_STONE);

// Create a door
Building door(x, y, BuildingType::DOOR_WOOD);

// Check properties
bool canWalk = wall.isWalkable();  // false for walls
bool blocks = wall.blocksVision();  // true for walls
int hp = wall.getHealth();  // 100 for wooden walls
```

### In Tiled Map Editor

1. Open Tiled Map Editor
2. Import tileset: `tilesheets/structures/greenlands_structures.tsx`
3. Import tileset: `tilesheets/structures/walls_rubble.tsx`
4. Place structure tiles in your map
5. Export as TMX for use in game engines

## Structure Properties Reference

| Structure Type | Material | Health | Walkable | Blocks Vision | Special |
|---------------|----------|--------|----------|---------------|---------|
| Wall | Wood | 100 | No | Yes | - |
| Wall | Stone | 200 | No | Yes | - |
| Wall | Brick | 150 | No | Yes | - |
| Door | Wood | 80 | Yes | No | Can open |
| Door | Reinforced | 150 | Yes | No | Can lock |
| Window | Glass | 30 | No | No | Fragile |
| Window | Shuttered | 60 | No | No | - |
| Stairs | Wood | 100 | Yes | No | Connects floors |
| Ladder | Wood | 80 | Yes | No | Climbable |
| Hatch | Wood | 60 | Yes | No | Can lock |

## Asset Files

### Source Assets
- `assets/TBD/loose_files/spr_Greenlands_iso_day_0.png`
- `assets/TBD/loose_files/TileObjectsRubbleWalls.png`

### Metadata
- `assets/sprite_metadata/structures.json`

### Tilesets
- `tilesheets/structures/greenlands_structures.tsx`
- `tilesheets/structures/walls_rubble.tsx`

## Future Enhancements

### Planned Features
1. **Multi-material support**: Add metal, glass, and composite materials
2. **Dynamic states**: Door open/close animations
3. **Damage visualization**: Show damaged states for structures
4. **Weather effects**: Weathering and aging of materials
5. **More structure types**: 
   - Fences and barriers
   - Gates and portcullises
   - Balconies and platforms
   - Roofing elements

### Asset Expansion
Additional assets in `assets/TBD/` can be integrated:
- Dungeon pack structures (747 files)
- Snow/winter structures (528 files)
- Various themed structure sets

## Testing

### Web Editor Testing
1. Launch web editor: `./launch-editor.sh`
2. Press 'B' to enter building mode
3. Use number keys to cycle through structure types
4. Click to place structures
5. Verify sprite rendering and placement

### C++ Engine Testing
1. Build engine: `./build-engine.sh`
2. Run engine: `./build/IsometricHell`
3. Test structure placement
4. Verify collision detection
5. Test vision blocking

## Notes

- All structures use isometric rendering
- Sprite sheets support both 64x32 and 64x64 tile sizes
- Structure health affects durability in gameplay
- Vision blocking is crucial for stealth mechanics
- Walkability determines pathfinding behavior

## See Also

- [ASSET_CATALOG.md](ASSET_CATALOG.md) - Complete asset inventory
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [ROADMAP.md](ROADMAP.md) - Development roadmap
