import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  setPlanets: () => {},
});

export default PlanetsContext;
