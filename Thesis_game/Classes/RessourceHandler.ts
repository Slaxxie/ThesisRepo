namespace RoboGame {
    export let ressourceBioMass: number = 5000;
    export let increaseBioMass: number = 10;
    export let ressourceScrap: number = 5000;
    export let increaseScrap: number = 5;
    export let ressourceOil: number = 5000;
    export let increaseOil: number = 3;
    export let ressourceMetal: number = 5000;
    export let increaseMetal: number = 7;

    export function bioMassToHTML(bioMass: number): void {
        let div: HTMLElement = document.getElementById("UI-Biomass");
        div.textContent = String(bioMass);
    }
    export function scrapToHTML(scrap: number): void {
        let div: HTMLElement = document.getElementById("UI-Scrap");
        div.textContent = String(scrap);
    }
    export function oilToHTML(oil: number): void {
        let div: HTMLElement = document.getElementById("UI-Oil");
        div.textContent = String(oil);
    }
    export function metalToHTML(metal: number): void {
        let div: HTMLElement = document.getElementById("UI-Metal");
        div.textContent = String(metal);
    }
}