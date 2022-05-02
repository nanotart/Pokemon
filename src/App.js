import React, { useState, useEffect } from 'react';

import PokemonList from './PokemonList';
import Pagination from './Pagination';
import Counter from './Counter';
import './App.css';

// getting information from an API: https://pokeapi.co
import axios from 'axios';

function App() {

  // first param: pokemon (our current pokemon)
  // second param: the method to update the pokemon
  const [pokemon, setPokemon] = useState([]);

  // page setup scenario!
  const [currPage, setCurr] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPage, setNext] = useState();
  const [prevPage, setPrev] = useState();

  const [count, setCount] = useState(1);

  // our app is loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true)

    let cancel

    // "npm i axios"
    // make a promise on a response
    // response.data.(results)
    axios.get(currPage, {
      cancelToken: new axios.CancelToken((c => cancel = c))
    }).then(response => {
      setLoading(false)
      setNext(response.data.next)
      setPrev(response.data.previous)
      setPokemon(response.data.results.map(p => 
      <div>
        {p.name}
      </div>))
    })

    // see axios.cancel above.
    // basically information does not get disrupted when loading in new data
    return () => cancel()

  }, [currPage]) //re-renders when page changes

  // simple if statement on loading
  if (loading) return "Loading..."

  // pagination components
  function goNext() {
    setCurr(nextPage)
    setCount(count + 1)
  }

  function goPrev() {
    setCurr(prevPage)
    setCount(count - 1)
  }
    
  return (
    <>
      <div className="header">
        <h2>Pokemon List</h2>
      </div>

      <div className="pokemonList">
        <PokemonList pokemon={pokemon}/>
      </div>
      
      <div className="button">
        <Pagination 
        // pagination if statement
        // if nextPage is true, then go next, otherwise null
          goNext = {nextPage ? goNext : null}
          goPrev = {prevPage ? goPrev: null}
        />
      </div>
      
      <div className="page">
        <Counter count={count}/>
      </div>
      
    </>
  );
}

export default App;