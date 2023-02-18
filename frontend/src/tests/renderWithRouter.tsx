import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';

interface RenderWithRouterProps {
  route?: string;
  history?: MemoryHistory;
}

// Aplicação do renderWithRouter baseada no Gist do Adam J. Arling
// source: https://gist.github.com/adamjarling/9ac59f3f8984c4c19d34018ee8
// a0401c#file-renderwithrouter-js-L9
const renderWithRouter = (
  component: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderWithRouterProps = {},
) => ({
  ...render(
    <Router history={history}>
      {component}
    </Router>,
  ),
  history,
});

export default renderWithRouter;
