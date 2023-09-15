import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { fetchPlanets } from './services/fetchPlanets';
import './App.css';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then((planetsData) => {
      setPlanets(planetsData);
    });
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
