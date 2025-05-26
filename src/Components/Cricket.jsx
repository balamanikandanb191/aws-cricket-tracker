import React, { useState } from 'react';
import './Cricket.css';

function Cricket() {
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [nonStrikerName, setNonStrikerName] = useState('');
  const [striker, setStriker] = useState('striker');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentStats, setCurrentStats] = useState({
    striker: { name: '', score: 0, balls: 0 },
    nonStriker: { name: '', score: 0, balls: 0 },
  });
  const [overBalls, setOverBalls] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [customAlert, setCustomAlert] = useState('');
  const [teamColor, setTeamColor] = useState('#4CAF50'); // default green

  const showAlert = (msg) => {
    setCustomAlert(msg);
    setTimeout(() => setCustomAlert(''), 4000);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (!teamName.trim() || !playerName.trim() || !nonStrikerName.trim()) {
      alert('Please fill all fields');
      return;
    }

    // Team color logic: If name contains "red", make it red
    if (teamName.toLowerCase().includes('red')) {
      setTeamColor('#FF0000');
    } else {
      setTeamColor('#4CAF50'); // green
    }

    setCurrentStats({
      striker: { name: playerName, score: 0, balls: 0 },
      nonStriker: { name: nonStrikerName, score: 0, balls: 0 },
    });
    setFormSubmitted(true);
  };

  const updateScore = (runs) => {
    const updatedStats = { ...currentStats };
    updatedStats[striker].score += runs;
    updatedStats[striker].balls += 1;
    setCurrentStats(updatedStats);
    setTotalScore((prev) => prev + runs);
    setOverBalls((prev) => prev + 1);

    if (runs % 2 !== 0) {
      setStriker((prev) => (prev === 'striker' ? 'nonStriker' : 'striker'));
    }

    if ((overBalls + 1) % 6 === 0) {
      showAlert(`End of Over: ${(overBalls + 1) / 6}`);
      setStriker((prev) => (prev === 'striker' ? 'nonStriker' : 'striker'));
    }
  };

  const dotBall = () => {
    const updatedStats = { ...currentStats };
    updatedStats[striker].balls += 1;
    setCurrentStats(updatedStats);
    setOverBalls((prev) => prev + 1);
    showAlert('Dot ball!');
    if ((overBalls + 1) % 6 === 0) {
      setStriker((prev) => (prev === 'striker' ? 'nonStriker' : 'striker'));
    }
  };

  const handleOut = () => {
    showAlert(`${currentStats[striker].name} is OUT!`);
    const outPlayer = currentStats[striker];
    setPlayers((prev) => [...prev, outPlayer]);

    const nextPlayer = prompt('Enter next player name:');
    if (!nextPlayer) {
      showAlert('No next player entered!');
      return;
    }

    setCurrentStats((prev) => ({
      ...prev,
      [striker]: { name: nextPlayer, score: 0, balls: 0 },
    }));
  };

  const handleWide = () => {
    setTotalScore((prev) => prev + 1);
    showAlert('Wide Ball! Extra run.');
  };

  const handleNoBall = () => {
    setTotalScore((prev) => prev + 1);
    showAlert('No Ball! Free Hit.');
  };

  const calculateStrikeRate = (score, balls) =>
    balls === 0 ? 0 : ((score / balls) * 100).toFixed(2);

  return (
    <div id="cricket-main">
      {customAlert && <div className="custom-alert">{customAlert}</div>}

      {!formSubmitted ? (
        <form onSubmit={handleStart} className="form-container">
          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Striker Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Non-Striker Name"
            value={nonStrikerName}
            onChange={(e) => setNonStrikerName(e.target.value)}
          />
          <button type="submit" className="button start">Start Match</button>
        </form>
      ) : (
        <div className="score-section">
          <h1 className="team-heading" style={{ backgroundColor: teamColor }}>
            {teamColor === '#FF0000' ? '🔴' : '🟢'} {teamName}
          </h1>

          <h2>Total Score: {totalScore} / {players.length}</h2>
          <h3>Overs: {Math.floor(overBalls / 6)}.{overBalls % 6}</h3>

          <div className="score-card">
            <h2>{currentStats.striker.name}* - {currentStats.striker.score} ({currentStats.striker.balls})</h2>
            <p>Strike Rate: {calculateStrikeRate(currentStats.striker.score, currentStats.striker.balls)}</p>
          </div>

          <div className="score-card">
            <h2>{currentStats.nonStriker.name} - {currentStats.nonStriker.score} ({currentStats.nonStriker.balls})</h2>
            <p>Strike Rate: {calculateStrikeRate(currentStats.nonStriker.score, currentStats.nonStriker.balls)}</p>
          </div>

          <div className="button-container">
            <button onClick={() => updateScore(1)} className="button">1 Run</button>
            <button onClick={() => updateScore(2)} className="button">2 Runs</button>
            <button onClick={() => updateScore(4)} className="button">Four</button>
            <button onClick={() => updateScore(6)} className="button">Six</button>
            <button onClick={dotBall} className="button">Dot</button>
            <button onClick={handleWide} className="button">Wide</button>
            <button onClick={handleNoBall} className="button">No Ball</button>
            <button onClick={handleOut} className="button">Out</button>
          </div>

          <div className="all-players">
            <h3>All Players Summary:</h3>
            <ul>
              {players.map((p, i) => (
                <li key={i}>
                  {p.name}: {p.score} ({p.balls}) | SR: {calculateStrikeRate(p.score, p.balls)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cricket;
