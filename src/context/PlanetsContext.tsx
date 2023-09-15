import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  filterPlanets: [],
  setPlanets: () => {},
  setFilterPlanets: () => {},
});

export default PlanetsContext;
