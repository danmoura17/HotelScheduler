import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ExampleComponent } from "./ExampleCompontent";
import {i18n} from './translations/i18n';
function App() {
  const [language, setLanguage] = useState('en');

  // const handleOnclick = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
  //   e.preventDefault();
  //   setLanguage(e.target.value);
  //   i18n.changeLanguage(e.target.value);
  // }

  const handleOnclick = (e: any) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ExampleComponent />
                
        <div style={{ flexDirection: "row" }}>
          <button value="es" onClick={handleOnclick}>
            Spanish
          </button>
          <button value="en" onClick={handleOnclick}>
            English
          </button>
          <button value="fr" onClick={handleOnclick}>
            Franch
          </button>
          <button value="pt" onClick={handleOnclick}>
            Portuguese
          </button>
        </div>

        
      </header>
    </div>
  );
}

export default App;
