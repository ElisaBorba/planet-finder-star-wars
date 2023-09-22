import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  setPlanets: () => {},
  filterByNumericValues: [],
  setFilterByNumericValues: () => {},
  planetInput: '',
  setPlanetInput: () => {},
});

export default PlanetsContext;
