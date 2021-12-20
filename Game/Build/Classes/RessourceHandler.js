"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    RoboGameNamespace.ressourceBioMass = 5800;
    RoboGameNamespace.increaseBioMass = 10;
    RoboGameNamespace.ressourceScrap = 5000;
    RoboGameNamespace.increaseScrap = 5;
    RoboGameNamespace.ressourceOil = 5000;
    RoboGameNamespace.increaseOil = 3;
    RoboGameNamespace.ressourceOre = 5000;
    RoboGameNamespace.increaseRessource = 7;
    function bioMassToHTML(bioMass) {
        let div = document.getElementById("UI-Biomass");
        div.textContent = String(bioMass);
    }
    RoboGameNamespace.bioMassToHTML = bioMassToHTML;
    function scrapToHTML(scrap) {
        let div = document.getElementById("UI-Scrap");
        div.textContent = String(scrap);
    }
    RoboGameNamespace.scrapToHTML = scrapToHTML;
    function oilToHTML(oil) {
        let div = document.getElementById("UI-Oil");
        div.textContent = String(oil);
    }
    RoboGameNamespace.oilToHTML = oilToHTML;
    function metalToHTML(ore) {
        let div = document.getElementById("UI-Metal");
        div.textContent = String(ore);
    }
    RoboGameNamespace.metalToHTML = metalToHTML;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=RessourceHandler.js.map