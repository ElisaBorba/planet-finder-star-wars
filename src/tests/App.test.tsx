import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { mockData } from './utils/mockData';
import { tableHeaderList } from './utils/constants';


beforeEach(() => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => mockData,
  } as Response;

  const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue(MOCK_RESPONSE);
});

afterEach(() => {
  vi.restoreAllMocks();
});
describe('Verifica se a requisição é chamada corretamente e se existe todos os planetas e suas informações ao entrar na página', () => {
 
  it('A API é chamada com o endpoint correto e renderizada uma vez ao abrir a página', async () => {
 render(<App />);

    const URL_API = 'https://swapi.dev/api/planets'
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(URL_API);
  });

  it('Os planetas e as tabelas funcionam conforme o usuário filtra', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));


    const firstPlanet = screen.getByRole('cell', {  name: /tatooine/i})
    const table = screen.getByRole('table')
    const colunaTable = screen.getByText(/coluna/i)

    expect(firstPlanet).toBeInTheDocument();
    expect(colunaTable).toBeInTheDocument();
    expect(table).toBeInTheDocument();

    const tableHeader = screen.getAllByRole('columnheader');
    const columnNames = tableHeader.map(header => header.textContent);

    expect(columnNames).toEqual(tableHeaderList);
  });
});

describe('Verifica se as funções de filtro da tabela funcionam como esperado', () => {
     it('Barra de procura por planetas filtra conforme o que está nos nomes dos planetas, exemplo \'oo\' aparecerá apenas os planetas tatooine e naboo', async () => {
    render(<App />);

 
    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));
    
    const inputSeachPlanet = screen.getByPlaceholderText('Search planet');
    expect(inputSeachPlanet).toBeInTheDocument();

    userEvent.type(inputSeachPlanet, 'oo');

    const firstPlanet = screen.getByRole('cell', {  name: /tatooine/i})
    const secondPlanet = screen.getByRole('cell', {  name: /naboo/i})
    const notFilteredPlanet = screen.queryByRole('cell', { name: /hoth/i });
    
    expect(firstPlanet).toBeInTheDocument();
    expect(secondPlanet).toBeInTheDocument();
    expect(notFilteredPlanet).not.toBeInTheDocument();
  });

  it('Botão \'Remover todas as filtragens\' deve remover todas as filtragens e estabelcer a tabela para os planetas inicias (sem filtros)', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando\.\.\./i));

    const inputValueNumber = screen.getByTestId("value-filter")
    expect(inputValueNumber).toBeInTheDocument();

    userEvent.type(inputValueNumber, '2000000000');

    const filterBtn = screen.getByRole('button', {  name: /filtrar/i})
    expect(filterBtn).toBeInTheDocument();

    userEvent.click(filterBtn);

    const firstPlanet = screen.getByRole('cell', {  name: /naboo/i})
    const secondPlanet = screen.getByRole('cell', {  name: /coruscant/i})
    const notFilteredPlanet = screen.queryByRole('cell', { name: /dagobah/i });

    expect(firstPlanet).toBeInTheDocument();
    expect(secondPlanet).toBeInTheDocument();
    expect(notFilteredPlanet).not.toBeInTheDocument();

    const removeFilterBtn = screen.getByRole('button', {  name: /apagar/i})
    expect(removeFilterBtn).toBeInTheDocument();

    userEvent.click(removeFilterBtn);

    expect(removeFilterBtn).not.toBeInTheDocument();

  });
});
