import React from 'react'

export default function PokemonList({ pokemon }) {

  return (
    <div>
        {/* looping through all the pokemons */}
        {pokemon.map(p => (
            // must have a unique key (in this case, the pokemon names is the unique key)
            <div key={p}>
                {p}
            </div>
        ))}
    </div>
  )
}
