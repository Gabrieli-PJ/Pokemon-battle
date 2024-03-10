// components/StatsButton.jsx
import { useState } from 'react';

const MovesButton = ({ moves }) => {
  const [showMoves, setShowMoves] = useState(false);

  const toggleMoves = () => {
    setShowMoves(!showMoves);
  };

  return (
    <div>
      <button onClick={toggleMoves}>Movimentos</button>
      {showMoves && (
        <div>
          <h2>Movimentos</h2>
          <ul>
            {moves.map((move, index) => (
              <li key={index}>
                <p>Nome: {move.move.name}</p>
                <p>Método de aprendizado: {move.version_group_details[0].move_learn_method.name}</p>
                <p>Nivel de aprendizado {move.version_group_details[0].level_learned_at}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovesButton;
