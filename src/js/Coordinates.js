const Coordinates = {
    offset: 0,
    limit: 5,
    total: 151,
    currentPokemon: null,
    listView: true,
    switchListView: () => {
        Coordinates.listView = true;
        Coordinates.offset = parseInt(Coordinates.offset / Coordinates.limit) * Coordinates.limit;
        Renderer.loadPokemons(Coordinates)
    }
}