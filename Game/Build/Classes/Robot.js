"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    RoboGameNamespace.movementTimer = 0;
    RoboGameNamespace.harvestTimer = 0;
    class Robot extends RoboGameNamespace.QuadNode {
        static scale = new ƒ.Vector2(1.5, 1.5);
        activeModuleString = "lumberer";
        moduleHovering = false;
        moduleLumberjack = true;
        moduleMiner = false;
        moduleOil = false;
        moduleScrapper = false;
        moduleFighter = true;
        moduleRetreat = false;
        isInteracting = false;
        isAlive = true;
        isAutomated = false;
        damageValue = 4;
        isWaiting = true;
        fieldOfView = 1; //switch case für andere köpfe einbauen
        costBioMass = 600;
        costMetal = 0;
        costOil = 0;
        costScrap = 100;
        surroundingFields;
        improvedWayfinding = false;
        robotUI = document.createElement("div");
        robotID;
        robotMaxHealth = 50;
        robotHealth = this.robotMaxHealth;
        isCalledBack = false;
        isFighting = false;
        previousField;
        activateRobot = document.createElement("button");
        callRobotBack = document.createElement("button");
        disassembleRobot = document.createElement("button");
        automateRobot = document.createElement("button");
        ressourceCapacity = 200;
        ressourceLoaded = 0;
        collectsBioMass = false;
        collectsMetal = false;
        collectsOil = false;
        collectsScrap = false;
        stats = document.createElement("div");
        hp = document.createElement("div");
        mods = document.createElement("div");
        flying = document.createElement("div");
        automated = document.createElement("div");
        interaction = document.createElement("div");
        cargo = document.createElement("div");
        constructor(_name, _pos) {
            super(_name, _pos, Robot.scale);
            this.robotID = RoboGameNamespace.robots.getChildren().length + 1;
            this.robotUI.id = "robotUI";
            document.getElementById("robots").appendChild(this.robotUI);
            this.robotUI.appendChild(this.activateRobot);
            this.activateRobot.addEventListener("click", () => {
                RoboGameNamespace.activateRobot(this);
                console.log(this);
            });
            this.activateRobot.id = "activateRobot";
            this.activateRobot.className = "buttonDesignClass";
            this.activateRobot.textContent = "activate";
            this.robotUI.appendChild(this.callRobotBack);
            this.callRobotBack.addEventListener("click", () => {
                this.returnTimer();
            });
            this.callRobotBack.id = "callRobotBack";
            this.callRobotBack.className = "buttonDesignClass";
            this.callRobotBack.textContent = "call back";
            this.robotUI.appendChild(this.disassembleRobot);
            this.disassembleRobot.addEventListener("click", () => {
                RoboGameNamespace.disassembleRobot(this);
            });
            this.disassembleRobot.id = "disassembleRobot";
            this.disassembleRobot.className = "buttonDesignClass";
            this.disassembleRobot.textContent = "disassemble";
            this.robotUI.appendChild(this.automateRobot);
            this.automateRobot.addEventListener("click", () => {
                RoboGameNamespace.setAutoMode(this);
            });
            this.automateRobot.id = "automateRobot";
            this.automateRobot.className = "buttonDesignClass";
            this.automateRobot.textContent = "automate";
            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.lumbererMaterial));
            this.stats.appendChild(this.hp);
            this.stats.appendChild(this.mods);
            this.stats.appendChild(this.flying);
            this.stats.appendChild(this.automated);
            this.stats.appendChild(this.interaction);
            this.stats.appendChild(this.cargo);
            this.hp.textContent = "Health: " + String(this.robotHealth) + " / " + String(this.robotMaxHealth);
            this.mods.textContent = "Profession: " + String(this.activeModuleString);
            this.flying.textContent = "Flying activated: " + String(this.moduleHovering);
            this.automated.textContent = "Automation activated: " + String(this.isAutomated);
            this.interaction.textContent = "Harvesting: " + String(this.isInteracting);
            this.cargo.textContent = "Cargo loaded: " + String(this.ressourceLoaded) + " / " + String(this.ressourceCapacity);
            this.robotUI.appendChild(this.stats);
        }
        renewStats() {
            this.hp.textContent = "Health: " + String(this.robotHealth) + " / " + String(this.robotMaxHealth);
            this.mods.textContent = "Profession: " + String(this.activeModuleString);
            this.flying.textContent = "Flying activated: " + String(this.moduleHovering);
            this.automated.textContent = "Automation activated: " + String(this.isAutomated);
            this.interaction.textContent = "Harvesting: " + String(this.isInteracting);
            this.cargo.textContent = "Cargo loaded: " + String(this.ressourceLoaded) + " / " + String(this.ressourceCapacity);
        }
        moveToNewField() {
            let thisX = this.mtxLocal.translation.x;
            let thisY = this.mtxLocal.translation.y;
            let nextDirection;
            this.previousField = new ƒ.Vector2(thisX, thisY);
            if (!this.isWaiting) {
                if (!this.isFighting) {
                    if (!this.isInteracting) {
                        nextDirection = Math.floor((Math.random() * 8)) + 1;
                        if (this.improvedWayfinding == true) {
                            for (let i = 0; i < this.surroundingFields.length; i++) {
                                if (this.activeModuleString == "lumberer" && this.surroundingFields[i].attribute == RoboGameNamespace.FIELDATTRIBUTE.FOREST) {
                                    nextDirection = i + 1;
                                }
                                else if (this.activeModuleString == "miner" && this.surroundingFields[i].attribute == RoboGameNamespace.FIELDATTRIBUTE.METAL) {
                                    nextDirection = i + 1;
                                }
                                else if (this.activeModuleString == "oiler" && this.surroundingFields[i].attribute == RoboGameNamespace.FIELDATTRIBUTE.OIL) {
                                    nextDirection = i + 1;
                                }
                                else if (this.activeModuleString == "scrapper" && this.surroundingFields[i].attribute == RoboGameNamespace.FIELDATTRIBUTE.WRECKAGE) {
                                    nextDirection = i + 1;
                                }
                            }
                        }
                        switch (nextDirection) {
                            case 1: {
                                if (RoboGameNamespace.mapHelperArray[thisX - 1][thisY - 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(-1);
                                    this.mtxLocal.translateY(-1);
                                }
                                break;
                            }
                            case 2: {
                                if (RoboGameNamespace.mapHelperArray[thisX - 1][thisY].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(-1);
                                }
                                break;
                            }
                            case 3: {
                                if (RoboGameNamespace.mapHelperArray[thisX - 1][thisY + 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(-1);
                                    this.mtxLocal.translateY(+1);
                                }
                                break;
                            }
                            case 4: {
                                if (RoboGameNamespace.mapHelperArray[thisX][thisY - 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateY(-1);
                                }
                                break;
                            }
                            case 5: {
                                break;
                            }
                            case 6: {
                                if (RoboGameNamespace.mapHelperArray[thisX][thisY + 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateY(+1);
                                }
                                break;
                            }
                            case 7: {
                                if (RoboGameNamespace.mapHelperArray[thisX + 1][thisY - 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(+1);
                                    this.mtxLocal.translateY(-1);
                                }
                                break;
                            }
                            case 8: {
                                if (RoboGameNamespace.mapHelperArray[thisX + 1][thisY].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(+1);
                                }
                                break;
                            }
                            case 9: {
                                if (RoboGameNamespace.mapHelperArray[thisX + 1][thisY + 1].attribute != RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER) {
                                    this.mtxLocal.translateX(+1);
                                    this.mtxLocal.translateY(+1);
                                }
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                }
            }
        }
        interactWithField(_tile) {
            if (_tile.hasEnemy) {
                this.isInteracting = true;
                this.isFighting = true;
                this.fightEnemy();
            }
            else {
                switch (_tile.attribute) {
                    case RoboGameNamespace.FIELDATTRIBUTE.FOREST: {
                        if (this.moduleLumberjack) {
                            this.isInteracting = true;
                            this.collectsBioMass = true;
                        }
                        break;
                    }
                    case RoboGameNamespace.FIELDATTRIBUTE.MOUNTAIN: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case RoboGameNamespace.FIELDATTRIBUTE.METAL: {
                        if (this.moduleMiner) {
                            this.isInteracting = true;
                            this.collectsMetal = true;
                        }
                        break;
                    }
                    case RoboGameNamespace.FIELDATTRIBUTE.OIL: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        }
                        else if (this.moduleOil) {
                            this.isInteracting = true;
                            this.collectsOil = true;
                        }
                        break;
                    }
                    case RoboGameNamespace.FIELDATTRIBUTE.WATER: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case RoboGameNamespace.FIELDATTRIBUTE.WRECKAGE: {
                        if (this.moduleScrapper) {
                            this.isInteracting = true;
                            this.collectsScrap = true;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        moveToPreviousField() {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }
        collectRessource(_tile) {
            if (this.collectsBioMass == true) {
                this.ressourceLoaded += RoboGameNamespace.increaseBioMass;
                _tile.ressourceAmount -= RoboGameNamespace.increaseBioMass;
                if (this.ressourceLoaded >= this.ressourceCapacity) {
                    this.collectsBioMass = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsBioMass = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsMetal == true) {
                this.ressourceLoaded += RoboGameNamespace.increaseRessource;
                _tile.ressourceAmount -= RoboGameNamespace.increaseRessource;
                if (this.ressourceLoaded >= this.ressourceCapacity) {
                    this.collectsMetal = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsMetal = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOil == true) {
                this.ressourceLoaded += RoboGameNamespace.increaseOil;
                _tile.ressourceAmount -= RoboGameNamespace.increaseOil;
                if (this.ressourceLoaded >= this.ressourceCapacity) {
                    this.collectsOil = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOil = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsScrap == true) {
                this.ressourceLoaded += RoboGameNamespace.increaseScrap;
                _tile.ressourceAmount -= RoboGameNamespace.increaseScrap;
                if (this.ressourceLoaded >= this.ressourceCapacity) {
                    this.collectsScrap = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsScrap = false;
                    _tile.refreshTile();
                }
            }
        }
        returnTimer() {
            this.isCalledBack = true;
            this.isWaiting = true;
            ƒ.Time.game.setTimer(6000, 1, () => {
                this.returnToBase();
                this.isInteracting = false;
            });
        }
        returnToBase() {
            this.isInteracting = false;
            this.mtxLocal.translation = RoboGameNamespace.playerBase;
            if (this.moduleLumberjack) {
                RoboGameNamespace.ressourceBioMass += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleMiner) {
                RoboGameNamespace.ressourceMetal += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleOil) {
                RoboGameNamespace.ressourceOil += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleScrapper) {
                RoboGameNamespace.ressourceScrap += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            this.robotHealth = this.robotMaxHealth;
            if (!this.isAutomated) {
                this.isWaiting = true;
            }
            else {
                this.isWaiting = false;
            }
        }
        fightEnemy() {
            let enemyLevel = ((Math.floor(Math.sqrt(Math.pow(this.mtxLocal.translation.x - (RoboGameNamespace.worldSize / 2), 2) + Math.pow(this.mtxLocal.translation.y - (RoboGameNamespace.worldSize / 2), 2)))) / 4) + 1;
            let enemy = new RoboGameNamespace.Enemy(enemyLevel);
            if (this.moduleRetreat) {
                this.robotHealth -= enemy.damageOfEnemy;
                this.moveToPreviousField();
                this.isFighting = false;
            }
            else {
                let enemyMessage = document.createElement("div");
                enemyMessage.id = "enemyEncountered";
                document.getElementById("enemyWarning").appendChild(enemyMessage);
                enemyMessage.textContent = String("Robot Nr.:" + this.robotID + " encountered an enemy!");
                ƒ.Time.game.setTimer(20000, 1, () => {
                    if (this.isCalledBack) {
                        this.isCalledBack = false;
                    }
                    else {
                        this.startFight(RoboGameNamespace.mapHelperArray[this.mtxLocal.translation.x][this.mtxLocal.translation.y], enemy);
                        ƒ.Time.game.setTimer(15000, 1, () => {
                            document.getElementById("enemyWarning").removeChild(enemyMessage);
                        });
                    }
                });
            }
        }
        startFight(tile, enemy) {
            while (this.isAlive && enemy.isAlive) {
                enemy.healthOfEnemy -= this.damageValue;
                this.robotHealth -= enemy.damageOfEnemy;
                if (enemy.healthOfEnemy <= 0) {
                    tile.hasEnemy = false;
                    tile.removeComponent(tile.getComponent(ƒ.ComponentMaterial));
                    tile.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.plainsMaterial));
                    RoboGameNamespace.ressourceScrap += enemy.scrapsDropped;
                    this.isFighting = false;
                    this.isInteracting = false;
                    break;
                }
                if (this.robotHealth <= 0) {
                    this.isAlive = false;
                    let deathMessage = document.createElement("div");
                    deathMessage.id = "robotDestroyed";
                    document.getElementById("robotStatus").appendChild(deathMessage);
                    deathMessage.textContent = String("Robot Nr.:" + this.robotID + " was destroyed!");
                    ƒ.Time.game.setTimer(15000, 1, () => {
                        document.getElementById("robotStatus").removeChild(deathMessage);
                    });
                    break;
                }
            }
        }
    }
    RoboGameNamespace.Robot = Robot;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Robot.js.map