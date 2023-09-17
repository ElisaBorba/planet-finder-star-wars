import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { mockData } from './mockData';
import { MemoryRouter } from 'react-router-dom';

describe('Verifica se a requisição é chamada corretamente e se existe todos os planetas e suas informações ao entrar na página', () => {
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

});
