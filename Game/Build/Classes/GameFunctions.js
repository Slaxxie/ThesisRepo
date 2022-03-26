"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    function newGame() {
        document.getElementById("worldCreation").style.display = "block";
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("createWorldButton").addEventListener("click", () => {
            RoboGameNamespace.startGameLoop();
            document.getElementById("worldCreation").style.display = "none";
            RoboGameNamespace.storyHandler.playStoryPrologue();
            document.getElementById("blocker").style.display = "none";
        });
    }
    RoboGameNamespace.newGame = newGame;
    function loadGame() {
        RoboGameNamespace.startGameLoop();
    }
    RoboGameNamespace.loadGame = loadGame;
    function openRobotCustomization() {
        document.getElementById("ressourceBar").style.zIndex = "4";
        let customizationUI = document.createElement("div");
        customizationUI.id = "customizer";
        document.getElementById("customizeWindow").appendChild(customizationUI);
        //Declare harvesting module
        let buttonLeftHarvesting = document.createElement("button");
        buttonLeftHarvesting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            RoboGameNamespace.harvestModuleIndex -= 1;
            chooseHarvestModule(RoboGameNamespace.harvestModuleIndex);
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        buttonLeftHarvesting.id = "buttonLeftHarvesting";
        buttonLeftHarvesting.textContent = "<";
        let buttonRightHarvesting = document.createElement("button");
        buttonRightHarvesting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            RoboGameNamespace.harvestModuleIndex += 1;
            chooseHarvestModule(RoboGameNamespace.harvestModuleIndex);
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        buttonRightHarvesting.id = "buttonRightHarvesting";
        buttonRightHarvesting.textContent = ">";
        let activeModule = document.createElement("div");
        activeModule.id = "activeModule";
        activeModule.textContent = "lumberer";
        customizationUI.appendChild(activeModule);
        let activeFightMode = document.createElement("div");
        activeFightMode.id = "activeFightMode";
        activeFightMode.textContent = "Fighting";
        customizationUI.appendChild(activeFightMode);
        let activeHover = document.createElement("div");
        activeHover.id = "activeHover";
        activeHover.textContent = "test";
        // activeHover.textContent = ((<Robot>robots.getChild(robots.getChildren().length - 1)).moduleHovering).toString();
        customizationUI.appendChild(activeHover);
        let improvedMovementDiv = document.createElement("div");
        improvedMovementDiv.id = "improvedMovementDiv";
        improvedMovementDiv.textContent = "inactive";
        customizationUI.appendChild(improvedMovementDiv);
        let toggleImprovedWayfinding = document.createElement("button");
        toggleImprovedWayfinding.className = "buttonDesignClass";
        customizationUI.appendChild(toggleImprovedWayfinding);
        toggleImprovedWayfinding.addEventListener("click", () => {
            let rob = RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1);
            if (rob.improvedWayfinding == false) {
                rob.improvedWayfinding = true;
                improvedMovementDiv.textContent = "active";
            }
            else {
                rob.improvedWayfinding = false;
                improvedMovementDiv.textContent = "inactive";
            }
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        toggleImprovedWayfinding.id = "activateImprovedWayfinding";
        toggleImprovedWayfinding.textContent = "Wayfinding";
        //Declare fightmode
        let buttonFighting = document.createElement("button");
        buttonFighting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "fight");
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            activeFightMode.textContent = "Fighting";
        });
        buttonFighting.id = "buttonFighting";
        buttonFighting.textContent = "Fight Mode";
        let buttonRetreat = document.createElement("button");
        buttonRetreat.className = "buttonDesignClass";
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "retreat");
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            activeFightMode.textContent = "Retreating";
        });
        buttonRetreat.id = "buttonRetreat";
        buttonRetreat.textContent = "Retreat Mode";
        //Declare hovering
        let buttonHovering = document.createElement("button");
        buttonHovering.className = "buttonDesignClass";
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            RoboGameNamespace.setHoverMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            activeHover.textContent = (RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).moduleHovering).toString();
        });
        buttonHovering.id = "buttonHovering";
        buttonHovering.textContent = "Hover Mode";
        let costDiv = document.createElement("div");
        costDiv.id = "costDiv";
        customizationUI.appendChild(costDiv);
        let costSpanBioMass = document.createElement("span");
        costSpanBioMass.id = "costSpanBioMass";
        let costLabelBioMass = document.createElement("label");
        costDiv.appendChild(costLabelBioMass);
        costDiv.appendChild(costSpanBioMass);
        costLabelBioMass.textContent = "Biomass ";
        costLabelBioMass.id = "costLabelBioMass";
        let costSpanMetal = document.createElement("span");
        costSpanMetal.id = "costSpanMetal";
        let costLabelMetal = document.createElement("label");
        costDiv.appendChild(costLabelMetal);
        costDiv.appendChild(costSpanMetal);
        costLabelMetal.textContent = "Metal ";
        costLabelMetal.id = "costLabelMetal";
        let costSpanOil = document.createElement("span");
        costSpanOil.id = "costSpanOil";
        let costLabelOil = document.createElement("label");
        costDiv.appendChild(costLabelOil);
        costDiv.appendChild(costSpanOil);
        costLabelOil.textContent = "Oil ";
        costLabelOil.id = "costLabelOil";
        let costSpanScrap = document.createElement("span");
        costSpanScrap.id = "costSpanScrap";
        let costLabelScrap = document.createElement("label");
        costDiv.appendChild(costLabelScrap);
        costDiv.appendChild(costSpanScrap);
        costLabelScrap.textContent = "Scrap ";
        costLabelScrap.id = "costLabelScrap";
        RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        //Spawn Robot into world
        let spawnNewRobot = document.createElement("button");
        spawnNewRobot.className = "buttonDesignClass";
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            RoboGameNamespace.setRobotCost(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            RoboGameNamespace.spawnRobot(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            document.getElementById("blocker").style.display = "none";
        });
        spawnNewRobot.id = "spawnNewRobot";
        spawnNewRobot.textContent = "Spawn Robot";
        let closeCustomization = document.createElement("button");
        closeCustomization.className = "buttonDesignClass";
        customizationUI.appendChild(closeCustomization);
        closeCustomization.addEventListener("click", () => {
            RoboGameNamespace.removeRobot(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            document.getElementById("customizeWindow").removeChild(customizationUI);
            document.getElementById("blocker").style.display = "none";
            document.getElementById("customizeWindow").style.display = "none";
            document.getElementById("customizeWindow").style.zIndex = "-1";
            document.getElementById("createRobot").style.zIndex = "0";
            document.getElementById("ressourceBar").style.zIndex = "1";
        });
        closeCustomization.id = "closeCustomization";
        closeCustomization.textContent = "Cancel";
        let missingResWarning = document.createElement("span");
        missingResWarning.id = "warningSpan";
        costDiv.appendChild(missingResWarning);
        missingResWarning.textContent = "can build";
    }
    RoboGameNamespace.openRobotCustomization = openRobotCustomization;
    function moduleToHTML(module) {
        document.getElementById("activeModule").textContent = String(module);
    }
    RoboGameNamespace.moduleToHTML = moduleToHTML;
    function chooseHarvestModule(index) {
        let tempModule = "lumberer";
        switch (index) {
            case 0: {
                RoboGameNamespace.harvestModuleIndex = 5;
                chooseHarvestModule(RoboGameNamespace.harvestModuleIndex);
                break;
            }
            case 1: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), tempModule = "lumberer");
                moduleToHTML(tempModule);
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).activeModuleString = tempModule;
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).removeComponent(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).getComponent(ƒ.ComponentMaterial));
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.lumbererMaterial));
                break;
            }
            case 2: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), tempModule = "miner");
                moduleToHTML(tempModule);
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).activeModuleString = tempModule;
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).removeComponent(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).getComponent(ƒ.ComponentMaterial));
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.minerMaterial));
                break;
            }
            case 3: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), tempModule = "oiler");
                moduleToHTML(tempModule);
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).activeModuleString = tempModule;
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).removeComponent(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).getComponent(ƒ.ComponentMaterial));
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.oilerMaterial));
                break;
            }
            case 4: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), tempModule = "scrapper");
                moduleToHTML(tempModule);
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).activeModuleString = tempModule;
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).removeComponent(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).getComponent(ƒ.ComponentMaterial));
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.scrapperMaterial));
                break;
            }
            case 5: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), tempModule = "none");
                moduleToHTML(tempModule);
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).activeModuleString = tempModule;
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).removeComponent(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).getComponent(ƒ.ComponentMaterial));
                RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1).addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.scrapperMaterial));
                break;
            }
            case 6: {
                RoboGameNamespace.harvestModuleIndex = 1;
                chooseHarvestModule(RoboGameNamespace.harvestModuleIndex);
                break;
            }
            default: {
                RoboGameNamespace.harvestModuleIndex = 1;
                break;
            }
        }
    }
    RoboGameNamespace.chooseHarvestModule = chooseHarvestModule;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=GameFunctions.js.map