"use client";
import React, { Suspense, useState } from "react";
import scenariosList from "../scenariosList.json";

function Menu() {
  const [scenario, setScenario] = useState(scenariosList[0] || "");
  const [hasError, setHasError] = useState(false);

  const loadScenario = async () => {
    try {
      const module = await import(`../scenarios/${scenario}/App.tsx`);
      return module;
    } catch (error) {
      setHasError(true);
      throw error;
    }
  };

  const ScenarioComponent = React.lazy(loadScenario);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl">Select Scenario</h1>
        <select
          onChange={(e) => {
            setScenario(e.target.value);
            setHasError(false);
          }}
          value={scenario}
        >
          {scenariosList.map((scenarioName, i) => (
            <option key={i} value={scenarioName}>
              {scenarioName}
            </option>
          ))}
        </select>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        {hasError ? <div>File not found.</div> : <ScenarioComponent />}
      </Suspense>
    </div>
  );
}

export default Menu;
