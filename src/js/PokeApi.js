const PokeApi = {};

PokeApi.convertPokemonToDTO = (pokemonDetail) => {
    const pokemon = new PokemonResponseDTO();
    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    pokemon.types = pokemonDetail.types.map(slot => slot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.img = pokemonDetail['sprites']['versions']['generation-iii']['emerald']['front_default']
    return pokemon;
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(response => response.json());
}

PokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
    .then(response => response.json())
    .then(response => response.results)
    .then(pokemons => pokemons.map(PokeApi.getPokemonDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonDetail => pokemonDetail.map(PokeApi.convertPokemonToDTO))
    .then(pokemon => pokemon)
    .catch(error => console.log(error))
}

PokeApi.getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const request = await fetch(url);
    const pokemon = await request.json();
    const abilityResponse = await fetch(pokemon.abilities[0].ability.url);
    const ability = await abilityResponse.json();
    const abilityObj = {
        name: ability.name,
        entry: ability.effect_entries[0].short_effect
    }
    return new PokemonDetailDTO({...pokemon, ability: abilityObj});
}

PokeApi.getAbilityDesc = async (url) => {    
    return fetch(url)
    .then(response => response.json())
    .then(data => data.effect_entries[0].short_effect)
}