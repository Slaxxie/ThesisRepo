namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export function newGame(): void {
        document.getElementById("worldCreation").style.display = "block";
        document.getElementById("mainMenu").style.display = "none";
        level = 1;
        document.getElementById("createWorldButton").addEventListener("click", () => {
            startGameLoop();
            document.getElementById("worldCreation").style.display = "none";
            storyHandler.playStoryPrologue();
        });

    }
    export function loadGame(): void {
        startGameLoop();
        console.log("loaded");
    }

    export function openRobotCustomization(): void {
        let customizationUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        customizationUI.id = "Customizer";
        document.getElementById("CustomizeWindow").appendChild(customizationUI);
        //Declare harvesting module
        let buttonLeftHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            
            harvestModuleIndex -= 1;
            chooseHarvestModule(harvestModuleIndex);
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        buttonLeftHarvesting.id = "buttonLeftHarvesting";
        buttonLeftHarvesting.textContent = "<";

        let buttonRightHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            harvestModuleIndex += 1;
            chooseHarvestModule(harvestModuleIndex);
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            console.log(harvestModuleIndex);
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



        //Declare fightmode
        let buttonFighting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "fight");
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            activeFightMode.textContent = "Fighting";
        });
        buttonFighting.id = "buttonFighting";
        buttonFighting.textContent = "Fight Mode";

        let buttonRetreat: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
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
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            setRobotCost(<Robot>robots.getChild(robots.getChildren().length - 1));
            spawnRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
            
            
        });
        spawnNewRobot.id = "spawnNewRobot";
        spawnNewRobot.textContent = "Spawn Robot";

        let closeCustomization: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(closeCustomization);
        closeCustomization.addEventListener("click", () => {
            removeRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
            document.getElementById("CustomizeWindow").removeChild(customizationUI);
            document.getElementById("CustomizeWindow").style.display = "none";
            document.getElementById("CustomizeWindow").style.zIndex = "-1";
            document.getElementById("createRobot").style.zIndex = "0";
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