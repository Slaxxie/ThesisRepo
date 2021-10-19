namespace RoboGame {
    import ƒ = FudgeCore;
    export let movementTimer: number = 0;
    let moduleMovement: boolean = true;
    let moduleFlying: boolean = false;
    let moduleInteraction: boolean = true;
    let moduleLumberjack: boolean = false;
    let moduleMiner: boolean = false;
    let moduleOil: boolean = false;
    let moduleFighter: boolean = false;
    let moduleRetreat: boolean = false;
    let moduleScout: boolean = false;
    let moduleBuild: boolean = false;
    let newFieldAttribute: string;
    let isInteracting: boolean = false;
    let previousField: ƒ.Vector2;
    export let robotAlive: boolean = true;
    export let damageValue: number;

    let ressouceScrap: number; // austauschen


    export class Robot extends QuadNode {
        constructor(_name: string, _pos: ƒ.Vector2, _id: number) {
            let robotID: number = _id;
            let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
            super("Robot: " + robotID, _pos, scale);
            let robotMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureShip));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField(): void {
            if (moduleMovement || moduleFlying) {
                console.log("Moving to: ");
                this.interactWithField();
            }
        }
        moveToPreviousField(): void {
            this.mtxLocal.translation = new ƒ.Vector3 (previousField.x, previousField.y, 0);
        }
        obtainQuest(): void {
            console.log("placeholder" + moduleBuild);
        }
        collectWood(): void {
            console.log("placeholder" + moduleFighter);
        }
        collectOre(): void {
            console.log("placeholder");
        }
        collectOil(): void {
            console.log("placeholder");
        }
        collectScrap(): void {
            console.log("placeholder");
        }

        fightEnemy(): void {
            let newEnemy: Enemy = new Enemy(5);
            if (damageValue > newEnemy.damageOfEnemy) {
                ressouceScrap += newEnemy.scrapsDropped;
                isInteracting = false;
            } else {
                robotAlive = !robotAlive;
            }
        }
    
        interactWithField(): void {
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
                        } else {
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
}