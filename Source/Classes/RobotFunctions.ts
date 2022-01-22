namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export function createRobot(): void {
        let newRobot: Robot = new Robot("Robot #" + (robots.getChildren().length + 1), new ƒ.Vector2(worldSize / 2, worldSize / 2));
        robots.addChild(newRobot);
        
    }
    export function setRobotCost(robot: Robot): void {
        /* robot.costBioMass = 600;
        robot.costMetal = 0;
        robot.costOil = 0;
        robot.costScrap = 100; */
        console.log(robot.activeModuleString);
        switch (robot.activeModuleString) {
            case "lumberer": {
                robot.costBioMass = 600;
                robot.costMetal = 0;
                robot.costOil = 0;
                robot.costScrap = 100;
                break;
            }
            case "miner": {
                robot.costBioMass = 500;
                robot.costMetal = 0;
                robot.costOil = 100;
                robot.costScrap = 250;
                break;
            }
            case "oiler": {
                robot.costBioMass = 300;
                robot.costMetal = 300;
                robot.costOil = 200;
                robot.costScrap = 150;
                break;
                
            }
            case "scrapper": {
                robot.costBioMass = 600;
                robot.costMetal = 200;
                robot.costOil = 100;
                robot.costScrap = 0;
                break;
            }
            case "none": {
                robot.costBioMass = 50;
                robot.costMetal = 0;
                robot.costOil = 0;
                robot.costScrap = 0;
                break;
            }
        }
        if (robot.moduleHovering == true) {
            robot.costBioMass += 100;
            robot.costMetal += 100;
            robot.costOil += 200;
            robot.costScrap += 200;
        }
        if (robot.moduleRetreat == true) {
            robot.costBioMass += 100;
            robot.costMetal += 100;
            robot.costOil += 200;
            robot.costScrap += 0;
        }
        document.getElementById("costSpanBioMass").textContent = robot.costBioMass.toString();
        document.getElementById("costSpanMetal").textContent = robot.costMetal.toString();
        document.getElementById("costSpanOil").textContent = robot.costOil.toString();
        document.getElementById("costSpanScrap").textContent = robot.costScrap.toString();
        
    }


    export function spawnRobot(robot: Robot): void {

        console.log(ressourceBioMass)
        console.log(ressourceOre)
        console.log(ressourceOil)
        console.log(ressourceScrap)
        console.log(robot.costBioMass)
        console.log(robot.costMetal)
        console.log(robot.costOil)
        console.log(robot.costScrap)
        if (
            ressourceScrap >= robot.costScrap && 
            ressourceBioMass >= robot.costBioMass && 
            ressourceOre >= robot.costMetal && 
            ressourceOil >= robot.costOil
            ) {
            //werte anpassen //Kosten anzeigen
            ressourceBioMass -= robot.costBioMass;
            ressourceOre -= robot.costMetal;
            ressourceOil -= robot.costOil
            ressourceScrap -= robot.costScrap;
            console.log("enough");
            document.getElementById("CustomizeWindow").removeChild(document.getElementById("Customizer"));
            document.getElementById("CustomizeWindow").style.display = "none";
            document.getElementById("CustomizeWindow").style.zIndex = "-1";
            document.getElementById("createRobot").style.zIndex = "0";
        } else {
            //removeRobot(robot);
            document.getElementById("warningSpan").textContent = "Not enough ressources";
            console.log("not enough");
        }
    }

    export function removeRobot(robot: Robot): void {
        robots.removeChild(robot);
        document.getElementById("Robots").removeChild(robot.robotUI);
    }

    export function activateRobot(robot: Robot): void {
        robot.isWaiting = false;
    }

    export function disassembleRobot(robot: Robot): void {
        removeRobot(robot);
        ressourceScrap += 25;
    }

    //Module settings
    export function setCollectionModule(robot: Robot, module: string): void {
        switch (module) {
            case "lumberer": {
                robot.moduleLumberjack = true;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                robot.damageValue = 4;
                break;
            }
            case "miner": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = true;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                robot.damageValue = 6;
                break;
            }
            case "oiler": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = true;
                robot.moduleScrapper = false;
                robot.damageValue = 2;
                break;
            }
            case "scrapper": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = true;
                robot.damageValue = 8;
                break;
            }
            case "none": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                robot.damageValue = 15;
                break;
            }
            default:
                break;
        }
    }

    export function setFightMode(robot: Robot, module: string): void {
        switch (module) {
            case "fight": {
                robot.moduleFighter = true;
                robot.moduleRetreat = false;
                break;
            }
            case "retreat": {
                robot.moduleFighter = false;
                robot.moduleRetreat = true;
                break;
            }
        }
    }

    export function setAutoMode(robot: Robot): void {
        if (robot.isAutomated == true) {
            robot.isAutomated = false;
            console.log("i am in non-auto mode");
        } else if (robot.isAutomated == false) {
            robot.isAutomated = true;
            console.log("i am in auto mode");
        }
    }

    export function setHoverMode(robot: Robot): void {
        if (robot.moduleHovering) {
            robot.moduleHovering = false;
        } else if (!robot.moduleHovering) {
            robot.moduleHovering = true;
        }
    }
}