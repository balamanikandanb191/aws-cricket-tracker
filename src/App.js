import React, { useState } from "react";
import Cricket from "./Components/Cricket";
import Login from "./Components/Login";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* {isLoggedIn ? <Cricket /> : <Login onLogin={() => setIsLoggedIn(true)} />} */}
      <Cricket/>
    </div>
  );
}

export default App;
