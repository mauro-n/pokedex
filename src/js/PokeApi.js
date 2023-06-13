import PokemonDetailDTO from "./dto/PokemonDetailDTO.js";
import PokemonListResponseDTO from "./dto/PokemonListResponseDTO.js";

/**
 * This component is responsible for the communication
 * with the external api
 */
const PokeApi = {};
/**
 * Fetches a batch of pokemons
 * @param {int} offset offset value for query
 * @param {int} limit limit value for query
 * @returns {PokemonResponseDTO[]} a list of pokemonResponseDTO
 */
PokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
    .then(response => response.json())
    .then(response => response.results)
    .then(pokemons => pokemons.map(PokeApi.getPokemonDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonDetail => pokemonDetail.map(pokemonDetail => new PokemonListResponseDTO(pokemonDetail)))
    .then(pokemon => pokemon)
    .catch(error => console.log(error))
}
/**
 * Fetchs a single pokemon
 * @param {int} id 
 * @returns {PokemonDetailDTO} a PokemonDetailDTO object
 */
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
/**
 * Helper -- fetches the details of a pokemon
 * @param {} pokemon A raw pokemon
 * @returns the details of a pokemon
 */
PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(response => response.json());
}
/**
 * Helper -- Fetches the abilities of a pokemon
 * @param {String} url 
 * @returns The abilities of a pokemon
 */
PokeApi.getAbilityDesc = async (url) => {    
    return fetch(url)
    .then(response => response.json())
    .then(data => data.effect_entries[0].short_effect)
}

export default PokeApi;