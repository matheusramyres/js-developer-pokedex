
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    const abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name)
    pokemon.abilities = String(abilities).replaceAll(',', ', ');

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    console.log(pokemon);
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.findPokemon = (pokemonId)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => convertPokeApiDetailToPokemon(pokemon))
        .then((pokemonsDetails) => pokemonsDetails)
}
