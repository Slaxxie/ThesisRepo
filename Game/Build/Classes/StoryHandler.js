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
        async loadStory() {
            this.story = await (await fetch("Story.json")).json();
            this.buildStory();
        }
        playStory() {
            this.buildStory();
            this.storyUI.style.display = "block";
        }
        buildStory() {
            this.storyUI.style.display = "none";
            this.storyUI.id = "storyUI";
            document.getElementById("storyBox").appendChild(this.storyUI);
            let imageContainer = document.createElement("div");
            imageContainer.id = "storyImageContainer";
            this.storyImage.id = "storyImage";
            let closeButton = document.createElement("button");
            closeButton.className = "buttonDesignClass";
            this.storyUI.appendChild(closeButton);
            closeButton.id = "closeStory";
            closeButton.textContent = "X";
            closeButton.addEventListener("click", () => {
                this.storyUI.style.display = "none";
            });
            this.storyUI.appendChild(imageContainer);
            imageContainer.appendChild(this.storyImage);
            this.saveStoryIntoLog();
        }
        saveStoryIntoLog() {
            let newChapter = document.createElement("div");
            newChapter.appendChild(this.header);
            newChapter.appendChild(this.image);
            document.getElementById("logbook-story").appendChild(newChapter);
            let showHide = document.createElement("button");
            showHide.className = "buttonDesignClass";
            newChapter.appendChild(showHide);
            showHide.textContent = "Show/Hide";
            showHide.id = "showHideStory";
            let imageContainer = document.createElement("div");
            imageContainer.id = "storyImageContainerLog";
            imageContainer.style.display = "none";
            let closeImage = document.createElement("button");
            closeImage.className = "buttonDesignClass";
            closeImage.id = "storyCloseImage";
            imageContainer.appendChild(closeImage);
            closeImage.textContent = "close image";
            imageContainer.appendChild(this.image);
            newChapter.appendChild(imageContainer);
            showHide.addEventListener("click", () => {
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                }
                else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
            closeImage.addEventListener("click", () => {
                imageContainer.style.display = "none";
            });
        }
        progressStoryChapter(questStage) {
            switch (questStage) {
                case RoboGameNamespace.QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial;
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
            document.getElementById("prologueDiv").style.display = "block";
            document.getElementById("nextPage").addEventListener("click", () => {
                document.getElementById("prologueImage1").style.display = "none";
                document.getElementById("prologueImage2").style.display = "block";
                document.getElementById("nextPage").style.display = "none";
                document.getElementById("closePrologue").style.display = "block";
            });
            document.getElementById("closePrologue").addEventListener("click", () => {
                document.getElementById("prologueDiv").style.display = "none";
                document.getElementById("prologueDiv").style.zIndex = "-1";
                this.storyUI.innerHTML = this.story.prologue.chapterContent;
                this.storyImage.src = this.story.prologue.chapterImage;
                this.playStory();
                this.header.innerHTML = this.story.prologue.chapterContent;
                this.image.src = this.story.prologue.chapterImage;
            });
        }
        playStoryChapter() {
            this.storyUI.innerHTML = this.chapter.chapterContent;
            this.storyUI.innerHTML = "<br>";
            this.storyUI.innerHTML = "<br>";
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