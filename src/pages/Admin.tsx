import React, { useState } from 'react';
import { Check, X, Eye, Trash2, Users, Package, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const { user } = useAuth();
  const { items, updateItem, deleteItem } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');

  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  const pendingItems = items.filter(item => !item.isApproved);
  const approvedItems = items.filter(item => item.isApproved);

  const currentItems = activeTab === 'pending' ? pendingItems : 
                     activeTab === 'approved' ? approvedItems : items;

  const handleApprove = (itemId: string) => {
    updateItem(itemId, { isApproved: true });
  };

  const handleReject = (itemId: string) => {
    if (confirm('Are you sure you want to reject this item? This action cannot be undone.')) {
      deleteItem(itemId);
    }
  };

  const handleToggleAvailability = (itemId: string, currentAvailability: boolean) => {
    updateItem(itemId, { isAvailable: !currentAvailability });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage items, moderate content, and oversee the platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingItems.length}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-600">{items.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-primary-600">2</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Review ({pendingItems.length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approved'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved ({approvedItems.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Items ({items.length})
              </button>
            </nav>
          </div>

          {/* Items List */}
          <div className="p-6">
            {currentItems.length > 0 ? (
              <div className="space-y-4">
                {currentItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Image */}
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">by {item.uploaderName}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{item.category} • {item.size}</span>
                        <span className="text-xs text-primary-600 font-medium">{item.pointValue} pts</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.condition === 'New' ? 'bg-emerald-100 text-emerald-700' :
                          item.condition === 'Like New' ? 'bg-blue-100 text-blue-700' :
                          item.condition === 'Good' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {item.condition}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-center space-y-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.isApproved ? 'Approved' : 'Pending'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/item/${item.id}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View Item"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {!item.isApproved && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                            title="Approve Item"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
                            title="Reject Item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      {item.isApproved && (
                        <button
                          onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                          className={`p-2 transition-colors ${
                            item.isAvailable 
                              ? 'text-gray-600 hover:text-gray-700' 
                              : 'text-primary-600 hover:text-primary-700'
                          }`}
                          title={item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                        >
                          <Package className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleReject(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">
                  {activeTab === 'pending' ? 'All items have been reviewed' : 'No items in this category'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}