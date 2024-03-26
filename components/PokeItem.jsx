import Image from 'next/image'
import { React } from 'react'
import PokeAction from './PokeActions'
import PropTypes from 'prop-types'

const formatPokedexNumber = (number) => {
  return number.toString().padStart(4, '0')
}

const getTypeColor = (type) => {
  switch (type) {
    case 'normal':
      return 'bg-gray-500 text-white'
    case 'fire':
      return 'bg-red-600 text-red-100'
    case 'water':
      return 'bg-blue-600 text-blue-100'
    case 'grass':
      return 'bg-green-600 text-green-100'
    case 'flying':
      return 'bg-teal-400 text-teal-800'
    case 'fighting':
      return 'bg-red-800 text-red-100'
    case 'poison':
      return 'bg-purple-600 text-purple-100'
    case 'electric':
      return 'bg-yellow-600 text-white'
    case 'ground':
      return 'bg-orange-700 text-orange-100'
    case 'rock':
      return 'bg-orange-700 text-orange-100'
    case 'psychic':
      return 'bg-pink-600 text-pink-100'
    case 'ice':
      return 'bg-indigo-300 text-indigo-800'
    case 'bug':
      return 'bg-green-300 text-green-800'
    case 'ghost':
      return 'bg-indigo-500 text-indigo-100'
    case 'steel':
      return 'bg-gray-400 text-gray-100'
    case 'dragon':
      return 'bg-purple-400 text-purple-100'
    case 'dark':
      return 'bg-blue-900 text-blue-100'
    case 'fairy':
      return 'bg-pink-300 text-pink-100'
    default:
      return 'bg-gray-500 text-white'
  }
}

const PokemonItem = ({ name, types, imageUrl, id }) => {
  const formatPokedex = formatPokedexNumber(id) || 'undefined'

  return (<div className="flex flex-col bg-yellow-100 justify-between lg:m-3 m-1 flex-wrap max-w-sm w-full lg:w-1/5 md:w-2/5 rounded lg:p-4 p-2 overflow-hidden shadow-lg" >
    <div className="rounded border-2 border-red-500 bg-red-400 tracking-wide text-white text-xl py-1 px-2 w-1/3">
      <p>#{formatPokedex}</p>
    </div>
    <Image
    width={95}
    height={95}
      className="card-img-top w-1/3 img-fluid self-center"
      src={imageUrl}
      alt={`${name} sprite`}
    />
    <h2 className="text-center lg:text-xl text-3xl text-yellow-800 font-semibold h-75">{name}</h2>
    <div className="flex flex-row m-2 items-center justify-center text-center">
      {types.map((type, index) => (
        <span key={index} className={`mr-2 p-1 px-3 rounded-full text-center w-2/5 ${getTypeColor(type)}`}>
          {type}
        </span>
      ))}
    </div>
    <PokeAction pokemonName={name} />
  </div>)
}

PokemonItem.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default PokemonItem
