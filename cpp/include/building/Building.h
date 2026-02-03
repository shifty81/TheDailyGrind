#ifndef BUILDING_H
#define BUILDING_H

#include <glm/glm.hpp>
#include <string>

/**
 * Building Types
 */
enum class BuildingType {
    HOUSE,
    TOWER,
    WAREHOUSE,
    // Structure types
    WALL_WOOD,
    WALL_STONE,
    WALL_BRICK,
    DOOR_WOOD,
    WINDOW_GLASS,
    STAIRS_WOOD,
    LADDER_WOOD,
    HATCH_WOOD
};

/**
 * Structure Types for categorization
 */
enum class StructureType {
    NONE,
    WALL,
    DOOR,
    WINDOW,
    STAIRS,
    LADDER,
    HATCH
};

/**
 * Building Class
 * Represents a building or structure that can be placed in the world
 */
class Building {
public:
    Building(int x, int y, BuildingType type);
    
    // Getters
    int getX() const { return x; }
    int getY() const { return y; }
    BuildingType getType() const { return type; }
    StructureType getStructureType() const { return structureType; }
    int getWidth() const { return width; }
    int getHeight() const { return height; }
    float getBuildHeight() const { return buildHeight; }
    bool isWalkable() const { return walkable; }
    bool blocksVision() const { return blocksVision_; }
    int getHealth() const { return health; }
    
    // Get colors for rendering
    glm::vec4 getTopColor() const { return topColor; }
    glm::vec4 getLeftColor() const { return leftColor; }
    glm::vec4 getRightColor() const { return rightColor; }
    
    // Get building type name
    std::string getTypeName() const;
    
private:
    int x, y;
    BuildingType type;
    StructureType structureType;
    int width;
    int height;
    float buildHeight;
    bool walkable;
    bool blocksVision_;
    int health;
    glm::vec4 topColor;
    glm::vec4 leftColor;
    glm::vec4 rightColor;
    
    // Initialize building properties based on type
    void initializeFromType();
};

#endif // BUILDING_H
