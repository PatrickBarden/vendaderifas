import React, { createContext, useContext, useState, useCallback } from 'react';

export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  campaignId: string;
  campaignTitle: string;
  campaignCode: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  channel: 'website' | 'whatsapp' | 'instagram';
}

interface OrdersContextType {
  orders: Order[];
  unreadCount: number;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'channel'>) => Order;
  markAsRead: () => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByCampaign: (campaignId: string) => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Mock initial orders
const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'João Silva',
    customerEmail: 'joao@email.com',
    customerPhone: '(11) 99999-9999',
    campaignId: 'mock-1',
    campaignTitle: 'RAM 2500 Limited',
    campaignCode: '1536',
    quantity: 50,
    total: 100,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    channel: 'website'
  },
  {
    id: 'ORD-002',
    customerName: 'Maria Santos',
    customerEmail: 'maria@email.com',
    customerPhone: '(11) 98888-8888',
    campaignId: 'mock-1',
    campaignTitle: 'RAM 2500 Limited',
    campaignCode: '1536',
    quantity: 100,
    total: 200,
    status: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    channel: 'website'
  }
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [unreadCount, setUnreadCount] = useState(1);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'channel'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'pending',
      channel: 'website',
      createdAt: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    return newOrder;
  }, []);

  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const getOrdersByCampaign = useCallback((campaignId: string) => {
    return orders.filter(order => order.campaignId === campaignId);
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        unreadCount,
        addOrder,
        markAsRead,
        updateOrderStatus,
        getOrdersByCampaign
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
