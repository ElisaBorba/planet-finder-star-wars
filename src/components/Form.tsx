import { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { FormType } from '../types';

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
  const [formInput, setFormInput] = useState<FormType>(INITIAL_STATE_FORM);
  const [columnsArray, setColumnsArray] = useState<string[]>(columnsName);
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    planetInput,
    setPlanetInput } = useContext(PlanetsContext);
  const { valueNumber, column, comparison } = formInput;

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setFormInput({ ...formInput, [targetName]: value });
  };

  useEffect(() => {
  }, [filterByNumericValues]);

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFilter: FormType = {
      column,
      comparison,
      valueNumber,
    };

    const updatedFilterByNumericValues = [...filterByNumericValues, newFilter];
    const filterColumns = columnsArray.filter((col) => col !== column);

    setFilterByNumericValues(updatedFilterByNumericValues);
    setColumnsArray(filterColumns);
    setFormInput({ ...formInput, column: filterColumns[0] });
  };

  const handleRemoveFilter = (numericValue: FormType) => {
    const filterColumns = filterByNumericValues
      .filter((filter) => numericValue.column !== filter.column);

    const updateColumns = [...columnsArray, numericValue.column];

    setColumnsArray(updateColumns);
    setFilterByNumericValues(filterColumns);
  };

  const handleFilterAllClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setColumnsArray([...columnsName]);
    setFilterByNumericValues([]);
  };

  return (
    <form>
      <div>
        <label htmlFor="filterPlanet">
          <input
            type="text"
            id="filterPlanet"
            name="filterPlanet"
            value={ planetInput }
            onChange={ (e) => setPlanetInput(e.target.value) }
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
            {columnsArray.map((col, index) => (
              <option key={ index } value={ col }>
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
          onClick={ handleFilter }
          data-testid="button-filter"
        >
          Filtrar
        </button>
        <div>
          {filterByNumericValues && filterByNumericValues.map((numericValue, index) => (
            <p data-testid="filter" key={ index }>
              {`${numericValue.column} ${numericValue.comparison}
            ${numericValue.valueNumber} `}
              <button
                type="button"
                onClick={ () => handleRemoveFilter(numericValue) }
              >
                Apagar
              </button>
            </p>
          ))}
        </div>
        <button
          data-testid="button-remove-filters"
          onClick={ handleFilterAllClick }
        >
          Remover todas filtragens
        </button>
      </div>
    </form>
  );
}

export default Form;
