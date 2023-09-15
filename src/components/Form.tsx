import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { FormType } from '../types';

const INITIAL_STATE = {
  filterPlanet: '',
};

function Form() {
  const [planetInput, setPlanetInput] = useState<FormType>(INITIAL_STATE);
  const { planets, filterPlanets, setFilterPlanets } = useContext(PlanetsContext);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = target;
    setPlanetInput({ ...planetInput, filterPlanet: value });

    const filteredPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase()));
    setFilterPlanets(filteredPlanets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFilterPlanets(filterPlanets);
  };

  return (
    <form>
      <label htmlFor="filterPlanet">
        <input
          type="text"
          id="filterPlanet"
          name="filterPlanet"
          value={ planetInput.filterPlanet }
          onChange={ handleChange }
          data-testid="name-filter"
          placeholder="Search planet"
        />
      </label>
      <button
        type="submit"
        onClick={ handleSubmit }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
