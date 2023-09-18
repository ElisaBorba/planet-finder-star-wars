import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  setPlanets: () => {},
  filteredPlanets: [],
  setFilteredPlanets: () => {},
  filterByNumericValues: [],
  setFilterByNumericValues: () => {},
});

export default PlanetsContext;
