namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export function newGame(): void {
        document.getElementById("worldCreation").style.display = "block";
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("createWorldButton").addEventListener("click", () => {
            startGameLoop();
            document.getElementById("worldCreation").style.display = "none";
            storyHandler.playStoryPrologue();
            document.getElementById("blocker").style.display = "none";
        });

    }
    export function loadGame(): void {
        startGameLoop();
    }

    export function openRobotCustomization(): void {
        document.getElementById("ressourceBar").style.zIndex= "4";
        let customizationUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        customizationUI.id = "customizer";
        document.getElementById("customizeWindow").appendChild(customizationUI);
        //Declare harvesting module
        let buttonLeftHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        buttonLeftHarvesting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            
            harvestModuleIndex -= 1;
            chooseHarvestModule(harvestModuleIndex);
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        buttonLeftHarvesting.id = "buttonLeftHarvesting";
        buttonLeftHarvesting.textContent = "<";

        let buttonRightHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        buttonRightHarvesting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            harvestModuleIndex += 1;
            chooseHarvestModule(harvestModuleIndex);
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        buttonRightHarvesting.id = "buttonRightHarvesting";
        buttonRightHarvesting.textContent = ">";

        let activeModule: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        activeModule.id = "activeModule";
        activeModule.textContent = "lumberer";
        customizationUI.appendChild(activeModule);

        let activeFightMode: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        activeFightMode.id = "activeFightMode";
        activeFightMode.textContent = "Fighting";
        customizationUI.appendChild(activeFightMode);
        
        
        let activeHover: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        activeHover.id = "activeHover";
        activeHover.textContent = ((<Robot>robots.getChild(robots.getChildren().length - 1)).moduleHovering).toString();
        customizationUI.appendChild(activeHover);
        
        let improvedMovementDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        improvedMovementDiv.id = "improvedMovementDiv";
        improvedMovementDiv.textContent = "inactive";
        customizationUI.appendChild(improvedMovementDiv);


        let toggleImprovedWayfinding: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        toggleImprovedWayfinding.className = "buttonDesignClass";
        customizationUI.appendChild(toggleImprovedWayfinding);
        toggleImprovedWayfinding.addEventListener("click", () => {
            let rob: Robot = <Robot>robots.getChild(robots.getChildren().length - 1);
            if (rob.improvedWayfinding == false){
                rob.improvedWayfinding = true; 
                improvedMovementDiv.textContent = "active";
            } else {
                rob.improvedWayfinding = false;
                improvedMovementDiv.textContent = "inactive";
            }
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        toggleImprovedWayfinding.id = "activateImprovedWayfinding";
        toggleImprovedWayfinding.textContent = "Wayfinding";



        //Declare fightmode
        let buttonFighting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        buttonFighting.className = "buttonDesignClass";
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "fight");
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            activeFightMode.textContent = "Fighting";
        });
        buttonFighting.id = "buttonFighting";
        buttonFighting.textContent = "Fight Mode";

        let buttonRetreat: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        buttonRetreat.className = "buttonDesignClass";
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "retreat");
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            activeFightMode.textContent = "Retreating";
        });
        buttonRetreat.id = "buttonRetreat";
        buttonRetreat.textContent = "Retreat Mode";

        //Declare hovering
        let buttonHovering: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        buttonHovering.className = "buttonDesignClass";
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            setHoverMode(<Robot>robots.getChild(robots.getChildren().length - 1));
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            activeHover.textContent = ((<Robot>robots.getChild(robots.getChildren().length - 1)).moduleHovering).toString();
        });
        buttonHovering.id = "buttonHovering";
        buttonHovering.textContent = "Hover Mode";

        let costDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        costDiv.id = "costDiv";
        customizationUI.appendChild(costDiv);
        let costSpanBioMass: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        costSpanBioMass.id = "costSpanBioMass";
        let costLabelBioMass: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
        costDiv.appendChild(costLabelBioMass);
        costDiv.appendChild(costSpanBioMass);
        costLabelBioMass.textContent = "Biomass ";
        costLabelBioMass.id = "costLabelBioMass";
        let costSpanMetal: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        costSpanMetal.id = "costSpanMetal";
        let costLabelMetal: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
        costDiv.appendChild(costLabelMetal);
        costDiv.appendChild(costSpanMetal);
        costLabelMetal.textContent = "Metal ";
        costLabelMetal.id = "costLabelMetal";
        let costSpanOil: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        costSpanOil.id = "costSpanOil";
        let costLabelOil: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
        costDiv.appendChild(costLabelOil);
        costDiv.appendChild(costSpanOil);
        costLabelOil.textContent = "Oil ";
        costLabelOil.id = "costLabelOil";
        let costSpanScrap: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        costSpanScrap.id = "costSpanScrap";
        let costLabelScrap: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
        costDiv.appendChild(costLabelScrap);
        costDiv.appendChild(costSpanScrap);
        costLabelScrap.textContent = "Scrap ";
        costLabelScrap.id = "costLabelScrap";
        setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));

        //Spawn Robot into world
        let spawnNewRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        spawnNewRobot.className = "buttonDesignClass";
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            spawnRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
            document.getElementById("blocker").style.display = "none";
            
        });
        spawnNewRobot.id = "spawnNewRobot";
        spawnNewRobot.textContent = "Spawn Robot";

        let closeCustomization: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        closeCustomization.className = "buttonDesignClass";
        customizationUI.appendChild(closeCustomization);
        closeCustomization.addEventListener("click", () => {
            removeRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
            document.getElementById("customizeWindow").removeChild(customizationUI);
            document.getElementById("blocker").style.display = "none";
            document.getElementById("customizeWindow").style.display = "none";
            document.getElementById("customizeWindow").style.zIndex = "-1";
            document.getElementById("createRobot").style.zIndex = "0";
            document.getElementById("ressourceBar").style.zIndex= "1";
        });
        closeCustomization.id = "closeCustomization";
        closeCustomization.textContent = "Cancel";

        let missingResWarning: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        missingResWarning.id = "warningSpan";
        costDiv.appendChild(missingResWarning);
        missingResWarning.textContent = "can build";
        

    }

    export function moduleToHTML(module: string): void {
        document.getElementById("activeModule").textContent = String(module);
    }

    export function chooseHarvestModule(index: number): void {

        let tempModule: string = "lumberer";
        switch (index) {
            case 0: {
                harvestModuleIndex = 5;
                chooseHarvestModule(harvestModuleIndex);
                break;
            }
            case 1: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), tempModule = "lumberer");
                moduleToHTML(tempModule);
                (<Robot>robots.getChild(robots.getChildren().length - 1)).activeModuleString = tempModule;
                (<Robot>robots.getChild(robots.getChildren().length - 1)).removeComponent((<Robot>robots.getChild(robots.getChildren().length - 1)).getComponent(ƒ.ComponentMaterial));
                (<Robot>robots.getChild(robots.getChildren().length - 1)).addComponent(new ƒ.ComponentMaterial(lumbererMaterial));
                break;
            }
            case 2: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), tempModule = "miner");
                moduleToHTML(tempModule);
                (<Robot>robots.getChild(robots.getChildren().length - 1)).activeModuleString = tempModule;
                (<Robot>robots.getChild(robots.getChildren().length - 1)).removeComponent((<Robot>robots.getChild(robots.getChildren().length - 1)).getComponent(ƒ.ComponentMaterial));
                (<Robot>robots.getChild(robots.getChildren().length - 1)).addComponent(new ƒ.ComponentMaterial(minerMaterial));
                break;
            }
            case 3: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), tempModule = "oiler");
                moduleToHTML(tempModule);
                (<Robot>robots.getChild(robots.getChildren().length - 1)).activeModuleString = tempModule;
                (<Robot>robots.getChild(robots.getChildren().length - 1)).removeComponent((<Robot>robots.getChild(robots.getChildren().length - 1)).getComponent(ƒ.ComponentMaterial));
                (<Robot>robots.getChild(robots.getChildren().length - 1)).addComponent(new ƒ.ComponentMaterial(oilerMaterial));
                break;
            }
            case 4: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), tempModule = "scrapper");
                moduleToHTML(tempModule);
                (<Robot>robots.getChild(robots.getChildren().length - 1)).activeModuleString = tempModule;
                (<Robot>robots.getChild(robots.getChildren().length - 1)).removeComponent((<Robot>robots.getChild(robots.getChildren().length - 1)).getComponent(ƒ.ComponentMaterial));
                (<Robot>robots.getChild(robots.getChildren().length - 1)).addComponent(new ƒ.ComponentMaterial(scrapperMaterial));
                break;
            }
            case 5: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), tempModule = "none");
                moduleToHTML(tempModule);
                (<Robot>robots.getChild(robots.getChildren().length - 1)).activeModuleString = tempModule;
                (<Robot>robots.getChild(robots.getChildren().length - 1)).removeComponent((<Robot>robots.getChild(robots.getChildren().length - 1)).getComponent(ƒ.ComponentMaterial));
                (<Robot>robots.getChild(robots.getChildren().length - 1)).addComponent(new ƒ.ComponentMaterial(scrapperMaterial));
                break;

            }
            case 6: {
                harvestModuleIndex = 1;
                chooseHarvestModule(harvestModuleIndex);
                break;
            }
            default: {
                harvestModuleIndex = 1;
                break;
            }
        }
    }
}