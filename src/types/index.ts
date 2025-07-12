export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  isAdmin: boolean;
  avatar?: string;
  joinedAt: Date;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  pointValue: number;
  isAvailable: boolean;
  isApproved: boolean;
  createdAt: Date;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  usePoints?: boolean;
  pointsOffered?: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}