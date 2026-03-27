import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OrdersProvider } from '@/contexts/OrdersContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <OrdersProvider>
        {children}
      </OrdersProvider>
    </BrowserRouter>
  );
}
