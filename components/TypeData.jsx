import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const TypeInteractions = ({ type, typeData }) => {
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
  const superEffectiveAgainst = Object.keys(typeData[type])
    .filter(targetType => typeData[targetType][type] === 'SUPER_EFFECTIVE')

  const notVeryEffectiveAgainst = Object.keys(typeData[type])
    .filter(targetType => typeData[targetType][type] === 'NOT_VERY_EFFECTIVE')

  const noEffectAgainst = Object.keys(typeData[type])
    .filter(targetType => typeData[targetType][type] === 'IMMUNE')

  const enemySuperEffective = Object.keys(typeData[type])
    .filter(targetType => typeData[type][targetType] === 'SUPER_EFFECTIVE')

  const enemyNotVeryEffective = Object.keys(typeData[type])
    .filter(targetType => typeData[type][targetType] === 'NOT_VERY_EFFECTIVE')

  const enemyNoEffect = Object.keys(typeData[type])
    .filter(targetType => typeData[type][targetType] === 'IMMUNE')

  return (
    <section className='lg:grid lg:grid-cols-2 lg:mx-0 flex flex-col mx-2 flex-wrap shadow-lg bg-orange-100 mt-3 rounded-lg px-5' >
      <div id='ataque' className="flex flex-wrap flex-col items-center py-4 text-center">
      <h2 className='text-3xl font-semibold tracking-wide bg-orange-200 w-1/2 rounded-md text-yellow-800 py-2 mb-3'>Ataque</h2>
        {superEffectiveAgainst.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Movimentos do tipo {type} são super efetivos contra: </p>
            <div>
              {superEffectiveAgainst.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {notVeryEffectiveAgainst.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Movimentos do tipo {type} não são efetivos contra:</p>
            <div>
              {notVeryEffectiveAgainst.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {noEffectAgainst.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Movimentos do tipo {type} não tem efeito em:</p>
            <div>
              {noEffectAgainst.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div id='defesa' className="flex flex-col items-center py-4 text-center">
      <h2 className='text-3xl font-semibold tracking-wide bg-orange-200 w-1/2 rounded-md text-yellow-800 py-2 mb-3'>Defesa</h2>
        {enemySuperEffective.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Esses tipos são super efetivos contra pokemóns do tipo {type}:</p>
            <div>
              {enemySuperEffective.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {enemyNotVeryEffective.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Esses tipos não são efetivos contra pokemóns do tipo {type}:</p>
            <div >
              {enemyNotVeryEffective.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {enemyNoEffect.length > 0 && (
          <div className='mb-4'>
            <p className="font-medium tracking-wide pb-2">Esses tipos não tem efeitos contra pokemóns do tipo {type}:</p>
            <div>
              {enemyNoEffect.map(targetType => (
                <Link href={`/types/${targetType.toLowerCase()}`} key={targetType} className={`mx-1 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(targetType)}`}>
                  {targetType.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

TypeInteractions.propTypes = {
  type: PropTypes.string.isRequired,
  typeData: PropTypes.object.isRequired
}

export default TypeInteractions
