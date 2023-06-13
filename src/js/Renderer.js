const Renderer = {};

Renderer.renderPokemonList = (Pokemon) => {
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

Renderer.renderPokemonCard = (pokemon) => {
    return `
        <div class="card bg-poke${pokemon.type} pokemon-card">
            <img src=${pokemon.img}
            class="card-img" alt="...">
            <div class="card-img-overlay">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${pokemon.name}</h5>    
                    <div class="pokemon-order">#${pokemon.number}</div>
                </div>
                <div class="typeList">
                    ${pokemon.types.map(el => `<div class="typeItem bg-poke${el}">${el}</div>`).join("")}
                </div>
                <p class="card-text"><small>Last updated 3 mins ago</small></p>
            </div>
        </div>
        `
}

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
                <div class="pokemon-detail-name">Lv1 ${pokemon.name.toUpperCase()}</div>
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

Renderer.loadPokemon = (pokemon) => {
    const parentList = document.getElementById("pokemon-list");
    
    const details = PokeApi.getPokemon(Coordinates.currentPokemon)
        .then(detail => {
            const pokemonDetail = Renderer.renderPokemonDetail(detail);
            parentList.innerHTML = pokemonDetail;
            const listView = document.getElementById("list-view");
            listView.addEventListener("click", () => {
                return Coordinates.switchListView();
            })
        })

}

Renderer.loadPokemons = (Coordinates) => {
    const { limit, offset, total } = Coordinates;
    
    if (limit + offset > total) {
        limit = total - offset;
        loadNextBtn.disabled = true;
        return;
    }

    PokeApi.getPokemons(offset, limit)
        .then((pokemonList = []) => {
            
            const pokemonListHtml = pokemonList.map(Renderer.renderPokemonList)
            const pokemonHtml = pokemonListHtml.join("");
            pokemonListSrc.innerHTML = pokemonHtml;

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