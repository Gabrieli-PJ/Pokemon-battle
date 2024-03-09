// components/PokeList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonItem from './PokemonItem';
import Loading from '../components/loading';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const PAGE_SIZE = 50;

const PokeList = () => {

 const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const fetchPokemons = async () => {

      await new Promise (resolve => setTimeout(resolve, 3000))
      try {
        const offset = (currentPage - 1) * PAGE_SIZE;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);
        const pokemonList = response.data.results;

        const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            id: pokemonDetailsResponse.data.id,
            types: pokemonDetailsResponse.data.types.map((type) => type.type.name),
            imageUrl: pokemonDetailsResponse.data.sprites.front_default || '/types/unknown.png',
            isDefault: pokemonDetailsResponse.data.is_default,
          };
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        

        if (pokemonDetails) {
          setLoading(false);
        }
    

        const defaultPokemonDetails = pokemonDetails.filter(pokemon => pokemon.isDefault);
        setPokemons(defaultPokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
<div>
      {loading ? (
        <Loading />
      ) : (
    <div className='py-2 my-2 flex-col flex-wrap'>
      <ul className='flex flex-wrap flex-row justify-center w-full p-2'>
        {pokemons.map((pokemon) => (
          <PokemonItem key={pokemon.name} {...pokemon} />
        ))}
      </ul>
      <div className='flex justify-center content-center items-center'>
        <button className='text-4xl' onClick={goToPreviousPage} disabled={currentPage === 1}>
          <GrFormPrevious />
        </button>
        <span className='text-xl'> Page {currentPage} </span>
        <button className='text-4xl' onClick={goToNextPage}>
          <GrFormNext />
        </button>
      </div>
    </div>
  )}
  </div>
  )
};

export default PokeList;
