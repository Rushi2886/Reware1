import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, ArrowLeft, User, Calendar, Tag, Package } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, addSwapRequest } = useApp();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<'points' | 'item'>('points');

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (swapType === 'points') {
      if (user.points < item.pointValue) {
        alert('You do not have enough points for this item.');
        return;
      }
    }

    addSwapRequest({
      requesterId: user.id,
      requesterName: user.name,
      itemId: item.id,
      itemTitle: item.title,
      usePoints: swapType === 'points',
      pointsOffered: swapType === 'points' ? item.pointValue : undefined,
      status: 'pending'
    });

    setShowSwapModal(false);
    alert('Swap request sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-md ${
                      index === currentImageIndex ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {item.uploaderName}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-primary-600">
                  {item.pointValue} points
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.condition === 'New' ? 'bg-emerald-100 text-emerald-700' :
                  item.condition === 'Like New' ? 'bg-blue-100 text-blue-700' :
                  item.condition === 'Good' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {item.condition}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.isAvailable 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                <p className="text-gray-600">{item.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Type</h4>
                <p className="text-gray-600">{item.type}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Size</h4>
                <p className="text-gray-600">{item.size}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Condition</h4>
                <p className="text-gray-600">{item.condition}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              {user && user.id !== item.uploaderId && item.isAvailable ? (
                <>
                  <button
                    onClick={() => setShowSwapModal(true)}
                    className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Request Swap
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <div className="flex-1 bg-gray-100 text-gray-500 px-6 py-3 rounded-lg text-center font-medium">
                  {!user ? 'Login to request swap' : 
                   user.id === item.uploaderId ? 'This is your item' : 
                   'Not available for swap'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            
            <div className="space-y-4 mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="swapType"
                  value="points"
                  checked={swapType === 'points'}
                  onChange={(e) => setSwapType(e.target.value as 'points' | 'item')}
                  className="text-primary-600"
                />
                <div>
                  <div className="font-medium">Use Points ({item.pointValue} points)</div>
                  <div className="text-sm text-gray-500">
                    Your balance: {user?.points} points
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="swapType"
                  value="item"
                  checked={swapType === 'item'}
                  onChange={(e) => setSwapType(e.target.value as 'points' | 'item')}
                  className="text-primary-600"
                />
                <div>
                  <div className="font-medium">Offer Item Trade</div>
                  <div className="text-sm text-gray-500">
                    Exchange with one of your items
                  </div>
                </div>
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={swapType === 'points' && user && user.points < item.pointValue}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}