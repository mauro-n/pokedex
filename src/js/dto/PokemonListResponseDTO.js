/**
 * Responsible for holding the information
 * of a single list item
 */
export default class PokemonListResponseDTO {
    number = 0;
    name = "";
    types = [];

    constructor(pokemonDetail) {
        this.name = pokemonDetail.name;
        this.number = pokemonDetail.id;
        this.types = pokemonDetail.types.map(slot => slot.type.name);
    }
}