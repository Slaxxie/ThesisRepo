namespace RoboGame {
    import ƒ = FudgeCore;

    export let texturePlains: ƒ.TextureImage = new ƒ.TextureImage("./Art/plainsTest.png");
    export let plainsMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), texturePlains));
    export let textureWater: ƒ.TextureImage = new ƒ.TextureImage("./Art/waterTest.png");
    export let waterMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureWater));
    export let textureMountain: ƒ.TextureImage = new ƒ.TextureImage("./Art/mountainTest.png");
    export let mountainMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureMountain));
    export let textureForest: ƒ.TextureImage = new ƒ.TextureImage("./Art/forest.png");
    export let forestMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureForest));
    export let textureRobot: ƒ.TextureImage = new ƒ.TextureImage("./Art/enemy_icon.png");
    export let robotMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureRobot));

}