import { PlanetsFetchType } from '../types';

export const fetchPlanets = async () => {
  const URL = 'https://swapi.dev/api/planets';
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  const filteredResults = results.map((planet: PlanetsFetchType) => {
    const { residents, ...deletedResidents } = planet;
    return deletedResidents;
  });

  return filteredResults;
};
