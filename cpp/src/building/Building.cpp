#include "building/Building.h"

Building::Building(int x, int y, BuildingType type)
    : x(x)
    , y(y)
    , type(type)
{
    initializeFromType();
}

std::string Building::getTypeName() const {
    switch (type) {
        case BuildingType::HOUSE:        return "House";
        case BuildingType::TOWER:        return "Tower";
        case BuildingType::WAREHOUSE:    return "Warehouse";
        case BuildingType::WALL_WOOD:    return "Wooden Wall";
        case BuildingType::WALL_STONE:   return "Stone Wall";
        case BuildingType::WALL_BRICK:   return "Brick Wall";
        case BuildingType::DOOR_WOOD:    return "Wooden Door";
        case BuildingType::WINDOW_GLASS: return "Glass Window";
        case BuildingType::STAIRS_WOOD:  return "Wooden Stairs";
        case BuildingType::LADDER_WOOD:  return "Wooden Ladder";
        case BuildingType::HATCH_WOOD:   return "Wooden Hatch";
        default:                         return "Unknown";
    }
}

void Building::initializeFromType() {
    // Default values
    walkable = false;
    blocksVision_ = true;
    structureType = StructureType::NONE;
    
    switch (type) {
        case BuildingType::HOUSE:
            width = 2;
            height = 2;
            buildHeight = 40.0f;
            topColor = glm::vec4(0.8f, 0.2f, 0.2f, 1.0f);
            leftColor = glm::vec4(0.6f, 0.15f, 0.15f, 1.0f);
            rightColor = glm::vec4(0.7f, 0.17f, 0.17f, 1.0f);
            health = 200;
            break;
            
        case BuildingType::TOWER:
            width = 1;
            height = 1;
            buildHeight = 80.0f;
            topColor = glm::vec4(0.5f, 0.5f, 0.5f, 1.0f);
            leftColor = glm::vec4(0.3f, 0.3f, 0.3f, 1.0f);
            rightColor = glm::vec4(0.4f, 0.4f, 0.4f, 1.0f);
            health = 300;
            break;
            
        case BuildingType::WAREHOUSE:
            width = 3;
            height = 3;
            buildHeight = 30.0f;
            topColor = glm::vec4(0.6f, 0.4f, 0.2f, 1.0f);
            leftColor = glm::vec4(0.45f, 0.3f, 0.15f, 1.0f);
            rightColor = glm::vec4(0.52f, 0.35f, 0.17f, 1.0f);
            health = 250;
            break;
            
        // Wall structures
        case BuildingType::WALL_WOOD:
            structureType = StructureType::WALL;
            width = 1;
            height = 1;
            buildHeight = 48.0f;
            topColor = glm::vec4(0.6f, 0.4f, 0.2f, 1.0f);
            leftColor = glm::vec4(0.5f, 0.3f, 0.15f, 1.0f);
            rightColor = glm::vec4(0.55f, 0.35f, 0.17f, 1.0f);
            walkable = false;
            blocksVision_ = true;
            health = 100;
            break;
            
        case BuildingType::WALL_STONE:
            structureType = StructureType::WALL;
            width = 1;
            height = 1;
            buildHeight = 48.0f;
            topColor = glm::vec4(0.5f, 0.5f, 0.5f, 1.0f);
            leftColor = glm::vec4(0.4f, 0.4f, 0.4f, 1.0f);
            rightColor = glm::vec4(0.45f, 0.45f, 0.45f, 1.0f);
            walkable = false;
            blocksVision_ = true;
            health = 200;
            break;
            
        case BuildingType::WALL_BRICK:
            structureType = StructureType::WALL;
            width = 1;
            height = 1;
            buildHeight = 48.0f;
            topColor = glm::vec4(0.7f, 0.3f, 0.2f, 1.0f);
            leftColor = glm::vec4(0.6f, 0.25f, 0.15f, 1.0f);
            rightColor = glm::vec4(0.65f, 0.27f, 0.17f, 1.0f);
            walkable = false;
            blocksVision_ = true;
            health = 150;
            break;
            
        // Door structure
        case BuildingType::DOOR_WOOD:
            structureType = StructureType::DOOR;
            width = 1;
            height = 1;
            buildHeight = 48.0f;
            topColor = glm::vec4(0.5f, 0.35f, 0.2f, 1.0f);
            leftColor = glm::vec4(0.4f, 0.28f, 0.16f, 1.0f);
            rightColor = glm::vec4(0.45f, 0.31f, 0.18f, 1.0f);
            walkable = true;
            blocksVision_ = false;
            health = 80;
            break;
            
        // Window structure
        case BuildingType::WINDOW_GLASS:
            structureType = StructureType::WINDOW;
            width = 1;
            height = 1;
            buildHeight = 32.0f;
            topColor = glm::vec4(0.7f, 0.8f, 0.9f, 0.6f);
            leftColor = glm::vec4(0.6f, 0.7f, 0.8f, 0.6f);
            rightColor = glm::vec4(0.65f, 0.75f, 0.85f, 0.6f);
            walkable = false;
            blocksVision_ = false;
            health = 30;
            break;
            
        // Stairs structure
        case BuildingType::STAIRS_WOOD:
            structureType = StructureType::STAIRS;
            width = 1;
            height = 1;
            buildHeight = 32.0f;
            topColor = glm::vec4(0.55f, 0.4f, 0.25f, 1.0f);
            leftColor = glm::vec4(0.45f, 0.32f, 0.2f, 1.0f);
            rightColor = glm::vec4(0.5f, 0.36f, 0.22f, 1.0f);
            walkable = true;
            blocksVision_ = false;
            health = 100;
            break;
            
        // Ladder structure
        case BuildingType::LADDER_WOOD:
            structureType = StructureType::LADDER;
            width = 1;
            height = 1;
            buildHeight = 48.0f;
            topColor = glm::vec4(0.6f, 0.45f, 0.3f, 1.0f);
            leftColor = glm::vec4(0.5f, 0.37f, 0.24f, 1.0f);
            rightColor = glm::vec4(0.55f, 0.41f, 0.27f, 1.0f);
            walkable = true;
            blocksVision_ = false;
            health = 80;
            break;
            
        // Hatch structure
        case BuildingType::HATCH_WOOD:
            structureType = StructureType::HATCH;
            width = 1;
            height = 1;
            buildHeight = 8.0f;
            topColor = glm::vec4(0.5f, 0.4f, 0.25f, 1.0f);
            leftColor = glm::vec4(0.4f, 0.32f, 0.2f, 1.0f);
            rightColor = glm::vec4(0.45f, 0.36f, 0.22f, 1.0f);
            walkable = true;
            blocksVision_ = false;
            health = 60;
            break;
    }
}
