"use strict";
var RoboGame;
(function (RoboGame) {
    RoboGame.increaseBioMass = 10;
    RoboGame.increaseScrap = 5;
    RoboGame.increaseOil = 3;
    RoboGame.increaseMetal = 7;
    function bioMassToHTML(bioMass) {
        let div = document.getElementById("UI-Biomass");
        div.textContent = String(bioMass);
    }
    RoboGame.bioMassToHTML = bioMassToHTML;
    function scrapToHTML(scrap) {
        let div = document.getElementById("UI-Scrap");
        div.textContent = String(scrap);
    }
    RoboGame.scrapToHTML = scrapToHTML;
    function oilToHTML(oil) {
        let div = document.getElementById("UI-Oil");
        div.textContent = String(oil);
    }
    RoboGame.oilToHTML = oilToHTML;
    function metalToHTML(metal) {
        let div = document.getElementById("UI-Metal");
        div.textContent = String(metal);
    }
    RoboGame.metalToHTML = metalToHTML;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=RessourceHandler.js.map