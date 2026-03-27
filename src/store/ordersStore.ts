import { create } from 'zustand';

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

interface OrdersStore {
  orders: Order[];
  unreadCount: number;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'channel'>) => Order;
  markAsRead: () => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByCampaign: (campaignId: string) => Order[];
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [
    // Mock orders for demonstration
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
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
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
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      channel: 'website'
    }
  ],
  unreadCount: 1,
  
  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'pending',
      channel: 'website',
      createdAt: new Date().toISOString()
    };
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
      unreadCount: state.unreadCount + 1
    }));
    
    return newOrder;
  },
  
  markAsRead: () => {
    set({ unreadCount: 0 });
  },
  
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    }));
  },
  
  getOrdersByCampaign: (campaignId) => {
    return get().orders.filter((order) => order.campaignId === campaignId);
  }
}));
