// components/StatsButton.jsx
import { useState, React } from 'react'
import PropTypes from 'prop-types'

const StatsButton = ({ stats }) => {
  const [showStats, setShowStats] = useState(false)

  const toggleStats = () => {
    setShowStats(!showStats)
  }

  return (
    <div>
      <button onClick={toggleStats}>Estatísticas</button>
      {showStats && (
        <div>
          <h2>Estatísticas</h2>
          <ul>
            {stats.map((stat) => (
              <li key={stat.stat.name}>
                {`${stat.stat.name}: ${stat.base_stat}`}
              </li>
            ))}
          </ul>
        </div>
      )}
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
