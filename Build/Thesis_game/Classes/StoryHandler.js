"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    // tslint:disable: no-any
    class StoryHandler {
        storyUI = document.createElement("div");
        story;
        chapter;
        constructor() {
            this.loadStory();
            this.storyUI.className = "StoryUI";
            document.getElementById("StoryBox").appendChild(this.storyUI);
            this.storyUI.style.display = "none";
        }
        async loadStory() {
            this.story = await (await fetch("Quests.json")).json();
        }
        playStory() {
            this.storyUI.style.display = "inline";
        }
        progressChapter(questStage) {
            switch (questStage) {
                case RoboGameNamespace.QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial.chapterContent; //komplette Quests einfügen in json, dann komplette Objekte herausladen, inklusive Belohnung etc, statt stgingArray
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.EARLYGAME: {
                    this.chapter = this.story.earlyGame.chapterContent;
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.MIDGAME: {
                    this.chapter = this.story.midGame.chapterContent;
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.LATEGAME: {
                    this.chapter = this.story.lateGame.chapterContent;
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.ENDGAME: {
                    this.chapter = this.story.endGame.chapterContent;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        playPrologue() {
        }
    }
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=StoryHandler.js.map