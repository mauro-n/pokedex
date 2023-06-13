/**
 * Is responsible for holding the details of a pokemon.
 */
export default class PokemonDetailDTO {
    number = 0;
    name = "";
    types = [];
    img = "";

    stats = [
        {hp: ""},
        {attack: ""},
        {defense: ""},
        {sp_atk: ""},
        {sp_def: ""},
        {speed: ""}
    ];

    ability = "";

    constructor(pokemonDetails) {
        this.number = pokemonDetails.id;
        this.name = pokemonDetails.name;
        this.types = pokemonDetails.types.map(slot => slot.type.name);
        this.img = pokemonDetails['sprites']['versions']['generation-iii']['emerald']['front_default'];
        this.stats = pokemonDetails.stats.map(el => {
            return {name : el.stat.name, value: el.base_stat}
        });
        this.ability = pokemonDetails.ability;
    }
}