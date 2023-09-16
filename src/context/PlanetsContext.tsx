import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  filteredPlanets: [],
  setPlanets: () => {},
  setFilteredPlanets: () => {},
});

export default PlanetsContext;
