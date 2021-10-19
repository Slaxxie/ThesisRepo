"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.movementTimer = 0;
    let moduleMovement = true;
    let moduleFlying = false;
    let moduleInteraction = true;
    let moduleLumberjack = false;
    let moduleMiner = false;
    let moduleOil = false;
    let moduleFighter = false;
    let moduleRetreat = false;
    let moduleScout = false;
    let moduleBuild = false;
    let newFieldAttribute;
    let isInteracting = false;
    let previousField;
    RoboGame.robotAlive = true;
    let ressouceScrap; // austauschen
    class Robot extends RoboGame.QuadNode {
        constructor(_name, _pos, _id) {
            let robotID = _id;
            let scale = new ƒ.Vector2(1, 1);
            super("Robot: " + robotID, _pos, scale);
            let robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureShip));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField() {
            if (moduleMovement || moduleFlying) {
                console.log("Moving to: ");
                this.interactWithField();
            }
        }
        moveToPreviousField() {
            this.mtxLocal.translation = new ƒ.Vector3(previousField.x, previousField.y, 0);
        }
        obtainQuest() {
            console.log("placeholder" + moduleBuild);
        }
        collectWood() {
            console.log("placeholder" + moduleFighter);
        }
        collectOre() {
            console.log("placeholder");
        }
        collectOil() {
            console.log("placeholder");
        }
        collectScrap() {
            console.log("placeholder");
        }
        fightEnemy() {
            let newEnemy = new RoboGame.Enemy(5);
            if (RoboGame.damageValue > newEnemy.damageOfEnemy) {
                ressouceScrap += newEnemy.scrapsDropped;
                isInteracting = false;
            }
            else {
                RoboGame.robotAlive = !RoboGame.robotAlive;
            }
        }
        interactWithField() {
            if (!isInteracting) {
                switch (newFieldAttribute) {
                    case "Quest": {
                        this.obtainQuest();
                        break;
                    }
                    case "Forest": {
                        if (!moduleScout) {
                            if (moduleLumberjack) {
                                this.collectWood();
                            }
                        }
                        break;
                    }
                    case "Plains": {
                        //statements; 
                        break;
                    }
                    case "Mountain": {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case "Ore": {
                        if (!moduleScout) {
                            if (moduleMiner) {
                                this.collectOre();
                            }
                        }
                        break;
                    }
                    case "Oil": {
                        if (!moduleScout) {
                            if (moduleOil) {
                                this.collectOil();
                            }
                        }
                        break;
                    }
                    case "Enemy": {
                        if (!moduleRetreat) {
                            this.fightEnemy();
                        }
                        else {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case "Water": {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case "Wreckage": {
                        if (!moduleScout) {
                            if (moduleInteraction) {
                                this.collectScrap();
                            }
                        }
                        break;
                    }
                    default: {
                        //statements; 
                        break;
                    }
                }
            }
        }
    }
    RoboGame.Robot = Robot;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Robot.js.map