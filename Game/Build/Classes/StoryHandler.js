"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    // tslint:disable: no-any
    class StoryHandler {
        storyUI = document.createElement("div");
        storyImage = document.createElement("img");
        story;
        chapter;
        header = document.createElement("div");
        image = document.createElement("img");
        constructor() {
            this.loadStory();
        }
        //tester
        async loadStory() {
            this.story = await (await fetch("Story.json")).json();
            console.log("Story loaded");
            this.buildStory();
        }
        playStory() {
            this.buildStory();
            this.storyUI.style.display = "block";
            this.saveStoryIntoLog();
        }
        buildStory() {
            this.storyUI.style.display = "none";
            this.storyUI.id = "StoryUI";
            document.getElementById("StoryBox").appendChild(this.storyUI);
            this.storyImage.id = "StoryImage";
            //console.log(this.story);
            this.storyUI.appendChild(this.storyImage);
            let closeButton = document.createElement("button");
            this.storyUI.appendChild(closeButton);
            closeButton.id = "CloseStory";
            closeButton.textContent = "X";
            closeButton.addEventListener("click", () => {
                this.storyUI.style.display = "none";
            });
        }
        saveStoryIntoLog() {
            let newChapter = document.createElement("div");
            newChapter.appendChild(this.header);
            newChapter.appendChild(this.image);
            document.getElementById("logbook-story").appendChild(newChapter);
            let showHide = document.createElement("button");
            newChapter.appendChild(showHide);
            showHide.textContent = "Show/Hide";
            let imageContainer = document.createElement("div");
            imageContainer.id = "ImageContainer";
            imageContainer.style.display = "none";
            imageContainer.appendChild(this.image);
            newChapter.appendChild(imageContainer);
            showHide.addEventListener("click", () => {
                console.log("click");
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                }
                else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
        }
        progressStoryChapter(questStage) {
            switch (questStage) {
                case RoboGameNamespace.QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial; //komplette Quests einfügen in json, dann komplette Objekte herausladen, inklusive Belohnung etc, statt stgingArray
                    this.playStoryChapter();
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.EARLYGAME: {
                    this.chapter = this.story.earlyGame;
                    this.playStoryChapter();
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.MIDGAME: {
                    this.chapter = this.story.midGame;
                    this.playStoryChapter();
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.LATEGAME: {
                    this.chapter = this.story.lateGame;
                    this.playStoryChapter();
                    break;
                }
                case RoboGameNamespace.QUESTSTAGE.ENDGAME: {
                    this.chapter = this.story.endGame;
                    this.playStoryChapter();
                    break;
                }
                default: {
                    break;
                }
            }
        }
        playStoryPrologue() {
            this.storyUI.innerHTML = this.story.prologue.chapterContent;
            this.storyImage.src = this.story.prologue.chapterImage;
            this.playStory();
            this.header.innerHTML = this.story.prologue.chapterContent;
            this.image.src = this.story.prologue.chapterImage;
        }
        playStoryChapter() {
            this.storyUI.innerHTML = this.chapter.chapterContent;
            this.storyImage.src = this.chapter.chapterImage;
            this.playStory();
            this.header.innerHTML = this.chapter.chapterContent;
            this.image.src = this.chapter.chapterImage;
        }
        playStoryEpilogue() {
            this.storyUI.innerHTML = this.story.epilogue.chapterContent;
            this.storyImage.src = this.story.epilogue.chapterImage;
            this.playStory();
            this.header.innerHTML = this.story.epilogue.chapterContent;
            this.image.src = this.story.epilogue.chapterImage;
        }
    }
    RoboGameNamespace.StoryHandler = StoryHandler;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=StoryHandler.js.map