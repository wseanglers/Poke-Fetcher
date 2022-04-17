import fetch from 'node-fetch';
export default class PokeFetcher {
    #URL = "https://pokeapi.co/api/v2/"
    #offset = 10

    constructor(limit) {
        this.limit = limit
    }

    async showPokemon(page) {
        return await fetch(`${this.#URL}/pokemon?limit=${this.limit}&offset=${this.#offset * page}`).then(response => {
            return response.json()
        }).then(data => {
            let pokemon = data.results
            let options = {
                page: page,
                total_page: Math.ceil(data.count / this.limit),
                limit: this.limit,
                total: data.count
            }
            return this.#sendRequest(pokemon, options)

        }).catch(err => {
            return this.#sendRequest('ERROR')
        })
    }

    async lookUpPokemon(name) {
        return await fetch(`${this.#URL}/pokemon/${name}`).then(response => {
            return response.json()
        }).then(data => {
            let pokemon = data
            return this.#sendRequest(pokemon)
        }).catch(err => {
            return this.#sendRequest('NOT FOUND')
        })
    }

    async typePokemon(type) {
        return await fetch(`${this.#URL}/type/${type}`).then(response => {
            return response.json()
        }).then(data => {
            let pokemon = data.pokemon
            return this.#sendRequest(pokemon)
        }).catch(err => {
            return this.#sendRequest('NOT FOUND')
        })
    }

    changeOffset(offset) {
        this.#offset = offset
    }

    #sendRequest(data, option = null) {
        return {
            data: data,
            options: option ? option : null
        }
    }
}

// const p = new PokeFetcher(10);
// p.showPokemon(1).then(data => {
//     console.log(data)
// })