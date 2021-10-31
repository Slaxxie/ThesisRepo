namespace RoboGame {
    export let ressourceBioMass: number;
    export let increaseBioMass: number = 10;
    export let ressourceScrap: number;
    export let increaseScrap: number = 5;
    export let ressourceOil: number;
    export let increaseOil: number = 3;
    export let ressourceMetal: number;
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