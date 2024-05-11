// components/StatsButton.jsx

import React from 'react'
import PropTypes from 'prop-types'

const StatsButton = ({ stats }) => {
  // Mapeia os nomes das estatísticas para seus equivalentes em inglês
  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
    speed: 'Speed'
  }

  // Encontra o valor máximo entre todas as estatísticas
  const maxStatValue = 255

  // Encontra o valor mínimo entre todas as estatísticas
  const minStatValue = 0
  return (
    <div>
      <div className='flex flex-col justify-center items-center content-center'>
        <table className="py-3 table-fixed rounded-lg bg-gray-100 m-2 table-row">
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.stat.name} className="flex flex-row justify-between text-center content-center flex-wrap items-center">
                <td className="w-1/4 text-xl text-orange-900 h-16">{statNames[stat.stat.name]}</td>
                <td className="h-16 w-8 text-lg text-gray-500">{minStatValue}</td>
                <td className="w-48 h-16 text-orange-900">
                  <div className="relative w-full h-4 rounded-lg bg-gray-200">
                    <div
                      className="absolute top-0 left-0 h-full bg-yellow-500 rounded-lg"
                      style={{ width: `${(stat.base_stat / maxStatValue) * 100}%` }}
                    ></div>
                  </div>
                  {stat.base_stat}
                </td>
                <td className="h-16 w-10 text-lg text-gray-500">{maxStatValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

StatsButton.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      stat: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      base_stat: PropTypes.number.isRequired
    })
  ).isRequired
}

export default StatsButton
