# PlanetExplorer: Star Wars Edition 🌌

Este projeto consiste em uma aplicação desenvolvida utilizando React com Context API, que permite aos usuários explorar os planetas do universo de Star Wars, filtrando por detalhes específicos de cada planeta.

## ⚙️ Funcionalidades
* Pesquisar e visualizar detalhes dos planetas de Star Wars.
* Filtrar planetas por características específicas, como população, período orbital, diâmetro, etc.
* Visualizar informações detalhadas de cada planeta, incluindo nome, clima, terreno, população, filmes em que aparece, entre outros.

## 🛠 Tecnologias utilizadas

* [React](https://reactjs.org/)
* [Context API](https://legacy.reactjs.org/docs/context.html)
* [Vitest](https://vitest.dev/)
* [Testing Library](https://testing-library.com/)
* [TypeScript](https://www.typescriptlang.org/)
* CSS Modules
* API para listagem dos planetas:
  
A aplicação utiliza uma [API de planetas](https://swapi.dev/api/planets) para obter informações sobre os planetas, onde os dados são fornecidos em formato JSON.

### Estrutura do projeto
```
.
├── src/
│   ├── components/
│   │   ├── Form.tsx
│   │   └── Table.tsx
│   ├── context/
│   │   └── PlanetsContext.tsx
│   ├── services/
│   │   └── fetchPlanets.ts
│   ├── tests/
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   └── mockData.ts
│   │   └── App.test.tsx
│   ├── types.ts
│   ├── App.tsx
|   ├── index.css
|   ├── App.css 
│   └── main.tsx
├── README.md
└── package.json

```

### Como executar

1️⃣ Instale as dependências:
```
npm install
```
2️⃣ Inicie a aplicação:
```
npm run dev
```

3️⃣ Executa os testes:
```
npm test
```
