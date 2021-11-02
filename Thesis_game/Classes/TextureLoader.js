"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.texturePlains = new ƒ.TextureImage("./Art/plainsTest.png");
    RoboGame.plainsMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.texturePlains));
    RoboGame.textureWater = new ƒ.TextureImage("./Art/waterTest.png");
    RoboGame.waterMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureWater));
    RoboGame.textureMountain = new ƒ.TextureImage("./Art/mountainTest.png");
    RoboGame.mountainMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureMountain));
    RoboGame.textureForest = new ƒ.TextureImage("./Art/forest.png");
    RoboGame.forestMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureForest));
    RoboGame.textureRobot = new ƒ.TextureImage("./Art/enemy_icon.png");
    RoboGame.robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureRobot));
    RoboGame.textureEnemy = new ƒ.TextureImage("./Art/asteroid_medium.png");
    RoboGame.enemyMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureEnemy));
    RoboGame.textureBorder = new ƒ.TextureImage("./Art/FoW.png");
    RoboGame.borderMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureBorder));
    RoboGame.textureFactory = new ƒ.TextureImage("./Art/factory.png");
    RoboGame.factoryMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureFactory));
    RoboGame.textureOre = new ƒ.TextureImage("./Art/ore.png");
    RoboGame.oreMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureOre));
    RoboGame.textureOil = new ƒ.TextureImage("./Art/oil.png");
    RoboGame.oilMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureOil));
    RoboGame.textureWreckage = new ƒ.TextureImage("./Art/scrap.png");
    RoboGame.wreckageMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureWreckage));
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=TextureLoader.js.map