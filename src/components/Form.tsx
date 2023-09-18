import { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { FormType } from '../types';

type InputFilterType = {
  filterPlanet: string;
};

const INITIAL_STATE = {
  filterPlanet: '',
};

const INITIAL_STATE_FORM: FormType = {
  column: 'population',
  comparison: 'maior que',
  valueNumber: 0,
};

const columnsName = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Form() {
  const [planetInput, setPlanetInput] = useState<InputFilterType>(INITIAL_STATE);
  const [formInput, setFormInput] = useState<FormType>(INITIAL_STATE_FORM);
  const { planets, filteredPlanets, setFilteredPlanets, filterByNumericValues,
    setFilterByNumericValues } = useContext(PlanetsContext);
  const [columnsArray, setColumnsArray] = useState<string[]>(columnsName);

  const { valueNumber, column, comparison } = formInput;

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

  useEffect(() => {
    console.log('filterByNumericValues', filterByNumericValues);
  }, [filterByNumericValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFilter: FormType = {
      column,
      comparison,
      valueNumber,
    };

    const updatedFilterByNumericValues = [...filterByNumericValues, newFilter];

    setFilterByNumericValues(updatedFilterByNumericValues);
    console.log('filterByNumericValues', filterByNumericValues);

    const filteredByForm = filteredPlanets.filter((planet) => {
      const planetByColumn = parseFloat(planet[column]);
      const valueNum = Number(valueNumber);

      return (
        (comparison === 'maior que' && planetByColumn > valueNum)
        || (comparison === 'menor que' && planetByColumn < valueNum)
        || (comparison === 'igual a' && planetByColumn === valueNum)
      );
    });

    const filterColumns = columnsArray.filter((col) => col !== column);
    setColumnsArray(filterColumns);

    setFilteredPlanets(filteredByForm);
    console.log('filteredByForm', filteredByForm);
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
            value={ column }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            {columnsArray.map((col) => (
              <option key={ col } value={ col }>
                {col}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="comparison">
          Operador
          <select
            id="comparison"
            name="comparison"
            value={ comparison }
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
            value={ valueNumber }
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
