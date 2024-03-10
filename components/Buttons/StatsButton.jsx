// components/StatsButton.jsx
import { useState } from 'react';

const StatsButton = ({ stats }) => {
  const [showStats, setShowStats] = useState(false);

  const toggleStats = () => {
    setShowStats(!showStats);
  };

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
  );
};

export default StatsButton;
