const pokemonList = document.getElementById('pokemonList')
const backgroundShadow = document.getElementById('backgroundShadow')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="clickPokemon(${pokemon.number})">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
        </li>
    `
}

function convertPokemonDiv(pokemon){

    return `<div id="pokemonPresentation" class="${pokemon.type}">
                <div class="closeModal">
                    <a href="#" onClick="closeModal()">x</a>
                </div>
                <div class="contentPresentation">
                    <p class="pokemonName">${pokemon.name}</p>

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>

                <div class="aboutPokemon">
                    <table class="aboutPokemonTable">
                        <tr>
                            <td>Species:</td>
                            <td>${pokemon.species}</td>
                        </tr>
                        <tr>
                            <td>Weight:</td>
                            <td>${pokemon.weight}</td>
                        </tr>
                        <tr>
                            <td>Height:</td>
                            <td>${pokemon.height}</td>
                        </tr>
                        <tr>
                            <td>Abilities:</td>
                            <td>${pokemon.abilities}</td>
                        </tr>
                    </table>
                </div>

            </div>`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function generateModal(offset, limit, id){
    pokeApi.findPokemon(id).then((pokemon = {}) => {
        const pokemonDiv = convertPokemonDiv(pokemon);
        backgroundShadow.innerHTML = pokemonDiv;
        backgroundShadow.classList.remove('closed');
    })
}

function closeModal(){
    backgroundShadow.classList.add('closed');
}

function clickPokemon (pokemonId){
    generateModal(offset, limit, pokemonId);
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

