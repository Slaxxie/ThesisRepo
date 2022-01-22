namespace RoboGameNamespace {
    export function initializeButtons(): void {
        document.getElementById("newGame").addEventListener("click", () => {
            newGame();
            document.getElementById("optionMenu").style.display = "none";
        });

        document.getElementById("toMainMenu").addEventListener("click", () => {
            console.log(newRiddle);
            document.getElementById("mainMenu").style.display = "block";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("robotMap").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
            document.getElementById("QuestMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "none";
            document.getElementById("RiddleMenu").style.display = "none";
            if (document.getElementById("textRiddleFrame") != null) {
                document.getElementById("textRiddleFrame").remove();
            }
            if (document.getElementById("RiddleUI") != null) {
                document.getElementById("RiddleUI").remove();
            }
            newRiddle = null;
            console.log(newRiddle);
            roboGameNode.activate(false);
        });

        document.getElementById("loadGame").addEventListener("click", () => {
            loadGame();
            document.getElementById("optionMenu").style.display = "none";
        });
        document.getElementById("showQuest").addEventListener("click", () => {
            document.getElementById("QuestMenu").style.display = "block";
        });

        document.getElementById("startRiddle").addEventListener("click", () => {
            document.getElementById("RiddleMenu").style.display = "block";
            newRiddle = new OpenRiddle();
        });

        document.getElementById("option").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "block";
        });
        document.getElementById("backOption").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "none";
        });

        document.getElementById("openLog").addEventListener("click", () => {
            document.getElementById("logbook").style.display = "block";
        });
        document.getElementById("closeLog").addEventListener("click", () => {
            document.getElementById("logbook").style.display = "none";
        });

        document.getElementById("storyLogs").addEventListener("click", () => {
            document.getElementById("logbook-story").style.display = "block";
            document.getElementById("logbook-quest").style.display = "none";
        });

        document.getElementById("questLogs").addEventListener("click", () => {
            document.getElementById("logbook-story").style.display = "none";
            document.getElementById("logbook-quest").style.display = "block";
        });

        document.getElementById("showRobotMap").addEventListener("click", () => {
            roboGameNode.activate(true);
            document.getElementById("toMainMenu").style.display = "none";
            document.getElementById("mainMenuBack").style.display = "none";
            document.getElementById("Sidebar").style.display = "block";
            document.getElementById("robotMapMenu").style.display = "block";
            document.getElementById("ingameMenu").style.display = "none";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("robotMap").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
        });

        document.getElementById("closeRobotMap").addEventListener("click", () => {
            roboGameNode.activate(false);
            document.getElementById("toMainMenu").style.display = "block";
            document.getElementById("mainMenuBack").style.display = "block";
            document.getElementById("Sidebar").style.display = "none";
            document.getElementById("robotMapMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "block";
            document.getElementById("robotCustomizer").style.display = "block";
            document.getElementById("robotMap").style.display = "block";
            document.getElementById("ressourceBar").style.display = "block";
        });

        document.getElementById("saveWorld").addEventListener("click", () => {
            saveNoisemap();
            //create image from noisemap and show
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            console.log(harvestModuleIndex);
            openRobotCustomization();
            createRobot();

            document.getElementById("CustomizeWindow").style.display = "block"; //change z index
            document.getElementById("CustomizeWindow").style.zIndex = "2";
            document.getElementById("createRobot").style.zIndex = "-1"; //change z index

            chooseHarvestModule(harvestModuleIndex);
        });
    }
}