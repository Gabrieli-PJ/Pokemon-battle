import { React } from 'react'
import Evolution from './Evolution'
import PropTypes from 'prop-types'
import typeEffectiveness from '@/data/typesWS.json'
import Weaknesses from '@/components/Weakness'
import Image from 'next/image'
import Link from 'next/link'

const PokeCard = ({ name, types, imageUrl, id, height, weight, abilities }) => {
  const formatPokedexNumber = (number) => {
    return number.toString().padStart(4, '0')
  }

  const formattedHeight = `${(height / 10).toFixed(1)} m`;
  const formattedWeight = `${(weight / 10).toFixed(1)} kg`;

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
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
    <section className='grid gap-3 grid-cols-2 p-3 m-5 items-center overflow-hidden shadow-lg'>
      <div id='name/pokedex/image' >
        <div className='flex flex-row flex-wrap items-center'>
          <div className='rounded border-2 border-red-500 bg-red-400 py-1 px-2 w-1/5 text-center'>
            <p className='tracking-wide text-xl text-white'>#{formatPokedex}</p>
          </div>
          <h1 className='ms-3 text-5xl font-semibold text-yellow-800'>{name}</h1>
        </div>
        <Image
          width={400}
          height={400}
          src={imageUrl}
          className='sef-center'
          alt={`${name} sprite`} />
      </div>
      <section id='info' className='flex flex-col flex-wrap  items-center w-full p-2'>
        <div id='row-1' className='flex flex-row text-center flex-wrap items-center content-center'>
        <div className='p-3 m-1 bg-yellow-100 rounded-lg'>
          <h2 className='px-4 py-2 mb-1 text-2xl bg-yellow-200 rounded-lg'>Habilidades</h2>
          <p className="px-4 py-2 text-xl">
            {abilities.map((ability, index) => (
              <span key={index} className={'mr-2 p-1 px-3 rounded-full text-center w-1/2'}>
                {ability}
              </span>
            ))}
          </p>
        </div>

        <div className='p-3 m-1 bg-yellow-100 rounded-lg'>
          <h2 className='px-4 py-2 mb-1 text-2xl bg-yellow-200 rounded-lg'>Altura</h2>
          <p className="px-4 py-2 text-xl">
          {formattedHeight}
          </p>
        </div>
        <div className='p-3 m-1 bg-yellow-100 rounded-lg'>
          <h2 className='px-4 py-2 mb-1 text-2xl bg-yellow-200 rounded-lg'>Peso</h2>
          <p className="px-4 py-2 text-xl">
          {formattedWeight}
          </p>
        </div>
        </div>
        <div id='row-2' className='flex flex-row flex-wrap text-center items-center content-center'>
        <div className='p-3 m-1 bg-yellow-100 rounded-lg'>
          <h2 className='px-4 py-2 mb-1 text-2xl bg-yellow-200 rounded-lg'>Tipo</h2>
          <p className="px-4 py-2 text-xl">
            {types.map((type, index) => (
              <Link href={`/types/${type.toLowerCase()}`} key={index} className={`mr-2 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(type)}`}>
                {type.toLowerCase()}
              </Link>
            ))}
          </p>
        </div>
        <Weaknesses types={types} typeEffectiveness={typeEffectiveness} />
        </div>
        <div className='flex flex-col text-center flex-wrap p-3 m-1 bg-yellow-100 rounded-lg '>
          <h2 className='px-4 py-2 mb-1 text-2xl bg-yellow-200 rounded-lg'>Evoluções</h2>
          <div className='flex flex-row flex-wrap w-full justify-center text-center'>
          <Evolution id={id} />
          </div>
        </div>
      </section>
    </section>
  )
}

PokeCard.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PokeCard
