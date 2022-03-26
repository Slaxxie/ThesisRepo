namespace RoboGameNamespace {
    export function initializeButtons(): void {
        document.getElementById("newGame").addEventListener("click", () => {
            newGame();
            document.getElementById("optionMenu").style.display = "none";
        });

        document.getElementById("toMainMenu").addEventListener("click", () => {
            document.getElementById("blocker").style.display = "block";
            document.getElementById("mainMenu").style.display = "block";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("robotMap").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
            document.getElementById("questMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "none";
            document.getElementById("riddleMenu").style.display = "none";
            if (document.getElementById("textRiddleFrame") != null) {
                document.getElementById("textRiddleFrame").remove();
            }
            if (document.getElementById("riddleUI") != null) {
                document.getElementById("riddleUI").remove();
            }
            newRiddle = null;
            roboGameNode.activate(false);
        });

        document.getElementById("soundMenu").addEventListener("click", () => {
            
            document.getElementById("optionMenu").style.display = "block";
        });

        document.getElementById("showQuest").addEventListener("click", () => {
            document.getElementById("blocker").style.display = "block";
            document.getElementById("questMenu").style.display = "block";
        });

        document.getElementById("startRiddle").addEventListener("click", () => {
            console.log(riddleBooleanTemp);
            if (riddleBooleanTemp == false) {
                document.getElementById("riddleMenu").style.display = "block";
                document.getElementById("blocker").style.display = "block";
                newRiddle = new Riddles();
            }
        });

        document.getElementById("option").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "block";
        });
        document.getElementById("backOption").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "none";
        });

        document.getElementById("openLog").addEventListener("click", () => {
            document.getElementById("logbook").style.display = "block";
            document.getElementById("blocker").style.display = "block";
        });
        document.getElementById("closeLog").addEventListener("click", () => {
            document.getElementById("logbook").style.display = "none";
            document.getElementById("blocker").style.display = "none";
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
            document.getElementById("sidebar").style.display = "block";
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
            document.getElementById("sidebar").style.display = "none";
            document.getElementById("robotMapMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "block";
            document.getElementById("robotCustomizer").style.display = "block";
            document.getElementById("robotMap").style.display = "block";
            document.getElementById("ressourceBar").style.display = "block";
        });

        document.getElementById("saveWorld").addEventListener("click", () => {
            saveNoisemap();
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            document.getElementById("blocker").style.display = "block";
            createRobot();
            openRobotCustomization();

            document.getElementById("customizeWindow").style.display = "block";
            document.getElementById("customizeWindow").style.zIndex = "2";
            document.getElementById("createRobot").style.zIndex = "-1";

            chooseHarvestModule(harvestModuleIndex);
        });
        document.getElementById("reviewPrologue").addEventListener("click", () => {
            document.getElementById("prologueDiv").style.display = "block";
            document.getElementById("prologueDiv").style.zIndex = "5";
            document.getElementById("prologueImage1").style.display = "block";
            document.getElementById("prologueImage2").style.display = "none";
            document.getElementById("nextPage").style.display = "block";
            document.getElementById("closePrologue").style.display = "none";
            document.getElementById("nextPage").addEventListener("click", () => {
                document.getElementById("prologueImage1").style.display = "none";
                document.getElementById("prologueImage2").style.display = "block";
                document.getElementById("nextPage").style.display = "none";
                document.getElementById("closePrologue").style.display = "block";
            });
            document.getElementById("closePrologue").addEventListener("click", () => {
                document.getElementById("prologueDiv").style.display = "none";
                document.getElementById("prologueDiv").style.zIndex = "-1";
            });
        });
    }
    
}