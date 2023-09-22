import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { PlanetsType } from '../types';

const comparations: { [key:string]: (a: string, b: number) => boolean } = {
  'maior que': (a, b) => (parseFloat(a) > Number(b)),
  'menor que': (a, b) => (parseFloat(a) < Number(b)),
  'igual a': (a, b) => (parseFloat(a) === Number(b)),
};

function Table() {
  const { planetInput, planets, filterByNumericValues } = useContext(PlanetsContext);
  const filteredByName = planets.filter((planet) => (
    planet.name.toLowerCase().includes(planetInput)));

  const filteredByNumber = filteredByName.filter((planet) => {
    if (filterByNumericValues.length === 0) return true;

    return filterByNumericValues.every((filter) => comparations[filter.comparison](
      planet[filter.column],
      filter.valueNumber,
    ));
  });

  return (
    <div>
      <table data-testid="planet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredByNumber.map((planet: PlanetsType) => {
            return (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films.map((film: string, index: number) => (
                    <p key={ index }>{film}</p>
                  ))}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
