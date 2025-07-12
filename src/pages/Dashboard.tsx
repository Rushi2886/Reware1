import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, ArrowUpDown, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { ItemCard } from '../components/ItemCard';

export function Dashboard() {
  const { user } = useAuth();
  const { items, swapRequests } = useApp();

  if (!user) {
    return null;
  }

  const userItems = items.filter(item => item.uploaderId === user.id);
  const userSwapRequests = swapRequests.filter(request => 
    request.requesterId === user.id || 
    items.some(item => item.id === request.itemId && item.uploaderId === user.id)
  );

  const stats = {
    totalItems: userItems.length,
    availableItems: userItems.filter(item => item.isAvailable).length,
    totalSwaps: userSwapRequests.length,
    completedSwaps: userSwapRequests.filter(request => request.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your items, track swaps, and grow your sustainable wardrobe.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Balance</p>
                <p className="text-2xl font-bold text-primary-600">{user.points}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Star className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Listed Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSwaps}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <ArrowUpDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedSwaps}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">My Items</h2>
                  <Link 
                    to="/add-item"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {userItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userItems.slice(0, 4).map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't listed any items yet.</p>
                    <Link 
                      to="/add-item"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Item
                    </Link>
                  </div>
                )}

                {userItems.length > 4 && (
                  <div className="mt-4 text-center">
                    <Link 
                      to="/my-items" 
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All My Items ({userItems.length})
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/browse"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Browse Items</div>
                  <div className="text-sm text-gray-500">Find new pieces to swap</div>
                </Link>
                <Link 
                  to="/add-item"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Add New Item</div>
                  <div className="text-sm text-gray-500">List something new</div>
                </Link>
                <Link 
                  to="/my-swaps"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">My Swaps</div>
                  <div className="text-sm text-gray-500">Track your exchanges</div>
                </Link>
              </div>
            </div>

            {/* Recent Swap Requests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {userSwapRequests.length > 0 ? (
                <div className="space-y-3">
                  {userSwapRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-sm text-gray-900">{request.itemTitle}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: <span className={`capitalize ${
                          request.status === 'completed' ? 'text-green-600' :
                          request.status === 'accepted' ? 'text-blue-600' :
                          request.status === 'rejected' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>{request.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}