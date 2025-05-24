import React, { useState, useEffect } from 'react';
import './Cric.css';

function Cric() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(0);
  const [customAlert, setCustomAlert] = useState("");
  const [milestoneShown, setMilestoneShown] = useState({ fifty: false, century: false });

  const handleSubmit = (e) => { //purila aprm pathukalam da etha 
    e.preventDefault();
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
    if ([50, 51, 52, 53, 54, 55].includes(score) && !milestoneShown.fifty) {
      showAlert(`${displayName} has scored Fifty!`);
      setMilestoneShown(prev => ({ ...prev, fifty: true }));
    }
  }, [score, displayName, milestoneShown]);

  useEffect(() => {
    if ([100, 101, 102, 103, 104, 105].includes(score) && !milestoneShown.century) {
      showAlert(`${displayName} has scored a Century!`);
      setMilestoneShown(prev => ({ ...prev, century: true }));
    }
  }, [score, displayName, milestoneShown]);

  const updateScore = (runs) => {
    setScore(score + runs);
    setBalls(balls + 1);
  };

  const four = () =>
    { 
      updateScore(4);
      showAlert(`${name} hits a cracking four!` )
    }
  const six = () =>  showAlert("Dot ball! Good length delivery"); updateScore(6);
  const single = () => updateScore(1); showAlert("Just a Single ! ");
  const double = () => updateScore(2);showAlert("Wow Nice Running between Wickets ! its Double");
  const wides = () => updateScore(1); showAlert("Wide ball! Oh No Bowler Miss the Delivery ");

  const out = () => {
    showAlert("Player out!");
    setScore(0);
    setBalls(0);
  };

  const dotball = () => {
    setBalls(balls + 1);
  };

  const noball = () => {
    showAlert("Ohh Noo it's a No Ball - Free Hit!");
    setBalls(balls + 1);
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
          <h1>{displayName}: {score} ({balls})</h1>
          <div>
            <button onClick={four} className='button'>Four</button>
            <button onClick={six} className='button'>Six</button>
            <button onClick={single} className='button'>Single</button>
            <button onClick={double} className='button'>Double</button>
            <button onClick={out} className='button'>Out</button>
            <button onClick={dotball} className='button'>Dot</button>
            <button onClick={wides} className='button'>Wide</button>
            <button onClick={noball} className='button'>NoBall</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cric;
