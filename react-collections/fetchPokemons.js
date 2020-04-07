const axios = require('axios');
const fs = require('fs');
const {v4: uuid} = require('uuid');

(async function () {
    const pokemons = [];
    const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");

    const requests = data.results.map(pokemon => {
        let p = {};
        return axios.get(pokemon.url).then(({data}) => {
            p = {
                id: uuid(),
                name: data.name,
                image: data.sprites.front_default,
                rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1
            };
            return data.species.url
        }).then(url => {
            return axios.get(url).then(({data}) => p.description = data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text);
        }).then(() => pokemons.push(p));
    });

    await Promise.all(requests);
    fs.writeFileSync('pokemons.json', JSON.stringify(pokemons));
    // console.log(pokemons);
})();