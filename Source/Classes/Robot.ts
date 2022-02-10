namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export let movementTimer: number = 0;
    export let harvestTimer: number = 0;

    export class Robot extends QuadNode {
        private static scale: ƒ.Vector2 = new ƒ.Vector2(1.5, 1.5);
        public activeModuleString: String = "lumberer";
        public previousField: ƒ.Vector2;
        public moduleHovering: boolean = false;
        public moduleLumberjack: boolean = true;
        public moduleMiner: boolean = false;
        public moduleOil: boolean = false;
        public moduleScrapper: boolean = false;
        public moduleFighter: boolean = true;
        public moduleRetreat: boolean = false;
        public isInteracting: boolean = false;
        public isCalledBack: boolean = false;
        public isAlive: boolean = true;
        public robotMaxHealth: number = 50;
        public robotHealth: number = this.robotMaxHealth;
        public isAutomated: boolean = false;
        public damageValue: number = 4;
        public ressourceCapacity: number = 200;
        public robotID: number;
        public isWaiting: boolean = true;
        public isFighting: boolean = false;
        public fieldOfView: number = 1; //switch case für andere köpfe einbauen

        public costBioMass: number = 600;
        public costMetal: number = 0;
        public costOil: number = 0;
        public costScrap: number = 100;
        public surroundingFields: WorldMapTile[];
        public improvedWayfinding: boolean = false;

        public robotUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private activateRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private callRobotBack: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private disassembleRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private automateRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private ressourceLoaded: number = 0;
        private collectsBioMass: boolean = false;
        private collectsMetal: boolean = false;
        private collectsOil: boolean = false;
        private collectsScrap: boolean = false;

        private stats: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private hp: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private mods: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private flying: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private automated: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private interaction: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private cargo: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        constructor(_name: string, _pos: ƒ.Vector2) {
            super(_name, _pos, Robot.scale);
            this.robotID = robots.getChildren().length + 1;
            this.robotUI.id = "robotUI";
            document.getElementById("robots").appendChild(this.robotUI);
            this.robotUI.appendChild(this.activateRobot);
            this.activateRobot.addEventListener("click", () => {
                activateRobot(this);
                console.log(this);
            });
            this.activateRobot.id = "activateRobot";
            this.activateRobot.textContent = "activate";

            this.robotUI.appendChild(this.callRobotBack);
            this.callRobotBack.addEventListener("click", () => {
                this.returnTimer();
            });
            this.callRobotBack.id = "callRobotBack";
            this.callRobotBack.textContent = "call back";

            this.robotUI.appendChild(this.disassembleRobot);
            this.disassembleRobot.addEventListener("click", () => {
                disassembleRobot(this);
            });
            this.disassembleRobot.id = "disassembleRobot";
            this.disassembleRobot.textContent = "disassemble";

            this.robotUI.appendChild(this.automateRobot);
            this.automateRobot.addEventListener("click", () => {
                setAutoMode(this);
            });
            this.automateRobot.id = "automateRobot";
            this.automateRobot.textContent = "automate";

            this.addComponent(new ƒ.ComponentMaterial(lumbererMaterial));


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

        renewStats(): void {
            this.hp.textContent = "Health: " + String(this.robotHealth) + " / " + String(this.robotMaxHealth);
            this.mods.textContent = "Profession: " + String(this.activeModuleString);
            this.flying.textContent = "Flying activated: " + String(this.moduleHovering);
            this.automated.textContent = "Automation activated: " + String(this.isAutomated);
            this.interaction.textContent = "Harvesting: " + String(this.isInteracting);
            this.cargo.textContent = "Cargo loaded: " + String(this.ressourceLoaded) + " / " + String(this.ressourceCapacity);
        }
        
        moveToNewField(): void {
            let thisX: number = this.mtxLocal.translation.x;
            let thisY: number = this.mtxLocal.translation.y;
            let nextDirection: number;
            this.previousField = new ƒ.Vector2(thisX, thisY);

            if (!this.isWaiting) {
                if (!this.isFighting) {
                    if (!this.isInteracting) {
                            nextDirection = Math.floor((Math.random() * 8)) + 1;
                            if (this.improvedWayfinding == true) {
                                for  (let i: number = 0; i < this.surroundingFields.length; i++){
                                    if (this.activeModuleString == "lumberer" && this.surroundingFields[i].attribute == FIELDATTRIBUTE.FOREST) {
                                        nextDirection = i+1;
                                    } else if (this.activeModuleString == "miner" && this.surroundingFields[i].attribute == FIELDATTRIBUTE.METAL) {
                                        nextDirection = i+1;
                                    } else if (this.activeModuleString == "oiler" && this.surroundingFields[i].attribute == FIELDATTRIBUTE.OIL) {
                                        nextDirection = i+1;
                                    } else if (this.activeModuleString == "scrapper" && this.surroundingFields[i].attribute == FIELDATTRIBUTE.WRECKAGE) {
                                        nextDirection = i+1;
                                    }
                                }
                            }
                            switch (nextDirection) {
                                 case 1: {
                                    if (mapHelperArray[thisX - 1][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateX(-1);
                                        this.mtxLocal.translateY(-1);
                                    }
                                    break;
                                }
                                case 2: {
                                    if (mapHelperArray[thisX - 1][thisY].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateX(-1);
                                    }
                                    break;
                                }
                                case 3: {
                                    if (mapHelperArray[thisX - 1][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateX(-1);
                                        this.mtxLocal.translateY(+1);
                                    }
                                    break;
                                }
                                case 4: {
                                    if (mapHelperArray[thisX][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateY(-1);
                                    }
                                    break;
                                }
                                case 5: {
                                    break;
                                }
                                case 6: {
                                    if (mapHelperArray[thisX][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateY(+1);
                                    }
                                    break;
                                }
                                case 7: {
                                    if (mapHelperArray[thisX + 1][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateX(+1);
                                        this.mtxLocal.translateY(-1);
                                    }
                                    break;
                                }
                                case 8: {
                                    if (mapHelperArray[thisX + 1][thisY].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                                        this.mtxLocal.translateX(+1);
                                    }
                                    break;
                                }
                                case 9: {
                                    if (mapHelperArray[thisX + 1][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
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

        interactWithField(_tile: WorldMapTile): void {
            if (_tile.hasEnemy) {
                this.isInteracting = true;
                this.isFighting = true;
                this.fightEnemy();
            } else {
                switch (_tile.attribute) {

                    case FIELDATTRIBUTE.FOREST: {

                        if (this.moduleLumberjack) {
                            this.isInteracting = true;
                            this.collectsBioMass = true;
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.MOUNTAIN: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.METAL: {
                        if (this.moduleMiner) {
                            this.isInteracting = true;
                            this.collectsMetal = true;
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.OIL: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        } else if (this.moduleOil) {
                            this.isInteracting = true;
                            this.collectsOil = true;
                        }

                        break;
                    }
                    case FIELDATTRIBUTE.WATER: {
                        if (!this.moduleHovering) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.WRECKAGE: {
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

        moveToPreviousField(): void {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }

        collectRessource(_tile: WorldMapTile): void {
            if (this.collectsBioMass == true) {
                this.ressourceLoaded += increaseBioMass;
                _tile.ressourceAmount -= increaseBioMass;
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
                this.ressourceLoaded += increaseRessource;
                _tile.ressourceAmount -= increaseRessource;
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
                this.ressourceLoaded += increaseOil;
                _tile.ressourceAmount -= increaseOil;
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
                this.ressourceLoaded += increaseScrap;
                _tile.ressourceAmount -= increaseScrap;
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

        returnTimer(): void {
            this.isCalledBack = true;
            this.isWaiting = true;
            ƒ.Time.game.setTimer(6000, 1, () => {
                this.returnToBase();
                this.isInteracting = false;
            });
        }

        returnToBase(): void {
            this.isInteracting = false;
            this.mtxLocal.translation = playerBase;
            if (this.moduleLumberjack) {
                ressourceBioMass += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleMiner) {
                ressourceMetal += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleOil) {
                ressourceOil += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            if (this.moduleScrapper) {
                ressourceScrap += this.ressourceLoaded;
                this.ressourceLoaded = 0;
            }
            this.robotHealth = this.robotMaxHealth;
            if (!this.isAutomated) {
                this.isWaiting = true;
            } else {
                this.isWaiting = false;
            }
        }

        fightEnemy(): void {
            let enemyLevel: number = ((Math.floor(Math.sqrt(Math.pow(this.mtxLocal.translation.x - (worldSize / 2), 2) + Math.pow(this.mtxLocal.translation.y - (worldSize / 2), 2)))) / 4) + 1;
            let enemy: Enemy = new Enemy(enemyLevel);
            if (this.moduleRetreat) {
                this.robotHealth -= enemy.damageOfEnemy;
                this.moveToPreviousField();
                this.isFighting = false;
            } else {
                let enemyMessage: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                enemyMessage.id = "enemyEncountered";
                document.getElementById("enemyWarning").appendChild(enemyMessage);
                enemyMessage.textContent = String("Robot Nr.:" + this.robotID + " encountered an enemy!");
                ƒ.Time.game.setTimer(20000, 1, () => {
                    if (this.isCalledBack) {
                        this.isCalledBack = false;
                    } else {
                        this.startFight(mapHelperArray[this.mtxLocal.translation.x][this.mtxLocal.translation.y], enemy);
                        ƒ.Time.game.setTimer(15000, 1, () => {
                            document.getElementById("enemyWarning").removeChild(enemyMessage);
                        });
                    }
                });
            }
        }

        startFight(tile: WorldMapTile, enemy: Enemy): void {
            while (this.isAlive && enemy.isAlive) {
                enemy.healthOfEnemy -= this.damageValue;
                this.robotHealth -= enemy.damageOfEnemy;
                if (enemy.healthOfEnemy <= 0) {
                    tile.hasEnemy = false;
                    tile.removeComponent(tile.getComponent(ƒ.ComponentMaterial));
                    tile.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                    ressourceScrap += enemy.scrapsDropped;
                    this.isFighting = false;
                    this.isInteracting = false;
                    break;
                }
                if (this.robotHealth <= 0) {
                    this.isAlive = false;
                    let deathMessage: HTMLDivElement = <HTMLDivElement>document.createElement("div");
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





    // Robot Management

}