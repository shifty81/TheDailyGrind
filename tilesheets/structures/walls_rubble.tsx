<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.2" name="Rubble Walls" tilewidth="64" tileheight="128" tilecount="64" columns="8">
 <image source="../../assets/TBD/loose_files/TileObjectsRubbleWalls.png" width="512" height="1024"/>
 <tile id="0">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="stone"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="200"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="stone"/>
   <property name="condition" value="damaged"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="150"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="stone"/>
   <property name="condition" value="damaged"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="brick"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="150"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="brick"/>
   <property name="condition" value="damaged"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="16">
  <properties>
   <property name="type" value="stairs"/>
   <property name="material" value="stone"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="connectsFloors" type="bool" value="true"/>
   <property name="health" type="int" value="150"/>
  </properties>
 </tile>
 <tile id="17">
  <properties>
   <property name="type" value="stairs"/>
   <property name="material" value="stone"/>
   <property name="orientation" value="alternate"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="connectsFloors" type="bool" value="true"/>
   <property name="health" type="int" value="150"/>
  </properties>
 </tile>
</tileset>
