import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import './index.css';
import routes from './routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={client}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
  </StrictMode>,
)
