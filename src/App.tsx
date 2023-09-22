import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { fetchPlanets } from './services/fetchPlanets';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import { PlanetsType, FormType } from './types';
import Form from './components/Form';

function App() {
  const [planets, setPlanets] = useState<PlanetsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterByNumericValues, setFilterByNumericValues] = useState<FormType[]>([]);
  const [planetInput, setPlanetInput] = useState<string>('');

  useEffect(() => {
    fetchPlanets()
      .then((planetsData) => {
        setPlanets(planetsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar planetas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <PlanetsContext.Provider
      value={ {
        planetInput,
        setPlanetInput,
        planets,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
          <Form />
          <Table />
        </div>
      )}
    </PlanetsContext.Provider>
  );
}

export default App;
