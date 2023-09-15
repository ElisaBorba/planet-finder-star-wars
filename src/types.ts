export type PlanetsFetchType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type PlanetsType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type PlanetsContextType = {
  planets: PlanetsType[],
  filterPlanets: PlanetsType[],
  setPlanets?: (newPlanets: PlanetsType[]) => void;
  setFilterPlanets: (newPlanets: PlanetsType[]) => void;
};

export type FilmType = {
  filterPlanet: string;
};

export type FormType = {
  filterPlanet: string;
};
