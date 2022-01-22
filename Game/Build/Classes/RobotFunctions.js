"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    function createRobot() {
        let newRobot = new RoboGameNamespace.Robot("Robot #" + (RoboGameNamespace.robots.getChildren().length + 1), new ƒ.Vector2(RoboGameNamespace.worldSize / 2, RoboGameNamespace.worldSize / 2));
        RoboGameNamespace.robots.addChild(newRobot);
    }
    RoboGameNamespace.createRobot = createRobot;
    function setRobotCost(robot) {
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
    RoboGameNamespace.setRobotCost = setRobotCost;
    function spawnRobot(robot) {
        console.log(RoboGameNamespace.ressourceBioMass);
        console.log(RoboGameNamespace.ressourceOre);
        console.log(RoboGameNamespace.ressourceOil);
        console.log(RoboGameNamespace.ressourceScrap);
        console.log(robot.costBioMass);
        console.log(robot.costMetal);
        console.log(robot.costOil);
        console.log(robot.costScrap);
        if (RoboGameNamespace.ressourceScrap >= robot.costScrap &&
            RoboGameNamespace.ressourceBioMass >= robot.costBioMass &&
            RoboGameNamespace.ressourceOre >= robot.costMetal &&
            RoboGameNamespace.ressourceOil >= robot.costOil) {
            //werte anpassen //Kosten anzeigen
            RoboGameNamespace.ressourceBioMass -= robot.costBioMass;
            RoboGameNamespace.ressourceOre -= robot.costMetal;
            RoboGameNamespace.ressourceOil -= robot.costOil;
            RoboGameNamespace.ressourceScrap -= robot.costScrap;
            console.log("enough");
            document.getElementById("CustomizeWindow").removeChild(document.getElementById("Customizer"));
            document.getElementById("CustomizeWindow").style.display = "none";
            document.getElementById("CustomizeWindow").style.zIndex = "-1";
            document.getElementById("createRobot").style.zIndex = "0";
        }
        else {
            //removeRobot(robot);
            document.getElementById("warningSpan").textContent = "Not enough ressources";
            console.log("not enough");
        }
    }
    RoboGameNamespace.spawnRobot = spawnRobot;
    function removeRobot(robot) {
        RoboGameNamespace.robots.removeChild(robot);
        document.getElementById("Robots").removeChild(robot.robotUI);
    }
    RoboGameNamespace.removeRobot = removeRobot;
    function activateRobot(robot) {
        robot.isWaiting = false;
    }
    RoboGameNamespace.activateRobot = activateRobot;
    function disassembleRobot(robot) {
        removeRobot(robot);
        RoboGameNamespace.ressourceScrap += 25;
    }
    RoboGameNamespace.disassembleRobot = disassembleRobot;
    //Module settings
    function setCollectionModule(robot, module) {
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
    RoboGameNamespace.setCollectionModule = setCollectionModule;
    function setFightMode(robot, module) {
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
    RoboGameNamespace.setFightMode = setFightMode;
    function setAutoMode(robot) {
        if (robot.isAutomated == true) {
            robot.isAutomated = false;
            console.log("i am in non-auto mode");
        }
        else if (robot.isAutomated == false) {
            robot.isAutomated = true;
            console.log("i am in auto mode");
        }
    }
    RoboGameNamespace.setAutoMode = setAutoMode;
    function setHoverMode(robot) {
        if (robot.moduleHovering) {
            robot.moduleHovering = false;
        }
        else if (!robot.moduleHovering) {
            robot.moduleHovering = true;
        }
    }
    RoboGameNamespace.setHoverMode = setHoverMode;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=RobotFunctions.js.map