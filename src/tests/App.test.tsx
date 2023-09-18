import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { mockData } from './mockData';
import { MemoryRouter } from 'react-router-dom';
import { tableHeaderList } from './utils/constants';

describe('Verifica se a requisição é chamada corretamente e se existe todos os planetas e suas informações ao entrar na página', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    } as any);

    render(<App />);
  });
  it('A API é chamada com o endpoint correto e renderizada uma vez ao abrir a página', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as any);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const URL_API = 'https://swapi.dev/api/planets'
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(URL_API);
  });

  it('Os planetas e as tabelas funcionam conforme o usuário filtra', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as any);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/carregando\.\.\./i));
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
