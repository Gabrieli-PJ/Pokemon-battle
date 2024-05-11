import { React } from 'react'
import PropTypes from 'prop-types'

const MovesButton = ({ moves }) => {
  return (
    <div>
        <div className='flex flex-col'>
          <table className="w-full border-collapse border border-yellow-900">
            <thead>
              <tr className="bg-yellow-400 border border-yellow-900">
                <th className="border border-yellow-900">Nome</th>
                <th className="border border-yellow-900">Método de aprendizado</th>
                <th className="border border-yellow-900">Nível de aprendizado</th>
              </tr>
            </thead>
            <tbody>
              {moves.map((move, index) => (
                <tr key={index} className="bg-yellow-200 border border-yellow-900">
                  <td className="border border-yellow-900">{move.move.name}</td>
                  <td className="border border-yellow-900">{move.version_group_details[0].move_learn_method.name}</td>
                  <td className="border border-yellow-900">{move.version_group_details[0].level_learned_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

MovesButton.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      move: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      version_group_details: PropTypes.arrayOf(
        PropTypes.shape({
          move_learn_method: PropTypes.shape({
            name: PropTypes.string.isRequired
          }).isRequired,
          level_learned_at: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired
}

export default MovesButton
