import Coordinates from "./Coordinates.js";
import PokeApi from "./PokeApi.js";

/**
 * This component is responsible for rendering elements in screen.
 */
const Renderer = {};
/**
 * Creates a pokemon list item
 * @param {*} Pokemon A pokemon DTO containing information about the pokemon
 * @returns 
 */
Renderer.renderPokemonListItem = (Pokemon) => {
    return `
    <div id="pokemon-${Pokemon.number}" class = "pokemonList-item">
        <div class = "pokemonList-item-number">${Pokemon.number}</div>
        <img class="pokemonList-item-pokeball" src="./src/img/pokeball.svg">
        <div class = "pokemonList-item-name flex-grow-1">${Pokemon.name}</div>
        <div class = "pokemonList-item-types">
        ${Pokemon.types.map(type => `<span class = "pokemonList-item-type bg-poke${type}">${type}</span>`).join("")}
        </div>        
    </div>    
    `;
}
/**
 * Creates a pokemon details card
 * @param {*} pokemon a pokemon DTO containing information about the pokemon
 * @returns 
 */
Renderer.renderPokemonDetail = (pokemon) => {

    const renderStats = (stats) => {
        return stats.map(el => {
            return `<div class = "pokemon-detail-statcontainer">
                <span class="pokemon-detail-statname">${el.name}</span>
                <span class="pokemon-detail-statvalue">${el.value}</span>
            </div>`
        }).join("");
    }

    const renderTypes = (types) => {
        return types.map(type => {
            return `
                <span class="pokemon-detail-statvalue type-badge bg-poke${type}">${type}</span>
            `;
        }).join("")
    }

    return `
    <div class="pokemon-detail-container ">
        <div class = "pokemon-detail-title-container">
            <h2 class = "pokemon-detail-title">POKEMON INFO</h2>
            <div id = "list-view" class="goback-btn">LIST</div>
        </div>
        <div class = "pokemon-detail-content
        d-flex flex-column flex-sm-row text-center text-sm-start">
            <div class = "pokemon-detail-photo">
                <div class="pokemon-detail-name">${pokemon.name.toUpperCase()}</div>
                <div class = "pokemon-detail-img-container">
                    <img class = "pokemon-detail-img" src = ${pokemon.img}>
                </div>
            </div>
            <div class = "pokemon-detail-stats">
                ${renderStats(pokemon.stats)}
                <div class = "pokemon-detail-statcontainer">
                    <span class="pokemon-detail-statname">Type</span>
                    ${renderTypes(pokemon.types)}
                </div>
            </div>
        </div>
        <div class = "pokemon-detail-statcontainer--ability">
            <span class="pokemon-detail-statname">Ability</span>
            <span
                    class="pokemon-detail-statvalue
                    pokemon-detail-statvalue--ability">${pokemon.ability.name}
            </span>
            <div class="pokemon-detail-statvalue--ability-entry">${pokemon.ability.entry}</div>
        </div>
    </div>    
    `;
}
/**
 * Renders a single pokemon.
 */
Renderer.loadPokemon = () => {
    Renderer.toggleLoading();
    const parentList = document.getElementById("pokemon-list");
    const details = PokeApi.getPokemon(Coordinates.currentPokemon)
        .then(detail => {
            const pokemonDetail = Renderer.renderPokemonDetail(detail);
            parentList.innerHTML = pokemonDetail;
            Renderer.toggleLoading();
            const listView = document.getElementById("list-view");
            listView.addEventListener("click", () => {
                return Renderer.toggleListView();
            })
        })

}
/**
 * Renders a batch of pokemons
 * @param {*} Coordinates Coordinates obj for offset, limit, total
 */
Renderer.loadPokemons = (Coordinates) => {
    Renderer.toggleLoading();
    const parentList = document.getElementById("pokemon-list");
    const { limit, offset, total } = Coordinates;

    PokeApi.getPokemons(offset, limit)
        .then((pokemonList = []) => {

            const pokemonListHtml = pokemonList.map(Renderer.renderPokemonListItem)
            const pokemonHtml = pokemonListHtml.join("");
            parentList.innerHTML = pokemonHtml;
            Renderer.toggleLoading();

            const children = document.getElementById("pokemon-list").children;
            const childrenList = Array.from(children);

            childrenList.forEach(element => {
                element.addEventListener("click", () => {
                    Coordinates.listView = false;
                    Coordinates.currentPokemon = element.children[0].innerText;
                    Coordinates.offset = Coordinates.currentPokemon;
                    Renderer.loadPokemon(element);
                });
            });
        })
        .catch(err => console.log(err));
}
/**
 * Toggles loading element in the screen
 */
Renderer.toggleLoading = () => {
    const spinner = document.getElementById("loading-icon");
    if (spinner.style.display == "block") {
        spinner.style.display = "none"
    } else {
        spinner.style.display = "block"
    }
}
/**
 * Renders the list view
 */
Renderer.toggleListView = () => {
    Coordinates.listView = true;
    Coordinates.offset = parseInt(Coordinates.offset / Coordinates.limit) * Coordinates.limit;
    Renderer.loadPokemons(Coordinates)
}

export default Renderer;