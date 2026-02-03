<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.2" name="Greenlands Structures" tilewidth="64" tileheight="64" tilecount="10" columns="1">
 <image source="../../assets/TBD/loose_files/spr_Greenlands_iso_day_0.png" width="64" height="672"/>
 <tile id="0">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="type" value="wall"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="type" value="door"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="canOpen" type="bool" value="true"/>
   <property name="health" type="int" value="80"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="type" value="door"/>
   <property name="material" value="wood"/>
   <property name="state" value="open"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="health" type="int" value="80"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="type" value="door"/>
   <property name="material" value="reinforced"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="canOpen" type="bool" value="true"/>
   <property name="health" type="int" value="150"/>
  </properties>
 </tile>
 <tile id="6">
  <properties>
   <property name="type" value="window"/>
   <property name="material" value="glass"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="health" type="int" value="30"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="type" value="window"/>
   <property name="material" value="shuttered"/>
   <property name="walkable" type="bool" value="false"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="health" type="int" value="60"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="type" value="stairs"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="connectsFloors" type="bool" value="true"/>
   <property name="health" type="int" value="100"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="type" value="ladder"/>
   <property name="material" value="wood"/>
   <property name="walkable" type="bool" value="true"/>
   <property name="blocksVision" type="bool" value="false"/>
   <property name="climbable" type="bool" value="true"/>
   <property name="connectsFloors" type="bool" value="true"/>
   <property name="health" type="int" value="80"/>
  </properties>
 </tile>
</tileset>
