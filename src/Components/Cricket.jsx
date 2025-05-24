import React, { useState, useEffect } from 'react';
import './Cricket.css';

function Cricket() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(0);
  const [customAlert, setCustomAlert] = useState("");
  const [milestoneShown, setMilestoneShown] = useState({ fifty: false, century: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter a player name");
      return;
    }
    setDisplayName(name);
    setScore(0);
    setBalls(0);
    setMilestoneShown({ fifty: false, century: false }); // Reset alerts
  };

  const showAlert = (message) => {
    setCustomAlert(message);
    setTimeout(() => setCustomAlert(""), 6000);
  };

  useEffect(() => {
    if (score >= 50 && score < 56 && !milestoneShown.fifty) {
      showAlert(`${displayName} has scored Fifty! 🏏`);
      setMilestoneShown(prev => ({ ...prev, fifty: true }));
    }
  }, [score, displayName]);

  useEffect(() => {
    if (score >= 100 && score < 106 && !milestoneShown.century) {
      showAlert(`${displayName} has scored a Century! 🎉`);
      setMilestoneShown(prev => ({ ...prev, century: true }));
    }
  }, [score, displayName]);

  const updateScore = (runs) => {
    setScore(score + runs);
    setBalls(balls+ 1);
   if ((balls + 1) % 6 === 0) {
  showAlert(`End of Over: ${(balls + 1) / 6}`);
}

  };

  const calculateStrikeRate = () => {
    return balls === 0 ? 0 : ((score / balls) * 100).toFixed(2);
  };

  const four = () => {
    updateScore(4);
    // showAlert(`${name} hits a cracking Four! 🔥`);
  };

  const six = () => {
    updateScore(6);
    // showAlert(`${name} smashes a massive Six! 🚀`);
  };

  const single = () => {
    updateScore(1);
    // showAlert("Just a Single!");
  };

  const double = () => {
    updateScore(2);
    // showAlert("Nice Running! It's a Double!");
  };

  const wides = () => {
    updateScore(1);
    // showAlert("Wide ball! Oh no, bowler missed it!");
  };

  const out = () => {
    showAlert("Oh no! Player is OUT! 😢");
    setScore(0);
    setBalls(0);
  };

  const dotball = () => {
    setBalls(prev => prev + 1);
    showAlert("Dot ball! No run scored.");
  };

  const noball = () => {
    setBalls(prev => prev + 1);
    showAlert("No ball! Free Hit coming up!");
  };

  return (
    <div id='cricket-main'>
      {customAlert && <div className="custom-alert">{customAlert}</div>}

      <form onSubmit={handleSubmit}>
        <input
          id='input'
          type="text"
          placeholder="Enter player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" id='submit'>Show Name</button>
      </form>

      {displayName && (
        <>
          <h1>{displayName}: {score} ({balls} balls)</h1>
          <div className="strike-rate-container"> 
            <h2>Strike Rate: {calculateStrikeRate()}</h2>
            <h1>Over: {Math.floor(balls / 6)}.{balls % 6}</h1>

           
          </div>
          <div>
            <button onClick={four} className='button'>Four</button>
            <button onClick={six} className='button'>Six</button>
            <button onClick={single} className='button'>Single</button>
            <button onClick={double} className='button'>Double</button>
            <button onClick={out} className='button'>Out</button>
            <button onClick={dotball} className='button'>Dot</button>
            <button onClick={wides} className='button'>Wide</button>
            <button onClick={noball} className='button'>No Ball</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cricket;
