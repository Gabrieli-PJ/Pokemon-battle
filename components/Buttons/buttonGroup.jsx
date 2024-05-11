import React, { useState } from 'react'
import StatsButton from './StatsButton'
import PropTypes from 'prop-types'
import MovesButton from './MovesButton'

const ButtonGroup = ({ stats, moves }) => {
  const [showStats, setShowStats] = useState(false)
  const [showMoves, setShowMoves] = useState(false)

  const toggleStats = () => {
    setShowStats(!showStats)
    setShowMoves(false) // Fecha o outro botão
  }

  const toggleMoves = () => {
    setShowMoves(!showMoves)
    setShowStats(false) // Fecha o outro botão
  }

  return (
        <div>
            <div className='flex flex-row justify-center mb-4'>
                <button
                    className='inline-flex mx-3 my-1 w-40 py-3 justify-center items-center rounded-md text-yellow-900 tracking-wide text-lg font-medium bg-yellow-400 hover:bg-yellow-500 border-b-4 border-yellow-700 hover:border-yellow-800'
                    onClick={toggleStats}>
                    Estatísticas
                </button>
                <button
                    className='inline-flex mx-3 my-1 w-40 py-3 justify-center items-center rounded-md text-yellow-900 tracking-wide text-lg font-medium bg-yellow-400 hover:bg-yellow-500 border-b-4 border-yellow-700 hover:border-yellow-800'
                    onClick={toggleMoves}>
                    Movimentos
                </button>
            </div>
            <div className='flex justify-center items-center w-full'>
                {showStats && <StatsButton stats={stats} />}
                {showMoves && <MovesButton moves={moves} />}
            </div>
        </div>
  )
}

ButtonGroup.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      stat: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      base_stat: PropTypes.number.isRequired
    })
  ).isRequired,
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

export default ButtonGroup
