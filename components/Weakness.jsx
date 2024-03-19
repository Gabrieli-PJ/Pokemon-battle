import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

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

const removeIneffectiveWeaknesses = (types, typeEffectiveness) => {
  const allWeaknesses = new Set()
  types.forEach(type => {
    if (typeEffectiveness[type]) {
      Object.entries(typeEffectiveness[type]).forEach(([attackType, effectiveness]) => {
        if (effectiveness === 'SUPER_EFFECTIVE' || types.includes(attackType)) {
          const isEffectiveAgainstAllTypes = types.every(pokemonType =>
            typeEffectiveness[pokemonType][attackType] === 'SUPER_EFFECTIVE' ||
            typeEffectiveness[pokemonType][attackType] === 'NEUTRAL'
          )

          if (isEffectiveAgainstAllTypes) {
            allWeaknesses.add(attackType)
          }
        }
      })
    }
  })

  return allWeaknesses
}

const Weaknesses = ({ types, typeEffectiveness }) => {
  const allWeaknesses = removeIneffectiveWeaknesses(types, typeEffectiveness)

  return (

    <div className='p-3 m-1 bg-yellow-100 rounded-lg'>
          <h2 className='px-4 mb-1 py-2 text-2xl bg-yellow-200 rounded-lg'>Fraquezas</h2>
          <p className="px-4 py-2 text-xl">
          {[...allWeaknesses].map((type, index) => (
          <Link href={`/types/${type.toLowerCase()}`} key={index} className={`mr-2 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(type.toLowerCase())}`}>
            {type.toLowerCase()}
          </Link>
          ))}
          </p>
        </div>
  )
}

Weaknesses.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeEffectiveness: PropTypes.object.isRequired
}

export default Weaknesses
