import { React } from 'react'
import PropTypes from 'prop-types'

const PokeCard = ({ name, types, imageUrl, id, height, abilities }) => {
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

  const formatPokedex = formatPokedexNumber(id) || 'undefined'

  return (
        <section className='flex flex-row m-3 flex-wrap max-w-sm w-1/5 rounded p-4 overflow-hidden shadow-lg'>
            <div className='rounded border-2 border-red-500 bg-red-400  tracking-wide text-white py-1 px-2 w-1/3'>
            <p className=''>#{formatPokedex}</p>
            </div>
            <h1>{name}</h1>
            <img src={imageUrl} className='card-img-top img-fluid self-center' alt={`${name} sprite`} />
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Abilities</th>
                        <th className="px-4 py-2">Height</th>
                        <th className="px-4 py-2">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">{height}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td>
                        {types.map((type, index) => (
                            <span key={index} className={`mr-2 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(type)}`}>
                                {type}
                            </span>
                        ))}
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{abilities.join(', ')}</td>
                    </tr>
                </tbody>
            </table>
        </section>
  )
}

PokeCard.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PokeCard
