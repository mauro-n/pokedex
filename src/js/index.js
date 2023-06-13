import Coordinates from "./Coordinates.js";
import Renderer from "./Renderer.js";

const loadNextBtn = document.getElementById("load-next");
const loadPreviousBtn = document.getElementById("load-previous");

loadNextBtn.addEventListener("click", () => {
    if (Coordinates.listView == true) { 
        if (Coordinates.offset == Coordinates.total + Coordinates.limit) return;

        Coordinates.offset += Coordinates.limit;
        if (Coordinates.offset + Coordinates.limit >= Coordinates.total) {
            Coordinates.offset = Coordinates.total - Coordinates.limit;
            return Renderer.loadPokemons(Coordinates);
        };

        return Renderer.loadPokemons(Coordinates);
    } else {
        if (Coordinates.currentPokemon >= Coordinates.total) return;
        Coordinates.currentPokemon++;
        return Renderer.loadPokemon(Coordinates.currentPokemon);
    }
});

loadPreviousBtn.addEventListener("click", () => {
    if (Coordinates.listView == true) {
        if (Coordinates.offset == 0) return;
        if (Coordinates.offset - Coordinates.limit < 0) {
            Coordinates.offset = 0;
            return Renderer.loadPokemons(Coordinates);
        }
        Coordinates.offset -= Coordinates.limit;
        return Renderer.loadPokemons(Coordinates);
    } else {
        if (Coordinates.currentPokemon <= 1) return;
        Coordinates.currentPokemon--;
        return Renderer.loadPokemon(Coordinates.currentPokemon);
    }
});

Renderer.loadPokemons(Coordinates);