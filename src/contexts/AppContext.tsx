import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClothingItem, SwapRequest } from '../types';

interface AppContextType {
  items: ClothingItem[];
  swapRequests: SwapRequest[];
  addItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  deleteItem: (id: string) => void;
  addSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for demonstration
const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in fall and spring.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Like New',
    tags: ['vintage', 'denim', 'casual'],
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    uploaderId: '2',
    uploaderName: 'Jane Smith',
    pointValue: 45,
    isAvailable: true,
    isApproved: true,
    createdAt: new Date('2024-11-01')
  },
  {
    id: '2',
    title: 'Black Wool Coat',
    description: 'Elegant black wool coat, perfect for winter. Barely worn, high-quality fabric.',
    category: 'Outerwear',
    type: 'Coat',
    size: 'L',
    condition: 'New',
    tags: ['wool', 'winter', 'formal'],
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
    uploaderId: '2',
    uploaderName: 'Jane Smith',
    pointValue: 75,
    isAvailable: true,
    isApproved: true,
    createdAt: new Date('2024-11-02')
  },
  {
    id: '3',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral print dress, perfect for summer occasions. Light and comfortable.',
    category: 'Dresses',
    type: 'Casual Dress',
    size: 'S',
    condition: 'Good',
    tags: ['floral', 'summer', 'casual'],
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
    uploaderId: '2',
    uploaderName: 'Jane Smith',
    pointValue: 35,
    isAvailable: true,
    isApproved: true,
    createdAt: new Date('2024-11-03')
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ClothingItem[]>(mockItems);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  const addItem = (itemData: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    const newItem: ClothingItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ClothingItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addSwapRequest = (requestData: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
    setSwapRequests(prev => prev.map(request => 
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  return (
    <AppContext.Provider value={{
      items,
      swapRequests,
      addItem,
      updateItem,
      deleteItem,
      addSwapRequest,
      updateSwapRequest
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}