const pokemonListSrc = document.getElementById("pokemon-list");
const loadNextBtn = document.getElementById("load-next");
const loadPreviousBtn = document.getElementById("load-previous");

loadNextBtn.addEventListener("click", () => {
    if (Coordinates.listView == true) {
        Coordinates.offset += Coordinates.limit;
        return Renderer.loadPokemons(Coordinates);
    } else {
        Coordinates.currentPokemon ++;
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
        Coordinates.currentPokemon --;
        return Renderer.loadPokemon(Coordinates.currentPokemon);
    }
})

Renderer.loadPokemons(Coordinates);