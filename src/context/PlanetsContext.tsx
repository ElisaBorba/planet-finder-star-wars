import { createContext } from 'react';
// import { PlanetsContextType } from '../types';

const PlanetsContext = createContext<any>({
  planets: [],
  setPlanets: () => {},
});

export default PlanetsContext;
