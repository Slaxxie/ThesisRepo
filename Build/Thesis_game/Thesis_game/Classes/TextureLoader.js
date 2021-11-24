"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    RoboGameNamespace.texturePlains = new ƒ.TextureImage("./Art/plainsTest.png");
    RoboGameNamespace.plainsMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.texturePlains));
    RoboGameNamespace.textureWater = new ƒ.TextureImage("./Art/waterTest.png");
    RoboGameNamespace.waterMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureWater));
    RoboGameNamespace.textureMountain = new ƒ.TextureImage("./Art/mountainTest.png");
    RoboGameNamespace.mountainMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureMountain));
    RoboGameNamespace.textureForest = new ƒ.TextureImage("./Art/forest.png");
    RoboGameNamespace.forestMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureForest));
    RoboGameNamespace.textureRobot = new ƒ.TextureImage("./Art/enemy_icon.png");
    RoboGameNamespace.robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureRobot));
    RoboGameNamespace.textureEnemy = new ƒ.TextureImage("./Art/asteroid_medium.png");
    RoboGameNamespace.enemyMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureEnemy));
    RoboGameNamespace.textureBorder = new ƒ.TextureImage("./Art/FoW.png");
    RoboGameNamespace.borderMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureBorder));
    RoboGameNamespace.textureFactory = new ƒ.TextureImage("./Art/factory.png");
    RoboGameNamespace.factoryMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureFactory));
    RoboGameNamespace.textureOre = new ƒ.TextureImage("./Art/ore.png");
    RoboGameNamespace.oreMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureOre));
    RoboGameNamespace.textureOil = new ƒ.TextureImage("./Art/oil.png");
    RoboGameNamespace.oilMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureOil));
    RoboGameNamespace.textureWreckage = new ƒ.TextureImage("./Art/scrap.png");
    RoboGameNamespace.wreckageMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGameNamespace.textureWreckage));
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=TextureLoader.js.map