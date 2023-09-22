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
  setPlanets?: (newPlanets: PlanetsType[]) => void;
  filterByNumericValues: FormType[]
  setFilterByNumericValues:(selectedFiltersInForm: FormType[]) => void;
  planetInput: string;
  setPlanetInput: React.Dispatch<React.SetStateAction<string>>;
};

export type FormType = {
  column: 'population' | 'orbital_period'
  | 'diameter' | 'rotation_period' | 'surface_water';
  comparison: string;
  valueNumber: number;
};
