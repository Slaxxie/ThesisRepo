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
    RoboGame.textureBorder = new ƒ.TextureImage("./Art/FoW.png");
    RoboGame.borderMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureBorder));
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=TextureLoader.js.map