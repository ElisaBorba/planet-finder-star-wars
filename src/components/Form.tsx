import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { FormType } from '../types';

type InputFilterType = {
  filterPlanet: string;
};

const INITIAL_STATE = {
  filterPlanet: '',
};

const INITIAL_STATE_FORM = {
  column: 'population',
  operator: 'maior que',
  valueNumber: 0,
};

function Form() {
  const [planetInput, setPlanetInput] = useState<InputFilterType>(INITIAL_STATE);
  const [formInput, setFormInput] = useState<FormType>(INITIAL_STATE_FORM);

  const { planets, filteredPlanets, setFilteredPlanets } = useContext(PlanetsContext);

  console.log('formInput', formInput);
  const { valueNumber, column, operator } = formInput;

  // console.log('Planets', planets);
  console.log('filteredPlanets', filteredPlanets);

  const handlePlanetNameChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = target;
    setPlanetInput({ ...planetInput, filterPlanet: value });

    const filterPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlanets(filterPlanets);
  };

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setFormInput({ ...formInput, [targetName]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredByForm = filteredPlanets.filter((planet) => {
      const planetByColumn = parseFloat(planet[column]);
      const valueNum = Number(valueNumber);

      return (
        (operator === 'maior que' && planetByColumn > valueNum)
        || (operator === 'menor que' && planetByColumn < valueNum)
        || (operator === 'igual a' && planetByColumn === valueNum)
      );
    });

    setFilteredPlanets(filteredByForm);
  };

  return (
    <form>
      <div>
        <label htmlFor="filterPlanet">
          <input
            type="text"
            id="filterPlanet"
            name="filterPlanet"
            value={ planetInput.filterPlanet }
            onChange={ handlePlanetNameChange }
            data-testid="name-filter"
            placeholder="Search planet"
          />
        </label>
      </div>
      <div>
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            name="column"
            value={ formInput.column }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="operator">
          Operador
          <select
            id="operator"
            name="operator"
            value={ formInput.operator }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="valueNumber">
          <input
            type="text"
            id="valueNumber"
            name="valueNumber"
            value={ formInput.valueNumber }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>

        <button
          type="submit"
          onClick={ handleSubmit }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Form;
